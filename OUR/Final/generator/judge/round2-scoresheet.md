# Judge’s scoresheet — Round 2

**Perspective:** Faculty judge outside computer science, with no programming background. I assessed the supplied images, poster text, and speaker notes only. The crops establish what the text says; the full poster establishes whether viewers can read it on a television.

**Overall assessment:** The revision improves the honesty and visibility of the findings. It still needs substantial editing for television viewing, and several broad statements contradict its otherwise careful limitations. I have not deducted for the locked title, four-machine sample, absence of a student study, retained architecture diagram, or deliberate inclusion of technical test details.

## 1. Scores

| Criterion | Score | Justification |
|---|---:|---|
| **a. Clarity of research question for a non-specialist** | **4/5** | The problem and three questions are understandable: can the same course workspace function on different computers, at what resource cost, and with what limitations? “Behave the same” could identify the practical capabilities being compared more directly. |
| **b. Readability** | **2/5** | The glossary helps, but the poster remains too dense for television viewing. Q3 extends outside its box, Methods runs below the visible poster boundary, and the results footnote spills onto gray background; essential explanations are effectively unavailable to viewers. |
| **c. Methods understandable to a non-CS judge** | **3/5** | I understand the same automated checklist tested three rented virtual computers and one owned laptop using real assignments. The timing boundary and correctness check are clearer, but “build,” memory scope, editor responsiveness, and repetition of most measurements remain insufficiently explained. |
| **d. Results** | **4/5** | Within 30 seconds, I can identify the main finding: all four computers ran the assignments, but neither ARM computer supported the debugger. The chart and numerical callouts help, although the single “0.5 s” headline understates the displayed Intel range and the memory and size comparisons need clearer boundaries. |
| **e. Scientific contribution** | **3/5** | A documented evaluation of this course package is a credible undergraduate contribution, and the student-study limitations are now explicit. However, novelty remains implicit, while claims about universal laptop support, processor-based causation, and complete replacement of the existing setup exceed what the displayed evidence establishes. |
| **f. Visual design and organization** | **3/5** | The columns, headings, and result callouts provide a clear reading structure. Overflowing boxes, tiny table notes, dense paragraphs, and small diagram labels prevent that structure from working reliably at television size. |
| **g. Overall** | **3/5** | This is a useful feasibility study with a substantially improved account of its main limitation. The remaining accessibility problems and overbroad wording keep it below presentation-ready quality for a general academic judging panel. |

**Overall letter grade: B−.**

### Response to the previous scoresheet

These judgments concern the underlying concerns, not whether the student followed every suggested redesign.

| Previous concern | Status | Assessment of revision |
|---|---|---|
| Research questions needed a practical, plain-language focus | **Addressed** | Q1–Q3 are explicit and reasonably accessible. |
| Excessive prose and poor television readability | **Partially addressed** | Some wording is simpler, but density remains high and several text blocks visibly overflow. |
| Essential vocabulary was unexplained | **Partially addressed** | Container, image, debugger, Intel, and ARM now have useful explanations. Other essential terms remain unexplained. |
| Methods lacked a clear test sequence and correctness criterion | **Partially addressed** | Test, Procedure, Tasks, and Measurements provide a better sequence; the multithreaded answer check is explicit. Some of this text is clipped. |
| Rented computers were insufficiently distinguished from student laptops | **Addressed** | The cloud virtual machines and owned laptop are identified, and the sample is explicitly described as examples rather than a survey. |
| Repetition and missing measurements were unclear | **Partially addressed** | The footnote explains one missing peak and reports assignment-build repetition. Repetition for startup, download, and memory measurements remains unclear, and the footnote is difficult to read. |
| Debugger limitation was buried beneath a success headline | **Addressed** | It now appears in the Results headline, a numerical callout, and the table. |
| Editor opening time could be mistaken for total setup time | **Partially addressed** | The chart caption makes the boundary clear. The Methods sentence still implies that Docker installation is listed separately, although no installation measurement appears. |
| Table concealed unavailable capabilities | **Addressed** | The debugger has explicit “no” entries, and unavailable checks are counted separately. |
| Educational benefits were presented as established outcomes | **Partially addressed** | Conclusions explicitly identifies time savings and fewer help requests as untested goals. The opening pitch still presents first-week losses as an established, universal experience. |
| Causal explanation exceeded the comparison design | **Partially addressed** | The qualifying sentence helps, but nearby sentences still assert what the translator does and exclude the operating system too confidently. |
| Download-versus-virtual-machine comparison lacked a clear basis | **Partially addressed** | The 552 MB quantity is identified as a download; what the 19 GB measures remains unclear. |
| Contribution relative to previous projects was not explicit | **Ignored** | The reader must still infer what this evaluation adds to existing packaged course environments. |
| Technical command and diagram overwhelmed the general explanation | **Partially addressed within the fixed constraints** | The diagram caption is clearer. Keeping the diagram and command is acceptable; their small explanatory labels and the lack of a readable main path remain problems. |
| Ethics approval status and future work were ambiguous | **Addressed** | “After IRB approval is obtained” clearly describes a future study. |
| Pitch misidentified the tested machines and overstated outcomes | **Partially addressed** | The machine description and untested student outcomes are corrected. Universal compatibility and categorical causal language remain. |

