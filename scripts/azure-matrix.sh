#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — Azure platform matrix: all three cloud cells, one command.
#
#   cell           size              OS                          x86 image runs
#   linux-amd64    Standard_B2s_v2   Ubuntu 24.04                native
#   linux-arm64    Standard_B2ps_v2  Ubuntu 24.04 (Ampere/ARM)   emulated (QEMU binfmt)
#   windows        Standard_B4s_v2   Windows 11 Pro 24H2         native (Docker Desktop/WSL2)
#
# Sizes are fitted to an Azure for Students subscription, which restricts
# nearly every fixed-performance family (D/E/F-series show reasonCode
# NotAvailableForSubscription in `az vm list-skus`) — only the burstable
# B-series v2 families (Bsv2/Basv2/Bpsv2, quota 10 each) are launchable.
# All three cells therefore run on burstable CPUs: note this caveat against
# the fixed-performance AWS cells when reading timings. Region default is
# westcentralus — one of the few regions offering the x86 AND ARM Bv2 sizes
# unrestricted (also viable: swedencentral, eastasia).
# The 6-vCPU regional cap forces two phases: Windows (4) + Linux x86 (2)
# launch together; when the Linux x86 JSON lands that VM is DEALLOCATED (a
# stopped VM still counts against quota) and the ARM cell (2) launches.
#
# Azure counterpart of scripts/aws-matrix.sh. Two things are better here, one
# is worse:
#   + The Windows cell runs REAL Windows 11 Pro (Azure may rent client
#     Windows; AWS may not), so Docker Desktop is on its supported OS — no
#     Windows Server proxy. Requires --security-type Standard (Trusted Launch
#     blocks the nested virtualization WSL2 needs).
#   + VMs carry no cloud credentials at all: results upload via pre-signed
#     S3 PUT URLs (generated locally with boto3, 6 h expiry) into the SAME
#     results bucket the AWS matrix uses, so the polling/recording flow is
#     identical. Workload comes in via a pre-signed GET.
#   - Azure has no terminate-on-shutdown: a VM stopped from inside the OS
#     still bills. Cleanup is therefore explicit (resource-group delete when
#     results land) with a per-VM scheduled auto-shutdown (+3 h, deallocates)
#     as the unattended failsafe. Everything lives in one fresh resource
#     group per run, so one delete removes it all.
#
# Prereqs: az CLI logged in (az login) with a subscription; aws CLI with
# credentials (for the presigned URLs against the results bucket); boto3.
# Windows 11 client images require eligible licensing (edu/dev-test rights).
#
# Usage: scripts/azure-matrix.sh [azure-region]   (default westus3)
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

# Fixes from the cell A3 record run (20260818-093352) are folded into this
# script and azure-windows-phase1.ps1 — see papers/AZURE_RUNBOOK.md and the
# anomalies bullet in record-results/RESULTS.md for what happened live.
#
# Presigned URLs must be curl-able from credential-less VMs: current
# boto3/aws-cli defaults attach integrity-checksum params that plain HTTP
# clients never send, so PUTs/GETs fail with 400 (this silently killed the
# record run's upload path). when_required restores classic URLs.
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required
export AWS_RESPONSE_CHECKSUM_VALIDATION=when_required

LOCATION="${1:-westcentralus}"
RUN_ID="$(date -u +%Y%m%d-%H%M%S)"
RG="unlv-ide-matrix-$RUN_ID"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="unlv-ide-ci-results-$ACCOUNT"
PREFIX="azure-matrix/$RUN_ID"
RAW_BASE=https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main

echo "== Results bucket + workload (idempotent, shared with the AWS matrix) =="
aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null || aws s3 mb "s3://$BUCKET" --region us-east-1
if [ -d code ] && ! aws s3 ls "s3://$BUCKET/workload/code.zip" >/dev/null 2>&1; then
  (cd "$(mktemp -d)" && cp -R "$OLDPWD/code" code && zip -qr code.zip code && \
   aws s3 cp code.zip "s3://$BUCKET/workload/code.zip")
fi

presign_put() { # key -> 6h presigned PUT url
  python3 - "$BUCKET" "$1" <<'EOF'
import sys, boto3
print(boto3.client('s3', region_name='us-east-1').generate_presigned_url(
  'put_object', Params={'Bucket': sys.argv[1], 'Key': sys.argv[2]}, ExpiresIn=21600))
EOF
}
CODE_GET="$(aws s3 presign "s3://$BUCKET/workload/code.zip" --expires-in 21600)"
# Smoke-test every presigned URL before baking it into VM provisioning —
# a 400 here is the checksum trap above; a 404 means no workload uploaded.
if aws s3 ls "s3://$BUCKET/workload/code.zip" >/dev/null 2>&1; then
  curl -sf -o /dev/null "$CODE_GET" || { echo "FATAL: presigned CODE_GET failed smoke test"; exit 1; }
