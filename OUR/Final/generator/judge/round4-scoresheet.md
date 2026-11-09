# Judge’s scoresheet — Round 4

**Perspective:** Faculty judge outside computer science, with no programming background. I assessed the supplied images, poster text, speaker notes, and previous scoresheet. I did not consult code or linked project materials.

**Assessment:** The research claim is now understandable and appropriately limited. The main remaining problem is television readability: the readable crops establish that the explanations exist, but the full-poster view shows that many are too small to serve a judge standing in the room.

I have not deducted for the locked title or author line, the four-machine sample, the absence of a student study, retaining Figure 1, or including technical specifications and procedures. I evaluate how clearly those constraints and details are presented.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | I understand the question: can the same packaged programming workspace run course assignments, preserve coursework, and provide the debugging tool across four computer configurations? “Where does it break?” makes the search for limitations explicit. |
| **b. Readability** | **3/5** | The glossary now explains several essential concepts, and most sentences are reasonably short. However, the full-screen poster still contains too much small text: the table, technical block, glossary, diagram annotations, and qualifications require close inspection. |
| **c. Methods understandable to a non-CS judge** | **4/5** | The sequence from download through coursework-preservation testing is understandable, and the technical details distinguish execution, answer checking, timing, and memory measurement. “Program state,” “multithreaded,” and “digital fingerprint” still interrupt comprehension. |
| **d. Results** | **4/5** | Within 30 seconds, I can identify the central result: all four computers ran the assignments, while neither ARM computer supported the debugger. The chart communicates the opening-time difference, although several numerical cards depend on much smaller explanatory labels. |
| **e. Scientific contribution** | **4/5** | The poster supports a useful evaluation of this particular course package and states its limitations honestly. It does not claim demonstrated student benefits or a proven cause for the ARM limitation; the distinction from earlier projects remains thin. |
| **f. Visual design and organization** | **4/5** | The three columns, consistent headings, and central Results panel create a clear reading structure. Repeated findings occupy space that could enlarge the chart, explanatory labels, and essential qualifications. |
| **g. Overall** | **4/5** | This is a credible undergraduate feasibility study with a clear practical limitation and appropriately restrained conclusions. The scientific explanation is ready for a general audience; the screen presentation still needs editing. |

**Overall letter grade: B+.**

### Response to the previous scoresheet

“Addressed” means the underlying concern was resolved, even if the suggested wording was not adopted.

| Previous concern | Status | Judgment of this revision |
|---|---|---|
| Research question needed a practical focus | **Addressed** | Assignment execution, coursework preservation, debugger support, and resource use are explicit. |
| Text overflow and clipping | **Addressed** | No substantive overflow is apparent in the supplied full poster. |
| Excessive prose and poor TV readability | **Partially addressed** | The prose is more economical, but much supporting text remains small at full-poster scale. |
| Essential vocabulary unexplained | **Partially addressed** | Virtual machine, assembly, working memory, and translator are now explained. Multithreaded, program state, instruction set, and several diagram labels remain unexplained. |
| Methods lacked a clear sequence and correctness criterion | **Addressed** | The sequence is clear; running without error is distinguished from checking the expected answer of one assignment. |
| Rented computers insufficiently distinguished from student laptops | **Addressed** | Three rented systems and one owned laptop are stated plainly. “Stood in for four kinds of student machine” still suggests more representativeness than the study establishes. |
| Repetition and missing measurements unclear | **Partially addressed** | First-start values are now identified; the second timing, one build per assignment, and missing Linux peak are explained. Download repetition and second-start results remain unspecified. |
| Debugger limitation buried | **Addressed** | It is prominent in the Results headline and repeated in the practical conclusion. |
| Editor opening confused with total setup time | **Addressed** | Installation and download exclusions are explicit. |
| Table concealed unavailable capabilities | **Addressed** | Debugger entries say “no,” and the unavailable-check convention is explained. |
| Educational benefits presented as demonstrated | **Addressed** | Student setup success, time saved, and help requests are expressly untested. |
| Causal explanation too strong | **Addressed** | “May explain” and the hardware/software caveat appropriately frame translation as a hypothesis. |
| Download compared ambiguously with virtual-machine disk | **Addressed** | The glossary explicitly says these are different measures; the download card also excludes Docker installation. |
| Contribution relative to earlier work implicit | **Partially addressed** | The package-specific contribution is explicit, but the references are not connected to a clear statement of what this evaluation adds. |
| Technical command and diagram overwhelmed the explanation | **Partially addressed** | The technical block is visibly separated, but diagram annotations remain small and specialized. Retaining these elements is appropriate. |
| Ethics approval and future-study status ambiguous | **Addressed** | “Seek IRB approval” clearly places both approval and classroom research in the future. |
| Pitch overstated machine coverage or educational outcomes | **Addressed** | It says “some newer Macs,” identifies the four configurations, and acknowledges that students have not used it yet. |
| Unsupported build-time ratio | **Addressed** | Absolute times are reported. |
| Memory measurement scope unclear | **Addressed** | The poster specifies workspace memory and excludes the browser and Docker. |
| Overbroad activity-recording claim | **Addressed** | The current poster makes no broad claim that nothing is recorded; the diagram makes the narrower statement that built-in AI features are disabled. |

