# Judge’s scoresheet

**Perspective:** Faculty judge outside computer science, with no programming background. Evaluation is based on the supplied poster images, poster text, and speaker notes—not the linked materials. Readable crops help assess the wording; the full image determines whether the poster works on a television screen.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | The educational problem is clear: students lose time getting course software to work, and some computers cannot run it. The three explicit questions help, although “behave identically” needs a plain-language explanation of which capabilities are being compared. |
| **b. Readability** | **2/5** | The poster contains too much prose for a TV display, especially in Methods, Discussion, and Conclusions. Unexplained technical terms accumulate quickly, and several sentences require rereading even in the enlarged crops. |
| **c. Methods understandable to a non-CS judge** | **3/5** | I understand the basic experiment: use the same package on four computers, run actual assignments, measure performance, and check whether files survive. I cannot tell precisely what counts as “ready,” how correctness was established, whether measurements were repeated, or how closely the rented computers represent student laptops. |
| **d. Results** | **3/5** | “4 of 4,” “0.5 s,” and “552 MB” attract attention, and the bar chart makes the speed difference clear. However, the headline success claim does not prominently disclose the debugger limitation, and the numbers do not establish total installation time or student success. |
| **e. Scientific contribution** | **3/5** | A systematic compatibility test using real coursework is a credible undergraduate contribution, and reporting a limitation strengthens it. Claims about saving the first week, near-zero cost, and precisely identifying the cause of differences exceed the evidence presented. |
| **f. Visual design and organization** | **3/5** | The three-column organization, consistent headings, and restrained color scheme provide a clear structure. At full-poster size, the many similar paragraph boxes, small figure labels, and large header leave too little visual emphasis on the central finding and its exception. |
| **g. Overall** | **3/5** | This is a useful technical feasibility study whose presentation needs substantial adaptation for a general academic audience. The poster should distinguish demonstrated computer performance from anticipated benefits to students. |

**Overall letter grade: C+.** The technical testing is more persuasive than the accessibility and educational conclusions.

## 2. Vocabulary audit

“Defined?” below means explained **on the poster itself**, including the diagram. A reader should not need to visit the repository or wait for the talk.

### Main text, headings, and results

