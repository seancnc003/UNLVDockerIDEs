# Judge’s scoresheet — Round 6

**Perspective:** Faculty judge outside computer science, with no programming background. I read the previous scoresheet, the current poster text, and the speaker notes, and assessed the supplied images. I did not consult code, repositories, or linked project materials.

The revised poster communicates a credible finding: the tested package ran assignments on all four computers, but debugging remained unavailable on the two ARM computers. **The remaining obstacle is readability on a television.** Explanations visible in the enlarged crops are still difficult to read in the full-poster view.

I have not deducted for the locked title or author line, the four-machine sample, the absence of a student study, retaining Figure 1, or including technical specifications and procedures. I assess whether the poster communicates those choices and their limits clearly.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | The question identifies three understandable outcomes: running assignments, preserving coursework, and supporting debugging. “After deletion” should specify deletion of the workspace, since a general reader could interpret it as deleting the coursework itself. |
| **b. Readability** | **3/5** | Sentences are manageable, and several important terms now receive explanations. However, the glossary, detailed table, technical block, and figure annotations remain too small and dense in the full-poster view; providing definitions does not help enough if the viewer cannot comfortably read them. |
| **c. Methods understandable to a non-CS judge** | **4/5** | The two-line sequence gives me a clear account of what happened on each computer. The retained technical block explains success criteria and measurement boundaries, although the distinction between a responding editor page and a fully usable editor needs plainer wording. |
| **d. Results** | **4/5** | Within 30 seconds, I can identify the central finding: all four ran the assignments, and neither ARM computer supported debugging. The chart gives the waiting times meaning, but exclusions and cautions remain substantially smaller than the numbers they qualify. |
| **e. Scientific contribution** | **4/5** | The contribution is appropriately presented as an evaluation of UNLV’s package, with earlier packaged workspaces acknowledged. The poster honestly identifies untested student benefits and treats translation as a possible explanation rather than a demonstrated cause. |
| **f. Visual design and organization** | **4/5** | The columns, section headings, and central Results panel provide a clear reading structure. Repeated explanations and findings consume space that could make the essential content larger. |
| **g. Overall** | **4/5** | This is a defensible undergraduate compatibility study with a useful practical limitation. The scientific argument is substantially ready; the television presentation still requires a more selective, larger reading path. |

**Overall letter grade: B+.**

### Response to the previous scoresheet

“Addressed” means the substantive concern was resolved; it does not require adopting the previous wording exactly.

| Previous concern | Status | Assessment of this revision |
|---|---|---|
| Research question needed a practical focus | **Addressed** | The question now concentrates on assignments, coursework preservation, and debugging; measurements appear separately. |
| Text overflow or clipping | **Addressed** | No substantive clipping is apparent in the full-poster image. |
| Excessive prose and poor TV readability | **Partially addressed** | Wording is clearer, but the full display still contains too much small supporting text. |
| Essential vocabulary unexplained | **Partially addressed** | Processor families and debugger operation are explained. “MiB,” several measurement labels, and technical identifiers still require interpretation. |
| Methods lacked a sequence and correctness criterion | **Addressed** | The two-line checklist and separate expected-answer requirement are clear. |
| Rented systems insufficiently distinguished from student laptops | **Addressed** | Three rented virtual computers and one owned laptop are identified explicitly. |
| Repetition and missing measurements unclear | **Partially addressed** | One build per assignment, the missing memory peak, and omission of second-start results are disclosed. Repetition of download and opening measurements remains unspecified. |
| Debugger limitation buried | **Addressed** | It appears in the Results headline, a card, the table, and the interpretation. |
| Editor opening confused with total setup time | **Partially addressed** | The exclusions are explicit, but visually subordinate. “Editor opens” also sounds broader than the page-response measurement described in Methods. |
| Table concealed unavailable capabilities | **Addressed** | Debugger cells say “no”; the footnote explains “unavailable.” |
| Educational benefits presented as demonstrated | **Addressed** | Student setup success, time saved, and help requests are expressly untested. |
| Causal explanation too strong | **Addressed** | Translation is a possible explanation, and other differences are acknowledged. |
| Download versus virtual-machine disk comparison ambiguous | **Addressed in wording** | The glossary now explicitly says these are different measures. That explanation is still small. |
| Contribution relative to earlier work implicit | **Addressed** | The Contribution paragraph identifies the package-specific evaluation and debugger limit. |
| Technical command and diagram overwhelmed explanation | **Partially addressed** | Technical details are separated, the command’s purpose is explained, and Figure 1 has clearer connectors. Secondary diagram text remains small. |
| Ethics approval and future study status ambiguous | **Addressed** | “Seek university ethics (IRB) approval” clearly describes future work. |
| Pitch overstated coverage or student benefits | **Addressed** | The pitch identifies the rented computers and says no students have used the package yet. |
| Unsupported build-time ratio | **Addressed** | The poster reports absolute times. |
| Memory measurement scope unclear | **Addressed** | Methods distinguishes workspace memory from browser and Docker use. |
| Overbroad activity-recording claim | **Addressed** | The diagram makes the narrower statement that built-in AI features are disabled. |

