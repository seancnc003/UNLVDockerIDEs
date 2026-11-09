# Judge’s scoresheet — Round 3

**Perspective:** Faculty judge outside computer science, with no programming background. Assessment uses the supplied poster images, poster text, speaker notes, and previous scoresheet only.

**Assessment:** This revision communicates a credible, limited finding much more honestly. The visible overflow is repaired, essential definitions are improved, and the contribution is now explicit. The remaining obstacle is readability on a television: fitting everything inside its boxes has not made all of it readable at judging distance.

I have not deducted for the locked title or author line, the four-machine sample, the absence of a student study, retaining Figure 1, or including technical specifications and procedures.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | I understand the practical question: can students use the same packaged programming workspace on different computers, with what costs and limitations? The three questions help, although “costs” combines download size, waiting time, and working memory without explaining their different practical consequences. |
| **b. Readability** | **3/5** | Definitions of editor, build, container, and debugger substantially improve accessibility, and text now fits within its panels. However, Methods, the results table, diagram labels, and footnotes remain too small and dense for comfortable television viewing; important qualifications require the readable crops. |
| **c. Methods understandable to a non-CS judge** | **4/5** | I can follow the test sequence, distinguish rented computers from the owned laptop, and understand what was measured. The timing boundary, memory scope, assignment-build count, and two startup measurements are now stated; the table still does not identify which startup measurement it displays. |
| **d. Results** | **4/5** | Within 30 seconds, the headline and callouts communicate that all four computers ran the assignments and neither ARM computer supported the debugger. The chart gives the waiting times meaning, but the large “552 MB” and “0 of 2” still depend on small explanatory text. |
| **e. Scientific contribution** | **4/5** | The contribution is now appropriately framed as a documented evaluation of this particular course package, including a consequential limitation. The poster clearly states that student outcomes were not tested; causal wording and “do every assignment” still need tightening. |
| **f. Visual design and organization** | **4/5** | The columns, section headings, aligned panels, and central Results section establish a usable structure, and the previous clipping is resolved. The oversized glossary and repeated findings consume space that could make the chart and essential explanations more readable. |
| **g. Overall** | **4/5** | This is a defensible undergraduate feasibility study whose main finding and limits are now understandable. It still needs a focused presentation edit so a general judge can read the supporting meaning on the television without relying on the talk. |

**Overall letter grade: B+.** The remaining readability score prevents satisfaction of the specified threshold.

### Response to the previous scoresheet

“Addressed” means the concern has been resolved substantively; it does not require following the previous wording exactly.

