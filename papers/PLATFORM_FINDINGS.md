# Platform findings — what the matrix taught us (2026-08-18)

Conceptual conclusions distilled from the completed platform matrix
(record data: `tests/record-results/RESULTS.md`; operational how-to:
`AWS_RUNBOOK.md`, `AZURE_RUNBOOK.md`). This file is the bridge between
the raw results and the paper's discussion sections: each finding below
is backed by archived evidence or a cited primary source, and none of it
duplicates the tables.

## 1. The support boundary is a *translator* boundary, not an OS boundary

The x86 IDE image runs wherever the **container runtime** has access to
a Rosetta-class x86 translator or needs none at all. Which translator
actually touches the container is decided by the layer Docker's Linux
environment runs in — not by how good the host OS's own emulator is:

| Host | Translator that touches the container | Result (evidence) |
| --- | --- | --- |
| x86 Windows / x86 Linux (Intel **and AMD** — AMD is x86, not ARM) | none — native execution | pass 13/13 (cells 1, A3) |
| ARM Mac (Apple silicon) | Rosetta 2, injected into Docker's Linux VM by the macOS Virtualization framework | pass 12/13; gdb broken (cell 4) |
| ARM Linux | qemu-user via binfmt_misc | fail — QEMU 8.2.2 internal SIGSEGV translating code-server's Node/V8 JIT (cell 2, reproduced, diagnostics archived) |
| ARM Windows | qemu-user via binfmt **inside WSL2** — Windows' own Prism emulator never sees the container | predicted fail, same class as cell 2 (untested; see §3) |

The decisive asymmetry: **Apple ships its translator into Linux VMs**
("Rosetta for Linux"); Microsoft's Prism, although Rosetta-class for
Windows PE binaries, has no WSL2 counterpart. So "the OS has a great
x86 emulator" (true on both ARM Macs and ARM Windows) is not the
predictor — "does the Linux VM layer get a good translator" is.

Support statement for the paper: the image is supported on native x86
hosts and on hosts whose container-runtime layer provides Rosetta-class
translation — today, only Apple silicon qualifies in the second
category.

## 2. The coverage gap is small in classroom terms

Covered: all x86 laptops (Intel + AMD, Windows + Linux) and M-series
Macs — the overwhelming majority of student machines. Uncovered: ARM
Linux (near-nonexistent among students) and ARM Windows (small but
growing with Snapdragon X). Framed correctly this is a strength: the
platform boundary is *characterized and evidenced*, not ignored — most
course tooling never states its boundary at all.

## 3. Cloud testability: three of four environments; the fourth is structurally closed

The cloud successfully hosted cells 1, 2 (a working experiment with a
negative platform result is still a working experiment), and A3. The
single cloud-untestable cell is **ARM Windows**, for a structural
reason: a rented VM is already one virtualization layer, so exercising
WSL2 requires *nested* virtualization, and no cloud's ARM sizes provide
it (Azure: no ARM size supports nesting; the launchable student-offer
B-series x86 sizes don't either — citations in RESULTS.md's Azure
notes). On physical ARM laptops virtualization is first-level, so the
limitation is an artifact of renting, not of the platform. Windows 11
ARM64 cloud images are additionally Preview-only per Microsoft's
support matrix. Methodological takeaway for other educators: a VM-based
test rig cannot validate VM-dependent stacks on ARM.

Also noted: client Windows is rentable only on Azure (AWS/GCP cannot
rent Windows 10/11 at all), Windows Server is outside Docker Desktop's
support matrix (the AWS cell 3 rig failure), and Windows 11 client
images on Azure carry a Multitenant Hosting Rights licensing
requirement (cited and recorded in RESULTS.md).

## 4. Cell 2's crash indicts the architecture, not the mission

The QEMU SIGSEGV occurred translating **code-server's Node.js/V8 JIT**
— the heaviest, most translation-hostile code in the image — not the
student workload. Small static x86 assembly binaries are the workload
qemu-user handles best. The current image makes the translator carry
the entire IDE platform when only the student binaries need
translation.

**Future-work remedy — the hybrid multi-arch image:** a `linux/arm64`
variant runs code-server and the toolchain natively on ARM, uses the
x86 cross-assembler/compiler (runs natively, emits genuine x86
binaries), and invokes qemu-user only to *execute* student binaries.
Debugging could use QEMU's built-in gdb stub (`qemu-x86_64 -g`),
potentially working where Rosetta's gdb is broken. Published as a
multi-arch manifest under the same image name, student-facing setup is
unchanged. This one variant would address ARM Linux and ARM Windows
simultaneously, since Docker on ARM Windows is Docker on ARM Linux
inside WSL2. Cheaper diagnostics first-step: retry the stock image
under a newer QEMU (e.g. `tonistiigi/binfmt`, QEMU 9.x) to test whether
the 8.2.2 crash persists across translator versions. Validation venue:
ARM Linux in the cloud (recipe exists), then physical Snapdragon
hardware.

## 5. Windows 11 was the best cell in the matrix

Beyond passing, cell A3 is the only translated-or-not non-Linux cell
with **gdb fully working** (WSL2's engine runs the container natively;
the Mac's Rosetta path breaks gdb). Sub-second starts and 0.2–0.6 s
builds on a 4-vCPU cloud VM. Given Windows dominates student laptops,
the strongest platform result landed on the most important platform.
The image also outperformed its own headline pitch: the same container,
byte-for-byte (same digest on all cells), behaved identically across
three operating systems — the reproducibility claim the VirtualBox
workflow it replaces could never make.
