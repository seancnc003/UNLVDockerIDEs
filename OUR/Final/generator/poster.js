// 48 x 36 inch research poster — pptxgenjs (revision 5: fuller text in every section, 250-word abstract)
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "POSTER", width: 48, height: 36 });
pres.layout = "POSTER";

const SCARLET = "B10202", INK = "22252B", MUTED = "5E5B55", TINT = "F5F4F0", LINE = "D9D6CF", WHITE = "FFFFFF", OK = "1F5FB0", PALE = "FBEAEA";
const FONT = "Arial";
const slide = pres.addSlide();
slide.background = { color: WHITE };

// ---------- title band ----------
const BAND = 4.3;
slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 48, h: BAND, fill: { color: SCARLET }, line: { color: SCARLET } });
slide.addText("Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education: An Evaluation on the Laptops Students Actually Own", {
  x: 0.9, y: 0.35, w: 36.6, h: 2.35, fontFace: FONT, fontSize: 54, bold: true, color: WHITE, isTextBox: true, margin: 0, valign: "middle", lineSpacingMultiple: 0.98,
});
slide.addText([
  { text: "Sean Cuenco", options: { bold: true } },
  { text: "   ·   Faculty Mentor: James Andro-Vasko, Ph.D.   ·   Department of Computer Science, University of Nevada, Las Vegas", options: {} },
], { x: 0.9, y: 2.8, w: 36.6, h: 0.7, fontFace: FONT, fontSize: 28, color: WHITE, isTextBox: true, margin: 0, valign: "middle" });
slide.addText("Summer Undergraduate Research Fellowship (SURF) 2026  ·  Office of Undergraduate Research, UNLV", {
  x: 0.9, y: 3.45, w: 36.6, h: 0.55, fontFace: FONT, fontSize: 22, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
slide.addText("Code, handouts, test script, raw results:\ngithub.com/seancnc003/UNLVDockerIDEs\n\nReady-made course environments:\nhub.docker.com/r/seancnc/unlv-cpp-ide\nhub.docker.com/r/seancnc/unlv-x86-ide", {
  x: 38.0, y: 0.4, w: 9.1, h: 3.5, fontFace: FONT, fontSize: 18, color: WHITE, isTextBox: true, margin: 0, align: "right", valign: "middle", lineSpacingMultiple: 1.05,
});

// ---------- geometry ----------
const M = 0.9, GAP = 0.7, COLW = (48 - 2 * M - 2 * GAP) / 3; // 15.0
const colX = [M, M + COLW + GAP, M + 2 * (COLW + GAP)];
const HOOK_Y = BAND + 0.45, HOOK_H = 3.2;
const TOP = HOOK_Y + HOOK_H + 0.5;   // 8.45
const BOTTOM_BAND = 29.3;
const COL_END = BOTTOM_BAND - 0.5;
const FOOT = 35.4;
const BODY = 21, HEAD = 38, SMALL = 20, SUB = 27;

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
    x, y, w, h, isTextBox: true, margin: 0, valign: opts.valign || "top", lineSpacingMultiple: opts.ls || 1.05,
  });
  return y + h;
}
function card(x, y, w, h, color = TINT) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color }, line: { color } });
}
const hdrCell = (t, align) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: INK }, align } });

