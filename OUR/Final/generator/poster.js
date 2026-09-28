// 48 x 36 inch research poster — pptxgenjs (revision 2: promise → proof narrative)
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "POSTER", width: 48, height: 36 });
pres.layout = "POSTER";

const SCARLET = "B10202", INK = "22252B", MUTED = "5E5B55", TINT = "F5F4F0", LINE = "D9D6CF", WHITE = "FFFFFF", OK = "1F5FB0";
const FONT = "Arial";

const slide = pres.addSlide();
slide.background = { color: WHITE };

// ---------- title band ----------
slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 48, h: 5.2, fill: { color: SCARLET }, line: { color: SCARLET } });
slide.addText("Every Student Gets the Same Classroom", { x: 1.2, y: 0.45, w: 34, h: 1.6, fontFace: FONT, fontSize: 84, bold: true, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
slide.addText("Does the same programming environment run on every student’s laptop? Browser-based Docker IDEs for UNLV’s C++ and x86-64 assembly courses, tested on the operating systems and processors students own", {
  x: 1.2, y: 2.15, w: 36, h: 1.3, fontFace: FONT, fontSize: 32, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
slide.addText([
  { text: "Sean Cuenco", options: { bold: true } },
  { text: "  ·  Faculty Mentor: James Andro-Vasko, Ph.D.  ·  Department of Computer Science, University of Nevada, Las Vegas  ·  Office of Undergraduate Research SURF 2026", options: {} },
], { x: 1.2, y: 3.65, w: 40, h: 1.0, fontFace: FONT, fontSize: 26, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
slide.addText("github.com/seancnc003/UNLVDockerIDEs\nhub.docker.com/r/seancnc", { x: 36.5, y: 0.7, w: 10.3, h: 1.9, fontFace: "Courier New", fontSize: 22, color: WHITE, isTextBox: true, margin: 0, align: "right", valign: "top" });

// ---------- geometry ----------
const TOP = 5.9, GAP = 0.6, M = 1.0;
const colW = [14.6, 15.4, 15.4];
const colX = [M, M + colW[0] + GAP, M + colW[0] + GAP + colW[1] + GAP];
const BODY = 24, HEAD = 40, SMALL = 20;

function header(x, y, w, text) {
  slide.addText(text, { x, y, w, h: 0.9, fontFace: FONT, fontSize: HEAD, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  return y + 1.05;
}
function text(x, y, w, h, parts, opts = {}) {
  const runs = Array.isArray(parts) ? parts : [{ text: parts }];
  slide.addText(runs.map((r) => ({ text: r.text, options: Object.assign({ fontFace: FONT, fontSize: opts.size || BODY, color: opts.color || INK, breakLine: !!r.br, bullet: r.bullet ? { indent: 28 } : undefined, paraSpaceAfter: 6 }, r.options || {}) })), {
    x, y, w, h, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.04,
  });
  return y + h;
}
function card(x, y, w, h, color = TINT) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.15, fill: { color }, line: { color } });
}
const hdrCell = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: INK } } });

// ================= COLUMN 1: the problem, the arc, who carries the burden =================
let x = colX[0], w = colW[0], y = TOP;
y = header(x, y, w, "The problem: week one is lost to setup");
y = text(x, y, w, 3.9, [
  { text: "Every systems course starts the same way: a compiler, an assembler, a debugger, and an editor have to work on dozens of different laptops before anyone learns anything. Prior studies measured 75–100 minutes of class time per semester lost to installs [6], support traffic dominated by “it works on my machine” [3], and students with Apple Silicon Macs unable to run the course’s virtual machine at all [4]. At UNLV this touches several hundred CS 135 and CS 218 students every year." },
]);

y = header(x, y + 0.1, w, "UNLV followed the same path as everyone else, one step behind");
const stages = [
  ["1. Shared login servers (SSH, PuTTY)", "bobby · sally · cardiac. Now decommissioned, and the wiki that documented them was deleted in 2025."],
  ["2. Virtual machines, one per course", "CS 218 today: a 19 GB VirtualBox image for Intel and an experimental 2023 image for Apple Silicon so slow the course warns the editor “may not be usable.” Official advice for M1/M2 owners: go to the lab with a USB drive."],
  ["3. A container on the student’s own laptop (this project)", "One 552 MB download, one command, VS Code in a browser tab. Files stay in a normal folder on the laptop. No server, no account, no VPN, works offline."],
];
stages.forEach((s, i) => {
  const cy = y + i * 2.05;
  const last = i === stages.length - 1;
  slide.addShape(pres.shapes.OVAL, { x, y: cy + 0.16, w: 0.55, h: 0.55, fill: { color: last ? SCARLET : MUTED }, line: { color: last ? SCARLET : MUTED } });
  if (!last) slide.addShape(pres.shapes.LINE, { x: x + 0.27, y: cy + 0.75, w: 0, h: 1.35, line: { color: LINE, width: 4 } });
  slide.addText(s[0], { x: x + 0.85, y: cy, w: w - 0.85, h: 0.8, fontFace: FONT, fontSize: 25, bold: true, color: last ? SCARLET : INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(s[1], { x: x + 0.85, y: cy + 0.78, w: w - 0.85, h: 1.25, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
});
y += stages.length * 2.05 + 0.15;

y = header(x, y + 0.1, w, "Every approach hands the setup burden to someone");
const burden = [
  [hdrCell("Approach"), hdrCell("Who carries it"), hdrCell("What the student pays")],
  ["Shared servers (UNLV, CSN)", "The department", "Needs network + VPN; everything vanishes when the server is retired"],
  ["Course virtual machines (UNLV, Harvard 2011 [2], Reading [5])", "The student’s hardware", "Multi-GB images, slow boots, disk corruption; broken on Apple Silicon"],
  ["Cloud editor (Harvard CS50 on GitHub Codespaces [1])", "A vendor, a grant, an account", "Internet required; students leave “not sure how to set up an IDE on my computer”"],
  ["Monitored platform (CodeDive, South Korea [8])", "The university’s cluster, and the student’s privacy", "Every command and every 1-second typing pause is recorded"],
  ["Local container (this project; cf. UCSD [3], Florida Tech [4])", "The student, once: install Docker", "One download, one command, then nothing"],
];
slide.addTable(burden.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0, color: ri === 5 ? SCARLET : INK, fill: { color: ri === 5 ? "FBEAEA" : ri % 2 ? WHITE : TINT } } } : c))), {
  x, y: y + 0.05, w, colW: [4.6, 4.0, 6.0], fontFace: FONT, fontSize: 17, border: { type: "solid", pt: 1, color: LINE }, margin: 0.08, valign: "middle", rowH: 0.95,
});