## 2. Vocabulary audit

**“Defined” means explained on the poster, not merely in the speaker notes.** Related exact terms are grouped below. Bibliographic terminology is included separately because reference titles need not be rewritten.

### Title, main text, and results

| Exact term or phrase | Defined on poster? | Plain-language replacement or definition |
|---|---|---|
| “Decentralized” | Partly, through the local-running explanation | “Runs on each student’s computer without a shared university service.” |
| “Browser-Based” | Partly | “Opened through a web browser.” |
| “Docker” | Yes | The glossary explains its role. “Software that runs the packaged workspace” is sufficient. |
| “IDEs” | No | “Programming workspaces for writing, running, and inspecting programs.” Add below the locked title or in the glossary. |
| “C++” | No | “A programming language taught in introductory computing.” |
| “x86-64” | Partly | “The processor instruction system taught in the assembly course.” |
| “Assembly” | No | “Programming with instructions closely tied to a computer’s processor.” |
| “programming tools” | Partly, through examples elsewhere | “Applications used to write, prepare, run, and inspect programs.” |
| “19 GB setup” | No clear explanation of the setup or size basis | “The course’s existing virtual-computer package.” State what the 19 GB measures. |
| “Container” / “container” | Yes, but overbroad | Replace “runs inside any laptop” with “runs the packaged course tools on compatible computers.” |
| “Image” / “image” | Yes | The definition distinguishes it from a picture successfully. |
| “Debugger” / “debugger” | Yes | The pause-and-inspect definition works for this audience. |
| “Intel vs. ARM” | Yes, broadly | Useful explanation; describe these as processor families represented in the tests. |
| “computer processor” / “chips” | Partly | “The part of a computer that carries out program instructions.” |
| “Intel-style chips” / “Intel-style software” | Partly | “Processors using the instruction system targeted by this package” / “software written for that instruction system.” |
| “Apple Silicon” | Yes, through the ARM explanation | “Apple’s ARM-based processors.” |
| “translator” | Partly | “Software that lets one processor family run instructions written for another.” |
| “code editor” / “editor” | No direct definition | “The application students use to write programs.” |
| “browser tab” | Assumed | “A page opened in the student’s web browser.” |
| “package” | Partly | Use “course workspace” consistently when the downloadable file itself is not the subject. |
| “command” | Purpose and example provided, meaning unstated | “A typed instruction that starts the workspace.” |
| “server” | No; “no server” is ambiguous | Replace with “no university-hosted service.” |
| “Windows” / “Windows 11” / “macOS” / “Linux” | No collective explanation | “Different operating systems—the main software managing a computer.” |
| “start-up time” | Partly | “Time from starting the workspace until the editor responds.” |
| “memory” | No distinction from storage | “Temporary working space used while software runs.” |
| “build time” / “builds” / “build” / “built” | No | “Time to convert the written program into a form the computer can run.” |
| “multithreaded” | No | “A program that carries out multiple streams of work.” |
| “MB” / “GB” | No | “Units of download or storage size.” Express the comparison in one unit and name what is measured. |
| “MiB” | Partly: “about a megabyte” | “A unit of working-memory use, close to MB.” |
| “virtual machine” | No | “A simulated computer running within another computer.” |
| “PC” | No | “Personal computer.” In this table, operating system and processor type are more informative. |
| “cores” | No | “Processing units within a processor that can carry out work.” |
| “cloud VM” | Partly, through Methods | “A rented virtual computer accessed over the internet.” |
| “AWS” | Yes, linked to Amazon | “Amazon’s rented computing service.” |
| “Azure” | Partly, linked to Microsoft | “Microsoft’s rented computing service.” |
| “M1 Pro” / “MacBook Pro” | Partly: ARM and ownership stated | “The processor model / laptop model of the researcher’s Apple computer.” Exact specifications may remain. |
| “Graviton” | Partly: ARM stated | “The processor model used in the rented ARM computer.” |
| “Memory while idle” | No | “Working memory used while the workspace is open but doing no assignment work.” |
| “Peak memory during assignments” | Partly | “Highest working-memory use observed while running the assignments.” State which software is included. |
| “Checks met / failed / unavailable” | Partly, in footnote | “Test requirements satisfied, not satisfied, or unavailable.” Clarify that an unavailable required debugger remains a practical limitation. |
| “memory sampler” | No | “The tool that periodically records working-memory use.” |
| “starter program” | No | “A small test program used to check the programming tools.” |
| “compiled” | No | “Converted from written code into a form the computer can run.” |
| “median” | No | “The middle of three measured times.” |
| “indicative only” | No | “These timings describe the tested configurations and are not a controlled comparison of operating systems.” |
| “instruction set” | No | “The basic instructions a processor understands.” |
| “processor details” | No concrete explanation | “Information about the running program’s internal processor state.” Explain why students need it. |
| “platform” | No | “A combination of computer hardware and operating system.” |
| “CS 135” / “CS 218” | Partly; CS 218 associated with the instruction set | Add the course descriptions: introductory programming and assembly programming, respectively. |
| “IRB approval” | No; future status is clear | “Approval from the university committee that reviews research involving people.” |
| “ARM container” | Partly through separate definitions | “A course workspace designed for ARM processors.” |
| “translates only student programs” | No | “Runs the workspace tools directly on ARM while translating the programs students write.” Identify this as a proposed approach. |

