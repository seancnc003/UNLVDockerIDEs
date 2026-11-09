// 56 x 31.5 inch virtual symposium poster — pptxgenjs, laid out on the OUR "SampleVirtualPosterTemplate3" skeleton
// (scarlet header band, grey body, Georgia headings, white bordered boxes). Revision 3 (judge-driven):
// claims kept inside the evidence, measurement boundaries stated, key terms box, findings / explanation / consequence split.
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
bh = 7.1; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Before the fellowship I packaged the course tools and a code editor into a container that runs on the student’s own computer and opens in a browser tab: one download, one command, no university server, no account. It worked on my laptop. This project tests what it can do, what it costs, and where it fails on four computer configurations.", br: true },
  lead("Q1"), { text: "Can the same package build and run real assignments on Windows, macOS, and Linux, on Intel and ARM processors?", br: true },
  lead("Q2"), { text: "What does it cost the student in download size, start-up time, memory, and build time?", br: true },
  lead("Q3"), { text: "Where does it break, and can we explain why?", br: true },
  lead("Contribution."), { text: "A documented, repeatable test of how the assembly-course package performs on four configurations, including its debugger limit on ARM." },
], { para: 6, ls: 1.05 });
y += bh + GAPV;

y = heading(LX, y, LW, "Methods");
bh = BOTTOM - y; box(LX, y, LW, bh);
let my = para(LX + PAD, y + PAD, LW - 2 * PAD, 1.55, [
  lead("Test machines."), { text: "Three cloud virtual machines rented from Amazon (AWS) and Microsoft (Azure), under $10 in total, plus my own 2021 MacBook Pro. Each stood in for a fresh student laptop (specifications in Table 1)." },
], { para: 0, ls: 1.04 });
my = para(LX + PAD, my + 0.05, LW - 2 * PAD, 1.0, [
  lead("Procedure."), { text: "One automated checklist, unchanged on every machine. It starts the container with the one command a student would type:" },
], { para: 0, ls: 1.04 });
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD, y: my + 0.1, w: LW - 2 * PAD, h: 0.75, fill: { color: GREY }, line: { color: GREY } });
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", { x: LX + PAD + 0.2, y: my + 0.1, w: LW - 2 * PAD - 0.4, h: 0.75, fontFace: MONO, fontSize: 21, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
my += 0.1 + 0.75 + 0.15;
para(LX + PAD, my, LW - 2 * PAD, y + bh - PAD - my, [
  lead("Tasks."), { text: "Verify the download is the identical file (its digital fingerprint). Open the editor. Build and run four real CS 218 assignments; each must build and run without error, and the multithreaded one must also give its known answer. Try the debugger. Delete the container and check that the coursework folder survives.", br: true },
  lead("Measurements."), { text: "Download time. Editor opening time: seconds from starting the container until the editor’s web page answers the browser, measured on the first start and again after replacing the container; installing Docker is not included or measured. Memory used by the container (editor and tools only, not the browser or Docker), idle and during assignments. Build time per assignment, built once each." },
], { para: 6, ls: 1.04 });

