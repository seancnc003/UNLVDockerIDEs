# Research Paper Assignment: Decentralized Docker IDEs for Computer Science Education

## Assignment status

The literature listed below is a strong and sufficient base for beginning this research paper. It establishes the history of standardized course environments, compares institutional servers, cloud systems, virtual machines, Docker containers, desktop and browser IDEs, and includes empirical work on setup friction, student anxiety, instructor support, and assembly-language virtualization.

The software repository is complete, but the educational study is not yet complete because the images have not been deployed in courses. The paper can therefore be written in two stages:

1. **Before course deployment:** Write the introduction, related work, course context, requirements, system design, reproducibility information, technical evaluation, limitations, and planned educational evaluation.
2. **After course deployment:** Add student and instructor data, analyze the research questions involving usability and learning, and revise the discussion and conclusion.

Until course data exist, describe the work as a **system paper, design report, or technical experience report with a study protocol**. Do not claim that the system improves learning, reduces anxiety, or reduces support work until those outcomes have been measured.

## Suggested paper titles

Choose or adapt one of the following:

1. **From Cloud Containers to Local Course Appliances: Decentralized Browser-Based IDEs for C++ and x86-64 Assembly Education**
2. **A Decentralized, Browser-Based Docker IDE for Resource-Constrained Computer Science Courses**
3. **Standardizing C++ and x86-64 Assembly Environments with Local Browser-Based Docker IDEs**
4. **Local Containers, Browser IDEs, and Host-Owned Files: A Course Environment for Introductory Systems Programming**

## Central argument

Do not frame the contribution as the first use of Docker in computer science education. The literature clearly establishes earlier containerized course environments.

Instead, develop and test the following argument:

> Cloud programming environments make standardized browser-based development accessible, but they introduce service, network, account, cost, and institutional-infrastructure dependencies. Local development containers remove many of those dependencies but often require a separately installed desktop editor and may leave persistence and lifecycle behavior implicit. This project combines a locally executed Docker container, a browser-based VS Code interface, explicit host bind mounts, instructor-controlled toolchains, offline operation after the initial pull, and course-specific architecture handling to provide a decentralized course appliance for C++ and x86-64 assembly education.

This argument identifies the project as a particular point in the design space rather than claiming that every local container is superior to every cloud environment.

## Project contributions to investigate

The paper should present the following as design contributions. Their educational effects remain research questions until evaluated.

1. **Decentralized execution:** One container runs on each student's machine. No university server or course-operated cluster is required.
2. **Browser-based professional interface:** Students use code-server, which provides a VS Code-style editor, file explorer, terminal, extensions, and run commands through `localhost`.
3. **Instructor-controlled environments:** Compiler, assembler, debugger, editor, extensions, settings, and versions are defined in the image.
4. **Host-owned student work:** Bind mounts place coursework in an ordinary host folder rather than in a container layer or hidden Docker volume.
5. **Safe replacement and updating:** Images and containers can be replaced without replacing the bind-mounted workspace.
6. **Offline-capable operation:** After the image has been pulled, compilation and editing occur locally without a course server.
7. **Resource-conscious lifecycle:** Containers start only when requested; no restart policy is used; students are given stop procedures and optional CPU and memory caps.
8. **Two architecture strategies:** The C++ image is native on amd64 and arm64, while the x86-64 assembly image remains amd64-only so that the course's actual instruction set and Linux ABI are preserved.
9. **Documented emulation boundary:** Assembly, linking, and execution work under Docker Desktop emulation on ARM hosts, while `gdb`/`ptrace` assignments require native amd64 hardware.
10. **AI-free instructional surface:** Editor AI, chat, agents, Copilot-style features, and inline suggestions are disabled to preserve the courses' instructional policy. Treat this as a design requirement, not as evidence that learning improved.

## Research objectives

The paper should pursue the following objectives.

### Technical objectives

- Define a reproducible C++ environment for CS 135 and an x86-64 Linux assembly environment for CS 218.
- Make both environments accessible through a consistent browser interface.
- Verify documented student workflows against the published images.
- Evaluate portability across operating systems and processor architectures.
- Measure startup time, image size, idle resource use, compilation performance, and emulation overhead.
- Demonstrate that replacing a container or image does not remove bind-mounted student files.
- Document the limits of architecture emulation, especially debugger behavior.

### Educational objectives

