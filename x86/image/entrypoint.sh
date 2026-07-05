#!/bin/sh
# Bind-mounted workspaces start empty on the student's first run; seed the
# starter files once. A non-empty workspace is left untouched so student
# work (including deliberate deletions) is never overwritten.
if [ -z "$(ls -A /home/coder/workspace 2>/dev/null)" ]; then
    cp -r /opt/starter/. /home/coder/workspace/
fi
exec "$@"