// ================= MIDDLE COLUMN: Results (headline + callouts + table), Figures =================
y = 6.69;
y = heading(MX, y, MW, "Results");
bh = 12.6; box(MX, y, MW, bh);
let ry = para(MX + PAD, y + PAD, MW - 2 * PAD, 1.0, [
  { text: "All four tested computers built and ran four assembly-course assignments. ", options: { bold: true } },
  { text: "Neither ARM computer, including the Apple Silicon Mac, could use the debugger.", options: { bold: true, color: SCARLET } },
], { size: 30, para: 0, ls: 1.04 });
const heroes = [["4 of 4", "tested computers built and ran all four assignments; the multithreaded one gave its known answer on every machine"], ["0.5–0.6 s", "to open the editor on the two Intel computers, after Docker is installed and the package downloaded; 4.8–6.7 s on ARM"], ["552 MB", "course-package download, the identical file on every machine. The course’s current virtual machine is a 19 GB disk."], ["0 of 2", "ARM computers could use the debugger. Intel computers: 2 of 2. See Discussion."]];
const hw = (MW - 2 * PAD - 3 * 0.25) / 4, hh = 2.5;
heroes.forEach((t, i) => {
  const hx = MX + PAD + i * (hw + 0.25), hy = ry + 0.1;
  slide.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color: i === 3 ? PALE : TINT }, line: { color: i === 3 ? PALE : TINT } });
  slide.addText(t[0], { x: hx + 0.2, y: hy + 0.1, w: hw - 0.4, h: 1.0, fontFace: HEADF, fontSize: i === 1 ? 44 : 54, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.2, y: hy + 1.15, w: hw - 0.4, h: hh - 1.25, fontFace: BODYF, fontSize: 19, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
let ty = ry + 0.1 + hh + 0.25;
ty = para(MX + PAD, ty, MW - 2 * PAD, 0.5, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the checklist recorded on each of the four tested configurations. Memory in MiB (about a megabyte)." }], { size: 24, color: MUTED, para: 0 });
const hdrCell = (t, sub) => ({ text: [{ text: t, options: { bold: true, breakLine: true } }, { text: sub, options: { bold: false, fontSize: 15 } }], options: { color: WHITE, fill: { color: GREY }, align: "center", fontFace: BODYF, valign: "middle" } });
const res = [
  [{ text: "Measure", options: { bold: true, color: WHITE, fill: { color: GREY }, fontFace: BODYF } },
    hdrCell("Windows 11 PC", "Intel, 4 cores, 16 GB\nAzure cloud VM"), hdrCell("Linux PC", "Intel, 2 cores, 8 GB\nAWS cloud VM"), hdrCell("Apple Mac", "M1 Pro (ARM), 16 GB\nowned MacBook Pro"), hdrCell("Linux on ARM", "Graviton (ARM), 2 cores, 8 GB\nAWS cloud VM")],
  ["Built and ran all four assignments", "yes", "yes", "yes", "yes"],
  ["Multithreaded answer correct", "yes", "yes", "yes", "yes"],
  ["Coursework survives deleting the container", "yes", "yes", "yes", "yes"],
  ["Debugger usable", "yes", "yes", "no", "no"],
  ["Package download time (s)", "53", "16", "45", "13"],
  ["Editor opens after start (s)", "0.6", "0.5", "4.8", "6.7"],
  ["Container memory while idle (MiB)", "56", "54", "263", "255"],
  ["Container memory peak, assignments (MiB)", "90", "not captured*", "358", "334"],
  ["Slowest assignment build (s)", "0.6", "0.3", "3.1", "3.6"],
  ["Checks met / failed / unavailable", "13 / 0 / 0", "13 / 0 / 0", "12 / 0 / 1", "12 / 0 / 1"],
];
const rowH = 0.52, tw = MW - 2 * PAD;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "no", align: ci ? "center" : "left", color: c === "no" ? SCARLET : c === "yes" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x: MX + PAD, y: ty + 0.02, w: tw, colW: [tw - 4 * 2.95, 2.95, 2.95, 2.95, 2.95], fontFace: BODYF, fontSize: 21, border: { type: "solid", pt: 1, color: "BFBFBF" }, margin: 0.06, valign: "middle", rowH: [1.45, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
ty += 0.02 + 1.45 + 10 * rowH + 0.1;
para(MX + PAD, ty, tw, y + bh - PAD - ty, "*The Linux PC finished the assignments faster than the memory sampler could record a peak. Each assignment was built once; editor opening was timed twice per machine (both times are in the full results). The Windows machine ran on a different cloud and size, so its seconds are indicative only. “Unavailable” is the debugger check, which the checklist records, rather than passes or fails, on ARM.", { size: 17, color: MUTED, para: 0, ls: 1.0 });
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
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  term("Container"), { text: "a ready-made package of a course’s tools. Docker is the free software that runs it.", br: true },
  term("Image"), { text: "the downloadable file a container starts from; here 552 MB.", br: true },
  term("IDE / editor"), { text: "the application students write programs in. Here it opens in a browser tab.", br: true },
  term("Build"), { text: "convert a written program into a form the computer can run.", br: true },
  term("Debugger"), { text: "a tool that pauses a running program so a student can look inside it. Some assignments require one.", br: true },
  term("Intel vs. ARM"), { text: "two families of processor. Most Windows laptops use Intel-style chips; Apple Silicon Macs use ARM.", br: true },
  term("Translator"), { text: "software that lets an ARM machine run programs built for Intel chips. Slower, and not everything passes through." },
], { size: 24, para: 4, ls: 1.03 });
y += bh + GAPV;

y = heading(RX, y, RW, "Discussion");
bh = 6.0; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Observed."), { text: "All four tested computers built and ran the assignments, and coursework survived deleting the container. The editor opened in 0.5–0.6 s on Intel and 4.8–6.7 s on ARM; the slowest build took 0.3–0.6 s on Intel and 3.1–3.6 s on ARM. Neither ARM computer could use the debugger.", br: true },
  lead("Possible explanation."), { text: "The assembly course teaches Intel’s instruction set, so the package is built for Intel on purpose, and ARM runs it through a translator. The same file was used everywhere, so the pattern follows the processor family; the translator is the likely cause, but four machines cannot rule out other differences.", br: true },
  lead("Consequence for students."), { text: "On the tested ARM setups a student can do every assignment but needs an Intel computer or the campus lab for the debugger steps. The handout says so." },
], { para: 6, ls: 1.04, size: 28 });
y += bh + GAPV;

