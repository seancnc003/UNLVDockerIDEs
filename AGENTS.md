# AGENTS.md

Guidance for AI coding agents and contributors working in this repo.

## Purpose

This repo builds two browser-based (code-server) Docker IDE images for UNLV CS students:

- `cpp/` → `seancnc/unlv-cpp-ide` (C++; multi-arch: linux/amd64 + linux/arm64)
- `x86/` → `seancnc/unlv-x86-ide` (x86-64 Linux assembly; **linux/amd64 only**)

## Layout

- `cpp/`, `x86/` — the two Docker build contexts. Each contains: `Dockerfile`, `settings.json`, example program(s), `.dockerignore`, `README.md`, and two `.docx` student handouts.
- `papers/` — reference literature (PDFs), not part of any build.
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

```bash
docker run -d --name smoke-cpp -p 127.0.0.1:8080:8080 seancnc/unlv-cpp-ide
curl -i http://127.0.0.1:8080/healthz          # expect 200 (GET / gives 302 to the workspace folder)
docker exec smoke-cpp bash -c 'cd ~/workspace && g++ hello.cpp -o hello && ./hello'   # "Hello, C++!"
docker rm -f smoke-cpp

docker run -d --platform linux/amd64 --name smoke-x86 -p 127.0.0.1:8081:8080 seancnc/unlv-x86-ide
curl -i http://127.0.0.1:8081/healthz          # expect 200
docker exec smoke-x86 bash -c 'cd ~/workspace && make && ./hello'                     # "Hello, x86!"
docker rm -f smoke-x86
```

## Conventions and Gotchas

- The `.docx` files ("Design Document", "Update Instructions") are the primary student deliverables, edited only by the maintainer. **Never modify them.**
- `README.md` and `*.docx` are excluded from build contexts via each folder's `.dockerignore` — doc edits never change image content.
- code-server versions are pinned in the Dockerfiles (cpp: 4.126.0, x86: 4.96.4). Bump deliberately, not incidentally.
- Container port is always 8080; documented host ports are 8080 (cpp) and 8081 (x86) so both IDEs run side by side.
- Auth is disabled (`--auth none`) and documented run commands bind to 127.0.0.1 only.
- Student files persist in named volumes (`unlv_cpp_workspace`, `unlv_x86_workspace`); the update path is `docker pull` + recreate the container with the same volume.
- Legacy Docker Hub image `seancnc/unlv-cs-ide` (arm64-only) is deprecated — do not build or publish to it.
