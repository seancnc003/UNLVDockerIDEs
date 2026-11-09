// 56 x 31.5 inch virtual symposium poster — pptxgenjs, laid out on the OUR "SampleVirtualPosterTemplate3" skeleton
// (scarlet header band, grey body, Georgia headings, white bordered boxes). Revision 3 (judge-driven):
// claims kept inside the evidence, measurement boundaries stated, key terms box, findings / explanation / consequence split.
// Revision 4: larger callout labels, shorter Discussion/Purpose/Conclusions, Methods split into a plain route + technical details.
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
let bh = 3.2; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Setting up software can delay the start of a programming course. ", options: { bold: true } },
  { text: "Several hundred UNLV students a year must install four programming tools on their own laptops before coursework begins. Some newer Macs cannot run the assembly course’s current 19 GB virtual machine at all. Other universities report the same problem [3, 6]." },
], { para: 0 });
y += bh + GAPV;

y = heading(LX, y, LW, "Purpose/Aim");
bh = 5.6; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "I packaged the course tools and a code editor into a container that runs on the student’s own computer and opens in a browser tab: one download, one command, no university server, no account.", br: true },
  lead("Question."), { text: "On four tested computer configurations, can the same package run real assignments, keep coursework safe, and support the debugger? What does it cost in download size, waiting time, and working memory, and where does it break?", br: true },
  lead("Contribution."), { text: "A repeatable evaluation of this assembly-course package, including its debugger limit on ARM." },
], { para: 8, ls: 1.05 });
y += bh + GAPV;

y = heading(LX, y, LW, "Methods");
bh = BOTTOM - y; box(LX, y, LW, bh);
let my = para(LX + PAD, y + PAD, LW - 2 * PAD, 1.0, [
  lead("Test systems."), { text: "Three rented cloud computers and my own laptop stood in for four kinds of student machine (Table 1)." },
], { para: 0, ls: 1.04 });
my = para(LX + PAD, my + 0.1, LW - 2 * PAD, 2.0, [
  lead("Same test on each."), { text: "Download the package → open the editor → build and run four real assignments → try the debugger → delete the container and check that the coursework folder remains. One automated checklist does this, unchanged on every machine." },
], { para: 0, ls: 1.04 });
my += 0.2;
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD, y: my, w: LW - 2 * PAD, h: y + bh - PAD - my, fill: { color: TINT }, line: { color: TINT } });
let tdy = para(LX + PAD + 0.25, my + 0.15, LW - 2 * PAD - 0.5, 0.5, "TECHNICAL DETAILS", { size: 20, color: SCARLET, para: 0, font: HEADF });
tdy = para(LX + PAD + 0.25, tdy, LW - 2 * PAD - 0.5, 1.6, [
  term("Machines."), { text: "AWS m8i.large (Intel) and m8g.large (ARM Graviton), Azure D4s_v5 (Intel, Windows 11 Pro), all rented for under $10 in total; 2021 MacBook Pro M1 Pro, owned. Each machine started the container with the one command a student types:" },
], { size: 24, para: 0, ls: 1.03 });
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD + 0.25, y: tdy + 0.05, w: LW - 2 * PAD - 0.5, h: 0.7, fill: { color: GREY }, line: { color: GREY } });
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", { x: LX + PAD + 0.45, y: tdy + 0.05, w: LW - 2 * PAD - 0.9, h: 0.7, fontFace: MONO, fontSize: 20, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
tdy += 0.05 + 0.7 + 0.15;
para(LX + PAD + 0.25, tdy, LW - 2 * PAD - 0.5, y + bh - PAD - 0.15 - tdy, [
  term("Checks."), { text: "The download must be the identical file (digital fingerprint). Each assignment must build and run without error; the multithreaded one must also give its known answer. The debugger must show program state.", br: true },
  term("Timing."), { text: "Editor opening time runs from starting the container until the editor’s web page answers the browser. It excludes installing Docker, which was not measured, and the package download, which is reported separately. It was timed on the first start and again after replacing the container.", br: true },
  term("Memory and builds."), { text: "Memory is the container’s own use (editor and tools, not the browser or Docker), idle and during assignments. Each assignment was built once." },
], { size: 24, para: 5, ls: 1.03 });