No major concern was wholly ignored. The previous eight recommended changes were mostly implemented in substance; enlarging the explanatory content and simplifying Figure 1’s labels remain unfinished.

## 2. Vocabulary audit

**Definition status refers to the visible poster, including Figure 1 and its caption.** Related exact expressions are grouped. This is an inventory of potential obstacles, not a recommendation to enlarge the glossary indefinitely: replace ordinary-prose jargon and retain specialized names in the technical block.

### Main argument and results

| Exact term or phrase | Does the poster define it? | Plain-language replacement or definition |
|---|---|---|
| “Decentralized” | Indirectly | Runs on each student’s computer without a shared university computer service. Explain below the locked title. |
| “Browser-Based” | Indirectly | Opened through a web browser. |
| “Docker” | **Yes** | The existing definition is useful: software that runs the packaged workspace. |
| “IDEs”; “IDE / editor” | **Yes, functionally** | A programming workspace; IDE stands for integrated development environment. |
| “C++” | No | A programming language. |
| “x86-64” | No | The processor-instruction family used by this assembly-course package. |
| “Assembly”; “assembly-course” | **Yes**, through “Assembly” | Programming with instructions closely tied to the computer’s processor. |
| “programming tools”; “course tools” | Partly | Applications used to write, prepare, run, and inspect programs. |
| “virtual machine” | **Yes** | The simulated-computer explanation works. |
| “19 GB”; “552 MB” | The quantities are identified; units are not expanded | GB and MB measure data size; one GB is about 1,000 MB. Preserve the distinction between disk size and download size. |
| “disk” | No | Computer storage, represented here by the virtual computer’s disk. |
| “Container”; “container” | **Yes** | A ready-made course workspace. Use “workspace” more often after introducing the technical term. |
| “Image” | **Yes** | The downloadable file used to start the workspace—not a picture. |
| “package”; “course package” | Partly | The downloadable course workspace. Choose a consistent ordinary-language label. |
| “code editor”; “editor” | **Yes**, through “IDE / editor” | The application students use to write programs. |
| “browser tab”; “Web browser” | Assumed | A page in an application used to view websites. Low priority for additional explanation. |
| “command” | Its purpose is shown | A typed instruction that starts the workspace. |
| “university server”; “course server” | Indirectly | A university computer that provides the workspace over a network. |
| “computer configurations”; “tested configuration” | No | The combinations of computer hardware and operating system tested. |
| “built and ran”; “build and run” | “Build” is defined; “run” is contextual | Prepared the programs and had the computer carry them out. |
| “keep coursework safe” | Partly | Here, it means coursework remained after deleting the workspace. It does not establish protection against every form of data loss. |
| “working memory” | **Yes** | The distinction from saved files is clear. |
| “Intel”; “ARM”; “Intel-style chips” | Partly | Different processor families; a processor is the part of a computer that carries out program instructions. |
| “processor”; “processor families” | Partly | The instruction-executing part of a computer; families understand different sets of basic instructions. |
| “Apple Silicon” | **Yes, indirectly** | Apple’s ARM processors. |
| “Debugger”; “debugger” | **Yes** | The pause-and-inspect explanation works. |
| “s” | Indirectly through the chart | Seconds. Spell it out in prominent labels. |
| “Multithreaded answer correct”; “multithreaded” | No | The assignment that performs several streams of work at once produced its expected answer. |
| “PC” | No | Personal computer. |
| “Windows 11”; “Linux”; “Windows 11 Pro” | No explanation of the category | Operating systems: the main software managing a computer. |
| “cores” | No | Processing units within a computer’s processor. |
| “cloud VM” | Partly, across separate explanations | Rented virtual computer accessed over the internet. |
| “M1 Pro”; “Graviton” | Identified as processor types, but not explained | Processor-model names; label them as such in specifications. |
| “MacBook Pro” | Context identifies the owned laptop | An Apple laptop model. No extra glossary entry is necessary. |
| “Container memory while idle” | Memory scope is defined; “idle” is not | Working memory used while the workspace is open but doing no assignment work. |
| “Container memory peak, assignments” | Partly | Highest observed workspace memory use during assignments. |
| “MiB” | **Partly:** “about a megabyte” | A working-memory unit close to MB. The current approximation is adequate for this audience. |
| “Slowest assignment build” | Through the “Build” definition | Longest time needed to prepare one of the assignments to run. |
| “Checks met / failed / unavailable” | Partly, in the footnote | Requirements satisfied / not satisfied / capability unavailable. |
| “memory sampler” | No | A tool that periodically records working-memory use. |
| “different cloud and size” | No | A different rental provider and different computing resources. |
| “indicative only” | No | These times describe these particular test systems. |
| “instruction set” | No | The basic instructions a processor understands. |
| “Translator”; “translator” | **Yes** | The definition is clear and appropriately qualified. |
| “Intel-built package” | Partly | The workspace prepared for Intel-style processors. |
| “hardware and software differences” | Assumed | Differences in the computers’ physical components and installed programs. |
| “ARM setups” | Partly | The tested computers using ARM processors. |
| “IRB approval” | No | University ethics approval for research involving people. |
| “CS 135”; “CS 218” | No | Add the course names alongside the numbers. |
| “revised ARM container” | Partly | A revised course workspace for ARM computers. |
| “restore the debugger” | Not explained | “Enable debugger use on ARM.” “Restore” can suggest that it previously worked on these systems. |

