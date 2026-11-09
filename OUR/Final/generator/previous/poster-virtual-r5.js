// 56 x 31.5 inch virtual symposium poster — pptxgenjs, laid out on the OUR "SampleVirtualPosterTemplate3" skeleton
// (scarlet header band, grey body, Georgia headings, white bordered boxes). Revision 3 (judge-driven):
// claims kept inside the evidence, measurement boundaries stated, key terms box, findings / explanation / consequence split.
// Revision 4: larger callout labels, shorter Discussion/Purpose/Conclusions, Methods split into a plain route + technical details.
// Revision 5: readability pass — bigger card labels and table type, plain words at point of use, Figure 1 redrawn natively with readable labels.
// Run: NODE_PATH=<dir with node_modules> node poster-virtual.js out.pptx && python3 finish-virtual.py out.pptx
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "VPOSTER", width: 56, height: 31.5 });
pres.layout = "VPOSTER";
pres.author = "Sean Cuenco"; pres.title = "Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education";

const SCARLET = "B10202", INK = "000000", GREY = "666666", MUTED = "444444", WHITE = "FFFFFF", LINE = "000000", TINT = "F2F2F2", PALE = "FBEAEA", OK = "1F5FB0";
const HEADF = "Georgia", BODYF = "Times New Roman", MONO = "Courier New";
const BODY = 32, HEAD = 56;
const slide = pres.addSlide(); // background gradient is injected afterwards from the template (see finish-virtual.py)

// ---------- header band (template: logo left, title centre, extra block right) ----------
slide.addImage({ path: __dirname + "/unlv-logo.png", x: 1.33, y: 1.9, w: 9.33, h: 2.74 });
slide.addText("Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education: An Evaluation on the Laptops Students Actually Own", {
  x: 11.6, y: 0.35, w: 33.4, h: 2.75, fontFace: HEADF, fontSize: 64, color: WHITE, isTextBox: true, margin: 0, align: "center", valign: "middle", lineSpacingMultiple: 0.95,
});
slide.addText([
  { text: "Sean Cuenco", options: { bold: true, breakLine: true } },
  { text: "Department of Computer Science, University of Nevada, Las Vegas", options: { breakLine: true } },
  { text: "Faculty Research Mentor: James Andro-Vasko, Ph.D.", options: { breakLine: true } },
  { text: "Department of Computer Science, University of Nevada, Las Vegas" },
], { x: 11.6, y: 3.2, w: 33.4, h: 3.0, fontFace: HEADF, fontSize: 36, color: WHITE, isTextBox: true, margin: 0, align: "center", valign: "top", lineSpacingMultiple: 1.0 });
slide.addText([
  { text: "Summer Undergraduate Research Fellowship 2026", options: { bold: true, breakLine: true } },
  { text: "Office of Undergraduate Research, UNLV", options: { breakLine: true } },
  { text: " ", options: { fontSize: 14, breakLine: true } },
  { text: "Code, handouts, test script, raw results:", options: { breakLine: true } },
  { text: "github.com/seancnc003/UNLVDockerIDEs", options: { breakLine: true } },
  { text: "hub.docker.com/r/seancnc/unlv-cpp-ide", options: { breakLine: true } },
  { text: "hub.docker.com/r/seancnc/unlv-x86-ide" },
], { x: 45.4, y: 0.9, w: 9.5, h: 4.8, fontFace: HEADF, fontSize: 24, color: WHITE, isTextBox: true, margin: 0, align: "center", valign: "middle", lineSpacingMultiple: 1.05 });