| Previous concern | Status | Evidence in this revision |
|---|---|---|
| Research questions needed practical, plain-language focus | **Addressed** | Q1–Q3 identify assignment execution, resource costs, and limitations. |
| Text overflow and clipping | **Addressed** | Purpose/Aim, Methods, and the table note now remain inside their panels. |
| Excessive prose and poor television readability | **Partially addressed** | Containment is fixed, but substantial text remains small and dense. |
| Essential vocabulary unexplained | **Partially addressed** | Editor and build are now defined; virtual machine, working memory, multithreaded, and instruction set remain unexplained. |
| Methods lacked a clear sequence and correctness criterion | **Addressed** | Tasks explicitly distinguish running without error from checking the multithreaded assignment’s expected answer. |
| Rented computers insufficiently distinguished from student laptops | **Addressed** | Providers, rental status, owned laptop, and sample limitations are explicit. “Stood in for” could still sound more representative than demonstrated. |
| Repetition and missing measurements unclear | **Partially addressed** | One build per assignment, two startup timings, and the missing Linux peak are explained. Download repetition and which startup value appears in the table remain unclear. |
| Debugger limitation buried | **Addressed** | It appears in the Results headline, callout, table, Discussion, and Conclusions. |
| Startup timing confused with total setup | **Addressed** | Methods and the chart caption explicitly exclude Docker installation; the chart also excludes package download. |
| Table concealed unavailable capabilities | **Addressed** | Debugger entries explicitly say “no,” with the unavailable-check convention explained. |
| Educational benefits presented as demonstrated | **Addressed** | Setup success, time saved, and help requests are explicitly untested. The pitch no longer claims a lost first week. |
| Causal explanation too strong | **Partially addressed** | “Possible explanation” and the caveat help, but “the translator is the likely cause” still suggests a causal ranking these comparisons do not establish. |
| Download-versus-virtual-machine comparison ambiguous | **Partially addressed** | The poster now identifies a 552 MB download and a 19 GB disk. Those are different quantities, and the distinction deserves more prominence. |
| Contribution relative to previous projects implicit | **Addressed at the level needed here** | The new Contribution sentence identifies the package-specific evaluation and ARM debugger limitation. A brief distinction from earlier work would strengthen it further. |
| Technical command and diagram overwhelmed the explanation | **Partially addressed** | Keeping both is appropriate. Their plain-language route remains too small, and several diagram labels retain unexplained terminology. |
| Ethics approval and future-study status ambiguous | **Addressed** | “Seek IRB approval” clearly places approval and the classroom study in the future. |
| Pitch misidentified machines or overstated outcomes | **Mostly addressed** | Machines and study limits are described accurately. “The newest Macs” remains broader than the poster’s “Some newer Macs.” |
| Unsupported build-time ratio | **Addressed** | Absolute times replace the previous ratio. |
| Memory measurement scope unclear | **Addressed** | Methods explicitly includes editor and tools and excludes browser and Docker. |
| “Recorded nothing” too absolute | **Addressed** | The narrower statement concerns student-activity monitoring. It remains a design statement rather than a measured educational outcome. |

No major concern was wholly ignored. Several were resolved in wording but only partly resolved in the visible presentation.

## 2. Vocabulary audit

**Definition status refers to the poster itself, including Figure 1 and its caption.** Related exact terms are grouped. This is an audit of potential stumbling points, not a recommendation to add every item to the glossary; many should simply be replaced or confined to clearly labeled technical details.

### Main text, title, and results