### Methods, Figure 1, and project materials

| Exact term or phrase | Does the poster define it? | Plain-language replacement or definition |
|---|---|---|
| “Code” | No | Written instructions that make up a program. |
| “test script” | Indirectly | A program that carries out the same tests automatically. |
| “raw results” | No | The original measurements saved by the tests. |
| “cloud computers” | Rental status stated | Rented computers accessed over the internet. |
| “automated checklist” | Functionally | The same sequence of tests performed automatically on each computer. |
| “AWS” | No expansion | Amazon’s rented computing service. |
| “Azure” | No provider identified | Microsoft’s rented computing service. |
| “m8i.large”; “m8g.large”; “D4s_v5” | No | Rental-computer model identifiers; retain under technical specifications. |
| “digital fingerprint” | Purpose partly indicated | A file identifier used to check that every system received the same download. |
| “known answer” | Context only | The expected answer used to check the result. |
| “program state” | No | The program’s current values and where it has paused. |
| “web page answers the browser” | Operationally described | The editor’s page responds to a browser request. This is a response-time measurement, not completion of student setup. |
| “idle and during assignments” | Partly | While open without assignment activity, and while assignments run. |
| “STUDENT’S OWN MACHINE” | Context only | Student’s own computer. |
| “offline after first pull” | **Yes**, in the caption | Works without internet after the first download. Use that wording directly in the diagram. |
| “http://127.0.0.1:<course port>” | No | The browser address for the workspace on this computer. |
| “Docker container (runs locally)” | Partly | Course workspace running on this computer. |
| “code-server” | **Yes**, approximately, in the caption | Software that displays the programming editor in the browser. |
| “VS Code interface served to the browser” | Partly | Programming editor shown in the browser. |
| “Course toolchain” | Components listed | Tools for preparing and inspecting course programs. |
| “compiler” | No | A tool that converts a written program into instructions the computer can execute. |
| “assembler” | No | A tool that converts assembly-language instructions into machine instructions. |
| “versions pinned by the instructor” | No | Software releases fixed by the instructor so everyone uses the same ones. |
| “Extensions & settings” | No | Added editor features and preset options. |
| “preinstalled” | Context only | Already included. |
| “autosave on” | No | Work is saved automatically. |
| “built-in AI features disabled” | No acronym expansion | The editor’s artificial intelligence features are turned off. |
| “bind mount (two-way)”; “bind mount” | **Partly**, in the caption | A coursework folder shared between the workspace and the student’s computer. |
| “Ordinary host folder” | Partly | Coursework folder on the student’s computer. |
| “host tool” | No | An application installed directly on the student’s computer. |
| “container and image replacement” | Partly | Deleting and replacing the workspace and its downloaded starting file. |
| “pull” | **Yes**, in the caption | Download. |
| “output files” | Context only | Files containing results saved by the tests. |
| “archived” | Context only | Saved for later inspection. |
| “project repository” | No | The online collection of project materials. |

