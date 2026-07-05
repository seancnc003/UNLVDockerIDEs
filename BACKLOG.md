# Backlog

Ported from the pre-rebuild `Backlog.docx` (July 2026). Original wording kept in
quotes; items apply to both images unless noted.

## Open

- [ ] **"Update setup and update instructions"** — the `Design Document.docx` and
  `Update Instructions.docx` handouts in `cpp/` and `x86/` still describe the old
  workflow (named volumes, legacy image name). Maintainer to revise them to match
  the bind-mount commands in the READMEs.
- [ ] **"Standardize updates to allow for multiple maintainers"** — define a
  release process that doesn't live in one person's head: version tags on Docker
  Hub (not just `latest`), a documented build/push checklist (or CI), and
  contributor guidance in AGENTS.md.

## Completed by the July 2026 rebuild

- [x] **"Bind the terminal name"** — both images now run with `--app-name`
  ("UNLV C++ IDE" / "UNLV x86 IDE") and ship custom favicons (scarlet **C**,
  charcoal **X**) replacing code-server's default tab icon.

- [x] **"Bind the container name"** — run commands pin `--name unlv-cpp-ide` /
  `--name unlv-x86-ide`.
- [x] **"Refactor Dockerfile"** — both Dockerfiles rebuilt: AI surfaces disabled,
  bind-mount workspaces with first-run seeding entrypoint, no VOLUME, no dead
  ENV, pinned code-server versions.
