# ------------------------------------------------------------------------------
# UNLV x86 Assembly IDE - Sandbox Edition
# ------------------------------------------------------------------------------
# Usage:
#   docker run -it --name unlv-x86-ide --platform linux/amd64 \
#     -p 127.0.0.1:8081:8080 \
#     -v unlv_x86_workspace:/home/coder/workspace seancnc/unlv-x86-ide
# ------------------------------------------------------------------------------
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl build-essential gcc-multilib gdb nasm binutils make sudo \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://code-server.dev/install.sh | sh -s -- --version 4.96.4

RUN useradd -m -s /bin/bash coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER coder

RUN code-server --install-extension formulahendry.code-runner

RUN mkdir -p /home/coder/workspace /home/coder/.local/share/code-server/User/
COPY --chown=coder:coder examples/ /home/coder/workspace/
COPY --chown=coder:coder config/settings.json /home/coder/.local/share/code-server/User/settings.json

VOLUME /home/coder/workspace

EXPOSE 8080
ENV PASSWORD=none

CMD ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "--disable-telemetry", "--disable-update-check", "/home/coder/workspace"]