The exact command also constitutes a visual vocabulary obstacle:

> `docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide`

Its general purpose is explained, but its address, port numbers, folder paths, and options are not. Keep it in the technical block and add: **“Starts the workspace and connects it to the student’s coursework folder.”** A general judge should not need to interpret its syntax.

### Reference-only vocabulary

These are legitimate publication titles and identifiers. Preserve their accuracy; explain them only if they enter the spoken argument.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50” | No | Packaging the tools for another programming course. |
| “DevContainers” | No | Packaged programming workspaces. |
| “Student Development Environments” | No | The tools and workspace students use to write programs. |
| “Standardized Docker Environments” | Partly through the glossary | The same packaged programming workspace for everyone. |
| “Virtual Machines” | **Yes**, through the glossary | Simulated computers running inside other computers. |
| “CodeDive” | Partly through the title | The name of an earlier programming platform. |
| “Web-Based IDE” | Functionally | A programming workspace opened through a browser. |
| “Real-Time Code Activity Monitoring” | No | Recording programming activity as it happens. |
| “Remote Access and File Storage” | No | Using another computer and saving files over a network. |
| “ITiCSE”; “SIGITE” | No | Computing-education publication venues. |
| “CS50”; “CS” | No | A computing course identifier; computer science. |
| “et al.” | No | And colleagues. Conventional academic language; low priority. |

**Absent terms:** “linker,” “gdb,” “yasm,” “nasm,” “ld,” “g++,” “browser-served,” and “register values” do not appear in the supplied poster. They are not vocabulary faults here.

### Long sentences

I found **no ordinary prose sentence exceeding 35 words** in the current poster. The remaining borderline sentence is the **34-word Purpose/Aim opening**:

> I packaged the course tools and a code editor into a container that runs on the student’s own computer and opens in a browser tab: one download, one command, no university server, no account.

Replace with:

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer. It opens in a browser without a university server or account.