Of the previous eight recommendations, the nearby definitions, Methods sequence, and shortened research question are substantially implemented. The Results cards, Discussion shortening, table enlargement, diagram enlargement, and measurement qualifications are **partially implemented**. No substantive concern was wholly ignored, but the main display problem remains.

## 2. Vocabulary audit

This audit includes the visible poster, technical block, diagram, and references. Related expressions are grouped, with quotations taken from the current poster. A definition elsewhere on the poster counts as a definition, although viewers may not find it quickly.

**The solution is not a larger glossary.** Use plain wording in the main reading path and keep specialist identifiers in the retained technical material.

### Main argument and findings

| Exact term or phrase | Defined on the poster? | Plain-language replacement or definition |
|---|---|---|
| “Decentralized” | Indirectly, through Figure 1 | Runs on each student’s own computer. Explain below the locked title. |
| “Browser-Based” | Indirectly | Opened through a web browser. |
| “Docker” | **Yes** | Software that runs the packaged course workspace. |
| “IDEs”; “IDE / editor” | **Yes, functionally** | Programming workspaces. IDE stands for integrated development environment. |
| “C++” | No | A programming language taught in the introductory course. |
| “x86-64” | No | The processor-instruction family used by this assembly-course package. |
| “Assembly”; “assembly”; “assembly-course” | **Yes**, through Key Terms | Programming with instructions closely tied to a computer’s processor. |
| “CS 135”; “CS 218” | **Partly**: subjects are identified | UNLV course numbers for introductory C++ and assembly programming. |
| “programming tools”; “course tools” | Partly, through the diagram | Applications used to write, prepare, run, and inspect programs. |
| “virtual machine” | **Yes** | A simulated computer running inside another computer. |
| “19 GB disk” | Partly | Storage assigned to the simulated computer; GB means gigabytes. |
| “container”; “Container” | **Yes** | A ready-made package of course software. |
| “package”; “packaged programming workspaces” | Partly, through “Container” | The course software bundled together for students to use. |
| “code editor”; “editor” | **Yes**, through “IDE / editor” | The application students use to write programs. |
| “browser tab”; “Web browser” | Not formally; likely familiar | A page within an application used to view websites. Low priority for explanation. |
| “configurations”; “test configurations”; “tested configurations” | Context only | The combinations of computer hardware and operating system tested. |
| “Build”; “built and ran”; “build and run” | **Yes** for “Build”; “run” is contextual | Prepare a program, then have the computer carry out its instructions. |
| “debugging”; “Debugger”; “debugger” | **Yes** | Pausing a program and inspecting its operation with a special tool. |
| “preserve coursework after deletion” | Partly, through Methods and Figure 1 | Keep coursework files after deleting the workspace. Specify what is deleted. |
| “assignment execution” | Through the definitions of building and running | Running assignments. |
| “coursework preservation” | Through Figure 1 | Coursework files remain after the workspace is deleted. |
| “Working memory”; “memory use” | **Yes**, through Key Terms | Temporary space used by running software, separate from saved files. |
| “processor”; “Processor families” | **Yes** | A processor carries out instructions; different families understand different instructions. |
| “Intel”; “Intel-style”; “Intel-style instructions” | **Partly**, through “Processor families” | The processor family for which this course package was prepared. |
| “ARM” | **Yes**, functionally | A processor family used by Apple Silicon Macs and one rented test computer. |
| “Apple Silicon” | **Yes**, by association with ARM | Apple’s ARM processors. |
| “Translator”; “translation software”; “translator” | **Yes** | Software that lets instructions intended for one processor family run on another. |
| “ARM debugger limit”; “debugger limit”; “debugging barrier” | Explained by the results | On these two ARM computers, the tool for pausing and inspecting programs did not work. |
| “552 MB download” | Download is identified; MB is not expanded | A download of 552 megabytes. This excludes installing Docker. |
| “0.5–0.6 s”; “4.8–6.7 s”; “(s)” | Indirectly, through Figure 2 | Seconds. Spell this out in prominent cards. |
| “first-start editor times”; “First-start times”; “second-start results” | Partly, in Timing | Measurements from the first workspace start, or after replacing and starting it again. |
| “PC” | No | Personal computer. |
| “Windows 11”; “Linux”; “Windows 11 Pro” | No explanation of their category | Operating systems: the main software managing a computer. |
| “cores” | No | Processing units within a processor. Appropriate for the technical specifications. |
| “16 GB”; “8 GB” | No explicit explanation | Amount of the computer’s working memory, in gigabytes. Label it as memory. |
| “M1 Pro”; “Graviton” | Associated with processor families | Processor-model names. |
| “MacBook Pro” | Context identifies it as the owned laptop | An Apple laptop model. No separate glossary entry is necessary. |
| “Azure”; “AWS” | Rental status is supplied | Microsoft’s and Amazon’s online computer-rental services. |
| “Parallel-work answer correct”; “parallel-work assignment” | **Yes**, in Methods | An assignment doing several streams of work at once produced its expected answer. |
| “Memory while idle”; “idle” | Not explicitly | Working memory used while the workspace is open without assignment activity. |
| “Peak memory during assignments”; “peak” | Not explicitly | Highest recorded working-memory use during assignments. |
| “MiB” | **No**; the caption names the unit without explaining it | A working-memory unit close to a megabyte. |
| “Slowest assignment build” | Through “Build” | Longest time needed to prepare one assignment to run. |
| “Checks met / failed / unavailable” | **Partly**, in the footnote | Requirements satisfied / not satisfied / capability unavailable. “Unavailable” still means that activity could not be completed. |
| “memory sampler” | No | A tool that periodically records working-memory use. |
| “provider and resources” | Context only | The company supplying the rented computer and its computing capacity. |
| “hardware and software differences” | Assumed | Differences in computer components and installed programs. |
| “Intel-built package” | Partly, through Discussion | The course workspace prepared for Intel-style processors. |
| “revised ARM container” | Through separate definitions | A revised workspace intended to support ARM computers. |
| “university ethics (IRB) approval” | **Yes, functionally** | University approval for research involving people; IRB means Institutional Review Board. |