// ================= MIDDLE COLUMN: Results (headline + callouts + table), Figures =================
y = 6.69;
y = heading(MX, y, MW, "Results");
bh = 13.1; box(MX, y, MW, bh);
let ry = para(MX + PAD, y + PAD, MW - 2 * PAD, 1.0, [
  { text: "All four tested computers built and ran four assembly-course assignments. ", options: { bold: true } },
  { text: "Neither ARM computer, including the Apple Silicon Mac, could use the debugger.", options: { bold: true, color: SCARLET } },
], { size: 30, para: 0, ls: 1.04 });
const heroes = [["4 of 4", "tested computers built and ran all four assignments"], ["0.5–0.6 s", "to open the editor on Intel; 4.8–6.7 s on ARM"], ["552 MB", "download for the course package; Docker is installed separately"], ["0 of 2", "ARM computers could use the debugger; both Intel computers could"]];
const hw = (MW - 2 * PAD - 3 * 0.25) / 4, hh = 2.35;
heroes.forEach((t, i) => {
  const hx = MX + PAD + i * (hw + 0.25), hy = ry + 0.1;
  slide.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color: i === 3 ? PALE : TINT }, line: { color: i === 3 ? PALE : TINT } });
  slide.addText(t[0], { x: hx + 0.2, y: hy + 0.08, w: hw - 0.4, h: 0.95, fontFace: HEADF, fontSize: i === 1 ? 44 : 52, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.2, y: hy + 1.05, w: hw - 0.4, h: hh - 1.1, fontFace: BODYF, fontSize: 23, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
let noteY = ry + 0.1 + hh + 0.12;
noteY = para(MX + PAD, noteY, MW - 2 * PAD, 0.45, "Opening times exclude installing Docker and downloading the package. First start is shown; a restart was also timed.", { size: 23, color: INK, para: 0 });
let ty = noteY + 0.1;
ty = para(MX + PAD, ty, MW - 2 * PAD, 0.5, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the checklist recorded on each tested configuration. Memory in MiB (about a megabyte)." }], { size: 23, color: MUTED, para: 0 });
const hdrCell = (t, sub) => ({ text: [{ text: t, options: { bold: true, breakLine: true } }, { text: sub, options: { bold: false, fontSize: 15 } }], options: { color: WHITE, fill: { color: GREY }, align: "center", fontFace: BODYF, valign: "middle" } });
const res = [
  [{ text: "Measure", options: { bold: true, color: WHITE, fill: { color: GREY }, fontFace: BODYF } },
    hdrCell("Windows 11 PC", "Intel, 4 cores, 16 GB\nAzure cloud VM"), hdrCell("Linux PC", "Intel, 2 cores, 8 GB\nAWS cloud VM"), hdrCell("Apple Mac", "M1 Pro (ARM), 16 GB\nowned MacBook Pro"), hdrCell("Linux on ARM", "Graviton (ARM), 2 cores, 8 GB\nAWS cloud VM")],
  ["Built and ran all four assignments", "yes", "yes", "yes", "yes"],
  ["Multithreaded answer correct", "yes", "yes", "yes", "yes"],
  ["Coursework survives deleting the container", "yes", "yes", "yes", "yes"],
  ["Debugger usable", "yes", "yes", "no", "no"],
  ["Package download time (s)", "53", "16", "45", "13"],
  ["Editor opens after first start (s)", "0.6", "0.5", "4.8", "6.7"],
  ["Container memory while idle (MiB)", "56", "54", "263", "255"],
  ["Container memory peak, assignments (MiB)", "90", "not captured*", "358", "334"],
  ["Slowest assignment build (s)", "0.6", "0.3", "3.1", "3.6"],
  ["Checks met / failed / unavailable", "13 / 0 / 0", "13 / 0 / 0", "12 / 0 / 1", "12 / 0 / 1"],
];
const rowH = 0.5, tw = MW - 2 * PAD;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "no", align: ci ? "center" : "left", color: c === "no" ? SCARLET : c === "yes" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x: MX + PAD, y: ty + 0.02, w: tw, colW: [tw - 4 * 2.95, 2.95, 2.95, 2.95, 2.95], fontFace: BODYF, fontSize: 21, border: { type: "solid", pt: 1, color: "BFBFBF" }, margin: 0.06, valign: "middle", rowH: [1.45, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
ty += 0.02 + 1.45 + 10 * rowH + 0.1;
para(MX + PAD, ty, tw, y + bh - PAD - ty, "*The Linux PC finished the assignments faster than the memory sampler could record a peak. Each assignment was built once. The Windows machine ran on a different cloud and size, so its seconds are indicative only. “Unavailable” is the debugger check, which is recorded, not passed or failed, on ARM.", { size: 19, color: MUTED, para: 0, ls: 1.0 });
y += bh + GAPV;

y = heading(MX, y, MW, "Figures");
bh = BOTTOM - y; box(MX, y, MW, bh);
const figH = bh - 2 * PAD - 1.15, figW = figH * (1640 / 1560);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: MX + PAD, y: y + PAD, w: figW, h: figH });
para(MX + PAD, y + PAD + figH + 0.08, figW, 1.1, [{ text: "Figure 1. ", options: { bold: true } }, { text: "Everything runs on the student’s own laptop. The browser talks to the container (“code-server” is the editor); coursework stays in a shared folder on the laptop (“bind mount”). The internet is needed only for the first download (“pull”)." }], { size: 18, color: MUTED, ls: 1.0, para: 0 });
const cx = MX + PAD + figW + 0.4, cw = MX + MW - PAD - cx;
slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor opens", labels: ["Linux on ARM", "Apple Silicon Mac", "Windows 11 (Intel)", "Linux PC (Intel)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x: cx, y: y + PAD, w: cw, h: figH, barDir: "bar", barGapWidthPct: 40, chartColors: [SCARLET],
  showTitle: true, title: "Figure 2. Seconds from starting the container until the editor opens", titleFontFace: BODYF, titleFontSize: 22, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 22, dataLabelColor: INK, dataLabelFontFace: BODYF, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 22, catAxisLabelColor: INK, catAxisLabelFontFace: BODYF, catAxisLineShow: false,
  valAxisLabelFontSize: 20, valAxisLabelColor: MUTED, valAxisLabelFontFace: BODYF, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: "D9D9D9", size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
para(cx, y + PAD + figH + 0.08, cw, 1.1, "Measured after Docker is installed and the package downloaded, so this is not total first-time setup. The ARM machines run the Intel-built package through a translator.", { size: 18, color: MUTED, ls: 1.0, para: 0 });

// ================= RIGHT COLUMN: Key Terms, Discussion, Conclusions/Future Research, References/Acknowledgements =================
y = 6.69;
y = heading(RX, y, RW, "Key Terms");
bh = 5.0; box(RX, y, RW, bh);
const KT = [
  ["Container", "a ready-made package of a course’s tools. Docker is the free software that runs it."],
  ["Image", "the downloadable file a container starts from; here 552 MB."],
  ["Virtual machine", "a whole simulated computer inside a computer. The course’s current one is a 19 GB disk, a different measure from a download."],
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
  para(RX + PAD + ci * (kcw + 0.4), y + PAD, kcw, bh - 2 * PAD, runs, { size: 21, para: 4, ls: 1.02 });
});
y += bh + GAPV;

y = heading(RX, y, RW, "Discussion");
bh = 6.1; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Observed."), { text: "All four tested computers built and ran the assignments and kept coursework after the container was deleted. Neither ARM computer could use the debugger. Intel opened the editor in about half a second; ARM took 5–7 s.", br: true },
  lead("Possible explanation."), { text: "The assembly course teaches Intel’s instruction set, so the package is built for Intel and ARM runs it through a translator. The translator may explain the ARM limit, but four machines cannot separate it from other hardware and software differences.", br: true },
  lead("Consequence for students."), { text: "The tested ARM setups can build and run all four assignments. Required debugger steps still need an Intel computer or the campus lab." },
], { para: 7, ls: 1.04, size: 30 });
y += bh + GAPV;

