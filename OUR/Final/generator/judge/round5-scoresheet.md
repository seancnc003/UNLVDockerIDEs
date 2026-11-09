# Judge’s scoresheet — Round 5

**Perspective:** Faculty judge outside computer science, with no programming background. I read the previous scoresheet, the revised poster text, and the speaker notes, and assessed the supplied images. I did not consult source code or linked project materials.

**Assessment:** The poster now communicates a credible, limited finding: the tested workspace ran the assignments on all four computers, but debugging remained unavailable on the two ARM computers. The remaining weakness is television readability. The crops demonstrate that explanations exist; the full-poster image shows that several essential explanations remain too small.

I have not deducted for the locked title or author line, the four-machine sample, the absence of a student study, retaining Figure 1, or including technical specifications and procedures.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | The question identifies concrete outcomes: running assignments, preserving coursework, and supporting the debugger. It also asks about download, waiting time, and memory, although this makes the question somewhat crowded. |
| **b. Readability** | **3/5** | Vocabulary and sentence length have improved substantially. At full-poster scale, however, the table, technical details, glossary, figure annotations, and numerical qualifications still demand close inspection; the screen presentation remains too dense for a general audience. |
| **c. Methods understandable to a non-CS judge** | **4/5** | I can follow the common test sequence and understand what counted as success. The distinction between running without error and checking one assignment’s expected answer is useful, but several measurement explanations are buried in small text. |
| **d. Results** | **4/5** | Within 30 seconds, I can identify the central finding: all four computers ran the assignments, while neither ARM computer supported debugging. The opening-time chart is understandable, but the large numerical cards still depend on much smaller labels to establish meaning. |
| **e. Scientific contribution** | **4/5** | The contribution is now explicitly a package-specific evaluation, rather than an implied invention of packaged programming workspaces. The conclusions honestly distinguish observations, possible explanations, and untested student benefits. |
| **f. Visual design and organization** | **4/5** | The three columns, consistent headings, and central Results panel provide a clear structure. Repetition across Results, Discussion, and Conclusions consumes space needed to enlarge essential content. |
| **g. Overall** | **4/5** | This is a defensible undergraduate feasibility evaluation with a clear practical limitation. The scientific claim is ready for a general academic audience; the display still needs a stronger hierarchy between essential findings and supporting detail. |

**Overall letter grade: B+.**

### Response to the previous scoresheet

“Addressed” means the substantive concern was resolved, even if the suggested wording was not adopted.

| Previous concern | Status | Assessment of this revision |
|---|---|---|
| Research question needed a practical focus | **Addressed** | Assignment execution, preservation, debugger support, and resource requirements are explicit. |
| Text overflow or clipping | **Addressed** | No substantive clipping is apparent in the full-poster image. |
| Excessive prose and poor TV readability | **Partially addressed** | Wording is clearer, but supporting text remains small and the main finding appears repeatedly. |
| Essential vocabulary unexplained | **Partially addressed** | “Parallel-work,” “checksum,” and program inspection now receive explanations. Processor terminology, units, and several diagram annotations still require interpretation. |
| Methods lacked a sequence and correctness criterion | **Addressed** | The procedure and the additional expected-answer check are distinguishable. |
| Rented computers insufficiently distinguished from student laptops | **Addressed** | Three rented virtual computers and one owned laptop are plainly identified; the earlier representativeness wording is gone. |
| Repetition and missing measurements unclear | **Partially addressed** | One build per assignment and the missing Linux peak are explained. A second start is mentioned without showing its results, and repetition of download measurements remains unspecified. |
| Debugger limitation buried | **Addressed** | It is prominent in the Results headline and practical interpretation. |
| Editor opening confused with total setup time | **Addressed in wording; partially addressed visually** | Installation and download exclusions are explicit, but their small type makes them easy to miss beside the large opening-time number. |
| Table concealed unavailable capabilities | **Addressed** | Debugger cells say “no.” The footnote explains the checklist’s “unavailable” category. |
| Educational benefits presented as demonstrated | **Addressed** | Student setup success, time saved, and help requests are expressly untested. |
| Causal explanation too strong | **Addressed** | Translation is presented as a possible explanation, with competing differences acknowledged. |
| Download versus virtual-machine disk comparison ambiguous | **Partially addressed** | The poster labels one as a download and the other as a disk, but no longer explicitly says these are different measures. It makes no direct percentage-saving claim. |
| Contribution relative to earlier work implicit | **Addressed** | The Contribution paragraph now clearly identifies the local evaluation and ARM debugger finding. |
| Technical command and diagram overwhelmed the explanation | **Partially addressed** | Technical details are separated, and Figure 1 is substantially clearer. Its secondary labels remain very small. |
| Ethics approval and future study status ambiguous | **Addressed** | “Seek university ethics (IRB) approval” makes the future status clear. |
| Pitch overstated machine coverage or student benefits | **Addressed** | The pitch identifies the rented systems and explicitly says students have not used it yet. |
| Unsupported build-time ratio | **Addressed** | Absolute times are reported. |
| Memory measurement scope unclear | **Addressed** | Container memory is distinguished from browser and Docker use. |
| Overbroad activity-recording claim | **Addressed** | The diagram makes the narrower statement about built-in AI features. |

