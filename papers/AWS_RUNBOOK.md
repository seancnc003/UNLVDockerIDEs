# AWS Hands-On Runbook — Platform-Matrix Experiment

Companion to [EXPERIMENT_PLAN.md](./EXPERIMENT_PLAN.md). You provision and
operate every AWS resource yourself — console first, then CLI — so the
project doubles as AWS training. The **measurement** stays scripted
(`scripts/ci-test.sh`) so the paper's numbers are reproducible; the
**provisioning** is yours. Total cost target: **under $5**; total hands-on
time: **≈ 5–6 hours across five sessions**.

Each phase names the AWS skills it teaches — these become resume bullets
(see the end).

---

## Phase 0 — Account foundations (~30 min, $0)

**Skills: IAM identities, MFA, AWS Budgets, billing alarms.**

1. If you're signing in as the root user: create an IAM user for yourself
   (console → IAM → Users → Create) with `AdministratorAccess`, enable MFA
   on both root and the IAM user, and use the IAM user from now on. Root is
   for break-glass only — this is the first thing any AWS reviewer checks.
2. Billing console → Budgets → create a **$10 monthly budget** with email
   alerts at 50/80/100%. This is your safety net for the whole project.
3. Install/verify the AWS CLI: `aws --version` (want v2), then
   `aws configure` with an access key for your IAM user, default region
   `us-east-1`. Verify: `aws sts get-caller-identity`.

**Checkpoint:** `get-caller-identity` shows your IAM user, not root.

---

## Phase 1 — Storage and permissions (~45 min, $0)

**Skills: S3, IAM roles vs. users, trust policies, least privilege,
instance profiles.**

1. Console → S3 → create bucket `unlv-ide-results-<your-account-id>`
   (block all public access — the default — stays ON).
2. Console → IAM → Roles → Create role → trusted entity **EC2**. Attach no
   managed policy; instead add this inline policy (name it
   `s3-results-write`) — note it can *only* read and write objects, *only*
   in your bucket (GetObject is there so instances can download the private
   coursework workload uploaded in step 5 — a deliberate, named extension of
   the minimal policy, which is itself the least-privilege lesson):
   ```json
   {"Version": "2012-10-17",
    "Statement": [{"Effect": "Allow",
                   "Action": ["s3:PutObject", "s3:GetObject"],
                   "Resource": "arn:aws:s3:::unlv-ide-results-<ACCOUNT>/*"}]}
   ```
   Name the role `unlv-ide-writer`. Understand what you built: a **role** is
   an identity a *machine* assumes (via the instance profile the console
   creates alongside it); your access key is a *user* credential. Instances
   never hold long-lived keys — that's the pattern interviewers ask about.
3. Console → EC2 → Key Pairs → create `unlv-key` (ED25519, .pem), and
   `chmod 400 ~/Downloads/unlv-key.pem`.
4. Console → EC2 → Security Groups → create `unlv-ssh-rdp`: inbound SSH
   (22) and RDP (3389) **from My IP only**; outbound all. Never 0.0.0.0/0
   on these ports.
5. Upload the coursework workload once, from your Mac at the repo root
   (`code/` is gitignored course material, so it travels privately via S3,
   never via GitHub):
   ```bash
   zip -r code.zip code
   aws s3 cp code.zip s3://unlv-ide-results-<ACCOUNT>/workload/code.zip
   ```

**Checkpoint:** role exists with the single-statement policy; SG rules show
your /32 address; `workload/code.zip` is in the bucket.

---

## Phase 2 — Linux amd64 cell, via console (~1 h, ≈ $0.15)

**Skills: EC2 launch, AMI selection, instance types, SSH, instance
metadata/roles in action.**

1. Console → EC2 → Launch instance:
   - Name `unlv-linux-amd64` · AMI: **Ubuntu Server 24.04 LTS (64-bit x86)**
   - Type `m8i.large` · Key pair `unlv-key` · SG `unlv-ssh-rdp`
   - Advanced → IAM instance profile: `unlv-ide-writer`
