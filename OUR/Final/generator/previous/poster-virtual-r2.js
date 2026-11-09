// 56 x 31.5 inch virtual symposium poster — pptxgenjs, laid out on the OUR "SampleVirtualPosterTemplate3" skeleton
// (scarlet header band, grey body, Georgia headings, white bordered boxes). Revision 2: judge-driven rewrite
// (plain-language terms, separated findings vs. explanations, measurement boundaries, debugger exception up front).
// Run: NODE_PATH=<dir with node_modules> node poster-virtual.js out.pptx && python3 finish-virtual.py out.pptx
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "VPOSTER", width: 56, height: 31.5 });
pres.layout = "VPOSTER";
pres.author = "Sean Cuenco"; pres.title = "Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education";

const SCARLET = "B10202", INK = "000000", GREY = "666666", MUTED = "444444", WHITE = "FFFFFF", LINE = "000000", TINT = "F2F2F2", OK = "1F5FB0";
const HEADF = "Georgia", BODYF = "Times New Roman", MONO = "Courier New";
const BODY = 30, SMALL = 28, HEAD = 56;
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
const HH = 0.95, PAD = 0.3, GAPV = 0.3;
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

// ================= LEFT COLUMN: Introduction, Key terms, Purpose/Aim, Methods =================
let y = 6.69;
y = heading(LX, y, LW, "Introduction");
let bh = 2.6; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Week one of a programming course is often lost to installing software, not to programming. ", options: { bold: true } },
  { text: "Several hundred UNLV students a year must set up four programming tools on their own laptops before they can start. Some newer Macs cannot run the course’s current 19 GB setup at all. Other universities report the same problem [3, 6]." },
], { para: 0 });
y += bh + GAPV;

y = heading(LX, y, LW, "Key Terms");
bh = 3.45; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  term("Container"), { text: "a sealed, ready-made package of a course’s tools that runs inside any laptop. Docker is the free program that runs it.", br: true },
  term("Image"), { text: "the downloadable file a container starts from. Here it is 552 MB.", br: true },
  term("Debugger"), { text: "a tool that pauses a running program so a student can look inside it. Some assignments require one.", br: true },
  term("Intel vs. ARM"), { text: "two families of computer processor. Most Windows laptops use Intel-style chips; Apple Silicon Macs use ARM. ARM machines run Intel-style software through a “translator”, which is slower." },
], { size: 26, para: 5, ls: 1.04 });
y += bh + GAPV;

y = heading(LX, y, LW, "Purpose/Aim");
bh = 4.95; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Before the fellowship I packaged each course’s exact tools and a code editor into one container that opens in a browser tab on the student’s own laptop: one download, one command, no server, no account, nothing recorded. It worked on my laptop. This project tests whether it works on the laptops students actually own.", br: true },
  lead("Q1"), { text: "Does the same package behave the same on Windows, macOS, and Linux, on Intel and ARM chips, on real assignments?", br: true },
  lead("Q2"), { text: "What does it cost the student in download size, start-up time, memory, and build time?", br: true },
  lead("Q3"), { text: "Where does it break, and can we explain why?" },
], { para: 6, ls: 1.05 });
y += bh + GAPV;

y = heading(LX, y, LW, "Methods");
bh = 30.5 - y; box(LX, y, LW, bh);
let my = para(LX + PAD, y + PAD, LW - 2 * PAD, 1.5, [
  lead("Test."), { text: "Three cloud virtual machines rented from Amazon (AWS) and Microsoft (Azure), under $10 in total, plus my own 2021 MacBook Pro, each standing in for a fresh student laptop (specs in Table 1)." },
], { para: 0, ls: 1.04 });
my = para(LX + PAD, my + 0.05, LW - 2 * PAD, 0.95, [
  lead("Procedure."), { text: "One automated checklist, unchanged on every machine. It starts the container with the one command a student would type:" },
], { para: 0, ls: 1.04 });
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD, y: my + 0.12, w: LW - 2 * PAD, h: 0.75, fill: { color: GREY }, line: { color: GREY } });
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", { x: LX + PAD + 0.2, y: my + 0.12, w: LW - 2 * PAD - 0.4, h: 0.75, fontFace: MONO, fontSize: 21, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
my += 0.12 + 0.75 + 0.15;
para(LX + PAD, my, LW - 2 * PAD, y + bh - PAD - my, [
  lead("Tasks."), { text: "Verify the download is the identical file (its digital fingerprint). Open the editor. Build and run four real CS 218 assignments; the multithreaded one must give its known answer. Try the debugger. Delete the container and check that the coursework folder survives.", br: true },
  lead("Measurements."), { text: "Download time; seconds from starting the container until the editor answers (installing Docker and the download are excluded and listed separately); memory while idle and during assignments; build time per assignment." },
], { para: 5, ls: 1.04 });

