# Evidence appendix — verbatim record-run outputs

Every raw output from the official record runs, merged into one file so
the evidence is browsable on GitHub. **Each fenced block below is the
verbatim, unmodified content of the original output file** named in its
heading (byte length stated for integrity); nothing is edited or
truncated. The per-file machine-readable originals live in the
gitignored local cache (`results/record-raw/`, plus the raw run
downloads under `results/aws/`, `results/azure/`, and
`results/s3-final-backup/`). All tables in [RESULTS.md](RESULTS.md) are
transcribed from the JSONs in this file; see
[README.md](README.md) for the archive rules.

## Contents

- Cell 1 — Linux amd64 (AWS m8i.large, native)
  - `cell1-linux-amd64.json`
  - `cell1-linux-amd64-runlog.txt`
- Cell 2 — Linux arm64 (AWS m8g.large, QEMU binfmt emulation)
  - `cell2-linux-arm64.json`
  - `cell2-linux-arm64-runlog.txt`
- Cell 2 confirmation re-run (separate launch, diagnostics stage)
  - `cell2-linux-arm64-rerun.json`
  - `cell2-linux-arm64-rerun-runlog.txt`
  - `cell2-linux-arm64-rerun-diag-state.txt`
  - `cell2-linux-arm64-rerun-diag-container.log`
  - `cell2-linux-arm64-rerun-diag-dmesg.txt`
  - `cell2-linux-arm64-rerun-diag-free.txt`
  - `cell2-linux-arm64-rerun-diag-ps.txt`
- Cell 3 AWS attempt — Windows Server 2025 proxy (rig infrastructure failure)
  - `cell3-windows-aws-runlog.txt`
- Cell 3 — Windows 11 Pro 24H2 (Azure Standard_D4s_v5, record run 20260818-093352; files keep the run's `azure-cellA3-` label)
  - `azure-cellA3-windows.json`
  - `azure-cellA3-windows-run1-no-wsl-integration.json`
  - `azure-cellA3-windows-runlog.txt`
- Cell 4 — macOS arm64 (Apple M1 Pro, Docker Desktop emulation, local run)
  - `cell4-macos-arm64.json`


## Cell 1 — Linux amd64 (AWS m8i.large, native)

### `cell1-linux-amd64.json` (1061 bytes)

record JSON (pass 13/13; source for the Table 1 cell 1 column).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "x86_64",
  "mode": "native",
  "host": {
    "cpu": "Intel(R) Xeon(R) 6975P-C",
    "cores": 2,
    "ram_gb": 8,
    "os": "Ubuntu 24.04.4 LTS",
    "docker": "Docker version 29.1.3"
  },
  "digest": "seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6",
  "size_mb": 552,
  "pull_seconds": 16.3,
  "start_to_healthy_seconds": 0.5,
  "warm_start_seconds": 0.5,
  "compile_run_seconds": [0.0, 0.0, 0.0],
  "gdb": "working",
  "workload": [{"name": "ast3", "build_seconds": 0.0, "run_seconds": 0.0, "status": "pass"}, {"name": "ast04", "build_seconds": 0.0, "run_seconds": 0.0, "status": "pass"}, {"name": "ast06", "build_seconds": 0.2, "run_seconds": 0.0, "status": "pass"}, {"name": "ast12", "build_seconds": 0.3, "run_seconds": 0.0, "status": "pass"}],
  "workload_peak_mem_mib": null,
  "idle_memory": "54.29MiB",
  "code_server": "4.126.0",
  "tools": "nasm 2.15.05, yasm 1.3.0, gdb 12.1",
  "persistence": "pass",
  "passed": 13,
  "failed": 0
}
````

### `cell1-linux-amd64-runlog.txt` (7984 bytes)

verbatim run transcript (user-data run.log).