The Methods arrow sequence is also visually long, although it is a procedural list rather than a long prose sentence. Break it across short labeled steps. The principal readability problem is cumulative text density, not unusually long sentences.

## 3. Scientific contribution

### What I understand the student discovered

The student tested a packaged assembly-course workspace on four computer configurations using the same automated checks. All four prepared and ran the four assignments and preserved coursework after workspace deletion, but neither ARM computer supported the debugging tool. This evaluation identifies where this particular package works and where a student would still need access to another computer.

### Did the poster convince me?

**Yes, for that limited claim.** The table supports the capability findings, and the Discussion and Conclusions distinguish observed behavior from possible causes and future educational research.

The remaining limitations concern interpretation:

- **Novelty:** I understand the contribution to these UNLV courses. I still cannot tell what distinguishes this evaluation from the earlier packaged workspaces cited.
- **Correctness:** Running all four assignments without error is useful evidence. Only one assignment is explicitly described as having its answer checked; successful execution should not become a claim that all answers were verified.
- **Performance:** The opening times and build times describe these configurations. They do not isolate processor-family effects or establish typical performance across student computers.
- **Coursework preservation:** The deletion test supports preservation through workspace replacement. “Keep coursework safe” is broader than that test.
- **Practical costs:** The poster reports download size and workspace memory, but these do not establish total installation storage, total computer memory use, or total setup time.
- **Generalization:** Four configurations, including three rented systems, are examples rather than a representative sample of student laptops. The poster now acknowledges this.
- **Student outcomes:** No evidence yet establishes easier setup, fewer help requests, time savings, or improved learning. The Conclusions appropriately says so.

These are boundaries to retain, not demands for new data before presentation day.

### Questions for the four-minute Q&A

I would prioritize four questions:

1. **What does your evaluation add beyond the packaged programming workspaces in your references?**
2. **Which required course steps can a student with the tested Apple laptop complete independently, and which still require the campus lab?**
3. **How did you decide that each assignment worked? Were answers checked for all four, or only the multithreaded assignment?**
4. **What would a student actually have to install and wait through before beginning work, beyond the editor-opening times shown here?**

If time remains: **What test would help determine whether translation software causes the debugger limitation?**

## 4. Top eight remaining changes before presentation day

These changes preserve the locked title, machine specifications, exact procedure, and architecture diagram.

### 1. Make the Results cards understandable at TV distance

**Where:** Four cards at the top of Results.

The explanatory labels need to be closer in size to their numbers. Replace the current card text with:

> **4 of 4 computers**  
> Built and ran all four assignments.
>
> **0.5–0.6 seconds**  
> Editor opening on Intel.  
> ARM: 4.8–6.7 seconds.
>
> **552 MB download**  
> Docker installed separately.
>
> **Debugger support**  
> Intel: 2 of 2 computers.  
> ARM: 0 of 2 computers.

Keep this immediately below, in readable type:

> First-start times; excludes Docker installation and package download.

Check the complete poster on the presentation television from the expected judging position. Readability of the labels—not just the large numbers—should determine whether this change is finished.

### 2. Cut repetition in Discussion and enlarge the remaining text

**Where:** Replace the entire Discussion text.

> **Observed:** All four tested computers ran the assignments and preserved coursework after workspace deletion. Neither ARM computer supported the debugger.
>
> **Possible explanation:** Translation software may explain the ARM limitation. These tests cannot separate its effects from other hardware and software differences.
>
> **Student consequence:** The tested ARM computers can prepare and run the assignments. Required debugger steps still need an Intel computer or the campus lab.

The chart already supplies opening times. Use the recovered space to enlarge this explanation.

### 3. Give Methods a short route through the retained technical detail

**Where:** Opening of Methods, above Technical Details.

Replace the two opening paragraphs with:

> **Test systems:** Three rented computers and my own laptop provided four test configurations.
>
> **Same test on each:**  
> Download → open editor → prepare and run four assignments → test debugger → delete workspace → check saved coursework.

In Technical Details, replace the Checks wording with:

> **Checks:** Confirm the same download on every computer using a file identifier. All four assignments must prepare and run without error. The assignment performing several streams of work must also produce its expected answer. The debugger must display the paused program’s current values and position.

Keep all machine specifications, the command, and measurement boundaries. This edit makes their purpose understandable without removing technical scrutiny.

### 4. Simplify Figure 1’s labels while retaining its structure

**Where:** Architecture diagram.

| Current wording | Replacement |
|---|---|
| “offline after first pull” | “Works offline after first download” |
| “VS Code interface served to the browser” | “Programming editor shown in the browser” |
| “Course toolchain” | “Tools to prepare and inspect programs” |
| “versions pinned by the instructor” | “Software releases fixed by the instructor” |
| “bind mount (two-way)” | “Shared coursework folder” |
| “Ordinary host folder” | “Coursework folder on this computer” |
| “host tool” | “Application on this computer” |

Enlarge the three main labels: **Web browser**, **Course workspace**, and **Coursework folder**. Secondary technical annotations can remain smaller.

### 5. Make Table 1’s essential rows and qualifications easier to read

**Where:** Results table and its footnote.

Visually emphasize the four capability rows and increase their type. Replace:

> Multithreaded answer correct

with:

> Parallel-work assignment: expected answer

Explain “parallel-work” in Methods as several streams of work performed at once.

Move the essential measurement qualification into a readable note:

> First-start editor times are shown. A second start was also timed. Each assignment was built once. Linux peak memory was not captured.

Replace:

> The Windows machine ran on a different cloud and size, so its seconds are indicative only.

with:

> The computers differed in provider and computing resources. Times describe these test systems.

Retain the detailed rows; reduce duplication elsewhere to make room.

### 6. Tighten Purpose/Aim and narrow “safe” to the tested outcome

**Where:** Replace Purpose/Aim text.

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer and opens in a browser.
>
> **Question:** Can the same workspace run assignments, preserve coursework after workspace deletion, and support the debugger on four tested configurations? How much download data, waiting time, and working memory does it require?
>
> **Contribution:** A repeatable evaluation of this assembly-course workspace, including its debugger limitation on ARM.

This retains the question while removing a long opening sentence and the overly broad safety wording.

### 7. Replace unexplained essentials without expanding the glossary

**Where:** Discussion, table, diagram, and Conclusions.

Use direct substitutions:

- “Intel’s instruction set” → **“the basic instructions understood by Intel-style processors”**
- “cloud VM” → **“rented virtual computer”**
- “IRB approval” → **“university ethics approval”**
- “CS 135 and CS 218” → **course names followed by those numbers**
- “could restore the debugger” → **“could enable debugger use on ARM”**

The existing glossary is already substantial. Plain wording at the point of use is more useful than additional small entries.

### 8. State the contribution relative to earlier work

**Where:** Replace the Contribution sentence or add one short sentence immediately below it.

A safe statement based on the poster is:

> Earlier work describes packaged programming workspaces. This project evaluates the UNLV assembly-course package on four configurations and documents its ARM debugger limitation.

This explains the local contribution without claiming that packaging tools or discovering ARM debugging limitations is unprecedented. If the student can support a more specific distinction from the cited studies, use that instead.

## 5. Speaker notes check

The opening works: it introduces the practical problem, explains the package, identifies the systems, and states both the result and its limits. It is approximately **197 spoken words**, rather than 180, requiring about **131 words per minute** for 90 seconds; that is feasible, but pauses around “container,” “ARM,” and “debugger” would help this audience. For the remaining talk, explain the processor distinction before comparing Intel and ARM, then use Figure 1 for one concrete student task and Table 1 for the capability finding.

VERDICT: NOT SATISFIED