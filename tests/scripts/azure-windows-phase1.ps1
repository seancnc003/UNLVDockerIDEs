# ------------------------------------------------------------------------------
# UNLV Docker IDEs — Azure Windows 11 matrix cell, phase 1.
# Rendered and launched by scripts/azure-matrix.sh via CustomScriptExtension
# (placeholders __JSON_PUT__ __LOG_PUT__ __LIVE_PUT__ __CODE_GET__ __RAW_BASE__
# are substituted there; all are pre-signed S3 URLs, so the VM needs no cloud
# credentials at all).
#
# Unlike the AWS cell this runs on real Windows 11 Pro (no Server proxy):
# Docker Desktop is on its officially supported OS. Same two-phase shape:
# Phase 1 (SYSTEM, via extension): heartbeat, autologon, WSL2, Docker Desktop
#   silent install, logon task for phase 2, reboot.
# Phase 2 (autologon after reboot): enable Docker Desktop WSL integration,
#   start Docker Desktop, register Ubuntu, run ci-test.sh in WSL, upload JSON
#   + log via pre-signed PUTs, shutdown (deallocation is the driver's job —
#   Azure bills a VM stopped from inside the OS).
#
# This file incorporates every fix from the cell A3 record run
# (20260818-093352; anomalies documented in record-results/RESULTS.md — the
# recorded attempt itself ran via a hand-driven schtasks /IT task after live
# repairs; this script IS those repairs, folded in):
#   - `wsl --install` is a silent no-op under SYSTEM → DISM features + the
#     WSL MSI from GitHub releases instead; the distro registers per-user in
#     phase 2.
#   - docker CLI lives at C:\Program Files\Docker\Docker\resources\bin (two
#     Docker segments); a wrong path makes the engine probe a false positive
#     because CommandNotFound leaves $LASTEXITCODE untouched → Test-Path
#     guard.
#   - Docker Desktop's WSL integration is per-distro and off by default for
#     late-registered distros → settings-store.json is written before Docker
#     Desktop first starts.
#   - Register-ScheduledTask with a net-user-set random password failed with
#     0x8007052e → Set-LocalUser (no shell parsing) + schtasks /IT, which
#     runs phase 2 on the interactive token of the autologon session that
#     Docker Desktop needs.
# ------------------------------------------------------------------------------
$ErrorActionPreference = 'Continue'
Start-Transcript -Path C:\unlv-run.log -Append
"PHASE1 start $(Get-Date -Format o)" | Write-Output

# Heartbeat: upload live transcript copy every 3 min so hangs are diagnosable.
@'
Copy-Item C:\unlv-run.log C:\unlv-live.log -Force -ErrorAction SilentlyContinue
Invoke-WebRequest -Method PUT -InFile C:\unlv-live.log -Uri '__LIVE_PUT__' -UseBasicParsing
'@ | Set-Content -Path C:\unlv-heartbeat.ps1 -Encoding UTF8
$HbAction = New-ScheduledTaskAction -Execute 'powershell.exe' `
  -Argument '-ExecutionPolicy Bypass -File C:\unlv-heartbeat.ps1'
$HbTrigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
  -RepetitionInterval (New-TimeSpan -Minutes 3) -RepetitionDuration (New-TimeSpan -Days 2)
Register-ScheduledTask -TaskName 'UNLV-Heartbeat' -Action $HbAction -Trigger $HbTrigger `
  -User 'SYSTEM' -RunLevel Highest | Out-Null

# Autologon for phase 2 (Docker Desktop needs an interactive session).
# Set-LocalUser, not `net user`: shell parsing of a random password is what
# broke task registration (0x8007052e) in the record run. Alphanumeric+!
# only, so the same literal also survives schtasks /RP below.
$Pw = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 18 | ForEach-Object { [char]$_ }) + '!x2'
Set-LocalUser -Name unlv -Password (ConvertTo-SecureString $Pw -AsPlainText -Force)
$RegLogon = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon'
Set-ItemProperty $RegLogon -Name AutoAdminLogon -Value '1'
Set-ItemProperty $RegLogon -Name DefaultUserName -Value 'unlv'
Set-ItemProperty $RegLogon -Name DefaultPassword -Value "$Pw"

# WSL: DISM features + the GitHub MSI. (`wsl --install` under SYSTEM installs
# nothing and returns instantly; `wsl --status` under SYSTEM reports
# WSL_E_LOCAL_SYSTEM_NOT_SUPPORTED even when WSL is healthy — neither is a
# usable signal here.)
"PHASE1 wsl-features $(Get-Date -Format o)" | Write-Output
dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart | Out-Null
dism /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart | Out-Null
"PHASE1 wsl-msi $(Get-Date -Format o)" | Write-Output
$Rel = Invoke-RestMethod 'https://api.github.com/repos/microsoft/WSL/releases/latest' -UseBasicParsing
$Msi = $Rel.assets | Where-Object { $_.name -like '*x64.msi' } | Select-Object -First 1
Invoke-WebRequest -Uri $Msi.browser_download_url -OutFile C:\wsl.msi -UseBasicParsing
Start-Process msiexec.exe -ArgumentList '/i','C:\wsl.msi','/quiet','/norestart' -Wait
"PHASE1 wsl-msi-installed $($Msi.name) $(Get-Date -Format o)" | Write-Output