// ================= MIDDLE COLUMN: Results (headline + callouts + table), Figures =================
y = 6.69;
y = heading(MX, y, MW, "Results");
bh = 12.6; box(MX, y, MW, bh);
let ry = para(MX + PAD, y + PAD, MW - 2 * PAD, 1.0, [
  { text: "All four machines built and ran the course assignments. ", options: { bold: true } },
  { text: "The two ARM machines, including the Apple Silicon Mac, could not use the debugger.", options: { bold: true, color: SCARLET } },
], { size: 30, para: 0, ls: 1.04 });
const heroes = [["4 of 4", "machines built and ran all four assignments; the multithreaded one gave the correct answer everywhere"], ["0.5 s", "from starting the container until the editor answers on Intel machines; about 5–7 s on ARM"], ["552 MB", "one-time download, verified as the identical file on every machine, versus a 19 GB virtual machine"], ["0 of 2", "ARM machines could use the debugger. Intel machines: 2 of 2. See Discussion."]];
const hw = (MW - 2 * PAD - 3 * 0.25) / 4, hh = 2.5;
heroes.forEach((t, i) => {
  const hx = MX + PAD + i * (hw + 0.25), hy = ry + 0.1;
  slide.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color: i === 3 ? "FBEAEA" : TINT }, line: { color: i === 3 ? "FBEAEA" : TINT } });
  slide.addText(t[0], { x: hx + 0.2, y: hy + 0.1, w: hw - 0.4, h: 1.05, fontFace: HEADF, fontSize: 54, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.2, y: hy + 1.2, w: hw - 0.4, h: hh - 1.3, fontFace: BODYF, fontSize: 20, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
let ty = ry + 0.1 + hh + 0.25;
ty = para(MX + PAD, ty, MW - 2 * PAD, 0.5, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the checklist recorded on each machine. Memory in MiB (about a megabyte)." }], { size: 24, color: MUTED, para: 0 });
const hdrCell = (t, sub) => ({ text: [{ text: t, options: { bold: true, breakLine: true } }, { text: sub, options: { bold: false, fontSize: 15 } }], options: { color: WHITE, fill: { color: GREY }, align: "center", fontFace: BODYF, valign: "middle" } });
const res = [
  [{ text: "Measure", options: { bold: true, color: WHITE, fill: { color: GREY }, fontFace: BODYF } },
    hdrCell("Windows 11 PC", "Intel, 4 cores, 16 GB\nAzure cloud VM"), hdrCell("Linux PC", "Intel, 2 cores, 8 GB\nAWS cloud VM"), hdrCell("Apple Mac", "M1 Pro (ARM), 16 GB\nowned MacBook Pro"), hdrCell("Linux on ARM", "Graviton (ARM), 2 cores, 8 GB\nAWS cloud VM")],
  ["Built and ran all four assignments", "yes", "yes", "yes", "yes"],
  ["Multithreaded answer correct", "yes", "yes", "yes", "yes"],
  ["Coursework survives deleting the container", "yes", "yes", "yes", "yes"],
  ["Debugger usable", "yes", "yes", "no", "no"],
  ["Download time (s)", "53", "16", "45", "13"],
  ["Editor ready after start (s)", "0.6", "0.5", "4.8", "6.7"],
  ["Memory while idle (MiB)", "56", "54", "263", "255"],
  ["Peak memory during assignments (MiB)", "90", "not captured*", "358", "334"],
  ["Slowest assignment build (s)", "0.6", "0.3", "3.1", "3.6"],
  ["Checks met / failed / unavailable", "13 / 0 / 0", "13 / 0 / 0", "12 / 0 / 1", "12 / 0 / 1"],
];
const rowH = 0.52, tw = MW - 2 * PAD;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "no", align: ci ? "center" : "left", color: c === "no" ? SCARLET : c === "yes" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x: MX + PAD, y: ty + 0.02, w: tw, colW: [tw - 4 * 2.95, 2.95, 2.95, 2.95, 2.95], fontFace: BODYF, fontSize: 21, border: { type: "solid", pt: 1, color: "BFBFBF" }, margin: 0.06, valign: "middle", rowH: [1.45, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
ty += 0.02 + 1.45 + 10 * rowH + 0.1;
para(MX + PAD, ty, tw, y + bh - PAD - ty, "*The Linux PC finished the assignments faster than the memory sampler could record a peak. Each assignment was built once; the starter program was compiled three times (median). The Windows machine ran on a different cloud and size, so its seconds are indicative only. “Unavailable” is the debugger check, which is recorded, not passed or failed, on ARM.", { size: 17, color: MUTED, para: 0, ls: 1.0 });
y += bh + GAPV;

y = heading(MX, y, MW, "Figures");
bh = 30.5 - y; box(MX, y, MW, bh);
const figH = bh - 2 * PAD - 1.15, figW = figH * (1640 / 1560);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: MX + PAD, y: y + PAD, w: figW, h: figH });
para(MX + PAD, y + PAD + figH + 0.08, figW, 1.1, [{ text: "Figure 1. ", options: { bold: true } }, { text: "Everything runs on the student’s own laptop: the browser talks to the container, and coursework lives in an ordinary folder. The internet is needed only for the first download." }], { size: 19, color: MUTED, ls: 1.0, para: 0 });
const cx = MX + PAD + figW + 0.4, cw = MX + MW - PAD - cx;
slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor is ready", labels: ["Linux on ARM", "Apple Silicon Mac", "Windows 11 (Intel)", "Linux PC (Intel)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x: cx, y: y + PAD, w: cw, h: figH, barDir: "bar", barGapWidthPct: 40, chartColors: [SCARLET],
  showTitle: true, title: "Figure 2. Seconds from starting the container until the editor answers", titleFontFace: BODYF, titleFontSize: 22, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 22, dataLabelColor: INK, dataLabelFontFace: BODYF, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 22, catAxisLabelColor: INK, catAxisLabelFontFace: BODYF, catAxisLineShow: false,
  valAxisLabelFontSize: 20, valAxisLabelColor: MUTED, valAxisLabelFontFace: BODYF, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: "D9D9D9", size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
para(cx, y + PAD + figH + 0.08, cw, 1.1, "This is the time to open the editor once Docker is installed and the image is downloaded, not total first-time setup. ARM machines run the Intel-built image through a translator.", { size: 19, color: MUTED, ls: 1.0, para: 0 });

// ================= RIGHT COLUMN: Discussion, Conclusions/Future Research, References/Acknowledgements =================
y = 6.69;
y = heading(RX, y, RW, "Discussion");
bh = 8.1; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("What we found."), { text: "On the two Intel machines the editor was ready in about half a second, used about 55 MiB of memory while idle, and built the slowest assignment in under a second. On the two ARM machines every assignment still gave the right result, but the editor took 5–7 s to open and builds took 10–14 times longer, still under four seconds. Both ARM machines, and neither Intel machine, lost the debugger.", br: true },
  lead("What we think explains it."), { text: "CS 218 teaches the Intel x86-64 instruction set, so the package is built for Intel chips on purpose. ARM machines run it through a translator, and the debugger needs processor details the translator does not pass through. The identical image was used everywhere, so the pattern follows the processor family, not the operating system. Pinning this to the translator alone would need more than four machines.", br: true },
  lead("What this means for a student."), { text: "Windows and Intel owners get everything. Apple Silicon owners can do every assignment but must use an Intel machine or the campus lab for the debugger steps. The student handout says so." },
], { para: 7, ls: 1.04, size: 30 });
y += bh + GAPV;

