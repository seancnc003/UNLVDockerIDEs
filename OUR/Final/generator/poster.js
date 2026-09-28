// 48 x 36 inch research poster — pptxgenjs (revision 3: mirrors the written report)
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "POSTER", width: 48, height: 36 });
pres.layout = "POSTER";

const SCARLET = "B10202", INK = "22252B", MUTED = "5E5B55", TINT = "F5F4F0", LINE = "D9D6CF", WHITE = "FFFFFF", OK = "1F5FB0", PALE = "FBEAEA";
const FONT = "Arial";
const slide = pres.addSlide();
slide.background = { color: WHITE };

// ---------- title band ----------
const BAND = 4.7;
slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 48, h: BAND, fill: { color: SCARLET }, line: { color: SCARLET } });
slide.addText("Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education: An Evaluation on the Laptops Students Actually Own", {
  x: 0.9, y: 0.4, w: 36.6, h: 2.5, fontFace: FONT, fontSize: 56, bold: true, color: WHITE, isTextBox: true, margin: 0, valign: "middle", lineSpacingMultiple: 0.98,
});
slide.addText([
  { text: "Sean Cuenco", options: { bold: true } },
  { text: "   ·   Faculty Mentor: James Andro-Vasko, Ph.D.   ·   Department of Computer Science, University of Nevada, Las Vegas", options: {} },
], { x: 0.9, y: 3.05, w: 36.6, h: 0.75, fontFace: FONT, fontSize: 28, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
slide.addText("Summer Undergraduate Research Fellowship (SURF) 2026  ·  Office of Undergraduate Research, UNLV", {
  x: 0.9, y: 3.75, w: 36.6, h: 0.6, fontFace: FONT, fontSize: 22, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
slide.addText("Code, handouts, test script, raw results:\ngithub.com/seancnc003/UNLVDockerIDEs\n\nImages:\nhub.docker.com/r/seancnc/unlv-cpp-ide\nhub.docker.com/r/seancnc/unlv-x86-ide", {
  x: 38.0, y: 0.5, w: 9.1, h: 3.7, fontFace: FONT, fontSize: 19, color: WHITE, isTextBox: true, margin: 0, align: "right", valign: "middle", lineSpacingMultiple: 1.05,
});

// ---------- geometry ----------
const M = 0.9, GAP = 0.7, COLW = (48 - 2 * M - 2 * GAP) / 3; // 15.0
const colX = [M, M + COLW + GAP, M + 2 * (COLW + GAP)];
const TOP = BAND + 0.7;            // 5.4
const BOTTOM_BAND = 28.0;          // where the full-width band starts
const FOOT = 35.1;                 // last usable y
const BODY = 25, HEAD = 40, SMALL = 21, SUB = 28;

function header(x, y, w, text, h = 0.95) {
  slide.addText(text, { x, y, w, h, fontFace: FONT, fontSize: HEAD, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "bottom" });
  return y + h + 0.15;
}
function subhead(x, y, w, text) {
  slide.addText(text, { x, y, w, h: 0.6, fontFace: FONT, fontSize: SUB, bold: true, color: INK, isTextBox: true, margin: 0, valign: "bottom" });
  return y + 0.7;
}
function text(x, y, w, h, parts, opts = {}) {
  const runs = Array.isArray(parts) ? parts : [{ text: parts }];
  slide.addText(runs.map((r) => ({ text: r.text, options: Object.assign({ fontFace: FONT, fontSize: opts.size || BODY, color: opts.color || INK, breakLine: !!r.br, bullet: r.bullet ? { indent: 30 } : undefined, paraSpaceAfter: opts.para == null ? 8 : opts.para }, r.options || {}) })), {
    x, y, w, h, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: opts.ls || 1.05,
  });
  return y + h;
}
function card(x, y, w, h, color = TINT) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color }, line: { color } });
}
const hdrCell = (t, align) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: INK }, align } });

// ================= COLUMN 1: abstract, background, UNLV path =================
let x = colX[0], w = COLW, y = TOP;