| Exact term or phrase | Defined? | Plain-language replacement or definition |
|---|---|---|
| “Decentralized” | Indirectly | “Runs on each student’s computer without a shared university service.” Explain below the locked title. |
| “Browser-Based” | Indirectly | “Opened through a web browser.” |
| “Docker” | Yes | Software that runs the packaged course workspace. |
| “IDEs” / “IDE / editor” | Yes, functionally | The glossary works; optionally expand IDE as “integrated development environment.” |
| “C++” | No | “A programming language.” |
| “x86-64” | No | “The family of processor instructions taught in the assembly course.” |
| “Assembly” / “assembly-course” | No | “Programming using instructions closely tied to a computer’s processor.” |
| “programming tools” | Partly | “Applications used to write, prepare, run, and inspect programs.” |
| “virtual machine” / “cloud virtual machines” | No; rental context supplied | “A simulated computer running within another computer”; for the test systems, “rented virtual computers accessed over the internet.” |
| “19 GB disk” | Size basis partly clarified | “A virtual-computer disk occupying 19 GB.” Clarify whether this is allocated capacity or actual file size. |
| “Container” / “container” | Yes | The ready-made-package definition is useful. “Course workspace” is easier in ordinary prose. |
| “Image” | Yes | The definition successfully distinguishes this from a picture. |
| “code editor” / “editor” | Yes | “The application students use to write programs.” |
| “browser tab” / “web browser” | Assumed | “A page opened in an internet-browsing application.” Usually sufficient to explain orally if needed. |
| “package” / “course-package” | Partly | “Downloadable course workspace.” Use consistently. |
| “command” | Purpose shown, meaning unstated | “A typed instruction that starts the workspace.” |
| “university server” / “course server” | Indirectly | “A university computer providing the workspace over the internet.” |
| “computer configurations” | No | “The combinations of hardware and operating system tested.” |
| “Windows” / “Windows 11” / “macOS” / “Linux” | No collective explanation | “Different operating systems—the main software managing a computer.” |
| “Intel” / “ARM” / “Intel-style chips” | Partly | The glossary identifies processor families, but should first explain a processor as the part that carries out program instructions. |
| “Apple Silicon” | Yes, indirectly | “Apple’s ARM processors.” |
| “processor” / “chips” | No direct definition | “The part of a computer that carries out program instructions.” |
| “build” / “built” / “build time” | Yes | “Prepare a written program so the computer can run it”; build time is how long that preparation takes. |
| “run” | Context only | “Have the computer carry out the program.” Distinguish this from preparing it. |
| “start-up time” | Yes, elsewhere | “Waiting time from starting the workspace until its editor responds.” |
| “memory” | Scope defined; concept not defined | “Temporary working space used while software runs, distinct from saved-file storage.” |
| “multithreaded” / “Multithreaded answer correct” | No | “The assignment that performs several streams of work at once”; “Expected answer obtained.” |
| “known answer” | Context only | “The expected answer used to check the result.” |
| “MB” / “GB” | No | “Units of download or storage size; 1 GB is about 1,000 MB.” |
| “MiB” | Partly: “about a megabyte” | “A unit of working-memory use, close to MB.” |
| “s” | Indirectly through the chart | “Seconds.” Spell it out in main callouts. |
| “PC” | No | “Personal computer.” |
| “cores” | No | “Processing units within a computer’s processor.” |
| “cloud VM” | Partly | “Rented virtual computer.” Expand VM at first use. |
| “AWS” | Amazon named | “Amazon’s rented computing service.” |
| “Azure” | Microsoft named | “Microsoft’s rented computing service.” |
| “M1 Pro” / “Graviton” | Processor family supplied | Processor-model names; retain in specifications with “processor model” as a label. |
| “MacBook Pro” | Identified as owned laptop | Apple laptop model; no additional glossary space needed. |
| “Container memory while idle” | Scope supplied; idle undefined | “Workspace working memory while open but doing no assignment work.” |
| “Container memory peak, assignments” | Partly | “Highest observed workspace working-memory use during assignments.” |
| “Checks met / failed / unavailable” | Partly, in footnote | “Requirements satisfied / not satisfied / capability unavailable.” Explain that unavailable debugger support still matters to students. |
| “memory sampler” | No | “The tool that periodically records working-memory use.” |
| “different cloud and size” | No | “A different rental provider and different computing resources.” |
| “indicative only” | No | “These times describe the tested computers; they do not isolate processor or operating-system effects.” |
| “Debugger” / “debugger” | Yes | The pause-and-inspect definition works. |
| “instruction set” | No | “The basic instructions a processor understands.” |
| “Translator” / “translator” | Yes, with an overgeneralized qualifier | “Software that runs instructions written for a different processor family; some features may be unavailable.” |
| “Intel-built package” | Partly through other definitions | “The workspace prepared for Intel-style processors.” |
| “processor family” | Partly | “A group of processors that understand the same basic instructions.” |
| “IRB approval” | No; future status clear | “University ethics approval for research involving people.” |
| “CS 135” / “CS 218” | Partly | “Introductory programming” / “assembly programming.” |
| “redesigned ARM container” | Partly | “A revised course workspace designed for ARM processors.” |

### Methods, project materials, and Figure 1

