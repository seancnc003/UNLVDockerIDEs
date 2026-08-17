# Institutional Linux Servers and VMs at CSN and UNLV

**Purpose.** This document records what the College of Southern Nevada (CSN) and the University of Nevada, Las Vegas (UNLV) have historically provided to computer science students as shared compute infrastructure — departmental Linux login servers reached over SSH, and institutionally provided virtual machines — and assesses how current and maintained each offering is. It exists to ground the "institutional status quo" / historical-arc motivation section of the applied research paper on UNLV's Docker-based course IDEs for CS 202 (C++) and CS 218 (x86-64 assembly). All sources were accessed on August 16, 2026 (some HTTP responses carry an August 17, 2026 UTC date stamp). Every claim below is labeled by evidence strength: **[verified]** means the cited page or file was fetched directly during this research; **[snippet]** means the claim comes from a search-engine cache/snippet of a page that now returns 404 and could not be re-fetched (the Internet Archive's Wayback Machine was temporarily offline — returning "Internet Archive: Temporarily Offline" — throughout the research session, so archived copies could not be pulled); **[unconfirmed]** means no supporting source was found.

---

## 1. CSN findings

### 1.1 The server is `bellagio.csn.edu`, and it is still in service

CSN's CIT department operates a student-facing Linux login server named **bellagio.csn.edu**. The server's own homepage, fetched live, describes it as "the general purpose login server for remote logins" and states that "Accounts are created automatically for students in courses utilizing the server at the beginning of the semester," with account inquiries directed to administrator Steven Romero via CSN email. **[verified]** (https://bellagio.csn.edu/, accessed 2026-08-16; the page's HTTP `Last-Modified` header read `Mon, 27 Jul 2026 23:23:20 GMT`, so the homepage was edited roughly three weeks before access.)

A direct banner grab of `bellagio.csn.edu` port 22 on 2026-08-16 returned:

```
SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.16
```

OpenSSH 8.9p1 with the `3ubuntu0.16` patch suffix identifies **Ubuntu 22.04 LTS with recent security updates applied**. In other words, whatever its documentation looks like, the CSN server's operating system is a supported LTS release that is actively receiving patches. **[verified]** (TCP banner, port 22, 2026-08-16.)

### 1.2 The authoritative student documentation is the 2017 "CIT Linux Lab Manual"

The lab manual served from the server today is **"CIT Linux Lab Manual," Version 2017-08-05** — a nine-year-old document as of this access date. **[verified]** (https://bellagio.csn.edu/doc/labmanual.pdf, fetched and text-extracted 2026-08-16.) Verbatim quotes from the fetched PDF:

- "bellagio.csn.edu (heretofore referred to as bellagio) is a Linux server maintained by the CIT department to provide remote access to computing resources for CIT students."
- "The following manual presents basic information necessary for students utilizing the College of Southern Nevada's (CSN) Linux Server in conjunction with a variety of CIT, CS, and IS courses."
- Windows access: "To access the Linux server using Windows, you will need to download and install MobaXterm … To connect to the server, launch MobaXterm, then select 'New Session' followed by 'SSH'. Fill in the server name (bellagio.csn.edu). Leave the port number unchanged."
- macOS/Linux access: `$ ssh -X username@bellagio.csn.edu` (X11 forwarding via `-X`; Mac users are told to install XQuartz).
- First-connection example reveals the server's IP: "The authenticity of host 'bellagio.csn.edu (131.216.135.130)' can't be established." (Note that 131.216.0.0/16 is the same NSHE/UNLV-managed address range in which UNLV's CS servers lived; see §2.)
- Web password reset: "Browse to https://bellagio.csn.edu:5950/ … You must include the port number, 5950, to go to the correct Web page."
- File transfer: SCP/SFTP on port 22, with FileZilla and MobaXterm's built-in SFTP browser as the documented clients.
- Homework submission uses a `turnin` command (turnin-ng): "$ turnin –c cs135 –p lab03 –v filename".
- The manual's shared-directory listing names the courses provisioned on the server: **cit131, cit176, cit231, cit251, cit252, cs135, cs202** — i.e., CSN's CIT Linux/networking sequence plus the transferable CS 135 and CS 202 programming courses.
- Dated internals corroborate the document's age: it links to `http://www.nscee.edu/userSupport/unixRef.html` (the long-defunct National Supercomputing Center for Energy and the Environment) and ships `Introduction_to_Linux-20100512.pdf` and 2013/2015-era references in the shared directory. In 2017 the manual named **Kevin Mess** as server administrator ("contact the server administrator, Kevin Mess, for a password reset"), whereas the current homepage names Steven Romero — evidence the service has been handed over and is still administered.

### 1.3 The surrounding CIT web materials are largely frozen circa 2015–2018

The `https://bellagio.csn.edu/cit/` directory index (fetched live) lists content folders for academic years 2015–16 through 2017–18 with last-modified dates between May 2015 and December 2017, and carries the disclaimer "The page you are viewing is not sanctioned by CSN." A Fall 2018 CIT 151 syllabus is still hosted at a faculty path on the same server. **[verified]** (https://bellagio.csn.edu/cit/, accessed 2026-08-16; https://bellagio.csn.edu/~kpulling/DrKatePulling/Fall2018cit151Section3001.html seen in search results.)

**CSN summary.** The accurate characterization for the paper is nuanced: CSN's *server* is well maintained (patched Ubuntu 22.04 LTS, homepage edited July 2026, active administrator), but the *student-facing documentation and course web materials* around it are five to nine years old, and the pedagogical model — a shared multi-user login box reached by SSH/X11 with `turnin`-style submission — is unchanged since at least 2017.

### 1.4 "Sally" is not a CSN hostname

No evidence was found of any CSN server named "sally." Searches for `sally.csn.edu`, "CSN sally server," and CSN CIT materials mentioning sally returned nothing; every "sally" hit resolved to **sally.cs.unlv.edu**, a UNLV Computer Science server (§2.2). If the repo owner remembers "sally," the memory almost certainly attaches to UNLV, not CSN. **[verified negative — see §2.2 for the positive identification]**

---

## 2. UNLV findings

### 2.1 Current state (2025–2026): `cyrus` + Omnissa Horizon VMs

UNLV CS's student-facing infrastructure portal is **tux.cs.unlv.edu** ("UNLV Computer Science Student Center," © 2025). The site was rebuilt recently: the entire old MediaWiki (`/wiki/index.php/*`) and a successor static-docs site (`/alt-tux-docs/*`) now return 404 from an nginx/Ubuntu server, and only a small set of new pages exists (`index.html`, `remote-access.html`, `file-storage.html`, `student-resources.html`, `contact.html`). **[verified]** (Fetched 2026-08-16.)

From the live pages **[verified]**:

- File storage / SSH: "SSH into `cyrus.cs.unlv.edu` using your ACE ID," with off-campus users told to "Connect to the UNLV VPN" first (https://tux.cs.unlv.edu/file-storage.html). Search snippets of the pre-rebuild docs give cyrus's address as 10.96.204.4 — a private RFC-1918 address, consistent with the VPN requirement. **[snippet]**
- **Correction (live probe, 2026-08-17):** `cyrus.cs.unlv.edu` does **not resolve in public DNS** (NXDOMAIN), and the old lab-manual path `tux.cs.unlv.edu/lab_man/cyruserver.pdf` returns 404. What is verified is the *instruction page* telling students to SSH to cyrus — the host itself is only reachable (if at all) via campus/VPN-internal DNS, consistent with its RFC-1918 address. Earlier drafts of this file overstated cyrus as "verified live"; its liveness cannot be confirmed from off campus and should not be asserted in the paper without an on-VPN test. **[verified NXDOMAIN; liveness unconfirmed]**
- Remote VMs: students "remotely access virtual machines using Omnissa Horizon Client" with "24/7 access to virtual machines," connection server `workspaces.unlv.edu`, ACE credentials, VPN required off campus, and a stern warning that "All work must be saved in your Y: Drive. It is PERMANENTLY DELETED if you do not." The VMs "are monitored by UNLV OIT." (https://tux.cs.unlv.edu/remote-access.html.)
- Web access to storage via `rebelfiles.unlv.edu`.

So the *current* UNLV VM offering is a centrally managed VDI service (Omnissa, formerly VMware Horizon), not a distributed VM image; nothing on the live site suggests it is out of date.

### 2.2 Historical state: `bobby`, `sally`, and `cardiac` — now decommissioned

The strongest historical evidence comes from search-engine snippets of the now-deleted tux.cs.unlv.edu wiki and docs pages. These claims were surfaced consistently across multiple independent queries and page titles (SSH fingerprint, Remote access/Access, Linux Guide, CS Servers, Submit script), but the underlying pages 404 and the Wayback Machine was offline during research, so they are classified **[snippet]** throughout:

- "Servers cardiac, sally, and bobby have been decommissioned." The snippets supply the hostnames and IPs: **bobby.cs.unlv.edu (131.216.23.6)**, **sally.cs.unlv.edu (131.216.23.103)**, **cardiac.cs.unlv.edu (131.216.23.8)**. (Source pages: https://tux.cs.unlv.edu/wiki/index.php/SSH_fingerprint and https://tux.cs.unlv.edu/alt-tux-docs/guide/servers.html, both now 404.)
- "sally.cs.unlv.edu was upgraded on Sep 28, 2020 and has new SSH keys" — so sally was still being maintained as of late September 2020. (Same SSH-fingerprint page.)
- The Linux Guide instructed students to `ssh username@bobby.cs.unlv.edu` and to transfer files with `sftp username@bobby.cs.unlv.edu`; assignment submission was via a `submit` script "located on bobby at /usr/bin/submit," used as `submit file.cpp 01 instructor`, and students "could not submit programs directly from lab computers, and had to SSH into bobby first." (https://tux.cs.unlv.edu/index.php?title=Linux_Guide and …?title=Submit_script, both now 404.)
- The old wiki had a dedicated PuTTY page (search result title "UNLV | Tux Instructional Lab," URL https://tux.cs.unlv.edu/index.php?title=Putty, now 404), indicating PuTTY was the documented Windows client for the CS servers. The page content could not be retrieved.
- No date for the decommissioning itself could be pinned; it falls somewhere between the September 2020 sally upgrade and the 2025 site rebuild that already describes the trio in the past tense. **[unconfirmed date]**
- **Live probes (2026-08-17, from off-campus):** all three hostnames still resolve in public DNS (bobby 131.216.23.6, sally 131.216.23.103 — both matching the snippet IPs — and cardiac). `sally` and `cardiac` do not answer on port 22 from off campus (dead or firewalled). But **`bobby.cs.unlv.edu` is alive and answers SSH publicly with the banner `SSH-2.0-OpenSSH_7.4`**. OpenSSH 7.4 was released in December 2016 and is the version shipped with CentOS/RHEL 7 (CentOS 7 reached end-of-life June 30, 2024). A public-facing student login server presenting a 2016-era SSH daemon in August 2026 is primary, datable evidence of an unmaintained system — and it partially contradicts the "decommissioned" snippet: bobby may be administratively retired, but the machine is still up, still exposed, and still running decade-old software. **[verified by direct banner grab]**

An older, retrievable secondary source corroborates the bobby/cardiac era: the **UNLV CS 135 Lab Manual, "prepared by Lee Misch revised August 2012"** (mirrored on yumpu.com), states that "bobby.cs.unlv.edu is a Linux general purpose login machine that is available to provide remote access to CS computing resources for students currently enrolled in CS courses," that "cardiac.cs.unlv.edu and java.cs.unlv.edu are also available for remote login," and that the TBE lab computers were "dual boot machines" running "either Windows 7 or Linux" (CentOS 6.0). Its Windows instructions target the old ssh.com "Secure Shell Client." **[verified as a fetched mirror of a 2012 document]** (https://www.yumpu.com/en/document/view/9301261/unlv-computer-science-department-cs-135-lab-manual, accessed 2026-08-16.) A departmental "linuxmanual8_08.pdf" (August 2008) formerly at tux.cs.unlv.edu/lab_man/ appears in search indexes but now 404s. **[snippet]**

### 2.3 Course-facing environment for CS 202 / CS 218

- The official CS 218 syllabus template (April 2022 PDF on unlv.edu) describes the course and schedule but names no server or environment; infrastructure choices were evidently left to instructors. **[verified]** (https://www.unlv.edu/sites/default/files/media/document/2022-04/CS218-Syllabus.pdf, fetched and read in full.)
- The de facto CS 218 environment is documented by the course's long-time textbook: Ed Jorgensen's open textbook **"x86-64 Assembly Language Programming with Ubuntu,"** hosted on his UNLV College of Engineering page. The web page states the examples "have only been tested under Ubuntu 16/18/22 LTS (64-bit)," while the current PDF itself (title page: "Version 1.1.58, September 2024") narrows this to "they have only been tested under Ubuntu 22.04 LTS." Jorgensen's faculty page lists CS 218, CS 202, and eight other courses. Notably, both pages are reachable only over plain HTTP — `https://www.egr.unlv.edu/~ed/` refuses connections — a small but telling indicator of legacy hosting, though the content is not abandoned: HTTP headers show x86.html last modified June 5, 2024 and assembly64.pdf last modified September 15, 2024. **[verified]** (http://www.egr.unlv.edu/~ed/x86.html and http://www.egr.unlv.edu/~ed/assembly64.pdf, fetched with headers and full text 2026-08-16.)
- UNLV's central IT still lists **"Oracle VirtualBox (Ubuntu)"** as student software, but only in six campus lab rooms (BEH 114/219, CHB C125/C129, TBE A311, TBE B367), with no version stated and no personal-download path. It also still lists the antique **"SSH Secure Shell"** Windows client ("supported by Rebelmail") across 16 lab locations. **[verified]** (https://www.it.unlv.edu/software/oracle-virtualbox-ubuntu and https://www.it.unlv.edu/software/ssh-secure-shell, accessed 2026-08-16.)
- No evidence was found of an officially distributed, department-blessed VirtualBox/VMware **image** for CS 202 or CS 218 coursework, current or historical; the owner's recollection of provided VMs "that haven't been updated in a while" could not be confirmed from public sources and may refer to lab-machine images, instructor-specific images distributed through WebCampus (not publicly indexable), or the Horizon VDI pools. **[unconfirmed]** (See §2.4 for the dedicated CS 218 / CS 370 VM investigation.)

### 2.4 Course-recommended VMs (CS 218 / CS 370)

The repo owner specifically remembers VMs being recommended to students in CS 218 (x86-64 assembly) and CS 370. This was investigated as a follow-up on August 16, 2026. First, the course identity: **CS 370 at UNLV is "Operating Systems"** — confirmed against multiple editions of the UNLV catalog (e.g., https://catalog.unlv.edu/preview_course_nopop.php?catoid=41&coid=196390). **[verified]** Findings, per course:

**CS 370.** The one full syllabus that could be retrieved — **Spring 2017, Dr. Jisoo Yang, "CS 370 – Operating Systems (Section 1002)"** — prescribes the departmental server, not a VM: "4 programming projects – must be written in C in Linux environment (cardiac.cs.unlv.edu)." **[verified]** (https://web.cs.unlv.edu/jisooy/class/cs370/cs370_syllabus_yang_spring_2017.pdf, fetched and read in full 2026-08-16.) That is direct primary evidence that as of 2017, CS 370's official environment was `cardiac` — one of the three servers since decommissioned (§2.2). Corroborating the era and content, former students' GitHub repos describe CS 370 at UNLV as "Operating Systems Projects … using the C language and xv6 operating system" (github.com/geonidas/OperatingSystems, created Dec 2021) and a Fall 2014 shell project (github.com/Oniel/CS370_Linux-Shell); xv6 is conventionally run under QEMU, which is VM tooling, but neither repo documents a distributed course VM image. **[verified repos; VM inference unconfirmed]** Notably, Yang's faculty page and its linked syllabi carry HTTP `Last-Modified: Sat, 28 Jan 2017` — the public faculty-page record of CS 370 has been frozen for nine years, so whatever replaced `cardiac` after its decommissioning (cyrus, Horizon VDI, or a self-installed VM) is documented only inside WebCampus, not publicly. **[verified headers]**

**CS 218.** The course's canonical environment is defined by Jorgensen's textbook (§2.3), which assumes the student has an Ubuntu system but — checked against the full extracted text of the September 2024 PDF — contains **no VM, VirtualBox, VMware, or dual-boot installation instructions at all** (zero occurrences of those terms), and its "Ubuntu References" section still points to "Getting Started with Ubuntu 16.04." So if CS 218 instructors recommended a specific VM image, that recommendation lived in section-level handouts or WebCampus, not in the public textbook or the official 2022 syllabus template (which names no environment, §2.3). **[verified negative in the public record]** Searches of unlv.edu/egr.unlv.edu, syllabus aggregators (Studocu, Course Hero titles), Reddit r/unlv, and GitHub student repos (e.g., baekdoug/SystemsProgUNLV, geonidas/AssemblySystemsProgramming, NagisitNaze/CS218) surfaced no downloadable `.ova`/`.vmdk` or "course VM" setup document for either course. **[verified negative searches]**

**Version/EOL context for the paper.** Because the textbook's tested targets across its life were Ubuntu 16.04, 18.04, and 22.04 LTS, any course VM built to match it would most plausibly have run one of those releases. As of August 2026: Ubuntu 16.04 LTS reached end of standard support in April 2021, 18.04 in May 2023, and 20.04 in May 2025 (22.04 remains in standard support until April 2027). If the owner's remembered VM ran 16.04 or 18.04, it is unambiguously past EOL today — but the actual image version must be confirmed from the syllabus or the image itself, since no public artifact ties a specific Ubuntu version to a distributed UNLV course VM. **[EOL dates are general knowledge; the VM's version is unconfirmed]**

**Archive status during this follow-up:** web.archive.org was still returning 503/"Temporarily Offline"; archive.ph/archive.today returned HTTP 429 (rate-limited) on both attempts; Google and Bing caches are no longer publicly served. Alternative-archive verification of the deleted tux pages therefore remains pending.

---

## 3. Access tooling students were told to use

| Tool | Institution | Evidence |
|---|---|---|
| MobaXterm (SSH + X11, Windows) | CSN | 2017 CIT Linux Lab Manual: the *only* Windows client it documents. "MobaXterm is installed on many CSN lab and classroom computers." **[verified]** |
| `ssh -X` + XQuartz (macOS/Linux) | CSN | 2017 manual, verbatim command shown in §1.2. **[verified]** |
| FileZilla / SFTP / SCP, port 22 | CSN | 2017 manual: "Configure your application to connect to bellagio.csn.edu. If necessary, specify port 22." **[verified]** |
| X2Go client | CSN | The current bellagio homepage HTML links "X2GoClient Download" (wiki.x2go.org) alongside "MobaXterm Home Edition" as the offered clients; X2Go is not present in the 2017 manual. **[verified]** |
| PuTTY | CSN | **Not found.** The 2017 CSN manual contains zero occurrences of "PuTTY" (checked against extracted text), and the current bellagio homepage links only X2Go and MobaXterm. If students used PuTTY at CSN it was informal, not the documented client. **[verified negative]** |
| PuTTY | UNLV | The old tux wiki had a dedicated Putty page (URL `…?title=Putty`, now 404) for connecting to the CS servers. **[snippet]** |
| ssh.com "SSH Secure Shell" client | UNLV | 2012 CS 135 manual instructions; still listed on UNLV IT's software pages in 2026. **[verified]** |
| `submit` script on bobby | UNLV | `/usr/bin/submit`, `submit file.cpp 01 instructor`; submission required SSHing into bobby even from lab machines. **[snippet]** |
| `turnin` (turnin-ng) on bellagio | CSN | 2017 manual: `turnin –c cs135 –p lab03 –v filename`. **[verified]** |
| UNLV VPN | UNLV | Required today for off-campus SSH to cyrus and for Horizon VDI. **[verified]** |
| Omnissa Horizon Client | UNLV | Current VDI path, server `workspaces.unlv.edu`, ACE login. **[verified]** |

Geographic restriction worth noting: CSN's 2017 manual states of bellagio, "This server is accessible only from within the United States." **[verified]**

---

## 4. Timeline of datable facts

| Date | Fact | Strength |
|---|---|---|
| Aug 2008 | UNLV departmental Linux lab manual `linuxmanual8_08.pdf` existed at tux.cs.unlv.edu | [snippet] |
| Aug 2012 | UNLV CS 135 Lab Manual (Lee Misch): bobby/cardiac/java login servers; labs dual-boot Windows 7 + CentOS 6.0 | [verified mirror] |
| 2015–2018 | CSN `/cit/` web materials created; directory index still frozen at those dates today | [verified] |
| Jan 28, 2017 | Last-Modified date of Jisoo Yang's faculty page and CS 370 syllabus PDF — public CS 370 record frozen since | [verified header] |
| Spring 2017 | CS 370 syllabus (Yang): projects "must be written in C in Linux environment (cardiac.cs.unlv.edu)" — no VM | [verified] |
| 2017-08-05 | CSN CIT Linux Lab Manual version still served as current in Aug 2026 | [verified] |
| Sep 15, 2024 | Jorgensen textbook PDF last modified; title page "Version 1.1.58, September 2024"; tested target narrowed to Ubuntu 22.04 LTS; no VM instructions | [verified] |
| Fall 2018 | CIT 151 syllabus hosted on bellagio faculty pages | [verified URL, seen in search] |
| Sep 28, 2020 | sally.cs.unlv.edu upgraded, new SSH keys — last confirmed maintenance event for the old UNLV trio | [snippet] |
| 2020–2025 | bobby, sally, cardiac decommissioned (exact date unknown); cyrus.cs.unlv.edu becomes the login server | [snippet; date unconfirmed] |
| ≈2025 | tux.cs.unlv.edu rebuilt as static "Student Center" (© 2025); old wiki and docs deleted; Omnissa Horizon VDI documented | [verified] |
| Jul 27, 2026 | bellagio.csn.edu homepage last modified | [verified header] |
| Aug 16, 2026 | bellagio SSH banner: OpenSSH 8.9p1 / Ubuntu 22.04 LTS, current patch level | [verified] |
| Aug 17, 2026 | bobby.cs.unlv.edu answers SSH publicly with banner OpenSSH 7.4 (released Dec 2016; CentOS/RHEL 7 era, CentOS 7 EOL Jun 2024); sally and cardiac resolve in DNS but do not answer port 22 off-campus | [verified probe] |
| Aug 17, 2026 | cyrus.cs.unlv.edu returns NXDOMAIN in public DNS; liveness unverifiable off-VPN | [verified probe] |

---

## 5. Confirmed vs. unconfirmed

| Claim | Status |
|---|---|
| CSN provides a student Linux login server, `bellagio.csn.edu`, for CIT/CS/IS courses (incl. CS 135, CS 202) | **Confirmed** (live homepage + served lab manual) |
| bellagio's OS is currently maintained (Ubuntu 22.04 LTS, patched) | **Confirmed** (SSH banner, 2026-08-16) |
| CSN's student documentation dates to 2017 and its CIT web materials to 2015–2018 | **Confirmed** |
| CSN documented client is MobaXterm / `ssh -X`, not PuTTY | **Confirmed** (PuTTY absent from the 2017 manual) |
| A server named "sally" belonged to CSN | **Not confirmed — contradicted**; sally was UNLV's (`sally.cs.unlv.edu`) |
| UNLV CS ran login servers bobby, sally, cardiac (131.216.23.x), later decommissioned | **Strongly supported but snippet-only** (source wiki deleted; Wayback offline during research — re-verify via web.archive.org when it is back up) |
| sally maintained at least through Sep 2020 (SSH key upgrade) | **Snippet-only** |
| Decommission date of bobby/sally/cardiac | **Unknown** (bounded 2020–2025) |
| OS versions run by bobby/sally/cardiac | **Partially known**: bobby presents OpenSSH 7.4 (Dec 2016 release, CentOS/RHEL 7 era) as of 2026-08-17; sally/cardiac unknown |
| bobby is still up and publicly answering SSH despite the "decommissioned" notice | **Confirmed** (direct banner grab, 2026-08-17) |
| UNLV's current documentation directs students to `cyrus.cs.unlv.edu` (SSH, VPN off-campus) and Omnissa Horizon VDI VMs | **Confirmed** (live instruction pages) — but cyrus itself is **NXDOMAIN in public DNS** (2026-08-17); its liveness needs an on-VPN test |
| UNLV distributed stale VirtualBox/VMware course images for CS 202/218 | **Not confirmed** (no public evidence either way; VirtualBox exists only as lab-room software) |
| CS 370 is Operating Systems at UNLV | **Confirmed** (catalog) |
| CS 370's official environment in 2017 was the departmental server `cardiac.cs.unlv.edu`, not a VM | **Confirmed** (Spring 2017 Yang syllabus PDF) |
| CS 370 used xv6 (typically QEMU-hosted) for projects in some semesters | **Supported by student repos**; no official document retrieved |
| A VM image was officially recommended/distributed for CS 218 or CS 370 | **Not confirmed publicly** — nothing in the textbook, syllabi, aggregators, Reddit, or GitHub; if it existed it was WebCampus-internal. The remembered VM's OS version and update state are for the owner to supply |
| PuTTY was the documented Windows client for UNLV CS servers | **Snippet-only** (dead wiki page titled "Putty") |

---

## 6. Use in the paper

Given the evidence strengths above, the historical-arc motivation can be phrased safely along these lines:

1. **Lead with the shared-login-server model, not with decay.** Both institutions' documented model for introductory C++ and systems courses has been a shared multi-user Linux server reached over SSH — `bellagio.csn.edu` at CSN (with MobaXterm/`ssh -X` and `turnin`) and, at UNLV, the now-decommissioned `bobby`/`sally`/`cardiac` trio (with PuTTY-era SSH and a `submit` script that required logging into bobby even from lab machines). The Docker IDE replaces exactly this: remote, shared, network-dependent, account-provisioned infrastructure gives way to a local, per-student, reproducible container.
2. **Be precise about what is stale.** The defensible claim is that the *documentation and workflow* are dated — CSN's current manual is Version 2017-08-05 and its CIT web materials are frozen at 2015–2018; UNLV's public CS 370 record has not been touched since January 2017 and still names a decommissioned server as the course environment — while CSN's server itself is not neglected (bellagio runs patched Ubuntu 22.04) and the CS 218 textbook is genuinely maintained (v1.1.58, September 2024, targeting Ubuntu 22.04). At UNLV, however, there is now one piece of direct staleness evidence: `bobby.cs.unlv.edu` — nominally decommissioned — still answers SSH publicly as of August 17, 2026 with an OpenSSH 7.4 banner, a daemon released in December 2016 whose host platform (CentOS/RHEL 7) reached end-of-life in June 2024. That single banner is citable, datable, and reproducible; use it as the concrete instance rather than a blanket "the servers were unpatched" claim.
3. **Frame UNLV's churn as the motivation.** UNLV's student infrastructure has turned over completely and somewhat opaquely: three named servers students built muscle memory around were decommissioned, the documentation wiki that described them was deleted (as of this writing it survives only in search-engine snippets), and the current answer is a VPN-gated login host plus OIT-monitored VDI sessions whose local state is "PERMANENTLY DELETED" outside the network drive. A local Docker/code-server IDE is immune to every one of those failure modes — decommissioning, VPN dependence, documentation loss, and ephemeral VM state — which is a stronger and better-evidenced argument than "the old servers were outdated."
4. **Correct the folklore explicitly if it appears.** If the paper mentions "sally," attribute it to UNLV CS (`sally.cs.unlv.edu`, decommissioned), not CSN; and if it mentions PuTTY at CSN, soften to "students commonly used SSH clients such as PuTTY or the officially documented MobaXterm," since CSN's manual never names PuTTY.
5. **Frame the VM claim carefully (CS 218 / CS 370).** The public record's silence about course VMs proves only one thing, and it is worth stating exactly: the VMs recommended in CS 218 and CS 370 have **no maintained public distribution or documentation channel** — no download page, no versioned artifact, no dated changelog. That absence is itself a legitimate contrast with the paper's Docker-based IDEs, whose images live on Docker Hub with public, dated tags that anyone can audit. But the *outdatedness* claim ("the VMs haven't been updated in a while") must not rest on absence of evidence: it needs to be evidenced by the syllabus text or by the VM image's own OS version, which can then be set against that release's end-of-life date (Ubuntu 16.04: EOL April 2021; 18.04: EOL May 2023; 20.04: EOL May 2025 — all past EOL as of August 2026; 22.04 supported until April 2027). **TODO (owner):** pull the exact VM/OS version string from a CS 218 or CS 370 syllabus, WebCampus handout, or the image itself (`lsb_release -a` or `/etc/os-release` inside the VM), and cite that alongside the EOL date; until then, phrase the paper's claim as "course VMs distributed through non-public channels, with no visible update or versioning trail," which §2.4 fully supports.
6. **Flag the re-verification step.** Before submission, re-pull https://tux.cs.unlv.edu/wiki/index.php/SSH_fingerprint and https://tux.cs.unlv.edu/alt-tux-docs/guide/servers.html from the Wayback Machine (it was offline on 2026-08-16) to convert the [snippet] citations for bobby/sally/cardiac into archival citations with snapshot dates.
