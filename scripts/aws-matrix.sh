#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — AWS platform matrix: all three cloud cells, one command.
#
#   cell           instance     OS                        x86 image runs
#   linux-amd64    m8i.large    Ubuntu 24.04              native
#   linux-arm64    m8g.large    Ubuntu 24.04 (Graviton)   emulated (QEMU binfmt)
#   windows        m8i.xlarge   Windows Server 2025       native (Docker Desktop/WSL2)
#
# All three launch in parallel; each installs Docker, runs scripts/ci-test.sh
# for the x86 image (the experiment's only measured image — the cpp image is
# multi-arch/native everywhere and out of scope), uploads the results JSON +
# a log to S3, and shuts down
# (shutdown behavior = terminate). This driver polls S3, downloads everything
# to results-aws/<cell>/, and terminates any stragglers. The fourth matrix
# cell (Apple Silicon consumer hardware) is run locally — see
# papers/EXPERIMENT_PLAN.md.
#
# Zero-touch: no RDP/SSH, no key pairs, no inbound ports; instances need only
# outbound internet (default VPC/SG). Cost: ≈ $0.60–1.00 per full run
# (Windows ~$0.40/hr dominates; Linux cells ~$0.10/hr each, done in ~15 min).
# Failsafes: per-instance scheduled shutdown, terminate-on-shutdown, and a
# terminate-all in this script's exit trap.
#
# Prereqs: aws CLI v2 with credentials; nested virtualization requires a CLI
# recent enough to know the NestedVirtualization CpuOption (Feb 2026 feature —
# `aws ec2 run-instances help | grep -i nested` to confirm, upgrade if absent).
#
# Usage: scripts/aws-matrix.sh [region]   (default us-east-1)
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${1:-us-east-1}"
RUN_ID="$(date -u +%Y%m%d-%H%M%S)"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="unlv-ide-ci-results-$ACCOUNT"
PREFIX="matrix/$RUN_ID"
ROLE=unlv-ide-ci-s3-writer
RAW_BASE=https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main
AMI_WIN=/aws/service/ami-windows-latest/Windows_Server-2025-English-Full-Base
AMI_UBUNTU_AMD64=/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id
AMI_UBUNTU_ARM64=/aws/service/canonical/ubuntu/server/24.04/stable/current/arm64/hvm/ebs-gp3/ami-id

echo "== Results bucket (idempotent) =="
aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null || \
  aws s3 mb "s3://$BUCKET" --region "$REGION"

# Coursework workload (gitignored course material — travels via S3, not git).
# Uploaded fresh when present locally; cells fetch it and ci-test.sh skips
# the workload stage cleanly if this upload never happened.
if [ -d code ]; then
  echo "== Uploading coursework workload =="
  (cd "$(mktemp -d)" && cp -R "$OLDPWD/code" code && zip -qr code.zip code && \
   aws s3 cp code.zip "s3://$BUCKET/workload/code.zip" --region "$REGION")
fi

echo "== IAM role + instance profile (idempotent, object read/write on this bucket only) =="
if ! aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
  aws iam create-role --role-name "$ROLE" --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Allow", "Principal": {"Service": "ec2.amazonaws.com"}, "Action": "sts:AssumeRole"}]
  }' >/dev/null
  aws iam put-role-policy --role-name "$ROLE" --policy-name s3-results-write \
    --policy-document "{
      \"Version\": \"2012-10-17\",
      \"Statement\": [{\"Effect\": \"Allow\", \"Action\": [\"s3:PutObject\", \"s3:GetObject\"], \"Resource\": \"arn:aws:s3:::$BUCKET/*\"}]
    }"
  aws iam create-instance-profile --instance-profile-name "$ROLE" >/dev/null
  aws iam add-role-to-instance-profile --instance-profile-name "$ROLE" --role-name "$ROLE"
  sleep 10  # instance-profile propagation
fi

ami() { aws ssm get-parameter --region "$REGION" --name "$1" --query Parameter.Value --output text; }