Of the previous eight recommendations, the Methods wording, Purpose/Aim revision, vocabulary substitutions, and contribution statement are substantially implemented. The Results-card treatment, Discussion shortening, table enlargement, and diagram readability are only partially implemented. **No substantive concern was wholly ignored.**

## 2. Vocabulary audit

**Scope:** Exact expressions from the current poster, including its diagram, technical details, and references. Related expressions are grouped. “Defined” means explained somewhere on the poster, not necessarily where the reader first encounters them.

This inventory is not a recommendation to expand the glossary indefinitely. Prefer plain wording in the main argument and retain specialist identifiers in the technical block.

### Main argument, results, and glossary

| Exact term or phrase | Defined on the poster? | Plain-language replacement or definition |
|---|---|---|
| “Decentralized” | Indirectly, through Figure 1 | Runs on each student’s computer. Explain below the locked title. |
| “Browser-Based” | Indirectly | Opened through a web browser. |
| “Docker” | **Yes** | Software that runs the packaged course workspace. |
| “IDEs”; “IDE / editor” | **Yes, functionally** | Programming workspaces; IDE means integrated development environment. |
| “C++” | No | A programming language taught in the introductory course. |
| “x86-64” | No | A family of processor instructions used by the assembly-course package. |
| “Assembly”; “assembly-course” | **Yes**, through the glossary | Programming with basic instructions understood by a processor. |
| “programming tools”; “course tools” | Partly, through Figure 1 | Applications for writing, preparing, running, and inspecting programs. |
| “CS 135”; “CS 218” | **Partly**: course subjects are supplied | University course numbers for introductory C++ and assembly programming. |
| “19 GB”; “16 GB”; “8 GB” | Context identifies disk size or computer specifications; GB is not explained | GB means gigabytes, a unit of storage or working-memory capacity. Label which is being measured. |
| “virtual machine” | **Yes** | A simulated computer running inside another computer. |
| “disk” | No | Storage belonging to the simulated computer. |
| “Container”; “container” | **Yes** | A ready-made package of course software; “course workspace” is easier after first introduction. |
| “package”; “packaged programming workspaces” | Partly | The course software bundled together for students to use. |
| “code editor”; “editor” | **Yes**, through “IDE / editor” | The application students use to write programs. |
| “browser tab”; “Web browser” | Not formally; likely familiar | A page in an application used to view websites. Low priority for explanation. |
| “computer configurations”; “tested configuration” | Through the specifications, rather than a definition | The combinations of computer hardware and operating system tested. |
| “Build”; “built and ran”; “build and run” | **Yes** for “Build”; “run” is contextual | Prepare a program for execution, then have the computer carry out its instructions. |
| “Debugger”; “debugger” | **Yes** | A tool that pauses a program so students can inspect its operation. |
| “Working memory” | **Yes** | Temporary space used by running software, separate from saved files. |
| “Intel vs. ARM”; “Intel”; “ARM” | **Partly** | Processor families that understand different basic instructions. The glossary names families without explaining “processor.” |
| “processor”; “processor families”; “Intel-style chips” | Partly | The processor carries out a computer’s instructions; different families understand different instructions. |
| “Apple Silicon” | **Yes, indirectly** | Apple’s ARM processors. |
| “Translator”; “translator” | **Yes** | Software allowing instructions intended for one processor family to run on another. |
| “0.5–0.6 s”; “4.8–6.7 s”; “(s)” | Indirectly, through Figure 2 | Seconds. Spell out the unit in prominent cards. |
| “552 MB” | Download identified; MB not explained | A download of 552 megabytes. |
| “First-start times” | Partly, through Methods | Time for the editor to respond when the workspace is first started. |
| “PC” | No | Personal computer. |
| “Windows 11”; “Linux”; “Windows 11 Pro” | No explanation of their category | Operating systems: the main software managing a computer. |
| “cores” | No | Processing units within a processor. Keep in technical specifications. |
| “M1 Pro”; “Graviton” | Associated with processor families, but not explicitly defined | Processor-model names. |
| “MacBook Pro” | Context identifies it as the owned laptop | An Apple laptop model. No additional glossary entry needed. |
| “Azure”; “AWS” | Rental status is supplied, but providers are not explained | Microsoft’s and Amazon’s rented computing services. |
| “Parallel-work assignment: expected answer”; “parallel-work assignment” | **Yes**, in Methods | The assignment doing several streams of work at once produced the answer expected by the test. |
| “Memory while idle”; “idle” | Not explicitly | Working memory used while the workspace is open without assignment activity. |
| “Peak memory during assignments”; “peak” | Not explicitly | Highest observed working-memory use during assignments. |
| “MiB” | **Yes, approximately** | A memory unit close to a megabyte; the existing explanation is adequate for this audience. |
| “Slowest assignment build” | Through the “Build” definition | Longest time needed to prepare an assignment to run. |
| “Checks met / failed / unavailable” | **Partly**, in the footnote | Requirements satisfied / not satisfied / capability unavailable. Explain that unavailable debugging still prevents that course activity. |
| “memory sampler” | No | A tool that periodically records working-memory use. |
| “provider and resources” | Context only | The company supplying the rented computer and its computing capacity. |
| “hardware and software differences” | Assumed | Differences in physical computer components and installed programs. |
| “Intel-built package” | Partly, in Discussion | The course workspace prepared for Intel-style processors. |
| “revised ARM container” | Partly, through separate definitions | A revised course workspace intended to support ARM computers. |
| “university ethics (IRB) approval” | **Yes, functionally** | University approval for research involving people; IRB means Institutional Review Board. |

