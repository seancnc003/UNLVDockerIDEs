# UNLV x86 Assembly IDE

VS Code in your browser with an x86-64 Linux assembly toolchain (NASM), packaged as the Docker image `seancnc/unlv-x86-ide`.

## Important: This Image Is x86-64 Only

The coursework is x86-64 Linux assembly, so the container itself must be x86-64 — there is deliberately no ARM version, because your `.asm` files could not assemble or run inside one. That's why the run command always includes `--platform linux/amd64`.

**On Apple Silicon Macs** this still works: Docker Desktop translates the container's x86-64 instructions to ARM on the fly (emulation), so everything behaves the same, just a little slower. The `--platform linux/amd64` flag makes this explicit and silences Docker's platform warning — but if you forget it, everything still works; you'll just see a one-line warning.

**One emulation limitation:** assembling, linking, and running programs all work on Apple Silicon, but `gdb` cannot debug under emulation (the emulator does not implement `ptrace`). For assignments that require running gdb/debugger scripts, use an Intel/AMD machine (Windows PC, Intel Mac, or a campus lab computer).

## What's Inside

- Ubuntu 22.04 with code-server 4.126.0 (auth disabled, served on port 8080 inside the container)
- yasm and nasm assemblers (CS 218 makefiles use `yasm`), GNU ld (binutils), gdb 12.1, make, plus gcc/g++ (`build-essential`, `gcc-multilib`)
- Extension: Code Runner — the Run button assembles with `nasm -f elf64`, links with `ld`, and runs the result
- Autosave is on (`files.autoSave: afterDelay`), so your work is written to disk as you type
- Starter files `hello.asm` and a `Makefile`, seeded into your workspace folder on the first run

There is no Copilot, no chat, and no AI assistance of any kind — every AI feature in VS Code is deliberately disabled, per the course philosophy.

## Run It

```bash
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8218:8080 -v "$HOME/UNLV/x86-workspace:/home/coder/workspace" seancnc/unlv-x86-ide
```

This uses the folder `~/UNLV/x86-workspace` on your own computer as the IDE's workspace — that's where all your files live. On Windows, run the command in PowerShell with `-v "$HOME\UNLV\x86-workspace:/home/coder/workspace"`. On native Linux (not Docker Desktop), create the folder first with `mkdir -p ~/UNLV/x86-workspace`, otherwise Docker creates it owned by root; macOS and Windows handle ownership automatically.

Then open <http://127.0.0.1:8218> — the port matches the course number, CS 218, and keeps clear of the C++ IDE's 8135 so you can run both side by side. To start it again later:

```bash
docker start unlv-x86-ide
```

## Verify It's Working

The IDE should open straight into `/home/coder/workspace` with `hello.asm` and `Makefile` in it — the same files also appear in `~/UNLV/x86-workspace` on your computer after the first start. (Starter files are seeded only when the folder is empty; existing work is never overwritten.) In the IDE's terminal:

```bash
make && ./hello
```

You should see `Hello, x86!`.

## Stopping and Restarting

Closing the browser tab does **not** stop the IDE or lose any work — the container keeps running and using RAM until you stop it. When you're done, press `Ctrl+C` in the terminal you started it from (or close that terminal), click stop in Docker Desktop, or run `docker stop unlv-x86-ide`. After `docker start unlv-x86-ide`, reopening <http://127.0.0.1:8218> reconnects to everything exactly as you left it.

The run command deliberately has no `--restart` flag, so the IDE never launches itself in the background. On a modest machine, consider also turning off Docker Desktop's "start at login" setting.

## Updating

Your files live in `~/UNLV/x86-workspace` on your own computer, so updating never touches them. Pull the latest image, replace the container, and rerun:

```bash
docker stop unlv-x86-ide && docker rm unlv-x86-ide
docker pull --platform linux/amd64 seancnc/unlv-x86-ide && docker image prune -f
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8218:8080 -v "$HOME/UNLV/x86-workspace:/home/coder/workspace" seancnc/unlv-x86-ide
```

## Folder Contents

| File | Purpose |
| --- | --- |
| `Dockerfile` | Image definition |
| `image/settings.json` | Pre-configured code-server/editor settings baked into the image (autosave on, all AI features disabled) |
| `image/starter/` (`hello.asm`, `Makefile`) | Starter files, seeded into an empty workspace on first run |
| `image/entrypoint.sh` | Seeds starter files into the workspace on first run — only when it's empty |
| `Design Document.docx`, `Update Instructions.docx` | Student handouts (primary deliverables) |
| `.dockerignore` | Keeps docs (`*.docx`, `README.md`) out of the image build |

## For Maintainers

Build locally (from the repo root) — always amd64, never multi-arch:

```bash
docker build --platform linux/amd64 -t seancnc/unlv-x86-ide x86/
```

Publish (amd64 only — `--provenance=false --sbom=false` is required so the
image is a plain manifest and flagless pulls on ARM hosts emulate instead of
failing):

```bash
docker buildx build --platform linux/amd64 --provenance=false --sbom=false --push -t seancnc/unlv-x86-ide x86/
```
