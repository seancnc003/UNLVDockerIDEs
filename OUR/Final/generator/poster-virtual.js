// 56 x 31.5 inch virtual symposium poster — pptxgenjs, laid out on the OUR "SampleVirtualPosterTemplate3" skeleton
// (scarlet header band, grey body, Georgia headings, white bordered boxes). Run: node poster-virtual.js out.pptx
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "VPOSTER", width: 56, height: 31.5 });
pres.layout = "VPOSTER";
pres.author = "Sean Cuenco"; pres.title = "Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education";

const SCARLET = "B10202", INK = "000000", GREY = "666666", MUTED = "444444", WHITE = "FFFFFF", LINE = "000000", TINT = "F2F2F2", OK = "1F5FB0";
const HEADF = "Georgia", BODYF = "Times New Roman", MONO = "Courier New";
const BODY = 32, SMALL = 28, HEAD = 56;
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
const HH = 1.06, PAD = 0.3;
function heading(x, y, w, t) {
  slide.addText(t, { x, y, w, h: HH, fontFace: HEADF, fontSize: HEAD, bold: true, color: WHITE, isTextBox: true, margin: 0, align: "center", valign: "middle",
    shadow: { type: "outer", blur: 4, offset: 3, angle: 45, color: "000000", opacity: 0.45 } });
  return y + HH + 0.12;
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

// ================= LEFT COLUMN: Introduction, Purpose/Aim, Methods =================
let y = 6.69;
y = heading(LX, y, LW, "Introduction");
let bh = 5.15; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Week one of a programming course is often lost to installing software, not to programming. ", options: { bold: true } },
  { text: "Every year, several hundred UNLV students in the introductory C++ course (CS 135) and the x86-64 assembly course (CS 218) spend their first days making a compiler or assembler, a linker, a debugger, and an editor work on dozens of different laptops. Owners of the newest Macs sometimes cannot run the course’s 19 GB virtual machine at all and are sent to a campus lab instead. Other universities report the same: 75–100 minutes of class time per semester lost to installs [6], and most help traffic caused by environment mismatch rather than course content [3]." },
], { para: 0 });
y += bh + 0.45;

y = heading(LX, y, LW, "Purpose/Aim");
bh = 6.3; box(LX, y, LW, bh);
para(LX + PAD, y + PAD, LW - 2 * PAD, bh - 2 * PAD, [
  { text: "Before the fellowship I built a fifth option, after login servers, per-course virtual machines, cloud editors, and monitored platforms: a Docker container holding each course’s exact tools plus the VS Code editor, running entirely on the student’s own laptop in a browser tab. One download, one command, no server, no account, nothing recorded. A promise tested only where it succeeds is an advertisement, not a result, so this project asks:", br: true },
  lead("Q1"), { text: "Does the same package behave identically on Windows, macOS, and Linux, on Intel and ARM chips, on real CS 218 assignments?", br: true },
  lead("Q2"), { text: "What does it cost the student: download size, start-up time, memory, build time?", br: true },
  lead("Q3"), { text: "Where does it break, and can we say exactly why?" },
], { para: 6, ls: 1.05 });
y += bh + 0.45;

y = heading(LX, y, LW, "Methods");
bh = 30.5 - y; box(LX, y, LW, bh);
let my = para(LX + PAD, y + PAD, LW - 2 * PAD, 2.9, [
  lead("What we built."), { text: "Two containers, one per course, built from Ubuntu Linux with the browser-served VS Code editor and the exact tool versions the instructor chose (g++ for CS 135; yasm, nasm, ld, and gdb for CS 218). Coursework stays in a normal folder on the laptop, never inside the container, so the container can be deleted or updated at any time:" },
], { para: 0, ls: 1.05 });
slide.addShape(pres.shapes.RECTANGLE, { x: LX + PAD, y: my + 0.05, w: LW - 2 * PAD, h: 0.75, fill: { color: GREY }, line: { color: GREY } });
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", { x: LX + PAD + 0.2, y: my + 0.05, w: LW - 2 * PAD - 0.4, h: 0.75, fontFace: MONO, fontSize: 21, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
my += 0.95;
para(LX + PAD, my, LW - 2 * PAD, y + bh - PAD - my, [
  lead("How we tested it."), { text: "One unchanged script ran on four machines, each playing a fresh student laptop: Windows 11 and Linux PCs on Intel chips, Linux on an ARM chip (all three rented, under $10 in total), and an owned M1 Pro MacBook Pro. It records the image fingerprint, times editor start-up, assembles, links, runs, and debugs a program, builds four real CS 218 assignments (one multithreaded), then deletes the container and checks that the student’s files survive." },
], { para: 0, ls: 1.05 });

