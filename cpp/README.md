# UNLV C++ IDE

VS Code in your browser with a full C++ toolchain, packaged as the Docker image `seancnc/unlv-cpp-ide`. The image is multi-arch (`linux/amd64` and `linux/arm64`), so it runs natively on Intel/AMD machines and Apple Silicon Macs alike.

## What's Inside

- Ubuntu 22.04 with code-server 4.126.0 (auth disabled, served on port 8080 inside the container; browse to host port 8135)
- g++ 11.4 and gcc (via `build-essential`), gdb 12.1, cmake, valgrind, clang-format, clangd
- Extensions: clangd (code intelligence), Code Runner, Clang-Format
- The Run button compiles with `g++ -std=c++14 -Wall -g` and runs in the integrated terminal
- Autosave is on (`files.autoSave: afterDelay`), so your work is written to disk as you type
- Starter program `hello.cpp`, seeded into your workspace folder on the first run

There is no Copilot, no chat, and no AI assistance of any kind — every AI feature in VS Code is deliberately disabled, per the course philosophy.

## Run It

```bash
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8135:8080 -v "$HOME/UNLV/cpp-workspace:/home/coder/workspace" seancnc/unlv-cpp-ide
```

This uses the folder `~/UNLV/cpp-workspace` on your own computer as the IDE's workspace — that's where all your files live. On Windows, run the command in PowerShell with `-v "$HOME\UNLV\cpp-workspace:/home/coder/workspace"`. On native Linux (not Docker Desktop), create the folder first with `mkdir -p ~/UNLV/cpp-workspace`, otherwise Docker creates it owned by root; macOS and Windows handle ownership automatically.

Then open <http://127.0.0.1:8135> — the port matches the course number, CS 135. To start it again later (the container already exists):

```bash
docker start unlv-cpp-ide
```

## Verify It's Working

The IDE should open straight into `/home/coder/workspace` with `hello.cpp` in it — the same file also appears in `~/UNLV/cpp-workspace` on your computer after the first start. (Starter files are seeded only when the folder is empty; existing work is never overwritten.) In the IDE's terminal:

```bash
g++ hello.cpp -o hello && ./hello
```

You should see `Hello, C++!`. Clicking the Run button on `hello.cpp` does the same thing.

## Stopping and Restarting

Closing the browser tab does **not** stop the IDE or lose any work — the container keeps running and using RAM until you stop it. When you're done, press `Ctrl+C` in the terminal you started it from (or close that terminal), click stop in Docker Desktop, or run `docker stop unlv-cpp-ide`. After `docker start unlv-cpp-ide`, reopening <http://127.0.0.1:8135> reconnects to everything exactly as you left it.

The run command deliberately has no `--restart` flag, so the IDE never launches itself in the background. On a modest machine, consider also turning off Docker Desktop's "start at login" setting.

## Updating

Your files live in `~/UNLV/cpp-workspace` on your own computer, so updating never touches them. Pull the latest image, replace the container, and rerun:

```bash
docker stop unlv-cpp-ide && docker rm unlv-cpp-ide
docker pull seancnc/unlv-cpp-ide && docker image prune -f
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8135:8080 -v "$HOME/UNLV/cpp-workspace:/home/coder/workspace" seancnc/unlv-cpp-ide
```

## Folder Contents

| File | Purpose |
| --- | --- |
| `Dockerfile` | Image definition |
| `image/settings.json` | Pre-configured code-server/editor settings baked into the image (autosave on, all AI features disabled) |
| `image/starter/hello.cpp` | Starter program, seeded into an empty workspace on first run |
| `image/entrypoint.sh` | Seeds starter files into the workspace on first run — only when it's empty |
| `Design Document.docx`, `Update Instructions.docx` | Student handouts (primary deliverables) |
| `.dockerignore` | Keeps docs (`*.docx`, `README.md`) out of the image build |

## For Maintainers

Build locally (from the repo root):

```bash
docker build -t seancnc/unlv-cpp-ide cpp/
```

Publish multi-arch — this image ships for both amd64 and arm64:

```bash
docker buildx build --platform linux/amd64,linux/arm64 --push -t seancnc/unlv-cpp-ide cpp/
```
