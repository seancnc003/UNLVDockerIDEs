#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — CI matrix test
#
# Runs ONE image's complete student workflow on the current machine and emits
# measurements for the research paper's technical evaluation (RQ1–RQ5):
#   pull time, image size, cold-start-to-healthy time, starter seeding,
#   compile+run timings (3 runs), gdb probe (x86), coursework workload
#   (timed build+run of real assignments, with peak container memory),
#   warm-start time, persistence across container replacement, non-overwrite
#   of edited files, tool versions, image digest, host hardware/OS record.
#
# Usage: scripts/ci-test.sh <cpp|x86>
#
# Coursework workload (x86 only): if ../code/workloads.tsv exists relative to
# this script's parent dir, each listed project is copied into the workspace,
# built with make, and executed — timed per project. The code/ folder is
# gitignored (course materials); on cloud cells it is distributed privately
# via S3 (see papers/AWS_RUNBOOK.md). When absent, the stage is skipped and
# recorded as null — the script stays complete without it.
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
# mktemp makes the dir 700, owned by the invoking user. On native Linux the
# bind mount exposes raw host ownership, and the container's coder user (UID
# 1000) may not match (CI runners are 1001) — the documented student flow
# assumes the typical desktop UID 1000. Open the harness dir so the test
# works for any UID; Docker Desktop hosts ignore this (ownership is mapped).
chmod 777 "$WS"
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

echo "== 8. Coursework workload (real assignments) =="
# Timed build+run of real course assignments (manifest-driven), with peak
# container memory sampled throughout. Failures are hard FAILs on native
# hosts; under emulation the status is recorded without failing (same policy
# as the gdb probe — behavior under emulation IS the research question).
WORKLOAD_JSON=null
PEAK_MEM_MIB=null
MANIFEST="code/workloads.tsv"
if [ "$KIND" = x86 ] && [ -f "$MANIFEST" ]; then
  MEMLOG="$(mktemp /tmp/unlv-ci-mem.XXXXXX)"
  ( while :; do docker stats --no-stream --format '{{.MemUsage}}' "$CONTAINER" 2>/dev/null | awk '{print $1}'; sleep 0.3; done ) > "$MEMLOG" 2>/dev/null &
  MEMPID=$!
  WORKLOAD_JSON=""
  while IFS="$(printf '\t')" read -r WDIR WCMD WMARK; do
    case "$WDIR" in ''|\#*) continue ;; esac
    if [ ! -f "code/$WDIR/makefile" ] && [ ! -f "code/$WDIR/Makefile" ]; then
      echo "  SKIP  $WDIR (not present)"; continue
    fi
    rm -rf "$WS/$WDIR"; cp -R "code/$WDIR" "$WS/$WDIR"; chmod -R 777 "$WS/$WDIR"
    t0="$(now)"
    BOUT="$(docker exec "$CONTAINER" bash -c "cd ~/workspace/$WDIR && make clean >/dev/null 2>&1; make" 2>&1)"
    BSTAT=$?
    BUILD_T="$(elapsed "$t0" "$(now)")"
    RUN_T=null; WSTATUS=build-fail
    if [ $BSTAT -eq 0 ]; then
      t0="$(now)"
      ROUT="$(docker exec "$CONTAINER" bash -c "cd ~/workspace/$WDIR && timeout 180 $WCMD" 2>&1)"
      RSTAT=$?
      RUN_T="$(elapsed "$t0" "$(now)")"
      if [ $RSTAT -eq 0 ] && { [ -z "$WMARK" ] || echo "$ROUT" | grep -qF "$WMARK"; }; then
        WSTATUS=pass
      else
        WSTATUS=run-fail
      fi
    fi
    if [ "$WSTATUS" = pass ]; then
      ok "workload $WDIR: build ${BUILD_T}s, run ${RUN_T}s"
    elif [ "$MODE" = native ]; then
      bad "workload $WDIR: $WSTATUS ($(echo "${BOUT}${ROUT:-}" | tail -1))"
    else
      echo "  INFO  workload $WDIR under emulation: $WSTATUS (recorded, not failed)"
    fi
    [ -n "$WORKLOAD_JSON" ] && WORKLOAD_JSON="$WORKLOAD_JSON, "
    WORKLOAD_JSON="$WORKLOAD_JSON{\"name\": \"$WDIR\", \"build_seconds\": $BUILD_T, \"run_seconds\": $RUN_T, \"status\": \"$WSTATUS\"}"
  done < "$MANIFEST"
  kill "$MEMPID" 2>/dev/null; wait "$MEMPID" 2>/dev/null
  PEAK_MEM_MIB="$(awk '{v=$1
    if (v ~ /GiB/)      {sub(/GiB/,"",v); v*=1024}
    else if (v ~ /MiB/) {sub(/MiB/,"",v)}
    else if (v ~ /KiB/) {sub(/KiB/,"",v); v/=1024}
    else next
    if (v>max) max=v} END{if (max) printf "%.0f", max; else print "null"}' "$MEMLOG")"
  rm -f "$MEMLOG"
  if [ -z "$WORKLOAD_JSON" ]; then WORKLOAD_JSON=null; else WORKLOAD_JSON="[$WORKLOAD_JSON]"; fi
  echo "  peak container memory during workload: ${PEAK_MEM_MIB} MiB"