// ---------- template skeleton ----------
const LX = 1.25, LW = 16.04, MX = 18.71, MW = 18.54, RX = 38.47, RW = 16.04;
const HH = 0.95, PAD = 0.3, GAPV = 0.3, BOTTOM = 30.5;
function heading(x, y, w, t) {
  slide.addText(t, { x, y, w, h: HH, fontFace: HEADF, fontSize: HEAD, bold: true, color: WHITE, isTextBox: true, margin: 0, align: "center", valign: "middle",
    shadow: { type: "outer", blur: 4, offset: 3, angle: 45, color: "000000", opacity: 0.45 } });
  return y + HH + 0.1;
}
function box(x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: WHITE }, line: { color: LINE, width: 0.5 },
    shadow: { type: "outer", blur: 8, offset: 4, angle: 45, color: "000000", opacity: 0.4 } });
}
function para(x, y, w, h, parts, o = {}) {
  const runs = (Array.isArray(parts) ? parts : [{ text: parts }]).map((r) => ({ text: r.text, options: Object.assign({ fontFace: o.font || BODYF, fontSize: o.size || BODY, color: o.color || INK, breakLine: !!r.br, paraSpaceAfter: o.para == null ? 10 : o.para }, r.options || {}) }));
  slide.addText(runs, { x, y, w, h, isTextBox: true, margin: 0, valign: o.valign || "top", align: o.align || "left", lineSpacingMultiple: o.ls || 1.06 });
  return y + h;
}
const lead = (t) => ({ text: t + " ", options: { bold: true, color: SCARLET } });
const term = (t) => ({ text: t + "  ", options: { bold: true } });

// ================= LEFT COLUMN: Introduction, Purpose/Aim, Methods =================
let y = 6.69;
y = heading(LX, y, LW, "Introduction");
let bh = 3.35; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Setting up software can delay the start of a programming course. ", options: { bold: true } },
  { text: "Several hundred UNLV students a year in introductory C++ (CS 135) and x86-64 assembly (CS 218) must install four programming tools on their own laptops before coursework begins. Some newer Macs cannot run the assembly course’s current 19 GB virtual machine at all. Other universities report the same problem [3, 6]." },
], { para: 0 });
y += bh + GAPV;

y = heading(LX, y, LW, "Purpose/Aim");
bh = 5.9; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "I packaged the course tools and a code editor into a container that runs on the student’s own computer and opens in a browser tab.", br: true },
  lead("Question."), { text: "On four tested computer configurations, can the same package run real assignments, preserve coursework after the container is deleted, and support the debugger? How much download, waiting time, and working memory does it need, and where does it break?", br: true },
  lead("Contribution."), { text: "Earlier work describes packaged programming workspaces [1, 3, 4]. This project evaluates UNLV’s assembly-course package on four configurations and documents its ARM debugger limit." },
], { para: 8, ls: 1.05 });
y += bh + GAPV;

y = heading(LX, y, LW, "Methods");
bh = BOTTOM - y; box(LX, y, LW, bh);
let my = para(LX + PAD, y + PAD, LW - 2 * PAD, 1.0, [
  lead("Test systems."), { text: "Three rented virtual computers and my own laptop provided four test configurations (Table 1)." },
], { para: 0, ls: 1.04 });
my = para(LX + PAD, my + 0.1, LW - 2 * PAD, 1.5, [
  lead("Same test on each."), { text: "Download → open the editor → build and run four assignments → test the debugger → delete the container → check the saved coursework. One automated checklist, unchanged on every machine." },
], { para: 0, ls: 1.04 });
my += 0.15;
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD, y: my, w: LW - 2 * PAD, h: y + bh - PAD - my, fill: { color: TINT }, line: { color: TINT } });
let tdy = para(LX + PAD + 0.25, my + 0.15, LW - 2 * PAD - 0.5, 0.5, "TECHNICAL DETAILS", { size: 20, color: SCARLET, para: 0, font: HEADF });
tdy = para(LX + PAD + 0.25, tdy, LW - 2 * PAD - 0.5, 1.45, [
  term("Machines."), { text: "AWS m8i.large (Intel) and m8g.large (ARM Graviton); Azure D4s_v5 (Intel, Windows 11 Pro); all rented, under $10 in total. 2021 MacBook Pro M1 Pro, owned. Each started the container with the one command a student types:" },
], { size: 25, para: 0, ls: 1.03 });
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD + 0.25, y: tdy + 0.05, w: LW - 2 * PAD - 0.5, h: 0.7, fill: { color: GREY }, line: { color: GREY } });
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", { x: LX + PAD + 0.45, y: tdy + 0.05, w: LW - 2 * PAD - 0.9, h: 0.7, fontFace: MONO, fontSize: 20, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
tdy += 0.05 + 0.7 + 0.15;
para(LX + PAD + 0.25, tdy, LW - 2 * PAD - 0.5, y + bh - PAD - 0.15 - tdy, [
  term("Checks."), { text: "The same download on every machine, confirmed by a file identifier (checksum). All four assignments must build and run without error; the parallel-work assignment (several streams of work at once) must also give its expected answer. The debugger must show the paused program’s values and position.", br: true },
  term("Timing."), { text: "Editor opening time runs from starting the container until the editor’s web page answers the browser. It excludes installing Docker (not measured) and the download (reported separately). Timed on the first start and after replacing the container.", br: true },
  term("Memory and builds."), { text: "Memory is the container’s own use (editor and tools; not the browser or Docker), idle and during assignments. Each assignment was built once." },
], { size: 25, para: 5, ls: 1.03 });

