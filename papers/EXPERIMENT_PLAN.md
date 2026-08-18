# Experiment Plan — Platform-Matrix Evaluation (Docker coverage)

Pre-deployment technical evaluation for the paper (RQ1–RQ5). **Scope: the
experiment measures Docker container coverage only** — the course's
VirtualBox/UTM VMs are historical/motivational context (documented in
INSTITUTIONAL_SERVERS.md §2.4), never measured cells. **Image scope
(decided 2026-08-17): only the x86 image (`seancnc/unlv-x86-ide`) is
measured.** It is the image with the architecture story — amd64-only by
design, native on Intel hosts, emulated on ARM hosts, with the gdb/ptrace
boundary as the headline finding. The C++ image is multi-arch and runs
natively everywhere, so a matrix row for it answers no research question;
it remains covered by `scripts/release-check.sh` and the CI regression
workflow. **Methodology
principle: every reported result comes from the same unmodified, published
script** (`scripts/ci-test.sh`) — no ad-hoc or unversioned measurements.
Cells 1–3 are operator-provisioned on AWS per the hands-on runbook
(AWS_RUNBOOK.md); cell 4 runs the identical script on owned consumer
hardware and is labeled by provenance. Each run emits a JSON results file that becomes one row of the
paper's platform-matrix table. Cells that cannot be scripted at all are
excluded from Results and handled in Discussion / Future Work. (Earlier
ad-hoc local results were discarded on 2026-08-15; the consumer-hardware
cell will be re-measured with the published script on the designated
machine.)

## Cloud coverage comparison (verified August 2026)

Which desired environments can each cloud actually provide *for this test*
(the test needs Docker running Linux containers; on Windows that means
Docker Desktop + WSL2, which requires nested virtualization)?

| Target environment | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Linux amd64 (Docker Engine) | ✅ | ✅ | ✅ |
| Linux arm64 (Docker Engine) | ✅ Graviton | ✅ Ampere/Cobalt | ✅ Axion |
| Windows amd64 + Docker Desktop/WSL2 | ✅ **Windows Server 2025** on C8i/M8i/R8i — nested virt is a launch-time CpuOption (new Feb 2026); no Windows 11 client images | ✅ **Windows 11 Pro** on Dsv5-class — nested virt long-supported on x86 sizes; only cloud offering the actual client OS students run | ❌ GCP nested virtualization supports **Linux guests only** — Windows images cannot be the L1 host, so Docker Desktop/WSL2 is impossible |
| Windows arm64 + Docker Desktop/WSL2 | ❌ no Windows-on-ARM offering (Graviton is Linux-only) | ❌ Windows 11 ARM64 images exist, but **ARM VMs do not support nested virtualization** → WSL2/Docker Desktop cannot run | ❌ |
| macOS Intel (Docker Desktop) | ⚠️ `mac1.metal` exists — but 24 h dedicated-host minimum (≈ $26) and Docker Desktop needs a logged-in GUI session, defeating clean automation | ❌ no Mac instances | ❌ no Mac instances |
| macOS Apple Silicon (Docker Desktop) | ⚠️ `mac2.metal` — same 24 h minimum (≈ $16) and same GUI-session automation problem | ❌ | ❌ |

**Verdicts.**
- **GCP adds nothing:** its only working cells are Linux, which GitHub
  Actions already covers for free and continuously. Eliminated.
- **Azure has the best Windows cell:** genuine Windows 11 Pro (the OS
  students actually run) with mature nested-virt support.
- **AWS has the broadest raw coverage** (only cloud with Macs, and a
  working Windows Server cell) — but its Mac cells resist automation and
  carry 24 h billing minimums, and its Windows cell is Server, not 11.
- **No cloud anywhere can automate Windows-on-ARM Docker Desktop.** The
  blocker is fundamental (no nested virt on ARM VMs), not a pricing or
  effort issue.

## The automated matrix (what Results will contain)