2. SSH in: `ssh -i ~/Downloads/unlv-key.pem ubuntu@<public-ip>`
3. Do the cell by hand, watching each step:
   ```bash
   sudo apt-get update && sudo apt-get install -y docker.io awscli unzip
   sudo usermod -aG docker ubuntu && exit   # re-SSH so group applies
   curl -fsSL https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main/scripts/ci-test.sh -o ci-test.sh
   mkdir -p scripts && mv ci-test.sh scripts/
   aws s3 cp s3://unlv-ide-results-<ACCOUNT>/workload/code.zip . && unzip -o code.zip   # coursework workload → ./code/
   bash scripts/ci-test.sh cpp && bash scripts/ci-test.sh x86
   cat results/*.json          # your first two matrix rows
   aws s3 cp results/ s3://unlv-ide-results-<ACCOUNT>/manual/linux-amd64/ --recursive
   ```
   Note the upload needed **no credentials** — the instance assumed your
   role. That's the Phase-1 lesson paying off.
4. Also record host specs for the paper: `lscpu | head`, `free -h`,
   `docker --version`, Ubuntu version.
5. Console → terminate the instance. Verify state becomes `terminated`.

**Expected result:** all PASS; gdb `working` (native-amd64 cell); all four
coursework workloads (ast3/ast04/ast06/ast12) build and run with timings in
the JSON.

---

## Phase 3 — Linux arm64 (Graviton) cell, via CLI (~45 min, ≈ $0.10)

**Skills: AWS CLI EC2 operations, CPU architectures, Graviton, QEMU/binfmt
emulation.**

Same cell, but launched entirely from your terminal — no console:

```bash
AMI=$(aws ssm get-parameter --name /aws/service/canonical/ubuntu/server/24.04/stable/current/arm64/hvm/ebs-gp3/ami-id --query Parameter.Value --output text)
aws ec2 run-instances --image-id "$AMI" --instance-type m8g.large \
  --key-name unlv-key --security-groups unlv-ssh-rdp \
  --iam-instance-profile Name=unlv-ide-writer \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=unlv-linux-arm64}]'
aws ec2 describe-instances --filters Name=tag:Name,Values=unlv-linux-arm64 \
  --query 'Reservations[].Instances[].[State.Name,PublicIpAddress]' --output table
```

SSH in and repeat Phase 2's steps, with one addition before testing —
register the emulation layer, and understand it: the x86 image is
amd64-only, this CPU is ARM, so Linux needs QEMU binfmt handlers to run it
(the same situation an Apple Silicon student is in):

```bash
sudo apt-get install -y qemu-user-static binfmt-support
```

Upload to `.../manual/linux-arm64/`, terminate via CLI:

```bash
aws ec2 terminate-instances --instance-ids <id>
```

**Expected result:** cpp all PASS natively; x86 assembles and runs under
emulation but **gdb reports `broken`** — you just reproduced the paper's
emulation-boundary finding on hardware you provisioned yourself. The
coursework workloads run under QEMU and are recorded rather than failed;
ast12 (multithreaded pthread + assembly) is the sharpest emulation-fidelity
probe, so compare its timings and status against cell 1's.

---

## Phase 4 — Windows cell, via CLI + RDP (~1.5–2 h, ≈ $1)

**Skills: Windows on EC2, nested virtualization, RDP, WSL2, Docker Desktop.**

1. Launch — note the one flag that makes this possible (Feb 2026 feature),
   and that it must be set **at launch**:
   ```bash
   AMI=$(aws ssm get-parameter --name /aws/service/ami-windows-latest/Windows_Server-2025-English-Full-Base --query Parameter.Value --output text)
   aws ec2 run-instances --image-id "$AMI" --instance-type m8i.xlarge \
     --cpu-options 'NestedVirtualization=enabled' \
     --key-name unlv-key --security-groups unlv-ssh-rdp \
     --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=60,VolumeType=gp3,DeleteOnTermination=true}' \
     --iam-instance-profile Name=unlv-ide-writer \
     --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=unlv-windows}]'
   ```