// ================= COLUMN 2: what we built, how we tested =================
x = colX[1]; w = colW[1]; y = TOP;
y = header(x, y, w, "What we built");
y = text(x, y, w, 2.55, [
  { text: "Two Docker images, one per course, each packing VS Code (served to the browser) with the exact tools the course expects: g++ for CS 135; yasm, nasm, ld, and gdb for CS 218. The instructor pins every version. The student installs Docker Desktop once, runs one command, and opens a browser tab. Every AI feature in the editor is switched off, per course policy." },
]);
card(x, y, w, 1.15, INK);
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", {
  x: x + 0.3, y, w: w - 0.6, h: 1.15, fontFace: "Courier New", fontSize: 17, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
y += 1.4;
const figW = 9.6, figH = figW * (1560 / 1640);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: x + (w - figW) / 2, y, w: figW, h: figH });
y += figH + 0.15;
y = text(x, y, w, 0.8, "Figure 1. Everything runs on the student’s machine. Coursework lives in an ordinary folder that survives deleting or updating the container.", { size: SMALL, color: MUTED });

y = header(x, y + 0.15, w, "How we tested it: same exam, four kinds of computer");
y = text(x, y, w, 2.5, [
  { text: "We cannot borrow one of every laptop students own, so we rented them: for a few dollars total, AWS and Azure supplied a fresh Intel Linux machine, an ARM Linux machine, and a Windows 11 machine, and a base-model M1 MacBook Pro stood in for Apple Silicon. On each, one published script performed a student’s first day (download, open the editor, write, assemble, run, debug) and then built and ran four real CS 218 assignments, writing down everything it observed." },
]);
// four machine cards
const machines = [
  ["Windows 11 PC", "Intel / AMD", "✓ all assignments", "✓ debugger"],
  ["Linux PC", "Intel / AMD", "✓ all assignments", "✓ debugger"],
  ["Apple Silicon Mac", "M1 Pro, 16 GB", "✓ all assignments", "✗ debugger silent*"],
  ["Linux on ARM", "AWS Graviton", "✓ all assignments†", "✗ debugger silent*"],
];
const mw = (w - 3 * 0.3) / 4;
machines.forEach((m, i) => {
  const mx = x + i * (mw + 0.3);
  card(mx, y, mw, 3.3);
  slide.addText(m[0], { x: mx + 0.2, y: y + 0.15, w: mw - 0.4, h: 0.7, fontFace: FONT, fontSize: 21, bold: true, color: INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(m[1], { x: mx + 0.2, y: y + 0.8, w: mw - 0.4, h: 0.5, fontFace: FONT, fontSize: 16, color: MUTED, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(m[2], { x: mx + 0.2, y: y + 1.45, w: mw - 0.4, h: 0.75, fontFace: FONT, fontSize: 19, bold: true, color: OK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(m[3], { x: mx + 0.2, y: y + 2.2, w: mw - 0.4, h: 0.75, fontFace: FONT, fontSize: 19, bold: true, color: m[3].startsWith("✓") ? OK : SCARLET, isTextBox: true, margin: 0, valign: "middle" });
});
y += 3.45;
y = text(x, y, w, 1.6, "* Under translation the debugger appears to finish but writes no values, so debugger assignments need an Intel/AMD machine; the student handout says so.  † Needs Docker’s own translator; the one that ships with Ubuntu 24.04 crashed, which we reproduced and documented.", { size: 16, color: MUTED });

// ================= COLUMN 3: what we found =================
x = colX[2]; w = colW[2]; y = TOP;
y = header(x, y, w, "What we found");
const tiles = [
  ["4 of 4", "kinds of computer ran every real CS 218 assignment correctly, including the multithreaded one"],
  ["Identical", "the same 552 MB file, byte for byte, on Windows, macOS, and Linux: the promise a VM could never make"],
  ["0.5 s", "until the editor is ready on Intel/AMD machines; about 5 s on Apple Silicon; a VM boots in minutes"],
  ["552 MB", "one-time download, versus the 19 GB virtual machine the course distributes today"],
  ["< $10", "to rent every test machine, failed attempts included; students pay nothing and need no account"],
  ["1 limit", "the debugger goes silent on Apple Silicon and ARM, and we can say exactly why"],
];
const tw = (w - 0.35) / 2, th = 2.6;
tiles.forEach((t, i) => {
  const tx = x + (i % 2) * (tw + 0.35), ty = y + Math.floor(i / 2) * (th + 0.3);
  card(tx, ty, tw, th, i === 5 ? "FBEAEA" : TINT);
  slide.addText(t[0], { x: tx + 0.3, y: ty + 0.15, w: tw - 0.6, h: 1.1, fontFace: FONT, fontSize: 54, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: tx + 0.3, y: ty + 1.25, w: tw - 0.6, h: 1.3, fontFace: FONT, fontSize: 18, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
y += 3 * (th + 0.3) + 0.1;

// simple chart: seconds until editor ready
slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor is ready", labels: ["Linux on ARM", "Apple Silicon Mac", "Linux PC", "Windows 11 PC"], values: [6.7, 4.8, 0.5, 0.6] }], {
  x, y, w, h: 4.6, barDir: "bar", barGapWidthPct: 45,
  chartColors: [OK],
  showTitle: true, title: "Seconds until the editor is ready (a course VM takes minutes)", titleFontFace: FONT, titleFontSize: 21, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 16, dataLabelColor: INK, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 17, catAxisLabelColor: INK, catAxisLabelFontFace: FONT, catAxisLineShow: false,
  valAxisLabelFontSize: 14, valAxisLabelColor: MUTED, valAxisLabelFontFace: FONT, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: LINE, size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
y += 4.75;
y = text(x, y, w, 3.0, [
  { text: "Why the limit exists, in one sentence. ", options: { bold: true, color: SCARLET } },
  { text: "The assembly image is x86-64 on purpose, because the course teaches x86-64; on ARM chips it runs through a translator, and today’s translators run the programs correctly but cannot support the debugger. Windows and Intel machines, most of the class, get everything. Under translation a debugger script still “succeeds” and writes its output file, but with none of the values, which is why the student handout tells Apple Silicon owners to produce debugger deliverables on an Intel machine." },
], { size: SMALL });

// ---------- bottom band ----------
const BY = 30.9;
slide.addShape(pres.shapes.LINE, { x: M, y: BY - 0.35, w: 48 - 2 * M, h: 0, line: { color: LINE, width: 3 } });
let fy = header(colX[0], BY, colW[0] + GAP + colW[1], "What comes next");
text(colX[0], fy, colW[0] + GAP + colW[1] - 0.4, 3.6, [
  { text: "Run it in a real section of CS 218 and CS 135 and measure what only a classroom can: how many students reach a working setup without help, how many staff minutes it saves, and how students feel about it, using survey instruments adapted from [3, 4, 6]. A three-student pilot class has already run on it.", bullet: true, br: true },
  { text: "Build a second assembly image for ARM chips that keeps the editor native and translates only the student’s program, which could bring the debugger back to Apple Silicon and Windows-on-ARM laptops.", bullet: true, br: true },
  { text: "Reuse the rent-four-computers, one-script method to evaluate environments for other courses (Operating Systems next).", bullet: true },
], { size: 21 });

let ry = header(colX[2], BY, colW[2], "References");
const refs = [
  "[1] Malan. Containerizing CS50. ITiCSE 2024.",
  "[2] Malan. From Cluster to Cloud to Appliance. ITiCSE 2013.",
  "[3] Valstar, Griswold, Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.",
  "[4] Fernalld, OConnor, Sudhakaran, Nur. Lightweight Symphony. SIGITE 2023.",
  "[5] Cadenas et al. Virtualization for Cost-Effective Teaching of Assembly Language Programming. IEEE Trans. Educ. 2015.",
  "[6] Harvie, Cody, Morrell, Estes. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.",
  "[8] Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 2025.",
];
slide.addText(refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1, paraSpaceAfter: 3 } })), { x: colX[2], y: ry, w: colW[2], h: 3.0, fontFace: FONT, fontSize: 14, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
slide.addText("Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the repository (tests/record-results). Reference numbers match the written report.", {
  x: colX[2], y: ry + 3.05, w: colW[2], h: 1.0, fontFace: FONT, fontSize: 13, italic: true, color: MUTED, isTextBox: true, margin: 0, valign: "top",
});

pres.writeFile({ fileName: process.argv[2] || "poster.pptx" }).then((f) => console.log("wrote", f));