y = heading(RX, y, RW, "Conclusions/Future Research");
bh = 4.5; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("Shown in these tests."), { text: "The 552 MB package ran four assembly-course assignments on all four configurations and preserved coursework. It does not monitor student activity. The debugger worked only on the two Intel configurations.", br: true },
  lead("Not tested."), { text: "Student setup success, time saved, and help requests. Four machines are examples, not a survey of student laptops.", br: true },
  lead("Next."), { text: "Seek IRB approval for a classroom study in CS 135 and CS 218 [3, 4, 6], and evaluate a redesigned ARM container that could restore the debugger." },
], { para: 6, ls: 1.04, size: 28 });
y += bh + GAPV;

y = heading(RX, y, RW, "References/Acknowledgements");
bh = BOTTOM - y; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  { text: "[1] D. J. Malan. Containerizing CS50. ITiCSE 2024.  [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.  [4] K. Fernalld et al. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.  [6] D. P. Harvie et al. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.  [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.  [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.", br: true },
  { text: "Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the project repository.", options: { italic: true } },
], { size: 17, color: MUTED, para: 5, ls: 1.03 });

slide.addNotes("Opening (about 90 seconds, roughly 200 words): Software setup can delay the start of a programming course. Several hundred UNLV students a year must install four tools before coursework begins, and the newest Macs cannot run the assembly course's 19 GB virtual machine at all. I packaged each course's tools and a code editor into a container, a ready-made package of software that runs on the student's own computer. One download, one command, and it opens in a browser tab. The question was whether that holds on the laptops students actually own, not just mine. I tested three rented cloud computers, Windows and Linux on Intel processors and Linux on an ARM processor, plus my own Apple Silicon MacBook. The same automated checklist ran on each: download the package, open the editor, build and run four real assembly assignments, try the debugger, delete the container, and check that the coursework survives. All four computers built and ran every assignment. The editor opened in about half a second on Intel and five to seven seconds on ARM. The one limit: neither ARM computer could use the debugger, the tool that pauses a program so you can look inside. The likely reason is the translator ARM uses to run Intel software, though four machines cannot rule out other causes. No students have used it yet; that classroom study is next. Then: use Figure 1 to show one student task end to end, Table 1 for the Intel-versus-ARM comparison, and close with what was not tested.");

pres.writeFile({ fileName: process.argv[2] || "poster-virtual.pptx" }).then((f) => console.log("wrote", f));