| Exact term or phrase | Defined? | Plain-language replacement or definition to add |
|---|---|---|
| “Decentralized” | Partly | “Runs on each student’s computer, without a shared university computer service.” |
| “Browser-Based” / “browser-served” | Partly | “The student opens the programming workspace in a web browser.” |
| “Docker” | No | “Software used to run a packaged set of course tools.” |
| “IDEs” / “IDE” | No | “Programming workspaces that combine writing, running, and checking programs.” Spell this out in the title or remove the acronym. |
| “C++” | Partly: associated with CS 135 | “A programming language taught in the introductory course.” |
| “x86-64” | No | “The processor instruction system taught in the assembly course.” |
| “Assembly” / “assembly” | No | “Programming using instructions closely tied to the computer’s processor.” |
| “CS 135” / “CS 218” | Yes in Introduction | Use “introductory programming” and “assembly programming” thereafter; course numbers alone add little for outside readers. |
| “compiler” | No | “A tool that converts a program into instructions the computer can run.” |
| “assembler” | No | “A tool that converts assembly-language instructions into a runnable program’s machine instructions.” |
| “linker” | No | “A tool that joins program pieces into a runnable program.” |
| “debugger” | Partly: missing register values described | “A tool for pausing a program and inspecting what it is doing.” This is essential to understanding the limitation. |
| “editor” | Partly in diagram | “The application students use to write programs.” |
| “GB” / “MB” | No | “Units of download or storage size.” For the comparison, use one unit consistently. |
| “virtual machine” | No | “A complete simulated computer running inside another computer.” Explain what the 19 GB figure measures. |
| “installs” | Context only | “Software installations.” |
| “help traffic” | No | “Requests for technical help.” |
| “environment mismatch” | No | “Differences between the software a student has and the software the course requires.” |
| “login servers” | No | “Shared university computers accessed remotely.” |
| “per-course virtual machines” | No | “A separate simulated computer setup for each course.” |
| “cloud editors” | No | “Programming workspaces provided through remote computers.” |
| “monitored platforms” | No | “Programming services that record student activity.” |
| “container” / “containers” | Partly: contents and location described | “A packaged workspace containing the course’s programming tools.” Explain how it differs from the much larger virtual machine. |
| “VS Code” | Partly: called an editor | “The application students use to write and edit programs.” The product name is secondary. |
| “package” | Partly | “The downloadable course workspace.” Use this consistently instead of alternating among package, container, and image without explanation. |
| “command” | Example shown, meaning unexplained | “One instruction entered into the computer to start the workspace.” |
| “server” | Partly | In “no server,” specify “no university-hosted service.” The diagram itself contains a local server. |
| “Windows” / “Windows 11” / “macOS” / “Linux” | No collective explanation | “Different operating systems—the software that manages a computer.” |
| “Intel” | No | “One processor family represented in this test.” |
| “ARM” | No | “A different processor family, used in Apple Silicon and other computers.” |
| “chips” | Context only | “Processors—the parts of computers that execute instructions.” |
| “Apple Silicon” | No | “Apple’s ARM-based processors.” Make its relationship to ARM explicit. |
| “PC” / “PCs” | No | “Personal computer.” More useful here: name the operating system and processor type. |
| “image” | No | “The downloadable file used to create the course workspace.” This is especially confusing on a poster containing visual images. |
| “multithreaded” | No | “Using multiple streams of work within one program.” Briefly explain why testing this assignment matters. |
| “MiB” | No | “A unit of working memory, slightly different from MB.” Distinguish working memory from download size. |
| “Memory while idle” | Partly: “idles” repeats the term | “Working memory used while the workspace is open but doing no coursework.” State what software the measurement includes. |
| “Peak memory during coursework” | No | “Highest working-memory use observed during the tested assignments.” |
| “builds” / “build time” / “build” | No | “Converts the written program into a form the computer can run.” |
| “Checks passed / failed” | Partly in footnote | “Number of test criteria met or unmet.” State what the criteria are and show unavailable capabilities separately. |
| “n/a” | No | Replace with the actual reason: “not measured,” “not available,” or “not applicable,” as appropriate. |
| “silent” | Partly in Discussion | “Debugger did not provide required information.” “Silent” alone does not explain whether a task can be completed. |
| “translation” / “translator” | Partly | “Software that lets one processor type run instructions written for another.” |
| “compile-heavy steps” | No | “Steps that spend most of their time converting programs into runnable instructions.” |
| “instruction set” | No | “The basic instructions a processor understands.” |
| “register values” | No | “Numbers held in the processor’s small internal storage locations.” Explain that inspecting these is required for the course task. |
| “translator boundary” | No | “A limitation of the software translating between processor types.” The poster also needs evidence for this causal conclusion. |
| “operating-system boundary” | No | “A limitation caused by Windows, macOS, or Linux.” Prefer a direct sentence about the observed pattern. |
| “Ubuntu Linux” | No | “A version of the Linux operating system used inside the workspace.” |
| “tool versions” | No | “The specific releases of the software required by the instructor.” |
| “g++” | No | “The C++ compiler.” Remove the product name from the main explanatory paragraph. |
| “yasm” | No | “An assembly-language conversion tool.” |
| “nasm” | No | “Another assembly-language conversion tool.” |
| “ld” | No | “The tool that joins program components.” |
| “gdb” | No | “The tool used to pause and inspect running programs.” |
| “script” / “test script” | Partly: actions listed | “An automated checklist that performs the same tests on each computer.” |
| “image fingerprint” | No | “An identifier used to verify that each computer received the same downloadable file.” |
| “assembles, links, runs, and debugs” | No | “Converts a program, joins its parts, runs it, and checks its internal behavior.” |
| “M1 Pro MacBook Pro” | No processor explanation | “The researcher’s Apple laptop with an ARM-based processor.” Keep the exact model in a small test-details table. |
| “recipe” | No | “The instructions used to create the downloadable course workspace.” |
| “IRB-approved” | No | “Approved by the university committee that reviews research involving people.” Clarify whether approval has already been obtained. |
| “instruments adapted from” | No | “Surveys or measurement procedures adapted from earlier studies.” Specify which kind. |
| “hybrid ARM container” | No | “A proposed workspace that runs some components directly on ARM and translates others.” |
| “natively” | No | “Directly on that processor, without translation.” |
| “repository” | No | “The online collection of project materials.” |
| “raw results” / “output files” | No | “The original measurements saved by the automated tests.” |
| “tests/record-results” | No | “The folder containing the saved measurements.” Keep the technical path behind a link or QR code. |