**All three cloud cells run on AWS.** Provisioning follows the hands-on
runbook ([AWS_RUNBOOK.md](./AWS_RUNBOOK.md)) — operator-provisioned per
documented steps, console and CLI — while **measurement is always the same
published script**, which is what makes the numbers reproducible. Single
provider is deliberate: one methodology sentence covers every cloud row.
`scripts/aws-matrix.sh` automates the identical procedure end-to-end and
serves as the capstone/replication path. Cell 4 is the same script on owned
consumer hardware.

| # | Cell | Where | x86 image mode | Expected gdb | Cost |
| --- | --- | --- | --- | --- | --- |
| 1 | Linux amd64, Docker Engine | AWS `m8i.large`, Ubuntu 24.04 | native | working | ≈ $0.05 |
| 2 | Linux arm64, Docker Engine (+ QEMU binfmt for the x86 image) | AWS `m8g.large` (Graviton), Ubuntu 24.04 | emulated | broken (expected) | ≈ $0.05 |
| 3 | Windows amd64, Docker Desktop + WSL2 | AWS `m8i.xlarge`, Windows Server 2025, nested virt enabled at launch (user-data → WSL2 + Docker Desktop silent install → reboot → scheduled task runs `ci-test.sh` in WSL → S3 → self-terminate) | native | working | ≈ $0.60 |
| 4 | macOS arm64 (Apple Silicon), Docker Desktop | **Owned consumer hardware:** 14-inch MacBook Pro (2021), base configuration — M1 Pro, 16 GB. The unmodified published `ci-test.sh`, script-executed (human types one command; all measurement is scripted). Deliberately NOT the 64 GB development machine: base-spec M1 Pros dominate the 2026 used market, so this cell represents what a budget-conscious student actually buys. | emulated (Docker Desktop layer) | broken (expected) | $0 |

Cell 3 is Windows Server 2025 (AWS offers no Windows 11 client images); it
shares its kernel with Windows 11 24H2 and verifies the WSL2/Docker Desktop
pipeline rather than a specific consumer configuration — labeled as such.

**Ratio baseline: cell 1, by design.** The emulation-overhead ratios
(emulated ÷ native) always use cell 1 as the denominator, never cell 3,
because a baseline should differ from the numerator in as few ways as
possible. Cells 1 and 2 are matched siblings — same Ubuntu 24.04, same
Docker Engine, same cloud, same instance generation and size (`m8i.large`
vs `m8g.large`, both 2 vCPU / 8 GB) — so their only difference is the CPU
architecture and hence the emulation layer, which is the thing being
measured. Cell 3 would confound that single variable with four others
(Windows, Docker Desktop, the WSL2/Hyper-V stack, and a larger instance),
and its "native" path is itself the least direct in the matrix: on EC2 the
containers run inside the WSL2 utility VM under nested virtualization,
whereas cell 1 is container → host kernel → hardware. Cell 3's job is to
be the second native data point (and the Windows-pipeline verification),
not the yardstick.

Cell 4 earns its row twice over: it is the only source of consumer-hardware
timings (every cloud cell is server-class, best-case), and it tests Docker
Desktop's emulation layer, which cell 2's QEMU/binfmt approximates but does
not reproduce.

The emulation-boundary finding (gdb works native / breaks emulated) is
demonstrated across cells: native 1 and 3 vs. emulated 2 and 4 — two
independent emulation layers (QEMU and Docker Desktop).

*(A GitHub Actions workflow with the same Linux coverage exists as a
manual-trigger engineering regression check only — it is never cited as a
results source.)*

## The course VMs are context, not cells (decided 2026-08-16)

