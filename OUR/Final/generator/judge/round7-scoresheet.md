# Judge’s scoresheet — Round 7

**Perspective:** Faculty judge outside computer science, with no programming background. Assessment based on the supplied poster images, poster text, speaker notes, and previous scoresheet.

**Overall assessment:** The central finding is clear: all four tested computers ran the assignments, but the two ARM computers could not use the debugger. The revised Results panel is easier to scan. The remaining weakness is television readability: the enlarged crops reveal useful explanations that are still difficult to read in the full-poster view.

I have not deducted for the locked title and author line, the four-machine scope, the absence of a student study, retaining Figure 1, or including technical procedures and specifications. The assessment concerns how clearly those choices and their limits are communicated.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | Running assignments, keeping coursework, and supporting debugging are understandable practical goals. “Preserve coursework after deletion” still leaves readers to discover elsewhere what was deleted. |
| **b. Readability** | **3/5** | Short sentences and definitions help, and the simplified Results panel is an improvement. However, the glossary, technical details, table annotations, and figure captions remain densely packed and small in the full-poster view; definitions in an enlarged crop do not establish readability from a room. |
| **c. Methods understandable to a non-CS judge** | **4/5** | The two-step checklist explains the experiment, and the distinction between three rented computers and one owned laptop is explicit. Some measurement language remains awkward, especially describing a responding web page as an editor that “opens.” |
| **d. Results** | **4/5** | The two finding cards communicate the main outcome within 30 seconds. The shorter table preserves the essential capability evidence, but the timing qualifications and explanation of missing memory data remain much less visible than the findings. |
| **e. Scientific contribution** | **4/5** | This is a credible evaluation of a particular course package, with a useful limitation identified and earlier work acknowledged. The core claims are appropriately bounded; the new “Any course” statement is broader than the evidence, while the AI-development claim is clearly speculative but unsupported here. |
| **f. Visual design and organization** | **4/5** | The three-column organization and prominent central Results panel provide a clear structure. Repetition across Results, Discussion, and Conclusions uses space that could enlarge the supporting explanations. |
| **g. Overall** | **4/5** | The poster supports a defensible undergraduate technical evaluation and communicates its principal result. It still needs a more selective, larger reading path for a general academic audience watching a television. |

**Overall letter grade: B+.**

### Response to the previous scoresheet

“Addressed” means the concern is substantively resolved, without requiring the previous judge’s exact wording.

| Previous concern | Status in round 7 | Assessment |
|---|---|---|
| Research question needed a practical focus | **Addressed** | The question names three concrete capabilities. |
| Text overflow or clipping | **Addressed** | No substantive clipping is apparent in the full poster. |
| Excessive prose and poor TV readability | **Partially addressed** | Results is more selective; the glossary and supporting text remain small. |
| Essential vocabulary unexplained | **Partially addressed** | “MiB” now has a useful explanation. Several technical phrases still require interpretation. |
| Methods lacked a sequence and correctness criterion | **Addressed** | The checklist and expected-answer requirement explain the procedure. |
| Rented systems insufficiently distinguished from student laptops | **Addressed** | The distinction is explicit in Methods and table headings. |
| Repetition and missing measurements unclear | **Partially addressed** | Missing memory data and omitted measurements are disclosed; download and opening trial counts remain unspecified. |
| Debugger limitation buried | **Addressed** | It is prominent in the headline, card, and table. |
| Editor opening confused with total setup time | **Partially addressed** | Installation and download exclusions are stated, but “opens” still exceeds the stated page-response endpoint. |
| Table concealed unavailable capabilities | **Addressed** | The two debugger failures are unmistakable “no” entries. |
| Educational benefits presented as demonstrated | **Addressed for the core study** | Student setup success, time saved, and help requests are explicitly untested. The new broader application paragraph needs its own qualification. |
| Causal explanation too strong | **Addressed** | Translation is a possible explanation, with other differences acknowledged. |
| Download size versus virtual-machine disk comparison ambiguous | **Partially addressed** | The quantities are labeled separately, but the current glossary does **not** explicitly explain that they are different measures, despite the previous scoresheet saying it did. |
| Contribution relative to earlier work implicit | **Addressed** | The Contribution paragraph identifies a package-specific evaluation. |
| Technical command and diagram overwhelmed explanation | **Partially addressed** | The command has a stated purpose and a separate technical block. Diagram annotations remain small. |
| Ethics approval and future-study status ambiguous | **Addressed** | Approval is clearly a future step. |
| Pitch overstated coverage or student benefits | **Addressed** | The pitch identifies the rented systems and states that no students have used the package yet. |
| Unsupported build-time ratio | **Addressed** | No such ratio appears. Removing build times from the main table does not revive that problem. |
| Memory measurement scope unclear | **Addressed** | Methods distinguishes workspace memory from browser and Docker use. |
| Overbroad activity-recording claim | **Addressed** | Figure 1 makes the narrower statement about disabling built-in AI features. |