### Diagram and command line

These labels are particularly difficult because their type is already small.

| Exact term or phrase | Defined? | Plain-language replacement or definition to add |
|---|---|---|
| “first pull” | Partly through the caption | “First download.” |
| “http://127.0.0.1:\<course port\>” | No | “A browser address that connects to this same computer.” |
| “code-server” | Partly: “VS Code interface served to the browser” | “Software that displays the programming editor in the browser.” |
| “Course toolchain” | Partly: components listed | “The tools needed to prepare, run, and inspect course programs.” |
| “versions pinned by the instructor” | No | “The instructor fixes the software versions so students use the same releases.” |
| “Extensions & settings” | No | “Added editor features and preset options.” |
| “preinstalled” | Context only | “Already included in the download.” |
| “autosave” | No | “Automatically saves students’ work.” |
| “built-in AI features disabled” | No acronym expansion | “The editor’s artificial intelligence features are turned off.” |
| “bind mount (two-way)” | No | “A connection that lets the workspace and the laptop access the same coursework folder.” |
| “Ordinary host folder” | Partly: student-owned coursework described | “Coursework folder on the student’s laptop.” |
| “host tool” | No | “An application installed directly on the laptop.” |
| “container and image replacement” | No | “Deleting and replacing the downloaded workspace.” |
| “docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide” | No; only its general purpose is implied | Replace the entire command with “Start the workspace and connect it to the student’s coursework folder.” Put the command in the handout. |

### Reference-only terminology

Bibliographic titles can remain exact, but they are not explanations of the underlying ideas.

| Exact term or phrase | Defined? | Suggested handling |
|---|---|---|
| “Containerizing CS50” | No | If discussed aloud: “Packaging the software for another introductory computing course.” |
| “DevContainers” | No | “Packaged programming workspaces.” |
| “Student Development Environments” / “Standardized Docker Environments” | No | “Consistent sets of programming tools for students.” |
| “Web-Based IDE” | No | “A programming workspace opened through a browser.” |
| “Real-Time Code Activity Monitoring” | No | “Recording programming activity as it happens.” |
| “Remote Access and File Storage” | No | “Using university computers and saving files over a network.” |
| “ITiCSE” / “SIGITE” | No | Computing-education publication or conference names; no need to teach these acronyms in the main poster. |
| “et al.” | No | “And colleagues.” Acceptable in references, but unnecessary elsewhere for this audience. |

### Long sentences

Counts below use whitespace-separated words; citation formatting can slightly change the count.

**Clearly over about 35 words:**

- **Introduction — 42 words:**  
  > Every year, several hundred UNLV students in the introductory C++ course (CS 135) and the x86-64 assembly course (CS 218) spend their first days making a compiler or assembler, a linker, a debugger, and an editor work on dozens of different laptops.

- **Purpose/Aim — 43 words:**  
  > Before the fellowship I built a fifth option, after login servers, per-course virtual machines, cloud editors, and monitored platforms: a Docker container holding each course’s exact tools plus the VS Code editor, running entirely on the student’s own laptop in a browser tab.

- **Methods — 40 words:**  
  > One unchanged script ran on four machines, each playing a fresh student laptop: Windows 11 and Linux PCs on Intel chips, Linux on an ARM chip (all three rented, under $10 in total), and an owned M1 Pro MacBook Pro.

- **Discussion — 37 words:**  
  > The translator cannot support the debugger: on a Mac it appears to run but prints no register values, so the handout tells Apple Silicon owners to finish debugger assignments on an Intel machine or in the lab.

- **Speaker notes — 37 words:**  
  > I rented four kinds of computer and ran one unchanged script on each: it downloads the image, opens the editor, runs four real CS 218 assignments, tries the debugger, and checks that files survive deleting the container.

**At or near the threshold, and still overloaded:**

- **Methods — 35 words:**  
  > Two containers, one per course, built from Ubuntu Linux with the browser-served VS Code editor and the exact tool versions the instructor chose (g++ for CS 135; yasm, nasm, ld, and gdb for CS 218).

