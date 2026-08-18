# Azure Hands-On Runbook — Windows 11 Matrix Cell

Companion to [AWS_RUNBOOK.md](./AWS_RUNBOOK.md) and
[EXPERIMENT_PLAN.md](./EXPERIMENT_PLAN.md). Written from the successful
cell A3 record run (`20260818-093352`, 2026-08-18) — see the cell 3 column
of [RESULTS.md](../record-results/RESULTS.md) for the numbers.
This file carries the **operational knowledge**: why Azure at all, what an
Azure for Students subscription can and cannot launch, every failure mode
we hit on the way to a 13/13 pass, and the remote-operations toolbox that
made a no-inbound-network Windows VM debuggable. Total cost of the whole
adventure: **under $1** of compute.

**Why Azure exists in this project at all:** the Windows cell needs Docker
Desktop on an OS inside its official support matrix (Windows 10/11
client). AWS does not rent client Windows; its Windows Server 2025 proxy
failed three independent ways (see `record-results/EVIDENCE.md`, cell 3 AWS section).
Azure rents real Windows 11 Pro. That is the entire reason.

---

## Phase 0 — Know your subscription before planning anything (~15 min, $0)

**Skills: Azure offer types, SKU restrictions vs quota, `az vm list-skus`.**

Azure gates VM launches with **two independent mechanisms**, and the
distinction cost us an evening to learn:

1. **Quota** — a numeric vCPU cap per VM family per region
   (`az vm list-usage --location <region>`). Hitting it fails a deployment
   with `QuotaExceeded`. Azure for Students ships with a 6-vCPU regional
   cap (PAYG raised ours to 10).
2. **SKU restrictions** — a per-subscription-offer allowlist of which
   families you may launch *at all*, visible only as a `restrictions`
   array with `reasonCode: NotAvailableForSubscription` in
   `az vm list-skus --location <region> --all`. **The quota table lies by
   omission**: our student subscription showed 4 vCPUs of quota for many
   D-series families that the SKU layer blocked in every region. Always
   check both.

