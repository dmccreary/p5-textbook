# The Art of Processing

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/p5-textbook/)
[![Built with Google Antigravity](https://img.shields.io/badge/Built%20with-Google%20Antigravity-4285F4?logo=google&logoColor=white)](https://antigravity.google)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

An interactive, intelligent textbook exploring creative coding, computational thinking, and generative media with [p5.js](https://p5js.org/).

## View the Live Site

Read the interactive textbook online at: [https://dmccreary.github.io/p5-textbook/](https://dmccreary.github.io/p5-textbook/)

---

## Overview

*The Art of Processing* is a comprehensive intelligent textbook designed to bridge the gap between creative visual
expression and rigorous computer science principles. Utilizing **p5.js**—the modern web JavaScript implementation of
Processing—this course transforms abstract computational concepts into immediate visual and acoustic feedback.
Students master core programming constructs (variables, conditionals, loops, functions, arrays, objects, and classes)
while creating interactive artwork, algorithmic physics simulations, generative typography, and audio visualizers.

The textbook incorporates concept dependency learning graphs, Bloom's Taxonomy (2001 revision) pedagogical frameworks,
and 20 interactive standalone MicroSims. It serves a dual audience:

1. **Students and Self-Directed Learners:** Beginners to intermediate programmers mastering computational thinking.
2. **Educators, Mentors, and Volunteers:** Instructors seeking structured pedagogy, live-coding guides, and rubrics.

---

## Site Status and Metrics

All book statistics are derived directly from the canonical metrics hub at `docs/learning-graph/book-metrics.json`:

| Metric | Count | Source / Notes |
|---|---|---|
| **Concepts in Learning Graph** | 600 | Rows in learning-graph.csv |
| **Chapters** | 25 | Numbered chapters with full content |
| **Total Words** | 194,480 | Student-facing prose (excluding code blocks/URLs) |
| **Estimated Equivalent Pages** | ~800 | Estimated printed pages |
| **Interactive MicroSims** | 20 | Standalone p5.js simulations |
| **Glossary Terms** | 600 | ISO 11179-compliant definitions |
| **FAQ Questions** | 89 | Curated student and instructor questions |
| **Quiz Questions** | 250 | 10 multiple-choice questions across all 25 chapters |
| **Annotated References** | 250 | 10 curated citations per chapter |
| **Diagrams** | 51 | Educational figures and architectural diagrams |
| **Mathematical Equations** | 122 | Formatted LaTeX equations |
| **Hyperlinks** | 616 | Curated web and documentation links |
| **Mascot Poses** | 7 | Pedagogical guide: Palette the Chameleon |

---

## Getting Started

### Prerequisites

- Python 3.10+ (or a Conda environment)
- Git

### Installation

Clone the repository and install required MkDocs dependencies:

```bash
git clone https://github.com/dmccreary/p5-textbook.git
cd p5-textbook
```

Install MkDocs and Material for MkDocs:

```bash
pip install mkdocs mkdocs-material
```

### Local Development

Launch the local development server with live reloading:

```bash
mkdocs serve
```

Open your browser and navigate to `http://127.0.0.1:8000/` (or `http://localhost:8000/`).

### Building the Static Site

Compile the static HTML and assets into the `site/` folder:

```bash
mkdocs build --strict
```

### Deployment

Deploy the site directly to GitHub Pages:

```bash
conda run -n mkdocs mkdocs gh-deploy
```

---

## Usage

### Navigating the Book

- **Sidebar Navigation:** Use the left sidebar to explore the 25 numbered chapters in pedagogical sequence.
- **Search:** Use ++slash++ or ++cmd+k++ to search across all concepts, glossary entries, and code examples.
- **Pedagogical Mascot:** Look for *Palette the Chameleon* callout admonitions for tips, warnings, and prompts.

### Interactive MicroSims

Each MicroSim in `docs/sims/` is a self-contained interactive sandbox. You can adjust parameters, inspect canvas
coordinates, test color palettes, and observe real-time simulation behaviors.

---

## Repository Structure

```text
p5-textbook/
├── docs/                          # MkDocs source documentation
│   ├── chapters/                  # 25 textbook chapters
│   │   ├── 01-intro-creative-coding/
│   │   │   ├── index.md           # Chapter text & exercises
│   │   │   ├── quiz.md            # 10 Bloom-aligned questions
│   │   │   └── references.md      # Curated bibliography
│   │   └── ...
│   ├── sims/                      # 20 interactive p5.js MicroSims
│   │   ├── 3d-scene-editor/
│   │   ├── color-mixer/
│   │   ├── harmonic-oscillator/
│   │   └── ...
│   ├── learning-graph/            # Learning graph, metrics & taxonomy
│   │   ├── learning-graph.csv     # 600 concept dependencies
│   │   ├── book-metrics.json      # Canonical book metrics hub
│   │   ├── book-metrics.md        # Book composition report
│   │   └── chapter-metrics.md     # Per-chapter breakdown
│   ├── glossary.md                # 600 ISO 11179-compliant terms
│   ├── faq.md                     # 89 frequently asked questions
│   ├── course-description.md      # Complete syllabus & outcomes
│   ├── about.md                   # Motivation & author background
│   ├── license.md                 # CC BY-NC-SA 4.0 license deed
│   ├── css/                       # Custom styles (admonitions & mascot)
│   └── img/                       # Cover art & mascot poses
├── plugins/
│   └── social_override.py         # Social media preview meta-tag hook
├── scripts/                       # Verification & utility scripts
├── mkdocs.yml                     # Site configuration & navigation
└── README.md                      # Repository overview & getting started
```

---

## Contributing

Contributions, bug reports, and pedagogical suggestions are welcome!

1. Fork the repository
2. Create a topic branch: `git checkout -b feature/new-microsim`
3. Commit your changes: `git commit -m 'Add interactive transformation sandbox'`
4. Push to your branch: `git push origin feature/new-microsim`
5. Open a Pull Request

Please ensure that all contributions follow the formatting rules in `AGENTS.md` and pass `mkdocs build --strict`.

---

## Reporting Issues

If you discover typos, broken links, code errors, or have suggestions:

- Open a ticket on [GitHub Issues](https://github.com/dmccreary/p5-textbook/issues).
- Provide the chapter title, specific section, browser version, and steps to reproduce.

---

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

- **Attribution:** You must give appropriate credit to Dan McCreary.
- **NonCommercial:** You may not use this material for commercial purposes.
- **ShareAlike:** If you remix or adapt, distribute under the same license.

See [docs/license.md](./docs/license.md) for full licensing details and commercial inquiries.

---

## Acknowledgements

This textbook is made possible by open-source tools and creative coding communities:

- **[Processing Foundation & p5.js](https://p5js.org/)** — For empowering artists, designers, and educators worldwide.
- **[Google Antigravity](https://antigravity.google)** — AI-assisted agentic authoring and educational development environment.
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** by Martin Donath — For the documentation theme.
- **[MkDocs](https://www.mkdocs.org/)** — Fast static site generator.
- **[vis-network](https://visjs.org/)** — Interactive graph visualization.

---

## Contact

**Dan McCreary**

- **LinkedIn:** [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- **GitHub:** [@dmccreary](https://github.com/dmccreary)
- **Repository:** [https://github.com/dmccreary/p5-textbook](https://github.com/dmccreary/p5-textbook)