- **Methods — 34 words:**  
  > It records the image fingerprint, times editor start-up, assembles, links, runs, and debugs a program, builds four real CS 218 assignments (one multithreaded), then deletes the container and checks that the student’s files survive.

- **Future Research — 34 words:**  
  > An IRB-approved classroom study in CS 135 and CS 218 measuring how many students reach a working setup without help and how much staff time it saves, using instruments adapted from [3, 4, 6].

- **Speaker notes — 35 words:**  
  > All four machines passed every assignment; the editor opens in half a second on Intel chips and about five seconds on Apple Silicon; the download is 552 MB instead of a 19 GB virtual machine.

The 34-word methods sentence is particularly difficult because it packs nearly the entire experiment into one sequence of technical verbs.

## 3. Scientific contribution

### What I understand the student discovered

The student packaged course programming tools into a smaller workspace that runs on an individual computer and tested it on four computer configurations. All four ran the four tested assembly assignments correctly and preserved coursework after workspace deletion, but the ARM computers started more slowly and did not provide the debugger capability needed for some coursework. The contribution is evidence about where this particular package works and where it falls short.

### How convincing is it?

**The poster convinces me of limited technical feasibility. It does not yet convince me of improved student outcomes or universal compatibility.** Its strongest evidence is the combination of actual course assignments, an automated procedure, measured differences, and a disclosed limitation.

The following issues weaken the claims:

- **Four computers provide examples, not broad coverage.** There is one tested configuration per category. The title’s “laptops students actually own” promises more direct representation than three rented systems and one owned laptop establish.
- **No students were studied.** “Week one goes to learning, not installing” is an intended benefit. Neither student setup success nor instructional time saved was measured.
- **The reported tests concern CS 218.** Building a second package for CS 135 does not establish that it received equivalent evaluation.
- **The time measurements lack a clear boundary.** Does “editor ready” begin after Docker is installed and running? Does it exclude downloading, configuration, and troubleshooting? A half-second opening time is not a half-second first-time setup.
- **Repeatability is unclear.** There are no repetition counts or ranges. The poster gives precise timings without showing their variability.
- **The memory measurements need a denominator.** Are they for the workspace alone or the complete supporting software? Why is one peak-memory value missing?
- **The virtual-machine comparison is incomplete.** It is unclear whether 552 MB and 19 GB represent comparable download or installed sizes. The claim that the virtual machine takes minutes lacks a corresponding comparison method.
- **An identical package does not isolate the cause of performance differences.** Hardware, operating system, translation software, resource allocation, and starting conditions could differ. “Any difference is due to the machine” is too broad to be informative.
- **The debugger explanation is stronger than the displayed evidence.** The observations support a limitation in the tested ARM setups. Establishing that translation is the cause requires additional evidence beyond the outcome table.
- **“12 / 0” can conceal the practical limitation.** The footnote honestly explains the exclusion, but students still lose a required capability. Show that capability as unavailable in the main results.
- **Novelty is insufficiently distinguished from prior work.** The references show that others have packaged course environments. Explain what this evaluation adds beyond those projects.

### Questions for the four-minute Q&A

I would prioritize these:

1. **What must a student install or configure before your half-second timing begins, and what is the total first-time setup process?**
2. **Were the rented computers physical laptops or virtual systems, and how do they represent the computers students bring to class?**
3. **How many times did you repeat each measurement, and how did you determine that each assignment’s answer was correct?**
4. **If an ARM student cannot complete debugger assignments, how much of the course can that student actually complete independently?**

If time permits: **What is new compared with the earlier course-packaging projects you cite, and what classroom result would demonstrate that your approach is better?**

## 4. Top eight changes before presentation day

### 1. Make the central result and exception equally prominent

**Where:** Results, immediately above the three numerical callouts.

Add:

> **All four tested computers ran the course assignments correctly. The two ARM computers could not provide the required debugger information.**

Change “4 of 4” to **“4 tested computers”** and its explanation to **“All ran four assembly-course assignments correctly.”** Give **“Debugger unavailable on ARM”** its own visible callout rather than relying on a table row and footnote.

### 2. Remove conclusions that imply measured educational benefits