````text
+ export DEBIAN_FRONTEND=noninteractive
+ DEBIAN_FRONTEND=noninteractive
+ apt-get update -qq
+ apt-get install -y -qq docker.io curl unzip
Preconfiguring packages ...
Selecting previously unselected package pigz.
(Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 72595 files and directories currently installed.)
Preparing to unpack .../0-pigz_2.8-1_amd64.deb ...
Unpacking pigz (2.8-1) ...
Selecting previously unselected package bridge-utils.
Preparing to unpack .../1-bridge-utils_1.7.1-1ubuntu2_amd64.deb ...
Unpacking bridge-utils (1.7.1-1ubuntu2) ...
Selecting previously unselected package runc.
Preparing to unpack .../2-runc_1.3.4-0ubuntu1~24.04.1_amd64.deb ...
Unpacking runc (1.3.4-0ubuntu1~24.04.1) ...
Selecting previously unselected package containerd.
Preparing to unpack .../3-containerd_2.2.1-0ubuntu1~24.04.3_amd64.deb ...
Unpacking containerd (2.2.1-0ubuntu1~24.04.3) ...
Selecting previously unselected package dns-root-data.
Preparing to unpack .../4-dns-root-data_2024071801~ubuntu0.24.04.1_all.deb ...
Unpacking dns-root-data (2024071801~ubuntu0.24.04.1) ...
Selecting previously unselected package dnsmasq-base.
Preparing to unpack .../5-dnsmasq-base_2.90-2ubuntu0.4_amd64.deb ...
Unpacking dnsmasq-base (2.90-2ubuntu0.4) ...
Selecting previously unselected package docker.io.
Preparing to unpack .../6-docker.io_29.1.3-0ubuntu3~24.04.2_amd64.deb ...
Unpacking docker.io (29.1.3-0ubuntu3~24.04.2) ...
Selecting previously unselected package ubuntu-fan.
Preparing to unpack .../7-ubuntu-fan_0.12.16+24.04.1_all.deb ...
Unpacking ubuntu-fan (0.12.16+24.04.1) ...
Selecting previously unselected package unzip.
Preparing to unpack .../8-unzip_6.0-28ubuntu4.1_amd64.deb ...
Unpacking unzip (6.0-28ubuntu4.1) ...
Setting up unzip (6.0-28ubuntu4.1) ...
Setting up dnsmasq-base (2.90-2ubuntu0.4) ...
Setting up runc (1.3.4-0ubuntu1~24.04.1) ...
Setting up dns-root-data (2024071801~ubuntu0.24.04.1) ...
Setting up bridge-utils (1.7.1-1ubuntu2) ...
Setting up pigz (2.8-1) ...
Setting up containerd (2.2.1-0ubuntu1~24.04.3) ...
Created symlink /etc/systemd/system/multi-user.target.wants/containerd.service → /usr/lib/systemd/system/containerd.service.
Setting up ubuntu-fan (0.12.16+24.04.1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/ubuntu-fan.service → /usr/lib/systemd/system/ubuntu-fan.service.
Setting up docker.io (29.1.3-0ubuntu3~24.04.2) ...
info: Selecting GID from range 100 to 999 ...
info: Adding group `docker' (GID 113) ...
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /usr/lib/systemd/system/docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/docker.socket → /usr/lib/systemd/system/docker.socket.
Processing triggers for dbus (1.14.10-4ubuntu4.1) ...
Processing triggers for man-db (2.12.0-4build2) ...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
++ uname -m
+ curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o /tmp/awscliv2.zip
+ unzip -q /tmp/awscliv2.zip -d /tmp
+ /tmp/aws/install
You can now run: /usr/local/bin/aws --version
++ uname -m
+ '[' x86_64 = aarch64 ']'
+ systemctl start docker
+ mkdir -p /root/scripts
+ curl -fsSL https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main/scripts/ci-test.sh -o /root/scripts/ci-test.sh
+ cd /root
+ aws s3 cp s3://unlv-ide-ci-results-372172764211/workload/code.zip /root/code.zip --region us-east-1
Completed 256.0 KiB/825.9 KiB (1.8 MiB/s) with 1 file(s) remainingCompleted 512.0 KiB/825.9 KiB (3.5 MiB/s) with 1 file(s) remainingCompleted 768.0 KiB/825.9 KiB (4.9 MiB/s) with 1 file(s) remainingCompleted 825.9 KiB/825.9 KiB (5.2 MiB/s) with 1 file(s) remainingdownload: s3://unlv-ide-ci-results-372172764211/workload/code.zip to ./code.zip
+ unzip -o /root/code.zip -d /root
Archive:  /root/code.zip
   creating: /root/code/
   creating: /root/code/ast06/
  inflating: /root/code/ast06/main.o  
  inflating: /root/code/ast06/makefile  
  inflating: /root/code/ast06/ast6procs.lst  
  inflating: /root/code/ast06/a6f3.txt  
  inflating: /root/code/ast06/ast6procs.o  
  inflating: /root/code/ast06/a6f4.txt  
  inflating: /root/code/ast06/ast6procs.asm  
  inflating: /root/code/ast06/main   
  inflating: /root/code/ast06/main.cpp  
   creating: /root/code/ast3/
  inflating: /root/code/ast3/a3out.txt  
  inflating: /root/code/ast3/ast3    
  inflating: /root/code/ast3/makefile  
  inflating: /root/code/ast3/ast3-recovered.asm  
  inflating: /root/code/ast3/ast3.o  
  inflating: /root/code/ast3/ast3.lst  
  inflating: /root/code/ast3/asst03.pdf  
  inflating: /root/code/ast3/ast3.asm  
  inflating: /root/code/ast3/a3in.txt  
   creating: /root/code/ast12/
  inflating: /root/code/ast12/evilNums  
  inflating: /root/code/ast12/a12procs.lst  
 extracting: /root/code/ast12/write_up.pdf  
  inflating: /root/code/ast12/evilNums.cpp  
  inflating: /root/code/ast12/makefile  
  inflating: /root/code/ast12/asst12.pdf  
  inflating: /root/code/ast12/a12procs.o  
  inflating: /root/code/ast12/evilNums.o  
  inflating: /root/code/ast12/ast12results.ods  
  inflating: /root/code/ast12/a12procs-recovered.asm  
  inflating: /root/code/ast12/a12procs.asm  
 extracting: /root/code/ast12/a12times.txt  
  inflating: /root/code/workloads.tsv  
   creating: /root/code/ast04/
  inflating: /root/code/ast04/ast04.asm  
  inflating: /root/code/ast04/makefile  
  inflating: /root/code/ast04/ast04  
  inflating: /root/code/ast04/ast04.o  
  inflating: /root/code/ast04/ast04.lst  
+ bash scripts/ci-test.sh x86
== x86 on x86_64 (native) ==
== 1. Pull ==
  PASS  pulled seancnc/unlv-x86-ide in 16.3s
  size: 552 MB  digest: seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6
== 2. Cold start to healthy ==
  PASS  healthy on :8218 in 0.5s
== 3. Starter seeding ==
  PASS  starter hello.asm seeded to host
== 4. Compile and run (3 timed runs) ==
  PASS  run 1: 'Hello, x86!' in 0.0s
  PASS  run 2: 'Hello, x86!' in 0.0s
  PASS  run 3: 'Hello, x86!' in 0.0s
== 5. gdb probe ==
  PASS  gdb debugs natively
== 6. Idle resource use ==
  idle memory: 54.29MiB
== 7. Tool versions (for the paper's reproducibility table) ==
  code-server 4.126.0; nasm 2.15.05, yasm 1.3.0, gdb 12.1
== 8. Coursework workload (real assignments) ==
  PASS  workload ast3: build 0.0s, run 0.0s
  PASS  workload ast04: build 0.0s, run 0.0s
  PASS  workload ast06: build 0.2s, run 0.0s
  PASS  workload ast12: build 0.3s, run 0.0s
  peak container memory during workload: null MiB
== 9. Persistence across container replacement (+ warm start) ==
  PASS  replacement container healthy (warm start 0.5s)
  PASS  student files and edits survive container replacement (no re-seed overwrite)
== Cleanup ==
wrote results/x86-x86_64.json

RESULT: 13 passed, 0 failed
+ aws s3 cp /root/results/ s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-amd64/ --recursive --region us-east-1
Completed 1.0 KiB/1.0 KiB (15.5 KiB/s) with 1 file(s) remainingupload: results/x86-x86_64.json to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-amd64/x86-x86_64.json
+ aws s3 cp /var/log/unlv-run.log s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-amd64/run.log --region us-east-1
````


## Cell 2 — Linux arm64 (AWS m8g.large, QEMU binfmt emulation)

### `cell2-linux-arm64.json` (1053 bytes)

record JSON (fail, 3/5; source for the Table 1 cell 2 column).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "aarch64",
  "mode": "emulated",
  "host": {
    "cpu": "Neoverse-V2",
    "cores": 2,
    "ram_gb": 8,
    "os": "Ubuntu 24.04.4 LTS",
    "docker": "Docker version 29.1.3"
  },
  "digest": "seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6",
  "size_mb": 552,
  "pull_seconds": 12.8,
  "start_to_healthy_seconds": null,
  "warm_start_seconds": null,
  "compile_run_seconds": [null, null, null],
  "gdb": "broken",
  "workload": [{"name": "ast3", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast04", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast06", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast12", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}],
  "workload_peak_mem_mib": null,
  "idle_memory": "0B",
  "code_server": "",
  "tools": "nasm , yasm , gdb ",
  "persistence": "pass",
  "passed": 3,
  "failed": 5
}
````

### `cell2-linux-arm64-runlog.txt` (10150 bytes)

verbatim run transcript.

````text
+ export DEBIAN_FRONTEND=noninteractive
+ DEBIAN_FRONTEND=noninteractive
+ apt-get update -qq
+ apt-get install -y -qq docker.io curl unzip
Preconfiguring packages ...
Selecting previously unselected package pigz.
(Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 74109 files and directories currently installed.)
Preparing to unpack .../0-pigz_2.8-1_arm64.deb ...
Unpacking pigz (2.8-1) ...
Selecting previously unselected package bridge-utils.
Preparing to unpack .../1-bridge-utils_1.7.1-1ubuntu2_arm64.deb ...
Unpacking bridge-utils (1.7.1-1ubuntu2) ...
Selecting previously unselected package runc.
Preparing to unpack .../2-runc_1.3.4-0ubuntu1~24.04.1_arm64.deb ...
Unpacking runc (1.3.4-0ubuntu1~24.04.1) ...
Selecting previously unselected package containerd.
Preparing to unpack .../3-containerd_2.2.1-0ubuntu1~24.04.3_arm64.deb ...
Unpacking containerd (2.2.1-0ubuntu1~24.04.3) ...
Selecting previously unselected package dns-root-data.
Preparing to unpack .../4-dns-root-data_2024071801~ubuntu0.24.04.1_all.deb ...
Unpacking dns-root-data (2024071801~ubuntu0.24.04.1) ...
Selecting previously unselected package dnsmasq-base.
Preparing to unpack .../5-dnsmasq-base_2.90-2ubuntu0.4_arm64.deb ...
Unpacking dnsmasq-base (2.90-2ubuntu0.4) ...
Selecting previously unselected package docker.io.
Preparing to unpack .../6-docker.io_29.1.3-0ubuntu3~24.04.2_arm64.deb ...
Unpacking docker.io (29.1.3-0ubuntu3~24.04.2) ...
Selecting previously unselected package ubuntu-fan.
Preparing to unpack .../7-ubuntu-fan_0.12.16+24.04.1_all.deb ...
Unpacking ubuntu-fan (0.12.16+24.04.1) ...
Selecting previously unselected package unzip.
Preparing to unpack .../8-unzip_6.0-28ubuntu4.1_arm64.deb ...
Unpacking unzip (6.0-28ubuntu4.1) ...
Setting up unzip (6.0-28ubuntu4.1) ...
Setting up dnsmasq-base (2.90-2ubuntu0.4) ...
Setting up runc (1.3.4-0ubuntu1~24.04.1) ...
Setting up dns-root-data (2024071801~ubuntu0.24.04.1) ...
Setting up bridge-utils (1.7.1-1ubuntu2) ...
Setting up pigz (2.8-1) ...
Setting up containerd (2.2.1-0ubuntu1~24.04.3) ...
Created symlink /etc/systemd/system/multi-user.target.wants/containerd.service → /usr/lib/systemd/system/containerd.service.
Setting up ubuntu-fan (0.12.16+24.04.1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/ubuntu-fan.service → /usr/lib/systemd/system/ubuntu-fan.service.
Setting up docker.io (29.1.3-0ubuntu3~24.04.2) ...
info: Selecting GID from range 100 to 999 ...
info: Adding group `docker' (GID 112) ...
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /usr/lib/systemd/system/docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/docker.socket → /usr/lib/systemd/system/docker.socket.
Processing triggers for dbus (1.14.10-4ubuntu4.1) ...
Processing triggers for man-db (2.12.0-4build2) ...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
++ uname -m
+ curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip -o /tmp/awscliv2.zip
+ unzip -q /tmp/awscliv2.zip -d /tmp
+ /tmp/aws/install
You can now run: /usr/local/bin/aws --version
++ uname -m
+ '[' aarch64 = aarch64 ']'
+ apt-get install -y -qq qemu-user-static binfmt-support
Selecting previously unselected package binfmt-support.
(Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 74499 files and directories currently installed.)
Preparing to unpack .../binfmt-support_2.2.2-7_arm64.deb ...
Unpacking binfmt-support (2.2.2-7) ...
Selecting previously unselected package qemu-user-static.
Preparing to unpack .../qemu-user-static_1%3a8.2.2+ds-0ubuntu1.18_arm64.deb ...
Unpacking qemu-user-static (1:8.2.2+ds-0ubuntu1.18) ...
Setting up qemu-user-static (1:8.2.2+ds-0ubuntu1.18) ...
Setting up binfmt-support (2.2.2-7) ...
update-binfmts: warning: python3.12 already enabled in kernel.
Created symlink /etc/systemd/system/multi-user.target.wants/binfmt-support.service → /usr/lib/systemd/system/binfmt-support.service.
Processing triggers for man-db (2.12.0-4build2) ...
Processing triggers for systemd (255.4-1ubuntu8.16) ...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
+ systemctl start docker
+ mkdir -p /root/scripts
+ curl -fsSL https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main/scripts/ci-test.sh -o /root/scripts/ci-test.sh
+ cd /root
+ aws s3 cp s3://unlv-ide-ci-results-372172764211/workload/code.zip /root/code.zip --region us-east-1
Completed 256.0 KiB/825.9 KiB (6.2 MiB/s) with 1 file(s) remainingCompleted 512.0 KiB/825.9 KiB (12.1 MiB/s) with 1 file(s) remainingCompleted 768.0 KiB/825.9 KiB (17.4 MiB/s) with 1 file(s) remainingCompleted 825.9 KiB/825.9 KiB (18.2 MiB/s) with 1 file(s) remainingdownload: s3://unlv-ide-ci-results-372172764211/workload/code.zip to ./code.zip
+ unzip -o /root/code.zip -d /root
Archive:  /root/code.zip
   creating: /root/code/
   creating: /root/code/ast06/
  inflating: /root/code/ast06/main.o  
  inflating: /root/code/ast06/makefile  
  inflating: /root/code/ast06/ast6procs.lst  
  inflating: /root/code/ast06/a6f3.txt  
  inflating: /root/code/ast06/ast6procs.o  
  inflating: /root/code/ast06/a6f4.txt  
  inflating: /root/code/ast06/ast6procs.asm  
  inflating: /root/code/ast06/main   
  inflating: /root/code/ast06/main.cpp  
   creating: /root/code/ast3/
  inflating: /root/code/ast3/a3out.txt  
  inflating: /root/code/ast3/ast3    
  inflating: /root/code/ast3/makefile  
  inflating: /root/code/ast3/ast3-recovered.asm  
  inflating: /root/code/ast3/ast3.o  
  inflating: /root/code/ast3/ast3.lst  
  inflating: /root/code/ast3/asst03.pdf  
  inflating: /root/code/ast3/ast3.asm  
  inflating: /root/code/ast3/a3in.txt  
   creating: /root/code/ast12/
  inflating: /root/code/ast12/evilNums  
  inflating: /root/code/ast12/a12procs.lst  
 extracting: /root/code/ast12/write_up.pdf  
  inflating: /root/code/ast12/evilNums.cpp  
  inflating: /root/code/ast12/makefile  
  inflating: /root/code/ast12/asst12.pdf  
  inflating: /root/code/ast12/a12procs.o  
  inflating: /root/code/ast12/evilNums.o  
  inflating: /root/code/ast12/ast12results.ods  
  inflating: /root/code/ast12/a12procs-recovered.asm  
  inflating: /root/code/ast12/a12procs.asm  
 extracting: /root/code/ast12/a12times.txt  
  inflating: /root/code/workloads.tsv  
   creating: /root/code/ast04/
  inflating: /root/code/ast04/ast04.asm  
  inflating: /root/code/ast04/makefile  
  inflating: /root/code/ast04/ast04  
  inflating: /root/code/ast04/ast04.o  
  inflating: /root/code/ast04/ast04.lst  
+ bash scripts/ci-test.sh x86
== x86 on aarch64 (emulated) ==
== 1. Pull ==
  PASS  pulled seancnc/unlv-x86-ide in 12.8s
  size: 552 MB  digest: seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6
== 2. Cold start to healthy ==
  FAIL  healthy on :8218
== 3. Starter seeding ==
  PASS  starter hello.asm seeded to host
== 4. Compile and run (3 timed runs) ==
  FAIL  run 1 produced 'Hello, x86!' (got: Error response from daemon: container 909a1f67741619d65124b6f018b21076352c37e99b5e3c9593f53870145e8d6a is not running)
  FAIL  run 2 produced 'Hello, x86!' (got: Error response from daemon: container 909a1f67741619d65124b6f018b21076352c37e99b5e3c9593f53870145e8d6a is not running)
  FAIL  run 3 produced 'Hello, x86!' (got: Error response from daemon: container 909a1f67741619d65124b6f018b21076352c37e99b5e3c9593f53870145e8d6a is not running)
== 5. gdb probe ==
  INFO  gdb under emulation: broken (documented limitation is 'broken')
== 6. Idle resource use ==
  idle memory: 0B
== 7. Tool versions (for the paper's reproducibility table) ==
  code-server ; nasm , yasm , gdb 
== 8. Coursework workload (real assignments) ==
  INFO  workload ast3 under emulation: build-fail (recorded, not failed)
  INFO  workload ast04 under emulation: build-fail (recorded, not failed)
  INFO  workload ast06 under emulation: build-fail (recorded, not failed)
  INFO  workload ast12 under emulation: build-fail (recorded, not failed)
  peak container memory during workload: null MiB
== 9. Persistence across container replacement (+ warm start) ==
  FAIL  replacement container healthy
  PASS  student files and edits survive container replacement (no re-seed overwrite)
== Cleanup ==
wrote results/x86-aarch64.json

RESULT: 3 passed, 5 failed
+ aws s3 cp /root/results/ s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-arm64/ --recursive --region us-east-1
Completed 1.0 KiB/1.0 KiB (17.3 KiB/s) with 1 file(s) remainingupload: results/x86-aarch64.json to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-arm64/x86-aarch64.json
+ aws s3 cp /var/log/unlv-run.log s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827/linux-arm64/run.log --region us-east-1
````


## Cell 2 confirmation re-run (separate launch, diagnostics stage)

### `cell2-linux-arm64-rerun.json` (1053 bytes)

confirmation JSON (reproduced the 3/5 outcome; not a tables source).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "aarch64",
  "mode": "emulated",
  "host": {
    "cpu": "Neoverse-V2",
    "cores": 2,
    "ram_gb": 8,
    "os": "Ubuntu 24.04.4 LTS",
    "docker": "Docker version 29.1.3"
  },
  "digest": "seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6",
  "size_mb": 552,
  "pull_seconds": 16.5,
  "start_to_healthy_seconds": null,
  "warm_start_seconds": null,
  "compile_run_seconds": [null, null, null],
  "gdb": "broken",
  "workload": [{"name": "ast3", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast04", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast06", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}, {"name": "ast12", "build_seconds": 0.0, "run_seconds": null, "status": "build-fail"}],
  "workload_peak_mem_mib": null,
  "idle_memory": "0B",
  "code_server": "",
  "tools": "nasm , yasm , gdb ",
  "persistence": "pass",
  "passed": 3,
  "failed": 5
}
````

### `cell2-linux-arm64-rerun-runlog.txt` (11119 bytes)

verbatim run transcript.

````text
+ export DEBIAN_FRONTEND=noninteractive
+ DEBIAN_FRONTEND=noninteractive
+ apt-get update -qq
+ apt-get install -y -qq docker.io curl unzip qemu-user-static binfmt-support
Preconfiguring packages ...
Selecting previously unselected package binfmt-support.
(Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 74109 files and directories currently installed.)
Preparing to unpack .../00-binfmt-support_2.2.2-7_arm64.deb ...
Unpacking binfmt-support (2.2.2-7) ...
Selecting previously unselected package pigz.
Preparing to unpack .../01-pigz_2.8-1_arm64.deb ...
Unpacking pigz (2.8-1) ...
Selecting previously unselected package bridge-utils.
Preparing to unpack .../02-bridge-utils_1.7.1-1ubuntu2_arm64.deb ...
Unpacking bridge-utils (1.7.1-1ubuntu2) ...
Selecting previously unselected package runc.
Preparing to unpack .../03-runc_1.3.4-0ubuntu1~24.04.1_arm64.deb ...
Unpacking runc (1.3.4-0ubuntu1~24.04.1) ...
Selecting previously unselected package containerd.
Preparing to unpack .../04-containerd_2.2.1-0ubuntu1~24.04.3_arm64.deb ...
Unpacking containerd (2.2.1-0ubuntu1~24.04.3) ...
Selecting previously unselected package dns-root-data.
Preparing to unpack .../05-dns-root-data_2024071801~ubuntu0.24.04.1_all.deb ...
Unpacking dns-root-data (2024071801~ubuntu0.24.04.1) ...
Selecting previously unselected package dnsmasq-base.
Preparing to unpack .../06-dnsmasq-base_2.90-2ubuntu0.4_arm64.deb ...
Unpacking dnsmasq-base (2.90-2ubuntu0.4) ...
Selecting previously unselected package docker.io.
Preparing to unpack .../07-docker.io_29.1.3-0ubuntu3~24.04.2_arm64.deb ...
Unpacking docker.io (29.1.3-0ubuntu3~24.04.2) ...
Selecting previously unselected package qemu-user-static.
Preparing to unpack .../08-qemu-user-static_1%3a8.2.2+ds-0ubuntu1.18_arm64.deb ...
Unpacking qemu-user-static (1:8.2.2+ds-0ubuntu1.18) ...
Selecting previously unselected package ubuntu-fan.
Preparing to unpack .../09-ubuntu-fan_0.12.16+24.04.1_all.deb ...
Unpacking ubuntu-fan (0.12.16+24.04.1) ...
Selecting previously unselected package unzip.
Preparing to unpack .../10-unzip_6.0-28ubuntu4.1_arm64.deb ...
Unpacking unzip (6.0-28ubuntu4.1) ...
Setting up qemu-user-static (1:8.2.2+ds-0ubuntu1.18) ...
Setting up unzip (6.0-28ubuntu4.1) ...
Setting up dnsmasq-base (2.90-2ubuntu0.4) ...
Setting up runc (1.3.4-0ubuntu1~24.04.1) ...
Setting up dns-root-data (2024071801~ubuntu0.24.04.1) ...
Setting up binfmt-support (2.2.2-7) ...
update-binfmts: warning: python3.12 already enabled in kernel.
Created symlink /etc/systemd/system/multi-user.target.wants/binfmt-support.service → /usr/lib/systemd/system/binfmt-support.service.
Setting up bridge-utils (1.7.1-1ubuntu2) ...
Setting up pigz (2.8-1) ...
Setting up containerd (2.2.1-0ubuntu1~24.04.3) ...
Created symlink /etc/systemd/system/multi-user.target.wants/containerd.service → /usr/lib/systemd/system/containerd.service.
Setting up ubuntu-fan (0.12.16+24.04.1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/ubuntu-fan.service → /usr/lib/systemd/system/ubuntu-fan.service.
Setting up docker.io (29.1.3-0ubuntu3~24.04.2) ...
info: Selecting GID from range 100 to 999 ...
info: Adding group `docker' (GID 112) ...
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /usr/lib/systemd/system/docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/docker.socket → /usr/lib/systemd/system/docker.socket.
Processing triggers for dbus (1.14.10-4ubuntu4.1) ...
Processing triggers for systemd (255.4-1ubuntu8.16) ...
Processing triggers for man-db (2.12.0-4build2) ...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
++ uname -m
+ curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip -o /tmp/awscliv2.zip
+ unzip -q /tmp/awscliv2.zip -d /tmp
+ /tmp/aws/install
You can now run: /usr/local/bin/aws --version
+ systemctl start docker
+ mkdir -p /root/scripts
+ curl -fsSL https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main/scripts/ci-test.sh -o /root/scripts/ci-test.sh
+ cd /root
+ aws s3 cp s3://unlv-ide-ci-results-372172764211/workload/code.zip /root/code.zip --region us-east-1
Completed 256.0 KiB/825.9 KiB (1.4 MiB/s) with 1 file(s) remainingCompleted 512.0 KiB/825.9 KiB (2.7 MiB/s) with 1 file(s) remainingCompleted 768.0 KiB/825.9 KiB (4.1 MiB/s) with 1 file(s) remainingCompleted 825.9 KiB/825.9 KiB (4.3 MiB/s) with 1 file(s) remainingdownload: s3://unlv-ide-ci-results-372172764211/workload/code.zip to ./code.zip
+ unzip -o /root/code.zip -d /root
Archive:  /root/code.zip
   creating: /root/code/
   creating: /root/code/ast06/
  inflating: /root/code/ast06/main.o  
  inflating: /root/code/ast06/makefile  
  inflating: /root/code/ast06/ast6procs.lst  
  inflating: /root/code/ast06/a6f3.txt  
  inflating: /root/code/ast06/ast6procs.o  
  inflating: /root/code/ast06/a6f4.txt  
  inflating: /root/code/ast06/ast6procs.asm  
  inflating: /root/code/ast06/main   
  inflating: /root/code/ast06/main.cpp  
   creating: /root/code/ast3/
  inflating: /root/code/ast3/a3out.txt  
  inflating: /root/code/ast3/ast3    
  inflating: /root/code/ast3/makefile  
  inflating: /root/code/ast3/ast3-recovered.asm  
  inflating: /root/code/ast3/ast3.o  
  inflating: /root/code/ast3/ast3.lst  
  inflating: /root/code/ast3/asst03.pdf  
  inflating: /root/code/ast3/ast3.asm  
  inflating: /root/code/ast3/a3in.txt  
   creating: /root/code/ast12/
  inflating: /root/code/ast12/evilNums  
  inflating: /root/code/ast12/a12procs.lst  
 extracting: /root/code/ast12/write_up.pdf  
  inflating: /root/code/ast12/evilNums.cpp  
  inflating: /root/code/ast12/makefile  
  inflating: /root/code/ast12/asst12.pdf  
  inflating: /root/code/ast12/a12procs.o  
  inflating: /root/code/ast12/evilNums.o  
  inflating: /root/code/ast12/ast12results.ods  
  inflating: /root/code/ast12/a12procs-recovered.asm  
  inflating: /root/code/ast12/a12procs.asm  
 extracting: /root/code/ast12/a12times.txt  
  inflating: /root/code/workloads.tsv  
   creating: /root/code/ast04/
  inflating: /root/code/ast04/ast04.asm  
  inflating: /root/code/ast04/makefile  
  inflating: /root/code/ast04/ast04  
  inflating: /root/code/ast04/ast04.o  
  inflating: /root/code/ast04/ast04.lst  
+ bash scripts/ci-test.sh x86
== x86 on aarch64 (emulated) ==
== 1. Pull ==
  PASS  pulled seancnc/unlv-x86-ide in 16.5s
  size: 552 MB  digest: seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6
== 2. Cold start to healthy ==
  FAIL  healthy on :8218
== 3. Starter seeding ==
  PASS  starter hello.asm seeded to host
== 4. Compile and run (3 timed runs) ==
  FAIL  run 1 produced 'Hello, x86!' (got: Error response from daemon: container da8ef9ec4f1003a0b05526c13754d2b7a5aacf7fd978212ebf72357e6860fe2c is not running)
  FAIL  run 2 produced 'Hello, x86!' (got: Error response from daemon: container da8ef9ec4f1003a0b05526c13754d2b7a5aacf7fd978212ebf72357e6860fe2c is not running)
  FAIL  run 3 produced 'Hello, x86!' (got: Error response from daemon: container da8ef9ec4f1003a0b05526c13754d2b7a5aacf7fd978212ebf72357e6860fe2c is not running)
== 5. gdb probe ==
  INFO  gdb under emulation: broken (documented limitation is 'broken')
== 6. Idle resource use ==
  idle memory: 0B
== 7. Tool versions (for the paper's reproducibility table) ==
  code-server ; nasm , yasm , gdb 
== 8. Coursework workload (real assignments) ==
  INFO  workload ast3 under emulation: build-fail (recorded, not failed)
  INFO  workload ast04 under emulation: build-fail (recorded, not failed)
  INFO  workload ast06 under emulation: build-fail (recorded, not failed)
  INFO  workload ast12 under emulation: build-fail (recorded, not failed)
  peak container memory during workload: null MiB
== 9. Persistence across container replacement (+ warm start) ==
  FAIL  replacement container healthy
  PASS  student files and edits survive container replacement (no re-seed overwrite)
== Cleanup ==
wrote results/x86-aarch64.json

RESULT: 3 passed, 5 failed
+ mkdir -p /root/results /root/diagws
+ chmod 777 /root/diagws
+ docker rm -f unlv-x86-ide unlv-diag
+ docker run -d --platform linux/amd64 --name unlv-diag -p 127.0.0.1:8218:8080 -v /root/diagws:/home/coder/workspace seancnc/unlv-x86-ide
481065c2c8279953db4d612bbff6a62a462588fe1cadfbdf5f2cc141d70d83aa
+ sleep 90
+ docker ps -a
+ docker inspect --format 'status={{.State.Status}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}} err={{.State.Error}}' unlv-diag
+ docker logs unlv-diag
+ dmesg
+ tail -150
+ free -m
+ docker rm -f unlv-diag
unlv-diag
+ aws s3 cp /root/results/ s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/ --recursive --region us-east-1
Completed 38 Bytes/14.2 KiB (419 Bytes/s) with 6 file(s) remainingupload: results/diag-state.txt to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/diag-state.txt
Completed 38 Bytes/14.2 KiB (419 Bytes/s) with 5 file(s) remainingCompleted 102 Bytes/14.2 KiB (1.1 KiB/s) with 5 file(s) remaining upload: results/diag-container.log to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/diag-container.log
Completed 102 Bytes/14.2 KiB (1.1 KiB/s) with 4 file(s) remainingCompleted 1.1 KiB/14.2 KiB (11.7 KiB/s) with 4 file(s) remaining upload: results/x86-aarch64.json to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/x86-aarch64.json
Completed 1.1 KiB/14.2 KiB (11.7 KiB/s) with 3 file(s) remainingCompleted 13.7 KiB/14.2 KiB (140.6 KiB/s) with 3 file(s) remainingupload: results/diag-dmesg.txt to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/diag-dmesg.txt
Completed 13.7 KiB/14.2 KiB (140.6 KiB/s) with 2 file(s) remainingCompleted 13.9 KiB/14.2 KiB (136.8 KiB/s) with 2 file(s) remainingupload: results/diag-free.txt to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/diag-free.txt
Completed 13.9 KiB/14.2 KiB (136.8 KiB/s) with 1 file(s) remainingCompleted 14.2 KiB/14.2 KiB (127.6 KiB/s) with 1 file(s) remainingupload: results/diag-ps.txt to s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/diag-ps.txt
+ aws s3 cp /var/log/unlv-run.log s3://unlv-ide-ci-results-372172764211/matrix/20260818-053827-arm64-rerun/linux-arm64/run.log --region us-east-1
````

### `cell2-linux-arm64-rerun-diag-state.txt` (38 bytes)

docker inspect state of the diagnostic container.

````text
status=exited exit=139 oom=false err=
````

### `cell2-linux-arm64-rerun-diag-container.log` (64 bytes)

docker logs of the diagnostic container.

````text
x86_64-binfmt-P: QEMU internal SIGSEGV {code=MAPERR, addr=0x20}
````

### `cell2-linux-arm64-rerun-diag-dmesg.txt` (12857 bytes)

kernel log (shows the QEMU internal SIGSEGV).

````text
[    1.456548] evm: security.ima
[    1.457072] evm: security.capability
[    1.457698] evm: HMAC attrs: 0x1
[    1.475610] clk: Disabling unused clocks
[    1.476306] PM: genpd: Disabling unused power domains
[    1.477542] check access for rdinit=/init failed: -2, ignoring
[    1.478196] md: Waiting for all devices to be available before autodetect
[    1.479105] md: If you don't use raid, use raid=noautodetect
[    1.479865] md: Autodetecting RAID arrays.
[    1.480416] md: autorun ...
[    1.480791] md: ... autorun DONE.
[    1.484819] EXT4-fs (nvme0n1p1): Supports (experimental) DIO atomic writes awu_min: 4096, awu_max: 4096
[    1.487104] EXT4-fs (nvme0n1p1): mounted filesystem 1ec57f43-1c53-452b-a2eb-d8c7dedcb7ee ro with ordered data mode. Quota mode: none.
[    1.488606] VFS: Mounted root (ext4 filesystem) readonly on device 259:1.
[    1.490194] devtmpfs: mounted
[    1.492280] Freeing unused kernel memory: 14528K
[    1.506662] Checked W+X mappings: passed, no W+X pages found
[    1.507316] Run /sbin/init as init process
[    1.507856]   with arguments:
[    1.507857]     /sbin/init
[    1.507858]   with environment:
[    1.507859]     HOME=/
[    1.507860]     TERM=linux
[    1.639439] systemd[1]: Inserted module 'autofs4'
[    1.662711] systemd[1]: systemd 255.4-1ubuntu8.16 running in system mode (+PAM +AUDIT +SELINUX +APPARMOR +IMA +SMACK +SECCOMP +GCRYPT -GNUTLS +OPENSSL +ACL +BLKID +CURL +ELFUTILS +FIDO2 +IDN2 -IDN +IPTC +KMOD +LIBCRYPTSETUP +LIBFDISK +PCRE2 -PWQUALITY +P11KIT +QRENCODE +TPM2 +BZIP2 +LZ4 +XZ +ZLIB +ZSTD -BPF_FRAMEWORK -XKBCOMMON +UTMP +SYSVINIT default-hierarchy=unified)
[    1.667012] systemd[1]: Detected virtualization amazon.
[    1.667706] systemd[1]: Detected architecture arm64.
[    1.670279] systemd[1]: Hostname set to <ubuntu>.
[    1.674949] systemd[1]: Initializing machine ID from VM UUID.
[    1.675619] systemd[1]: Installed transient /etc/machine-id file.
[    2.021278] systemd[1]: Queued start job for default target graphical.target.
[    2.030364] systemd[1]: Created slice system-modprobe.slice - Slice /system/modprobe.
[    2.032808] systemd[1]: Created slice system-serial\x2dgetty.slice - Slice /system/serial-getty.
[    2.035405] systemd[1]: Created slice system-systemd\x2dfsck.slice - Slice /system/systemd-fsck.
[    2.037953] systemd[1]: Created slice user.slice - User and Session Slice.
[    2.039906] systemd[1]: Started systemd-ask-password-wall.path - Forward Password Requests to Wall Directory Watch.
[    2.042704] systemd[1]: Set up automount proc-sys-fs-binfmt_misc.automount - Arbitrary Executable File Formats File System Automount Point.
[    2.049384] systemd[1]: Expecting device dev-disk-by\x2dlabel-BOOT.device - /dev/disk/by-label/BOOT...
[    2.051753] systemd[1]: Expecting device dev-disk-by\x2dlabel-UEFI.device - /dev/disk/by-label/UEFI...
[    2.054202] systemd[1]: Expecting device dev-ttyS0.device - /dev/ttyS0...
[    2.056026] systemd[1]: Reached target integritysetup.target - Local Integrity Protected Volumes.
[    2.058558] systemd[1]: Reached target slices.target - Slice Units.
[    2.060355] systemd[1]: Reached target snapd.mounts-pre.target - Mounting snaps.
[    2.065372] systemd[1]: Reached target swap.target - Swaps.
[    2.066911] systemd[1]: Reached target time-set.target - System Time Set.
[    2.068907] systemd[1]: Reached target veritysetup.target - Local Verity Protected Volumes.
[    2.071335] systemd[1]: Listening on dm-event.socket - Device-mapper event daemon FIFOs.
[    2.073693] systemd[1]: Listening on lvm2-lvmpolld.socket - LVM2 poll daemon socket.
[    2.081454] systemd[1]: Listening on multipathd.socket - multipathd control socket.
[    2.084849] systemd[1]: Listening on syslog.socket - Syslog Socket.
[    2.086585] systemd[1]: Listening on systemd-fsckd.socket - fsck to fsckd communication Socket.
[    2.089089] systemd[1]: Listening on systemd-initctl.socket - initctl Compatibility Named Pipe.
[    2.091623] systemd[1]: Listening on systemd-journald-dev-log.socket - Journal Socket (/dev/log).
[    2.094169] systemd[1]: Listening on systemd-journald.socket - Journal Socket.
[    2.096287] systemd[1]: Listening on systemd-networkd.socket - Network Service Netlink Socket.
[    2.098688] systemd[1]: systemd-pcrextend.socket - TPM2 PCR Extension (Varlink) was skipped because of an unmet condition check (ConditionSecurity=measured-uki).
[    2.100691] systemd[1]: Listening on systemd-udevd-control.socket - udev Control Socket.
[    2.103000] systemd[1]: Listening on systemd-udevd-kernel.socket - udev Kernel Socket.
[    2.120827] systemd[1]: Mounting dev-hugepages.mount - Huge Pages File System...
[    2.123261] systemd[1]: Mounting dev-mqueue.mount - POSIX Message Queue File System...
[    2.125935] systemd[1]: Mounting sys-kernel-debug.mount - Kernel Debug File System...
[    2.131413] systemd[1]: Mounting sys-kernel-tracing.mount - Kernel Trace File System...
[    2.138417] systemd[1]: Starting systemd-journald.service - Journal Service...
[    2.140825] systemd[1]: Starting keyboard-setup.service - Set the console keyboard layout...
[    2.145067] systemd[1]: Starting kmod-static-nodes.service - Create List of Static Device Nodes...
[    2.149473] systemd[1]: Starting lvm2-monitor.service - Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling...
[    2.153634] systemd[1]: Starting modprobe@configfs.service - Load Kernel Module configfs...
[    2.159858] systemd[1]: Starting modprobe@dm_mod.service - Load Kernel Module dm_mod...
[    2.162269] systemd-journald[194]: Collecting audit messages is disabled.
[    2.164169] systemd[1]: Starting modprobe@drm.service - Load Kernel Module drm...
[    2.180854] systemd[1]: Starting modprobe@efi_pstore.service - Load Kernel Module efi_pstore...
[    2.183847] systemd[1]: Starting modprobe@fuse.service - Load Kernel Module fuse...
[    2.190144] pstore: Using crash dump compression: deflate
[    2.191974] systemd[1]: Starting modprobe@loop.service - Load Kernel Module loop...
[    2.192913] pstore: Registered efi_pstore as persistent store backend
[    2.197354] systemd[1]: netplan-ovs-cleanup.service - OpenVSwitch configuration for cleanup was skipped because of an unmet condition check (ConditionFileIsExecutable=/usr/bin/ovs-vsctl).
[    2.207862] systemd[1]: Starting systemd-fsck-root.service - File System Check on Root Device...
[    2.221864] systemd[1]: Starting systemd-modules-load.service - Load Kernel Modules...
[    2.224261] systemd[1]: systemd-pcrmachine.service - TPM2 PCR Machine ID Measurement was skipped because of an unmet condition check (ConditionSecurity=measured-uki).
[    2.226523] systemd[1]: systemd-tpm2-setup-early.service - TPM2 SRK Setup (Early) was skipped because of an unmet condition check (ConditionSecurity=measured-uki).
[    2.231847] systemd[1]: Starting systemd-udev-trigger.service - Coldplug All udev Devices...
[    2.236054] systemd[1]: Started systemd-journald.service - Journal Service.
[    2.358887] EXT4-fs (nvme0n1p1): re-mounted 1ec57f43-1c53-452b-a2eb-d8c7dedcb7ee r/w.
[    2.376978] systemd-journald[194]: Received client request to flush runtime journal.
[    2.439718] loop0: detected capacity change from 0 to 49832
[    2.440673] loop1: detected capacity change from 0 to 141232
[    2.449303] loop2: detected capacity change from 0 to 88824
[    2.607698] ena 0000:27:00.0 ens34: renamed from eth0
[    2.627374] nvme nvme0: using unchecked data buffer
[    3.241457] EXT4-fs (nvme0n1p16): Supports (experimental) DIO atomic writes awu_min: 4096, awu_max: 4096
[    3.243744] EXT4-fs (nvme0n1p16): mounted filesystem 1816cde1-89a8-4bcd-b63b-2a506a72b0e6 r/w with ordered data mode. Quota mode: none.
[    3.328364] audit: type=1400 audit(1787036459.439:2): apparmor="STATUS" operation="profile_load" profile="unconfined" name="1password" pid=377 comm="apparmor_parser"
[    3.328530] audit: type=1400 audit(1787036459.439:3): apparmor="STATUS" operation="profile_load" profile="unconfined" name="Discord" pid=378 comm="apparmor_parser"
[    3.330503] audit: type=1400 audit(1787036459.441:4): apparmor="STATUS" operation="profile_load" profile="unconfined" name=4D6F6E676F444220436F6D70617373 pid=382 comm="apparmor_parser"
[    3.332798] audit: type=1400 audit(1787036459.444:5): apparmor="STATUS" operation="profile_load" profile="unconfined" name="balena-etcher" pid=384 comm="apparmor_parser"
[    3.334558] audit: type=1400 audit(1787036459.445:6): apparmor="STATUS" operation="profile_load" profile="unconfined" name="QtWebEngineProcess" pid=383 comm="apparmor_parser"
[    3.337845] audit: type=1400 audit(1787036459.449:7): apparmor="STATUS" operation="profile_load" profile="unconfined" name="brave" pid=385 comm="apparmor_parser"
[    3.338317] audit: type=1400 audit(1787036459.449:8): apparmor="STATUS" operation="profile_load" profile="unconfined" name="buildah" pid=387 comm="apparmor_parser"
[    3.339424] audit: type=1400 audit(1787036459.450:9): apparmor="STATUS" operation="profile_load" profile="unconfined" name="cam" pid=389 comm="apparmor_parser"
[    3.342710] audit: type=1400 audit(1787036459.453:10): apparmor="STATUS" operation="profile_load" profile="unconfined" name="ch-checkns" pid=390 comm="apparmor_parser"
[    4.375790] 8021q: 802.1Q VLAN Support v1.8
[    7.446372] EXT4-fs (nvme0n1p1): resizing filesystem from 1834747 to 4980475 blocks
[    7.535452] EXT4-fs (nvme0n1p1): resized filesystem to 4980475
[    9.363715] kauditd_printk_skb: 113 callbacks suppressed
[    9.363718] audit: type=1400 audit(1787036465.474:124): apparmor="STATUS" operation="profile_replace" info="same as current profile, skipping" profile="unconfined" name="rsyslogd" pid=770 comm="apparmor_parser"
[   10.808731] loop3: detected capacity change from 0 to 8
[   13.407713] audit: type=1400 audit(1787036469.518:125): apparmor="DENIED" operation="capable" class="cap" profile="ubuntu_pro_esm_cache_systemd_detect_virt" pid=1297 comm="systemd-detect-" capability=38  capname="perfmon"
[   30.369163] audit: type=1400 audit(1787036486.230:126): apparmor="STATUS" operation="profile_load" profile="unconfined" name="docker-default" pid=2031 comm="apparmor_parser"
[   30.528532] Initializing XFRM netlink socket
[   30.554777] bridge: filtering via arp/ip/ip6tables is no longer available by default. Update your scripts to load br_netfilter if you need this.
[   55.787792] evm: overlay not supported
[   59.982495] docker0: port 1(vethe2be862) entered blocking state
[   59.982503] docker0: port 1(vethe2be862) entered disabled state
[   59.982515] vethe2be862: entered allmulticast mode
[   59.982547] vethe2be862: entered promiscuous mode
[   59.990208] eth0: renamed from vethad9e370
[   59.990672] docker0: port 1(vethe2be862) entered blocking state
[   59.990677] docker0: port 1(vethe2be862) entered forwarding state
[   60.546559] docker0: port 1(vethe2be862) entered disabled state
[   60.546791] vethad9e370: renamed from eth0
[   60.555494] docker0: port 1(vethe2be862) entered disabled state
[   60.555819] vethe2be862 (unregistering): left allmulticast mode
[   60.555822] vethe2be862 (unregistering): left promiscuous mode
[   60.555825] docker0: port 1(vethe2be862) entered disabled state
[  360.486274] docker0: port 1(vethfd898ea) entered blocking state
[  360.486280] docker0: port 1(vethfd898ea) entered disabled state
[  360.486289] vethfd898ea: entered allmulticast mode
[  360.486320] vethfd898ea: entered promiscuous mode
[  360.490701] eth0: renamed from veth2a5a92e
[  360.493226] docker0: port 1(vethfd898ea) entered blocking state
[  360.493231] docker0: port 1(vethfd898ea) entered forwarding state
[  361.015699] docker0: port 1(vethfd898ea) entered disabled state
[  361.016117] veth2a5a92e: renamed from eth0
[  361.028146] docker0: port 1(vethfd898ea) entered disabled state
[  361.028467] vethfd898ea (unregistering): left allmulticast mode
[  361.028471] vethfd898ea (unregistering): left promiscuous mode
[  361.028474] docker0: port 1(vethfd898ea) entered disabled state
[  660.372816] docker0: port 1(veth8490184) entered blocking state
[  660.372824] docker0: port 1(veth8490184) entered disabled state
[  660.372834] veth8490184: entered allmulticast mode
[  660.372890] veth8490184: entered promiscuous mode
[  660.377587] eth0: renamed from vethe816ce9
[  660.378265] docker0: port 1(veth8490184) entered blocking state
[  660.378269] docker0: port 1(veth8490184) entered forwarding state
[  660.915605] docker0: port 1(veth8490184) entered disabled state
[  660.916085] vethe816ce9: renamed from eth0
[  660.930952] docker0: port 1(veth8490184) entered disabled state
[  660.931641] veth8490184 (unregistering): left allmulticast mode
[  660.931646] veth8490184 (unregistering): left promiscuous mode
[  660.931649] docker0: port 1(veth8490184) entered disabled state
````

### `cell2-linux-arm64-rerun-diag-free.txt` (207 bytes)

memory state (rules out OOM).

````text
               total        used        free      shared  buff/cache   available
Mem:            7758         522        3566           1        3876        7235
Swap:              0           0           0
````

### `cell2-linux-arm64-rerun-diag-ps.txt` (274 bytes)

process table during diagnostics.

````text
CONTAINER ID   IMAGE                  COMMAND                  CREATED              STATUS                            PORTS     NAMES
481065c2c827   seancnc/unlv-x86-ide   "/usr/bin/tini -- /u…"   About a minute ago   Exited (139) About a minute ago             unlv-diag
````


## Cell 3 AWS attempt — Windows Server 2025 proxy (rig infrastructure failure)

### `cell3-windows-aws-runlog.txt` (95804 bytes)

verbatim PowerShell transcript; ci-test.sh never ran, no JSON exists — this transcript is the only evidence.

````text
﻿**********************
Windows PowerShell transcript start
Start time: 20260818062127
Username: EC2AMAZ-5RAVRV5\Administrator
RunAs User: EC2AMAZ-5RAVRV5\Administrator
Configuration Name: 
Machine: EC2AMAZ-5RAVRV5 (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Unrestricted $env:EC2Launch_Execution_Mode = 'attached'; . 'C:\Windows\system32\config\systemprofile\AppData\Local\Temp\EC2Launch286478629\UserScript.ps1'; exit $LASTEXITCODE
Process ID: 4080
PSVersion: 5.1.26100.33296
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.33296
BuildVersion: 10.0.26100.33296
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log




**********************
Windows PowerShell transcript end
End time: 20260818063358
**********************
**********************
Windows PowerShell transcript start
Start time: 20260818083438
Username: EC2AMAZ-5RAVRV5\Administrator
RunAs User: EC2AMAZ-5RAVRV5\Administrator
Configuration Name: 
Machine: EC2AMAZ-5RAVRV5 (Microsoft Windows NT 10.0.26100.0)
Host Application: powershell.exe -ExecutionPolicy Bypass -File C:\unlv-phase2.ps1
Process ID: 5436
PSVersion: 5.1.26100.33296
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.33296
BuildVersion: 10.0.26100.33296
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
& : The term 'ubuntu.exe' is not recognized as the name of a cmdlet, function, script file, or operable program. Check 
the spelling of the name, or if a path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:5 char:3
+ & ubuntu.exe install --root
+   ~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (ubuntu.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'ubuntu.exe' is not recognized as the name of a cmdlet, function, script file, or
operable program. Check the spelling of the name, or if a path was included, verify that the path
is correct and try again.
At C:\unlv-phase2.ps1:5 char:3
+ & ubuntu.exe install --root
+   ~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (ubuntu.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

There is no distribution with the supplied name.
Error code: Wsl/Service/WSL_E_DISTRO_NOT_FOUND
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of
a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a
path was included, verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], Comm
   andNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

docker engine up: False
**********************
Windows PowerShell transcript end
End time: 20260818084954
**********************
````


## Cell 3 — Windows 11 Pro 24H2 (Azure Standard_D4s_v5, record run 20260818-093352; files keep the run's `azure-cellA3-` label)

### `azure-cellA3-windows.json` (1220 bytes)

record JSON (pass 13/13; source for the Table 1 cell 3 column).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "x86_64",
  "mode": "native",
  "host": {
    "cpu": "INTEL(R) XEON(R) PLATINUM 8573C",
    "cores": 4,
    "ram_gb": 8,
    "os": "Ubuntu 26.04 LTS",
    "docker": "Docker version 29.7.2"
  },
  "digest": "seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6",
  "size_mb": 552,
  "pull_seconds": 53.1,
  "start_to_healthy_seconds": 0.6,
  "warm_start_seconds": 0.5,
  "compile_run_seconds": [
    0.2,
    0.2,
    0.2
  ],
  "gdb": "working",
  "workload": [
    {
      "name": "ast3",
      "build_seconds": 0.2,
      "run_seconds": 0.2,
      "status": "pass"
    },
    {
      "name": "ast04",
      "build_seconds": 0.2,
      "run_seconds": 0.2,
      "status": "pass"
    },
    {
      "name": "ast06",
      "build_seconds": 0.5,
      "run_seconds": 0.2,
      "status": "pass"
    },
    {
      "name": "ast12",
      "build_seconds": 0.6,
      "run_seconds": 0.2,
      "status": "pass"
    }
  ],
  "workload_peak_mem_mib": 90,
  "idle_memory": "56.36MiB",
  "code_server": "4.126.0",
  "tools": "nasm 2.15.05, yasm 1.3.0, gdb 12.1",
  "persistence": "pass",
  "passed": 13,
  "failed": 0
}
````

### `azure-cellA3-windows-run1-no-wsl-integration.json` (1193 bytes)

attempt-1 JSON — anomaly evidence from a failed automation attempt, NOT a result (see RESULTS.md Azure anomalies).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "x86_64",
  "mode": "native",
  "host": {
    "cpu": "INTEL(R) XEON(R) PLATINUM 8573C",
    "cores": 4,
    "ram_gb": 8,
    "os": "Ubuntu 26.04 LTS",
    "docker": "
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.

For details about using Docker Desktop with WSL 2

https://docs.docker.com/go/wsl2/"
  },
  "digest": "
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.

For details about using Docker Desktop with WSL 2, visit:

https://docs.docker.com/go/wsl2/

unknown",
  "size_mb": 00000000,
  "pull_seconds": null,
  "start_to_healthy_seconds": null,
  "warm_start_seconds": null,
  "compile_run_seconds": [null, null, null],
  "gdb": "broken",
  "workload": null,
  "workload_peak_mem_mib": null,
  "idle_memory": "
The
We

For

https://docs.docker.com/go/wsl2/",
  "code_server": "",
  "tools": "nasm 
'docker'
to

about, yasm , gdb ",
  "persistence": "pass",
  "passed": 1,
  "failed": 8
}
````

### `azure-cellA3-windows-runlog.txt` (55314 bytes)

verbatim PowerShell transcript (UTF-8 as written), all four attempts.

````text
﻿**********************
Windows PowerShell transcript start
Start time: 20260818095031
Username: WORKGROUP\SYSTEM
RunAs User: WORKGROUP\SYSTEM
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: powershell -ExecutionPolicy Bypass -File phase1.ps1
Process ID: 4932
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
PHASE1 start 2026-08-18T09:50:31.5010818+00:00

PHASE1 wsl-install 2026-08-18T09:50:32.5069569+00:00

PHASE1 docker-desktop-download 2026-08-18T09:50:32.5820018+00:00
PHASE1 docker-desktop-install 2026-08-18T10:03:22.7767370+00:00
PHASE1 docker-desktop-installed 2026-08-18T10:04:34.3470392+00:00

PHASE1 registering-phase2-and-rebooting 2026-08-18T10:04:34.4147261+00:00
Register-ScheduledTask : The user name or password is incorrect.

At C:\Packages\Plugins\Microsoft.Compute.CustomScriptExtension\1.10.22\Downloads\1\phase1.ps1:93 char:1
+ Register-ScheduledTask -TaskName 'UNLV-Phase2' -Action $Action -Trigg ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : AuthenticationError: (PS_ScheduledTask:Root/Microsoft/...S_ScheduledTask) 
[Register-ScheduledTask], CimException
    + FullyQualifiedErrorId : HRESULT 0x8007052e,Register-ScheduledTask
Register-ScheduledTask : The user name or password is incorrect.

At C:\Packages\Plugins\Microsoft.Compute.CustomScriptExtension\1.10.22\Downloads\1\phase1.ps1:93 char:1
+ Register-ScheduledTask -TaskName 'UNLV-Phase2' -Action $Action -Trigg ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : AuthenticationError: (PS_ScheduledTask:Root/Microsoft/...S_ScheduledTask) [Register-Sche
   duledTask], CimException
    + FullyQualifiedErrorId : HRESULT 0x8007052e,Register-ScheduledTask

**********************
Windows PowerShell transcript end
End time: 20260818100434
**********************
**********************
Windows PowerShell transcript start
Start time: 20260818102840
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File C:\unlv-phase2.ps1
Process ID: 6848
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
PHASE2 start 2026-08-18T10:28:40.7854923+00:00
D o w n l o a d i n g :   U b u n t u 
 
 I n s t a l l i n g :   U b u n t u 
 
 D i s t r i b u t i o n   s u c c e s s f u l l y   i n s t a l l e d .   I t   c a n   b e   l a u n c h e d   v i a   ' w s l . e x e   - d   U b u n t u ' 
 
 
WSL-OK
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-phase2.ps1:13 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

docker engine up: True
PS>TerminatingError(Invoke-WebRequest): "The remote server returned an error: (400) Bad Request."
no coursework workload available
== x86 on x86_64 (native) ==
== 1. Pull ==
  FAIL  pull seancnc/unlv-x86-ide
  size: 00000000 MB  digest:
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.

For details about using Docker Desktop with WSL 2, visit:

https://docs.docker.com/go/wsl2/

unknown
== 2. Cold start to healthy ==
  FAIL  healthy on :8218
== 3. Starter seeding ==
  FAIL  starter hello.asm seeded to host
== 4. Compile and run (3 timed runs) ==
  FAIL  run 1 produced 'Hello, x86!' (got: )
  FAIL  run 2 produced 'Hello, x86!' (got: )
  FAIL  run 3 produced 'Hello, x86!' (got: )
== 5. gdb probe ==
  FAIL  gdb debugs natively (got: )
== 6. Idle resource use ==
  idle memory:
The
We

For

https://docs.docker.com/go/wsl2/
== 7. Tool versions (for the paper's reproducibility table) ==
  code-server ; nasm
'docker'
to

about, yasm , gdb
== 8. Coursework workload (real assignments) ==
  SKIP  no coursework workload for this image/host (code/workloads.tsv absent or kind=cpp)
== 9. Persistence across container replacement (+ warm start) ==
  FAIL  replacement container healthy
  PASS  student files and edits survive container replacement (no re-seed overwrite)
== Cleanup ==
wrote results/x86-x86_64.json

RESULT: 1 passed, 8 failed
total 12
drwxr-xr-x 2 root root 4096 Aug 18 10:39 .
drwx------ 6 root root 4096 Aug 18 10:29 ..
-rw-r--r-- 1 root root 1141 Aug 18 10:39 x86-x86_64.json
PS>TerminatingError(Invoke-WebRequest): "The remote server returned an error: (400) Bad Request."
Invoke-WebRequest : The remote server returned an error: (400) Bad Request.
At C:\unlv-phase2.ps1:30 char:3
+   Invoke-WebRequest -Method PUT -InFile C:\unlv-results.json -Uri 'ht ...
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-WebRequest], 
WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeWebRequestCommand
Invoke-WebRequest : The remote server returned an error: (400) Bad Request.
At C:\unlv-phase2.ps1:30 char:3
+   Invoke-WebRequest -Method PUT -InFile C:\unlv-results.json -Uri 'ht ...
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-WebReques
   t], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeWebRequestCo
   mmand

**********************
Windows PowerShell transcript end
End time: 20260818103931
**********************
**********************
Windows PowerShell transcript start
Start time: 20260818104739
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File C:\unlv-rerun.ps1
Process ID: 6720
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
RERUN-WITH-WORKLOAD start 2026-08-18T10:47:39.4019000+00:00
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
**********************
Windows PowerShell transcript start
Start time: 20260818105312
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File C:\unlv-rerun.ps1
Process ID: 6808
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
RERUN-WITH-WORKLOAD start 2026-08-18T10:53:12.9329705+00:00
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet,
function, script file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFound
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException

& : The term 'C:\Program Files\Docker\resources\bin\docker.exe' is not recognized as the name of a cmdlet, function, 
script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is 
correct and try again.
At C:\unlv-rerun.ps1:9 char:5
+   & $Docker info *> $null
+     ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Program File...\bin\docker.exe:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
**********************
Windows PowerShell transcript start
Start time: 20260818105543
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File C:\unlv-rerun.ps1
Process ID: 6488
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
RERUN3 start 2026-08-18T10:55:43.3509406+00:00
rerun3 docker engine up: True (2026-08-18T10:56:06.7173321+00:00)
Selecting previously unselected package unzip.
(Reading database ...
(Reading database ... 5%
(Reading database ... 10%
(Reading database ... 15%
(Reading database ... 20%
(Reading database ... 25%
(Reading database ... 30%
(Reading database ... 35%
(Reading database ... 40%
(Reading database ... 45%
(Reading database ... 50%
(Reading database ... 55%
(Reading database ... 60%
(Reading database ... 65%
(Reading database ... 70%
(Reading database ... 75%
(Reading database ... 80%
(Reading database ... 85%
(Reading database ... 90%
(Reading database ... 95%
(Reading database ... 100%
(Reading database ... 35923 files and directories currently installed.)
Preparing to unpack .../unzip_6.0-29ubuntu1_amd64.deb ...
Unpacking unzip (6.0-29ubuntu1) ...
Setting up unzip (6.0-29ubuntu1) ...
Processing triggers for man-db (2.13.1-1build1) ...
wsl : cp: cannot stat 'UNLVDockerIDEs-main/code': No such file or directory
At C:\unlv-rerun.ps1:21 char:3
+   wsl -d Ubuntu -u root -- bash -lc "$Cmd" 2>&1 | Write-Output
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (cp: cannot stat...le or directory:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError

total 12
drwxr-xr-x 2 root root 4096 Aug 18 10:39 .
drwx------ 8 root root 4096 Aug 18 10:56 ..
-rw-r--r-- 1 root root 1141 Aug 18 10:39 x86-x86_64.json
rerun3 results2 written: True
RERUN3 done 2026-08-18T10:56:22.7671423+00:00 - VM left running for retrieval
**********************
Windows PowerShell transcript end
End time: 20260818105622
**********************
**********************
Windows PowerShell transcript start
Start time: 20260818110100
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.EXE -ExecutionPolicy Bypass -File C:\unlv-rerun.ps1
Process ID: 12984
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
RERUN3 start 2026-08-18T11:01:00.9998884+00:00
rerun3 docker engine up: True (2026-08-18T11:01:11.9051874+00:00)
wsl : cp: cannot stat 'UNLVDockerIDEs-main/code': No such file or directory
At C:\unlv-rerun.ps1:21 char:3
+   wsl -d Ubuntu -u root -- bash -lc "$Cmd" 2>&1 | Write-Output
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (cp: cannot stat...le or directory:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError

total 12
drwxr-xr-x 2 root root 4096 Aug 18 10:39 .
drwx------ 8 root root 4096 Aug 18 11:01 ..
-rw-r--r-- 1 root root 1141 Aug 18 10:39 x86-x86_64.json
rerun3 results2 written: True
RERUN3 done 2026-08-18T11:01:13.3279102+00:00 - VM left running for retrieval
**********************
Windows PowerShell transcript end
End time: 20260818110113
**********************
**********************
Windows PowerShell transcript start
Start time: 20260818110701
Username: unlv-windows\unlv
RunAs User: unlv-windows\unlv
Configuration Name: 
Machine: unlv-windows (Microsoft Windows NT 10.0.26100.0)
Host Application: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.EXE -ExecutionPolicy Bypass -File C:\unlv-rerun4.ps1
Process ID: 8380
PSVersion: 5.1.26100.9168
PSEdition: Desktop
PSCompatibleVersions: 1.0, 2.0, 3.0, 4.0, 5.0, 5.1.26100.9168
BuildVersion: 10.0.26100.9168
CLRVersion: 4.0.30319.42000
WSManStackVersion: 3.0
PSRemotingProtocolVersion: 2.3
SerializationVersion: 1.1.0.1
**********************
Transcript started, output file is C:\unlv-run.log
RERUN4 start 2026-08-18T11:07:01.2795789+00:00
rerun4 docker engine up: True (2026-08-18T11:07:01.9166455+00:00)
== x86 on x86_64 (native) ==
== 1. Pull ==
  PASS  pulled seancnc/unlv-x86-ide in 53.1s
  size: 552 MB  digest: seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6
== 2. Cold start to healthy ==
  PASS  healthy on :8218 in 0.6s
== 3. Starter seeding ==
  PASS  starter hello.asm seeded to host
== 4. Compile and run (3 timed runs) ==
  PASS  run 1: 'Hello, x86!' in 0.2s
  PASS  run 2: 'Hello, x86!' in 0.2s
  PASS  run 3: 'Hello, x86!' in 0.2s
== 5. gdb probe ==
  PASS  gdb debugs natively
== 6. Idle resource use ==
  idle memory: 56.36MiB
== 7. Tool versions (for the paper's reproducibility table) ==
  code-server 4.126.0; nasm 2.15.05, yasm 1.3.0, gdb 12.1
== 8. Coursework workload (real assignments) ==
  PASS  workload ast3: build 0.2s, run 0.2s
  PASS  workload ast04: build 0.2s, run 0.2s
  PASS  workload ast06: build 0.5s, run 0.2s
  PASS  workload ast12: build 0.6s, run 0.2s
  peak container memory during workload: 90 MiB
== 9. Persistence across container replacement (+ warm start) ==
  PASS  replacement container healthy (warm start 0.5s)
  PASS  student files and edits survive container replacement (no re-seed overwrite)
== Cleanup ==
wrote results/x86-x86_64.json

RESULT: 13 passed, 0 failed
total 12
drwxr-xr-x 2 root root 4096 Aug 18 10:39 .
drwx------ 9 root root 4096 Aug 18 11:07 ..
-rw-r--r-- 1 root root 1064 Aug 18 11:08 x86-x86_64.json
rerun4 results3 written: True
RERUN4 done 2026-08-18T11:08:09.1602330+00:00
**********************
Windows PowerShell transcript end
End time: 20260818110809
**********************
````


## Cell 4 — macOS arm64 (Apple M1 Pro, Docker Desktop emulation, local run)

### `cell4-macos-arm64.json` (1043 bytes)

record JSON (12 passed, 0 failed; source for the Table 1 cell 4 column).

````json
{
  "image": "seancnc/unlv-x86-ide",
  "kind": "x86",
  "host_arch": "aarch64",
  "mode": "emulated",
  "host": {
    "cpu": "Apple M1 Pro",
    "cores": 8,
    "ram_gb": 16,
    "os": "macOS 26.4",
    "docker": "Docker version 29.2.1"
  },
  "digest": "seancnc/unlv-x86-ide@sha256:1d0b91b3581915c2b6b9926fea9b28130e4a8186bcd22abad90b19f5709ca3b6",
  "size_mb": 552,
  "pull_seconds": 44.7,
  "start_to_healthy_seconds": 4.8,
  "warm_start_seconds": 4.3,
  "compile_run_seconds": [0.4, 0.4, 0.4],
  "gdb": "broken",
  "workload": [{"name": "ast3", "build_seconds": 0.4, "run_seconds": 0.2, "status": "pass"}, {"name": "ast04", "build_seconds": 0.4, "run_seconds": 0.1, "status": "pass"}, {"name": "ast06", "build_seconds": 2.5, "run_seconds": 0.2, "status": "pass"}, {"name": "ast12", "build_seconds": 3.1, "run_seconds": 0.2, "status": "pass"}],
  "workload_peak_mem_mib": 358,
  "idle_memory": "263.1MiB",
  "code_server": "4.126.0",
  "tools": "nasm 2.15.05, yasm 1.3.0, gdb 12.1",
  "persistence": "pass",
  "passed": 12,
  "failed": 0
}
````
