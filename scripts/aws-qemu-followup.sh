#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — QEMU-version follow-up (cell 2 diagnostic, NOT a record run).
#
# Cell 2's record run found Ubuntu 24.04's qemu-user-static 8.2.2 segfaulting
# internally (`QEMU internal SIGSEGV {code=MAPERR}`) while emulating
# code-server's Node.js runtime, so the x86 image never reached healthy on
# Linux arm64 (record-results/RESULTS.md, Notes; confirmed n=2). This launches
# two Graviton instances — same m8g.large size and flow as cell 2, so the QEMU
# handler build is the only changed variable per variant — to test whether
# newer QEMU builds fix it:
#
#   variant          instance    OS            QEMU handler source
#   arm64-binfmt     m8g.large   Ubuntu 24.04  tonistiigi/binfmt (Docker's
#                                              build lineage — the same family
#                                              Docker Desktop bundles, so this
#                                              is the Windows-on-ARM-relevant
#                                              data point)
#   arm64-distro-new m8g.large   Ubuntu 26.04  distro qemu-user-static (newer
#                                              than the 8.2.2 that crashed)
#
# Each runs the unmodified published scripts/ci-test.sh (same methodology as
# the record run), then a standalone 90 s container probe with `docker
# inspect`/`docker logs` captures (mirroring the arm64-rerun diagnostics),
# uploads everything to S3, and self-terminates. Outcomes land in RESULTS.md's
# Notes as follow-up evidence; cell 2's recorded table numbers never change.
#
# Zero-touch, no inbound ports. Cost: ≈ $0.05–0.10 total (two Linux cells,
# ~15 min each). Failsafes: per-instance scheduled shutdown,
# terminate-on-shutdown, and a terminate-all in this script's exit trap.
#
# Usage: scripts/aws-qemu-followup.sh [region]   (default us-east-1)
#        UBUNTU_NEW=25.04 scripts/aws-qemu-followup.sh   to change variant B's OS
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${1:-us-east-1}"
UBUNTU_NEW="${UBUNTU_NEW:-26.04}"
RUN_ID="$(date -u +%Y%m%d-%H%M%S)"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="unlv-ide-ci-results-$ACCOUNT"
PREFIX="qemu-followup/$RUN_ID"
ROLE=unlv-ide-ci-s3-writer
RAW_BASE=https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main
AMI_NOBLE_ARM64=/aws/service/canonical/ubuntu/server/24.04/stable/current/arm64/hvm/ebs-gp3/ami-id
AMI_NEW_ARM64=/aws/service/canonical/ubuntu/server/$UBUNTU_NEW/stable/current/arm64/hvm/ebs-gp3/ami-id

echo "== Results bucket (idempotent) =="
aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null || \
  aws s3 mb "s3://$BUCKET" --region "$REGION"

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

# Coursework workload is deliberately NOT uploaded: this is a can-the-container-
# reach-healthy diagnostic, and ci-test.sh skips the workload stage cleanly.

userdata() { # variant-name handler-mode(binfmt|distro)
  cat <<EOF
#!/bin/bash
shutdown -h +100 "UNLV qemu-followup failsafe"
exec > /var/log/unlv-run.log 2>&1
set -x
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io curl unzip
# Ubuntu dropped the awscli apt package — use the official AWS CLI v2 installer
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-\$(uname -m).zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp && /tmp/aws/install
if [ "$2" = distro ]; then
  # Variant B: this OS release's own qemu-user-static (newer than the 8.2.2
  # that crashed in cell 2). Log the exact version for provenance.
  apt-get install -y -qq qemu-user-static binfmt-support
  /usr/bin/qemu-x86_64-static --version | head -1
fi
systemctl start docker
if [ "$2" = binfmt ]; then
  # Variant A: Docker's binfmt handler image on the same Ubuntu 24.04 as
  # cell 2 — only the handler build changes. Log its digest for provenance.
  docker run --privileged --rm tonistiigi/binfmt --install amd64
  docker inspect --format '{{index .RepoDigests 0}}' tonistiigi/binfmt
fi
ls /proc/sys/fs/binfmt_misc/
mkdir -p /root/scripts /root/results
curl -fsSL $RAW_BASE/scripts/ci-test.sh -o /root/scripts/ci-test.sh
cd /root
bash scripts/ci-test.sh x86
# Diagnostics regardless of suite outcome: a standalone 90 s probe with the
# same captures as the record run's arm64-rerun (inspect + full logs).
docker rm -f diagprobe 2>/dev/null
docker run -d --platform linux/amd64 --name diagprobe seancnc/unlv-x86-ide
sleep 90
docker inspect --format 'status={{.State.Status}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}}' diagprobe > /root/results/diag-inspect.txt
docker logs diagprobe > /root/results/diag-logs.txt 2>&1
docker rm -f diagprobe 2>/dev/null
aws s3 cp /root/results/ "s3://$BUCKET/$PREFIX/$1/" --recursive --region $REGION
aws s3 cp /var/log/unlv-run.log "s3://$BUCKET/$PREFIX/$1/run.log" --region $REGION
shutdown -h now
EOF
}