// ================= MIDDLE COLUMN: Results (headline + callouts + table), Figures =================
y = 6.69;
y = heading(MX, y, MW, "Results");
bh = 13.7; box(MX, y, MW, bh);
let ry = para(MX + PAD, y + PAD, MW - 2 * PAD, 1.0, [
  { text: "All four tested computers built and ran four assembly-course assignments. ", options: { bold: true } },
  { text: "Neither ARM computer, including the Apple Silicon Mac, could use the debugger.", options: { bold: true, color: SCARLET } },
], { size: 30, para: 0, ls: 1.04 });
const heroes = [["4 of 4", "computers built and ran all four assignments"], ["0.5–0.6 s", "to open the editor on Intel. ARM: 4.8–6.7 s"], ["552 MB", "download. Docker is installed separately"], ["Debugger", "Intel: 2 of 2 computers. ARM: 0 of 2 computers"]];
const hw = (MW - 2 * PAD - 3 * 0.25) / 4, hh = 2.5;
heroes.forEach((t, i) => {
  const hx = MX + PAD + i * (hw + 0.25), hy = ry + 0.1;
  slide.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color: i === 3 ? PALE : TINT }, line: { color: i === 3 ? PALE : TINT } });
  slide.addText(t[0], { x: hx + 0.2, y: hy + 0.08, w: hw - 0.4, h: 0.9, fontFace: HEADF, fontSize: i === 1 || i === 3 ? 42 : 50, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.2, y: hy + 1.0, w: hw - 0.4, h: hh - 1.05, fontFace: BODYF, fontSize: 26, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
let noteY = ry + 0.1 + hh + 0.12;
noteY = para(MX + PAD, noteY, MW - 2 * PAD, 0.45, "First-start times; they exclude installing Docker and downloading the package. A second start was also timed.", { size: 24, color: INK, para: 0 });
let ty = noteY + 0.1;
ty = para(MX + PAD, ty, MW - 2 * PAD, 0.5, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the checklist recorded on each tested configuration. Memory in MiB (about a megabyte)." }], { size: 23, color: MUTED, para: 0 });
const hdrCell = (t, sub) => ({ text: [{ text: t, options: { bold: true, breakLine: true } }, { text: sub, options: { bold: false, fontSize: 17 } }], options: { color: WHITE, fill: { color: GREY }, align: "center", fontFace: BODYF, valign: "middle" } });
const res = [
  [{ text: "Measure", options: { bold: true, color: WHITE, fill: { color: GREY }, fontFace: BODYF } },
    hdrCell("Windows 11 PC", "Intel, 4 cores, 16 GB\nrented (Azure)"), hdrCell("Linux PC", "Intel, 2 cores, 8 GB\nrented (AWS)"), hdrCell("Apple Mac", "M1 Pro (ARM), 16 GB\nowned MacBook Pro"), hdrCell("Linux on ARM", "Graviton ARM, 2 cores, 8 GB\nrented (AWS)")],
  ["Built and ran all four assignments", "yes", "yes", "yes", "yes"],
  ["Parallel-work assignment: expected answer", "yes", "yes", "yes", "yes"],
  ["Coursework survives deleting the container", "yes", "yes", "yes", "yes"],
  ["Debugger usable", "yes", "yes", "no", "no"],
  ["Package download time (s)", "53", "16", "45", "13"],
  ["Editor opens after first start (s)", "0.6", "0.5", "4.8", "6.7"],
  ["Memory while idle (MiB)", "56", "54", "263", "255"],
  ["Peak memory during assignments (MiB)", "90", "not captured*", "358", "334"],
  ["Slowest assignment build (s)", "0.6", "0.3", "3.1", "3.6"],
  ["Checks met / failed / unavailable", "13 / 0 / 0", "13 / 0 / 0", "12 / 0 / 1", "12 / 0 / 1"],
];
const rowH = 0.56, tw = MW - 2 * PAD;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "no", align: ci ? "center" : "left", color: c === "no" ? SCARLET : c === "yes" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x: MX + PAD, y: ty + 0.02, w: tw, colW: [tw - 4 * 2.85, 2.85, 2.85, 2.85, 2.85], fontFace: BODYF, fontSize: 23, border: { type: "solid", pt: 1, color: "BFBFBF" }, margin: 0.06, valign: "middle", rowH: [1.5, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
ty += 0.02 + 1.5 + 10 * rowH + 0.1;
para(MX + PAD, ty, tw, y + bh - PAD - ty, "*The Linux PC finished faster than the memory sampler could record a peak. The computers differed in provider and resources; times describe these test systems. “Unavailable” is the debugger check, recorded rather than passed or failed on ARM.", { size: 21, color: MUTED, para: 0, ls: 1.0 });
y += bh + GAPV;

y = heading(MX, y, MW, "Figures");
bh = BOTTOM - y; box(MX, y, MW, bh);
const figH = bh - 2 * PAD - 1.0, figW = 8.6;
// ---- Figure 1, drawn natively so every label is readable ----
{
  const fx = MX + PAD, fy = y + PAD, fw = figW, fh = figH;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, fill: { color: "FAFAFA" }, line: { color: "9E9E9E", width: 1.5 }, rectRadius: 0.15 });
  slide.addText("STUDENT’S OWN LAPTOP — works offline after the first download", { x: fx + 0.25, y: fy + 0.1, w: fw - 0.5, h: 0.4, fontFace: BODYF, fontSize: 18, bold: true, color: MUTED, isTextBox: true, margin: 0 });
  const bx = fx + 0.45, bw = fw - 0.9;
  function node(ny, nh, title, sub, accent) {
    slide.addShape(pres.shapes.RECTANGLE, { x: bx, y: ny, w: bw, h: nh, fill: { color: WHITE }, line: { color: accent ? SCARLET : "7F7F7F", width: accent ? 2.5 : 1.25 } });
    slide.addText(title, { x: bx + 0.2, y: ny + 0.08, w: bw - 0.4, h: 0.5, fontFace: BODYF, fontSize: 26, bold: true, color: accent ? SCARLET : INK, isTextBox: true, margin: 0, align: "center", valign: "middle" });
    if (sub) slide.addText(sub, { x: bx + 0.2, y: ny + 0.58, w: bw - 0.4, h: nh - 0.65, fontFace: BODYF, fontSize: 19, color: MUTED, isTextBox: true, margin: 0, align: "center", valign: "top", lineSpacingMultiple: 1.0 });
  }
  function arrow(ay, ah, label, twoWay) {
    slide.addShape(pres.shapes.LINE, { x: bx + bw / 2, y: ay, w: 0, h: ah, line: { color: "7F7F7F", width: 2, endArrowType: "triangle", beginArrowType: twoWay ? "triangle" : "none" } });
    slide.addText(label, { x: bx + bw / 2 + 0.15, y: ay, w: bw / 2 - 0.2, h: ah, fontFace: MONO, fontSize: 14, color: MUTED, isTextBox: true, margin: 0, valign: "middle" });
  }
  let ny = fy + 0.6;
  node(ny, 0.95, "Web browser", "any browser already on the laptop"); ny += 0.95;
  arrow(ny, 0.5, "localhost:<course port>"); ny += 0.5;
  const inner = [
    "Programming editor shown in the browser (code-server)",
    "Tools to build, run, and inspect programs — releases fixed by the instructor",
    "Editor settings preinstalled; built-in AI features disabled",
  ];
  const ch2 = 0.62 + inner.length * 0.45 + 0.1;
  node(ny, ch2, "Course workspace (Docker container)", null, true);
  inner.forEach((t, i) => {
    slide.addShape(pres.shapes.RECTANGLE, { x: bx + 0.25, y: ny + 0.62 + i * 0.45, w: bw - 0.5, h: 0.4, fill: { color: TINT }, line: { color: TINT } });
    slide.addText(t, { x: bx + 0.35, y: ny + 0.62 + i * 0.45, w: bw - 0.7, h: 0.4, fontFace: BODYF, fontSize: 16, color: INK, isTextBox: true, margin: 0, valign: "middle" });
  });
  ny += ch2;
  arrow(ny, 0.5, "shared folder (bind mount)", true); ny += 0.5;
  node(ny, fy + fh - 0.15 - ny, "Coursework folder on this laptop", "student-owned files, editable with any application; they survive deleting the container", false);
}
para(MX + PAD, y + PAD + figH + 0.08, figW, 0.95, [{ text: "Figure 1. ", options: { bold: true } }, { text: "Everything runs on the student’s own laptop. The internet is needed only for the first download." }], { size: 21, color: MUTED, ls: 1.0, para: 0 });
const cx = MX + PAD + figW + 0.4, cw = MX + MW - PAD - cx;
slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor opens", labels: ["Linux on ARM", "Apple Silicon Mac", "Windows 11 (Intel)", "Linux PC (Intel)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x: cx, y: y + PAD, w: cw, h: figH, barDir: "bar", barGapWidthPct: 40, chartColors: [SCARLET],
  showTitle: true, title: "Figure 2. Seconds from starting the container until the editor opens", titleFontFace: BODYF, titleFontSize: 23, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 24, dataLabelColor: INK, dataLabelFontFace: BODYF, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 24, catAxisLabelColor: INK, catAxisLabelFontFace: BODYF, catAxisLineShow: false,
  valAxisLabelFontSize: 20, valAxisLabelColor: MUTED, valAxisLabelFontFace: BODYF, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: "D9D9D9", size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
para(cx, y + PAD + figH + 0.08, cw, 0.95, "First-start times after Docker is installed and the package downloaded. ARM machines run the Intel-built package through a translator.", { size: 21, color: MUTED, ls: 1.0, para: 0 });

// ================= RIGHT COLUMN: Key Terms, Discussion, Conclusions/Future Research, References/Acknowledgements =================
y = 6.69;
y = heading(RX, y, RW, "Key Terms");
bh = 5.4; box(RX, y, RW, bh);
const KT = [
  ["Container", "a ready-made package of a course’s tools. Docker is the free software that runs it."],
  ["Virtual machine", "a whole simulated computer inside a computer; the course’s current one is a 19 GB disk."],
  ["IDE / editor", "the application students write programs in; here it opens in a browser tab."],
  ["Assembly", "programming with instructions tied closely to the processor."],
  ["Build", "convert a written program into a form the computer can run."],
  ["Debugger", "a tool that pauses a running program so a student can look inside it. Some assignments require one."],
  ["Working memory", "temporary space used while software runs, separate from saved files."],
  ["Intel vs. ARM", "two processor families. Most Windows laptops use Intel-style chips; Apple Silicon Macs use ARM."],
  ["Translator", "software that runs instructions written for a different processor family. Some features may be unavailable."],
];
const kcw = (RW - 2 * PAD - 0.4) / 2;
[KT.slice(0, 5), KT.slice(5)].forEach((col, ci) => {
  const runs = [];
  col.forEach((t, i) => { runs.push(term(t[0])); runs.push({ text: t[1], br: i < col.length - 1 }); });
  para(RX + PAD + ci * (kcw + 0.4), y + PAD, kcw, bh - 2 * PAD, runs, { size: 22, para: 5, ls: 1.02 });
});
y += bh + GAPV;

y = heading(RX, y, RW, "Discussion");
bh = 6.1; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Observed."), { text: "All four tested computers ran the assignments and preserved coursework after the container was deleted. Neither ARM computer could use the debugger.", br: true },
  lead("Possible explanation."), { text: "The assembly course teaches the basic instructions understood by Intel-style processors, so the package is built for Intel and ARM runs it through a translator. The translator may explain the ARM limit; these tests cannot separate it from other hardware and software differences.", br: true },
  lead("Consequence for students."), { text: "The tested ARM computers can build and run the assignments. Required debugger steps still need an Intel computer or the campus lab." },
], { para: 8, ls: 1.04, size: 32 });
y += bh + GAPV;

