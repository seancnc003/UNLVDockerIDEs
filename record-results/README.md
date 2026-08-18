# Record-run results

This directory contains the raw JSON evidence from official platform-matrix
record runs. Files here are copied verbatim from the output of the published,
unmodified `scripts/ci-test.sh` and are committed so results can be audited on
another machine. Each cloud cell's `*-runlog.txt` is the verbatim full run
transcript (`run.log`) from that launch — archived alongside the JSONs so the
repo alone reproduces the complete evidence with no dependency on the S3
bucket. Two further exceptions: the cell 2 re-run `diag-*` files are verbatim
captures from that launch's scripted diagnostics stage (`docker inspect` /
`docker logs` in the user-data, run after `ci-test.sh` finished), archived as
the evidence for the crash cause recorded in RESULTS.md; and
`cell3-windows-aws-runlog.txt` is the verbatim PowerShell transcript
(`run.log`) from the cell 3 AWS launch, archived because that launch was an
infrastructure failure of the test rig — `ci-test.sh` never ran and no JSON
exists, so the transcript is the only evidence (see RESULTS.md Notes). The
cell 2 re-run JSON is confirmation evidence only — RESULTS.md tables are
transcribed from the first record-run JSON.

The generated working directory (`results/`, holding local ci-test.sh
output plus the `aws/`, `azure/`, and `s3-final-backup/` caches) remains
ignored.
Practice, familiarization, and ad-hoc runs do not belong here.

The Azure record run (RESULTS.md's separate "Azure record run" section —
never merged into the AWS + local tables) archives its evidence here
under `azure-`-prefixed filenames, following the same verbatim-copy
rules. `azure-cellA3-windows-runlog.txt` is the verbatim PowerShell
transcript (`run.log`, UTF-8 with BOM as PowerShell wrote it), covering
all four attempts of the run. `azure-cellA3-windows-run1-no-wsl-integration.json`
is anomaly evidence from a failed automation attempt, not a result —
see the Azure run-anomalies note in RESULTS.md. The S3 transport bucket
was deleted after the run (full teardown); this directory is the sole
authoritative evidence archive.

## Files

| Cell | Environment | Raw result |
| --- | --- | --- |
| 1 | Linux amd64, AWS m8i.large, Docker Engine, native | [`cell1-linux-amd64.json`](cell1-linux-amd64.json), [`cell1-linux-amd64-runlog.txt`](cell1-linux-amd64-runlog.txt) |
| 2 | Linux arm64, AWS m8g.large, Docker Engine + QEMU binfmt, emulated | [`cell2-linux-arm64.json`](cell2-linux-arm64.json), [`cell2-linux-arm64-runlog.txt`](cell2-linux-arm64-runlog.txt) |
| 2 (confirmation re-run) | Same environment, separate launch ~07:01 UTC 2026-08-18; reproduced the suite outcome (3/5) and diagnosed the crash | [`cell2-linux-arm64-rerun.json`](cell2-linux-arm64-rerun.json), [`cell2-linux-arm64-rerun-runlog.txt`](cell2-linux-arm64-rerun-runlog.txt), [`cell2-linux-arm64-rerun-diag-state.txt`](cell2-linux-arm64-rerun-diag-state.txt), [`cell2-linux-arm64-rerun-diag-container.log`](cell2-linux-arm64-rerun-diag-container.log), [`cell2-linux-arm64-rerun-diag-dmesg.txt`](cell2-linux-arm64-rerun-diag-dmesg.txt), [`cell2-linux-arm64-rerun-diag-free.txt`](cell2-linux-arm64-rerun-diag-free.txt), [`cell2-linux-arm64-rerun-diag-ps.txt`](cell2-linux-arm64-rerun-diag-ps.txt) |
| 3 (AWS attempt — infrastructure failure, no JSON) | Windows amd64, AWS m8i.xlarge, Windows Server 2025 (Windows 11 proxy); `ci-test.sh` never ran — rig failure, not a platform result | [`cell3-windows-aws-runlog.txt`](cell3-windows-aws-runlog.txt) |
| 4 | macOS arm64, Apple M1 Pro, Docker Desktop emulation | [`cell4-macos-arm64.json`](cell4-macos-arm64.json) |
| A3 (Azure record run — separate matrix) | Windows amd64, Azure Standard_D4s_v5, Windows 11 Pro 24H2, Docker Desktop/WSL2, native | [`azure-cellA3-windows.json`](azure-cellA3-windows.json), [`azure-cellA3-windows-runlog.txt`](azure-cellA3-windows-runlog.txt), [`azure-cellA3-windows-run1-no-wsl-integration.json`](azure-cellA3-windows-run1-no-wsl-integration.json) (anomaly evidence) |