// ================= MIDDLE COLUMN: Results (stats + table), Chart/Diagram/Table/Image =================
y = 6.69;
y = heading(MX, y, MW, "Results");
bh = 11.4; box(MX, y, MW, bh);
const heroes = [["4 of 4", "machines ran all four CS 218 assignments correctly, including the multithreaded one, on the identical image"], ["0.5 s", "until the editor opens on Intel chips; about 5 s on Apple Silicon. A course virtual machine takes minutes."], ["552 MB", "one-time download, the identical file on every machine, versus a 19 GB virtual machine"]];
const hw = (MW - 2 * PAD - 2 * 0.3) / 3, hh = 2.75;
heroes.forEach((t, i) => {
  const hx = MX + PAD + i * (hw + 0.3), hy = y + PAD;
  slide.addShape(pres.shapes.RECTANGLE, { x: hx, y: hy, w: hw, h: hh, fill: { color: TINT }, line: { color: TINT } });
  slide.addText(t[0], { x: hx + 0.25, y: hy + 0.1, w: hw - 0.5, h: 1.15, fontFace: HEADF, fontSize: 66, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.25, y: hy + 1.3, w: hw - 0.5, h: hh - 1.4, fontFace: BODYF, fontSize: 23, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
let ty = y + PAD + hh + 0.3;
ty = para(MX + PAD, ty, MW - 2 * PAD, 0.55, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the script recorded on each machine (memory in MiB)." }], { size: SMALL, color: MUTED, para: 0 });
const hdrCell = (t, align) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: GREY }, align, fontFace: BODYF } });
const res = [
  [hdrCell("Measure"), hdrCell("Windows 11\n(Intel)", "center"), hdrCell("Linux PC\n(Intel)", "center"), hdrCell("Apple\nSilicon Mac", "center"), hdrCell("Linux\non ARM", "center")],
  ["All four assignments correct", "yes", "yes", "yes", "yes"],
  ["Files survive deleting the container", "yes", "yes", "yes", "yes"],
  ["Debugger", "works", "works", "silent", "silent"],
  ["Editor ready in (seconds)", "0.6", "0.5", "4.8", "6.7"],
  ["Memory while idle", "56", "54", "263", "255"],
  ["Peak memory during coursework", "90", "n/a", "358", "334"],
  ["Heaviest assignment builds in (s)", "0.6", "0.3", "3.1", "3.6"],
  ["Checks passed / failed", "13 / 0", "13 / 0", "12 / 0", "12 / 0"],
];
const rowH = 0.68, tw = MW - 2 * PAD;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "silent", align: ci ? "center" : "left", color: c === "silent" ? SCARLET : c === "works" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x: MX + PAD, y: ty + 0.05, w: tw, colW: [tw - 4 * 2.95, 2.95, 2.95, 2.95, 2.95], fontFace: BODYF, fontSize: 24, border: { type: "solid", pt: 1, color: "BFBFBF" }, margin: 0.08, valign: "middle", rowH: [1.15, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
ty += 0.05 + 1.15 + 8 * rowH + 0.12;
para(MX + PAD, ty, tw, y + bh - PAD - ty, "ARM totals exclude the debugger check: under translation the script records the debugger result as a finding rather than a pass or fail, so 12 checks are counted instead of 13.", { size: 20, color: MUTED, para: 0, ls: 1.0 });
y += bh + 0.45;

y = heading(MX, y, MW, "Figures");
bh = 30.5 - y; box(MX, y, MW, bh);
const figH = bh - 2 * PAD - 1.0, figW = figH * (1640 / 1560);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: MX + PAD, y: y + PAD, w: figW, h: figH });
para(MX + PAD, y + PAD + figH + 0.08, figW, 0.9, [{ text: "Figure 1. ", options: { bold: true } }, { text: "Everything runs on the student’s machine; the internet is needed only for the first download." }], { size: 21, color: MUTED, ls: 1.0, para: 0 });
const cx = MX + PAD + figW + 0.4, cw = MX + MW - PAD - cx;
slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor is ready", labels: ["Linux on ARM", "Apple Silicon Mac", "Windows 11 (Intel)", "Linux PC (Intel)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x: cx, y: y + PAD, w: cw, h: figH, barDir: "bar", barGapWidthPct: 40, chartColors: [SCARLET],
  showTitle: true, title: "Figure 2. Seconds until the editor is ready", titleFontFace: BODYF, titleFontSize: 24, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 22, dataLabelColor: INK, dataLabelFontFace: BODYF, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 22, catAxisLabelColor: INK, catAxisLabelFontFace: BODYF, catAxisLineShow: false,
  valAxisLabelFontSize: 20, valAxisLabelColor: MUTED, valAxisLabelFontFace: BODYF, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: "D9D9D9", size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