### Methods, diagram, and project materials

| Exact term or phrase | Defined on the poster? | Plain-language replacement or definition |
|---|---|---|
| “Code” | No | Written instructions making up a computer program. |
| “test script”; “published test script” | Indirectly, through the checklist | A program that performs the tests automatically. |
| “raw results” | No | Original measurements saved by the tests. |
| “rented virtual computers” | Through rental status and the virtual-machine definition | Simulated computers rented through an online service. |
| “automated checklist” | Functionally | A sequence of tests carried out automatically. |
| “m8i.large”; “m8g.large”; “D4s_v5” | No | Rental-computer model identifiers. Retain in Technical Details. |
| “command” | **Yes, functionally**, through its stated purpose | A typed instruction that starts the workspace and connects the coursework folder. |
| “file identifier (checksum)” | **Yes, functionally** | A calculated identifier used to check that every computer received the same download. |
| “without error” | Not distinguished in the main result | The program completed without a reported execution error; this alone does not establish that every answer was correct. |
| “expected answer” | Context makes its purpose clear | The answer the assignment should produce. |
| “paused program’s values and position” | Partly | The information the program currently holds and the instruction where it stopped. |
| “editor’s web page answers the browser” | Describes a rule but uses awkward wording | The editor’s page responds to a browser request. |
| “container’s own use” | **Yes**, with exclusions | Working memory used by the workspace’s editor and tools. |
| “offline” | **Yes**, through Figure 1’s caption | Without an internet connection. |
| “Course workspace (Docker container)” | **Yes** | The packaged editor and course tools running on the laptop. |
| “code-server” | Its role is supplied by the surrounding phrase | Software that displays the programming editor in a browser. |
| “versions chosen by the instructor” | Context only | The instructor selects which releases of the software everyone uses. |
| “Editor settings preinstalled” | Context only | Editor options are configured in advance. |
| “built-in AI features disabled” | Partly; AI is not expanded | The editor’s artificial intelligence features are turned off. |
| “shared coursework folder (bind mount)” | **Yes, functionally**, through Figure 1 | A folder accessible from both the workspace and the laptop. “Bind mount” is the technical name for that connection. |
| “output files” | Context only | Files containing results saved by the tests. |
| “archived” | Not explicitly | Saved for later inspection. |
| “project repository” | No | The online collection of project materials. |
| “github.com/seancnc003/UNLVDockerIDEs” | Labeled as project materials | Online location of the code, handouts, tests, and original results. |
| “hub.docker.com/r/seancnc/unlv-cpp-ide”; “hub.docker.com/r/seancnc/unlv-x86-ide” | Their exact role is not stated | Download locations for the C++ and assembly workspaces. |

