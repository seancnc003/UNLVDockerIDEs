# Results — Platform Matrix (x86 image only)

Cell 1 is filled from the AWS record run (2026-08-18); cell 2 is filled
from the AWS QEMU follow-up full run (2026-08-18, run `20260818-202601`,
`arm64-binfmt` variant, full suite with coursework — it supersedes the
record run's stock-QEMU
result after the crash was traced to Ubuntu 24.04's QEMU 8.2.2 itself;
see Notes); cell 3 is
filled from the Azure record run on real Windows 11 Pro (2026-08-18,
after the AWS Windows Server proxy attempt failed as rig infrastructure
— see Notes); cell 4 is the local MacBook run (2026-08-17).
Every number below is transcribed from the
JSONs emitted by the unmodified published `scripts/ci-test.sh` — no other
source. Cell 1 comes from the AWS **record run** (pass 2 of
[`papers/AWS_RUNBOOK.md`](../papers/AWS_RUNBOOK.md); the familiarization pass under `manual-practice/` is never
reported). All raw record-run outputs
(JSONs, transcripts, diagnostics) are archived verbatim in
[EVIDENCE.md](EVIDENCE.md) alongside this file; generated working
directories remain ignored. Image under test:
`seancnc/unlv-x86-ide` (amd64-only by design).

**Cross-cloud caveat for cell 3's timings:** cell 3 ran on Azure
(Standard_D4s_v5, Emerald Rapids) while cells 1–2 ran on AWS (m8i/m8g,
same-size siblings) — a different cloud, CPU model, and VM size. Its
behavioral results (pass/fail, gdb, seeding, persistence) are directly
comparable; its seconds are indicative and are never cross-divided with
the other cells' (cell 3 appears in no derived ratio, which was already
true by design).

## Provenance

