#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — CI matrix test
#
# Runs ONE image's complete student workflow on the current machine and emits
# measurements for the research paper's technical evaluation (RQ1–RQ5):
#   pull time, image size, cold-start-to-healthy time, starter seeding,
#   compile+run timings (3 runs), gdb probe (x86), persistence across
#   container replacement, non-overwrite of edited files, tool versions,
#   image digest.
#
# Usage: scripts/ci-test.sh <cpp|x86>
#
# Written for GitHub Actions runners (ubuntu-24.04 / ubuntu-24.04-arm) but
# runs on any Linux/macOS host with Docker. On arm64 hosts the x86 image is
# exercised under emulation — gdb is EXPECTED to be broken there (the
# documented ptrace limitation); that outcome is recorded, not failed.
#
# Results: results/<image>-<arch>.json, plus a markdown table appended to
# $GITHUB_STEP_SUMMARY when set.
# ------------------------------------------------------------------------------
set -u
cd "$(dirname "$0")/.."

KIND="${1:?usage: ci-test.sh <cpp|x86>}"
HOST_ARCH="$(uname -m)"   # x86_64 | aarch64 | arm64

case "$KIND" in
  cpp)
    IMAGE=seancnc/unlv-cpp-ide; CONTAINER=unlv-cpp-ide; PORT=8135
    PLATFORM=""; STARTER_FILE=hello.cpp; EXPECT='Hello, C++!'
    COMPILE='g++ -std=c++14 -Wall -g hello.cpp -o hello && ./hello'
    EDIT_MARKER='// student edit — must survive'
    ;;
  x86)
    IMAGE=seancnc/unlv-x86-ide; CONTAINER=unlv-x86-ide; PORT=8218
    PLATFORM="--platform linux/amd64"; STARTER_FILE=hello.asm; EXPECT='Hello, x86!'
    COMPILE='make clean >/dev/null 2>&1; make && ./hello'
    EDIT_MARKER='; student edit — must survive'
    ;;
  *) echo "unknown image kind: $KIND"; exit 2 ;;
esac

case "$HOST_ARCH" in
  x86_64) MODE=native ;;
  *) if [ "$KIND" = x86 ]; then MODE=emulated; else MODE=native; fi ;;
esac

PASS=0; FAIL=0
ok()  { echo "  PASS  $1"; PASS=$((PASS+1)); }
bad() { echo "  FAIL  $1"; FAIL=$((FAIL+1)); }
# macOS ships bash 3.2 (no EPOCHREALTIME), so fall back to python3 there.
if [ -n "${EPOCHREALTIME:-}" ]; then
  now() { echo "$EPOCHREALTIME"; }
else
  now() { python3 -c 'import time; print(time.time())'; }
fi
elapsed() { awk -v a="$1" -v b="$2" 'BEGIN{printf "%.1f", b-a}'; }

WS="$(mktemp -d /tmp/unlv-ci-ws.XXXXXX)"
mkdir -p results
docker rm -f "$CONTAINER" >/dev/null 2>&1 || true

run_container() {
  # $PLATFORM deliberately unquoted: empty for cpp, two words for x86.
  docker run -d $PLATFORM --name "$CONTAINER" \
    -p "127.0.0.1:$PORT:8080" -v "$WS:/home/coder/workspace" "$IMAGE" >/dev/null
}

wait_healthy() { # timeout-seconds; echoes seconds-to-healthy or fails
  local t0; t0="$(now)"
  local deadline=$((SECONDS + $1))
  while [ $SECONDS -lt $deadline ]; do
    if curl -sf -m 2 "http://127.0.0.1:$PORT/healthz" >/dev/null; then
      elapsed "$t0" "$(now)"; return 0
    fi
    sleep 0.5
  done
  return 1
}

echo "== $KIND on $HOST_ARCH ($MODE) =="

echo "== 1. Pull =="
t0="$(now)"
if docker pull $PLATFORM "$IMAGE" >/dev/null 2>&1; then
  PULL_S="$(elapsed "$t0" "$(now)")"; ok "pulled $IMAGE in ${PULL_S}s"
else
  PULL_S=null; bad "pull $IMAGE"
fi
SIZE_MB="$(docker image inspect "$IMAGE" --format '{{.Size}}' 2>/dev/null | awk '{printf "%.0f", $1/1048576}')"
DIGEST="$(docker image inspect "$IMAGE" --format '{{index .RepoDigests 0}}' 2>/dev/null || echo unknown)"
echo "  size: ${SIZE_MB} MB  digest: $DIGEST"

echo "== 2. Cold start to healthy =="
run_container
# Emulated code-server is much slower to come up; 300s is a ceiling, not a target.
if START_S="$(wait_healthy 300)"; then
  ok "healthy on :$PORT in ${START_S}s"
else
  START_S=null; bad "healthy on :$PORT"
fi

echo "== 3. Starter seeding =="
sleep 1  # entrypoint seeds before code-server starts, but give the mount a beat
if [ -f "$WS/$STARTER_FILE" ]; then ok "starter $STARTER_FILE seeded to host"; else bad "starter $STARTER_FILE seeded to host"; fi