fi

echo "== Resource group $RG ($LOCATION) =="
az group create --name "$RG" --location "$LOCATION" --output none

linux_customdata() { # cell-name json-filename
  local JSON_PUT LOG_PUT
  JSON_PUT="$(presign_put "$PREFIX/$1/$2")"
  LOG_PUT="$(presign_put "$PREFIX/$1/run.log")"
  cat <<EOF
#!/bin/bash
exec > /var/log/unlv-run.log 2>&1
set -x
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io curl unzip
[ "\$(uname -m)" = aarch64 ] && apt-get install -y -qq qemu-user-static binfmt-support
systemctl start docker
mkdir -p /root/scripts
curl -fsSL $RAW_BASE/scripts/ci-test.sh -o /root/scripts/ci-test.sh
cd /root
if curl -fsSL '$CODE_GET' -o /root/code.zip; then
  unzip -o /root/code.zip -d /root
fi
bash scripts/ci-test.sh x86
[ -f /root/results/$2 ] && curl -sf -X PUT -T /root/results/$2 '$JSON_PUT'
curl -sf -X PUT -T /var/log/unlv-run.log '$LOG_PUT'
shutdown -h now
EOF
}

launch_linux() { # cell-name size image json-filename
  local UD; UD="$(mktemp)"
  linux_customdata "$1" "$4" > "$UD"
  az vm create --resource-group "$RG" --name "unlv-$1" \
    --image "$3" --size "$2" \
    --admin-username unlv --generate-ssh-keys \
    --nsg-rule NONE --public-ip-address "" \
    --custom-data "$UD" --output none
  rm -f "$UD"
  az vm auto-shutdown --resource-group "$RG" --name "unlv-$1" \
    --time "$(date -u -v+3H +%H%M 2>/dev/null || date -u -d '+3 hours' +%H%M)" --output none
  echo "unlv-$1 launched"
}

# Cell selection: RUN_WINDOWS / RUN_LINUX (default both). On the student
# offer the Windows cell is expected to fail — Bsv2/Basv2 (the only
# launchable 4-vCPU families there) do NOT support the nested virtualization
# WSL2 needs. After a PAYG upgrade set WIN_SIZE=Standard_D4s_v5 (needs Dsv5
# quota) for the originally spec'd fixed-performance size. Windows 11 client
# images require Multitenant Hosting Rights licensing (e.g. M365 A3/A5).
RUN_WINDOWS="${RUN_WINDOWS:-1}"
RUN_LINUX="${RUN_LINUX:-1}"
WIN_SIZE="${WIN_SIZE:-Standard_B4s_v2}"
EXPECT=0
[ "$RUN_WINDOWS" = "1" ] && EXPECT=$((EXPECT+1))
[ "$RUN_LINUX" = "1" ] && EXPECT=$((EXPECT+2))
if [ "$RUN_WINDOWS" = "1" ]; then

echo "== Windows 11 cell ($WIN_SIZE) =="
WIN_PW="Uv$(openssl rand -hex 14)!"
az vm create --resource-group "$RG" --name unlv-windows \
  --image MicrosoftWindowsDesktop:windows-11:win11-24h2-pro:latest \
  --size "$WIN_SIZE" --security-type Standard --license-type Windows_Client \
  --admin-username unlv --admin-password "$WIN_PW" \
  --nsg-rule NONE --public-ip-address "" --output none
az vm auto-shutdown --resource-group "$RG" --name unlv-windows \
  --time "$(date -u -v+3H +%H%M 2>/dev/null || date -u -d '+3 hours' +%H%M)" --output none

# Render phase 1 (python, not sed: presigned URLs contain '&').
WIN_PS1="$(mktemp)"
python3 - "$WIN_PS1" \
  "$(presign_put "$PREFIX/windows/x86-x86_64.json")" \
  "$(presign_put "$PREFIX/windows/run.log")" \
  "$(presign_put "$PREFIX/windows/live.log")" \
  "$CODE_GET" "$RAW_BASE" <<'EOF'
import sys
out, json_put, log_put, live_put, code_get, raw_base = sys.argv[1:7]
src = open('scripts/azure-windows-phase1.ps1').read()
src = (src.replace('__JSON_PUT__', json_put).replace('__LOG_PUT__', log_put)
          .replace('__LIVE_PUT__', live_put).replace('__CODE_GET__', code_get)
          .replace('__RAW_BASE__', raw_base))
