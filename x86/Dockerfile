# ------------------------------------------------------------------------------
# UNLV x86 Assembly IDE - Sandbox Edition
# ------------------------------------------------------------------------------
# This image is x86-64 (linux/amd64) only: the coursework targets x86-64 Linux
# assembly, so the container userland must be x86-64. On Apple Silicon and
# other ARM hosts, Docker Desktop runs it under emulation via --platform.
#
# Student files live on the host: bind-mount a local folder as the workspace.
#
# Usage:
#   docker run -it --platform linux/amd64 --name unlv-x86-ide -p 127.0.0.1:8218:8080 -v "$HOME/UNLV/x86-workspace:/home/coder/workspace" seancnc/unlv-x86-ide
# ------------------------------------------------------------------------------
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl build-essential gcc-multilib gdb nasm yasm binutils make sudo \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://code-server.dev/install.sh | sh -s -- --version 4.96.4

RUN useradd -m -s /bin/bash coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER coder

RUN code-server --install-extension formulahendry.code-runner

RUN mkdir -p /home/coder/workspace /home/coder/.local/share/code-server/User/
COPY --chown=coder:coder image/settings.json /home/coder/.local/share/code-server/User/settings.json

# Starter files can't be baked into the workspace itself: a bind-mounted host
# folder would shadow them. The entrypoint seeds them on first run instead;
# anything added to image/starter/ ships automatically.
COPY --chown=coder:coder image/starter/ /opt/starter/
COPY --chown=coder:coder image/entrypoint.sh /usr/local/bin/entrypoint.sh

# Course branding: replace code-server's default favicon set (browser tab icon).
COPY image/branding/ /usr/lib/code-server/src/browser/media/

# No VOLUME instruction on purpose: students bind-mount a host folder (see
# Usage above). A VOLUME here would silently create stray anonymous volumes
# whenever the container is run without -v.

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "--app-name", "UNLV x86 IDE", "--disable-telemetry", "--disable-update-check", "/home/coder/workspace"]
