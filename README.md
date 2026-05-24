# UNLV Docker IDEs

Docker-based browser IDEs for UNLV programming courses and workshops.

## Images

| IDE | Docker Hub image | Source |
| --- | --- | --- |
| UNLV C++ IDE | `seancnc/unlv-cpp-ide` | `cpp/` |
| UNLV x86 Assembly IDE | `seancnc/unlv-x86-ide` | `x86/` |

The GitHub repository is the source of truth for Dockerfiles, configuration, documentation, and examples. Docker Hub hosts the built images students run directly.

## Repository Layout

```text
cpp/        C++ IDE Docker image, docs, settings, and examples
x86/        x86 Assembly IDE Docker image, docs, settings, and examples
docs/       GitHub Pages website
literature/ Local reference materials, ignored by Git
```

## GitHub Pages

Use `docs/` as the GitHub Pages publishing source:

1. Open the repository on GitHub.
2. Go to `Settings -> Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select `main` and `/docs`.