The displayed command is itself an unfamiliar expression:

> `docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide`

Its **purpose is now adequately explained**. Its options, address, port numbers, folder paths, and package identifier are not defined, but a general judge should not need to interpret them. Keep the exact command in the technical block.

### Reference-only vocabulary

These expressions belong to publication titles or citation details. Preserve titles accurately; explain their relevance in the contribution statement instead of adding them all to Key Terms.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50”; “CS50” | No | Packaging software for another programming course. |
| “DevContainers” | No | Packaged programming workspaces. |
| “Student Development Environments” | No | The software and workspace students use to create programs. |
| “CS” | Institutional context only | Computer science. |
| “Standardized Docker Environments” | Partly, through Key Terms | The same packaged programming workspace for everyone. |
| “Virtual Machines” | **Yes**, through Key Terms | Simulated computers. |
| “CodeDive” | Identified through its publication title | The name of an earlier programming platform. |
| “Web-Based IDE” | Functionally, through Key Terms | A programming workspace opened through a browser. |
| “Real-Time Code Activity Monitoring” | No | Recording programming activity as it happens. |
| “Remote Access and File Storage” | No | Using another computer and saving files over a network. |
| “ITiCSE”; “SIGITE” | No | Computing-education publication venues. |
| “et al.” | No; ordinary academic usage | And colleagues. Low priority for this audience. |

**Examples from the prompt that do not appear as terms in this revision:** “image,” “assembler,” “linker,” “gdb,” “yasm,” “nasm,” “ld,” “g++,” “VS Code,” “browser-served,” “multithreaded,” “register values,” “fingerprint,” and “instruction set.” They are not current vocabulary problems.

### Sentences longer than about 35 words

**No ordinary prose sentence in the poster exceeds approximately 35 words.** Sentence length is no longer a material weakness. The technical command, dense citation paragraph, table, and cumulative amount of prose remain visually demanding despite the shorter sentences.

