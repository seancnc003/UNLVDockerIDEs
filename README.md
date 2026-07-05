# UNLV Docker IDEs

Browser-based programming environments for UNLV computer science courses. Each image packs VS Code in the browser (code-server) together with a complete, course-ready toolchain, so the only thing you need to install on your own computer is Docker Desktop. Everyone gets the same compiler, same debugger, same settings — on Windows, macOS, or Linux.

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
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 \
  -v unlv_cpp_workspace:/home/coder/workspace seancnc/unlv-cpp-ide
```

x86 Assembly IDE — then open <http://127.0.0.1:8081>:

```bash
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8081:8080 \
  -v unlv_x86_workspace:/home/coder/workspace seancnc/unlv-x86-ide
```

The two IDEs use different host ports (8080 and 8081), so you can run both at the same time. The x86 IDE always needs the `--platform linux/amd64` flag — see [`x86/README.md`](x86/README.md) for why.

## Your Files Are Safe

Everything you save in the IDE lives in a named Docker volume (`unlv_cpp_workspace` or `unlv_x86_workspace`). Stopping, removing, or updating the container does **not** delete your work — it reappears the next time you run the same command.

## More Detail

Each image folder has its own README plus two Word documents handed out in class — the **Design Document** and **Update Instructions** are the primary student references:

- [`cpp/`](cpp/) — C++ IDE: Dockerfile, settings, example program, docs
- [`x86/`](x86/) — x86 Assembly IDE: Dockerfile, settings, example program, docs

## Returning Students

The old `seancnc/unlv-cs-ide` image is retired. Switch to `seancnc/unlv-cpp-ide` (or `seancnc/unlv-x86-ide` for assembly) using the commands above — the new images work on both Intel/AMD and Apple Silicon machines.
