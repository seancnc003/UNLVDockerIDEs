# UNLV C++ IDE Update Instructions

## Pull Latest Image

```bash
docker pull seancnc/unlv-cpp-ide
```

## Recreate Container

Stop and remove the old container, then run:

```bash
docker run -it --name unlv-cpp-ide \
  -p 127.0.0.1:8080:8080 \
  -v unlv_cpp_workspace:/home/coder/workspace \
  seancnc/unlv-cpp-ide
```

The named volume preserves student files.