### Methods, project materials, and diagram

| Exact term or phrase | Defined on poster? | Plain-language replacement or definition |
|---|---|---|
| “test script” | Partly, through “automated checklist” | “A program that performs the same tests on every computer.” |
| “raw results” | No | “The original measurements saved by the tests.” |
| “cloud virtual machines” | Partly: providers and rental stated | “Rented virtual computers accessed over the internet.” |
| “fresh student laptop” | No | “A computer being set up for the course for the first time.” Avoid implying that the virtual systems reproduce actual laptops. |
| “specs” | No | “Computer specifications.” |
| “automated checklist” | Yes, functionally | “The same tests performed automatically on each computer.” |
| “digital fingerprint” | Partly: verifies an identical file | “A file identifier used to check that every computer received the same download.” |
| “known value” | Partly | “The expected answer used to check the program’s result.” |
| “docker run -p 127.0.0.1:8218:8080 -v ~/UNLV/x86-workspace:/home/coder/workspace seancnc/unlv-x86-ide” | General purpose explained; syntax unexplained | Keep the command, but label it: “Starts the workspace and connects it to the student’s coursework folder.” Viewers need not interpret each symbol. |
| “first pull” | Partly, through caption | “First download.” |
| “http://127.0.0.1:\<course port\>” | No | “The browser address for the workspace on this computer.” |
| “Docker container (runs locally)” | Partly | “Course workspace running on this computer.” |
| “code-server” | Partly, through the following label | “Software that displays the programming editor in the browser.” |
| “VS Code interface served to the browser” | No plain-language explanation | “The programming editor appears in the browser.” |
| “Course toolchain” | Partly: components listed | “Tools for preparing, running, and inspecting course programs.” |
| “compiler” | No | “A tool that converts a written program into instructions the computer can run.” |
| “assembler” | No | “A tool that converts assembly-language instructions into machine instructions.” |
| “versions pinned by the instructor” | No | “The instructor fixes the software releases so everyone uses the same ones.” |
| “Extensions & settings” | No | “Added editor features and preset options.” |
| “preinstalled” | Context only | “Already included.” |
| “autosave” | No | “Automatically saves the student’s work.” |
| “built-in AI features disabled” | No acronym expansion | “The editor’s artificial intelligence features are turned off.” |
| “bind mount (two-way)” | No | “The workspace and laptop use the same coursework folder.” |
| “Ordinary host folder” | Partly, through its description | “Coursework folder on the student’s computer.” |
| “host tool” | No | “An application installed directly on the student’s computer.” |
| “container and image replacement” | Partly, through persistence claims | “Deleting and replacing the downloaded workspace.” |
| “output files” | No | “Files containing the measurements saved by the tests.” |
| “archived” | Context only | “Saved for others to inspect.” |
| “project repository” | No | “The online collection of project materials.” |