linux_userdata() { # cell-name
  cat <<EOF
#!/bin/bash
shutdown -h +100 "UNLV cell failsafe"
exec > /var/log/unlv-run.log 2>&1
set -x
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io curl unzip
# Ubuntu 24.04 dropped the awscli apt package — use the official AWS CLI v2 installer
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-\$(uname -m).zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp && /tmp/aws/install
# arm64 cell: register QEMU binfmt handlers so the amd64-only x86 image runs
# under emulation — the same situation an ARM-host student is in.
[ "\$(uname -m)" = aarch64 ] && apt-get install -y -qq qemu-user-static binfmt-support
systemctl start docker
mkdir -p /root/scripts
curl -fsSL $RAW_BASE/scripts/ci-test.sh -o /root/scripts/ci-test.sh
cd /root
# Coursework workload (private, optional): fetch if the runbook's Phase-1
# upload exists; ci-test.sh skips the stage cleanly when code/ is absent.
if aws s3 cp "s3://$BUCKET/workload/code.zip" /root/code.zip --region $REGION 2>/dev/null; then
  unzip -o /root/code.zip -d /root
fi
bash scripts/ci-test.sh x86
aws s3 cp /root/results/ "s3://$BUCKET/$PREFIX/$1/" --recursive --region $REGION
aws s3 cp /var/log/unlv-run.log "s3://$BUCKET/$PREFIX/$1/run.log" --region $REGION
shutdown -h now
EOF
}

launch() { # name ami-id instance-type userdata-file extra-args...
  local NAME="$1" IMG="$2" TYPE="$3" UD="$4"; shift 4
  aws ec2 run-instances --region "$REGION" \
    --image-id "$IMG" --instance-type "$TYPE" \
    --iam-instance-profile "Name=$ROLE" \
    --instance-initiated-shutdown-behavior terminate \
    --user-data "file://$UD" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=unlv-ide-$NAME-$RUN_ID}]" \
    "$@" \
    --query 'Instances[0].InstanceId' --output text
}

echo "== Launch all three cells =="
TMP="$(mktemp -d)"
linux_userdata linux-amd64 > "$TMP/ud-amd64.sh"
linux_userdata linux-arm64 > "$TMP/ud-arm64.sh"
{
  echo '<powershell>'
  sed -e "s|__BUCKET__|$BUCKET|g" -e "s|__PREFIX__|$PREFIX/windows|g" \
      -e "s|__REGION__|$REGION|g" -e "s|__RAW_BASE__|$RAW_BASE|g" \
      scripts/aws-windows-userdata.ps1
  echo '</powershell>'
  echo '<persist>true</persist>'
} > "$TMP/ud-win.ps1"

ID_LAMD="$(launch linux-amd64 "$(ami "$AMI_UBUNTU_AMD64")" m8i.large "$TMP/ud-amd64.sh" \
  --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=20,VolumeType=gp3,DeleteOnTermination=true}')"
ID_LARM="$(launch linux-arm64 "$(ami "$AMI_UBUNTU_ARM64")" m8g.large "$TMP/ud-arm64.sh" \
  --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=20,VolumeType=gp3,DeleteOnTermination=true}')"
ID_WIN="$(launch windows "$(ami "$AMI_WIN")" m8i.xlarge "$TMP/ud-win.ps1" \
  --cpu-options 'NestedVirtualization=enabled' \
  --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=60,VolumeType=gp3,DeleteOnTermination=true}')"
rm -rf "$TMP"
ALL_IDS=("$ID_LAMD" "$ID_LARM" "$ID_WIN")
echo "linux-amd64: $ID_LAMD   linux-arm64: $ID_LARM   windows: $ID_WIN"
echo "run prefix: s3://$BUCKET/$PREFIX/"

cleanup() {
  echo "== Ensuring all instances are terminated =="
  aws ec2 terminate-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "== Waiting for 3 result JSONs (Linux ~10 min, Windows 60–90 min; 3h cap) =="
DEADLINE=$((SECONDS + 10800))
while [ $SECONDS -lt $DEADLINE ]; do
  N="$(aws s3 ls "s3://$BUCKET/$PREFIX/" --recursive 2>/dev/null | grep -c '\.json' || true)"
  STATES="$(aws ec2 describe-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" \
    --query 'Reservations[].Instances[].State.Name' --output text 2>/dev/null | tr '\t' ' ' || echo unknown)"
  echo "  $(date -u +%H:%M:%SZ)  jsons: ${N:-0}/3  instances: $STATES"
  [ "${N:-0}" -ge 3 ] && break
  if ! echo "$STATES" | grep -qE 'pending|running' && [ "${N:-0}" -lt 3 ]; then
    echo "All instances stopped without full results — check the run.log files below."
    break
  fi
  sleep 60
done

echo "== Download results =="
mkdir -p results-aws
aws s3 cp "s3://$BUCKET/$PREFIX/" results-aws/ --recursive || true
find results-aws -type f | sort
J="$(find results-aws -name '*.json' | wc -l | tr -d ' ')"
[ "$J" -ge 3 ] && echo "RESULT: all three AWS cells complete" \
  || { echo "RESULT: incomplete ($J/3 JSONs) — see the per-cell run.log files"; exit 1; }
