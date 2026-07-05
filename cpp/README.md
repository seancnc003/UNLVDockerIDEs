# UNLV C++ IDE

VS Code in your browser with a full C++ toolchain, packaged as the Docker image `seancnc/unlv-cpp-ide`. The image is multi-arch (`linux/amd64` and `linux/arm64`), so it runs natively on Intel/AMD machines and Apple Silicon Macs alike.

## What's Inside

- Ubuntu 22.04 with code-server 4.126.0 (auth disabled, served on port 8080)
- g++ 11.4 and gcc (via `build-essential`), gdb 12.1, cmake, valgrind, clang-format, clangd
- Extensions: clangd (code intelligence), Code Runner, Clang-Format
- The Run button compiles with `g++ -std=c++14 -Wall -g` and runs in the integrated terminal
- Example program `hello.cpp` waiting in the workspace

## Run It

```bash
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 \
  -v unlv_cpp_workspace:/home/coder/workspace seancnc/unlv-cpp-ide
```

Then open <http://127.0.0.1:8080>. To start it again later (the container already exists):

```bash
docker start unlv-cpp-ide
```

## Verify It's Working

The IDE should open straight into `/home/coder/workspace` with `hello.cpp` in it. In the IDE's terminal:

```bash
g++ hello.cpp -o hello && ./hello
```

You should see `Hello, C++!`. Clicking the Run button on `hello.cpp` does the same thing.

## Updating

Your files live in the `unlv_cpp_workspace` volume, so updating never touches them. Pull the latest image, replace the container, and rerun:

```bash
docker pull seancnc/unlv-cpp-ide
docker stop unlv-cpp-ide && docker rm unlv-cpp-ide
docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 \
  -v unlv_cpp_workspace:/home/coder/workspace seancnc/unlv-cpp-ide
```

## Folder Contents

| File | Purpose |
| --- | --- |
| `Dockerfile` | Image definition |
| `settings.json` | Pre-configured code-server/editor settings baked into the image |
| `hello.cpp` | Example program copied into the workspace |
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