### Reference-only terminology

Preserve published titles. These terms do not all need glossary space, but they remain inaccessible if the student uses them aloud without explanation.

| Exact term or phrase | Defined? | Plain-language explanation |
|---|---|---|
| “Containerizing CS50” | No | “Packaging the tools for another introductory computing course.” |
| “DevContainers” | No | “Packaged programming workspaces.” |
| “Student Development Environments” | No | “The sets of programming tools students use.” |
| “Standardized Docker Environments” | Partly through the main glossary | “The same packaged programming tools for every student.” |
| “Virtual Machines” | No | “Simulated computers running inside other computers.” |
| “CodeDive” | Partly through its title | “The name of a programming platform discussed in earlier research.” |
| “Web-Based IDE” | Partly through the poster’s operating description | “A programming workspace opened through a browser.” |
| “Real-Time Code Activity Monitoring” | No | “Recording programming activity as it happens.” |
| “Remote Access and File Storage” | No | “Using another computer and saving files over a network.” |
| “ITiCSE” / “SIGITE” | No | Computing-education conference or publication names. No main-text expansion needed. |
| “et al.” | No | “And colleagues.” Conventional and acceptable in references. |

### Long sentences

The revision removes most of the previous long sentences. One poster sentence still exceeds approximately 35 words:

**Purpose/Aim — 37 words:**

> Before the fellowship I packaged each course’s exact tools and a code editor into one container that opens in a browser tab on the student’s own laptop: one download, one command, no server, no account, nothing recorded.

Suggested replacement:

> I packaged each course’s tools and programming editor into a workspace that runs on the student’s computer. It opens in a browser, and coursework stays in the student’s folder.

Two sentences near the threshold remain overloaded:

**Future Research — approximately 34 words, including citation tokens:**

> A classroom study in CS 135 and CS 218, after IRB approval is obtained, measuring how many students reach a working setup without help and how much staff time it saves [3, 4, 6].

This is also a sentence fragment. Replace with:

> After university ethics approval, a classroom study will measure setup success, requests for help, and staff time in introductory and assembly programming courses [3, 4, 6].

**Speaker notes — 34 words:**

> The one limit: on ARM chips, including Apple Silicon Macs, the debugger, the tool that pauses a program so you can look inside, does not work, because ARM runs Intel software through a translator.

Replace with:

> Neither tested ARM computer could use the debugger, which pauses a program so students can inspect it. Translation software may explain this limitation, but these tests do not establish the cause.

Sentence length is only part of the readability problem. Numerous short sentences still create dense paragraphs and require unfamiliar vocabulary.

## 3. Scientific contribution

### What I understand the student discovered

