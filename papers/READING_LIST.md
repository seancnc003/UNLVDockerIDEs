# Curated Bibliography — 9 Papers (Poster + Paper)

**Final selection: 9 papers** — the unstruck items below. Cut from the original 12: Ngo et al. 2025 (weakest venue, hardest to obtain), Liu et al. 2025 *Improving AI in CS50* (one AI paper suffices; *Teaching CS50 with AI* is the keeper since the x86 Design Document links students to cs50.ai), and Malan 2010 *Moving CS50 into the Cloud* (Malan 2013 covers the same arc and cites it internally — make the infrastructure-cost point through 2013). All three cuts remain listed below in case a reviewer asks. This is the floor: each remaining paper covers a distinct related-work category, so do not cut further.

Verified against publisher/DOI records, August 2026. Papers marked **[local PDF]** are already in this folder.
Full reading instructions per paper are in [RESEARCH_PAPER_ASSIGNMENT.md](./RESEARCH_PAPER_ASSIGNMENT.md).

## Core: containerized course environments (the direct lineage)

1. **David J. Malan. 2024. "Containerizing CS50: Standardizing Students' Programming Environments."** *ITiCSE 2024.* [local PDF](./containerizingCS50.pdf) · [DOI 10.1145/3649217.3653567](https://doi.org/10.1145/3649217.3653567) · [Harvard open copy](https://cs.harvard.edu/malan/publications/V1fp0310-malan.pdf)
   *Role:* Primary inspiration; the cloud (Codespaces) endpoint that this project's decentralized design contrasts with.

2. **Sander Valstar, William G. Griswold, Leo Porter. 2020. "Using DevContainers to Standardize Student Development Environments: An Experience Report."** *ITiCSE 2020*, 377–383. [DOI 10.1145/3341525.3387424](https://doi.org/10.1145/3341525.3387424)
   *Role:* Closest local-Docker precedent; contrast their desktop-VS Code + extension stack with this project's browser code-server.

3. **Kourtnee Fernalld, TJ O'Connor, Sneha Sudhakaran, Nasheen Nur. 2023. "Lightweight Symphony: Towards Reducing Computer Science Student Anxiety with Standardized Docker Environments."** *SIGITE 2023.* [DOI 10.1145/3585059.3611432](https://doi.org/10.1145/3585059.3611432)
   *Role:* Closest empirical precedent (adoption, anxiety, setup-perception surveys) — the model for the planned UNLV study.

4. ~~**Linh B. Ngo, Huy D. Nguyen, Bao G. Ngo, Tejas Karusala. 2025. "Common Container-Based Infrastructure Blueprints for Multi-Course Computing Education."** *J. Comput. Sci. Coll.* 41(3), 153–165. [ACM DL](https://dl.acm.org/doi/10.5555/3801163.3801225)~~ **[CUT — bench]**
   *Role:* Frames the C++ + x86 pair as shared multi-course infrastructure, not isolated demos.

## Historical arc: cluster → cloud → appliance

5. ~~**David J. Malan. 2010. "Moving CS50 into the Cloud."** *J. Comput. Sci. Coll.* 25(6), 111–120. [Harvard open PDF](https://cs.harvard.edu/malan/publications/ccscne10-malan.pdf)~~ **[CUT — bench]**
   *Role:* Costs of instructor-run central infrastructure — covered via Malan 2013, which cites it.

6. **David J. Malan. 2013. "From Cluster to Cloud to Appliance."** *ITiCSE 2013*, 88–92. [DOI 10.1145/2462476.2462491](https://doi.org/10.1145/2462476.2462491) · [Harvard open PDF](https://cs.harvard.edu/malan/publications/itc218s-malan.pdf)
   *Role:* The client-side "course appliance" idea this project revives with containers.

7. **Oren Laadan, Jason Nieh, Nicolas Viennot. 2010. "Teaching Operating Systems Using Virtual Appliances and Distributed Version Control."** *SIGCSE 2010*, 480–484. [DOI 10.1145/1734263.1734427](https://doi.org/10.1145/1734263.1734427) · [Columbia open PDF](https://www.cs.columbia.edu/~orenl/papers/sigcse2010_os.pdf)
   *Role:* Local appliances on student-owned machines, offline operation — VM costs a container reduces.

## VMs and assembly-language virtualization (the CS 218 / x86 angle)

8. **José O. Cadenas, R. Simon Sherratt, Des Howlett, Chris G. Guy, Karsten O. Lundqvist. 2015. "Virtualization for Cost-Effective Teaching of Assembly Language Programming."** *IEEE Trans. Educ.* 58(4), 282–288. [DOI 10.1109/TE.2015.2405895](https://doi.org/10.1109/TE.2015.2405895) · [Open manuscript](https://centaur.reading.ac.uk/39692/1/qemu-Centaur.pdf)
   *Role:* Main course-specific source — packaging a complete assembly toolchain; contrast their ARM/QEMU choice with this project's amd64-only fidelity decision and the gdb/ptrace emulation boundary.

9. **David P. Harvie, Christopher Morrell, Jason R. Cody, Tanya T. Estes. 2019. "Using Virtual Machines to Enhance the Educational Experience in an Introductory Computing Course."** *SIGITE 2019*, 28–32. [DOI 10.1145/3349266.3351401](https://doi.org/10.1145/3349266.3351401)
   *Role:* Empirical template — measured install/troubleshooting time and performance across 2 years, 10 classrooms.

## Browser-based IDE alternatives (the contrast class)

10. **Hyunchan Park et al. 2025. "CodeDive: A Web-Based IDE with Real-Time Code Activity Monitoring for Programming Education."** *Applied Sciences* 15(19), 10403. [DOI 10.3390/app151910403](https://doi.org/10.3390/app151910403)
    *Role:* The centralized Kubernetes + monitoring alternative — the architectural and privacy foil to this project's local, telemetry-free design.

## AI-enabled vs. AI-disabled course environments

11. **Rongxin Liu et al. 2024. "Teaching CS50 with AI."** *SIGCSE 2024.* [local PDF](./TeachingCS50withAI.pdf) · [DOI 10.1145/3626252.3630938](https://doi.org/10.1145/3626252.3630938)
    *Role:* Describes cs50.ai, the very chatbot the x86 Design Document's AI Usage section links students to. Frames this project's stance precisely: editor AI disabled, course-sanctioned external AI permitted by policy.
12. ~~**Rongxin Liu et al. 2025. "Improving AI in CS50."** *SIGCSE 2025.* [local PDF](./ImprovingAIinCS50.pdf) · [DOI 10.1145/3641554.3701945](https://doi.org/10.1145/3641554.3701945)~~ **[CUT — bench]**
    *Role:* Follow-up detail on cs50.ai; adds refinement, not a new argument.

## Poster citations

The poster should cite only ~6: Malan 2024, Valstar 2020, Fernalld 2023, Cadenas 2015, Harvie 2019, Teaching CS50 with AI.

## Bench (swap in if a reviewer asks, or for the paper's long version)

- Jialiang Tan, Yu Chen, Shuyin Jiao. 2023. "Visual Studio Code in Introductory Computer Science Course." [arXiv:2303.10174](https://arxiv.org/abs/2303.10174) — VS Code interface usability for novices (preprint).
- Gallego-Romero et al. 2020. "Analyzing Learners' Engagement and Behavior in MOOCs with the Codeboard IDE." *ETR&D* 68. [DOI 10.1007/s11423-020-09773-6](https://doi.org/10.1007/s11423-020-09773-6) — browser-IDE engagement measures.
- TJ O'Connor et al. 2024. "PWN Lessons Made Easy with Docker." *SIGCSE 2024.* [DOI 10.1145/3626252.3630911](https://doi.org/10.1145/3626252.3630911) — Docker + low-level/binary coursework, same group as Lightweight Symphony.
- "ASM Visualizer: A Learning Tool for Assembly Programming." *SIGCSE 2025.* [ACM DL](https://dl.acm.org/doi/10.1145/3641554.3701793) — assembly-pedagogy tooling, if the paper needs a second assembly-education source.