launch() { # name ami-id userdata-file
  aws ec2 run-instances --region "$REGION" \
    --image-id "$2" --instance-type m8g.large \
    --iam-instance-profile "Name=$ROLE" \
    --instance-initiated-shutdown-behavior terminate \
    --user-data "file://$3" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=unlv-ide-$1-$RUN_ID}]" \
    --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=20,VolumeType=gp3,DeleteOnTermination=true}' \
    --query 'Instances[0].InstanceId' --output text
}

echo "== Launch both variants =="
TMP="$(mktemp -d)"
userdata arm64-binfmt binfmt > "$TMP/ud-binfmt.sh"
userdata arm64-distro-new distro > "$TMP/ud-distro.sh"
ID_BINFMT="$(launch arm64-binfmt "$(ami "$AMI_NOBLE_ARM64")" "$TMP/ud-binfmt.sh")"
ID_DISTRO="$(launch arm64-distro-new "$(ami "$AMI_NEW_ARM64")" "$TMP/ud-distro.sh")"
rm -rf "$TMP"
ALL_IDS=("$ID_BINFMT" "$ID_DISTRO")
echo "arm64-binfmt: $ID_BINFMT   arm64-distro-new (Ubuntu $UBUNTU_NEW): $ID_DISTRO"
echo "run prefix: s3://$BUCKET/$PREFIX/"

cleanup() {
  echo "== Ensuring both instances are terminated =="
  aws ec2 terminate-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "== Waiting for 2 result JSONs (~15 min typical; 45 min cap) =="
DEADLINE=$((SECONDS + 2700))
while [ $SECONDS -lt $DEADLINE ]; do
  N="$(aws s3 ls "s3://$BUCKET/$PREFIX/" --recursive 2>/dev/null | grep -c '\.json' || true)"
  STATES="$(aws ec2 describe-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" \
    --query 'Reservations[].Instances[].State.Name' --output text 2>/dev/null | tr '\t' ' ' || echo unknown)"
  echo "  $(date -u +%H:%M:%SZ)  jsons: ${N:-0}/2  instances: $STATES"
  [ "${N:-0}" -ge 2 ] && break
  if ! echo "$STATES" | grep -qE 'pending|running' && [ "${N:-0}" -lt 2 ]; then
    echo "Both instances stopped without full results — check the run.log files below."
    break
  fi
  sleep 60
done

echo "== Download results =="
DEST="results/aws/qemu-followup/$RUN_ID"
mkdir -p "$DEST"
aws s3 cp "s3://$BUCKET/$PREFIX/" "$DEST/" --recursive || true
find "$DEST" -type f | sort
echo "== Quick verdicts (healthy-or-not per variant) =="
for V in arm64-binfmt arm64-distro-new; do
  echo "--- $V ---"
  [ -f "$DEST/$V/diag-inspect.txt" ] && cat "$DEST/$V/diag-inspect.txt" || echo "(no diag capture)"
  [ -f "$DEST/$V/diag-logs.txt" ] && tail -3 "$DEST/$V/diag-logs.txt"
done
J="$(find "$DEST" -name '*.json' | wc -l | tr -d ' ')"
[ "$J" -ge 2 ] && echo "RESULT: both variants complete — transcribe into RESULTS.md Notes" \
  || { echo "RESULT: incomplete ($J/2 JSONs) — see the per-variant run.log files"; exit 1; }
