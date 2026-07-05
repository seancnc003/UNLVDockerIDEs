# ------------------------------------------------------------------------------
# UNLV C++ IDE - Sandbox Edition
# ------------------------------------------------------------------------------
# Usage:
#   docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 \
#     -v "$HOME/UNLV/cpp-workspace:/home/coder/workspace" seancnc/unlv-cpp-ide
# Student files live in the bind-mounted host folder. Do not add --restart;
# the container should only run when explicitly started.
# ------------------------------------------------------------------------------
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl build-essential gdb cmake valgrind clang-format clangd sudo \
    && rm -rf /var/lib/apt/lists/*

# install.sh detects the build platform's architecture, so this stays
# multi-arch safe (linux/amd64 and linux/arm64) under docker buildx.
RUN curl -fsSL https://code-server.dev/install.sh | sh -s -- --version 4.126.0

# coder gets UID/GID 1000 (first regular user). On Linux hosts, bind-mounted
# files therefore appear owned by the default first user; Docker Desktop
# (macOS/Windows) remaps bind-mount ownership to the host user automatically.
RUN useradd -m -s /bin/bash coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER coder

RUN code-server --install-extension llvm-vs-code-extensions.vscode-clangd \
    && code-server --install-extension formulahendry.code-runner \
    && code-server --install-extension xaver.clang-format

RUN mkdir -p /home/coder/workspace /home/coder/.local/share/code-server/User/
COPY --chown=coder:coder settings.json /home/coder/.local/share/code-server/User/settings.json

# Starter files can't be baked into the workspace itself: a bind-mounted host
# folder would shadow them. The entrypoint seeds them on first run instead.
COPY --chown=coder:coder hello.cpp /opt/starter/
COPY --chown=coder:coder entrypoint.sh /usr/local/bin/entrypoint.sh

# No VOLUME instruction: the documented run command bind-mounts the workspace,
# and a VOLUME here would leave stray anonymous volumes behind whenever the
# image is run without -v.
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "--disable-telemetry", "--disable-update-check", "/home/coder/workspace"]
