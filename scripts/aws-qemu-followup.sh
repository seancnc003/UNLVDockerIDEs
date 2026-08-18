#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — Linux arm64 cell under Docker's binfmt handlers.
#
# Background: the record run's cell 2 (Ubuntu 24.04 stock qemu-user-static
# 8.2.2) crashed with a QEMU-internal SIGSEGV emulating code-server's Node.js
# runtime (record-results/RESULTS.md, Notes). The first run of this driver
# (20260818-195946, diagnostic scope — no coursework shipped) demonstrated the
# fix: Docker's tonistiigi/binfmt handler build passes on otherwise identical
# hardware/OS. This driver now runs at full record scope: when the private
# code/ folder is present locally it is uploaded and fetched so ci-test.sh
# measures every metric the other cells track — the four CS 218 coursework
# assignments (build + run + status), workload peak memory, and the rest.
#
#   variant          instance    OS            QEMU handler source
#   arm64-binfmt     m8g.large   Ubuntu 24.04  tonistiigi/binfmt (Docker's
#                                              build lineage — what Docker
#                                              Desktop bundles)
#   arm64-distro-new m8g.large   Ubuntu 26.04  distro qemu-user-static.
#                                              OPT-IN (VARIANTS="binfmt distro"):
#                                              known rig failure — the package
#                                              had no installation candidate on
#                                              the 26.04 AMI (run 20260818-195946)
#
# Each instance runs the unmodified published scripts/ci-test.sh (same
# methodology as the record runs), then a standalone 90 s container probe with
# `docker inspect`/`docker logs` captures, uploads everything to S3, and
# self-terminates.
#
# Zero-touch, no inbound ports. Cost: ≈ $0.05 per variant (~15 min).
# Failsafes: per-instance scheduled shutdown, terminate-on-shutdown, and a
# terminate-all in this script's exit trap.
#
# Usage: scripts/aws-qemu-followup.sh [region]      (default us-east-1)
#        VARIANTS="binfmt distro" scripts/aws-qemu-followup.sh   both variants
#        UBUNTU_NEW=25.04 ...                       change the distro variant's OS
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${1:-us-east-1}"
VARIANTS="${VARIANTS:-binfmt}"
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

# Coursework workload (gitignored course material — travels via S3, not git).
# Uploaded fresh when present locally; cells fetch it and ci-test.sh skips
# the workload stage cleanly if this upload never happened.
if [ -d code ]; then
  echo "== Uploading coursework workload =="
  (cd "$(mktemp -d)" && cp -R "$OLDPWD/code" code && zip -qr code.zip code && \
   aws s3 cp code.zip "s3://$BUCKET/workload/code.zip" --region "$REGION")
else
  echo "== NOTE: no local code/ folder — workload stage will be skipped (diagnostic scope) =="
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
  # Distro variant: this OS release's own qemu-user-static. Log the exact
  # version for provenance.
  apt-get install -y -qq qemu-user-static binfmt-support
  /usr/bin/qemu-x86_64-static --version | head -1
fi
systemctl start docker
if [ "$2" = binfmt ]; then
  # Docker's binfmt handler image on the same Ubuntu 24.04 as the superseded
  # record cell — only the handler build changes. Log its digest for
  # provenance.
  docker run --privileged --rm tonistiigi/binfmt --install amd64
  docker inspect --format '{{index .RepoDigests 0}}' tonistiigi/binfmt
fi
ls /proc/sys/fs/binfmt_misc/
mkdir -p /root/scripts /root/results
curl -fsSL $RAW_BASE/scripts/ci-test.sh -o /root/scripts/ci-test.sh
cd /root
# Coursework workload (private, optional): fetch if this run's upload exists;
# ci-test.sh skips the stage cleanly when code/ is absent.
if aws s3 cp "s3://$BUCKET/workload/code.zip" /root/code.zip --region $REGION 2>/dev/null; then
  unzip -o /root/code.zip -d /root
fi
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

echo "== Launch: $VARIANTS =="
TMP="$(mktemp -d)"
ALL_IDS=()
EXPECT=0
for V in $VARIANTS; do
  case "$V" in
    binfmt)
      userdata arm64-binfmt binfmt > "$TMP/ud-binfmt.sh"
      ID="$(launch arm64-binfmt "$(ami "$AMI_NOBLE_ARM64")" "$TMP/ud-binfmt.sh")"
      echo "arm64-binfmt: $ID" ;;
    distro)
      userdata arm64-distro-new distro > "$TMP/ud-distro.sh"
      ID="$(launch arm64-distro-new "$(ami "$AMI_NEW_ARM64")" "$TMP/ud-distro.sh")"
      echo "arm64-distro-new (Ubuntu $UBUNTU_NEW): $ID" ;;
    *) echo "unknown variant: $V" >&2; exit 1 ;;
  esac
  ALL_IDS+=("$ID"); EXPECT=$((EXPECT + 1))
done
rm -rf "$TMP"
echo "run prefix: s3://$BUCKET/$PREFIX/"

cleanup() {
  echo "== Ensuring all launched instances are terminated =="
  aws ec2 terminate-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "== Waiting for $EXPECT result JSON(s) (~15 min typical; 45 min cap) =="
DEADLINE=$((SECONDS + 2700))
while [ $SECONDS -lt $DEADLINE ]; do
  N="$(aws s3 ls "s3://$BUCKET/$PREFIX/" --recursive 2>/dev/null | grep -c '\.json' || true)"
  STATES="$(aws ec2 describe-instances --region "$REGION" --instance-ids "${ALL_IDS[@]}" \
    --query 'Reservations[].Instances[].State.Name' --output text 2>/dev/null | tr '\t' ' ' || echo unknown)"
  echo "  $(date -u +%H:%M:%SZ)  jsons: ${N:-0}/$EXPECT  instances: $STATES"
  [ "${N:-0}" -ge "$EXPECT" ] && break
  if ! echo "$STATES" | grep -qE 'pending|running' && [ "${N:-0}" -lt "$EXPECT" ]; then
    echo "All instances stopped without full results — check the run.log files below."
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
for D in "$DEST"/*/; do
  echo "--- $(basename "$D") ---"
  [ -f "$D/diag-inspect.txt" ] && cat "$D/diag-inspect.txt" || echo "(no diag capture)"
done
J="$(find "$DEST" -name '*.json' | wc -l | tr -d ' ')"
[ "$J" -ge "$EXPECT" ] && echo "RESULT: all $EXPECT variant(s) complete — transcribe into RESULTS.md" \
  || { echo "RESULT: incomplete ($J/$EXPECT JSONs) — see the per-variant run.log files"; exit 1; }