**Where:** Conclusions, “Week one goes to learning, not installing.”

Replace with:

> **The package worked on four tested computer configurations. Whether it reduces students’ setup time or requests for help remains untested.**

In Discussion, replace “the cost is close to zero” with:

> **On the two tested Intel computers, the editor opened in 0.5–0.6 seconds under the test conditions.**

Retain the intended student benefits, but label them as goals.

### 3. Cut prose substantially and enlarge the remaining text for TV viewing

**Where:** Introduction and Purpose/Aim first.

Replace the Introduction paragraph with:

> **Students need several tools before they can begin programming coursework. Differences among their computers can delay setup, and some newer Macs cannot run the course’s existing virtual machine.**

Replace the first Purpose/Aim paragraph with:

> **I packaged the course tools into a workspace that opens in a browser and runs on the student’s computer. I tested whether it could run course assignments, how much time and memory it needed, and which capabilities were unavailable.**

Aim to remove roughly half the current prose across the poster. Check the revised slide full-screen on a television from the expected judging distance.

### 4. Replace the technical methods paragraph with a visible test sequence

**Where:** Methods, “How we tested it.”

Use:

> **Test:** Three rented computers and my own Apple laptop.  
> **Procedure:** Run the same automated checklist on each computer.  
> **Tasks:** Run four course assignments, try the debugger, and check that coursework survives deleting the workspace.  
> **Measurements:** Editor opening time, working-memory use, and assignment preparation time.

Add the timing start/end points, repetition count, and correctness criterion. If a measurement was taken only once, say so; do not imply repeated trials.

### 5. Give the title and essential vocabulary a general-audience entry point

**Where:** Header and first mention of the package.

Replace the title with:

> **Can One Downloadable Programming Workspace Support Different Student Computers?**

Use a smaller subtitle:

> **Testing course assignments on four Windows, Linux, and Mac configurations**

At first mention, add:

> **Docker runs a packaged workspace containing the course tools. A debugger lets students pause a program and inspect its internal activity.**

Define **ARM** and **Intel** beside the comparison chart. Remove tool product names from the main prose.

### 6. Make the results table explain its measures and missing capabilities

**Where:** Table 1 and Figure 2.

Replace:

- “Debugger” → **“Can inspect program internals?”**
- “silent” → **“No required information”**
- “Heaviest assignment builds in (s)” → **“Time to prepare the largest tested assignment to run (seconds)”**
- “Checks passed / failed” → separate counts for **met**, **failed**, and **unavailable/excluded**
- “n/a” → the actual reason the measurement is absent

Add directly under the chart:

> **These are editor opening times, not total first-time installation times.**

Use that wording only if it accurately describes the measurement; otherwise state the actual boundary.

### 7. Replace the command and miniature architecture details with a simple explanation

**Where:** Methods command strip and Figure 1.

Delete the command from the poster and replace the detailed diagram with three large boxes:

> **Student opens browser → Course workspace runs on the laptop → Coursework stays in the student’s folder**

Caption:

> **The workspace runs locally. Coursework remains in the student’s folder when the workspace is deleted.**

Move setup commands, tool names, and connection details to the handout. Use the recovered space to enlarge the main results chart.

### 8. Separate supported findings, proposed explanations, and future work

**Where:** Discussion and Future Research.

Replace “any difference is due to the machine, not the package” with:

> **Each computer received the same package. These tests do not separate the effects of hardware, operating system, and translation software.**

Replace the categorical debugger explanation with:

> **The debugger did not provide required information on either tested ARM computer. This pattern is consistent with a limitation of the translation setup.**

Replace the future-work passage with:

> **Next, test whether students can complete setup without help and measure the time required. A proposed redesign will also be tested for debugger support on ARM computers.**

State separately whether ethics approval has already been obtained or will be sought.

## 5. Speaker notes check

The pitch has a useful problem–test–result–limitation structure and can work as the opening of a six-minute talk, but it repeats unexplained terms and presents first-week savings too confidently. Replace “I rented four kinds of computer” with “I tested three rented computers and my own laptop,” define the workspace and debugger in ordinary language, and distinguish editor opening time from total setup time. Use the remaining talk time to explain one student task, show the evidence, and describe what an ARM student still cannot complete.