| Exact term or phrase | Defined? | Plain-language replacement or definition |
|---|---|---|
| “Code” | No | “The written instructions that make up a program.” |
| “test script” | Indirectly | “A program that performs the same tests automatically.” |
| “raw results” | No | “Original measurements saved by the tests.” |
| “automated checklist” | Functionally | “The same sequence of tests performed automatically on every computer.” |
| “fresh student laptop” | No | “A computer being set up for the course for the first time.” Better here: “a test configuration for initial setup.” |
| “specifications” | Context only | “Details of the computer’s hardware and operating system.” |
| “digital fingerprint” | Partly: purpose explained | “A file identifier used to check that every computer received the same download.” |
| “docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide” | General purpose only | Keep the exact command. Add: “Starts the workspace and connects it to the coursework folder.” |
| “web page answers the browser” | Operational meaning partly supplied | “The editor’s web page responds to a browser request.” This does not necessarily mean a student has completed a task. |
| “STUDENT’S OWN MACHINE” | Context only | “Student’s own computer.” |
| “offline after first pull” | Partly in caption | “Works without internet after the first download.” State the intended scope of offline use. |
| “http://127.0.0.1:<course port>” | No | “The browser address for the workspace on this computer.” |
| “Docker container (runs locally)” | Partly | “Course workspace running on this computer.” |
| “code-server” | Yes, approximately, in caption | “Software that displays the programming editor in the browser.” |
| “VS Code interface served to the browser” | Partly | “The programming editor appears in the browser.” |
| “Course toolchain” | Components listed | “Tools for preparing, running, and inspecting course programs.” |
| “compiler” | No | “A tool that converts a written program into instructions the computer can run.” |
| “assembler” | No | “A tool that converts assembly-language instructions into machine instructions.” |
| “versions pinned by the instructor” | No | “The instructor selects fixed software releases so everyone uses the same ones.” |
| “Extensions & settings” | No | “Added editor features and preset options.” |
| “preinstalled” | Context only | “Already included.” |
| “autosave” | No | “Automatically saves work.” |
| “built-in AI features disabled” | No acronym expansion | “The editor’s artificial intelligence features are turned off.” |
| “bind mount (two-way)” / “bind mount” | Partly, in caption | “A coursework folder shared between the workspace and the student’s computer.” |
| “Ordinary host folder” | Partly | “Coursework folder on the student’s computer.” |
| “host tool” | No | “An application installed directly on the student’s computer.” |
| “container and image replacement” | Partly | “Deleting and replacing the downloaded workspace.” |
| “pull” | Yes, in caption | “Download.” Prefer the familiar word in the diagram too. |
| “output files” | Context only | “Files containing measurements saved by the tests.” |
| “archived” | Context only | “Saved for later inspection.” |
| “project repository” | No | “The online collection of project materials.” |

### Reference-only terminology

These titles should remain accurate. They do not all require glossary entries, but should be explained if used in the talk.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50” | No | Packaging the programming tools for another computing course. |
| “DevContainers” | No | Packaged programming workspaces. |
| “Student Development Environments” | No | The programming tools and workspace students use. |
| “Standardized Docker Environments” | Partly through glossary | The same packaged programming workspace for everyone. |
| “Virtual Machines” | No | Simulated computers running within other computers. |
| “CodeDive” | Partly through its title | Name of a programming platform described in earlier research. |
| “Web-Based IDE” | Functionally | A programming workspace opened through a browser. |
| “Real-Time Code Activity Monitoring” | No | Recording programming activity as it happens. |
| “Remote Access and File Storage” | No | Using another computer and saving files over a network. |
| “ITiCSE” / “SIGITE” | No | Names of computing-education publication venues. Expansion is unnecessary for the main argument. |
| “et al.” | No | “And colleagues.” Conventional academic usage; low priority. |

Terms suggested in the prompt that do **not** appear in the supplied poster are not included as poster vocabulary.

### Long sentences

One poster sentence exceeds approximately 35 words:

**Purpose/Aim — 37 words:**

> Before the fellowship I packaged the course tools and a code editor into a container that runs on the student’s own computer and opens in a browser tab: one download, one command, no university server, no account.

Replace with:

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer. It opens in a browser without a university server or account.

One sentence is just below the threshold but still overloaded:

**Methods — 34 words:**

> Editor opening time: seconds from starting the container until the editor’s web page answers the browser, measured on the first start and again after replacing the container; installing Docker is not included or measured.

Replace with:

> We timed how long the editor’s web page took to respond after the workspace started. We measured the first start and a start after replacing the workspace. Docker installation was not timed.

The greater problem is cumulative density: many short sentences together still make a panel difficult to read.

