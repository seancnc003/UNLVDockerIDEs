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

- **Cell 1 re-launch (provenance):** the first launch of the linux-amd64
  instance failed before any test ran — a user-data bug (Ubuntu 24.04
  dropped the `awscli` apt package). The recorded cell is the retry launch
  at 06:19 UTC on 2026-08-18 with the fixed user-data (AWS CLI v2 from the
  official installer); no measurements come from the failed launch.
- **Cell 2 re-launch (provenance):** same story as cell 1 — the first
  linux-arm64 launch hit the identical user-data bug before any test ran;
  the recorded cell is the retry launch at ~06:19 UTC on 2026-08-18 with
  the fixed user-data. No measurements come from the failed launch.
- **Cell 2 supersession — the tables' source changed on 2026-08-18.**
  Cell 2's column is now transcribed from the QEMU follow-up **full
  run** `20260818-202601` (`scripts/aws-qemu-followup.sh`,
  `arm64-binfmt` variant with the coursework workload shipped; JSON and
  diagnostics archived in [EVIDENCE.md](EVIDENCE.md) as
  `cell2-qemu-followup-full.json` and companions). Same m8g.large
  Graviton, same Ubuntu 24.04, same image digest, same unmodified
  published `ci-test.sh` as the superseded record run — the only changed
  variable is the QEMU binfmt handler source: Docker's
  `tonistiigi/binfmt` build (digest in Provenance) instead of Ubuntu
  24.04's `qemu-user-static` 8.2.2. Outcome: **12 checks passed, 0
  failed** — full parity with cell 4's emulated-cell scope: container
  healthy in 6.7 s cold / 6.2 s warm, starter compiles at 0.3 s, all
  four coursework assignments pass (populating the QEMU-binfmt
  emulation-overhead ratios for the first time), workload peak memory
  334 MiB, seeding and persistence pass, and the gdb probe is a
  **clean** probe against a live container reporting "broken" — the
  first real Linux-arm64 evidence for the emulation-boundary finding
  (the superseded run's "broken" was an exec against a dead container).
  The diagnostic probe recorded `status=running exit=0 oom=false` with
  code-server serving.
- **The superseded stock-QEMU result (kept as a finding, not a tables
  source).** The original record run (`20260818-053827`) under Ubuntu
  24.04's `qemu-user-static` 8.2.2 failed 3 passed / 5 failed: setup was
  correct (handlers installed, coursework unpacked, image pulled by
  digest in 12.8 s) and the entrypoint seeded `hello.asm` under
  emulation, but code-server never answered `/healthz` within 300 s and
  the container exited before stage 4. A dedicated confirmation launch
  (~07:01 UTC, S3 prefix `20260818-053827-arm64-rerun`; archived as
  `cell2-linux-arm64-rerun.json` and `cell2-linux-arm64-rerun-diag-*`)
  reproduced the suite outcome exactly (n=2), then captured the cause on
  a fresh container: `status=exited exit=139 oom=false` (OOM ruled out —
  >7 GB free, no dmesg OOM kills) with the complete container log being
  one line — `x86_64-binfmt-P: QEMU internal SIGSEGV {code=MAPERR,
  addr=0x20}`. That is QEMU 8.2.2 itself segfaulting while emulating
  code-server's Node.js/V8 runtime. Combined with the follow-up run's
  pass under a newer handler build on otherwise identical hardware/OS,
  the crash is demonstrated to be **version-bound to the QEMU build**,
  not a property of the image, of ARM Linux, or of binfmt emulation in
  general. Both runs' raw outputs remain archived verbatim.
- **The follow-up ran twice on 2026-08-18: diagnostic scope, then full
  scope.** The first pass (run `20260818-195946`, archived as
  `cell2-qemu-followup-binfmt.*`) deliberately shipped no coursework —
  it existed to answer one question, does code-server survive under a
  newer handler build, and passed 8/8 with `ci-test.sh` skipping the
  absent workload stage by design. The full run (`20260818-202601`,
  archived as `cell2-qemu-followup-full.*`) repeated the identical
  configuration with the coursework zip uploaded and is the tables
  source; the two passes' shared metrics agree closely (pull 13.1 →
  12.9 s, cold 7.3 → 6.7 s, warm 7.2 → 6.2 s, starter 0.3 s both,
  idle 262.8 → 254.8 MiB), an incidental repeatability check on the
  working configuration.
- **Companion variant `arm64-distro-new` — rig failure, not a QEMU
  result.** The same follow-up run launched a second variant (Ubuntu
  26.04 LTS, m8g.large) meant to test that release's newer distro
  `qemu-user-static`. It never tested QEMU at all: `apt-get install
  qemu-user-static binfmt-support` failed with `E: Package
  'qemu-user-static' has no installation candidate` on the 26.04 AMI
  (the package exists for 26.04 "resolute" in the Ubuntu archive per
  packages.ubuntu.com, so this is an image/sources configuration issue
  on the AMI, not a removal — not diagnosed further), no binfmt handler
  was registered, and every amd64 exec failed with `exec format error`
  (diagnostic probe: `status=exited exit=255`, log line
  `exec /usr/bin/tini: exec format error`). Its JSON is failure-mode
  artifacts in the cell 2 record-run sense and enters no table; run.log
  archived in [EVIDENCE.md](EVIDENCE.md) as
  `cell2-qemu-followup-distro-runlog.txt`.