- Reduce the time between receiving setup instructions and successfully running the first course program.
- Reduce operating-system-specific setup problems and instructor troubleshooting.
- Allow students to focus on course concepts rather than dependency installation.
- Preserve access to a realistic Linux command line and professional development tools.
- Determine whether students perceive the environment as usable, dependable, and appropriately transparent.
- Determine whether the environment affects setup anxiety, programming self-efficacy, or course participation.

The educational objectives are intended outcomes. They become findings only after a course study supports them.

## Research questions

Use research questions rather than strong causal hypotheses for the first deployment.

### Questions answerable before deployment

- **RQ1 — Reproducibility:** Do the published images execute the documented C++ and x86-64 student workflows successfully?
- **RQ2 — Portability:** Which combinations of host operating system and architecture can run each course environment, and what limitations remain?
- **RQ3 — Resource cost:** What storage, memory, CPU, startup-time, and compilation costs does each environment impose on representative student hardware?
- **RQ4 — Persistence:** Does the documented bind-mount and update process preserve student files across container and image replacement?
- **RQ5 — Architecture fidelity:** To what extent can an amd64-only assembly environment reproduce the intended course behavior on ARM hosts?

### Questions requiring course deployment

- **RQ6 — Setup success:** What percentage of students reaches a working environment without instructor intervention, and how long does setup take?
- **RQ7 — Support burden:** How many setup incidents and staff minutes are required compared with the prior course setup process?
- **RQ8 — Student experience:** How do students rate usability, reliability, anxiety, confidence, and their ability to focus on programming?
- **RQ9 — Continued use:** Do students continue using the supplied environment, switch to another environment, or use both, and why?
- **RQ10 — Learning:** Is use of the environment associated with assignment completion or performance after accounting for prior experience and other plausible differences?

RQ10 must be interpreted cautiously. A difference between two semesters or between voluntary users and nonusers is not, by itself, evidence that the environment caused a learning improvement.

## Reading list — 9 papers (curated)

**Final selection: 9 papers**, verified against publisher/DOI records, August 2026. Cut from the original 12: Ngo et al. 2025 (weakest venue, hardest to obtain), Liu et al. 2025 *Improving AI in CS50* (one AI paper suffices; *Teaching CS50 with AI* is the keeper since the x86 Design Document links students to cs50.ai), and Malan 2010 *Moving CS50 into the Cloud* (Malan 2013 covers the same arc and cites it internally — make the infrastructure-cost point through 2013). The cuts remain in the bench section below in case a reviewer asks. This is the floor: each remaining paper covers a distinct related-work category, so do not cut further.

The poster should cite only ~6: Malan 2024, Valstar 2020, Fernalld 2023, Cadenas 2015, Harvie 2019, and Teaching CS50 with AI.

Read these sources before drafting the related-work section. For each paper, write a short note containing its problem, environment, participants or deployment context, method, findings, limitations, and relationship to this project.

### 1. Containerizing CS50

David J. Malan. 2024. “Containerizing CS50: Standardizing Students' Programming Environments.” *Proceedings of ITiCSE 2024*, 7 pages. [Open Harvard copy](https://cs.harvard.edu/malan/publications/V1fp0310-malan.pdf). [DOI](https://doi.org/10.1145/3649217.3653567).

**Use for:** The main inspiration, the history from clusters to cloud VMs to client appliances and Docker, standardized toolchains, instructor control, mid-semester updates, and the current GitHub Codespaces architecture.

**Question to answer while reading:** Which problems are solved by CS50's centralized cloud approach, and which service or network dependencies remain that the UNLV design intentionally avoids?

### 2. Using DevContainers to Standardize Student Development Environments

