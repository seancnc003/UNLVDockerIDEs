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

(Anything observed during the runs that a table cell cannot hold —
deviations, re-runs, surprises. An empty section after the record run is
itself a result.)

- **Launch provenance (retries and accidents, no measurements lost).**
  Cells 1–2's first launches died on a user-data bug (Ubuntu 24.04
  dropped the `awscli` apt package); the recorded cells are the ~06:19
  UTC retries with AWS CLI v2 from the official installer. The AWS
  windows cell's first launch was healthy but accidentally terminated
  ~40 min in by the matrix driver's exit trap — an operator-side
  accident. No numbers come from any failed launch.
- **Cell 2 supersession (2026-08-18).** The tables are transcribed from
  the QEMU follow-up **full run** `20260818-202601`
  (`scripts/aws-qemu-followup.sh`, `arm64-binfmt` variant, coursework
  shipped; archived as `cell2-qemu-followup-full.*` in
  [EVIDENCE.md](EVIDENCE.md)). Same m8g.large, Ubuntu 24.04, image
  digest, and unmodified `ci-test.sh` as the superseded record cell —
  the only changed variable is the handler source: Docker's
  `tonistiigi/binfmt` build (digest in Provenance) instead of Ubuntu's
  `qemu-user-static` 8.2.2. Outcome: **12 checks passed, 0 failed**,
  full parity with cell 4's emulated-cell scope, and the gdb "broken"
  is now a clean probe against a live container (the superseded run's
  was an exec against a dead one). A diagnostic-scope pass of the same
  configuration ran first (`20260818-195946`, no coursework, 8/8,
  archived as `cell2-qemu-followup-binfmt.*`); the two passes' shared
  metrics agree closely (e.g. cold 7.3 → 6.7 s, pull 13.1 → 12.9 s) —
  an incidental repeatability check.
- **The superseded stock-QEMU result (kept as a finding).** Under
  Ubuntu 24.04's `qemu-user-static` 8.2.2 the record run failed 3
  passed / 5 failed: setup was correct and seeding/persistence passed,
  but code-server never answered `/healthz` in 300 s and the container
  exited. A dedicated confirmation launch reproduced it exactly (n=2;
  archived as `cell2-linux-arm64-rerun.*`) and captured the cause:
  `exited exit=139`, container log
  `x86_64-binfmt-P: QEMU internal SIGSEGV {code=MAPERR, addr=0x20}`
  (OOM ruled out) — QEMU 8.2.2 itself segfaulting while emulating
  code-server's Node.js runtime. With the follow-up's pass on otherwise
  identical hardware/OS, the crash is **version-bound to the QEMU
  build**, not a property of the image, ARM Linux, or binfmt emulation
  in general.
- **Follow-up companion variant `arm64-distro-new` — rig failure.** The
  Ubuntu 26.04 variant meant to test newer *distro* QEMU never tested
  it: `qemu-user-static` had no apt installation candidate on that AMI
  (the package exists in the 26.04 archive — an image/sources issue,
  not diagnosed further), so no handler was registered and every amd64
  exec failed with `exec format error`. Enters no table; run.log
  archived as `cell2-qemu-followup-distro-runlog.txt`.
- **Cell 3 AWS attempt — rig failure; the suite never ran.** On the
  Windows Server 2025 proxy, Docker Desktop's silent installer
  installed nothing, `wsl --install` produced no distro, and a forced
  reboot silently never happened (transcript archived as
  `cell3-windows-aws-runlog.txt`). Server 2025 is outside Docker
  Desktop's Windows 10/11 support matrix, so this indicts the proxy,
  not the platform students use. The cell was re-run on Azure's real
  Windows 11 Pro (`scripts/azure-matrix.sh`) and **passed 13/13 with
  gdb working** — that run fills cell 3's column.
- **Cell 3 Azure run anomalies (run `20260818-093352`).** The recorded
  result is attempt 4 on the same VM; attempts 1–3 were automation
  failures (extension size limit, missing WSL plus a wrong-path false
  "engine up" — that JSON archived as
  `azure-cellA3-windows-run1-no-wsl-integration.json`, anomaly evidence
  only — and disabled WSL integration), all fixed live with the trail
  in the archived run log. `ci-test.sh` ran unmodified in every
  attempt. Caveats: the suite ran via an interactive scheduled task,
  and the Docker engine was already warm — which affects nothing
  reported, since cold start measures container start in every cell.
  The presigned-URL HTTP 400 checksum trap and its fix live in
  [`papers/AZURE_RUNBOOK.md`](../papers/AZURE_RUNBOOK.md) (Phase 5).
- **Cell 3 subscription and licensing posture.** The cell was
  unlaunchable on Azure for Students (fixed-performance families
  `NotAvailableForSubscription`; the launchable burstables cannot
  nest), so the subscription was upgraded to Pay-As-You-Go on
  2026-08-18. The run proceeded with `--license-type Windows_Client`
  (BYOL attestation) by explicit operator decision after the caveat was
  surfaced: Multitenant Hosting Rights are formally a
  production-workload requirement, Microsoft's own doc carries a
  student/free-trial dev-test carve-out (supportive, not conclusive
  after the same-day upgrade), and whether UNLV's institutional
  Microsoft 365 tier confers MTH is unverified. Full research and
  sources: [`papers/AZURE_RUNBOOK.md`](../papers/AZURE_RUNBOOK.md).
  Related basis for the untestable Windows-on-ARM cell: Azure's
  [Windows 11 support matrix](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/windows-11-support-azure-virtual-machines)
  lists ARM64 families as Preview-only.
- **Cell 1 measurement-floor artifacts.** Workload peak memory is null
  (the whole workload finished in ≈0.5 s, faster than one
  `docker stats` sample) and several times record 0.0 s — real builds
  at the timer floor (`make clean` precedes every timed `make`). Ratio
  consequence: only the ast06/ast12 builds give usable denominators,
  and their 0.2–0.3 s quantization makes the derived ratios
  order-of-magnitude figures (hence the ≈).
- **Cancelled Azure Linux cells (labels A1/A2, retired).** Planned
  alongside the Windows re-run, cancelled before any VM launched:
  redundant with cells 1–2, and the student-offer-only burstable sizes
  would have added a CPU-credit throttling confound. No Azure Linux
  results exist.

