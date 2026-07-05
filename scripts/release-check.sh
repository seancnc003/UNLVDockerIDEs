#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — release check
#
# Verifies, END TO END, exactly what a student will experience. Run this AFTER
# pushing images to Docker Hub: it pulls the published images and executes the
# documented commands verbatim, so it validates the real artifacts + the docs.
#
# What it checks:
#   1. Docs-drift guard: every canonical command below appears VERBATIM in the
#      READMEs. If you change a command, change the docs (and this file) too.
#   2. The x86 image is published as a plain manifest (flagless pulls on ARM
#      must emulate, not hard-fail with "no matching manifest").
#   3. Fresh pulls of both images; documented run commands (with -it -> -d so
#      the script can run unattended, and HOME pointed at a temp dir so your
#      real ~/UNLV folders are untouched).
#   4. In-IDE reality: HTTP up, app name, custom favicon, AI kill-switch and
#      trust settings present, starter files seeded to the host, compilers work
#      (g++ / yasm+nasm+make), expected extensions installed.
#
# NOTE: this removes any existing unlv-cpp-ide / unlv-x86-ide containers
# (student files are safe by design — they live in ~/UNLV, not the container).
# ------------------------------------------------------------------------------
set -u
cd "$(dirname "$0")/.."

# --- Canonical commands: MUST match the READMEs verbatim ---------------------
CPP_RUN='docker run -it --name unlv-cpp-ide -p 127.0.0.1:8135:8080 -v "$HOME/UNLV/cpp-workspace:/home/coder/workspace" seancnc/unlv-cpp-ide'
X86_RUN='docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8218:8080 -v "$HOME/UNLV/x86-workspace:/home/coder/workspace" seancnc/unlv-x86-ide'
CPP_PULL='docker pull seancnc/unlv-cpp-ide'
X86_PULL='docker pull --platform linux/amd64 seancnc/unlv-x86-ide'

PASS=0; FAIL=0
ok()   { echo "  PASS  $1"; PASS=$((PASS+1)); }
bad()  { echo "  FAIL  $1"; FAIL=$((FAIL+1)); }
check(){ if eval "$2" >/dev/null 2>&1; then ok "$1"; else bad "$1"; fi; }

echo "== 1. Docs-drift guard (commands appear verbatim in docs) =="
for doc in README.md cpp/README.md; do
  grep -qF "$CPP_RUN"  "$doc" && ok "cpp run command in $doc"  || bad "cpp run command in $doc"
done
for doc in README.md x86/README.md; do
  grep -qF "$X86_RUN"  "$doc" && ok "x86 run command in $doc"  || bad "x86 run command in $doc"
done
grep -qF "$CPP_PULL" cpp/README.md && ok "cpp pull command in cpp/README.md" || bad "cpp pull command in cpp/README.md"
grep -qF "$X86_PULL" x86/README.md && ok "x86 pull command in x86/README.md" || bad "x86 pull command in x86/README.md"

echo "== 2. x86 published as plain manifest (ARM flagless-pull guard) =="
if docker manifest inspect seancnc/unlv-x86-ide:latest 2>/dev/null | grep -q '"manifests"'; then
  bad "x86 :latest is an OCI index — republish with --provenance=false --sbom=false"
else
  ok "x86 :latest is a plain single-platform manifest"
fi

echo "== 3. Fresh pulls of published images =="
check "cpp pull" "$CPP_PULL"
check "x86 pull (with flag)" "$X86_PULL"
check "x86 pull (flagless — must not hard-fail)" "docker pull seancnc/unlv-x86-ide"

echo "== 4. Documented run commands (detached, temp HOME) =="
docker rm -f unlv-cpp-ide unlv-x86-ide >/dev/null 2>&1
TESTHOME="$(mktemp -d)"
HOME="$TESTHOME" bash -c "${CPP_RUN/-it/-d}" >/dev/null 2>&1 && ok "cpp container started" || bad "cpp container started"
HOME="$TESTHOME" bash -c "${X86_RUN/-it/-d}" >/dev/null 2>&1 && ok "x86 container started" || bad "x86 container started"

wait_http() { # port, tries
  for _ in $(seq 1 "$2"); do curl -sf -m 2 "http://127.0.0.1:$1/healthz" >/dev/null && return 0; sleep 2; done
  return 1
}
wait_http 8135 15 && ok "cpp responds on 8135" || bad "cpp responds on 8135"
wait_http 8218 30 && ok "x86 responds on 8218 (emulation is slower)" || bad "x86 responds on 8218"

echo "== 5. In-IDE checks =="
check "cpp app name served"      "curl -s http://127.0.0.1:8135/manifest.json | grep -q 'UNLV C++ IDE'"
check "x86 app name served"      "curl -s http://127.0.0.1:8218/manifest.json | grep -q 'UNLV x86 IDE'"
check "cpp custom favicon"       "curl -s http://127.0.0.1:8135/_static/src/browser/media/favicon.ico -o /tmp/rc-c.ico && [ \"\$(md5 -q /tmp/rc-c.ico)\" = \"\$(md5 -q cpp/image/branding/favicon.ico)\" ]"
check "x86 custom favicon"       "curl -s http://127.0.0.1:8218/_static/src/browser/media/favicon.ico -o /tmp/rc-x.ico && [ \"\$(md5 -q /tmp/rc-x.ico)\" = \"\$(md5 -q x86/image/branding/favicon.ico)\" ]"
for c in unlv-cpp-ide unlv-x86-ide; do
  check "$c AI kill-switch present"   "docker exec $c grep -q '\"chat.disableAIFeatures\": true' /home/coder/.local/share/code-server/User/settings.json"
  check "$c trust prompt disabled"    "docker exec $c grep -q '\"security.workspace.trust.enabled\": false' /home/coder/.local/share/code-server/User/settings.json"
done
check "cpp starter seeded to host"   "[ -f \"$TESTHOME/UNLV/cpp-workspace/hello.cpp\" ]"
check "x86 starter seeded to host"   "[ -f \"$TESTHOME/UNLV/x86-workspace/hello.asm\" ] && [ -f \"$TESTHOME/UNLV/x86-workspace/Makefile\" ]"
check "cpp compiles and runs"        "docker exec unlv-cpp-ide bash -c 'cd ~/workspace && g++ -std=c++14 -Wall -g hello.cpp -o /tmp/h && /tmp/h' | grep -q 'Hello, C++!'"
check "x86 assembles and runs"       "docker exec unlv-x86-ide bash -c 'cd ~/workspace && make >/dev/null && ./hello' | grep -q 'Hello, x86!'"
check "x86 ships yasm (CS 218 makefiles)" "docker exec unlv-x86-ide yasm --version"
check "cpp extensions installed"     "[ \"\$(docker exec unlv-cpp-ide code-server --list-extensions | wc -l | tr -d ' ')\" = 3 ]"
check "x86 extension installed"      "docker exec unlv-x86-ide code-server --list-extensions | grep -q code-runner"

echo "== Cleanup =="
docker rm -f unlv-cpp-ide unlv-x86-ide >/dev/null 2>&1
rm -rf "$TESTHOME" /tmp/rc-c.ico /tmp/rc-x.ico
echo
echo "RESULT: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