// Abstract (boxed)
card(x, y, w, 6.6);
slide.addText("Abstract", { x: x + 0.4, y: y + 0.25, w: w - 0.8, h: 0.7, fontFace: FONT, fontSize: 34, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
text(x + 0.4, y + 1.0, w - 0.8, 5.5,
  "Students in UNLV’s introductory C++ (CS 135) and x86-64 assembly (CS 218) courses lose the first week of the semester installing a compiler, assembler, debugger, and editor on dozens of different laptops, and owners of Apple Silicon Macs often cannot run the course virtual machine at all. This project packages each course’s exact toolchain and a browser-served Visual Studio Code editor into a Docker image that runs entirely on the student’s own machine: one 552 MB download, one command, no server, no account, no telemetry. The fellowship asked whether that promise holds on the computers students actually own, and what the design gives up compared with shared SSH servers, course virtual machines, cloud editors such as CS50 on GitHub Codespaces, and monitored platforms such as CodeDive. One unmodified test script performed a student’s first day and then built and ran four real CS 218 assignments on four hosts: Intel Linux and ARM Linux rented from AWS, Windows 11 rented from Azure, and an M1 MacBook Pro. The same image ran every assignment correctly on all four, started in 0.5 s natively and 5–7 s under emulation, and idled at 55–260 MiB. The one limit is precise: the gdb debugger works on Intel/AMD hosts and is silent under both ARM translation layers, a trade made deliberately to keep the course’s real x86-64 instruction set. A classroom study is the next step.",
  { size: 21, ls: 1.06, para: 0 });
y += 6.6 + 0.35;

y = header(x, y, w, "1   Background: week one is lost to setup");
y = text(x, y, w, 2.9,
  "Every systems course starts the same way: a compiler, an assembler, a debugger, and an editor must work on dozens of different laptops before anyone learns anything. Prior studies measured 75–100 minutes of class time per semester lost to installs [6], support traffic dominated by environment mismatch rather than course content [3], and students with M1/M2 MacBooks unable to run the x86 virtual machines their courses assumed [4]. Several hundred CS 135 and CS 218 students a year are affected, and the friction falls hardest on the cheapest and newest machines.");
y = subhead(x, y + 0.1, w, "Research questions answered before deployment");
y = text(x, y, w, 2.5, [
  { text: "RQ1 Reproducibility. ", options: { bold: true } }, { text: "Do the images run the documented workflows and real CS 218 assignments?", br: true },
  { text: "RQ2 Portability. ", options: { bold: true } }, { text: "Which operating systems and processors can run the assembly environment?", br: true },
  { text: "RQ3 Resource cost. ", options: { bold: true } }, { text: "Startup, storage, memory, compile time, and the emulation overhead on ARM.", br: true },
  { text: "RQ4 Persistence. ", options: { bold: true } }, { text: "Do student files survive replacing the container?", br: true },
  { text: "RQ5 Architecture fidelity. ", options: { bold: true } }, { text: "How far does an amd64-only image, including its debugger, work on ARM?" },
], { size: 22, para: 4 });

y = header(x, y + 0.15, w, "UNLV’s own path, one step behind the literature");
const stages = [
  ["1. Shared login servers over SSH (PuTTY)", "bobby, sally, cardiac: two decades of departmental Linux hosts and a submit script that required logging in even from the lab. Now decommissioned; the wiki documenting them was deleted in a 2025 site rebuild [12]."],
  ["2. Virtual machines, one per course", "CS 218 today: a 19 GB VirtualBox image for Intel and an experimental Fall-2023 image for Apple Silicon that emulates a whole x86-64 computer, so slowly the course warns VS Code “may not be usable.” Official advice for M1/M2 owners: go to the TBE-A311 lab with a USB drive."],
  ["3. A container on the student’s own laptop (this project)", "One 552 MB download, one command, VS Code in a browser tab. Files stay in a normal folder on the laptop. No server, no account, no VPN; works offline."],
];
const stageH = [2.0, 2.3, 1.8];
stages.forEach((s, i) => {
  const last = i === stages.length - 1;
  slide.addShape(pres.shapes.OVAL, { x, y: y + 0.12, w: 0.6, h: 0.6, fill: { color: last ? SCARLET : MUTED }, line: { color: last ? SCARLET : MUTED } });
  if (!last) slide.addShape(pres.shapes.LINE, { x: x + 0.3, y: y + 0.75, w: 0, h: stageH[i] - 0.75, line: { color: LINE, width: 4 } });
  slide.addText(s[0], { x: x + 0.9, y, w: w - 0.9, h: 0.8, fontFace: FONT, fontSize: 25, bold: true, color: last ? SCARLET : INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(s[1], { x: x + 0.9, y: y + 0.8, w: w - 0.9, h: stageH[i] - 0.8, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.04 });
  y += stageH[i];
});

// ================= COLUMN 2: methods =================
x = colX[1]; y = TOP;
y = header(x, y, w, "2   Methods: what we built");
y = text(x, y, w, 2.6,
  "Two Docker images, one per course, each packing code-server (VS Code served to the browser) with the exact toolchain the course expects: g++ for CS 135; yasm, nasm, ld, and gdb for CS 218. The instructor pins every version. The x86 image is deliberately amd64-only so students assemble and run real x86-64 binaries; on ARM hosts Docker runs it through a translation layer. Every AI feature in the editor is disabled per course policy.");
card(x, y, w, 1.05, INK);
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", {
  x: x + 0.35, y, w: w - 0.7, h: 1.05, fontFace: "Courier New", fontSize: 19, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
y += 1.05 + 0.3;
const figW = 7.8, figH = figW * (1560 / 1640);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: x + (w - figW) / 2, y, w: figW, h: figH });
y += figH + 0.1;
y = text(x, y, w, 0.85, [{ text: "Figure 1. ", options: { bold: true } }, { text: "One course IDE. Everything runs on the student’s machine; coursework lives in an ordinary host folder that survives deleting or updating the container. The only network dependency is the first download." }], { size: 20, color: MUTED, ls: 1.02 });

y = subhead(x, y + 0.15, w, "2.2  Evaluation: same exam, four kinds of computer");
y = text(x, y, w, 3.1,
  "We cannot borrow one of every laptop students own, so we rented them (Table 1). On each host the same unmodified script (ci-test.sh) performed a student’s first day and more: a timed download that records the image digest; a timed start until the editor answers; a starter-file check; three assemble-link-run cycles; a scripted gdb probe; idle memory; a timed build and run of four real CS 218 assignments (ast3, ast04, ast06, ast12, the last multithreaded) with peak memory sampled; and destruction and recreation of the container to check that files survive. Every number on this poster is transcribed from the JSON the script writes.");
y = text(x, y + 0.05, w, 0.55, [{ text: "Table 1. ", options: { bold: true } }, { text: "The four hosts. Cells 1 and 2 are same-size Intel/ARM siblings, so their comparison isolates emulation." }], { size: 20, color: MUTED, para: 0 });
const hosts = [
  [hdrCell("Cell"), hdrCell("Host"), hdrCell("OS / Docker"), hdrCell("x86 image")],
  ["1  Linux amd64", "AWS m8i.large, Intel Xeon, 2 vCPU / 8 GB", "Ubuntu 24.04, Docker Engine 29.1", "native"],
  ["2  Linux arm64", "AWS m8g.large, Graviton (ARM), 2 vCPU / 8 GB", "Ubuntu 24.04, Docker Engine 29.1, QEMU", "emulated"],
  ["3  Windows amd64", "Azure D4s_v5, Intel Xeon, 4 vCPU / 16 GB", "Windows 11 Pro 24H2, Docker Desktop, WSL2", "native"],
  ["4  macOS arm64", "MacBook Pro 14-inch (2021), M1 Pro, 16 GB, owned", "macOS 26.4, Docker Desktop 29.2 (Rosetta)", "emulated"],
];
slide.addTable(hosts.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0, color: ci === 3 && c === "emulated" ? SCARLET : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x, y, w, colW: [3.1, 5.4, 4.6, 1.9], fontFace: FONT, fontSize: 18, border: { type: "solid", pt: 1, color: LINE }, margin: 0.09, valign: "middle", rowH: [0.6, 0.85, 0.85, 0.85, 0.85],
});

// ================= COLUMN 3: results =================
x = colX[2]; y = TOP;
y = header(x, y, w, "3   Results");
const heroes = [["4 of 4", "hosts ran every real CS 218 assignment correctly, including the multithreaded one"], ["0.5 s", "until the editor is ready on Intel/AMD; 5–7 s under emulation; a course VM boots in minutes"], ["552 MB", "one-time download, byte-identical on every host, versus a 19 GB virtual machine"]];
const hw = (w - 2 * 0.35) / 3, hh = 2.75;
heroes.forEach((t, i) => {
  const hx = x + i * (hw + 0.35);
  card(hx, y, hw, hh);
  slide.addText(t[0], { x: hx + 0.25, y: y + 0.15, w: hw - 0.5, h: 1.05, fontFace: FONT, fontSize: 50, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.25, y: y + 1.2, w: hw - 0.5, h: 1.45, fontFace: FONT, fontSize: 18, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
y += hh + 0.35;

y = text(x, y, w, 0.55, [{ text: "Table 2. ", options: { bold: true } }, { text: "Selected results for the x86 image (all values from the unmodified script)." }], { size: 20, color: MUTED, para: 0 });
const res = [
  [hdrCell("Metric"), hdrCell("1 Linux\nnative", "center"), hdrCell("2 Linux ARM\nemulated", "center"), hdrCell("3 Windows 11\nnative", "center"), hdrCell("4 M1 Mac\nemulated", "center")],
  ["Debugger (gdb) probe", "working", "broken", "working", "broken"],
  ["Start until editor ready (s)", "0.5", "6.7", "0.6", "4.8"],
  ["Idle memory (MiB)", "54", "255", "56", "263"],
  ["Peak memory, coursework (MiB)", "n/a", "334", "90", "358"],
  ["ast06 build (s)", "0.2", "2.8", "0.5", "2.5"],
  ["ast12 build (s)", "0.3", "3.6", "0.6", "3.1"],
  ["All four assignments pass", "yes", "yes", "yes", "yes"],
  ["Files survive replacement", "yes", "yes", "yes", "yes"],
  ["Checks passed / failed", "13 / 0", "12 / 0", "13 / 0", "12 / 0"],
];
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "broken", align: ci ? "center" : "left", color: c === "broken" ? SCARLET : c === "working" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x, y, w, colW: [5.4, 2.4, 2.4, 2.4, 2.4], fontFace: FONT, fontSize: 18, border: { type: "solid", pt: 1, color: LINE }, margin: 0.08, valign: "middle", rowH: [0.95, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
});
y += 0.95 + 9 * 0.7 + 0.35;

slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor is ready", labels: ["2 Linux ARM (emulated)", "4 M1 Mac (emulated)", "3 Windows 11 (native)", "1 Linux (native)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x, y, w, h: 4.2, barDir: "bar", barGapWidthPct: 40,
  chartColors: [OK],
  showTitle: true, title: "Figure 2. Seconds until the editor is ready", titleFontFace: FONT, titleFontSize: 20, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 17, dataLabelColor: INK, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 17, catAxisLabelColor: INK, catAxisLabelFontFace: FONT, catAxisLineShow: false,
  valAxisLabelFontSize: 15, valAxisLabelColor: MUTED, valAxisLabelFontFace: FONT, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: LINE, size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
y += 4.2 + 0.3;
y = text(x, y, w, 2.85, [
  { text: "The support boundary is a translator boundary, not an operating-system boundary. ", options: { bold: true, color: SCARLET } },
  { text: "Windows and Linux on Intel/AMD are native and get everything; Windows 11, which dominates student laptops, was the strongest host in the matrix. Apple Silicon works because Apple supplies its Rosetta translator to Docker’s Linux VM. Emulation costs about one order of magnitude on builds (10–14×), yet every emulated build finished in under four seconds. The one loss is gdb: under translation a debugger script still “succeeds” and writes its file, but with no register values, so the handout tells Apple Silicon owners to produce debugger deliverables on an Intel machine. On ARM Linux the stock Ubuntu 24.04 QEMU crashed translating the editor itself; Docker’s own translator passed every check, so the fix is one line in the handout." },
], { size: SMALL });
y = text(x, y + 0.1, w, BOTTOM_BAND - 0.6 - (y + 0.1), [
  { text: "Where this sits. ", options: { bold: true, color: SCARLET } },
  { text: "CS50 took the container and browser editor to GitHub’s servers [1]; this project puts the same pair back on the student’s machine, and the measurements show the trade is affordable. Cadenas et al. kept a working debugger by changing the course’s instruction set to whatever the emulator provided [5]; this design keeps the real x86-64 instruction set and loses the debugger on ARM. Native hardware gets both; nothing on ARM yet does, and this evaluation makes that trade-off measured and explicit." },
], { size: SMALL });

// ================= BOTTOM BAND: discussion, next steps, references =================
slide.addShape(pres.shapes.LINE, { x: M, y: BOTTOM_BAND - 0.35, w: 48 - 2 * M, h: 0, line: { color: LINE, width: 3 } });
const wideW = 2 * COLW + GAP;
let by = header(colX[0], BOTTOM_BAND, wideW, "4   Discussion: every approach hands the setup burden to someone");
const burden = [
  [hdrCell("Approach"), hdrCell("Who carries the burden"), hdrCell("What it costs the student")],
  ["Shared login servers over SSH (UNLV bobby / sally / cardiac)", "The department", "Network and VPN dependence; the environment and its documentation vanish when the servers are retired"],
  ["Course virtual machines (CS 218 images; CS50 Appliance [2]; Reading’s QEMU lab [5])", "The student’s hardware", "Multi-gigabyte images, fixed RAM reservations, slow boots, disk corruption; unusable or very slow on Apple Silicon"],
  ["Cloud-hosted browser IDE (CS50 on GitHub Codespaces, 700,000+ users [1])", "A vendor, a grant, an account", "Internet required; the environment disappears with the account; students leave “not sure how to set up an IDE on my computer”"],
  ["Monitored classroom platform (CodeDive, South Korea [8])", "The institution’s cluster, and the student’s privacy", "Every process and every one-second typing pause recorded (24,845 snapshots from 95 students in two weeks); consent that cannot realistically be withheld"],
  ["Local container with browser editor (this project; cf. UCSD [3], Florida Tech [4])", "The student, once: install Docker Desktop", "One download and one command; offline afterward; files stay on the laptop; debugger unavailable on Apple Silicon and ARM"],
];
slide.addTable(burden.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0, color: ri === 5 ? SCARLET : INK, fill: { color: ri === 5 ? PALE : ri % 2 ? TINT : WHITE } } } : c))), {
  x: colX[0], y: by, w: wideW, colW: [10.2, 7.0, 13.5], fontFace: FONT, fontSize: 19, border: { type: "solid", pt: 1, color: LINE }, margin: 0.1, valign: "middle", rowH: [0.65, 1.05, 1.05, 1.05, 1.05, 1.05],
});