## 3. Scientific contribution

### What I understand the student discovered

The student evaluated a downloadable assembly-course workspace on four computer configurations using the same automated tests and four assignments. All four configurations prepared and ran the assignments and preserved coursework after workspace deletion, but neither ARM configuration supported the debugger. The contribution is a documented account of where this particular workspace works and where students would still need another computer.

### Did the poster convince me?

**Yes, for that limited feasibility claim.** The table supports the main capability comparison, the unavailable debugger is conspicuous, and the Conclusions box honestly separates technical results from untested educational benefits.

The remaining qualifications concern interpretation, not demands for additional machines or a new student study:

- **Novelty is now stated, but comparison with earlier work remains thin.** I understand what this project adds locally; I do not yet understand whether earlier studies tested comparable assignments or reported the same limitation.
- **Running is distinguished from answer checking.** Methods now says all assignments had to run without error, while one also had an expected-answer check. Preserve that distinction; successful execution alone does not establish correctness for all four.
- **Translation is a hypothesis.** The same downloaded file helps hold the package constant, but the machines differ in other ways. “Likely cause” is stronger than necessary.
- **The practical consequence contains an ambiguity.** “A student can do every assignment” sounds like independent completion, even though required debugger steps need another computer.
- **The timing results are descriptive.** One build per assignment and two startup measurements are acceptable for this feasibility report, but do not establish stable performance differences across entire processor families.
- **The size comparison needs care.** A package download and a virtual-machine disk are different measures. The poster should not invite an unsupported reduction factor or imply equal total installation requirements.
- **No student benefit has yet been demonstrated.** The poster now states this honestly. The claim that the workspace does not monitor activity is a design characteristic, not evidence of improved learning or privacy outcomes.

### Questions for the four-minute Q&A

I would prioritize these four:

1. **What does this evaluation add beyond the packaged course workspaces in your references?**
2. **For an Apple Silicon student, which required steps can be completed on their own computer, and which require the campus lab?**
3. **How were the four assignments checked, and what does “ran without error” establish about their answers?**
4. **Which of the two startup measurements appears in the table, and what observation would help distinguish translation effects from other machine differences?**

## 4. Top eight remaining changes before presentation day

These changes preserve the locked title, technical procedure, machine specifications, and architecture diagram.

### 1. Make the meaning of the Results callouts readable

**Where:** The four numerical cards at the top of Results.

The large numbers are visible sooner than the words that explain them. Replace the small explanatory paragraphs with short labels, then enlarge those labels:

> **4 of 4**  
> Tested computers ran all four assignments.
>
> **0.5–0.6 seconds**  
> Editor opening on Intel; 4.8–6.7 seconds on ARM.
>
> **552 MB download**  
> Course workspace; Docker installed separately.
>
> **0 of 2 ARM computers**  
> Debugger available on neither. Available on both Intel computers.

Place this directly below the cards in readable type:

> Opening times exclude Docker installation and package download.

Keep the expected-answer result in the table. Test the complete slide on a television at the expected judging distance; enlarge the labels until they can be read without approaching the screen.

### 2. Shorten Discussion and remove the completion ambiguity

**Where:** Replace the entire Discussion text.

> **Observed:** All four tested computers ran the assignments and preserved coursework after workspace deletion. Neither ARM computer supported the debugger.
>
> **Possible explanation:** Translation software may explain the ARM limitation. These tests do not separate its effects from other hardware and software differences.
>
> **Consequence for students:** The tested ARM setups can prepare and run all four assignments. Required debugger steps still need an Intel computer or the campus lab.

The chart already displays opening times. Repeating every timing here uses space needed for larger text.

### 3. Give Methods a short, readable route through the retained technical detail

**Where:** Methods, before the exact command and measurement details.

Replace the opening description with:

> **Test systems:** Three rented virtual computers and my own laptop represented four test configurations.
>
> **Same test on each:** Download the workspace → open the editor → prepare and run four assignments → test the debugger → delete the workspace and check that coursework remains.