### Methods, Figure 1, and project materials

| Exact term or phrase | Defined on the poster? | Plain-language replacement or definition |
|---|---|---|
| “Code” | No | Written instructions that make up a program. |
| “test script”; “published test script” | Indirectly, through “automated checklist” | A program that performs the same tests automatically. |
| “raw results” | No | Original measurements saved by the tests. |
| “rented virtual computers” | **Yes**, by combining rental status with the virtual-machine definition | Simulated computers rented through an online computing service. |
| “automated checklist” | Functionally | The same sequence of tests carried out automatically. |
| “m8i.large”; “m8g.large”; “D4s_v5” | No | Rental-computer model identifiers. Retain in the technical block. |
| “command” | Purpose shown, syntax unexplained | A typed instruction that starts the workspace. |
| “file identifier (checksum)” | **Yes, functionally** | A calculated identifier used to check that every computer received the same download. |
| “expected answer” | Context makes its purpose clear | The answer the assignment should produce. |
| “paused program’s values and position” | More concrete than before, but still partly unexplained | The values the program currently holds and the instruction where it has stopped. |
| “editor’s web page answers the browser” | Describes the timing rule, but is awkward | The editor’s page responds to a browser request. This does not measure completion of student setup. |
| “container’s own use” | **Yes**, with exclusions | Working memory used by the workspace’s editor and tools. |
| “offline” | **Yes**, in Figure 1’s caption | Without an internet connection. |
| “localhost:<course port>” | No | The browser address for the workspace running on this computer. |
| “Course workspace (Docker container)” | **Yes**, through the glossary and diagram | The packaged editor and course tools running on the laptop. |
| “code-server” | Its role is supplied by the surrounding phrase | Software that displays the programming editor in a browser. |
| “releases fixed by the instructor” | Partly | Everyone uses software versions selected by the instructor. |
| “Editor settings preinstalled” | Context only | Editor options are already configured. |
| “built-in AI features disabled” | AI is not expanded | The editor’s artificial intelligence features are turned off. |
| “shared folder (bind mount)” | **Yes, functionally**, through the diagram | A coursework folder accessible from both the workspace and the laptop. |
| “student-owned files” | Context only | Coursework files stored on the student’s computer. |
| “output files” | Context only | Files containing results saved by the tests. |
| “archived” | Not explicitly | Saved for later inspection. |
| “project repository” | No | The online collection of project materials. |
| “github.com/seancnc003/UNLVDockerIDEs” | Header identifies it as a materials link | Project materials and original results. Use this descriptive label beside a short link or QR code. |
| “hub.docker.com/r/seancnc/unlv-cpp-ide”; “hub.docker.com/r/seancnc/unlv-x86-ide” | Their precise role is not explained | Downloads for the C++ and assembly course workspaces. |

