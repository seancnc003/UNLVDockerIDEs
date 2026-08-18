# Results — Platform Matrix (x86 image only)

Blank until the record run. Every number below is transcribed from the
JSONs emitted by the unmodified published `scripts/ci-test.sh` — no other
source. Cells 1–3 come from the AWS **record run** (pass 2 of
[papers/AWS_RUNBOOK.md](papers/AWS_RUNBOOK.md); the familiarization pass under `manual-practice/` is never
reported). Cell 4 is the local MacBook run. Image under test:
`seancnc/unlv-x86-ide` (amd64-only by design).

## Provenance

| Field | Value |
| --- | --- |
| Record-run date (cells 1–3) | |
| Familiarization-run date (not reported) | |
| Cell 4 run date | |
| Image tag / digest | |
| ci-test.sh git commit | |
| Total AWS cost (Cost Explorer, actual) | |

## Table 1 — Platform matrix

| Metric | Cell 1: Linux amd64 (m8i.large) | Cell 2: Linux arm64 (m8g.large) | Cell 3: Windows amd64 (m8i.xlarge) | Cell 4: macOS arm64 (M1 Pro, 16 GB) |
| --- | --- | --- | --- | --- |
| x86 image mode | native | emulated (QEMU binfmt) | native (Docker Desktop/WSL2) | emulated (Docker Desktop) |
| gdb probe (working/broken) | | | | |
| Pull time (s) | | | | |
| Image size (MB) | | | | |
| Cold start → healthy (s) | | | | |
| Warm start (s) | | | | |
| Starter compile+run, median of 3 (s) | | | | |
| Idle memory (MiB) | | | | |
| Workload peak memory (MiB) | | | | |
| Starter seeding | | | | |
| Persistence across replacement | | | | |
| Overall (pass / recorded) | | | | |

## Table 2 — Coursework workload (CS 218 assignments)

Build and run seconds per assignment; status is pass / build-fail /
run-fail (recorded, not failed, under emulation — same policy as gdb).

| Assignment | Cell 1 build / run / status | Cell 2 build / run / status | Cell 3 build / run / status | Cell 4 build / run / status |
| --- | --- | --- | --- | --- |
| ast3 (pure assembly) | | | | |
| ast04 (pure assembly) | | | | |
| ast06 (C++ driver + assembly, file I/O) | | | | |
| ast12 (multithreaded pthread + assembly, checkable answer) | | | | |

## Table 3 — Emulation overhead ratios (derived)

Emulated time ÷ native time on the identical workload (cell 2 ÷ cell 1 for
QEMU binfmt; cell 4 ÷ cell 1 for Docker Desktop).

| Workload | QEMU binfmt (cell 2 / cell 1) | Docker Desktop (cell 4 / cell 1) |
| --- | --- | --- |
| Starter compile+run | | |
| ast3 | | |
| ast04 | | |
| ast06 | | |
| ast12 | | |

## Table 4 — Host records (embedded in each JSON)

| Field | Cell 1 | Cell 2 | Cell 3 | Cell 4 |
| --- | --- | --- | --- | --- |
| CPU model | | | | |
| Cores | | | | |
| RAM (GB) | | | | |
| OS build | | | | |
| Docker version | | | | |

## Table 5 — Tool versions (reproducibility)

Expected identical in every cell — the container promise itself.

| Tool | Cell 1 | Cell 2 | Cell 3 | Cell 4 |
| --- | --- | --- | --- | --- |
| code-server | | | | |
| yasm | | | | |
| nasm | | | | |
| gdb | | | | |

## Notes / anomalies

(Anything observed during the runs that a table cell cannot hold —
deviations, re-runs, surprises. An empty section after the record run is
itself a result.)