- **Cell 3 re-launch (provenance):** the recorded evidence comes from the
  second launch of the windows cell. The first launch was healthy but was
  accidentally terminated ~40 minutes in by a driver exit trap (the
  matrix driver's cleanup trap fired on exit and took the instance with
  it) — an operator-side accident, not a result. No measurements exist
  from either launch; the archived log below is from the second.
- **Cell 3 (AWS) — infrastructure failure of the test rig; the suite
  never ran.** `ci-test.sh` never executed and no JSON was produced, so
  cell 3's table column holds no numbers and no fails — this is a rig
  failure, a different category from cell 2's hard suite fail and from
  the recorded-not-failed emulation results. The only evidence is the
  instance's PowerShell transcript (`run.log`, also in S3 under
  `matrix/20260818-053827/windows/`), archived verbatim alongside this
  file in [EVIDENCE.md](EVIDENCE.md) as `cell3-windows-aws-runlog.txt`. It documents three failures,
  all in the Windows Server 2025 host setup, before any test could run:
  (1) Docker Desktop's silent installer ran ~8–10 minutes inside phase
  1's transcript window (06:21:27–06:33:58 UTC — the transcript body is
  empty; the installer logged nothing) and installed nothing: phase 2
  found no `docker.exe` at the install path, only repeated
  `CommandNotFoundException`. (2) `wsl --install --no-launch -d Ubuntu`
  produced no distro: phase 2's `ubuntu.exe` hit
  `CommandNotFoundException` and WSL reported
  `Wsl/Service/WSL_E_DISTRO_NOT_FOUND`. (3) phase 1's final
  `Restart-Computer -Force` at 06:33:58 UTC silently never rebooted the
  machine, leaving it wedged for ~2 hours until an external API reboot
  at 08:33 UTC unstuck it; phase 2 then ran (transcript restart
  08:34:38), waited out its full 15-minute engine grace period polling
  a `docker.exe` that did not exist, recorded `docker engine up: False`
  (08:49), uploaded the log, and shut down cleanly.
- **Cell 3 verdict scope — the proxy is indicted, not Windows 11.**
  These failures are specific to Windows Server 2025, which was standing
  in as a Windows 11 proxy only because AWS cannot rent Windows 11
  (Microsoft licensing restricts client Windows on AWS/GCP). Docker
  Desktop officially supports Windows 10/11 only — Server 2025 is
  outside its support matrix, and the silent installer's no-op is a
  known consequence of that, so this outcome says nothing about the
  platform students actually use. The cell was re-run on Azure, which
  offers real Windows 11 Pro x86 VMs with nested virtualization
  (`scripts/azure-matrix.sh`), and **passed 13/13 with gdb working** —
  that Azure run is what fills cell 3's column in the tables above
  (cross-cloud caveat in the intro; evidence files carry the run's
  `azure-cellA3-` label in EVIDENCE.md).
- **Cell 1 workload peak memory is null:** the whole four-assignment
  workload finished in ≈0.5 s of container time on native hardware, faster
  than the `docker stats` sampler could return a single sample, so the JSON
  records `null`. A real gap in cell 1's row, not a suite failure; the
  metric exists for the emulated cells, where the workload runs long enough
  to sample (cell 4: 358 MiB).
- **Cell 1 native times sit at the timer floor:** starter compile+run and
  the ast3/ast04 builds all recorded 0.0 s (sub-tenth-of-a-second), and
  every workload run recorded 0.0 s. These are real builds, not skips — the
  suite runs `make clean` before every timed `make`, and the run log shows
  the coursework zip fetched from S3 and all 13 checks executing. Ratio
  consequence for the derived ratios: rows with a 0.0 s cell-1 denominator (starter,
  ast3, ast04, and all run-time ratios) are undefined at this timer
  resolution; only the ast06 and ast12 build times give usable
  denominators, and even those carry coarse quantization (a 0.2–0.3 s
  denominator makes the ratios order-of-magnitude figures, hence the ≈).
