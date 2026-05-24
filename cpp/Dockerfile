# ------------------------------------------------------------------------------
# UNLV C++ IDE - Sandbox Edition
# ------------------------------------------------------------------------------
# Usage:
#   docker run -it --name unlv-cpp-ide -p 127.0.0.1:8080:8080 \
#     -v unlv_cpp_workspace:/home/coder/workspace seancnc/unlv-cpp-ide
# ------------------------------------------------------------------------------
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl build-essential gdb cmake valgrind clang-format clangd sudo \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://code-server.dev/install.sh | sh -s -- --version 4.96.4

RUN useradd -m -s /bin/bash coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER coder

RUN code-server --install-extension llvm-vs-code-extensions.vscode-clangd \
    && code-server --install-extension formulahendry.code-runner \
    && code-server --install-extension xaver.clang-format

RUN mkdir -p /home/coder/workspace /home/coder/.local/share/code-server/User/
COPY --chown=coder:coder examples/ /home/coder/workspace/
COPY --chown=coder:coder config/settings.json /home/coder/.local/share/code-server/User/settings.json

VOLUME /home/coder/workspace

EXPOSE 8080
ENV PASSWORD=none

CMD ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "--disable-telemetry", "--disable-update-check", "/home/coder/workspace"]
