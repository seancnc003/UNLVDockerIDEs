#!/bin/sh
# Bind-mounted workspaces start empty on the student's first run; seed the
# starter files once. A workspace with student files is left untouched so
# work is never overwritten. Plain `ls` (not `ls -A`) so hidden files don't
# count: macOS Finder silently drops a .DS_Store into any folder the student
# so much as opens, and that alone must not suppress seeding.
if [ -z "$(ls /home/coder/workspace 2>/dev/null)" ]; then
    cp -r /opt/starter/. /home/coder/workspace/
fi
exec "$@"