CS 218's officially distributed environments — the "UNLV CS Ubuntu 24.04 LTS
Image" `.ova` for VirtualBox on Intel and the experimental Fall-2023 Linux
Mint UTM image for Apple Silicon (INSTITUTIONAL_SERVERS.md §2.4) — appear in
the paper as **historical/motivational context only**. The experiment
measures Docker container coverage exclusively; no VM cells are run. The
resource/stability claim ("a full desktop VM is heavier and more fragile
than a shared, headless container runtime") rests on the course's own
documented numbers and instructions (fixed 4 GB RAM reservation, 19.12 GB
disk image, no-unclean-shutdown and `xrandr` warnings, "no guarantee" on the
Apple Silicon image) plus the literature (Malan 2013: ~20% of students found
the CS50 VM slow, lid-close disk corruption; Fernalld et al. 2023: Type-2
hypervisors rejected over fixed 8 GB/25 GB reservations and no amd64 guests
on ARM). Likewise the three-corner emulation argument (full-system keeps the
debugger but is slow; user-mode translation is fast but loses ptrace; native
gets both) is made from the course's own UTM-page warnings for the slow
corner and from cells 1–4 for the other two — no UTM measurements needed.

## Excluded cells → Discussion / Future Work (accepted limitations)

State these plainly in the paper; do not present partial coverage as full:

- **macOS Intel:** no cloud offers automatable Docker Desktop on macOS (AWS
  Macs require GUI sessions and 24 h dedicated-host minimums), and no Intel
  Mac is owned. Untested; expected to behave as a native-amd64 cell (gdb
  working — the only Mac where debugger assignments would work locally).
  Stated as an expectation, not a result.
- **Windows-on-ARM:** untestable in any cloud (no nested virtualization on
  ARM VMs). Expected working with gdb broken (like cell 4): the 2026-08-18
  QEMU follow-up run showed the Linux-arm64 crash was version-bound to
  QEMU 8.2.2, and Docker's own handler build (`tonistiigi/binfmt` — the
  same lineage Docker Desktop bundles inside its WSL2 VM) passed 8/8 on
  otherwise identical hardware (see `record-results/RESULTS.md`, cell 2).
  Stated as an expectation, not a result.
- **Single consumer-hardware point:** cell 4 is one machine, not a sample of
  student hardware; cloud/CI timings are server-class best-case. Broader
  consumer-hardware measurement folds into the planned course study.

### Path to completion (added 2026-08-18)

Measurement is done — all four matrix cells are recorded in
[`record-results/RESULTS.md`](../record-results/RESULTS.md)
(execution-order steps 1–3 below are complete). What remains, in order:

1. **Close out the RESULTS.md provenance blanks:** the actual AWS cost
   from Cost Explorer, the actual Azure cost once billing posts (~1 day
   after the 2026-08-18 run), and the familiarization-run date.
2. **Write the paper, stage 1 (pre-deployment):** the system/design paper
   per [RESEARCH_PAPER_ASSIGNMENT.md](./RESEARCH_PAPER_ASSIGNMENT.md) —
   introduction, related work (from
   [LITERATURE_SUMMARIES.md](./LITERATURE_SUMMARIES.md)), course context,
   design, technical evaluation transcribed from RESULTS.md, limitations,
   and the planned educational study. Execution-order step 4 lands here:
   the excluded-cells text above goes into §Discussion / §Future Work as
   stated expectations, not results.
3. **Optionally close the two untested cells with physical hardware.**
   Both are blocked in every cloud, so the only route is owned or
   borrowed machines running the same published `ci-test.sh`: an Intel
   Mac for the macOS-Intel cell (expected native amd64, gdb working) and
   a Windows-on-ARM laptop (e.g. Snapdragon X) for the Windows-ARM cell
   (expected emulated, gdb broken) — physical ARM machines run
   WSL2/Docker Desktop fine; only cloud ARM VMs lack nested
   virtualization. If no hardware materializes, the paper keeps them as
   expectations.