The student tested a downloadable course workspace on four computer configurations using four assembly-course assignments. All four ran the assignments, and coursework survived deleting the workspace; the two ARM configurations opened the editor more slowly and could not use the debugger. The contribution is a documented account of this package’s capabilities and limitations under the tested conditions.

### Did it convince me?

**It convinces me that the package has useful, limited technical feasibility. It does not establish universal compatibility, improved student outcomes, or the cause of the ARM limitation.**

The small sample and absence of students are acceptable boundaries for this project. The remaining issue is keeping every conclusion within those boundaries:

- **The novelty needs a sentence.** The references already show packaged course environments. Explain whether this project adds evaluation of these particular assignments, comparison across processor families, documentation of the debugger limitation, or some combination.
- **The tested scope is narrower than “each course.”** The displayed assignment evidence concerns CS 218. The poster does not demonstrate equivalent evaluation of the C++ course package.
- **Successful execution is not necessarily a correct answer.** The poster explicitly describes an expected-answer check for the multithreaded assignment. It should clarify what was checked for the other three without implying more verification than occurred.
- **“Any laptop” and “Windows and Intel owners get everything” are unsupported generalizations.** They are also inconsistent with the careful statement that four machines are examples.
- **The causal explanation remains too strong.** Using the same downloaded file controls the package, but it does not separate processor, operating system, translation software, hardware allocation, or other configuration effects.
- **The “10–14 times longer” claim is not recoverable from the displayed table.** The table reports each machine’s slowest build, without identifying matched assignments or the reference configuration for that ratio. Use the displayed absolute times or explain the comparison.
- **The memory figures lack scope.** Does “55 MiB” cover the container, editor, browser, Docker, or some subset? A non-specialist could reasonably interpret it as the entire system requirement.
- **The size comparison remains ambiguous.** Is 19 GB a download, an extracted file, or installed storage? “Replaced” also implies equivalent functionality despite the missing debugger on ARM.
- **Repetition is only partly reported.** Assignment builds occurred once; the starter program was compiled three times. That does not establish how often editor startup, download, or memory measurements were repeated.
- **“Recorded nothing” is too absolute.** The poster itself reports saved test output. Presumably the intended claim concerns student activity monitoring; say that precisely and identify its basis.

### Questions for the four-minute Q&A

I would prioritize these four:

1. **What does your evaluation add to the earlier packaged programming workspaces you cite?**
2. **Which required course tasks can an Apple Silicon student complete independently, and which still require a lab computer?**
3. **What happens before the opening-time measurement starts, and what software is included in your memory measurement?**
4. **How did you check the answers to the four assignments, and which measurements were repeated?**

If time remains: **What evidence supports translation software as the explanation, and what future comparison would distinguish that explanation from other configuration differences?**

## 4. Top eight remaining changes before presentation day

### 1. Repair every overflowing text box

**Where:** Purpose/Aim, Methods, and the Table 1 footnote.

Q3 must sit inside Purpose/Aim. All Methods text must fit above the poster boundary. The table note must sit on a readable background inside its panel. Do this by cutting prose and reallocating space, rather than shrinking the font further.

Replace the Purpose/Aim opening with:

> I packaged the course tools and programming editor into a workspace that runs on the student’s computer. This project tests its capabilities, resource use, and limitations on four computer configurations.

Keep all three questions inside the box. Preserve the exact command and technical specifications, but place them in a compact, clearly labeled test-details area.

### 2. Replace the dense Discussion with a short account of findings, interpretation, and consequence

**Where:** Entire Discussion box.

Use:

> **Observed:** All four tested computers ran the assignments. Neither tested ARM computer could use the debugger. Editor opening took 0.5–0.6 seconds on Intel and 4.8–6.7 seconds on ARM.  
>
> **Possible explanation:** Translation software may explain the ARM limitation. These tests do not separate its effects from other hardware and software differences.  
>
> **Student consequence:** Students using the tested ARM setups would still need access to an Intel computer for required debugger steps.

This removes unsupported certainty and creates room for larger text.

### 3. Remove universal compatibility and complete-replacement claims