y = heading(RX, y, RW, "Conclusions/Future Research");
bh = 7.0; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("What was shown."), { text: "One 552 MB download replaced a 19 GB virtual machine on all four test machines, worked offline after the first download, recorded nothing, and kept coursework in a folder the student owns. The one trade-off is now measured and documented: keep the real x86-64 instruction set, lose the debugger on ARM.", br: true },
  lead("What was not tested."), { text: "No students have used it yet, so time saved in week one and fewer help requests are goals, not findings. Four machines are examples of each platform, not a survey of student laptops.", br: true },
  lead("What comes next."), { text: "A classroom study in CS 135 and CS 218, after IRB approval is obtained, measuring how many students reach a working setup without help and how much staff time it saves [3, 4, 6]. A redesigned ARM container that translates only student programs could bring the debugger back to Apple Silicon." },
], { para: 7, ls: 1.04, size: 30 });
y += bh + GAPV;

y = heading(RX, y, RW, "References/Acknowledgements");
bh = 30.5 - y; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  { text: "[1] D. J. Malan. Containerizing CS50. ITiCSE 2024.  [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.  [4] K. Fernalld et al. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.  [6] D. P. Harvie et al. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.  [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.  [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.", br: true },
  { text: "Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the project repository.", options: { italic: true } },
], { size: 21, color: MUTED, para: 8, ls: 1.04 });

slide.addNotes("Opening (about 90 seconds): Every semester several hundred UNLV students lose their first week of programming class to installing software, and the newest Macs sometimes cannot run the course tools at all. I packaged each course's exact tools plus a code editor into a container: a sealed package of software that runs inside any laptop. One download, one command, it opens in a browser tab, nothing is recorded, and coursework stays in a normal folder. The question was whether that promise holds on the laptops students actually own, not just the one I built it on. I tested three rented cloud computers, Windows and Linux on Intel chips and Linux on an ARM chip, plus my own Apple Silicon MacBook. The same automated checklist ran on each: it downloads the package, opens the editor, builds and runs four real CS 218 assignments, tries the debugger, and checks that files survive deleting the container. All four machines built and ran every assignment. The editor opened in half a second on Intel chips and five to seven seconds on ARM. The download is 552 MB instead of a 19 GB virtual machine. The one limit: on ARM chips, including Apple Silicon Macs, the debugger, the tool that pauses a program so you can look inside, does not work, because ARM runs Intel software through a translator. The handout tells Mac owners to do those steps in the lab. Nothing here measures students yet; that classroom study, with IRB approval, is the next step. Then: walk through Figure 1 (where everything runs), Table 1 (one row at a time, define each measure), the ARM trade-off, and what was not tested.");

pres.writeFile({ fileName: process.argv[2] || "poster-virtual.pptx" }).then((f) => console.log("wrote", f));