The displayed command is also a vocabulary obstacle:

> `docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide`

Its purpose is partly explained, but its address, numbers, options, and folder paths are not. Retain it for technical judges and add: **“Starts the workspace and connects it to the coursework folder on this computer.”** A general judge should not need to interpret the command.

### Reference-only vocabulary

These expressions occur in publication titles or citation details. Preserve the titles accurately; they do not all require glossary entries.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50” | No | Packaging software tools for another programming course. |
| “CS50” | No | A programming-course identifier. |
| “DevContainers” | No | Packaged programming workspaces. |
| “Student Development Environments” | No | The software and workspace students use to create programs. |
| “CS” | Only through institutional context | Computer science. |
| “Standardized Docker Environments” | Partly, through the glossary | The same packaged programming workspace for everyone. |
| “Virtual Machines” | **Yes**, through the glossary | Simulated computers running inside other computers. |
| “CodeDive” | Identified through its publication title | The name of an earlier programming platform. |
| “Web-Based IDE” | Functionally, through the glossary | A programming workspace opened through a browser. |
| “Real-Time Code Activity Monitoring” | No | Recording programming activity as it happens. |
| “Remote Access and File Storage” | No | Using another computer and saving files over a network. |
| “ITiCSE”; “SIGITE” | No | Computing-education publication venues. |
| “et al.” | No | And colleagues; conventional academic vocabulary and low priority. |

**Terms from the prompt that do not appear in this revision:** “image” as a software term, “assembler,” “linker,” “gdb,” “yasm,” “nasm,” “ld,” “g++,” “VS Code,” “browser-served,” “multithreaded,” “register values,” “fingerprint,” and “instruction set.” They should not be counted as current vocabulary problems.

### Long sentences

**No ordinary prose sentence in the current poster exceeds approximately 35 words.** The pitch also avoids sentences above that threshold.

The Methods arrow sequence is visually long despite being a procedural list. Break it across two lines. Sentence length is now satisfactory; cumulative text density and small type are the remaining problems.

## 3. Scientific contribution

### What I understand the student discovered

