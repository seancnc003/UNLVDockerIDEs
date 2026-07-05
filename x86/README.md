# UNLV x86 Assembly IDE

VS Code in your browser with an x86-64 Linux assembly toolchain (NASM), packaged as the Docker image `seancnc/unlv-x86-ide`.

## Important: This Image Is x86-64 Only

The coursework is x86-64 Linux assembly, so the container itself must be x86-64 — there is deliberately no ARM version, because your `.asm` files could not assemble or run inside one. That's why the run command always includes `--platform linux/amd64`.

**On Apple Silicon Macs** this still works: Docker Desktop translates the container's x86-64 instructions to ARM on the fly (emulation), so everything behaves the same, just a little slower. Forgetting the `--platform linux/amd64` flag is the number one gotcha — always include it.

## What's Inside

- Ubuntu 22.04 with code-server 4.96.4 (auth disabled, served on port 8080 inside the container)
- nasm 2.15, GNU ld (binutils), gdb 12.1, make, plus gcc/g++ (`build-essential`, `gcc-multilib`)
- Extension: Code Runner — the Run button assembles with `nasm -f elf64`, links with `ld`, and runs the result
- Examples in the workspace: `hello.asm` and a `Makefile`

## Run It

```bash
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8081:8080 \
  -v unlv_x86_workspace:/home/coder/workspace seancnc/unlv-x86-ide
```

Then open <http://127.0.0.1:8081>. Host port 8081 keeps it clear of the C++ IDE's 8080, so you can run both side by side. To start it again later:

```bash
docker start unlv-x86-ide
```

## Verify It's Working

The IDE should open straight into `/home/coder/workspace` with `hello.asm` and `Makefile` in it. In the IDE's terminal:

```bash
make && ./hello
```

You should see `Hello, x86!`.

## Updating

Your files live in the `unlv_x86_workspace` volume, so updating never touches them. Pull the latest image, replace the container, and rerun:

```bash
docker pull seancnc/unlv-x86-ide
docker stop unlv-x86-ide && docker rm unlv-x86-ide
docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8081:8080 \
  -v unlv_x86_workspace:/home/coder/workspace seancnc/unlv-x86-ide
```

## Folder Contents

| File | Purpose |
| --- | --- |
| `Dockerfile` | Image definition |
| `settings.json` | Pre-configured code-server/editor settings baked into the image |
| `hello.asm`, `Makefile` | Example program copied into the workspace |
| `Design Document.docx`, `Update Instructions.docx` | Student handouts (primary deliverables) |
| `.dockerignore` | Keeps docs (`*.docx`, `README.md`) out of the image build |

## For Maintainers

Build locally (from the repo root) — always amd64, never multi-arch:

```bash
docker build --platform linux/amd64 -t seancnc/unlv-x86-ide x86/
```

Publish (amd64 only):

```bash
docker buildx build --platform linux/amd64 --push -t seancnc/unlv-x86-ide x86/
```