// ================= THE HOOK (full width) + plain-terms glossary =================
card(M, HOOK_Y, 48 - 2 * M, HOOK_H, PALE);
slide.addText("THE HOOK", { x: M + 0.45, y: HOOK_Y + 0.2, w: 6, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: SCARLET, isTextBox: true, margin: 0, charSpacing: 2 });
text(M + 0.45, HOOK_Y + 0.65, 29.6, HOOK_H - 0.8, [
  { text: "Week one of a programming course is often lost to installing software, not to programming. ", options: { bold: true, fontSize: 30, color: SCARLET } },
  { text: "Every year, several hundred UNLV students in the introductory C++ course (CS 135) and the x86-64 assembly course (CS 218) spend their first days making a compiler or assembler, a linker, a debugger, and an editor work on dozens of different laptops. Owners of the newest Macs sometimes cannot run the course’s 19 GB virtual machine at all and are sent to a campus lab instead. This project asks a simple question: can the whole course environment be one download that behaves the same on the laptops students actually own, with no server, no account, and nothing recorded, and how would we know?", options: { fontSize: 25 } },
], { ls: 1.04, para: 0 });
// glossary
const GX = M + 31.0, GW = 48 - 2 * M - 31.0 - 0.45;
slide.addText("FOUR TERMS USED ON THIS POSTER", { x: GX, y: HOOK_Y + 0.2, w: GW, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: SCARLET, isTextBox: true, margin: 0, charSpacing: 2 });
text(GX, HOOK_Y + 0.65, GW, HOOK_H - 0.8, [
  { text: "Container  ", options: { bold: true } }, { text: "a sealed, pre-configured copy of a course’s tools that runs inside any laptop. Docker is the free program that runs containers.", br: true },
  { text: "Image  ", options: { bold: true } }, { text: "the downloadable file a container starts from. The same 552 MB image was used on every machine in this study.", br: true },
  { text: "Translation  ", options: { bold: true } }, { text: "how an ARM chip (Apple Silicon Macs) runs software built for Intel chips. Correct, but slower.", br: true },
  { text: "Debugger  ", options: { bold: true } }, { text: "a tool that pauses a running program so students can look inside it. Some CS 218 assignments require it." },
], { size: 17, ls: 1.02, para: 3 });