open(out, 'w').write(src)
EOF
# Deliver the script via fileUris (presigned GET), not -EncodedCommand: the
# extension runs commandToExecute through cmd.exe, whose 8191-char limit is
# far exceeded by the ~16K base64 of this script (fails as "Command
# execution failed" with phase 1 never starting).
aws s3 cp "$WIN_PS1" "s3://$BUCKET/$PREFIX/windows/phase1.ps1"
PS1_GET="$(aws s3 presign "s3://$BUCKET/$PREFIX/windows/phase1.ps1" --expires-in 21600)"
az vm extension set --resource-group "$RG" --vm-name unlv-windows \
  --name CustomScriptExtension --publisher Microsoft.Compute --version 1.10 \
  --settings "$(python3 -c "
import json, sys
print(json.dumps({'fileUris': [sys.argv[1]],
  'commandToExecute': 'powershell -ExecutionPolicy Bypass -File phase1.ps1'}))" "$PS1_GET")" \
  --no-wait --output none
rm -f "$WIN_PS1"
echo "unlv-windows launched (extension dispatched; phase 1 reboots the VM, so the extension may report failure — that is cosmetic, watch live.log instead)"
echo "run prefix: s3://$BUCKET/$PREFIX/"

if [ "$RUN_LINUX" = "1" ]; then
launch_linux linux-amd64 Standard_B2s_v2 Canonical:ubuntu-24_04-lts:server:latest x86-x86_64.json

echo "== Phase B: wait for linux-amd64 JSON, free its quota, launch linux-arm64 =="
AMD64_DEADLINE=$((SECONDS + 2700))
while [ $SECONDS -lt $AMD64_DEADLINE ]; do
  aws s3 ls "s3://$BUCKET/$PREFIX/linux-amd64/x86-x86_64.json" >/dev/null 2>&1 && break
  echo "  $(date -u +%H:%M:%SZ)  waiting for linux-amd64 result"
  sleep 60
done
aws s3 ls "s3://$BUCKET/$PREFIX/linux-amd64/x86-x86_64.json" >/dev/null 2>&1 \
  || echo "WARNING: linux-amd64 JSON not seen after 45 min; deallocating it anyway to free quota"
az vm deallocate --resource-group "$RG" --name unlv-linux-amd64 --output none
launch_linux linux-arm64 Standard_B2ps_v2 Canonical:ubuntu-24_04-lts:server-arm64:latest x86-aarch64.json
fi

else

echo "== Windows cell skipped (RUN_WINDOWS=0) =="
if [ "$RUN_LINUX" = "1" ]; then
launch_linux linux-amd64 Standard_B2s_v2  Canonical:ubuntu-24_04-lts:server:latest       x86-x86_64.json
launch_linux linux-arm64 Standard_B2ps_v2 Canonical:ubuntu-24_04-lts:server-arm64:latest x86-aarch64.json
fi
echo "run prefix: s3://$BUCKET/$PREFIX/"

fi

echo "== Waiting for $EXPECT result JSONs (Linux ~10 min, Windows 60-90 min; 3h cap) =="
DEADLINE=$((SECONDS + 10800))
while [ $SECONDS -lt $DEADLINE ]; do
  N="$(aws s3 ls "s3://$BUCKET/$PREFIX/" --recursive 2>/dev/null | grep -c '\.json' || true)"
  STATES="$(az vm list --resource-group "$RG" --show-details --query '[].powerState' --output tsv 2>/dev/null | tr '\n' ' ' || echo unknown)"
  echo "  $(date -u +%H:%M:%SZ)  jsons: ${N:-0}/$EXPECT  vms: $STATES"
  [ "${N:-0}" -ge "$EXPECT" ] && break
  sleep 60
done

# No exit trap (a signal-fired terminate once killed a healthy cell);
# explicit cleanup here, auto-shutdown covers a killed driver until the
# resource group is deleted by hand.
echo "== Deleting resource group $RG (all VMs, disks, NICs) =="
az group delete --name "$RG" --yes --no-wait

echo "== Download results =="
mkdir -p results-azure
aws s3 cp "s3://$BUCKET/$PREFIX/" results-azure/ --recursive || true
find results-azure -type f | sort
J="$(find results-azure -name '*.json' | wc -l | tr -d ' ')"
[ "$J" -ge "$EXPECT" ] && echo "RESULT: all $EXPECT Azure cells complete" \
  || { echo "RESULT: incomplete ($J/$EXPECT JSONs) — see run.log/live.log per cell"; exit 1; }
