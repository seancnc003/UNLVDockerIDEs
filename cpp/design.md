# UNLV C++ IDE Design

## Purpose

Provide a consistent C++ development environment for students without requiring local compiler or IDE setup.

## Base

- Ubuntu 22.04
- code-server 4.96.4
- GCC/G++
- GDB
- CMake
- Valgrind
- clangd
- clang-format

## Workspace

Student files are stored in:

```text
/home/coder/workspace
```

The recommended Docker volume is:

```text
unlv_cpp_workspace
```

## Docker Hub

Canonical image:

```text
seancnc/unlv-cpp-ide
```