The student evaluated a packaged programming workspace for UNLV’s assembly course on four computer configurations using the same automated checks. All four prepared and ran four assignments and retained coursework after workspace deletion, but the two ARM computers could not use the debugging tool. The study identifies a practical boundary of this particular package and reports its observed opening times and resource use.

### Did the poster convince me?

**Yes, for that limited claim.** The table supports the capability findings, the contribution paragraph places the work relative to earlier packaged workspaces, and the conclusions avoid claiming proven educational benefits.

The following boundaries still matter:

- **Four configurations are examples.** Three are rented virtual computers, so the results do not establish coverage of the range of student-owned laptops. The poster acknowledges this; no new machines are required for an honest presentation.
- **Running is not the same as verifying every answer.** All four assignments ran without error, but only the parallel-work assignment is explicitly described as having its answer checked.
- **Timing does not isolate processor effects.** Different providers and computing resources prevent attributing the observed differences solely to Intel versus ARM.
- **Measurement repetition is incompletely reported.** The poster mentions a second start without presenting its results. Download repetition is unspecified, and each assignment was built once. These are descriptive measurements, not evidence of typical or reliably repeatable performance.
- **Student benefits remain untested.** Easier setup, time saved, fewer help requests, and improved learning have not been demonstrated. The poster says so clearly.
- **Practical costs are only partly measured.** Download size and workspace memory do not establish total installation storage, total computer memory use, or total setup time.
- **Translation remains a hypothesis.** The observed ARM debugger limitation does not establish its cause.
- **Preservation has a specific meaning.** The deletion test supports survival of coursework through workspace removal, not general protection against data loss.

The scientific contribution is a useful local compatibility evaluation. The poster does not establish that packaging course software or encountering ARM debugging limitations is unprecedented, and it no longer needs that claim.

### Questions for the four-minute Q&A

I would prioritize these four:

1. **For a student with your tested Apple laptop, which required course activities still need the campus lab?**
2. **What did the four assignments cover, and how did you distinguish “ran without error” from “produced the correct result”?**
3. **What must a student install and wait through before reaching the starting point of your half-second opening measurement?**
4. **What did the second-start measurements show, and why are only first-start values displayed?**

If time remains: **What comparison would help test whether translation causes the debugger limitation?**

## 4. Top eight remaining changes before presentation day

These changes preserve the title, author line, four-machine scope, technical specifications, exact procedure, and Figure 1.

### 1. Make the Results cards meaningful without their smallest text

**Where:** Four cards at the top of Results.

Move the meaning into the large labels. Replace their wording with:

> **4 of 4 computers**  
> Built and ran all four assignments.
>
> **Editor opening**  
> Intel: **0.5–0.6 seconds**  
> ARM: **4.8–6.7 seconds**
>
> **552 MB download**  
> Docker installation is additional.
>
> **Debugger available**  
> Intel: **2 of 2**  
> ARM: **0 of 2**

Immediately below, enlarge:

> Opening times exclude Docker installation and package download.

Judge completion from the full poster on the presentation television at the expected viewing distance. The labels and qualification must be readable, not just the numbers.

### 2. Remove repeated findings and enlarge the practical interpretation

**Where:** Discussion and the opening of Conclusions/Future Research.

Results already states the observation. Replace Discussion with:

> **Why debugging matters:** Some assignments require students to pause a program and inspect its values. On the tested ARM computers, those steps still require an Intel computer or the campus lab.
>
> **Possible explanation:** This workspace uses Intel-style instructions. ARM computers run it through translation software, which may explain the debugger limitation. Other hardware and software differences were not isolated.

Replace the Conclusions “Demonstrated” paragraph with:

> **Conclusion:** These four tests support assignment execution and coursework preservation, but show a debugging barrier on the two ARM computers.

Use the recovered space to enlarge the interpretation and the existing “Not tested” statement.

### 3. Give Table 1 a readable capability block

**Where:** Results table.

Retain all measurements and specifications, but visually separate the first four capability rows from the resource measurements. Enlarge the capability rows and use these labels:

> All four assignments built and ran  
> Parallel-work assignment gave expected answer  
> Coursework remained after workspace deletion  
> Debugger available

Use bold “yes” and “no” text so the debugger distinction does not depend on color.

Replace the caption with:

> **Table 1. Capabilities and measurements for the four tested configurations. Times describe these systems; they do not isolate processor-family effects.**

Keep the missing-memory and unavailable-check explanations directly below the table, with enough space to read them.

### 4. Put essential definitions beside the main finding

**Where:** Results headline and Key Terms.

A viewer currently must move across the poster to decode the central limitation. Add immediately below the Results headline:

> **A debugger pauses a program for inspection. ARM is the processor family used in Apple Silicon Macs.**

In Key Terms, replace the “Intel vs. ARM” entry with:

> **Processor families:** A processor carries out program instructions. Intel-style and ARM processors understand different basic instructions; Apple Silicon Macs use ARM.

Keep the other glossary entries, but shorten surrounding repetition and enlarge their type. Additional tiny glossary entries would not solve the problem.

### 5. Break Methods into a visible sequence above the retained technical details

**Where:** “Same test on each” and the command introduction.

Replace the continuous arrow line with two lines:

> **1.** Download → open editor → build and run four assignments  
> **2.** Test debugger → delete workspace → check saved coursework  
> The same automated checklist ran on every computer.

Above the exact command, add:

> **This command starts the workspace and connects it to the coursework folder on the computer.**

Retain the detailed Checks, Timing, Memory, and machine specifications. The general reader needs a visible route through them, while technical judges still have the exact procedure.

### 6. Enlarge Figure 1’s three main labels and simplify its connectors

**Where:** Figure 1.

Keep the diagram and its structure. Make **Web browser**, **Course workspace**, and **Coursework folder** substantially larger.

Replace these secondary labels:

| Current wording | Replacement |
|---|---|
| “localhost:<course port>” | “Browser connection on this computer” |
| “shared folder (bind mount)” | “Shared coursework folder” |
| “Tools to build, run, and inspect programs — releases fixed by the instructor” | “Course tools: versions chosen by the instructor” |
| “student-owned files, editable with any application; they survive deleting the container” | “Coursework stays on the laptop after workspace deletion” |

Retain technical terms such as “bind mount” in a small technical note if desired. Use the diagram during the talk to show one concrete file being created and surviving workspace deletion.

### 7. Clarify what the large size and timing numbers do—and do not—measure

**Where:** Introduction, Results note, and Technical Details.

Replace the virtual-machine sentence with:

> Some newer Macs cannot run the course’s existing virtual machine, a simulated computer with a 19 GB disk.

Add beside the download figure:

> Download size and virtual-machine disk size are different measures.

Replace the current first-start note with:

> Only first-start editor times are shown. Docker installation was not timed; download times are reported separately.

Keep “A second start was also timed” in Technical Details, adding:

> Second-start results are not shown here.

This resolves the display’s ambiguity without requiring new measurements.

### 8. Shorten Purpose/Aim so the question can be read in one pass

**Where:** Purpose/Aim opening and Question paragraph.

Replace them with:

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer and opens in a browser.
>
> **Question:** On four tested configurations, can the same workspace run assignments, preserve coursework after deletion, and support debugging?
>
> **Measurements:** Download size and time, editor-opening time, and workspace memory use.

Keep the current Contribution paragraph. It now states the local contribution clearly and does not need another novelty claim.

## 5. Speaker notes check

The pitch works as an opening: it introduces the practical problem, explains the package, identifies the systems, and states the debugging limitation and absence of student evidence. It is about **197 spoken words**, requiring approximately **131 words per minute** for 90 seconds; define ARM before the timing comparison and define the debugger before announcing its failure. Use the remaining talk to demonstrate Figure 1, explain what counted as assignment success, and distinguish editor-opening time from total setup time.

VERDICT: NOT SATISFIED