4. **Optional follow-ups:** the `scripts/aws-matrix.sh` capstone run
   diffed against the record run. ~~A check whether a newer QEMU resolves
   cell 2's SIGSEGV~~ — **done 2026-08-18** (`scripts/aws-qemu-followup.sh`,
   run `20260818-195946`): Docker's `tonistiigi/binfmt` handler build
   passed 8/8 on the same Ubuntu 24.04/m8g.large that crashed under
   QEMU 8.2.2, and that run now fills cell 2's tables (see
   `record-results/RESULTS.md`). Still open from it: a re-run with the
   coursework workload shipped, to populate the QEMU-binfmt
   emulation-overhead ratios; the Ubuntu 26.04 distro-QEMU variant was a
   rig failure (package uninstallable on that AMI) and remains untested.
5. **Student docs for Linux-ARM hosts:** fold the working one-liner
   (`docker run --privileged --rm tonistiigi/binfmt --install amd64`,
   re-run after each reboot) into `x86/README.md`, noting stock Ubuntu
   24.04 QEMU crashes and gdb stays broken under emulation regardless.
6. **Stage 2 (separate cycle):** classroom deployment and the planned
   educational study; broader consumer-hardware measurement (the
   single-consumer-point limitation above) folds in there.

## Measured metrics (per cell, x86 image) — compensating for no classroom data

Because this cycle collects no student data, the technical metrics carry the
paper's evidentiary weight; the suite therefore measures more than a smoke
test (decided 2026-08-17). Per JSON row, `ci-test.sh` captures:

- **Fidelity:** starter compile+run (3 timed cycles), the gdb probe
  (working/broken — the headline native-vs-emulated finding), starter
  seeding, and persistence across container replacement.
- **Coursework workload (x86):** timed build + execution of four real CS 218
  assignments (ast3, ast04, ast06, ast12), manifest-driven
  (`code/workloads.tsv`). ast12 — multithreaded pthread + assembly computing
  a checkable answer — is the strongest emulation-fidelity probe. Native
  failures are hard failures; under emulation status is recorded, not
  failed (same policy as gdb). The `code/` folder is gitignored course
  material: cells fetch it privately from S3 ("available on request" in the
  paper), and when absent the stage records null — the published script
  stays complete without it.
- **Performance:** pull time, image size, cold start → healthy, **warm
  start** (the daily-experience number, from the persistence restart), idle
  memory, and **peak container memory during the workload** (backs the
  base-spec-student-machine claim). Native-vs-emulated ratios on identical
  workloads fall out across cells with no extra measurement.
- **Reproducibility:** image digest, tool versions, code-server version,
  and an automated host record (CPU model, cores, RAM, OS, Docker version)
  embedded in every JSON.

## Protocol — identical in every cell

1. Provision per the runbook (cells 1–3 on AWS: console/CLI steps in
   AWS_RUNBOOK.md; `scripts/aws-matrix.sh` is the automated equivalent).
   Record instance type, CPU, RAM, OS build, Docker version.
2. Run `bash scripts/ci-test.sh x86`.
3. Collect the JSONs (S3 → `results/aws/<cell>/` for cells 1–3; local
   `results/` for cell 4), stamped with host-spec record and image digests.
4. Tear down automatically: every instance self-terminates on completion,
   with a per-instance scheduled-shutdown failsafe and a terminate-all trap
   in the driver.

## Execution order (next block)

1. Work through AWS_RUNBOOK.md phases 0–5 → cells 1–3, hands-on, **twice**:
   pass 1 is a familiarization run (results to `manual-practice/`), pass 2
   is the record run whose JSONs are reported (≈ $3–4 for both passes).
   Optional capstone afterward: run `scripts/aws-matrix.sh` once and diff
   its results against the record run.
2. Cell 4: run `bash scripts/ci-test.sh x86`
   on the 14-inch M1 Pro/16 GB MacBook Pro; keep the JSON with a host-spec
   record (macOS version, Docker Desktop version, hardware model). If the
   assembly workflow fails on this machine — contrary to the 64 GB machine's
   earlier smoke test — that is a finding to report and diagnose, not an
   anomaly to discard.
3. Assemble the platform-matrix table from the JSONs → paper §Results.
4. Write the excluded-cells text into §Discussion and §Future Work.