echo "== 4. Compile and run (3 timed runs) =="
COMPILE_TIMES=()
for i in 1 2 3; do
  t0="$(now)"
  OUT="$(docker exec "$CONTAINER" bash -c "cd ~/workspace && $COMPILE" 2>&1)"
  t="$(elapsed "$t0" "$(now)")"
  if echo "$OUT" | grep -qF "$EXPECT"; then
    COMPILE_TIMES+=("$t"); ok "run $i: '$EXPECT' in ${t}s"
  else
    COMPILE_TIMES+=(null); bad "run $i produced '$EXPECT' (got: $(echo "$OUT" | head -1))"
  fi
done

echo "== 5. gdb probe =="
GDB_STATUS=n/a
if [ "$KIND" = x86 ]; then
  GDB_OUT="$(docker exec "$CONTAINER" bash -c \
    'cd ~/workspace && gdb -batch -ex "break _start" -ex run -ex "info registers rip" ./hello' 2>&1)"
  if echo "$GDB_OUT" | grep -Eq 'rip +0x'; then GDB_STATUS=working; else GDB_STATUS=broken; fi
  # gdb working is required on native amd64; under emulation "broken" IS the
  # documented finding (ptrace unimplemented), so record it without failing.
  if [ "$MODE" = native ]; then
    [ "$GDB_STATUS" = working ] && ok "gdb debugs natively" || bad "gdb debugs natively (got: $(echo "$GDB_OUT" | head -1))"
  else
    echo "  INFO  gdb under emulation: $GDB_STATUS (documented limitation is 'broken')"
  fi
fi

echo "== 6. Idle resource use =="
IDLE_MEM="$(docker stats --no-stream --format '{{.MemUsage}}' "$CONTAINER" 2>/dev/null | awk '{print $1}')"
echo "  idle memory: ${IDLE_MEM:-unknown}"

echo "== 7. Tool versions (for the paper's reproducibility table) =="
CODE_SERVER_V="$(docker exec "$CONTAINER" code-server --version 2>/dev/null | head -1 | awk '{print $1}')"
if [ "$KIND" = x86 ]; then
  TOOLS="nasm $(docker exec "$CONTAINER" nasm -v 2>/dev/null | awk '{print $3}'), yasm $(docker exec "$CONTAINER" yasm --version 2>/dev/null | head -1 | awk '{print $2}'), gdb $(docker exec "$CONTAINER" gdb --version 2>/dev/null | head -1 | awk '{print $NF}')"
else
  TOOLS="g++ $(docker exec "$CONTAINER" g++ -dumpfullversion 2>/dev/null)"
fi
echo "  code-server $CODE_SERVER_V; $TOOLS"

echo "== 8. Persistence across container replacement =="
echo "student notes" > "$WS/notes.txt"
echo "$EDIT_MARKER" >> "$WS/$STARTER_FILE"
docker rm -f "$CONTAINER" >/dev/null 2>&1
run_container
if wait_healthy 300 >/dev/null; then ok "replacement container healthy"; else bad "replacement container healthy"; fi
PERSISTENCE=fail
if [ -f "$WS/notes.txt" ] && grep -qF "$EDIT_MARKER" "$WS/$STARTER_FILE"; then
  PERSISTENCE=pass
  ok "student files and edits survive container replacement (no re-seed overwrite)"
else
  bad "student files and edits survive container replacement"
fi

echo "== Cleanup =="
docker rm -f "$CONTAINER" >/dev/null 2>&1
rm -rf "$WS"

# --- Emit results -------------------------------------------------------------
ARCH_LABEL="$HOST_ARCH"; [ "$ARCH_LABEL" = arm64 ] && ARCH_LABEL=aarch64
JSON="results/$KIND-$ARCH_LABEL.json"
cat > "$JSON" <<EOF
{
  "image": "$IMAGE",
  "kind": "$KIND",
  "host_arch": "$ARCH_LABEL",
  "mode": "$MODE",
  "digest": "$DIGEST",
  "size_mb": ${SIZE_MB:-null},
  "pull_seconds": $PULL_S,
  "start_to_healthy_seconds": $START_S,
  "compile_run_seconds": [${COMPILE_TIMES[0]}, ${COMPILE_TIMES[1]}, ${COMPILE_TIMES[2]}],
  "gdb": "$GDB_STATUS",
  "idle_memory": "${IDLE_MEM:-unknown}",
  "code_server": "$CODE_SERVER_V",
  "tools": "$TOOLS",
  "persistence": "$PERSISTENCE",
  "passed": $PASS,
  "failed": $FAIL
}
EOF
echo "wrote $JSON"

if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
  {
    echo "### $KIND on $ARCH_LABEL ($MODE)"
    echo ""
    echo "| Metric | Value |"
    echo "| --- | --- |"
    echo "| Image size | ${SIZE_MB} MB |"
    echo "| Pull time | ${PULL_S}s |"
    echo "| Cold start → healthy | ${START_S}s |"
    echo "| Compile+run (3 runs) | ${COMPILE_TIMES[0]}s, ${COMPILE_TIMES[1]}s, ${COMPILE_TIMES[2]}s |"
    echo "| gdb | $GDB_STATUS |"
    echo "| Idle memory | ${IDLE_MEM:-unknown} |"
    echo "| Persistence | $PERSISTENCE |"
    echo "| Digest | \`$DIGEST\` |"
    echo ""
  } >> "$GITHUB_STEP_SUMMARY"
fi

echo
echo "RESULT: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