y = heading(RX, y, RW, "Conclusions/Future Research");
bh = 4.6; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Demonstrated."), { text: "Four tested configurations built and ran four assembly-course assignments and preserved coursework. The debugger worked only on the two Intel configurations.", br: true },
  lead("Not tested."), { text: "Student setup success, time saved, or help requests. Four machines are examples, not a survey.", br: true },
  lead("Next."), { text: "Seek university ethics (IRB) approval for a classroom study in both courses [3, 4, 6]; evaluate a revised ARM container that could enable debugger use on ARM." },
], { para: 7, ls: 1.04, size: 30 });
y += bh + GAPV;

y = heading(RX, y, RW, "References/Acknowledgements");
bh = BOTTOM - y; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  { text: "[1] D. J. Malan. Containerizing CS50. ITiCSE 2024.  [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.  [4] K. Fernalld et al. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.  [6] D. P. Harvie et al. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.  [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.  [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.", br: true },
  { text: "Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the project repository.", options: { italic: true } },
], { size: 18, color: MUTED, para: 5, ls: 1.03 });

slide.addNotes("Opening (about 90 seconds, roughly 180 words): Software setup can delay the start of a programming course. Several hundred UNLV students a year must install four tools before coursework begins, and some newer Macs cannot run the course's existing virtual machine. I packaged each course's tools and a code editor into a container, a ready-made package of software that runs on the student's own computer: one download, one command, and it opens in a browser tab. I tested whether it worked across four computer configurations: three rented cloud computers, Windows and Linux on Intel processors and Linux on ARM, plus my own Apple Silicon MacBook. The same automated checklist ran on each: download the package, open the editor, build and run four real assembly assignments, try the debugger, delete the container, and check that the coursework survives. All four computers built and ran every assignment. The editor opened in about half a second on Intel and five to seven seconds on ARM. The one limit: neither ARM computer could use the debugger, the tool that pauses a program so you can look inside. Translation software may explain that; four machines cannot prove it. No students have used it yet; that classroom study is next. Then: use Figure 1 to show one student task end to end, Table 1 for the Intel-versus-ARM comparison, and close with what was not tested.");

pres.writeFile({ fileName: process.argv[2] || "poster-virtual.pptx" }).then((f) => console.log("wrote", f));
