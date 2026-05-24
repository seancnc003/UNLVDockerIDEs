# UNLV x86 Assembly IDE

Browser-based x86-64 assembly development environment using Docker and code-server.

## Run

```bash
docker run -it --name unlv-x86-ide \
  --platform linux/amd64 \
  -p 127.0.0.1:8081:8080 \
  -v unlv_x86_workspace:/home/coder/workspace \
  seancnc/unlv-x86-ide
```

Open `http://127.0.0.1:8081`.

## Build Locally

```bash
docker build --platform linux/amd64 -t seancnc/unlv-x86-ide ./x86
```