else
  echo "  SKIP  no coursework workload for this image/host (code/workloads.tsv absent or kind=cpp)"
fi

echo "== 9. Persistence across container replacement (+ warm start) =="
echo "student notes" > "$WS/notes.txt"
echo "$EDIT_MARKER" >> "$WS/$STARTER_FILE"
docker rm -f "$CONTAINER" >/dev/null 2>&1
run_container
# This second start is the student's daily experience (image cached, container
# recreated) — logged as warm start, vs stage 2's once-per-install cold start.
if WARM_START_S="$(wait_healthy 300)"; then
  ok "replacement container healthy (warm start ${WARM_START_S}s)"
else
  WARM_START_S=null; bad "replacement container healthy"
fi
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

# --- Host record (for the paper's per-cell hardware table) --------------------
if [ "$(uname -s)" = Darwin ]; then
  HOST_CPU="$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo unknown)"
  HOST_CORES="$(sysctl -n hw.ncpu 2>/dev/null || echo 0)"
  HOST_RAM_GB="$(sysctl -n hw.memsize 2>/dev/null | awk '{printf "%.0f", $1/1073741824}')"
  HOST_OS="macOS $(sw_vers -productVersion 2>/dev/null)"
else
  HOST_CPU="$(lscpu 2>/dev/null | awk -F': +' '/Model name/{print $2; exit}')"
  [ -n "$HOST_CPU" ] || HOST_CPU="$(uname -m)"
  HOST_CORES="$(nproc 2>/dev/null || echo 0)"
  HOST_RAM_GB="$(awk '/MemTotal/{printf "%.0f", $2/1048576}' /proc/meminfo 2>/dev/null)"
  HOST_OS="$(. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME" || uname -sr)"
fi
DOCKER_V="$(docker --version 2>/dev/null | sed 's/,.*//')"

# --- Emit results -------------------------------------------------------------
ARCH_LABEL="$HOST_ARCH"; [ "$ARCH_LABEL" = arm64 ] && ARCH_LABEL=aarch64
JSON="results/$KIND-$ARCH_LABEL.json"
cat > "$JSON" <<EOF
{
  "image": "$IMAGE",
  "kind": "$KIND",
  "host_arch": "$ARCH_LABEL",
  "mode": "$MODE",
  "host": {
    "cpu": "$HOST_CPU",
    "cores": ${HOST_CORES:-0},
    "ram_gb": ${HOST_RAM_GB:-0},
    "os": "$HOST_OS",
    "docker": "$DOCKER_V"
  },
  "digest": "$DIGEST",
  "size_mb": ${SIZE_MB:-null},
  "pull_seconds": $PULL_S,
  "start_to_healthy_seconds": $START_S,
  "warm_start_seconds": $WARM_START_S,
  "compile_run_seconds": [${COMPILE_TIMES[0]}, ${COMPILE_TIMES[1]}, ${COMPILE_TIMES[2]}],
  "gdb": "$GDB_STATUS",
  "workload": $WORKLOAD_JSON,
  "workload_peak_mem_mib": $PEAK_MEM_MIB,
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
    echo "| Warm start → healthy | ${WARM_START_S}s |"
    echo "| Compile+run (3 runs) | ${COMPILE_TIMES[0]}s, ${COMPILE_TIMES[1]}s, ${COMPILE_TIMES[2]}s |"
    echo "| gdb | $GDB_STATUS |"
    echo "| Workload peak memory | ${PEAK_MEM_MIB} MiB |"
    echo "| Idle memory | ${IDLE_MEM:-unknown} |"
    echo "| Persistence | $PERSISTENCE |"
    echo "| Digest | \`$DIGEST\` |"
    echo ""
  } >> "$GITHUB_STEP_SUMMARY"
fi

echo
echo "RESULT: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