- **Cell 3 run anomalies (Azure run `20260818-093352`).** The recorded
  result is attempt 4 on the same VM; attempts 1–3 were failures of the
  scripted automation, not of the platform, all diagnosed and fixed live
  via `az vm run-command` with the full trail in the archived run log:
  (1) the initial CustomScriptExtension hit the encoded-command size
  limit; (2) phase 1 left WSL not installed, and a wrong `docker.exe`
  path made the phase-2 engine probe report a false "engine up"
  (that attempt's JSON is archived as
  `azure-cellA3-windows-run1-no-wsl-integration.json` in
  [EVIDENCE.md](EVIDENCE.md) — anomaly evidence, not a result); (3)
  Docker Desktop's WSL integration was off for the distro. The suite
  itself (`ci-test.sh`) ran unmodified in all attempts. Two further
  caveats: the suite ran via an interactive scheduled task in the
  autologon session rather than the original phase-2 task mechanism,
  and the Docker engine was already warm (Docker Desktop autostart)
  when the recorded attempt began — pull time is network-dominated and
  unaffected, and cold start → healthy measures container start, not
  engine start, in this cell exactly as in the others. Separately,
  result uploads via pre-signed URLs initially failed with HTTP 400:
  new AWS CLI/boto3 defaults attach checksum parameters that
  pre-signed PUTs reject — fixed with
  `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` (see
  `papers/AZURE_RUNBOOK.md`).
- **Cell 3 subscription constraints (why the run needed a Pay-As-You-Go
  upgrade).** On the Azure for Students offer, `az vm list-skus`
  reported every fixed-performance family tried (D/E/F) as
  `NotAvailableForSubscription` in every region checked; only burstable
  Bsv2/Basv2/Bpsv2 sizes were launchable (6-vCPU regional cap), and per
  their Microsoft size documentation none of those support the nested
  virtualization WSL2 needs — so the cell was unlaunchable on the
  student offer. The subscription was upgraded to Pay-As-You-Go on
  2026-08-18 to unlock the Dsv5 family. One resource group from an
  aborted launch (`unlv-ide-matrix-20260818-091659`, westcentralus,
  zero VMs created) was deleted; no Azure compute ran before the
  recorded run. Sources: the official size pages state "Nested
  Virtualization: Not Supported" for
  [Bsv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bsv2-series),
  [Basv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/basv2-series), and
  [Bpsv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bpsv2-series)
  (corroborated by [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/4372831/create-azure-burstable-vm-with-nested-virtualizati):
  burstable series cannot nest regardless of settings);
  [`SkuNotAvailable` semantics](https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/error-sku-not-available);
  free/student subscriptions are
  [ineligible for quota/family increases](https://learn.microsoft.com/en-us/azure/quotas/per-vm-quota-requests)
  (upgrade to Pay-As-You-Go is the documented path), and Microsoft staff
  [confirm](https://techcommunity.microsoft.com/discussions/microsoft-learn-for-educators/sku-quota-and-policy-restrictions-on-azure-for-students-and-free-subscriptions/4525160)
  student offers carry undocumented SKU restrictions beyond visible
  policy.
- **Cell 3 licensing.** Windows 11 client images on Azure formally
  require
  [Multitenant Hosting Rights](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/windows-desktop-multitenant-hosting-deployment)
  (eligible licenses: Windows 11 E3/E5, Microsoft 365 E3/E5/A3/A5/
  Business Premium; deployment includes an attestation checkbox). The
  caveat was surfaced to the operator before launch; the run proceeded
  with `--license-type Windows_Client` (the bring-your-own-license
  attestation) by explicit operator decision. The same Microsoft doc
  also carries a dev/test carve-out: "Student & Free Trial accounts are
  enabled to deploy Windows 11 images for development or testing
  purposes" — i.e. Multitenant Hosting Rights are a production-workload
  requirement, and this run was development/testing research on a
  subscription that was Azure for Students the same morning (upgraded
  to Pay-As-You-Go hours before launch; the doc does not address
  whether the carve-out survives that conversion, so this is noted as
  supportive, not conclusive). Whether the operator's institutional
  Microsoft 365 tier independently confers MTH is unverified: public
  UNLV documentation confirms desktop-Office-grade licensing
  ([UNLV IT: Microsoft 365](https://www.it.unlv.edu/software/microsoft-365),
  [UNLV KB 1960](https://help.unlv.edu/TDClient/33/IT-Support-Portal/KB/Article/1960/Microsoft-365))
  but does not name an A3/A5 tier, and UNLV's separate Azure Dev Tools
  Windows Education keys are device licenses that do not confer MTH
  ([UNLV KB 190](https://help.unlv.edu/TDClient/33/IT-Support-Portal/KB/ArticleDet?ID=190)).
  Recorded here so the run's licensing posture is explicit. Related: the
  [Windows 11 on Azure support matrix](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/windows-11-support-azure-virtual-machines)
  lists ARM64 families as Preview-only (and notes the portal may offer
  unsupported combinations) — the basis for treating a Windows-on-ARM
  cloud cell as untestable.
- **Cancelled Azure Linux cells (labels A1/A2, retired).** Two Azure
  Linux companion cells were planned alongside the Windows re-run and
  cancelled before any VM launched — no Azure Linux results exist.
  Reasons, recorded for the run history: they were redundant (cells 1–2
  above already hold the native and emulated Linux records), and the
  student-offer SKU restrictions left only burstable B-series sizes,
  whose
  [CPU credit model](https://learn.microsoft.com/en-us/azure/virtual-machines/b-series-cpu-credit-model/b-series-cpu-credit-model)
  would have added a throttling confound.