// ================= COLUMN 1: abstract, introduction & background, problem & focus =================
let x = colX[0], w = COLW, y = TOP;
const ABS_H = 5.3;
card(x, y, w, ABS_H);
slide.addText("Abstract", { x: x + 0.35, y: y + 0.2, w: w - 0.7, h: 0.6, fontFace: FONT, fontSize: 30, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
text(x + 0.35, y + 0.85, w - 0.7, ABS_H - 1.0,
  "Introductory programming courses often lose their first week to software installation, not programming. In UNLV’s introductory C+\u2060+ course (CS 135) and x86-64 assembly course (CS 218), several hundred students a year must get a compiler or assembler, a linker, a debugger, and an editor working on dozens of different laptops, and students with Apple Silicon Macs often cannot run the course’s 19 GB virtual machine at all. This project packages each course’s exact toolchain and a browser-based Visual Studio Code editor into a Docker container that runs entirely on the student’s own laptop: one 552 MB download, one command, no server, no account, and nothing recorded. Coursework stays in an ordinary folder, so the container can be deleted or updated without touching student files. To test whether that promise holds on the laptops students actually own, one unmodified script performed a student’s first day and four real CS 218 assignments, including a multithreaded program, on four machines: Intel and ARM Linux rented from AWS, Windows 11 rented from Azure, and an M1 Pro MacBook Pro. All four downloaded the identical image and passed every assignment. The editor opened in 0.5 s on Intel chips and 5 to 7 s on ARM chips, where x86-64 code runs through a translator roughly ten times slower but still within seconds. The one limit is the debugger, which the translator cannot support on ARM. That boundary is documented in the student handout, every raw result is public, and a classroom study is planned next.",
  { size: 18, ls: 1.03, para: 0 });
y += ABS_H + 0.35;

y = header(x, y, w, "Introduction and background");
y = text(x, y, w, 1.85,
  "The problem is old and well documented. Other universities measured 75–100 minutes of class time per semester lost to installs [6], found that most of their help traffic was environment mismatch rather than course content [3], and reported students with M1/M2 MacBooks unable to run the course’s virtual machine at all [4]. Institutions have answered in four ways, and UNLV has lived through the first two:",
  { size: BODY, ls: 1.04, para: 0 });
const stages = [
  ["1  Shared login servers (UNLV, 2000s–2024)", "Every student logged in to a department computer over the network, usually with PuTTY, even from lab machines. The servers are retired and their documentation was deleted in a 2025 website rebuild [12]."],
  ["2  A virtual machine per course (CS 218 today)", "A 19 GB copy of a whole computer that runs inside the laptop. Slow to boot, and so slow on Apple Silicon Macs that the course sends M1/M2 owners to the lab with a USB drive."],
  ["3  Cloud editors (Harvard CS50 [1])", "The environment lives on a company’s servers, used by more than 700,000 people. Needs internet and an account, and students finish the course never having set up their own machine."],
  ["4  Monitored platforms (CodeDive, South Korea [8])", "The university’s cluster runs the editor and records every command plus a code snapshot after every one-second pause in typing: 24,845 snapshots from 95 students in two weeks."],
];
const stH = 1.45;
stages.forEach((s) => {
  slide.addText(s[0], { x, y, w, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(s[1], { x, y: y + 0.5, w, h: stH - 0.5, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
  y += stH;
});

y = header(x, y + 0.1, w, "Problem and research focus");
y = text(x, y, w, 2.45,
  "Before the fellowship I built a fifth option: a container holding each course’s exact tools plus the VS Code editor, running entirely on the student’s own laptop and opened in a browser tab. One download, one command, no server, no account, nothing recorded, and coursework kept in a normal folder that survives deleting the container. It worked on the laptop I built it on. A promise tested only where it succeeds is an advertisement, not a result, so the research question is whether it survives contact with the laptops students actually own:",
  { size: BODY, ls: 1.04, para: 0 });
y = text(x, y + 0.05, w, COL_END - y - 0.05, [
  { text: "Q1  ", options: { bold: true, color: SCARLET } }, { text: "Does the same package behave identically on Windows, macOS, and Linux, on Intel and ARM chips, including on real CS 218 assignments?", br: true },
  { text: "Q2  ", options: { bold: true, color: SCARLET } }, { text: "What does it cost the student: download size, start-up time, memory, build time?", br: true },
  { text: "Q3  ", options: { bold: true, color: SCARLET } }, { text: "Where does it break, and can we say exactly why?" },
], { size: BODY, para: 5, ls: 1.03 });

// ================= COLUMN 2: methodology =================
x = colX[1]; y = TOP;
y = header(x, y, w, "Methodology");
y = subhead(x, y, w, "What we built");
y = text(x, y, w, 2.45,
  "Two containers, one per course, each built from Ubuntu Linux and holding the browser-served VS Code editor plus the exact tool versions the instructor chose: the g++ compiler for CS 135; the yasm and nasm assemblers, the linker, and the gdb debugger for CS 218. The editor listens only on the student’s own machine, on a port numbered after the course, with every AI feature disabled per course policy. A student installs Docker once, runs the one command below, and opens a browser tab. Coursework stays in a normal folder on the laptop, never inside the container, so the container can be deleted or updated at any time (Figure 1).",
  { size: BODY, ls: 1.04, para: 0 });
card(x, y, w, 1.0, INK);
slide.addText("docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide", {
  x: x + 0.35, y, w: w - 0.7, h: 1.0, fontFace: "Courier New", fontSize: 18, color: WHITE, isTextBox: true, margin: 0, valign: "middle",
});
y += 1.0 + 0.25;
const figW = 6.0, figH = figW * (1560 / 1640);
slide.addImage({ path: __dirname + "/fig1-architecture.png", x: x + (w - figW) / 2, y, w: figW, h: figH });
y += figH + 0.05;
y = text(x, y, w, 0.6, [{ text: "Figure 1. ", options: { bold: true } }, { text: "Everything runs on the student’s machine. The only time the internet is needed is the first download of the image." }], { size: 19, color: MUTED, ls: 1.02, para: 0 });

y = subhead(x, y + 0.1, w, "How we tested it: same exam, four kinds of computer");
y = text(x, y, w, 1.55,
  "We cannot borrow one of every laptop students own, so we rented them. Three blank machines came from Amazon’s and Microsoft’s clouds for under $10 in total, so each could play the role of a fresh student laptop. The fourth was a 2021 14-inch MacBook Pro with an M1 Pro chip and 16 GB of memory, the one machine we owned rather than rented.",
  { size: BODY, ls: 1.04, para: 0 });
const machines = [
  ["Windows 11 PC", "Intel chip, 16 GB", "rented (Azure)"],
  ["Linux PC", "Intel chip, 8 GB", "rented (AWS)"],
  ["Apple Silicon Mac", "M1 Pro, 16 GB", "owned (2021 MacBook Pro)"],
  ["Linux on ARM", "ARM chip, 8 GB", "rented (AWS)"],
];
const mw = (w - 3 * 0.3) / 4, mh = 1.75;
machines.forEach((m, i) => {
  const mx = x + i * (mw + 0.3);
  card(mx, y, mw, mh);
  slide.addText(m[0], { x: mx + 0.15, y: y + 0.12, w: mw - 0.3, h: 0.7, fontFace: FONT, fontSize: 20, bold: true, color: INK, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(m[1] + "\n" + m[2], { x: mx + 0.15, y: y + 0.85, w: mw - 0.3, h: 0.95, fontFace: FONT, fontSize: 17, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.05 });
});
y += mh + 0.3;
y = subhead(x, y, w, "One script, run unchanged on all four");
y = text(x, y, w, COL_END - y, [
  { text: "1  Download the image and record its fingerprint, confirming it is the identical file on every machine.", br: true },
  { text: "2  Start it and time how long until the editor answers in the browser; check that starter files appear exactly once.", br: true },
  { text: "3  Write, assemble, link, and run a program three times; run a scripted debugger session and record whether it works.", br: true },
  { text: "4  Build and run four real CS 218 assignments spanning the course, including a multithreaded one with a checkable answer, and sample peak memory.", br: true },
  { text: "5  Delete the container, recreate it, and check that the student’s files survive.", br: true },
  { text: "The script writes every number to a file. Nothing on this poster was typed by hand; the raw files are archived in the public repository.", options: { italic: true, color: MUTED } },
], { size: SMALL, para: 4, ls: 1.03 });

// ================= COLUMN 3: results =================
x = colX[2]; y = TOP;
y = header(x, y, w, "Results");
const heroes = [["4 of 4", "tested configurations ran all four selected CS 218 assignments correctly, including the multithreaded one, on the identical image"], ["0.5 s", "until the editor opens on Intel chips; about 5 s on Apple Silicon. A course virtual machine takes minutes."], ["552 MB", "one-time download, the identical file on every machine, versus a 19 GB virtual machine"]];
const hw = (w - 2 * 0.35) / 3, hh = 2.55;
heroes.forEach((t, i) => {
  const hx = x + i * (hw + 0.35);
  card(hx, y, hw, hh);
  slide.addText(t[0], { x: hx + 0.25, y: y + 0.15, w: hw - 0.5, h: 1.05, fontFace: FONT, fontSize: 50, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(t[1], { x: hx + 0.25, y: y + 1.2, w: hw - 0.5, h: 1.45, fontFace: FONT, fontSize: 18, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
});
y += hh + 0.35;

y = text(x, y, w, 0.5, [{ text: "Table 1. ", options: { bold: true } }, { text: "What the script recorded on each machine (memory in MiB)." }], { size: 19, color: MUTED, para: 0 });
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
const rowH = 0.66;
slide.addTable(res.map((r, ri) => r.map((c, ci) => (typeof c === "string" ? { text: c, options: { bold: ci === 0 || c === "silent", align: ci ? "center" : "left", color: c === "silent" ? SCARLET : c === "works" ? OK : INK, fill: { color: ri % 2 ? TINT : WHITE } } } : c))), {
  x, y, w, colW: [5.4, 2.4, 2.4, 2.4, 2.4], fontFace: FONT, fontSize: 17, border: { type: "solid", pt: 1, color: LINE }, margin: 0.06, valign: "middle", rowH: [0.95, rowH, rowH, rowH, rowH, rowH, rowH, rowH, rowH],
});
y += 0.95 + 8 * rowH + 0.1;
y = text(x, y, w, 0.5, "ARM totals exclude the debugger check: under translation the script records the debugger result as a finding rather than a pass or fail, so 12 checks are counted instead of 13.", { size: 16, color: MUTED, ls: 1.02, para: 0 });
y += 0.15;

slide.addChart(pres.charts.BAR, [{ name: "Seconds until the editor is ready", labels: ["Linux on ARM", "Apple Silicon Mac", "Windows 11 (Intel)", "Linux PC (Intel)"], values: [6.7, 4.8, 0.6, 0.5] }], {
  x, y, w, h: 3.5, barDir: "bar", barGapWidthPct: 40,
  chartColors: [OK],
  showTitle: true, title: "Figure 2. Seconds until the editor is ready", titleFontFace: FONT, titleFontSize: 20, titleColor: INK, titleAlign: "left",
  showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 17, dataLabelColor: INK, dataLabelFormatCode: "0.0",
  showLegend: false,
  catAxisLabelFontSize: 17, catAxisLabelColor: INK, catAxisLabelFontFace: FONT, catAxisLineShow: false,
  valAxisLabelFontSize: 15, valAxisLabelColor: MUTED, valAxisLabelFontFace: FONT, valAxisMinVal: 0, valAxisMaxVal: 8, valAxisMajorUnit: 2, valAxisLineShow: false,
  valGridLine: { color: LINE, size: 1 }, catGridLine: { style: "none" },
  plotArea: { fill: { color: WHITE } }, chartArea: { fill: { color: WHITE } },
});
y += 3.5 + 0.2;
y = text(x, y, w, COL_END - y, [
  { text: "What the numbers mean. ", options: { bold: true, color: SCARLET } },
  { text: "On Intel and AMD machines the cost is close to zero: the editor is ready in about half a second, idles at roughly 55 MiB, and the heaviest assignment builds in under a second. Windows 11 was the strongest host in the matrix. On ARM chips every assignment still produced the correct answer; startup rose to five to seven seconds, peak memory to about 350 MiB (a small slice of an 8 GB laptop), and compile-heavy steps ran roughly ten times slower, yet every build finished in under four seconds. Because the identical 552 MB image was downloaded everywhere, any difference between machines is due to the machine, not the package.", br: true },
  { text: "The one limit, in plain words. ", options: { bold: true, color: SCARLET } },
  { text: "The assembly course teaches the Intel-style x86-64 instruction set, so that package is built for Intel chips on purpose, and ARM chips run it through a translator. The translator cannot support the debugger: a debugger run on a Mac appears to succeed but prints no register values, so the student handout tells Apple Silicon owners not to trust it and to finish debugger assignments on an Intel machine or in the lab. We also found that the translator that ships with Ubuntu Linux crashes while Docker’s own does not; that fix is one line in the handout. The boundary is a translator boundary, not an operating-system boundary: Windows and Intel machines get everything." },
], { size: BODY, ls: 1.04, para: 8 });

// ================= BOTTOM BAND: concluding discussion (4 cards), references strip =================
slide.addShape(pres.shapes.LINE, { x: M, y: BOTTOM_BAND - 0.35, w: 48 - 2 * M, h: 0, line: { color: LINE, width: 3 } });
const fullW = 48 - 2 * M;
let by = header(colX[0], BOTTOM_BAND, fullW, "Concluding discussion: why this matters");
const why = [
  ["For students", "Week one goes to learning, not installing. The same environment on every tested configuration, offline after one download, with coursework in a normal folder that the student owns and keeps after the course ends. Nothing is recorded or sent anywhere. All four tested configurations ran the selected assignments correctly; debugging remained unavailable on ARM, and the handout says so."],
  ["For the course and the department", "No servers to maintain, no VPN, no 19 GB image to rebuild each semester. The instructor updates one recipe and every student gets the same tools, built and published automatically. A trade-off nobody had measured is now explicit: keep the real x86-64 instruction set and lose the debugger on ARM, until a hybrid container brings it back."],
  ["For other courses and researchers", "The rent-four-computers, one-script method is course-agnostic and could vet any course environment, and every raw result is public so anyone can check the numbers. The design sits between cloud editors and monitored platforms: the same convenience without the account, the internet dependence, or the surveillance, enforced by architecture rather than by policy."],
  ["What comes next", "A classroom study in CS 135 and CS 218 with IRB approval: how many students reach a working setup without help, how much staff time it saves, and how students feel about it, using instruments adapted from [3, 4, 6]. A three-student high-school pilot has already run with no setup questions at all. Then a hybrid assembly container for ARM that runs the editor natively and translates only student programs, which could bring the debugger back to Apple Silicon."],
];
const cw = (fullW - 3 * 0.4) / 4, ch = 3.95;
why.forEach((c, i) => {
  const cx = colX[0] + i * (cw + 0.4);
  card(cx, by, cw, ch, i === 3 ? PALE : TINT);
  slide.addText(c[0], { x: cx + 0.35, y: by + 0.18, w: cw - 0.7, h: 0.6, fontFace: FONT, fontSize: 25, bold: true, color: SCARLET, isTextBox: true, margin: 0, valign: "middle" });
  slide.addText(c[1], { x: cx + 0.35, y: by + 0.85, w: cw - 0.7, h: ch - 1.0, fontFace: FONT, fontSize: SMALL, color: INK, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.04 });
});
const ry = by + ch + 0.2;
const refs = [
  "References (numbered as in the written report).  ",
  "[1] D. J. Malan. Containerizing CS50: Standardizing Students’ Programming Environments. ITiCSE 2024.   [3] S. Valstar, W. G. Griswold, L. Porter. Using DevContainers to Standardize Student Development Environments. ITiCSE 2020.   [4] K. Fernalld, T. OConnor, S. Sudhakaran, N. Nur. Lightweight Symphony: Reducing CS Student Anxiety with Standardized Docker Environments. SIGITE 2023.   [6] D. P. Harvie, J. R. Cody, C. Morrell, T. T. Estes. Using Virtual Machines to Enhance the Educational Experience. SIGITE 2019.   [8] H. Park et al. CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring. Applied Sciences 15(19), 2025.   [12] UNLV Dept. of Computer Science. Student Center: Remote Access and File Storage. tux.cs.unlv.edu, accessed Aug. 2026.",
];
slide.addText([{ text: refs[0], options: { bold: true, color: INK } }, { text: refs[1] }], { x: colX[0], y: ry, w: 31.5, h: FOOT - ry, fontFace: FONT, fontSize: 13.5, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
slide.addText("Supported by the UNLV Office of Undergraduate Research Summer Undergraduate Research Fellowship. Every number on this poster comes from the published test script’s output files, archived in the repository under tests/record-results.", { x: colX[0] + 32.2, y: ry, w: fullW - 32.2, h: FOOT - ry, fontFace: FONT, fontSize: 13.5, italic: true, color: MUTED, isTextBox: true, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });

slide.addNotes("90-second pitch: Every semester several hundred UNLV students lose their first week of programming class to installing software, and the newest Macs sometimes cannot run the course tools at all. I packaged each course's exact tools plus an editor into a container: one download, one command, runs on the student's own laptop in a browser tab, nothing recorded, coursework in a normal folder. The research question was whether that promise holds on the laptops students actually own, not just the one I built it on. I rented four kinds of computer and ran one unchanged script on each: it downloads the image, opens the editor, runs four real CS 218 assignments, tries the debugger, and checks that files survive deleting the container. All four machines passed every assignment; the editor opens in half a second on Intel chips and about five seconds on Apple Silicon; the download is 552 MB instead of a 19 GB virtual machine. The one limit is the debugger on ARM chips, which we can explain, which the handout covers, and which a hybrid container could fix. Next is a classroom study.");

pres.writeFile({ fileName: process.argv[2] || "poster.pptx" }).then((f) => console.log("wrote", f));
