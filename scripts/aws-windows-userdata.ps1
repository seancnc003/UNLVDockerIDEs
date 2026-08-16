# ------------------------------------------------------------------------------
# UNLV Docker IDEs — user-data for the AWS Windows matrix cell (cell 3).
# Rendered and launched by scripts/aws-windows-cell.sh (placeholders
# __BUCKET__ __PREFIX__ __REGION__ __RAW_BASE__ are substituted there; the
# driver wraps this in <powershell>...</powershell> + <persist>true</persist>).
#
# Phase 1 (first boot, as SYSTEM): failsafe shutdown timer, autologon (Docker
#   Desktop needs an interactive session), WSL2 + Ubuntu, Docker Desktop
#   silent install, a logon task for phase 2, reboot.
# Phase 2 (auto-logon after reboot): start Docker Desktop, wait for the
#   engine, run ci-test.sh for both images inside WSL, upload JSONs + log to
#   S3 (instance profile, AWS Tools for PowerShell are preinstalled on
#   Windows AMIs), then shut down → instance terminates.
# ------------------------------------------------------------------------------
$ErrorActionPreference = 'Continue'
Start-Transcript -Path C:\unlv-run.log -Append

$Phase2 = 'C:\unlv-phase2.ps1'
if (-not (Test-Path $Phase2)) {
  # ---------------- Phase 1 ----------------
  & shutdown.exe /s /t 10800 /c "UNLV cell failsafe"   # 3h hard stop, whatever happens

  # Random throwaway password for autologon; the instance has no inbound access.
  Add-Type -AssemblyName System.Web
  $Pw = [System.Web.Security.Membership]::GeneratePassword(20, 4)
  net user Administrator "$Pw"
  $RegLogon = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon'
  Set-ItemProperty $RegLogon -Name AutoAdminLogon -Value '1'
  Set-ItemProperty $RegLogon -Name DefaultUserName -Value 'Administrator'
  Set-ItemProperty $RegLogon -Name DefaultPassword -Value "$Pw"

  wsl --install --no-launch -d Ubuntu

  $Inst = 'C:\DockerDesktopInstaller.exe'
  Invoke-WebRequest -Uri 'https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe' -OutFile $Inst
  Start-Process $Inst -ArgumentList 'install','--quiet','--accept-license','--backend=wsl-2','--always-run-service' -Wait
  net localgroup docker-users Administrator /add

  @'
$ErrorActionPreference = 'Continue'
Start-Transcript -Path C:\unlv-run.log -Append

# Finish Ubuntu first-run setup non-interactively, then verify WSL works.
& ubuntu.exe install --root
wsl -d Ubuntu -u root -- bash -lc 'echo WSL-OK'

Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
$Docker = 'C:\Program Files\Docker\resources\bin\docker.exe'
$Up = $false
foreach ($i in 1..90) {           # up to 15 min for first engine start
  Start-Sleep -Seconds 10
  & $Docker info *> $null
  if ($LASTEXITCODE -eq 0) { $Up = $true; break }
}
"docker engine up: $Up" | Write-Output

if ($Up) {
  # Docker Desktop exposes its CLI in the default WSL distro (Ubuntu).
  # ci-test.sh cds to its script-dir's parent, so placing it in /root/scripts
  # makes results land in /root/results.
  $Test = 'if ! command -v curl >/dev/null; then apt-get update -qq && apt-get install -y -qq curl; fi && ' +
          'mkdir -p /root/scripts && curl -fsSL __RAW_BASE__/scripts/ci-test.sh -o /root/scripts/ci-test.sh && ' +
          'bash /root/scripts/ci-test.sh cpp; bash /root/scripts/ci-test.sh x86; ls -la /root/results/'
  wsl -d Ubuntu -u root -- bash -lc "$Test" 2>&1 | Write-Output

  New-Item -ItemType Directory -Path C:\unlv-results -Force | Out-Null
  foreach ($f in @('cpp-x86_64.json','x86-x86_64.json')) {
    wsl -d Ubuntu -u root -- cat "/root/results/$f" | Out-File -Encoding utf8 "C:\unlv-results\$f"
  }
  Import-Module AWSPowerShell
  foreach ($f in Get-ChildItem C:\unlv-results) {
    Write-S3Object -BucketName '__BUCKET__' -Key "__PREFIX__/$($f.Name)" -File $f.FullName -Region '__REGION__'
  }
}
Stop-Transcript
Import-Module AWSPowerShell
Write-S3Object -BucketName '__BUCKET__' -Key '__PREFIX__/run.log' -File C:\unlv-run.log -Region '__REGION__'
& shutdown.exe /s /t 60 /c "UNLV cell done"
'@ | Set-Content -Path $Phase2 -Encoding UTF8

  $Action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-ExecutionPolicy Bypass -File $Phase2"
  $Trigger = New-ScheduledTaskTrigger -AtLogOn -User 'Administrator'
  Register-ScheduledTask -TaskName 'UNLV-Phase2' -Action $Action -Trigger $Trigger `
    -User 'Administrator' -Password "$Pw" -RunLevel Highest | Out-Null

  Stop-Transcript
  Restart-Computer -Force
}