"PHASE1 docker-desktop-download $(Get-Date -Format o)" | Write-Output
$Inst = 'C:\DockerDesktopInstaller.exe'
Invoke-WebRequest -Uri 'https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe' -OutFile $Inst -UseBasicParsing
"PHASE1 docker-desktop-install $(Get-Date -Format o)" | Write-Output
Start-Process $Inst -ArgumentList 'install','--quiet','--accept-license','--backend=wsl-2','--always-run-service' -Wait
"PHASE1 docker-desktop-installed $(Get-Date -Format o)" | Write-Output
net localgroup docker-users unlv /add

@'
$ErrorActionPreference = 'Continue'
Start-Transcript -Path C:\unlv-run.log -Append
"PHASE2 start $(Get-Date -Format o)" | Write-Output

# Register Ubuntu for this user (registration is per-user; ubuntu.exe from
# the appx era does not exist with MSI-installed WSL).
wsl.exe --install -d Ubuntu --no-launch --web-download 2>&1 | Write-Output
wsl -d Ubuntu -u root -- bash -lc 'echo WSL-OK' 2>&1 | Write-Output

# Enable Docker Desktop WSL integration for Ubuntu BEFORE first engine start
# (per-distro, off by default for distros Docker Desktop has not seen).
$Store = "$env:APPDATA\Docker\settings-store.json"
New-Item -ItemType Directory -Path (Split-Path $Store) -Force | Out-Null
$S = if (Test-Path $Store) { Get-Content $Store -Raw | ConvertFrom-Json } else { [pscustomobject]@{} }
$S | Add-Member -NotePropertyName EnableIntegrationWithDefaultWslDistro -NotePropertyValue $true -Force
$S | Add-Member -NotePropertyName IntegratedWslDistros -NotePropertyValue @('Ubuntu') -Force
$S | ConvertTo-Json -Depth 20 | Set-Content $Store -Encoding UTF8
"wsl integration pre-enabled" | Write-Output

Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
# Two Docker segments — the single-segment path makes this probe a false
# positive (CommandNotFound leaves $LASTEXITCODE untouched).
$Docker = 'C:\Program Files\Docker\Docker\resources\bin\docker.exe'
$Up = $false
foreach ($i in 1..90) {           # up to 15 min for first engine start
  Start-Sleep -Seconds 10
  if (Test-Path $Docker) {
    & $Docker info *> $null
    if ($LASTEXITCODE -eq 0) { $Up = $true; break }
  }
}
"docker engine up: $Up" | Write-Output

if ($Up) {
  try {
    Invoke-WebRequest -Uri '__CODE_GET__' -OutFile C:\code.zip -UseBasicParsing
    wsl -d Ubuntu -u root -- bash -lc 'apt-get update -qq && apt-get install -y -qq unzip && cp /mnt/c/code.zip /root/ && unzip -o /root/code.zip -d /root' 2>&1 | Write-Output
  } catch { 'no coursework workload available' | Write-Output }

  $Test = 'if ! command -v curl >/dev/null; then apt-get update -qq && apt-get install -y -qq curl; fi && ' +
          'mkdir -p /root/scripts && curl -fsSL __RAW_BASE__/tests/scripts/ci-test.sh -o /root/scripts/ci-test.sh && ' +
          'cd /root && bash scripts/ci-test.sh x86; ls -la /root/results/'
  wsl -d Ubuntu -u root -- bash -lc "$Test" 2>&1 | Write-Output

  wsl -d Ubuntu -u root -- cat /root/results/x86-x86_64.json | Out-File -Encoding utf8 C:\unlv-results.json
  Invoke-WebRequest -Method PUT -InFile C:\unlv-results.json -Uri '__JSON_PUT__' -UseBasicParsing
}
Stop-Transcript
Invoke-WebRequest -Method PUT -InFile C:\unlv-run.log -Uri '__LOG_PUT__' -UseBasicParsing
& shutdown.exe /s /t 60 /c "UNLV cell done"
'@ | Set-Content -Path C:\unlv-phase2.ps1 -Encoding UTF8

# Phase 2 fires at the autologon via schtasks /IT — the interactive token of
# the logged-on user, which Docker Desktop requires. (Register-ScheduledTask
# with -Password was the 0x8007052e failure; RunOnce is consumed even when
# its process dies instantly and leaves no diagnostics.)
"PHASE1 registering-phase2-and-rebooting $(Get-Date -Format o)" | Write-Output
schtasks /create /F /SC ONLOGON /TN UNLV-Phase2 /IT /RL HIGHEST /RU unlv /RP "$Pw" `
  /TR "powershell -ExecutionPolicy Bypass -File C:\unlv-phase2.ps1" 2>&1 | Write-Output

Stop-Transcript
Restart-Computer -Force
