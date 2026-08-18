# Results — Platform Matrix (x86 image only)

Cells 1–3 are blank until the AWS record run; cell 4 is filled
(2026-08-17). Every number below is transcribed from the
JSONs emitted by the unmodified published `scripts/ci-test.sh` — no other
source. Cells 1–3 come from the AWS **record run** (pass 2 of
[`papers/AWS_RUNBOOK.md`](../papers/AWS_RUNBOOK.md); the familiarization pass under `manual-practice/` is never
reported). Cell 4 is the local MacBook run. Official raw record-run JSONs are
archived without modification alongside this file; generated working
directories remain ignored. Image under test:
`seancnc/unlv-x86-ide` (amd64-only by design).

## Provenance

| Field | Value |
| --- | --- |
| Record-run date (cells 1–3) | |
| Familiarization-run date (not reported) | |
| Cell 4 run date | 2026-08-17 |
| Image tag / digest | `seancnc/unlv-x86-ide:latest` / `sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6` |
| ci-test.sh git commit | `b8332e71c5da0beca68a3373f94f4b2b440483cc` |
| Total AWS cost (Cost Explorer, actual) | |

## Table 1 — Platform matrix

| Metric | Cell 1: Linux amd64 (m8i.large) | Cell 2: Linux arm64 (m8g.large) | Cell 3: Windows amd64 (m8i.xlarge) | Cell 4: macOS arm64 (M1 Pro, 16 GB) |
| --- | --- | --- | --- | --- |
| x86 image mode | native | emulated (QEMU binfmt) | native (Docker Desktop/WSL2) | emulated (Docker Desktop) |
| gdb probe (working/broken) | | | | broken |
| Pull time (s) | | | | 44.7 |
| Image size (MB) | | | | 552 |
| Cold start → healthy (s) | | | | 4.8 |
| Warm start (s) | | | | 4.3 |
| Starter compile+run, median of 3 (s) | | | | 0.4 |
| Idle memory (MiB) | | | | 263.1 |
| Workload peak memory (MiB) | | | | 358 |
| Starter seeding | | | | pass |
| Persistence across replacement | | | | pass |
| Overall (pass / recorded) | | | | recorded (12 checks passed, 0 failed; gdb broken as expected) |

## Table 2 — Coursework workload (CS 218 assignments)

Build and run seconds per assignment; status is pass / build-fail /
run-fail (recorded, not failed, under emulation — same policy as gdb).

| Assignment | Cell 1 build / run / status | Cell 2 build / run / status | Cell 3 build / run / status | Cell 4 build / run / status |
| --- | --- | --- | --- | --- |
| ast3 (pure assembly) | | | | 0.4 / 0.2 / pass |
| ast04 (pure assembly) | | | | 0.4 / 0.1 / pass |
| ast06 (C++ driver + assembly, file I/O) | | | | 2.5 / 0.2 / pass |
| ast12 (multithreaded pthread + assembly, checkable answer) | | | | 3.1 / 0.2 / pass |

## Table 3 — Emulation overhead ratios (derived)

Emulated time ÷ native time on the identical workload (cell 2 ÷ cell 1 for
QEMU binfmt; cell 4 ÷ cell 1 for Docker Desktop). Cell 1 is the
denominator by design: cells 1 and 2 are same-size, same-generation
Intel/Graviton siblings running identical Ubuntu + Docker Engine, so the
ratio isolates the emulation layer as the only changed variable. Cell 3
appears in no ratio — it is native (no emulation to price), and dividing
by it would mix in Windows, WSL2, and a larger instance size (see
[`papers/EXPERIMENT_PLAN.md`](../papers/EXPERIMENT_PLAN.md), "Ratio baseline").

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
| CPU model | | | | Apple M1 Pro |
| Cores | | | | 8 |
| RAM (GB) | | | | 16 |
| OS build | | | | macOS 26.4 |
| Docker version | | | | Docker 29.2.1 |

## Toolchain versions

Not a per-cell table: given the same image digest (see Provenance), tool
versions are a fixed property of the image, so they are listed once in the
repo [README](../README.md). The per-cell verification still exists in the
raw data — every `ci-test.sh` JSON records the versions it observed — and
a mismatch would mean a different image ran, which the Provenance digest
is the check for.

## Notes / anomalies

(Anything observed during the runs that a table cell cannot hold —
deviations, re-runs, surprises. An empty section after the record run is
itself a result.)
