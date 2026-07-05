# AGENTS.md

Guidance for AI coding agents and contributors working in this repo.

## Purpose

This repo builds two browser-based (code-server) Docker IDE images for UNLV CS students:

- `cpp/` → `seancnc/unlv-cpp-ide` (C++; multi-arch: linux/amd64 + linux/arm64)
- `x86/` → `seancnc/unlv-x86-ide` (x86-64 Linux assembly; **linux/amd64 only**)

## Philosophy (agents must respect these)

- **Decentralized:** one container per student, run locally on the student's machine. No server dependency, no internet after the initial pull; compilation is local.
- **No AI, ever:** each `settings.json` deliberately disables every AI surface (chat, Copilot, agents, inline suggestions). Never re-enable AI features or add AI extensions.
- **Student files are sacred:** work lives on the host via bind mounts, never inside the container or Docker's hidden storage, so deleting a container/volume or resetting Docker cannot lose it. Autosave (`files.autoSave: afterDelay`) is on in both images.
- **Frugal with resources:** most students have far weaker machines than a MacBook Pro. Containers run only when explicitly started — never add `--restart` policies. The "Update Instructions" handout exists specifically to keep Docker's resource usage restrained.

## Layout

- `cpp/`, `x86/` — the two Docker build contexts. Each contains: `Dockerfile`, an `image/` folder with everything copied into the image (`entrypoint.sh`, `settings.json`, `starter/` files seeded into student workspaces), `.dockerignore`, `README.md`, and two `.docx` student handouts.
- `papers/` — open-access research papers on containerized CS education, published for educators. Reference material only; not part of any build.
- `archive/`, `code/` — gitignored, maintainer-local. `archive/` is the previous generation of this project: read-only historical reference, never modify it. `code/` is personal coursework.

## Build

```bash
# C++ (local build, native arch)
docker build -t seancnc/unlv-cpp-ide cpp/

# x86 (always amd64)
docker build --platform linux/amd64 -t seancnc/unlv-x86-ide x86/
```

## Publish

```bash
# C++ is multi-arch by design
docker buildx build --platform linux/amd64,linux/arm64 --push -t seancnc/unlv-cpp-ide cpp/

# x86 is amd64-only by design
docker buildx build --platform linux/amd64 --push -t seancnc/unlv-x86-ide x86/
```

**Never build/publish x86 multi-arch.** The coursework is x86-64 assembly; an arm64 variant would give students an ARM userland where NASM x86-64 sources cannot assemble or run. ARM hosts (Apple Silicon) run the amd64 image under Docker Desktop emulation via `--platform linux/amd64` — this is prescribed in the design doc.

## Smoke Test

Run without `-v`: the container workspace starts empty, so the entrypoint seeds the starter files into it.

```bash
docker run -d --name smoke-cpp -p 127.0.0.1:8135:8080 seancnc/unlv-cpp-ide
curl -i http://127.0.0.1:8135/healthz          # expect 200 (GET / gives 302 to the workspace folder)
docker exec smoke-cpp bash -c 'cd ~/workspace && g++ hello.cpp -o hello && ./hello'   # "Hello, C++!"
docker rm -f smoke-cpp

docker run -d --platform linux/amd64 --name smoke-x86 -p 127.0.0.1:8218:8080 seancnc/unlv-x86-ide
curl -i http://127.0.0.1:8218/healthz          # expect 200
docker exec smoke-x86 bash -c 'cd ~/workspace && make && ./hello'                     # "Hello, x86!"
docker rm -f smoke-x86
```

## Conventions and Gotchas

- The `.docx` files ("Design Document", "Update Instructions") are the primary student deliverables, edited only by the maintainer. **Never modify them.**
- `README.md` and `*.docx` are excluded from build contexts via each folder's `.dockerignore` — doc edits never change image content.
- code-server versions are pinned in the Dockerfiles (cpp: 4.126.0, x86: 4.96.4). Bump deliberately, not incidentally.
- Container port is always 8080; documented host ports mirror the course numbers — 8135 (cpp, CS 135) and 8218 (x86, CS 218) — so both IDEs run side by side.
- Auth is disabled (`--auth none`) and documented run commands bind to 127.0.0.1 only.
- Student files live in host folders bind-mounted over `/home/coder/workspace` (documented as `~/UNLV/cpp-workspace` / `~/UNLV/x86-workspace`) — never named volumes. Update path: `docker pull`, stop/remove the container, re-run with the same `-v`; host files are untouched.
- Starter files ship in `/opt/starter/`; `entrypoint.sh` seeds them only into an empty workspace on first run and never overwrites existing student work.
- Each `settings.json` pins AI kill-switch keys validated against the bundled VS Code version: cpp (code-server 4.126.0 / Code 1.126) uses `chat.disableAIFeatures` and related keys; x86 (code-server 4.96.4 / Code 1.96) uses `chat.commandCenter.enabled` and related keys. Never remove or "clean up" these keys.
- No `--restart` policy in any documented command, and no `VOLUME` instruction in the Dockerfiles (it would strand anonymous volumes).
- The x86 image must ship **yasm** (CS 218 course makefiles invoke `yasm`, not nasm) — never remove it.
- gdb inside the x86 image works only on native amd64 hosts: Docker Desktop's Rosetta/QEMU emulation does not implement `ptrace`, so debugger-script assignments cannot run on Apple Silicon. Running/assembling is unaffected.
- Legacy Docker Hub image `seancnc/unlv-cs-ide` (arm64-only) is deprecated — do not build or publish to it.
