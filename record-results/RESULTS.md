# Results — Platform Matrix (x86 image only)

Cells 1–2 are filled from the AWS record run (2026-08-18); cell 3 is
filled from the Azure record run on real Windows 11 Pro (2026-08-18,
after the AWS Windows Server proxy attempt failed as rig infrastructure
— see Notes); cell 4 is the local MacBook run (2026-08-17).
Every number below is transcribed from the
JSONs emitted by the unmodified published `scripts/ci-test.sh` — no other
source. Cells 1–2 come from the AWS **record run** (pass 2 of
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
| Record-run date (cells 1–2, AWS) | 2026-08-18, matrix run `20260818-053827` (the same run's Windows Server launch was an infrastructure failure — no JSON, suite never ran; see Notes) |
| Record-run date (cell 3, Azure) | 2026-08-18, run `20260818-093352` — complete, pass 13/13 (evidence files carry the run's `azure-cellA3-` label) |
| Familiarization-run date (not reported) | |
| Cell 2 confirmation re-run (diagnostic only, not a tables source) | 2026-08-18 ~07:01 UTC, separate launch, S3 prefix `20260818-053827-arm64-rerun` |
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
| x86 image mode | native | emulated (QEMU binfmt) | native (Docker Desktop/WSL2) | emulated (Docker Desktop) |
| gdb probe (working/broken) | working | broken (not a clean probe; see Notes) | working | broken |
| Pull time (s) | 16.3 | 12.8 | 53.1 (network-dominated; engine warm — see Notes) | 44.7 |
| Image size (MB) | 552 | 552 | 552 | 552 |
| Cold start → healthy (s) | 0.5 | null (never healthy in 300 s; see Notes) | 0.6 | 4.8 |
| Warm start (s) | 0.5 | null (never healthy in 300 s; see Notes) | 0.5 | 4.3 |
| Starter compile+run, median of 3 (s) | 0.0 | null (all 3 runs failed; see Notes) | 0.2 (0.2 / 0.2 / 0.2) | 0.4 |
| Idle memory (MiB) | 54.29 | 0 (container had exited; see Notes) | 56.36 | 263.1 |
| Workload peak memory (MiB) | null (see Notes) | null (see Notes) | 90 | 358 |
| Starter seeding | pass | pass | pass | pass |
| Persistence across replacement | pass | pass | pass | pass |
| Overall (pass / recorded) | pass (13 checks passed, 0 failed; gdb working as expected) | fail (3 checks passed, 5 failed; container never reached healthy under QEMU binfmt — see Notes) | pass (13 checks passed, 0 failed; gdb working; Azure record run — the AWS Server-proxy attempt was a rig failure, see Notes) | recorded (12 checks passed, 0 failed; gdb broken as expected) |

## Table 2 — Coursework workload (CS 218 assignments)

Build and run seconds per assignment; status is pass / build-fail /
run-fail (recorded, not failed, under emulation — same policy as gdb).

| Assignment | Cell 1 build / run / status | Cell 2 build / run / status | Cell 3 build / run / status | Cell 4 build / run / status |
| --- | --- | --- | --- | --- |
| ast3 (pure assembly) | 0.0 / 0.0 / pass | 0.0 / null / build-fail (exec against dead container; see Notes) | 0.2 / 0.2 / pass | 0.4 / 0.2 / pass |
| ast04 (pure assembly) | 0.0 / 0.0 / pass | 0.0 / null / build-fail (exec against dead container; see Notes) | 0.2 / 0.2 / pass | 0.4 / 0.1 / pass |
| ast06 (C++ driver + assembly, file I/O) | 0.2 / 0.0 / pass | 0.0 / null / build-fail (exec against dead container; see Notes) | 0.5 / 0.2 / pass | 2.5 / 0.2 / pass |
| ast12 (multithreaded pthread + assembly, checkable answer) | 0.3 / 0.0 / pass | 0.0 / null / build-fail (exec against dead container; see Notes) | 0.6 / 0.2 / pass | 3.1 / 0.2 / pass |

## Emulation overhead (derived)

On the two workloads with usable native denominators, Docker Desktop
emulation (cell 4 ÷ cell 1) costs **≈12.5×** (ast06 build, 2.5 / 0.2 s)
and **≈10.3×** (ast12 build, 3.1 / 0.3 s) — order-of-magnitude figures,
since the 0.2–0.3 s denominators are coarsely quantized. All other
ratios are undefined: the QEMU binfmt ratio (cell 2 ÷ cell 1) has no
numerator — cell 2's container crashed before any workload ran — and
the remaining rows have a 0.0 s denominator (cell 1 at the timer
floor). Cell 1 is the denominator by design: cells 1 and 2 are
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
- **Cell 2 suite failure — container never reached healthy under QEMU
  binfmt.** The environment itself set up correctly: `run.log` shows
  qemu-user-static 8.2.2 + binfmt-support installed, the coursework zip
  fetched from S3 and all four assignments unpacked, and the image pulled
  by the correct digest in 12.8 s. The container's entrypoint even ran far
  enough under emulation to seed `hello.asm` to the host mount (stage 3
  passed) and the persistence file checks passed. But code-server never
  answered `/healthz` within the 300 s ceiling on either the cold or the
  replacement start, and by stage 4 the container had exited — every
  subsequent `docker exec` returned "container … is not running". Suite
  verdict: 3 passed (pull, starter seeding, persistence), 5 failed (cold
  start, all 3 compile+run attempts, replacement healthy).
- **Cell 2 in-container values are artifacts, not measurements.** Because
  the container was down, the JSON's remaining fields record the failure
  mode, not the image: the four workload rows are instant exec errors
  (`build-fail` at 0.0 s — no compiler ever ran, so they are not the
  "recorded, not failed" emulation slowness the policy anticipates), the
  gdb "broken" is an exec against a dead container rather than a clean
  ptrace probe (it coincides with the expected finding but does not
  evidence it), the tool-version strings are empty, and idle memory reads
  0B (an exited container). Ratio consequence for the derived ratios: the entire QEMU
  binfmt column is undefined — there are no cell 2 timings to divide.
- **Cell 2 crash cause — confirmed by a dedicated re-run (n=2, not a
  flake).** A separate confirmation launch at ~07:01 UTC on 2026-08-18
  (S3 prefix `20260818-053827-arm64-rerun`; JSON and diag captures
  archived in [EVIDENCE.md](EVIDENCE.md) as `cell2-linux-arm64-rerun.json` and
  `cell2-linux-arm64-rerun-diag-*`) first reproduced the full suite
  outcome exactly — 3 passed, 5 failed, same stages failing — then ran a
  diagnostics stage: a fresh container from the same digest
  (`--platform linux/amd64`, 90 s wait) died with
  `status=exited exit=139 oom=false` per `docker inspect` (SIGSEGV; OOM
  ruled out — the host had >7 GB available at capture time and dmesg shows
  no OOM kills), and the container's complete `docker logs` output is one
  line: `x86_64-binfmt-P: QEMU internal SIGSEGV {code=MAPERR, addr=0x20}`.
  That is qemu-user-static 8.2.2 itself segfaulting internally while
  emulating the code-server (Node.js/V8) runtime. The mechanism previously
  recorded here as inference is now demonstrated: the failure is a
  property of this QEMU binfmt emulation layer, not of the image — the
  same digest passes natively (cell 1) and under Docker Desktop's
  emulation (cell 4). The re-run is confirmation evidence only; every
  table number for cell 2 remains transcribed from the first record-run
  JSON.
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