para(cx, y + PAD + figH + 0.08, cw, 0.9, "Intel machines open the editor in about half a second; ARM machines run the Intel-built image through a translator and take 5–7 s.", { size: 21, color: MUTED, ls: 1.0, para: 0 });

// ================= RIGHT COLUMN: Discussion, Conclusions/Future Research, References/Acknowledgements =================
y = 6.69;
y = heading(RX, y, RW, "Discussion");
bh = 7.3; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("What the numbers mean."), { text: "On Intel machines the cost is close to zero: the editor is ready in about half a second, idles at roughly 55 MiB, and the heaviest assignment builds in under a second. On ARM chips every assignment still produced the correct answer; start-up rose to 5–7 s and compile-heavy steps ran roughly ten times slower, yet every build finished in under four seconds. The identical 552 MB image was downloaded everywhere, so any difference is due to the machine, not the package.", br: true },
  lead("The one limit."), { text: "CS 218 teaches the Intel x86-64 instruction set, so that package is built for Intel chips on purpose and ARM chips run it through a translator. The translator cannot support the debugger: on a Mac it appears to run but prints no register values, so the handout tells Apple Silicon owners to finish debugger assignments on an Intel machine or in the lab. It is a translator boundary, not an operating-system boundary." },
], { para: 8, ls: 1.05 });
y += bh + 0.45;

y = heading(RX, y, RW, "Conclusions/Future Research");
bh = 7.2; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  lead("For students and the course."), { text: "Week one goes to learning, not installing. One 552 MB download replaces a 19 GB virtual machine, works offline afterwards, records nothing, and keeps coursework in a folder the student owns. The department maintains no servers; the instructor updates one recipe and every student gets the same tools. The trade-off is now explicit: keep the real x86-64 instruction set and lose the debugger on ARM.", br: true },
  lead("What comes next."), { text: "An IRB-approved classroom study in CS 135 and CS 218 measuring how many students reach a working setup without help and how much staff time it saves, using instruments adapted from [3, 4, 6]. Then a hybrid ARM container that runs the editor natively and translates only student programs, which could bring the debugger back to Apple Silicon." },
], { para: 8, ls: 1.05 });
y += bh + 0.45;

y = heading(RX, y, RW, "References/Acknowledgements");
bh = 30.5 - y; box(RX, y, RW, bh);
para(RX + PAD, y + PAD, RW - 2 * PAD, bh - 2 * PAD, [
  { text: "[1] D. J. Malan. Containerizing CS50. ITiCSE 2024.  [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.  [4] K. Fernalld et al. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.  [6] D. P. Harvie et al. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.  [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.  [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.", br: true },
  { text: "Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the repository under tests/record-results.", options: { italic: true } },
], { size: 22, color: MUTED, para: 8, ls: 1.04 });

slide.addNotes("90-second pitch: Every semester several hundred UNLV students lose their first week of programming class to installing software, and the newest Macs sometimes cannot run the course tools at all. I packaged each course's exact tools plus an editor into a container: one download, one command, runs on the student's own laptop in a browser tab, nothing recorded, coursework in a normal folder. The research question was whether that promise holds on the laptops students actually own, not just the one I built it on. I rented four kinds of computer and ran one unchanged script on each: it downloads the image, opens the editor, runs four real CS 218 assignments, tries the debugger, and checks that files survive deleting the container. All four machines passed every assignment; the editor opens in half a second on Intel chips and about five seconds on Apple Silicon; the download is 552 MB instead of a 19 GB virtual machine. The one limit is the debugger on ARM chips, which we can explain, which the handout covers, and which a hybrid container could fix. Next is a classroom study.");

pres.writeFile({ fileName: process.argv[2] || "poster-virtual.pptx" }).then((f) => console.log("wrote", f));
