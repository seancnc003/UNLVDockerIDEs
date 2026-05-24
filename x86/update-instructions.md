# UNLV x86 Assembly IDE Update Instructions

## Pull Latest Image

```bash
docker pull seancnc/unlv-x86-ide
```

## Recreate Container

Stop and remove the old container, then run:

```bash
docker run -it --name unlv-x86-ide \
  --platform linux/amd64 \
  -p 127.0.0.1:8081:8080 \
  -v unlv_x86_workspace:/home/coder/workspace \
  seancnc/unlv-x86-ide
```

The named volume preserves student files.

