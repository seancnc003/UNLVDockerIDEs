// 48 x 36 inch research poster — pptxgenjs
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const pres = new pptxgen();
pres.defineLayout({ name: "POSTER", width: 48, height: 36 });
pres.layout = "POSTER";

// palette
const SCARLET = "B10202", INK = "22252B", MUTED = "5E5B55", TINT = "F5F4F0", LINE = "D9D6CF", WHITE = "FFFFFF";
const NAT1 = "1F5FB0", NAT2 = "6FA8E8", EMU1 = "B10202", EMU2 = "E8776F"; // validated
const FONT = "Arial";

const slide = pres.addSlide();
slide.background = { color: WHITE };

// ---------- title band ----------
slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 48, h: 5.2, fill: { color: SCARLET }, line: { color: SCARLET } });
slide.addText("Every Student Gets the Same Classroom", {
  x: 1.2, y: 0.45, w: 34, h: 1.6, fontFace: FONT, fontSize: 84, bold: true, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
slide.addText("Decentralized, browser-based Docker IDEs for C++ and x86-64 assembly at UNLV, measured on the machines students actually own", {
  x: 1.2, y: 2.15, w: 34, h: 1.3, fontFace: FONT, fontSize: 36, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
slide.addText([
  { text: "Sean Cuenco", options: { bold: true } },
  { text: "  ·  Faculty Mentor: James Andro-Vasko, Ph.D.  ·  Department of Computer Science, University of Nevada, Las Vegas  ·  Office of Undergraduate Research SURF 2026", options: {} },
], { x: 1.2, y: 3.65, w: 40, h: 1.0, fontFace: FONT, fontSize: 26, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
// port / repo tag on the right of the band
slide.addText("github.com/seancnc003/UNLVDockerIDEs\nhub.docker.com/r/seancnc", {
  x: 36.5, y: 0.7, w: 10.3, h: 1.9, fontFace: "Courier New", fontSize: 22, color: WHITE, isTextBox: true, margin: 0, align: "right", valign: "top",
});

// ---------- column geometry ----------
const TOP = 5.9, GAP = 0.6, M = 1.0;
const colW = [14.6, 15.4, 15.4];
const colX = [M, M + colW[0] + GAP, M + colW[0] + GAP + colW[1] + GAP];
const BODY = 24, HEAD = 40, SMALL = 20;

function header(x, y, w, text) {
  slide.addText(text, { x, y, w, h: 0.9, fontFace: FONT, fontSize: HEAD, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  return y + 1.05;
}
function para(x, y, w, h, parts, opts = {}) {
  const runs = Array.isArray(parts) ? parts : [{ text: parts }];
  slide.addText(runs.map((r) => ({ text: r.text, options: Object.assign({ fontFace: FONT, fontSize: opts.size || BODY, color: INK, breakLine: !!r.br, bullet: r.bullet ? { indent: 28 } : undefined, paraSpaceAfter: r.bullet ? 6 : 8 }, r.options || {}) })), {
    x, y, w, h, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
  });
  return y + h;
}
function card(x, y, w, h) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.15, fill: { color: TINT }, line: { color: TINT } });
}

// ================= COLUMN 1 =================
let x = colX[0], w = colW[0], y = TOP;
y = header(x, y, w, "The problem");
y = para(x, y, w, 2.7, [
  { text: "Every systems course loses its first week to installing a compiler, an assembler, a debugger, and an editor on dozens of different laptops. Prior work measured 75–100 min of class time and 65–90 min of instructor time per semester lost to installation [6], and support traffic dominated by environment mismatch rather than course content [3]. Students with M1/M2 Macs often cannot run the x86 virtual machines their courses assume at all [4]." },
]);

y = header(x, y + 0.2, w, "UNLV followed the same arc, one stage behind");
// timeline: three stages
const stages = [
  ["Shared login servers (SSH / PuTTY)", "bobby · sally · cardiac, a submit script that required logging in even from lab machines. Decommissioned; the wiki that documented them was deleted in 2025."],
  ["Virtual machines, per course", "CS 218 today: a VirtualBox .ova for Intel and an experimental Fall-2023 UTM image for Apple Silicon so slow the course warns VS Code “may not be usable.” Primary M1/M2 advice: go to the TBE-A311 lab with a USB drive."],
  ["Local containers (this project)", "One 552 MB image, one command, VS Code in a browser tab. Files stay in a normal folder on the student’s disk. No server, no account, no VPN, offline after the first pull."],
];
stages.forEach((s, i) => {
  const cy = y + i * 2.0;
  const last = i === stages.length - 1;
  slide.addShape(pres.shapes.OVAL, { x: x, y: cy + 0.18, w: 0.55, h: 0.55, fill: { color: last ? SCARLET : MUTED }, line: { color: last ? SCARLET : MUTED } });
  if (!last) slide.addShape(pres.shapes.LINE, { x: x + 0.27, y: cy + 0.75, w: 0, h: 1.3, line: { color: LINE, width: 4 } });
  slide.addText(s[0], { x: x + 0.85, y: cy, w: w - 0.85, h: 0.85, fontFace: FONT, fontSize: 26, bold: true, color: last ? SCARLET : INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(s[1], { x: x + 0.85, y: cy + 0.78, w: w - 0.85, h: 1.2, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
});
y += stages.length * 2.0 + 0.1;

y = header(x, y + 0.1, w, "Where this sits in the design space");
const ds = [
  ["Harvard CS50 [1, 2]", "Cluster → cloud VMs → client-side appliance VM → Docker on GitHub Codespaces (700,000+ users). Browser VS Code, but the container runs on GitHub: account, network, provider dependence; students leave “not sure how to set up an IDE on my computer.”"],
  ["CodeDive, South Korea [8]", "Browser VS Code in per-student containers on a Kubernetes cluster, with kernel-level process tracing and a code snapshot after every 1 s typing pause (24,845 snapshots from 95 students in two weeks). Visibility for instructors, at the cost of telemetry and a GDPR/FERPA framework the authors have not yet built."],
  ["Virtual machines [5, 6, 7]", "Reading’s QEMU ARM emulator raised lab marks over six cohorts, but changed the course’s instruction set to keep gdb working. West Point’s server-hosted VMs halved class time lost to installs, but faculty ran the server fleet."],
  ["Local containers [3, 4]", "UCSD DevContainers (71% chose them over the campus server) and Florida Tech (84% adoption, 69% less anxious). Both found the hardest step is installing Docker itself, and novices struggle most."],
  ["UNLV Docker IDEs", "Local container + browser VS Code + host-owned files + no telemetry + AI surfaces disabled + real x86-64 ISA preserved, with the emulation boundary measured instead of ignored."],
];
ds.forEach((d, i) => {
  const cy = y + i * 2.05;
  const last = i === ds.length - 1;
  if (last) card(x - 0.2, cy - 0.12, w + 0.4, 2.0);
  slide.addText(d[0], { x, y: cy, w, h: 0.6, fontFace: FONT, fontSize: 24, bold: true, color: last ? SCARLET : INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(d[1], { x, y: cy + 0.58, w, h: 1.42, fontFace: FONT, fontSize: 19, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});

// ================= COLUMN 2 =================
x = colX[1]; w = colW[1]; y = TOP;
y = header(x, y, w, "The system");
y = para(x, y, w, 2.6, [
  { text: "Two Docker images built from Ubuntu 22.04 with code-server 4.126.0 (VS Code served to a browser on 127.0.0.1). CS 135: g++ 11.4, multi-arch, native on Intel and ARM. CS 218: yasm, nasm, ld, gdb 12.1, deliberately amd64-only so .asm files assemble and run as real x86-64 Linux binaries; ARM hosts run it under translation. Autosave, starter files seeded once, no restart policy, every AI feature disabled." },
]);
// architecture figure
const figW = 10.6, figH = figW * (1560 / 1640);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: x + (w - figW) / 2, y: y + 0.1, w: figW, h: figH });
y += figH + 0.25;
slide.addText("Figure 1. One course IDE. Everything runs on the student’s machine; the bind-mounted folder survives container and image replacement.", {
  x, y, w, h: 0.8, fontFace: FONT, fontSize: SMALL, italic: true, color: MUTED, isTextBox: true, margin: 0, valign: "top",
});
y += 1.0;

y = header(x, y + 0.1, w, "Method: one script, four machines");
y = para(x, y, w, 2.7, [
  { text: "One published script (ci-test.sh) runs unmodified on every host and emits a JSON row; every number here comes from those files. Nine stages: timed pull and digest · cold start to healthy · starter seeding · 3× assemble-link-run · scripted gdb probe · idle memory · tool versions · build + run of four real CS 218 assignments (ast3, ast04, ast06, ast12: pure assembly through multithreaded pthread + assembly with a checkable answer) with peak memory · destroy-and-recreate to test persistence and warm start." },
]);
// matrix table
const rows = [
  [{ text: "Cell", options: { bold: true, color: WHITE, fill: { color: INK } } }, { text: "Host", options: { bold: true, color: WHITE, fill: { color: INK } } }, { text: "x86 image", options: { bold: true, color: WHITE, fill: { color: INK } } }],
  ["1  Linux amd64", "AWS m8i.large · Ubuntu 24.04 · Intel Xeon 6975P-C · 2 vCPU / 8 GB", "native"],
  ["2  Linux arm64", "AWS m8g.large (Graviton) · Ubuntu 24.04 · Neoverse-V2 · 2 vCPU / 8 GB", "emulated (QEMU user-mode)"],
  ["3  Windows amd64", "Azure D4s_v5 · Windows 11 Pro 24H2 · Docker Desktop + WSL2 · 4 vCPU / 16 GB", "native"],
  ["4  macOS arm64", "MacBook Pro 14″ (2021), owned · M1 Pro · 16 GB · Docker Desktop", "emulated (Rosetta)"],
];
slide.addTable(rows.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0, color: INK, fill: { color: ri % 2 ? WHITE : TINT } } } : c))), {
  x, y: y + 0.1, w, colW: [3.1, 8.6, 3.7], fontFace: FONT, fontSize: 18, border: { type: "solid", pt: 1, color: LINE }, margin: 0.08, valign: "middle", rowH: 0.62,
});
y += 0.1 + 5 * 0.62 + 0.45;
slide.addText("Cloud machines were provisioned by hand from written runbooks and destroyed after each run: three of the four student environments summoned for cents to about a dollar each. Cells 1 and 2 are same-size Intel/Graviton siblings, so their ratio isolates the emulation layer. Cell 4 is the base-spec M1 Pro, not the 64 GB development machine, because that is what a budget-conscious student buys.", {
  x, y, w, h: 2.4, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02,
});

// ================= COLUMN 3 =================
x = colX[2]; w = colW[2]; y = TOP;
y = header(x, y, w, "Results");
// stat tiles: 3 across
const tiles = [
  ["4 / 4", "hosts ran every CS 218 assignment correctly, incl. multithreaded ast12 under emulation"],
  ["1 digest", "same 552 MB image, byte for byte, on Linux, Windows, and macOS"],
  ["0.5 s", "editor ready on native hosts; 5–7 s under emulation; 54 MiB idle native"],
];
const tw = (w - 2 * 0.35) / 3;
tiles.forEach((t, i) => {
  const tx = x + i * (tw + 0.35);
  card(tx, y, tw, 3.0);
  slide.addText(t[0], { x: tx + 0.25, y: y + 0.15, w: tw - 0.5, h: 1.25, fontFace: FONT, fontSize: 60, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: tx + 0.25, y: y + 1.4, w: tw - 0.5, h: 1.5, fontFace: FONT, fontSize: 18, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
y += 3.3;

// chart: build seconds per assignment, series grouped by mode
const chartData = [
  { name: "Linux amd64, native (cell 1)", labels: ["ast3", "ast04", "ast06", "ast12"], values: [0.0, 0.0, 0.2, 0.3] },
  { name: "Windows 11, native (cell 3)", labels: ["ast3", "ast04", "ast06", "ast12"], values: [0.2, 0.2, 0.5, 0.6] },
  { name: "Linux arm64, QEMU emulated (cell 2)", labels: ["ast3", "ast04", "ast06", "ast12"], values: [0.3, 0.3, 2.8, 3.6] },
  { name: "macOS M1 Pro, emulated (cell 4)", labels: ["ast3", "ast04", "ast06", "ast12"], values: [0.4, 0.4, 2.5, 3.1] },
];
slide.addChart(pres.charts.BAR, chartData, {
  x, y, w, h: 6.2, barDir: "col", barGrouping: "clustered", barGapWidthPct: 60,
  chartColors: [NAT1, NAT2, EMU1, EMU2],
  showTitle: true, title: "Build time of real CS 218 assignments (seconds, lower is better)", titleFontFace: FONT, titleFontSize: 22, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 14, dataLabelColor: INK, dataLabelFormatCode: "0.0",
  showLegend: true, legendPos: "b", legendFontFace: FONT, legendFontSize: 16, legendColor: INK,
  catAxisLabelFontSize: 18, catAxisLabelColor: INK, catAxisLabelFontFace: FONT, catAxisLineShow: false,
  valAxisLabelFontSize: 14, valAxisLabelColor: MUTED, valAxisLabelFontFace: FONT, valAxisMinVal: 0, valAxisMaxVal: 4, valAxisMajorUnit: 1, valAxisLineShow: false,
  valGridLine: { color: LINE, size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
y += 6.3;
slide.addText("Emulation costs roughly one order of magnitude on compile-heavy steps (ast06: 14× on QEMU, 12.5× on Docker Desktop; ast12: 12× and 10×), yet every emulated build finished in under 4 s. Peak memory during coursework: 90 MiB native, 334–358 MiB emulated, a small slice of an 8 GB laptop.", {
  x, y, w, h: 1.9, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02,
});
y += 2.05;

y = header(x, y, w, "What it runs on, and where it stops");
const sup = [
  [{ text: "Host", options: { bold: true, color: WHITE, fill: { color: INK } } }, { text: "Assemble / run", options: { bold: true, color: WHITE, fill: { color: INK } } }, { text: "gdb", options: { bold: true, color: WHITE, fill: { color: INK } } }, { text: "Evidence", options: { bold: true, color: WHITE, fill: { color: INK } } }],
  ["Windows or Linux on Intel / AMD", "works", "works", "cells 1, 3: 13/13 checks"],
  ["Apple Silicon Mac", "works", "broken", "cell 4: 12/12, gdb probe silent"],
  ["ARM Linux", "works with Docker’s binfmt handler", "broken", "cell 2: stock QEMU 8.2.2 crashed (SIGSEGV in the editor’s JIT), reproduced; passed 12/12 after switching handler"],
  ["Windows on ARM", "expected like cell 4", "expected broken", "untestable in any cloud: no nested virtualization on ARM VMs"],
  ["Intel Mac", "expected native", "expected works", "untested; no hardware"],
];
slide.addTable(sup.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0, color: ri >= 4 ? MUTED : INK, fill: { color: ri % 2 ? WHITE : TINT } } } : c))), {
  x, y: y + 0.05, w, colW: [3.6, 3.4, 2.2, 6.2], fontFace: FONT, fontSize: 16, border: { type: "solid", pt: 1, color: LINE }, margin: 0.07, valign: "middle", rowH: 0.62,
});
y += 0.05 + 6 * 0.62 + 0.55;
slide.addText([
  { text: "The boundary is a translator boundary, not an OS boundary. ", options: { bold: true, color: SCARLET } },
  { text: "The image runs wherever the layer hosting Docker’s Linux environment needs no translation or receives a Rosetta-class one. Under translation a gdb script still “succeeds” and writes its file, but with labels and no register values, so the handouts tell students to produce debugger deliverables on a native x86 machine." },
], { x, y, w, h: 2.5, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });

// ---------- bottom band: future work + references ----------
const BY = 30.9;
slide.addShape(pres.shapes.LINE, { x: M, y: BY - 0.35, w: 48 - 2 * M, h: 0, line: { color: LINE, width: 3 } });
let fy = header(colX[0], BY, colW[0] + GAP + colW[1], "Next");
slide.addText([
  { text: "Classroom study in CS 218 and CS 135 (IRB): setup-success funnel, staff minutes, forum traffic, pre/mid/post anxiety and setup-difficulty items adapted from [3, 4, 6]. A pilot in a 3-student high-school class ran without metrics.", options: { bullet: { indent: 28 }, breakLine: true, paraSpaceAfter: 6 } },
  { text: "Hybrid arm64 assembly image: editor and toolchain native on ARM, x86 cross-assembler emits real x86-64 binaries, translator runs only student programs, gdb via QEMU’s built-in stub. One variant covers ARM Linux and Windows-on-ARM.", options: { bullet: { indent: 28 }, breakLine: true, paraSpaceAfter: 6 } },
  { text: "Close the two untested cells with physical hardware; reuse the one-script, cloud-rented matrix for other courses (e.g., CS 370).", options: { bullet: { indent: 28 } } },
], { x: colX[0], y: fy, w: colW[0] + GAP + colW[1] - 0.4, h: 3.6, fontFace: FONT, fontSize: 21, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });

let ry = header(colX[2], BY, colW[2], "References");
const refs = [
  "[1] Malan. Containerizing CS50. ITiCSE 2024.",
  "[2] Malan. From Cluster to Cloud to Appliance. ITiCSE 2013.",
  "[3] Valstar, Griswold, Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.",
  "[4] Fernalld, OConnor, Sudhakaran, Nur. Lightweight Symphony. SIGITE 2023.",
  "[5] Cadenas et al. Virtualization for Cost-Effective Teaching of Assembly Language Programming. IEEE Trans. Educ. 2015.",
  "[6] Harvie, Cody, Morrell, Estes. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.",
  "[7] Laadan, Nieh, Viennot. Teaching OS Using Virtual Appliances. SIGCSE 2010.",
  "[8] Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 2025.",
];
slide.addText(refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1, paraSpaceAfter: 3 } })), {
  x: colX[2], y: ry, w: colW[2], h: 3.3, fontFace: FONT, fontSize: 14, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0,
});
slide.addText("Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Raw record-run JSONs, transcripts, and diagnostics are archived in the repository (tests/record-results).", {
  x: colX[2], y: ry + 3.35, w: colW[2], h: 0.9, fontFace: FONT, fontSize: 13, italic: true, color: MUTED, isTextBox: true, margin: 0, valign: "top",
});

pres.writeFile({ fileName: process.argv[2] || "poster.pptx" }).then((f) => console.log("wrote", f));