| Field | Value |
| --- | --- |
| Record-run date (cell 1, AWS) | 2026-08-18, matrix run `20260818-053827` (the same run's Windows Server launch was an infrastructure failure — no JSON, suite never ran; see Notes) |
| Cell 2 source run (QEMU follow-up full run, AWS) | 2026-08-18, run `20260818-202601`, `scripts/aws-qemu-followup.sh` `arm64-binfmt` variant at full suite scope (coursework shipped; 12 checks passed, 0 failed) — same m8g.large / Ubuntu 24.04 as the superseded record cell; the only change is the QEMU handler source: `tonistiigi/binfmt@sha256:400a4873b838d1b89194d982c45e5fb3cda4593fbfd7e08a02e76b03b21166f0` (Docker's handler build, digest logged in the run log) instead of Ubuntu's `qemu-user-static` 8.2.2. `ci-test.sh` fetched from published main at run time, byte-identical to the record run's copy (file unchanged since commit `775fb5b`). An earlier diagnostic-scope pass of the same configuration (run `20260818-195946`, no coursework, 8/8) preceded it — see Notes |
| Record-run date (cell 3, Azure) | 2026-08-18, run `20260818-093352` — complete, pass 13/13 (evidence files carry the run's `azure-cellA3-` label) |
| Familiarization-run date (not reported) | |
| Superseded cell 2 record run + confirmation re-run (stock QEMU 8.2.2; not a tables source) | 2026-08-18: matrix run `20260818-053827` (suite fail 3/5) and confirmation launch ~07:01 UTC, S3 prefix `20260818-053827-arm64-rerun` (n=2 reproduction + SIGSEGV diagnostics) — see Notes |
| Cell 4 run date | 2026-08-17 |
| Cell 3 platform | Azure Standard_D4s_v5, westcentralus, Windows 11 Pro 24H2 (`MicrosoftWindowsDesktop:windows-11:win11-24h2-pro:latest`, version 26100.9168.260809), `--security-type Standard`, no public IP, no inbound NSG rules |
| Cell 3 subscription / licensing | Pay-As-You-Go (upgraded from Azure for Students 2026-08-18); launched with `--license-type Windows_Client` — see the licensing note in Notes |
| Image tag / digest | `seancnc/unlv-x86-ide:latest` / `sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6` (same digest verified on every cell, both clouds and local) |
| ci-test.sh git commit | `b8332e71c5da0beca68a3373f94f4b2b440483cc` (cell 3 fetched the published main copy from raw.githubusercontent.com at run time, unmodified) |
| Total AWS cost (Cost Explorer, actual) | |
| Total Azure cost | ~$0.40–0.60 **(estimate — Azure billing lags ~1 day; replace with the portal's actual figure)**: D4s_v5 ≈ $0.19/h × ~1.8 h + OS disk pennies; `--license-type Windows_Client` (BYOL) adds no software surcharge |

## Table 1 — Platform matrix

| Metric | Cell 1: Linux amd64 (AWS m8i.large) | Cell 2: Linux arm64 (AWS m8g.large) | Cell 3: Windows amd64 (Azure D4s_v5, Windows 11 Pro 24H2 — cross-cloud caveat above) | Cell 4: macOS arm64 (M1 Pro, 16 GB) |
| --- | --- | --- | --- | --- |
| x86 image mode | native | emulated (QEMU binfmt, Docker's `tonistiigi/binfmt` handler build — stock Ubuntu QEMU 8.2.2 crashes; see Notes) | native (Docker Desktop/WSL2) | emulated (Docker Desktop) |
| gdb probe (working/broken) | working | broken | working | broken |
| Pull time (s) | 16.3 | 12.9 | 53.1 (network-dominated; engine warm — see Notes) | 44.7 |
| Image size (MB) | 552 | 552 | 552 | 552 |
| Cold start → healthy (s) | 0.5 | 6.7 | 0.6 | 4.8 |
| Warm start (s) | 0.5 | 6.2 | 0.5 | 4.3 |
| Starter compile+run, median of 3 (s) | 0.0 | 0.3 (0.3 / 0.3 / 0.3) | 0.2 (0.2 / 0.2 / 0.2) | 0.4 |
| Idle memory (MiB) | 54.29 | 254.8 | 56.36 | 263.1 |
| Workload peak memory (MiB) | null (see Notes) | 334 | 90 | 358 |
| Starter seeding | pass | pass | pass | pass |
| Persistence across replacement | pass | pass | pass | pass |
| Overall (pass / recorded) | pass (13 checks passed, 0 failed; gdb working as expected) | recorded (12 checks passed, 0 failed; gdb broken as expected — clean probe) | pass (13 checks passed, 0 failed; gdb working; Azure record run — the AWS Server-proxy attempt was a rig failure, see Notes) | recorded (12 checks passed, 0 failed; gdb broken as expected) |

## Table 2 — Coursework workload (CS 218 assignments)

Build and run seconds per assignment; status is pass / build-fail /
run-fail (recorded, not failed, under emulation — same policy as gdb).

| Assignment | Cell 1 build / run / status | Cell 2 build / run / status | Cell 3 build / run / status | Cell 4 build / run / status |
| --- | --- | --- | --- | --- |
| ast3 (pure assembly) | 0.0 / 0.0 / pass | 0.3 / 0.1 / pass | 0.2 / 0.2 / pass | 0.4 / 0.2 / pass |
| ast04 (pure assembly) | 0.0 / 0.0 / pass | 0.3 / 0.1 / pass | 0.2 / 0.2 / pass | 0.4 / 0.1 / pass |
| ast06 (C++ driver + assembly, file I/O) | 0.2 / 0.0 / pass | 2.8 / 0.1 / pass | 0.5 / 0.2 / pass | 2.5 / 0.2 / pass |
| ast12 (multithreaded pthread + assembly, checkable answer) | 0.3 / 0.0 / pass | 3.6 / 0.1 / pass | 0.6 / 0.2 / pass | 3.1 / 0.2 / pass |

## Emulation overhead (derived)

On the two workloads with usable native denominators, both emulation
layers price out at the same order of magnitude. QEMU binfmt
(cell 2 ÷ cell 1): **≈14×** (ast06 build, 2.8 / 0.2 s) and **≈12×**
(ast12 build, 3.6 / 0.3 s). Docker Desktop
(cell 4 ÷ cell 1): **≈12.5×** (ast06 build, 2.5 / 0.2 s)
and **≈10.3×** (ast12 build, 3.1 / 0.3 s). All are order-of-magnitude
figures, since the 0.2–0.3 s denominators are coarsely quantized. The
remaining ratios are undefined:
the other rows have a 0.0 s denominator (cell 1 at the timer
floor), including both emulated cells' 0.3–0.4 s starter compiles.
Note the cell 2 numerators come from Docker's `tonistiigi/binfmt`
handler build (the configuration that works — stock QEMU 8.2.2 crashes
outright; see Notes), so the QEMU ratios price that handler build
specifically. Cell 1 is the denominator by design: cells 1 and 2 are
same-size, same-generation Intel/Graviton siblings running identical
Ubuntu + Docker Engine, so the ratio isolates the emulation layer as
the only changed variable (see
[`papers/EXPERIMENT_PLAN.md`](../papers/EXPERIMENT_PLAN.md), "Ratio
baseline"). Cell 3 enters no ratio — it is native (no emulation to
price) and ran on a different cloud. Details on each undefined case are
in Notes.

## Table 3 — Host records (embedded in each JSON)

| Field | Cell 1 | Cell 2 | Cell 3 | Cell 4 |
| --- | --- | --- | --- | --- |
| CPU model | Intel(R) Xeon(R) 6975P-C | Neoverse-V2 | Intel Xeon Platinum 8573C | Apple M1 Pro |
| Cores | 2 | 2 | 4 | 8 |
| RAM (GB) | 8 | 8 | 8 (WSL2 view — see note below) | 16 |
| OS build | Ubuntu 24.04.4 LTS | Ubuntu 24.04.4 LTS | Ubuntu 26.04 LTS (WSL2 guest — see note below) | macOS 26.4 |
| Docker version | Docker 29.1.3 | Docker 29.1.3 | Docker 29.7.2 | Docker 29.2.1 |

Cell 3 note: `ci-test.sh` runs inside WSL2, so its JSON's host block
records the WSL2 guest's view — the Ubuntu distro, WSL's default RAM
grant (8 GB = half of the VM's 16 GB), and the Linux-side Docker engine.
The first-level host is the Windows layer: Windows 11 Pro 24H2 build
26100.9168 on an Azure Standard_D4s_v5 (4 vCPU, 16 GB), Docker Desktop
current stable, WSL 2.7.11. Both layers are provenance; the table shows
what the JSON itself recorded.

## Toolchain versions

Not a per-cell table: given the same image digest (see Provenance), tool
versions are a fixed property of the image, so they are listed once in the
repo [README](../README.md). The per-cell verification still exists in the
raw data — every `ci-test.sh` JSON records the versions it observed — and
a mismatch would mean a different image ran, which the Provenance digest
is the check for.

## Notes / anomalies

(Observations a table cell cannot hold; verbatim evidence for every item
is in [EVIDENCE.md](EVIDENCE.md).)

- **Launch retries/accidents (no measurements lost):** cells 1–2's first
  launches died on a user-data bug (Ubuntu 24.04 dropped the `awscli`
  apt package); the AWS windows cell's first launch was killed by the
  driver's exit trap. Recorded cells are the retries.
- **Cell 2 supersession (2026-08-18):** the tables come from the
  follow-up full run `20260818-202601` (`cell2-qemu-followup-full.*`) —
  same instance, OS, image digest, and unmodified `ci-test.sh` as the
  record cell; the only change is the QEMU handler: Docker's
  `tonistiigi/binfmt` build (digest in Provenance) instead of stock
  8.2.2. Result 12/12 with a clean gdb probe. A diagnostic-scope pass
  (`20260818-195946`, no coursework, 8/8) preceded it; the passes'
  shared metrics agree closely — an incidental repeatability check.
- **The superseded stock-QEMU result (kept as a finding):** under
  `qemu-user-static` 8.2.2 the suite failed 3 passed / 5 failed —
  code-server never reached healthy; reproduced exactly (n=2,
  `cell2-linux-arm64-rerun.*`) with the cause captured: `QEMU internal
  SIGSEGV {code=MAPERR}`, exit 139, OOM ruled out. With the follow-up's
  pass on otherwise identical hardware, the crash is **version-bound to
  the QEMU build**, not a property of the image or of ARM Linux.
- **Two rig failures (no platform information, enter no table):** the
  follow-up's Ubuntu 26.04 variant never registered a handler
  (`qemu-user-static` had no apt candidate on that AMI → `exec format
  error`; `cell2-qemu-followup-distro-runlog.txt`), and the AWS Windows
  Server 2025 proxy never ran the suite (Docker Desktop's silent
  installer no-ops outside its Windows 10/11 support matrix;
  `cell3-windows-aws-runlog.txt`). The Azure Windows 11 Pro re-run
  (13/13, gdb working) is what fills cell 3.
- **Cell 3 Azure anomalies (run `20260818-093352`):** the recorded
  result is attempt 4 on the same VM; attempts 1–3 were automation
  failures fixed live (trail in the archived run log; the false
  "engine up" JSON is archived as anomaly evidence). The suite ran via
  an interactive scheduled task with a warm engine — affects nothing
  reported (cold start measures container start in every cell). The
  presigned-URL checksum trap and fix:
  [`papers/AZURE_RUNBOOK.md`](../papers/AZURE_RUNBOOK.md), Phase 5.
- **Cell 3 subscription/licensing posture:** unlaunchable on Azure for
  Students (fixed-performance SKUs blocked; launchable burstables
  cannot nest) → upgraded to Pay-As-You-Go on 2026-08-18. Launched
  `--license-type Windows_Client` by explicit operator decision after
  the caveat was surfaced (Multitenant Hosting Rights are a
  production-workload requirement; Microsoft's student dev-test
  carve-out is supportive, not conclusive). Research and sources:
  [`papers/AZURE_RUNBOOK.md`](../papers/AZURE_RUNBOOK.md). Basis for
  the untestable Windows-on-ARM cell: Azure's
  [Windows 11 support matrix](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/windows-11-support-azure-virtual-machines)
  lists ARM64 families as Preview-only.
- **Cell 1 measurement floor:** workload peak memory is null (the
  workload outran the `docker stats` sampler) and the 0.0 s times are
  real builds at timer resolution; only the ast06/ast12 builds give
  usable ratio denominators, and their 0.2–0.3 s quantization is why
  the derived ratios are order-of-magnitude (≈) figures.
- **Cancelled Azure Linux cells (A1/A2):** cancelled before any VM
  launched — redundant with cells 1–2, and the student-offer-only
  burstable sizes would have added a CPU-credit throttling confound.
