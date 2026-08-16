# Experiment Plan — Fully Automated Platform-Matrix Evaluation

Pre-deployment technical evaluation for the paper (RQ1–RQ5). **Methodology
principle: every reported result comes from the same unmodified, published
script** (`scripts/ci-test.sh`) — no ad-hoc or unversioned measurements.
Cells 1–3 are fully autonomous (CI and scripted cloud provisioning); cell 4
runs the identical script on owned consumer hardware and is labeled by
provenance. Each run emits a JSON results file that becomes one row of the
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

| # | Cell | Where | x86 image mode | Expected gdb | Cost |
| --- | --- | --- | --- | --- | --- |
| 1 | Linux amd64, Docker Engine | GitHub Actions `ubuntu-24.04` — weekly + on every publish | native | working | $0 |
| 2 | Linux arm64, Docker Engine (+ QEMU binfmt for x86 image) | GitHub Actions `ubuntu-24.04-arm` | emulated | broken (expected) | $0 |
| 3 | Windows amd64, Docker Desktop + WSL2 | **AWS `m8i.xlarge`**, Windows Server 2025, nested virt enabled at launch; provisioned and executed by script (user-data → WSL2 + Docker Desktop silent install → reboot → scheduled-task continuation runs `ci-test.sh` in WSL bash → results uploaded to S3 → instance self-terminates) | native | working | ≈ $2/run |
| 4 | macOS arm64 (Apple Silicon), Docker Desktop | **Owned consumer hardware:** 14-inch MacBook Pro (2021), base configuration — M1 Pro, 16 GB. The unmodified published `ci-test.sh`, script-executed (human types one command; all measurement is scripted). Deliberately NOT the 64 GB development machine: base-spec M1 Pros dominate the 2026 used market, so this cell represents what a budget-conscious student actually buys. | emulated (Docker Desktop layer) | broken (expected) | $0 |

Cell 3 is specified on AWS per project preference. If the Server-vs-11
fidelity gap matters more than single-cloud simplicity, the identical
automation runs on Azure with a Windows 11 Pro image — the paper then reports
the students' actual OS. Either way, exactly one Windows cell is run.

Cells 1–3 are fully autonomous; cell 4 is the same script on consumer
hardware, labeled as such in the Results table's provenance column. Cell 4
earns its row twice over: it is the only source of consumer-hardware timings
(every cloud/CI cell is server-class, best-case), and it tests Docker
Desktop's emulation layer, which cell 2's QEMU/binfmt approximates but does
not reproduce.

The emulation-boundary finding (gdb works native / breaks emulated) is
demonstrated across cells: native 1 and 3 vs. emulated 2 and 4 — two
independent emulation layers (QEMU and Docker Desktop).

## Excluded cells → Discussion / Future Work (accepted limitations)

State these plainly in the paper; do not present partial coverage as full:

- **macOS Intel:** no cloud offers automatable Docker Desktop on macOS (AWS
  Macs require GUI sessions and 24 h dedicated-host minimums), and no Intel
  Mac is owned. Untested; expected to behave as a native-amd64 cell (gdb
  working — the only Mac where debugger assignments would work locally).
  Stated as an expectation, not a result.
- **Windows-on-ARM:** untestable in any cloud (no nested virtualization on
  ARM VMs). Expected to match the emulated cells' behavior; stated as an
  expectation, not a result.
- **Single consumer-hardware point:** cell 4 is one machine, not a sample of
  student hardware; cloud/CI timings are server-class best-case. Broader
  consumer-hardware measurement folds into the planned course study.

## Protocol — identical in every cell

1. Provision from script (workflow YAML for cells 1–2; IaC + user-data for
   cell 3). Record instance type, CPU, RAM, OS build, Docker version.
2. Run `bash scripts/ci-test.sh cpp && bash scripts/ci-test.sh x86`.
3. Collect `results/*.json` (workflow artifacts for cells 1–2; S3 upload for
   cell 3), stamped with host-spec record and image digests.
4. Tear down automatically: CI runners are ephemeral; the cell-3 instance
   self-terminates on completion (with a CloudWatch alarm as a
   forgot-to-terminate backstop).

## Execution order (next block)

1. Push `scripts/ci-test.sh` + `.github/workflows/test-matrix.yml`; trigger
   the Test matrix workflow → cells 1–2 produce their first JSONs.
2. Author the cell-3 automation (Terraform or a boto3 script + PowerShell
   user-data; nested-virt CpuOption at launch; S3 results bucket;
   self-termination). Dry-run once, then a clean measured run (≈ $2).
3. Cell 4: run `bash scripts/ci-test.sh cpp && bash scripts/ci-test.sh x86`
   on the 14-inch M1 Pro/16 GB MacBook Pro; keep the JSONs with a host-spec
   record (macOS version, Docker Desktop version, hardware model). If the
   assembly workflow fails on this machine — contrary to the 64 GB machine's
   earlier smoke test — that is a finding to report and diagnose, not an
   anomaly to discard.
4. Assemble the platform-matrix table from the JSONs → paper §Results.
5. Write the excluded-cells text into §Discussion and §Future Work.