## 3. Scientific contribution

### What I understand the student discovered

The student evaluated UNLV’s packaged assembly-programming workspace on four computer configurations using the same automated tests. All four built and ran four assignments and retained coursework after workspace deletion, but the two ARM computers could not use the debugger. The project therefore identifies where this particular package worked and where it still prevented a required course activity.

### Did the poster convince me?

**Yes, for that limited finding.** The table supports the capability claims, and the contribution statement distinguishes this evaluation from earlier work on packaged programming workspaces.

The following boundaries remain important:

- **Four configurations establish four examples.** Three are rented virtual computers, so this does not establish compatibility across the range of student-owned laptops. The poster acknowledges the sample honestly.
- **Running and correctness are different outcomes.** All four assignments ran without error; only the parallel-work assignment is explicitly described as having its answer checked. “Everything else ran” should remain restricted to the activities actually tested.
- **The times describe these systems.** Different providers, resources, and software environments prevent treating the Intel/ARM comparison as an isolated processor experiment.
- **Timing variability is not reported.** One build per assignment is disclosed. The number of download and first-start measurements is unclear, and no spread or uncertainty is shown.
- **“Editor opens” is broader than the stated timing rule.** A web page responding does not necessarily establish that a student can already begin working.
- **Student benefits remain untested.** Easier setup, fewer help requests, time saved, and learning gains have not been demonstrated. The poster states this appropriately.
- **The measured costs are incomplete.** Workspace memory and package download size do not establish total computer memory use, total installation storage, or total setup time.
- **Translation remains a hypothesis.** The observed debugging failure does not establish its cause.
- **Preservation has a specific scope.** Surviving deletion of the workspace does not mean the coursework is protected against other forms of data loss.

These are limits to interpretation, not demands for additional experiments before presentation day.

### Questions for the four-minute Q&A

I would prioritize four questions:

1. **If I were a student using your tested MacBook, which required course activities would still send me to the campus lab?**
2. **What did the four assignments represent, and how did you distinguish running without error from producing the correct answer?**
3. **What must a student install and do before your editor-opening timer begins, and exactly what stops that timer?**
4. **How many times were the download and opening measurements taken, and what did the omitted second-start results show?**

If time permits: **What comparison would help determine whether translation caused the debugger failure?**

## 4. Top eight remaining changes before presentation day

These changes retain the locked title and author line, technical details, exact procedure, four-machine scope, and Figure 1.

### 1. Remove repeated interpretation and spend the space on larger text

**Where:** Discussion and Conclusions/Future Research.

The same debugging limitation appears repeatedly. Combine the interpretation into one larger panel, using the recovered space to enlarge the right-column text:

> **Practical meaning.** All four tested computers ran the four assignments and retained coursework after workspace deletion. On the two tested ARM computers, assignments requiring the debugger still need an Intel computer or the campus lab.
>
> **Possible explanation.** Translation software may explain the debugger failure. Other hardware and software differences were not isolated.
>
> **Not tested.** Student setup success, time saved, help requests, or learning.
>
> **Next.** Seek university ethics approval for a classroom study and evaluate a revised workspace for ARM computers.

Keep the existing citations with the relevant future-work statement. Judge the new size from the full-poster view.

### 2. Give the Results panel a larger, shorter primary reading path

**Where:** Results headline and four cards.

Use two prominent capability cards, followed by a secondary measurement line. Replace their wording with:

> **Assignments ran: 4 of 4 computers**  
> Coursework also remained after workspace deletion.
>
> **Debugger worked: Intel 2 of 2; ARM 0 of 2**  
> A debugger pauses a program so students can inspect it.

Below those, place:

> **Editor-page response:** Intel 0.5–0.6 seconds; ARM 4.8–6.7 seconds.  
> **Package download:** 552 megabytes; installing Docker is additional.

Keep the timing exclusion immediately beside the times, in readable type:

> These times begin after Docker installation and package download.

This makes the finding and its meaning readable before viewers reach the detailed table.

