#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# UNLV Docker IDEs — platform-matrix cell 3: Windows amd64 (Docker Desktop/WSL2)
#
# Fully automated, zero-touch AWS run (papers/EXPERIMENT_PLAN.md):
#   launch m8i.xlarge (nested virtualization enabled) with Windows Server 2025
#   → user-data installs WSL2 + Docker Desktop, reboots, runs scripts/ci-test.sh
#     for both images inside WSL, uploads JSONs + log to S3, shuts down
#   → this driver polls S3, downloads results to results-aws/, terminates.
#
# No RDP, no key pair, no inbound ports — the instance only needs outbound
# internet (default VPC/SG). Cost: ≈ $0.40/hr, typical run 60–90 min ≈ $0.60.
# Failsafes: instance-initiated-shutdown-behavior=terminate, a 3-hour
# scheduled shutdown on the box, and a terminate in this script's exit trap.
#
# Prereqs: aws CLI v2 with credentials; nested virtualization requires a CLI
# recent enough to know the NestedVirtualization CpuOption (Feb 2026 feature —
# `aws ec2 run-instances help | grep -i nested` to confirm, upgrade if absent).
#
# Usage: scripts/aws-windows-cell.sh [region]   (default us-east-1)
# ------------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${1:-us-east-1}"
RUN_ID="$(date -u +%Y%m%d-%H%M%S)"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="unlv-ide-ci-results-$ACCOUNT"
PREFIX="windows-cell/$RUN_ID"
ROLE=unlv-ide-ci-s3-writer
INSTANCE_TYPE=m8i.xlarge
AMI_PARAM=/aws/service/ami-windows-latest/Windows_Server-2025-English-Full-Base
RAW_BASE=https://raw.githubusercontent.com/seancnc003/UNLVDockerIDEs/main

echo "== Results bucket (idempotent) =="
aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null || \
  aws s3 mb "s3://$BUCKET" --region "$REGION"

echo "== IAM role + instance profile (idempotent, write-only to this bucket) =="
if ! aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
  aws iam create-role --role-name "$ROLE" --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Allow", "Principal": {"Service": "ec2.amazonaws.com"}, "Action": "sts:AssumeRole"}]
  }' >/dev/null
  aws iam put-role-policy --role-name "$ROLE" --policy-name s3-results-write \
    --policy-document "{
      \"Version\": \"2012-10-17\",
      \"Statement\": [{\"Effect\": \"Allow\", \"Action\": \"s3:PutObject\", \"Resource\": \"arn:aws:s3:::$BUCKET/*\"}]
    }"
  aws iam create-instance-profile --instance-profile-name "$ROLE" >/dev/null
  aws iam add-role-to-instance-profile --instance-profile-name "$ROLE" --role-name "$ROLE"
  sleep 10  # instance-profile propagation
fi

echo "== Render user-data =="
AMI="$(aws ssm get-parameter --region "$REGION" --name "$AMI_PARAM" --query Parameter.Value --output text)"
echo "AMI: $AMI"
USERDATA="$(mktemp)"
{
  echo '<powershell>'
  sed -e "s|__BUCKET__|$BUCKET|g" \
      -e "s|__PREFIX__|$PREFIX|g" \
      -e "s|__REGION__|$REGION|g" \
      -e "s|__RAW_BASE__|$RAW_BASE|g" \
      scripts/aws-windows-userdata.ps1
  echo '</powershell>'
  echo '<persist>true</persist>'
} > "$USERDATA"

echo "== Launch =="
INSTANCE_ID="$(aws ec2 run-instances --region "$REGION" \
  --image-id "$AMI" \
  --instance-type "$INSTANCE_TYPE" \
  --cpu-options 'NestedVirtualization=enabled' \
  --iam-instance-profile "Name=$ROLE" \
  --instance-initiated-shutdown-behavior terminate \
  --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=60,VolumeType=gp3,DeleteOnTermination=true}' \
  --user-data "file://$USERDATA" \
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=unlv-ide-windows-cell-$RUN_ID}]" \
  --query 'Instances[0].InstanceId' --output text)"
rm -f "$USERDATA"
echo "Instance: $INSTANCE_ID  (run: $PREFIX)"

cleanup() {
  echo "== Ensuring instance is terminated =="
  aws ec2 terminate-instances --region "$REGION" --instance-ids "$INSTANCE_ID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "== Waiting for results in s3://$BUCKET/$PREFIX/ (up to 3h; typical 60–90 min) =="
DEADLINE=$((SECONDS + 10800))
while [ $SECONDS -lt $DEADLINE ]; do
  N="$(aws s3 ls "s3://$BUCKET/$PREFIX/" 2>/dev/null | grep -c '\.json' || true)"
  STATE="$(aws ec2 describe-instances --region "$REGION" --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].State.Name' --output text 2>/dev/null || echo unknown)"
  echo "  $(date -u +%H:%M:%SZ)  jsons: ${N:-0}/2  instance: $STATE"
  [ "${N:-0}" -ge 2 ] && break
  if [ "$STATE" = terminated ] && [ "${N:-0}" -lt 2 ]; then
    echo "Instance terminated without full results — check the log below for the failure."
    break
  fi
  sleep 60
done

echo "== Download results =="
mkdir -p results-aws
aws s3 cp "s3://$BUCKET/$PREFIX/" results-aws/ --recursive || true
ls -la results-aws/
[ -f results-aws/cpp-x86_64.json ] && [ -f results-aws/x86-x86_64.json ] \
  && echo "RESULT: cell 3 complete" \
  || { echo "RESULT: incomplete — see results-aws/run.log"; exit 1; }