y = heading(RX, y, RW, "Conclusions/Future Research");
bh = 4.7; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Demonstrated."), { text: "Four tested configurations built and ran four assembly-course assignments and kept coursework. The debugger worked only on the two Intel configurations.", br: true },
  lead("Not tested."), { text: "Student setup success, time saved, or help requests. Four machines are examples, not a survey.", br: true },
  lead("Next."), { text: "Seek IRB approval for a classroom study in CS 135 and CS 218 [3, 4, 6]; evaluate a revised ARM container that could restore the debugger." },
], { para: 7, ls: 1.04, size: 30 });
y += bh + GAPV;

y = heading(RX, y, RW, "References/Acknowledgements");
bh = BOTTOM - y; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  { text: "[1] D. J. Malan. Containerizing CS50. ITiCSE 2024.  [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.  [4] K. Fernalld et al. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.  [6] D. P. Harvie et al. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.  [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.  [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.", br: true },
  { text: "Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the project repository.", options: { italic: true } },
], { size: 17, color: MUTED, para: 5, ls: 1.03 });

slide.addNotes("Opening (about 90 seconds, roughly 180 words): Software setup can delay the start of a programming course. Several hundred UNLV students a year must install four tools before coursework begins, and some newer Macs cannot run the course's existing virtual machine. I packaged each course's tools and a code editor into a container, a ready-made package of software that runs on the student's own computer: one download, one command, and it opens in a browser tab. I tested whether it worked across four computer configurations: three rented cloud computers, Windows and Linux on Intel processors and Linux on ARM, plus my own Apple Silicon MacBook. The same automated checklist ran on each: download the package, open the editor, build and run four real assembly assignments, try the debugger, delete the container, and check that the coursework survives. All four computers built and ran every assignment. The editor opened in about half a second on Intel and five to seven seconds on ARM. The one limit: neither ARM computer could use the debugger, the tool that pauses a program so you can look inside. Translation software may explain that; four machines cannot prove it. No students have used it yet; that classroom study is next. Then: use Figure 1 to show one student task end to end, Table 1 for the Intel-versus-ARM comparison, and close with what was not tested.");

pres.writeFile({ fileName: process.argv[2] || "poster-virtual.pptx" }).then((f) => console.log("wrote", f));