What an **Azure for Students** subscription actually launches (verified
empirically 2026-08-18, consistent across all regions checked): only the
burstable **Bsv2 / Basv2 / Bpsv2** families. Every fixed-performance
family we probed (Dsv3/Dsv4/Dsv5, Dpsv5, E, F) was
`NotAvailableForSubscription` — an undocumented offer policy
([Microsoft staff confirm it exists](https://techcommunity.microsoft.com/discussions/microsoft-learn-for-educators/sku-quota-and-policy-restrictions-on-azure-for-students-and-free-subscriptions/4525160)).
Student subscriptions are
[ineligible for quota/family increase requests](https://learn.microsoft.com/en-us/azure/quotas/per-vm-quota-requests);
the documented path is upgrading to Pay-As-You-Go.

**The killer consequence for this project:** all three B-series v2
families officially do **not support nested virtualization**
([Bsv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bsv2-series),
[Basv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/basv2-series),
[Bpsv2](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bpsv2-series)),
and WSL2 — hence Docker Desktop — requires nested virtualization inside an
Azure VM. **A Docker Desktop cell is impossible on the student offer.**
Check this *before* building automation, not after.

Region probe one-liner (finds regions where a size is actually launchable
for *your* subscription):

```bash
az vm list-skus --resource-type virtualMachines --all --output json |
  python3 -c "import json,sys; [print(sorted(s['locations'])) for s in json.load(sys.stdin)
    if s['name']=='Standard_D4s_v5' and not s.get('restrictions')]"
```

New subscriptions also need resource providers registered before any
quota/SKU query returns data (`az vm list-usage` returning `[]` is the
tell): `az provider register` for `Microsoft.Compute`, `Microsoft.Network`,
`Microsoft.Storage`, and `Microsoft.DevTestLab` (the last powers
`az vm auto-shutdown`).

## Phase 1 — Upgrade decision (student → Pay-As-You-Go)

**Skills: Azure offer upgrade, quota requests, budget guardrails.**

Facts gathered before the operator decided (2026-08-18):

- Upgrading unlocks SKU-restricted families and makes quota requests
  possible. Our 4-vCPU Dsv5 request (`az quota create` against
  `standardDSv5Family` in westcentralus) **auto-approved in seconds**.
- **The $100 student credit is almost certainly forfeited by the
  upgrade.** Microsoft documents credit retention only for the $200 free
  account, not for Azure for Students; the offer terms call unused credit
  non-transferable; a Microsoft moderator states credits are "nullified
  automatically" on conversion. Decide with eyes open — though note the
  credit could never have paid for the Windows cell anyway (the SKU
  restriction was the blocker, not money).
- **Licensing:** Windows 11 *client* images on Azure formally require
  [Multitenant Hosting Rights](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/windows-desktop-multitenant-hosting-deployment)
  (Windows 11 E3/E5, M365 E3/E5/A3/A5/Business Premium). The PAYG upgrade
  does not grant them; deploy with `--license-type Windows_Client` (BYOL
  attestation). UNLV students may hold M365 A3/A5 via the university.
  RESULTS.md records the run's licensing posture.
- **Windows-on-ARM is out regardless**: the ARM64 Windows 11 images are
  Preview-only and effectively require Dpsv5-class sizes, and Docker
  Desktop for Windows-on-ARM is still Early Access (Linux containers
  only).

Guardrail set immediately after upgrading (mirrors the AWS $20 budget
philosophy): a **$10/month cost budget** (`unlv-monthly-cap`) with alerts
at 50% actual, 90% actual, 100% forecasted. The `az consumption budget`
CLI command is stale — create it via REST
(`PUT .../providers/Microsoft.Consumption/budgets/<name>?api-version=2023-11-01`).

## Phase 2 — Launch mechanics that differ from AWS

**Skills: `az vm create` hardening, CustomScriptExtension, Azure billing
semantics.**

- `--security-type Standard` is mandatory for the Windows cell: **Trusted
  Launch (the default) blocks nested virtualization.**
- `az vm create` opens RDP 3389 by default — pass `--nsg-rule NONE
  --public-ip-address ""` for a zero-inbound, no-public-IP VM. Everything
  after launch happens through the control plane (see Phase 4).
- **Azure has no terminate-on-shutdown.** A VM that shuts itself down
  from inside the OS keeps billing (state "stopped", not "deallocated"),
  and a *stopped* VM still counts against vCPU quota — deallocate to free
  either. Set `az vm auto-shutdown` (+3 h) as the unattended failsafe and
  delete the run's resource group explicitly when results land.
- **CustomScriptExtension payload limit:** the extension executes
  `commandToExecute` through `cmd.exe`, whose command line caps at 8191
  characters. A ~6 KB script base64-encoded as `-EncodedCommand` is ~16 K
  chars and fails as an opaque "Command execution failed" with the script
  never starting (failure mode #1 of the record run). **Deliver scripts
  as files**: upload to S3/blob, presign a GET, pass it in `fileUris`,
  and keep `commandToExecute` to one short line. The extension also
  reports failure when a script reboots the machine mid-run — cosmetic;
  watch your own logs instead.

## Phase 3 — The four failure modes of unattended Docker Desktop on Windows 11

All four were hit, diagnosed, and fixed live during run `20260818-093352`
(full trail in the cell A3 transcript in `record-results/EVIDENCE.md`). Any
future Windows automation should treat this list as a preflight checklist.

1. **Script delivery** — encoded-command size limit above. Fix:
   `fileUris`.
2. **`wsl --install` silently does nothing under SYSTEM.** Phase 1 ran
   `wsl --install --no-launch -d Ubuntu` as SYSTEM (extension context); it
   returned in one second having installed nothing — same silent no-op
   that killed the AWS Server attempt. Also, `wsl --status` under SYSTEM
   reports `WSL_E_LOCAL_SYSTEM_NOT_SUPPORTED` even when WSL is fine —
   don't misread it. Fix: enable the two optional features via DISM
   (`VirtualMachinePlatform`, `Microsoft-Windows-Subsystem-Linux`),
   install the **WSL MSI from the GitHub releases**
   (`microsoft/WSL`, `wsl.<ver>.x64.msi`, `msiexec /i /quiet`) — that
   works system-wide from SYSTEM — then register the distro **as the
   interactive user** with `wsl --install -d Ubuntu --no-launch
   --web-download` (distro registration is per-user).
3. **Wrong docker CLI path gives a false "engine up".** The CLI lives at
   `C:\Program Files\Docker\Docker\resources\bin\docker.exe` (two
   `Docker` segments). With the wrong path, `& $Docker info` throws
   CommandNotFound, which *does not set* `$LASTEXITCODE` — a preceding
   successful native command leaves it 0 and the engine probe passes
   vacuously. Guard with `Test-Path $Docker` before invoking, and treat a
   "suite finished implausibly fast" as this bug until proven otherwise.
4. **Docker Desktop's WSL integration is per-distro and may be off.**
   With the engine genuinely up on the Windows side, `docker` inside the
   Ubuntu distro was still the "enable integration in Docker Desktop
   settings" stub, so every suite docker call failed fast (a ~1.2 KB JSON
   full of nulls with the stub's message baked into a string field is the
   signature). Fix before first engine start: in
   `%APPDATA%\Docker\settings-store.json` set
   `EnableIntegrationWithDefaultWslDistro: true` and add the distro to
   `IntegratedWslDistros`; restart Docker Desktop if it already started.

Two scheduling gotchas around the same run:

- `Register-ScheduledTask -User <u> -Password <pw>` failed with
  `0x8007052e` (logon failure) when the password had been set via
  `net user` with a `GeneratePassword()` string — special characters can
  be mangled between the two. Reset the password with `Set-LocalUser`
  (SecureString, no shell parsing) to a known value first, or avoid
  passwords entirely.
- **The reliable pattern for running something in the interactive
  session:** `schtasks /create /SC ONCE /IT /RL HIGHEST /RU <user>
  /RP <pw> /ST <now+2min>` — `/IT` runs it on the *interactive token* of
  the logged-on (autologon) user, which is exactly what Docker Desktop
  needs. HKLM `RunOnce` also works at logon but is consumed even when the
  launched process dies instantly, and it leaves no diagnostics — the
  scheduled task is observable (`schtasks /query`, `Get-ScheduledTaskInfo`).

## Phase 4 — Operating a no-inbound Windows VM through the control plane

**Skills: `az vm run-command`, file exfiltration without network paths.**

The VM had no public IP and no inbound rules by design; `az vm
run-command invoke` (SYSTEM context, one at a time per VM) was the entire
ops channel. Patterns that worked:

- **Pass scripts as files** (`--scripts @file.ps1`), never inline — shell
  quoting of `$`, backticks, and `\"` across bash→az→PowerShell mangles
  inline scripts in ways that surface as PowerShell parse errors on the
  VM.
- **Output is capped (~4 KB per stream) and can carry control
  characters** that break strict JSON parsing of the az response — parse
  leniently (regex the `message` fields) and never ship large data as
  plain text.
- **File exfiltration recipe** (used for the result JSON and the 55 KB
  run log): on the VM, gzip the file and emit
  `[Convert]::ToBase64String` between sentinel markers; if the base64
  exceeds the cap, write the gzip to disk and pull it in ~2 KB
  byte-range chunks across successive run-commands
  (`scripts/`… see `fetch-file.sh` pattern in the session scratchpad; a
  future cleanup could commit a tools/ version).
- Check encodings before "fixing" them: the run's transcript turned out
  to be UTF-8 (with BOM) already — a reflexive `iconv -f UTF-16LE` pass
  produced mojibake that briefly contaminated the archive (caught in
  review, fixed in commit `44b84c4`). `file` and a hexdump of the first
  bytes beat assumptions; PowerShell's transcript/`Out-File` encodings
  vary by version and host.

## Phase 5 — The presigned-URL checksum trap (cross-cloud plumbing)

Every VM→S3 upload and the S3 workload download failed with **HTTP 400
Bad Request** mid-run. Cause: current boto3/aws-cli defaults attach
integrity-checksum parameters to presigned URLs that plain HTTP clients
(`curl -T`, `Invoke-WebRequest -Method PUT`) never satisfy. Fix — set
when *generating* the URLs:

```bash
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required
export AWS_RESPONSE_CHECKSUM_VALIDATION=when_required
```

and smoke-test every presigned URL with
`curl -sf -o /dev/null -w "%{http_code}"` **before** baking it into VM
provisioning. `scripts/azure-matrix.sh` now sets these. (This also
explains why the same scripts worked in earlier AWS runs with an older
boto3.)

## Phase 6 — Teardown discipline

Executed and verified at the end of the record run (operator's standing
order: no idle cloud resources, hard 2-hour kill on the run):

1. Retrieve evidence **before** teardown (Phase 4 recipes) — the VM's
   own uploads may be broken and the disk dies with the resource group.
2. `az group delete --yes` on the run's resource group (kills VM, disk,
   NIC in one call — this is why everything lives in one fresh group per
   run).
3. Azure auto-creates **NetworkWatcherRG** on first VM launch in a
   region — zero cost, but delete it for a true zero-resource state.
4. Verify, don't assume: `az group list` must return `[]`;
   `aws s3api head-bucket` must 404 if the bucket was ordered gone.
5. A dead-man watchdog (status every 15 min, hard teardown at deadline)
   ran locally through the whole run. Caveat learned: it dies with the
   terminal session — the Azure-side `az vm auto-shutdown` (+3 h,
   deallocates) and the budget alerts are the layers that survive a
   closed laptop.

## What this cost and what it proved

- Compute: ~1.8 h of Standard_D4s_v5 plus disk pennies — **well under $1**
  (final figure in RESULTS.md provenance once billing posts).
- Proved: the platform matrix's Windows 11 verdict (cell A3, 13/13) on
  Docker Desktop's actually-supported OS — the cell no CI vendor rents:
  hosted Windows runners are Server without nested virtualization, which
  is precisely why a classroom Docker-on-Windows story needs measuring on
  client Windows at all.
