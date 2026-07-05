# UNLV Docker IDEs

Browser-based programming environments for UNLV computer science courses. Each image packs VS Code in the browser (code-server) together with a complete, course-ready toolchain, so the only thing you need to install on your own computer is Docker Desktop. Everyone gets the same compiler, same debugger, same settings — on Windows, macOS, or Linux.

## Philosophy

- **Decentralized.** One container per student, running locally on the student's own machine. No server dependency, no internet needed after the initial image pull — all compilation happens on your own computer.
- **No AI.** No Copilot, no chat, no agents. The IDE is VS Code-based, but every AI surface is deliberately disabled through pinned settings.
- **Your files are sacred.** Work lives in a normal folder on your own machine (a bind mount), never inside the container or Docker's hidden storage, and autosave writes it to disk as you type. Deleting a container — or resetting Docker — can't take your work with it.
- **Frugal with resources.** Many students run modest hardware, so containers run only when explicitly started, and you stop them when you're done. There are never `--restart` policies.

## The Images

| IDE | Course topic | Docker Hub image | Platforms |
| --- | --- | --- | --- |
| UNLV C++ IDE | C++ programming | `seancnc/unlv-cpp-ide` | `linux/amd64` + `linux/arm64` (native everywhere) |
| UNLV x86 Assembly IDE | x86-64 Linux assembly | `seancnc/unlv-x86-ide` | `linux/amd64` only (emulated on Apple Silicon) |

## Quick Start

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and make sure it is running.
2. Run the IDE you need.

C++ IDE — then open <http://127.0.0.1:8080>:

```bash
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 -v "$HOME/UNLV/cpp-workspace:/home/coder/workspace" seancnc/unlv-cpp-ide
```

x86 Assembly IDE — then open <http://127.0.0.1:8081>:

```bash
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8081:8080 -v "$HOME/UNLV/x86-workspace:/home/coder/workspace" seancnc/unlv-x86-ide
```

On Windows, run the same command in PowerShell with the path in Windows form: `-v "$HOME\UNLV\cpp-workspace:/home/coder/workspace"` (or `x86-workspace`).

The two IDEs use different host ports (8080 and 8081), so you can run both at the same time. The x86 IDE always needs the `--platform linux/amd64` flag — see [`x86/README.md`](x86/README.md) for why.

When you're done, stop the container — closing the browser tab does **not** stop it; it keeps running and using RAM. Press `Ctrl+C` in the terminal you started it from, use Docker Desktop's stop button, or run `docker stop unlv-cpp-ide` / `docker stop unlv-x86-ide`. Nothing auto-restarts: the commands above deliberately have no `--restart` flag.

## Your Files Are Safe

Everything you save in the IDE lands in a normal folder on your own computer (`~/UNLV/cpp-workspace` or `~/UNLV/x86-workspace`), not inside the container. Stopping, removing, or updating the container does **not** delete your work, and autosave writes files to disk as you type. On the first run the IDE seeds a small starter program into the folder if it's empty — it never overwrites anything already there.

## More Detail

Each image folder has its own README plus two Word documents handed out in class — the **Design Document** and **Update Instructions** are the primary student references:

- [`cpp/`](cpp/) — C++ IDE: Dockerfile, settings, example program, docs
- [`x86/`](x86/) — x86 Assembly IDE: Dockerfile, settings, example program, docs

## Returning Students

The old `seancnc/unlv-cs-ide` image is retired. Switch to `seancnc/unlv-cpp-ide` (or `seancnc/unlv-x86-ide` for assembly) using the commands above — the new images work on both Intel/AMD and Apple Silicon machines.