**Where:** Key Terms, Conclusions, and the pitch.

Replace the container definition with:

> **Container:** A ready-made package of course tools. Docker is the software used to run it.

Replace the opening of Conclusions with:

> **Shown in these tests:** The 552 MB course package ran four assembly-course assignments on all four configurations and preserved coursework after workspace deletion. Required debugger support was unavailable on both ARM configurations.

Replace “recorded nothing,” if supported, with:

> The workspace does not monitor student programming activity.

Do not describe it as a complete replacement on ARM while a required capability remains unavailable.

### 4. State the contribution and evaluated course explicitly

**Where:** End of Purpose/Aim or immediately above Results.

Add:

> **Contribution:** This study documents how the assembly-course package performs on four configurations, including its debugger limitation on ARM computers.

In Results, replace:

> All four machines built and ran the course assignments.

with:

> All four tested computers built and ran four assembly-course assignments.

Keep claims about the C++ package separate unless its evaluation is actually presented.

### 5. Make the headline numbers mean exactly what the measurements support

**Where:** Results callouts and Conclusions.

Change **“0.5 s”** to **“0.5–0.6 s”**, with:

> Editor opening on the two tested Intel computers, after Docker installation and package download.

For **“552 MB”**, use:

> Course-package download. Docker must be installed separately.

Retain the 19 GB comparison only after stating whether that figure is download size or installed storage. If the quantities differ, label both explicitly rather than presenting them as equivalent measures.

Replace “builds took 10–14 times longer” with:

> The slowest assignment builds took 3.1–3.6 seconds on ARM and 0.3–0.6 seconds on Intel.

### 6. Clarify measurement meaning and repetition without removing technical detail

**Where:** Methods, Measurements, and the table note.

Replace the final Measurements sentence with:

> Editor opening time excludes Docker installation and package download. Package download time is reported separately; Docker installation time is not reported.

Keep the accurate repetition statement:

> Each assignment was built once. The starter program was compiled three times.

Then state the actual repetition count for editor startup and the other measurements. Define what “editor answers” means operationally and identify which software the memory measurement covers; these details cannot be inferred from the poster.

### 7. Teach the few terms needed to understand the result

**Where:** Key Terms, table labels, and Figure 1 annotations.

Add or substitute:

> **Editor:** The application students use to write programs.  
> **Build:** Convert a written program into a form the computer can run.  
> **Working memory:** Temporary space used while software runs.  
> **Translator:** Software that runs instructions written for a different processor family.

Retain the architecture diagram. Change its visible labels from **“first pull”** to **“first download,”** **“bind mount (two-way)”** to **“shared coursework folder,”** and **“Ordinary host folder”** to **“Coursework folder on the student’s computer.”**

The locked title can remain unchanged; explain “IDE” in the glossary.

### 8. Give the table and chart a readable hierarchy

**Where:** Results table, Figures panel, and Conclusions.

Use larger type for the capability rows and the editor-opening chart. Keep specifications and secondary measurements in the technical details area, with a readable note:

> These results describe four tested configurations. Assignment builds were measured once. The Linux peak-memory value was not captured.

Replace the lengthy Conclusions box with:

> **Demonstrated:** Assignment execution and file preservation on four configurations; debugger support only on the two Intel configurations.  
>
> **Untested:** Student setup success, time saved, and requests for help.  
>
> **Next:** Seek university ethics approval for a classroom study and evaluate a proposed ARM redesign.

Check the complete poster full-screen at the expected judging distance. The central finding and limitation must remain readable without opening the crops.

## 5. Speaker notes check

The pitch has a workable problem–test–finding–limitation structure, but its roughly 300 words require a brisk pace for 90 seconds and leave little processing time for an unfamiliar audience. Change “students lose their first week” to “software setup can delay the start of coursework,” remove “any laptop,” and present translation as a possible explanation rather than an established cause. For the remaining talk, explain one representative student task and the key comparison; walking through Table 1 “one row at a time” would consume time without establishing a clear argument.

VERDICT: NOT SATISFIED