### 3. Make Table 1’s capability rows visibly distinct from its measurements

**Where:** Table 1.

Create two labeled blocks within the table: **“Activities tested”** and **“Measurements on these computers.”** Enlarge the first four rows and use these labels:

> Four assignments built and ran  
> Parallel-work assignment produced expected answer  
> Coursework remained after workspace deletion  
> Debugger worked

Keep bold “yes” and “no.” Retain all specifications and numerical measurements, but reduce duplication between the headers and Technical Details.

Replace the caption with:

> **Table 1. Results for four tested computers. Timing differences cannot be attributed to processor family alone. MiB is a memory unit close to a megabyte.**

### 4. Shorten Key Terms and enlarge the definitions

**Where:** Key Terms.

The current two-column glossary contains useful explanations in type that is too small. Replace it with this shorter version and enlarge it:

> **Container:** A package of course software. **Docker** runs it.  
> **Virtual machine:** A simulated computer. Its 19 GB disk is a different measure from package download size.  
> **IDE / editor:** The application students use to write programs.  
> **Assembly:** Programming with instructions closely tied to a processor.  
> **Build:** Prepare a program so the computer can run it.  
> **Debugger:** A tool that pauses a program for inspection.  
> **Working memory:** Temporary space used by running software.  
> **Processor families:** Intel-style and ARM processors understand different instructions. Apple Silicon Macs use ARM.  
> **Translator:** Software that runs instructions intended for another processor family.

Do not add the technical model names to this box.

### 5. Name the timing measurement accurately and consistently

**Where:** Figure 2 title, timing card, table row, and Technical Details.

Replace:

> “Seconds from starting the container until the editor opens”

with:

> **Seconds from workspace start until the editor’s page responds**

Replace the Timing explanation with:

> We timed from workspace start until the editor’s page responded to a browser request. This excludes Docker installation and package download; it does not measure a student completing setup.

Add below the chart, in readable type:

> These are measurements of four different systems, not an isolated test of processor speed.

Keep the existing disclosure that second-start results are not displayed.

### 6. Enlarge Figure 1’s three essential labels

**Where:** Figure 1.

Keep its architecture and connections. Make the three main boxes readable from the full-poster view, using:

> **Browser: displays the editor**  
> **Course workspace: runs the editor and tools**  
> **Coursework folder: keeps the student’s files**

Replace the lower connector label with:

> **Shared coursework folder**

Retain “bind mount” in Technical Details rather than in the connector. Keep “code-server” and the settings information as secondary annotations; the three main boxes should dominate the figure.

### 7. Clarify deletion and assignment success where readers first encounter them

**Where:** Purpose/Aim question and Methods Checks.

Replace the research question with:

> **Question.** On four tested configurations, can the same package run assignments, keep coursework after the workspace is deleted, and support debugging?

Replace the central Checks sentences with:

> All four assignments had to build and run without error. The parallel-work assignment, which performs several streams of work at once, also had to produce its expected answer. The debugger had to display information held by the paused program and where it had stopped.

This preserves the procedure while making the distinction between execution and checked correctness explicit.

### 8. State measurement repetition without implying greater precision than was assessed

**Where:** Technical Details, “Timing” and “Memory and builds.”

Keep:

> Each assignment was built once.

Add:

> The displayed times are observations on these configurations; no estimate of timing variability is presented.

Also state the actual number of download and first-start trials, using the existing measurement records. Do not infer a trial count from the table or describe these values as typical performance.

## 5. Speaker notes check

The pitch works as the opening of a six-minute talk: it explains the practical problem, identifies the tested systems, and states both the debugger limitation and the absence of student evidence. The spoken opening is approximately **222 words**, requiring about **148 words per minute** for 90 seconds; that is possible, but dense for listeners meeting these terms for the first time. Cut the processor-family and rented-system detail from the opening, then use Figure 1 and one concrete student task to develop those ideas during the remaining talk.

VERDICT: NOT SATISFIED