let ny = header(colX[2], BOTTOM_BAND, COLW, "5   What comes next");
ny = text(colX[2], ny, COLW, 2.95, [
  { text: "A classroom study in CS 218 and CS 135 with IRB approval: how many students reach a working setup without help, how many staff minutes it saves, and how students feel about it, using instruments adapted from [3, 4, 6]. A three-student high-school pilot has already run on the C++ image.", bullet: true, br: true },
  { text: "A hybrid assembly image for ARM that runs the editor natively and translates only the student’s program, which could restore the debugger on Apple Silicon and Windows-on-ARM.", bullet: true, br: true },
  { text: "Reuse the one-script, rent-four-computers method to vet environments for other courses, starting with Operating Systems.", bullet: true },
], { size: 20, para: 6, ls: 1.03 });
slide.addText("Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the repository under tests/record-results.", { x: colX[2], y: ny - 0.05, w: COLW, h: 0.75, fontFace: FONT, fontSize: 15, italic: true, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
ny += 0.75;
slide.addText("References (numbered as in the written report)", { x: colX[2], y: ny + 0.05, w: COLW, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: INK, isTextBox: true, margin: 0, valign: "bottom" });
const refs = [
  "[1] D. J. Malan. Containerizing CS50: Standardizing Students’ Programming Environments. ITiCSE 2024.",
  "[2] D. J. Malan. From Cluster to Cloud to Appliance. ITiCSE 2013.",
  "[3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.",
  "[4] K. Fernalld, T. OConnor, S. Sudhakaran, N. Nur. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.",
  "[5] J. O. Cadenas et al. Virtualization for Cost-Effective Teaching of Assembly Language Programming. IEEE Trans. Educ. 58(4), 2015.",
  "[6] D. P. Harvie, J. R. Cody, C. Morrell, T. T. Estes. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.",
  "[8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.",
  "[12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.",
];
slide.addText(refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1, paraSpaceAfter: 1 } })), { x: colX[2], y: ny + 0.5, w: COLW, h: FOOT - (ny + 0.5), fontFace: FONT, fontSize: 13.5, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });

pres.writeFile({ fileName: process.argv[2] || "poster.pptx" }).then((f) => console.log("wrote", f));