The previous eight recommendations have the following outcomes:

| Previous recommendation | Status |
|---|---|
| Reduce repeated interpretation and enlarge right-column text | **Not addressed**; the new paragraph adds text instead. |
| Replace four small Results cards with two prominent cards | **Addressed**. |
| Simplify and distinguish table capabilities from measurements | **Addressed in substance**; detailed table text is still small. |
| Shorten and enlarge Key Terms | **Not addressed**. |
| Rename the timing endpoint accurately | **Not addressed**. |
| Improve Figure 1 label hierarchy | **Not addressed**; this remains a label issue, not a request to replace the figure. |
| Clarify deletion and assignment success | **Partially addressed**; Methods is informative, but the question remains ambiguous. |
| State timing repetition and uncertainty | **Not addressed**. |

## 2. Vocabulary audit

Definitions elsewhere on the poster count, although a viewer may not locate them quickly. The audit includes the retained technical material and references; it does **not** imply that every specialist identifier belongs in the glossary.

### Main argument and results

| Exact term or phrase | Defined on the poster? | Plain-language replacement or explanation |
|---|---|---|
| “Decentralized” | Indirectly, through Figure 1 | Runs on each student’s own computer. Explain in body text beneath the locked title. |
| “Browser-Based” | Indirectly | Opened through a web browser. |
| “Docker” | **Yes** | Software that runs the packaged course workspace. |
| “IDEs”; “IDE / editor” | **Yes**, functionally; acronym unexpanded | Programming workspaces; IDE means integrated development environment. |
| “C++” | No | A programming language taught in the introductory course. |
| “x86-64” | No | The family of processor instructions taught in this assembly course. |
| “Assembly”; “assembly”; “assembly-course” | **Yes**, through Key Terms | Programming with instructions closely tied to a computer’s processor. |
| “CS 135”; “CS 218” | Subjects supplied in context | UNLV course numbers for introductory programming and assembly programming. |
| “programming tools”; “course tools” | Partly | Applications used to write, prepare, run, and inspect programs. |
| “virtual machine” | **Yes** | A simulated computer running inside another computer. |
| “19 GB disk” | Partly | The simulated computer’s storage space, measured in gigabytes. This is different from download size. |
| “container”; “Container” | **Yes** | A package of course software that runs on the computer. |
| “package”; “packaged programming workspaces” | Partly, through “Container” | The course software bundled together. |
| “code editor”; “editor” | **Yes**, through Key Terms | The application students use to write programs. |
| “browser tab”; “Web browser” | Context only; likely familiar | A browser displays web pages; a tab holds one page. Low priority for explanation. |
| “configurations”; “test configurations”; “tested configurations” | Context only | The combinations of computer equipment and operating system tested. |
| “Build”; “built and ran”; “build and run” | **Yes** for building; running is contextual | Prepare a program, then have the computer carry out its instructions. |
| “debugging”; “Debugger”; “debugger” | **Yes** | Using a tool to pause a program and inspect what it is doing. |
| “preserve coursework after deletion”; “Coursework kept after deletion” | Explained elsewhere | Keep coursework files after deleting the workspace. Name the deleted object immediately. |
| “Working memory”; “memory use” | **Yes** | Temporary space used by running software, separate from saved files. |
| “processor”; “Processor families” | Partly | A processor carries out instructions; different families understand different instructions. |
| “Intel”; “Intel-style”; “Intel-style instructions” | Partly | Here, the processor-instruction family for which the course package was prepared. |
| “ARM” | **Yes**, functionally | A processor family used by Apple Silicon Macs and one rented test computer. |
| “Apple Silicon” | By association with ARM | Apple’s ARM processors. |
| “Translator”; “translation software”; “translator” | **Yes** | Software that lets instructions intended for one processor family run on another. |
| “ARM debugger limit”; “debugger limit” | Explained by the finding | On the two tested ARM computers, the program-inspection tool did not work. |
| “552 MB” | Unit not expanded | A download of 552 megabytes; Docker installation is additional. |
| “0.5–0.6 s”; “4.8–6.7 s” | Seconds stated elsewhere | Spell out “seconds” in the prominent measurement line. |
| “PC” | No | Personal computer. |
| “Windows 11”; “Windows 11 Pro”; “Linux” | Their category is not explained | Operating systems: the main software managing a computer. |
| “cores” | No | Processing units within a processor. Keep in technical specifications. |
| “16 GB”; “8 GB” | Not explicitly labeled as memory | Amount of working memory, in gigabytes. |
| “M1 Pro”; “Graviton” | Associated with processor families | Processor-model names. |
| “MacBook Pro” | Identified as owned laptop | An Apple laptop model. |
| “Azure”; “AWS” | Rental status supplied | Microsoft’s and Amazon’s online computer-rental services. |
| “Parallel-work answer was correct”; “parallel-work assignment” | **Yes**, in Methods | An assignment doing several streams of work at once produced its expected answer. |
| “Peak memory in use” | Memory defined; peak is not | Highest recorded working-memory use during the assignments. |
| “MiB” | **Yes** | A memory unit close to a megabyte. The present caption is adequate. |
| “not captured*”; “memory sampler” | Footnote explains the missing value; instrument remains technical | No peak was recorded by the tool that periodically measured memory use. |
| “provider and resources” | Context only | The company supplying the rented computer and its computing capacity. |
| “Idle memory”; “idle” | No | Memory used while the workspace is open without assignment activity. |
| “build times” | Through the definition of Build | Time needed to prepare assignments to run. |
| “full 13-item checklist” | Partly | The complete set of 13 automated test checks. |
| “Intel-built package” | Partly, through Discussion | The workspace prepared for Intel-style processors. |
| “revised ARM container” | Through separate definitions | A revised workspace intended to support ARM computers. |
| “university ethics (IRB) approval” | **Yes**, functionally | University approval for research involving people; IRB means Institutional Review Board. |
| “AI coding assistants” | No | Artificial intelligence tools that help people write software. Their value for this proposed use was not tested. |
| “specialized software” | Examples supplied | Applications used for particular course tasks, such as statistics or mapping. |
| “ship its tools” | No; computing metaphor | Distribute its course software as a package. |