Sander Valstar, William G. Griswold, and Leo Porter. 2020. “Using DevContainers to Standardize Student Development Environments: An Experience Report.” *Proceedings of ITiCSE 2020*, 377–383. [DOI](https://doi.org/10.1145/3341525.3387424). [DBLP record](https://dblp.org/rec/conf/iticse/ValstarGP20.html).

**Use for:** The closest foundational comparison to a local Docker development environment integrated with VS Code. It supports the argument that containers can standardize tools across host operating systems without maintaining per-student course servers.

**Question to answer while reading:** What setup complexity remains when students need Docker, desktop VS Code, the Dev Containers extension, and a course repository?

### 3. Lightweight Symphony

Kourtnee Fernalld, TJ O'Connor, Sneha Sudhakaran, and Nasheen Nur. 2023. “Lightweight Symphony: Towards Reducing Computer Science Student Anxiety with Standardized Docker Environments.” *Proceedings of SIGITE 2023*. [DOI](https://doi.org/10.1145/3585059.3611432).

**Use for:** The closest empirical precedent. It covers introductory programming, operating systems, and cybersecurity; student adoption; setup perceptions; and self-reported anxiety. The paper reports that 84% of surveyed students adopted the environments, 75% believed they contributed to success, and 69.2% reported that the standardized environment helped reduce anxiety.

**Question to answer while reading:** Which measures could be replicated at UNLV, and how could response bias and voluntary adoption be handled more carefully?

### 4. Virtualization for Cost-Effective Teaching of Assembly Language Programming

José O. Cadenas, R. Simon Sherratt, Des Howlett, Chris G. Guy, and Karsten O. Lundqvist. 2015. “Virtualization for Cost-Effective Teaching of Assembly Language Programming.” *IEEE Transactions on Education* 58, 4, 282–288. [Open manuscript](https://centaur.reading.ac.uk/39692/1/qemu-Centaur.pdf). [DOI](https://doi.org/10.1109/TE.2015.2405895).

**Use for:** The main course-specific source for CS 218. It evaluates a portable virtualized assembly environment, student attitudes, institutional cost, staff support, and the value of packaging the complete toolchain.

**Question to answer while reading:** How does virtualizing a complete assembly environment affect portability, authenticity, debugging, and student understanding of the underlying architecture?

### 5. Using Virtual Machines to Enhance the Educational Experience in an Introductory Computing Course

David P. Harvie, Christopher Morrell, Jason R. Cody, and Tanya T. Estes. 2019. “Using Virtual Machines to Enhance the Educational Experience in an Introductory Computing Course.” *Proceedings of SIGITE 2019*, 28–32. [DOI](https://doi.org/10.1145/3349266.3351401). [Institutional record](https://portfolio.erau.edu/en/publications/using-virtual-machines-to-enhance-the-educational-experience-in-a/).

**Use for:** An empirical model for tracking installation time, troubleshooting, classroom efficiency, and student performance across multiple classrooms and academic years.

**Question to answer while reading:** Which operational measurements are more convincing than a general statement that setup became easier?

### 6. From Cluster to Cloud to Appliance

David J. Malan. 2013. “From Cluster to Cloud to Appliance.” *Proceedings of ITiCSE 2013*, 88–92. [Open Harvard copy](https://cs.harvard.edu/malan/publications/itc218s-malan.pdf). [DOI](https://doi.org/10.1145/2462476.2462491).

**Use for:** The historical transition from centralized infrastructure to a client-side course appliance.

**Question to answer while reading:** Which problems moved from institutional administrators to instructors or students at each architectural transition?

### 7. Teaching Operating Systems Using Virtual Appliances and Distributed Version Control

Oren Laadan, Jason Nieh, and Nicolas Viennot. 2010. “Teaching Operating Systems Using Virtual Appliances and Distributed Version Control.” *Proceedings of SIGCSE 2010*, 480–484. [Open PDF](https://www.cs.columbia.edu/~orenl/papers/sigcse2010_os.pdf). [DOI](https://doi.org/10.1145/1734263.1734427).

**Use for:** A foundational account of locally deployable course appliances, reproducible environments, isolated systems work, student-owned computers, remote learners, and intermittent connectivity.

**Question to answer while reading:** Which advantages of a complete VM remain relevant, and which costs can a container reduce?

### 8. CodeDive

Hyunchan Park, Youngpil Kim, Kyungwoon Lee, Soonheon Jin, Jinseok Kim, Yan Heo, Gyuho Kim, and Eunhye Kim. 2025. “CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring for Programming Education.” *Applied Sciences* 15, 19, 10403. [Article and DOI](https://doi.org/10.3390/app151910403).

**Use for:** A recent centralized alternative combining browser VS Code, isolated Kubernetes containers, persistent volumes, and fine-grained activity monitoring. It is a useful architectural and privacy contrast.

**Question to answer while reading:** What pedagogical visibility is gained through centralized monitoring, and what infrastructure and privacy costs accompany it?

### 9. Teaching CS50 with AI

Rongxin Liu et al. 2024. “Teaching CS50 with AI.” *Proceedings of SIGCSE 2024*. [DOI](https://doi.org/10.1145/3626252.3630938).

**Use for:** A focused discussion of contemporary AI-enabled course environments and the need for explicit course policy. It describes cs50.ai, the very chatbot the x86 Design Document's AI Usage section links students to, which frames this project's stance precisely: editor AI disabled, course-sanctioned external AI permitted by policy. The UNLV project does not reproduce CS50's AI system; it deliberately disables built-in AI surfaces.

**Question to answer while reading:** Which support roles does an in-course AI assistant fill, and how does a course that disables editor AI while permitting a sanctioned external tool draw that policy line?

## Bench and supplemental sources

Swap these in if a reviewer asks or for a longer version of the paper. None are required reading, and they do not all need equal treatment.

### Cut from the original 12

- Linh B. Ngo, Huy D. Nguyen, Bao G. Ngo, and Tejas Karusala. 2025. “Common Container-Based Infrastructure Blueprints for Multi-Course Computing Education.” *Journal of Computing Sciences in Colleges* 41, 3, 153–165. [ACM DL](https://dl.acm.org/doi/10.5555/3801163.3801225). (The ACM `10.5555` identifier is not registered with doi.org, so link to the ACM DL page directly.) Frames the C++ and assembly images as shared multi-course infrastructure rather than isolated demonstrations. Cut: weakest venue, hardest to obtain.
- David J. Malan. 2010. “Moving CS50 into the Cloud.” *Journal of Computing Sciences in Colleges* 25, 6, 111–120. [Open PDF](https://cs.harvard.edu/malan/publications/ccscne10-malan.pdf). Benefits and operational costs of instructor-controlled cloud infrastructure. Cut: Malan 2013 covers the same arc and cites it — make the infrastructure-cost point through 2013.
- Rongxin Liu et al. 2025. “Improving AI in CS50.” *Proceedings of SIGCSE 2025*. [DOI](https://doi.org/10.1145/3641554.3701945). Follow-up detail on cs50.ai; adds refinement, not a new argument.

### Browser IDEs and engagement

- Jialiang Tan, Yu Chen, and Shuyin Jiao. 2023. “Visual Studio Code in Introductory Computer Science Course: An Experience Report.” [arXiv:2303.10174](https://arxiv.org/abs/2303.10174). Student evaluations of VS Code's interface for novices (of 42 respondents, 74% considered it easy to install and use). Limitation: a preprint evaluating desktop VS Code with Python guidance, not code-server with C++ or assembly.
- Jesús Manuel Gallego-Romero, Carlos Alario-Hoyos, Iria Estévez-Ayres, and Carlos Delgado Kloos. 2020. “Analyzing Learners' Engagement and Behavior in MOOCs on Programming with the Codeboard IDE.” *Educational Technology Research and Development* 68, 2505–2528. [DOI](https://doi.org/10.1007/s11423-020-09773-6). Browser-based engagement measures (compilations, executions, edits, time coding). Limitation: registered and anonymous users self-selected, so activity differences are not causal effects of persistence features.

### Docker for low-level coursework

- TJ O'Connor et al. 2024. “PWN Lessons Made Easy with Docker.” *Proceedings of SIGCSE 2024*. [DOI](https://doi.org/10.1145/3626252.3630911). Docker for low-level/binary coursework, from the same group as Lightweight Symphony.
- “ASM Visualizer: A Learning Tool for Assembly Programming.” *Proceedings of SIGCSE 2025*. [ACM DL](https://dl.acm.org/doi/10.1145/3641554.3701793). A second assembly-education source if the paper needs one.

### Browser exercise systems and automated execution

- Andrei Papancea, Jaime Spacco, and David Hovemeyer. 2013. “An Open Platform for Managing Short Programming Exercises.” *Proceedings of ICER 2013*. [DOI](https://doi.org/10.1145/2493394.2493401). Use CloudCoder to distinguish a short-exercise system from a full Linux development environment.
- František Špaček, Radomír Sohlich, and Tomáš Dulík. 2015. “Docker as Platform for Assignments Evaluation.” *Procedia Engineering* 100, 1665–1671. [Open paper](https://publikace.k.utb.cz/bitstream/handle/10563/1004554/Fulltext_1004554.pdf?sequence=1). [DOI](https://doi.org/10.1016/j.proeng.2015.01.541). Use for Docker isolation in automatic compilation and grading, not as evidence about the student IDE experience.

### Instructor adoption and curriculum-wide containers

- Stoney Jackson and Karl R. Wurst. 2022. “Teaching with VS Code DevContainers.” *Journal of Computing Sciences in Colleges* 37, 8, 81–82. [Open issue](https://www.ccsc.org/publications/journals/NE2022.pdf). This is a workshop description rather than a substantial empirical study.
- Linh B. Ngo, Richard Burns, and Si Chen. 2020. “Containerizing CS Learning Environments.” *Journal of Computing Sciences in Colleges* 36, 3, 169. [Open issue](https://ccsc-eastern.github.io/files/ccsce20/EA2020_Vol36_No3.pdf). This is a poster abstract that motivates shared, lightweight layers across courses.

### Educational virtual laboratories

- Veljko Potkonjak et al. 2016. “Virtual Laboratories for Education in Science, Technology, and Engineering: A Review.” *Computers & Education* 95, 309–327. [DOI](https://doi.org/10.1016/j.compedu.2016.02.002). Use only if the paper places the IDE within the broader virtual-laboratory literature.

## Literature synthesis matrix

Complete this matrix before writing prose. Add page numbers and quotations to personal notes, but paraphrase sources in the paper.

| Source | Deployment location | Isolation | Student interface | Persistence | Internet dependence | Evaluation evidence | Main limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Malan 2024 | Cloud, with historical local alternatives | Container | Browser VS Code | Cloud/GitHub | Required for primary environment | Large-scale experience report | Not a controlled learning study |
| Valstar et al. 2020 | Student machine | Container | Desktop VS Code | Local project/container workflow | Mainly distribution/setup | Course experience report | Requires several local tools |
| Fernalld et al. 2023 | Student machine | Container | Course-specific graphical tools | Local | Initial distribution | Student surveys across three courses | Voluntary responses and adoption |
| Cadenas et al. 2015 | Student machine | Virtualized/emulated system | GUI and console | Portable local system | Not continuously required | Multi-year survey and assessment context | ARM rather than x86-64; VM/emulator rather than Docker |
| Harvie et al. 2019 | Student machine | VM | VM-hosted tools | VM files | Not continuously required | Two years and ten classrooms | Different courses and virtualization layer |
| CodeDive 2025 | Institutional cloud | Kubernetes container | Browser VS Code | Server persistent volume | Required | Course deployment and activity logs | Infrastructure, monitoring, and privacy costs |
| UNLV project | Student machine | Container | Browser code-server | Explicit host bind mount | Initial pull only | Technical evidence now; educational evidence planned | Docker prerequisite and x86 debugging limit |

## Paper outline and writing instructions

Target approximately 5,000–7,000 words or the page limit of the intended venue. A SIGCSE/ITiCSE-style paper is usually organized more compactly than a thesis or journal article.

### 1. Abstract — approximately 150–250 words

Write the abstract last. Include:

1. The heterogeneous-environment problem.
2. The two UNLV courses and their different architecture requirements.
3. The local Docker plus browser IDE design.
4. The evaluation method actually completed.
5. The most important measured results.
6. The contribution and major limitation.

Do not put planned student results in the past tense.

### 2. Introduction

Establish the practical problem:

- Students bring Windows, macOS, and Linux machines using amd64 and arm64 processors.
- Manual installation creates differences in tool versions, paths, permissions, compiler behavior, and debugging behavior.
- Setup problems consume time intended for programming and may disproportionately affect less-experienced students.
- Central cloud IDEs solve many setup problems but require accounts, connectivity, service availability, and external infrastructure.

Then state the gap and contributions. End the introduction with a numbered contribution list and the research questions.

Avoid unsupported opening claims such as “IDE setup is the biggest problem in computer science education.” Use narrower statements grounded in the cited literature and local course context.

### 3. Background and related work

Organize this section by design approach, not one paragraph per paper:

1. Institutional clusters and cloud VMs
2. Client-side virtual appliances
3. Local Docker and DevContainer environments
4. Browser-based programming environments
5. Assembly-language virtualization
6. AI-enabled versus policy-constrained IDEs, if included

For each approach, explain benefits, costs, and how this project differs. The related-work conclusion should identify the project's location in the design space:

- browser accessibility similar to cloud IDEs;
- local execution similar to DevContainers and virtual appliances;
- explicit host persistence;
- no institutional runtime service;
- two deliberately different architecture strategies;
- an AI-disabled course interface.

### 4. Course context and design requirements

Describe CS 135 and CS 218 without assuming that readers know UNLV course numbers.

Explain why the courses require different images:

- C++ source is portable enough to use native amd64 and arm64 Linux images.
- CS 218 teaches x86-64 Linux assembly, so the image must remain amd64.
- Publishing an arm64 “equivalent” would change the userland and instruction set and would no longer reproduce the assignment environment.
- ARM hosts can emulate the amd64 image for assembling and execution, but debugger assignments have a documented limitation.

Turn repository philosophy into explicit requirements: decentralization, no AI assistance, host-owned files, autosave, no automatic restart, no hidden volumes, modest resource use, localhost-only exposure, and first-run starter seeding without overwriting work.

### 5. System design and implementation

Include a small architecture diagram showing:

```text
Student browser
      |
127.0.0.1:course-port
      |
Docker container
  - code-server
  - compiler/assembler/debugger
  - extensions and settings
      |
bind mount
      |
ordinary host workspace folder
```

Discuss:

- Base image and pinned code-server version
- Course toolchains and extensions
- Container user and file ownership
- `tini` and process lifecycle
- Starter-file seeding
- Bind-mount persistence
- Localhost port binding and disabled authentication
- Autosave and update behavior
- AI kill-switch settings
- Multi-architecture publication for C++
- Plain single-platform amd64 publication for x86
- Release checking and documentation-drift checks

Explain design decisions rather than reproducing the Dockerfiles line by line.

### 6. Evaluation method

Separate the evaluation into technical and educational components.

#### Technical evaluation

Record:

- Image tag and immutable digest
- Git commit or release tag
- Docker Desktop/Engine version
- Host operating system, architecture, CPU, and RAM
- Cold and warm image startup time
- Image download and on-disk sizes
- Idle CPU and memory
- Time to compile and execute the starter program
- Native versus emulated x86 execution time
- Health endpoint result
- Tool and extension versions
- File persistence after stopping, deleting, pulling, and recreating a container
- Starter seeding in an empty workspace and non-overwrite behavior in a nonempty workspace
- Documented command success on each tested platform
- Debugger behavior on native amd64 and emulated ARM hosts

Use repeated measurements where timing is reported. State sample count, whether caches were warm, and report variability rather than a single best run.

#### Educational evaluation

Before collecting student data, consult the institution's human-subjects/IRB process. Participation should be voluntary where required, and course grades should not depend on survey participation.

Collect, if approved:

- Prior programming, Linux, terminal, IDE, and Docker experience
- Host OS, architecture, and approximate hardware resources
- Time to first successful starter execution
- Whether help was needed and how much
- Setup issue category and resolution time
- Environment used during the semester
- Reasons for switching environments
- Perceived usability and reliability
- Setup anxiety and programming self-efficacy
- Instructor and teaching-assistant support incidents and time
- Assignment completion or performance, with appropriate privacy and controls

The decentralized design does not require telemetry. Prefer opt-in surveys, setup observation, anonymous issue categories, and staff support logs over silently collecting editor activity.

### 7. Results

Before deployment, report only technical results. Use tables for the platform matrix and resource measurements.

After deployment, report denominators, missing data, response rates, central tendencies, variability, and appropriate statistical tests. Include negative findings and failures. Distinguish:

- all enrolled students;
- students who attempted the environment;
- students who successfully used it; and
- students who answered a survey.

Do not turn survey agreement into proof of learning. Self-reported usefulness, measured setup time, support burden, and assignment performance are different constructs.

### 8. Discussion

Interpret results in relation to the literature:

- Does the project reproduce the setup and anxiety benefits reported by Fernalld et al.?
- How does setup compare with the DevContainer workflow of Valstar et al.?
- Which CS50 benefits remain without Codespaces?
- What is lost by removing centralized accounts, monitoring, backups, and collaboration?
- Does host-controlled persistence improve student understanding and confidence about file ownership?
- Is the browser interface easier than a desktop editor plus container extension?
- Is emulation sufficient for the assembly curriculum, or should native lab access remain part of the course?

Discuss the warning in the student design documents: abstracting setup is useful in an introductory course, but students eventually need to learn how professional toolchains are configured.

### 9. Threats to validity and limitations

At minimum, address:

- One institution and two courses
- Small or voluntary survey samples
- Prior Docker and programming experience
- Self-selection into using the supplied environment
- Instructor and semester differences
- Changes to assignments or grading between comparisons
- Novelty effects
- Hardware and network differences
- Docker Desktop installation as a remaining setup dependency
- Image download size and disk use
- Linux bind-mount ownership differences
- Disabled authentication being safe only with localhost binding
- Lack of centralized backup or recovery
- ARM emulation overhead and missing `ptrace` behavior
- Dependence on Docker and code-server as external software projects
- The inability of pre-deployment testing to establish educational outcomes

### 10. Ethics, privacy, and academic policy

Explain that:

- Student files remain on student-controlled host storage.
- The system does not require a course server to store code or activity logs.
- No telemetry should be added merely to make the study easier.
- Any linkage between survey, usage, and grades requires institutional approval and careful de-identification.
- AI features are disabled to implement course policy, while students must still follow the instructors' current policy regarding external tools.

### 11. Conclusion

Answer the research questions using only collected evidence. Summarize the architectural contribution and practical trade-offs. Do not repeat the abstract verbatim.

Before deployment, conclude with what technical feasibility has been demonstrated and state that educational effectiveness remains future work. After deployment, replace that sentence with the measured findings and their limitations.

## Recommended tables and figures

Include only figures that clarify an important relationship. Ready-made versions of the architecture and study-flow diagrams are in [`figures/`](./figures/) (`fig1-architecture.png`, `fig2-study-flow.png`).

1. **Architecture diagram:** Browser → localhost → container → bind-mounted host folder.
2. **Design-space comparison:** CS50 Codespaces, DevContainers, Lightweight Symphony, CodeDive, and the UNLV system.
3. **Platform support matrix:** Windows/macOS/Linux × amd64/arm64 × C++/x86 image × debugger support.
4. **Environment contents table:** Toolchains, extensions, ports, architecture, starter files, and image versions.
5. **Technical results table:** Startup, size, memory, compilation time, and persistence checks.
6. **Study flow diagram:** Enrollment → attempted setup → successful setup → continued use → survey response.

## Claims checklist

### Claims currently supported by repository evidence

- The project provides separate C++ and x86-64 assembly images.
- The C++ build targets amd64 and arm64.
- The x86 build intentionally targets amd64 only.
- Both images expose code-server on container port 8080.
- Documented host ports allow the images to run side by side.
- Starter files are copied only into an empty workspace.
- The documented workflow uses host bind mounts rather than Docker volumes.
- Autosave is enabled.
- Built-in AI features are disabled.
- Containers do not have automatic restart policies.
- The project includes a release check for documented workflows.

### Claims requiring measured technical evidence

- The images work on every supported host configuration.
- The environment is lightweight on typical student machines.
- Updating never loses student files in all supported host configurations.
- Emulated execution performance is acceptable.
- The interface is easier than alternative setups.

### Claims requiring course data

- Students spend less time on setup.
- Staff receive fewer support requests.
- Students experience less anxiety.
- Students focus more on programming.
- Students prefer the browser IDE.
- The environment improves assignment completion, grades, retention, or learning.

## Writing milestones

### Milestone 1 — Annotated reading notes

For each required source, produce 150–250 words covering:

- Research problem
- System or intervention
- Context and participants
- Evidence and method
- Main findings
- Limitations
- How the source supports or challenges the UNLV paper

### Milestone 2 — Literature synthesis

Complete the literature matrix and write a 1,000–1,500-word related-work draft organized by architectural approach.

### Milestone 3 — Evidence inventory

For every planned claim, identify one of:

- repository evidence;
- technical experiment;
- student or instructor data;
- prior literature; or
- a clearly labeled design goal.

Remove or narrow claims with no evidence source.

### Milestone 4 — Pre-deployment manuscript

Complete the introduction, related work, requirements, design, technical evaluation, limitations, and study protocol. Mark future educational results explicitly rather than inventing placeholder findings.

### Milestone 5 — Course study

After institutional approval, deploy the environment, collect the planned data, document deviations from the protocol, and analyze both successful and unsuccessful adoption.

### Milestone 6 — Final revision

Revise the abstract, discussion, limitations, and conclusion based on the actual evidence. Verify every bibliography entry using its DOI or the publisher's citation export.

## Final submission checklist

- [ ] The paper does not claim to be the first educational Docker environment.
- [ ] The paper distinguishes cloud IDEs, local DevContainers, VMs, browser exercise systems, and this architecture.
- [ ] C++ multi-architecture support and x86 amd64-only support are explained correctly.
- [ ] Student files are described as host bind-mounted files, not Docker-managed volumes.
- [ ] Localhost binding and disabled authentication are explained together.
- [ ] Educational goals are not reported as findings without data.
- [ ] Survey response rates and denominators are reported.
- [ ] Historical comparisons are not described as randomized causal evidence.
- [ ] Negative findings, setup failures, and emulation limitations are included.
- [ ] Student privacy, institutional review, and data handling are addressed.
- [ ] Repository tag, image digest, tool versions, and test hardware are reported.
- [ ] All citations have been checked against DOI or publisher records.

## Recommended starting order

Begin with these five readings, in order:

1. Malan, “Containerizing CS50”
2. Valstar et al., “Using DevContainers to Standardize Student Development Environments”
3. Fernalld et al., “Lightweight Symphony”
4. Cadenas et al., “Virtualization for Cost-Effective Teaching of Assembly Language Programming”
5. Harvie et al., “Using Virtual Machines to Enhance the Educational Experience”

Then read Malan 2013 for the historical argument, Laadan et al. for local appliances, CodeDive for the centralized browser-based alternative, and Teaching CS50 with AI for the AI-policy contrast.

## Author's working notes (2026-08-16)

Raw planning notes recorded after the first literature pass; see `LITERATURE_SUMMARIES.md` for the per-paper evidence backing these points.

### Paper writing focuses

**Advantages:**

- Reducing friction and resources spent on setup so class time focuses on conceptual learning.
- Reducing monetary spend on servers or compute resources, and bypassing potential internet issues.
- User-host vs. cloud-solution trade-offs for privacy and for continuance after the course ends (students keep their environment; no offboarding problem).
- Ability to work remotely instead of having to access specialized devices on campus.
- Increased access: students can use any machine they own to run the programs.
- Control over the student development experience, with no back-and-forth with IT during updates.

**Limitations:**

- Advanced topics that require more resources — Cybersecurity, Operating Systems, Machine Learning — are naturally harder for Docker container solutions to cover. *(Scope note: the Lightweight Symphony quote makes this claim about cloud-hosted Codespaces, not about local Docker — Fernalld et al. themselves ran OS and Cybersecurity courses on local Docker successfully. Frame this limitation as resource ceilings of student hardware, not of containers per se.)*
- Lack of a working debugger on Mac ARM-based machines due to emulation limitations (the documented gdb/ptrace boundary).

**Resource/stability claim vs. the course VM (added after the Canvas evidence):** "Outdated" is the weaker claim (the Intel course image is Ubuntu 24.04, current); the stronger, fully evidenced claim is that **full desktop VMs are more resource-intensive and fragile than containers**. Evidence anchors: the course's own UTM panel shows a fixed 4 GB RAM reservation and a 19.12 GB disk image, and its own instructions document the fragility (no unclean shutdowns, image breaks if moved after first open, manual `xrandr` workaround); Lightweight Symphony chose Docker over Type-2 hypervisors for exactly this reason (Ubuntu's recommended 8 GB/25 GB reservations; no amd64 guests on ARM); Malan 2013 reports ~20% of students finding the CS50 VM slow plus lid-close corruption at scale. Phrase it carefully: Docker Desktop on macOS/Windows also runs a Linux VM under the hood — the claim is **one shared, headless, dynamically allocated lightweight VM versus a per-course full desktop VM with fixed reservations**, not "containers avoid virtualization." Empirical support comes from EXPERIMENT_PLAN.md cells 5–6 (stock Ubuntu 24.04 VM as the declared proxy for the unreachable course `.ova`): disk, idle RAM, cold start, compile time, VM vs container on identical hardware.

**Applicability:**

- Mention UNLV's own historical arc and the VMs previously provided to students that have not been updated in a while (CSN/UNLV Linux servers, e.g. "sally" accessed over PuTTY — research in progress).
- This is applied research focused on solving a problem affecting 300+ UNLV students yearly.

### Experiment design

**Simulation:**

- Run AWS compute instances to stand in for student machines when measuring compilation and testing behavior.

**Limitations:**

- Turnaround time is short; a student survey and longitudinal key metrics cannot be collected this cycle.

**Metrics:**

- Comparison of grades.
- Reduction of in-class setup time.
