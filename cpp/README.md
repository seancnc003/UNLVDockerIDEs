# UNLV C++ IDE

Browser-based C++ development environment using Docker and code-server.

## Run

```bash
docker run -it --name unlv-cpp-ide \
  -p 127.0.0.1:8080:8080 \
  -v unlv_cpp_workspace:/home/coder/workspace \
  seancnc/unlv-cpp-ide
```

Open `http://127.0.0.1:8080`.

## Build Locally

```bash
docker build -t seancnc/unlv-cpp-ide ./cpp
```