### Methods, Figure 1, and project materials

| Exact term or phrase | Defined on the poster? | Plain-language replacement or explanation |
|---|---|---|
| “Code” | No | Written instructions making up a computer program. |
| “test script”; “published test script” | Indirectly, through the checklist | A program that performs tests automatically. |
| “raw results” | No | Original measurements saved by the tests. |
| “rented virtual computers” | Through context and the virtual-machine definition | Simulated computers rented through an online service. |
| “automated checklist” | Functionally | The same tests performed automatically on every computer. |
| “m8i.large”; “m8g.large”; “D4s_v5” | No | Rental-computer model identifiers. No additional glossary entries needed. |
| “command” | **Yes**, by purpose | A typed instruction that starts the workspace and connects the coursework folder. |
| “file identifier (checksum)” | **Yes**, functionally | A calculated identifier used to check that every machine received the same download. |
| “without error” | Context only | Completed without a reported error; this does not establish that every answer was correct. |
| “expected answer” | Context supplies the meaning | The answer the assignment should produce. |
| “paused program’s values and position” | Partly | Information held by the program and the instruction where it stopped. |
| “editor’s web page answers the browser” | Measurement described, wording awkward | The editor’s page responds to a browser request. |
| “first start”; “First-start times”; “second-start results” | Partly, through Timing | Measurements when the workspace first starts, or after it is replaced and started again. |
| “container’s own use” | **Yes**, with exclusions | Memory used by the workspace’s editor and tools. |
| “offline” | **Yes**, through the caption | Without an internet connection. |
| “Course workspace (Docker container)” | **Yes** | The packaged editor and course tools running on the laptop. |
| “code-server” | Its role is supplied | Software that displays the programming editor in a browser. |
| “versions chosen by the instructor” | Context only | The instructor selects which releases of the software everyone uses. |
| “Editor settings preinstalled” | Context only | Editor options are configured in advance. |
| “built-in AI features disabled” | Partly; AI is unexpanded | The editor’s artificial intelligence features are turned off. |
| “shared coursework folder (bind mount)” | **Yes**, functionally, through the diagram | A folder accessible to both the laptop and the running workspace. |
| “output files” | Context only | Files containing results saved by the tests. |
| “archived” | No explicit definition | Saved for later inspection. |
| “project repository”; “repository’s results tables” | No | The online collection of project materials and measurements. |
| “github.com/seancnc003/UNLVDockerIDEs” | Labeled as project materials | Online location of code, handouts, tests, and original results. |
| “hub.docker.com/r/seancnc/unlv-cpp-ide”; “hub.docker.com/r/seancnc/unlv-x86-ide” | Their specific role is unstated | Download locations for the two course workspaces. |