Keep providers, costs, specifications, command, and measurement definitions in a clearly labeled **Technical details** block within the panel. Replace the 34-word timing sentence with the three shorter sentences in the vocabulary audit.

This preserves technical scrutiny while giving the general judge a readable method.

### 4. Reduce Purpose/Aim to the question and contribution

**Where:** Replace the introductory paragraph and three questions in Purpose/Aim.

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer and opens in a browser.
>
> **Question:** On four tested computer configurations, can the same workspace run course assignments, preserve coursework, and support the debugger? How much download space, waiting time, and working memory does it use?
>
> **Contribution:** A repeatable evaluation of this assembly-course workspace, including its debugger limitation on ARM.

This removes “It worked on my laptop” and overlapping explanations to create room for larger type.

### 5. Replace low-value glossary wording with missing essential definitions

**Where:** Key Terms.

Replace the translator entry with:

> **Translator:** Software that runs instructions written for a different processor family. Some features may be unavailable.

Add:

> **Virtual machine:** A simulated computer running within another computer.
>
> **Working memory:** Temporary space used while software runs, distinct from saved-file storage.
>
> **Assembly:** Programming with instructions closely tied to a computer’s processor.

Replace “multithreaded” in the Results callout or table with:

> Assignment performing several streams of work at once

If space is tight, explain specialized specification terms orally rather than shrinking the glossary.

### 6. Make Figure 1 explainable from its visible labels

**Where:** Figure 1 annotations; retain the diagram and its structure.

Use these replacements:

| Current label | Replacement |
|---|---|
| “offline after first pull” | “Works offline after first download” |
| “VS Code interface served to the browser” | “Programming editor shown in the browser” |
| “Course toolchain” | “Tools to prepare, run, and inspect programs” |
| “versions pinned by the instructor” | “Software releases fixed by the instructor” |
| “bind mount (two-way)” | “Shared coursework folder” |
| “Ordinary host folder” | “Coursework folder on the student’s computer” |

Enlarge the three main labels—browser, workspace, coursework folder—even if secondary labels stay smaller.

### 7. Clarify what the displayed measurements represent

**Where:** Table note and the 552 MB card.

Move this information out of the tiny footnote into a readable note:

> Each assignment was built once. Editor opening was timed twice per computer: first start and after workspace replacement. Linux peak memory was not captured.

Then identify the table’s displayed startup value using the **actual** selection rule—first start, replacement start, average, or another summary. The poster does not currently tell me which is used; do not invent a rule.

Remove the 19 GB comparison from the small numerical card, or state separately:

> The existing virtual machine uses a 19 GB disk; 552 MB is this package’s download size. These figures measure different things.

### 8. Simplify Conclusions and align the pitch’s scope

**Where:** Conclusions/Future Research and the opening notes.

Replace Conclusions with:

> **Demonstrated:** Four tested configurations ran four assembly-course assignments and preserved coursework. Debugger support worked only on the two Intel configurations.
>
> **Not tested:** Student setup success, time saved, or requests for help.
>
> **Next:** Seek university ethics approval for a classroom study and evaluate a revised ARM workspace.

In the pitch, replace:

> the newest Macs cannot run the assembly course's 19 GB virtual machine at all

with:

> some newer Macs cannot run the course’s existing virtual machine

Replace:

> The question was whether that holds on the laptops students actually own, not just mine.

with:

> I tested whether the workspace worked across four computer configurations.

These edits preserve the accepted title while keeping spoken claims within the evaluated scope.

## 5. Speaker notes check

The opening now works: it introduces the problem, explains the package, identifies the test systems, and states both the finding and the debugger limitation. At approximately **221 spoken words**, it requires about **147 words per minute** to fit 90 seconds, leaving little time for an unfamiliar audience to absorb new terms; cut roughly 25–40 words or allow closer to two minutes. The proposed continuation—one task through Figure 1, a focused comparison from Table 1, and the limits—is appropriate for the six-minute talk.

VERDICT: NOT SATISFIED