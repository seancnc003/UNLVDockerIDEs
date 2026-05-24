# UNLV x86 Assembly IDE Design

## Purpose

Provide a consistent x86-64 assembly programming environment for students using Docker.

## Base

- Ubuntu 22.04
- code-server 4.96.4
- NASM
- GNU binutils
- GCC/G++
- GDB
- Make

## Architecture

The image is intended for x86-64 Linux assembly. On Apple Silicon or other ARM machines, run with:

```bash
--platform linux/amd64
```

## Workspace

Student files are stored in:

```text
/home/coder/workspace
```

The recommended Docker volume is:

```text
unlv_x86_workspace
```

## Docker Hub

Canonical image:

```text
seancnc/unlv-x86-ide
```