The displayed command is an unfamiliar expression as a whole:

> `docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide`

Its **purpose is adequately explained**. The options, numbers, paths, and package identifier are not defined, but a general judge should not need to decode them. Keep this material secondary.

### Reference-only vocabulary

These titles should remain accurate. Their specialist wording does not warrant expanding the glossary.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50”; “CS50” | No | Packaging software for another programming course. |
| “DevContainers” | No | Packaged programming workspaces. |
| “Student Development Environments” | No | The software and workspace students use to create programs. |
| “CS” | Institutional context only | Computer science. |
| “Standardized Docker Environments” | Partly, through Key Terms | The same packaged programming workspace for everyone. |
| “Virtual Machines” | **Yes**, elsewhere | Simulated computers. |
| “CodeDive” | Identified as a platform through its title | The name of an earlier programming platform. |
| “Web-Based IDE” | Functionally, elsewhere | A programming workspace opened through a browser. |
| “Real-Time Code Activity Monitoring” | No | Recording programming activity as it happens. |
| “Remote Access and File Storage” | No | Using another computer and saving files over a network. |
| “ITiCSE”; “SIGITE” | No | Computing-education publication venues. |
| “et al.” | No; ordinary academic usage | And colleagues. Low priority for this audience. |

The prompt’s examples “image,” “assembler,” “linker,” “gdb,” “yasm,” “nasm,” “ld,” “g++,” “VS Code,” “browser-served,” “multithreaded,” “register values,” “fingerprint,” and “instruction set” do **not** appear as terms in the current poster. They should not be added to its vocabulary problems.

### Sentences longer than about 35 words

**No ordinary poster prose sentence exceeds approximately 35 words.** The issue is cumulative density and small type, rather than individual sentence length.

The speaker notes contain this **44-word sentence**, which is particularly demanding aloud:

> “I packaged each course's tools and a code editor into a container, a ready-made package of software that runs on the student's own computer: one download, one command, and it opens in a browser tab.”

Split it after “container,” and explain the package in a separate sentence. The command and reference paragraph are also visually demanding, although they are not ordinary prose sentences.

## 3. Scientific contribution

### What I understand the student discovered

The student tested a packaged assembly-programming workspace on four computer configurations using the same procedure. All four prepared and ran four assignments and retained coursework after workspace deletion, but the two ARM computers could not use the debugger. This identifies a practical capability and a remaining obstacle for this particular course package.

### Did the poster convince me?

**Yes, for that limited finding.** The table supports it, the missing measurement is disclosed, and the poster distinguishes its evaluation from earlier work on packaged workspaces.

The shortened Results table loses **no essential evidence for that central conclusion**. Idle memory, build times, and the detailed checklist are reasonable supporting material to omit from the main display, provided the poster continues to identify what was measured and what was checked. I would not require a general judge to visit the repository.

The remaining boundaries are:

- **Four examples do not establish broad laptop compatibility.** Three systems were rented virtual computers. This limits interpretation without invalidating the evaluation.
- **Running and correctness are different.** The poster explicitly checks the expected answer for the parallel-work assignment; it does not establish equivalent answer validation for every assignment.
- **Performance variability is unclear.** Trial counts for download and first-start timing are unspecified, and no variability is reported.
- **A responding page is a narrower endpoint than a usable editor.** The present wording could lead viewers to overinterpret the timings.
- **These are different systems.** The results do not isolate processor family as the cause of timing or memory differences.
- **Student benefits remain untested.** The poster appropriately says so. Neither easier setup nor improved learning follows from these machine tests.
- **Translation is a hypothesis.** The cautious explanation is appropriate.
- **Memory and download figures are partial costs.** They do not establish total installation size, total computer memory use, or total setup time.

The “Beyond computer science” examples are meaningful to me: distributing a statistics or mapping workspace is an understandable possible application. However, **“Any course” is too sweeping**, and “quickly” introduces an unmeasured efficiency claim. “Could,” “may,” and “a study of its own” signal speculation, but a direct statement that these applications were not tested would be clearer.

### Questions for the four-minute Q&A

I would prioritize these four:

1. **On your tested MacBook, which required course activities would still require another computer?**
2. **What kinds of tasks did the four assignments represent, and which answers were checked for correctness?**
3. **What must happen before the opening timer starts, what exactly stops it, and how many observations produced each time?**
4. **What is new about your evaluation compared with the earlier packaged-workspace studies you cite?**

If time remains: **What would you need to test before recommending this approach for a statistics or laboratory course?**

## 4. Top eight remaining changes before presentation day

### 1. Shorten Key Terms and use the recovered space for larger type

**Where:** Key Terms box.

This remains the largest concentration of explanations that a non-specialist needs but may struggle to read. Replace the entries with:

> **Container:** A package of course software. **Docker** runs it.  
> **Virtual machine:** A simulated computer running inside another computer.  
> **IDE / editor:** The application students use to write programs.  
> **Assembly:** Programming with instructions closely tied to a processor.  
> **Build:** Prepare a program to run.  
> **Debugger:** A tool that pauses a program for inspection.  
> **Working memory:** Temporary space used by running software.  
> **Processor families:** Intel-style and ARM processors understand different instructions. Apple Silicon Macs use ARM.  
> **Translator:** Software that runs instructions intended for another processor family.

Enlarge these definitions. Check them with the entire poster displayed, without opening a crop.

### 2. Remove repeated conclusions and enlarge the right-column interpretation

**Where:** Discussion and Conclusions/Future Research.

The capability finding already appears prominently in Results. Replace the Discussion text with:

> **Practical meaning.** On the two tested ARM computers, assignments requiring the debugger still need another computer, such as one in the campus lab.  
> **Possible explanation.** Translation software may explain the failure; other differences were not isolated.

Remove the repeated “Conclusion” paragraph. Retain the limitations and next steps, enlarged:

> **Not tested.** Student setup success, time saved, help requests, or learning. Four configurations are examples, not a survey.  
> **Next.** Seek university ethics approval for a classroom study and test a revised workspace for ARM computers.

Retain the relevant citations.

### 3. Name the timing endpoint accurately everywhere

**Where:** Results measurement line, Table 1 timing row, Figure 2 title, and Technical Details.

Replace “Wait until the editor opens” with:

> **Editor-page response:** Intel 0.5–0.6 seconds; ARM 4.8–6.7 seconds.

Replace Figure 2’s title with:

> **Figure 2. Seconds from workspace start until the editor’s page responds**

Replace the table row with:

> **Editor-page response time (seconds)**

Replace the opening Timing sentence with:

> We timed from workspace start until the editor’s page responded to a browser request.

Keep the installation and download exclusions immediately beside the prominent times in readable type. This preserves the measurement while avoiding a broader usability claim.

### 4. Reframe the new cross-disciplinary claim as an untested application

**Where:** “Beyond computer science.”

Replace both current sentences with:

> **Possible applications—not tested here.** Courses using statistics, mapping, engineering, or laboratory software might distribute similar packages. A separate study could test whether AI coding assistants help instructors build and maintain them.

This retains a meaningful connection for non-CS judges and removes the unsupported universal and speed claims.

### 5. Specify what is deleted and restrict conclusions to tested assignments

**Where:** Purpose/Aim question, Table 1 preservation row, and any remaining broad outcome wording.

Replace the question with:

> **Question.** On four tested computer configurations, can the same package run assignments, keep coursework after the workspace is deleted, and support debugging?

Replace “Coursework kept after deletion” with:

> **Coursework kept after workspace deletion**

Replace “the package ran every assignment” with:

> **the package ran all four tested assignments**

If retained, replace “everything else ran” with:

> **All four tested assignments ran.**

These edits prevent readers from inferring a broader course-wide test or deletion of the coursework itself.

### 6. State timing repetition without inventing certainty

**Where:** Technical Details, Timing paragraph.

Add:

> The table reports first-start observations; timing variability is not reported.

Also state the actual number of download and first-start trials per configuration, using the existing records. The current poster does not supply that number, so it should not be inferred from the table.

Retain the disclosure about omitted second-start results and the statement that each assignment was built once.

### 7. Clarify the remaining table labels and qualifications

**Where:** Table 1 caption, memory row, and footnote.

Replace “Peak memory in use (MiB)” with:

> **Highest recorded workspace memory (MiB)**

Replace the first footnote sentence with:

> No peak memory value was recorded for the Linux PC before its assignment run finished.

Place the existing caution about processor-family comparisons directly above or below the table, in readable type:

> These computers differed in provider and resources; timing differences cannot be attributed to processor family alone.

Add beside the download figure:

> Download size and the virtual machine’s 19 GB disk are different measures.

Keep the shorter table; do not restore the removed rows.

### 8. Simplify Figure 1’s labels while retaining its architecture

**Where:** Figure 1.

Keep all three boxes and connections. Use these main labels:

> **Browser: displays the editor**  
> **Course workspace: runs the editor and tools**  
> **Coursework folder: keeps the student’s files**

Replace the lower connector wording with:

> **Folder shared with the workspace**

Keep “bind mount” as a secondary technical annotation if needed. Make the three functional labels dominate the diagram; its internal software names and settings can remain secondary.

## 5. Speaker notes check

The pitch works as the opening of a six-minute talk because it explains the problem, procedure, central finding, and limits. However, it contains approximately **222 spoken words**, rather than the stated 180, requiring about **148 words per minute** to fit 90 seconds; the processor-family explanation and rented-system list make that pace demanding for newcomers. Move those details into the later Methods explanation, split the 44-word package sentence, and use the remaining talk to walk through one student task and distinguish page-response time from total setup.

VERDICT: NOT SATISFIED