2. Wait ~4 min, then get the Administrator password (uses your key to
   decrypt — another role-of-keys lesson):
   ```bash
   aws ec2 get-password-data --instance-id <id> --priv-launch-key ~/Downloads/unlv-key.pem
   ```
3. RDP to the public IP (Windows App on macOS), log in as Administrator.
4. On the instance, in an admin PowerShell — you're doing what a student's
   setup guide does, on a server:
   ```powershell
   wsl --install -d Ubuntu     # then reboot when prompted, RDP back in
   ```
   Download and install Docker Desktop (WSL2 backend) from docker.com,
   launch it, wait for the engine ("Docker Desktop is running").
5. Fetch the coursework workload: in PowerShell,
   `Read-S3Object -BucketName unlv-ide-results-<ACCOUNT> -Key workload/code.zip -File C:\code.zip`
   (AWS Tools are preinstalled; the instance role authorizes the read).
6. Open the Ubuntu (WSL) terminal and run the same commands as Phase 2
   (Docker Desktop provides `docker` inside WSL; curl `ci-test.sh` into
   `~/scripts/`, then unpack the workload beside it before running):
   ```bash
   sudo apt-get update && sudo apt-get install -y unzip
   cp /mnt/c/code.zip ~ && cd ~ && unzip -o code.zip
   bash scripts/ci-test.sh cpp && bash scripts/ci-test.sh x86
   ```
7. Upload from PowerShell using the preinstalled AWS tools:
   ```powershell
   Write-S3Object -BucketName unlv-ide-results-<ACCOUNT> -KeyPrefix manual/windows -Folder \\wsl$\Ubuntu\home\<your-wsl-user>\results
   ```
8. Record: Windows build (`winver`), Docker Desktop version, instance type.
9. **Terminate via CLI and confirm.** This is the expensive instance
   (~$0.40/h): `aws ec2 terminate-instances --instance-ids <id>`

**Expected result:** all PASS; gdb `working` — your second native-amd64
data point, this time under Docker Desktop/WSL2.

---

## Phase 5 — Teardown and cost autopsy (~30 min, $0)

**Skills: cost management, resource hygiene.**

1. Verify nothing is running: `aws ec2 describe-instances --query
   'Reservations[].Instances[].[InstanceId,State.Name]' --output table` —
   everything `terminated`. Check EBS volumes list is empty (all were
   DeleteOnTermination).
2. Download all results locally:
   `aws s3 cp s3://unlv-ide-results-<ACCOUNT>/manual/ results-aws/ --recursive`
3. Next day: Billing → Cost Explorer. Find the run's actual cost by
   service. Screenshot it — a real cost breakdown you can discuss is
   itself resume material.
4. Local cell (cell 4): run `bash scripts/ci-test.sh cpp && bash
   scripts/ci-test.sh x86` on the 14" M1 Pro/16 GB MacBook, keep the JSONs.

---

## Capstone (optional but recommended) — automate what you just did

`scripts/aws-matrix.sh` performs Phases 2–4 unattended (user-data instead
of SSH/RDP, S3 polling, self-termination). Read it top to bottom — you now
know what every line does because you did each step manually — run it once,
and diff its results against yours. "Did it by hand, then automated it" is
the complete arc.

## Resume bullets this earns (honest phrasing)

- Designed and executed a cross-platform benchmark of containerized course
  environments across AWS EC2 (x86 and ARM/Graviton Linux, Windows Server
  with nested virtualization/WSL2) and Apple Silicon hardware.
- Provisioned infrastructure with least-privilege IAM roles and instance
  profiles, locked-down security groups, and S3 result storage; operated
  entirely within a monitored AWS budget.
- Automated the full experiment (EC2 user-data provisioning, S3 result
  collection, self-terminating instances) after validating each environment
  manually; published the suite as open source.
- Reproduced and documented a cross-architecture debugger limitation
  (ptrace under x86-on-ARM emulation) across QEMU and Docker Desktop
  emulation layers.
