# Creative Coding Teachers Guide

Welcome to the teacher's guide for *The Art of Processing: Creative Coding, Computational Thinking, and Interactive Media with p5.js*. This guide explains every feature of the textbook, how to use it in your classroom, and how to customize it for your students. No prior technical knowledge is assumed — every technical term is defined before it is used.

## About This Interactive Intelligent Textbook

### What is an Intelligent Textbook?

An **intelligent textbook** is a digital textbook that goes beyond static text and images. It includes interactive simulations, self-grading quizzes, a searchable glossary, and a structured map of how concepts relate to each other. The goal is to give students a richer, more engaging learning experience than a traditional printed textbook.

### The Five Levels of Intelligent Textbooks

Not all digital textbooks are created equal. We categorize intelligent textbooks into five levels based on how interactive and adaptive they are:

<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/book-levels/main.html" height="500px" scrolling="no"
  style="overflow: hidden;"></iframe>

| Level | Name | Description | Example Features |
|-------|------|-------------|-----------------|
| **Level 1** | Static Digital | A PDF or basic web version of a print textbook | Text and images only, no interactivity |
| **Level 2** | Interactive | Adds interactive elements like simulations, quizzes, and searchable glossaries | MicroSims, self-check quizzes, concept search |
| **Level 3** | Adaptive | Adjusts content based on student performance | Personalized learning paths, difficulty adjustment |
| **Level 4** | AI-Assisted | Includes an AI tutor that can answer student questions | Chatbot integration, automated feedback |
| **Level 5** | Fully Adaptive AI | Continuously learns from student interactions and optimizes the experience | Real-time content generation, predictive analytics |

**This textbook is a Level 2 Intelligent Textbook.** 

### What Makes This Textbook Different

- **Interactive MicroSims** let students manipulate models directly in their browser — no software installation required
- **Critical thinking emphasis** — every chapter helps students decomposing complex design goals into modular algorithms, recognizing mathematical patterns, and systematically debugging code
- **"creative visual artistic expression and rigorous computer science principles" framing** — a positive, empowering tone that makes Creative Coding feel relevant to students' daily lives
- **Learning graph** — a visual map showing how all 600 concepts connect and build on each other
- **Palette the Chameleon** — a friendly mascot character (called a "pedagogical agent") who guides students through each chapter with tips, encouragement, and key insights
- **Completely free and open source** — licensed under Creative Commons for non-commercial use

## Using the Chapters

### Chapter Structure

The textbook contains **25 chapters** organized in a deliberate sequence. Each chapter builds on concepts from previous chapters, so students should work through them in order:

| Chapters | Topic Area |
|----------|-----------|
| 1–3 | Creative Coding Foundations (Canvas, 2D shapes, color theory) |
| 4–5 | JavaScript Fundamentals (Variables, control flow, loops, arrays) |
| 6–8 | Mathematics for Animation (Transformations, trigonometry, polar coordinates) |
| 9–10 | Randomness and Noise (Gaussian distributions, Perlin noise) |
| 11–12 | Physics and Particle Systems (Vector math, acceleration, steering behaviors) |
| 13–16 | User Interaction and UI (Mouse/keyboard events, mobile sensors, DOM controls, CSS) |
| 17–18 | Advanced JavaScript (Functions, ES6 classes, OOP, async data) |
| 19–20 | 3D Graphics (WebGL, cameras, lighting, materials, shaders) |
| 21–22 | Audio and Sound (Synthesis, oscillators, microphone input, FFT analysis) |
| 23–24 | Advanced Visual Processing (Image processing, video capture, generative typography) |
| 25 | Professional Practice (Development environment, tools, pedagogy) |

### What Each Chapter Contains

Every chapter follows a consistent structure:

1. **YAML front matter** — Metadata at the top of each chapter file (title, description, reading level, version). Students don't see this; it's used by search engines and the website builder.
2. **Summary** — A brief overview of what the chapter covers and what students will learn.
3. **Concepts covered** — A numbered list of the specific concepts addressed in the chapter, drawn from the learning graph.
4. **Prerequisites** — Links to prior chapters that should be completed first.
5. **Welcome from Palette** — A mascot admonition that introduces the chapter topic in Palette the Chameleon's friendly voice.
6. **Main content** — The core instructional material, written at a Beginner to Intermediate reading level. Includes tables, real-world examples, and embedded MicroSims.
7. **Mascot admonitions** — Throughout the chapter, Palette appears 5–6 times to highlight key insights (thinking), offer practical tips (tip), provide encouragement on harder concepts (encourage), and warn about common mistakes (warning).
8. **Key takeaways** — A numbered summary of the most important concepts, preceded by a celebration from Palette.

9. **Critical thinking challenge** — Expandable sections that train students to spot misinformation.
10. **Practice questions** — Open-ended questions for discussion or written responses.

### Suggested Classroom Use

- **Before class**: Assign the chapter as reading homework. The MicroSims keep students engaged during independent reading.
- **During class**: Use the MicroSims on a projector for whole-class demonstrations. Ask students to predict what will happen when you change a slider, then test their predictions.
- **After class**: Assign the practice questions and critical thinking challenges. Use the quiz (separate page) for a quick formative assessment.
- **Pacing**: Each chapter is designed for approximately 2–3 class periods (90–135 minutes of instruction). Some chapters with more MicroSims may take longer.

## Using the MicroSims

### What is a MicroSim?

A **MicroSim** (short for "micro-simulation") is a small, interactive simulation that runs directly in a web browser. Students don't need to install any software — MicroSims work on any device with a modern web browser (Chrome, Firefox, Safari, Edge).

Each MicroSim lets students manipulate one or more variables (using sliders, buttons, or drag-and-drop) and immediately see how the model responds. This "learn by doing" approach helps students build intuition for abstract concepts.

### How MicroSims Are Embedded

MicroSims appear within chapter text as rectangular interactive areas. They are embedded using **iframes** — a web technology that displays one web page inside another. You don't need to understand how iframes work; just know that the MicroSims load automatically when students view the chapter page.

### Types of MicroSims

The textbook includes over 71 MicroSims built with different visualization technologies:

| Technology | What It's Good For | Example MicroSims |
|-----------|-------------------|-------------------|
| **p5.js** | Interactive animations with sliders and buttons | (list 2-3 examples from project) |
| **Chart.js** | Bar charts, line charts, pie charts | (list 2-3 examples from project) |
| **Plotly** | Advanced interactive charts with hover details | (list 1-2 examples from project) |
| **vis-network** | Network diagrams showing connections | Learning Graph Viewer |

### Tips for Using MicroSims in Class

1. **Project them on a screen** — MicroSims are designed to be visible on a projector. Have students call out predictions before you move a slider.
2. **Let students explore independently** — After a demonstration, give students 5–10 minutes to experiment on their own devices.
3. **Use the "Reset" button** — Every MicroSim has a reset button. Encourage students to reset and try different scenarios.
4. **Connect to the text** — Each MicroSim is placed near the concept it illustrates. After exploring the sim, have students re-read the surrounding text.
5. **Offline access** — MicroSims require an internet connection unless you have built the site locally (see "Customizing Your Own Textbook" below).


!!! mascot-tip "Palette's Tip: Embed MicroSims Anywhere!"
    ![Palette shares a tip](../img/mascot/tip.png){ class="mascot-admonition-img" }
    You can add any MicroSim to **any web page** — a Google Site, a
    WordPress blog, an LMS like Canvas or Schoology, or even a plain
    HTML file. Just paste a single line of HTML:

    ```html
    <iframe src="https://dmccreary.github.io/p5-textbook/sims/YOUR-MICROSIM-NAME/main.html"
        width="100%" height="450px"
        scrolling="no">
    </iframe>
    ```

    Replace `YOUR-MICROSIM-NAME` with the name of any MicroSim from
    the [MicroSims list](../sims/index.md). That's it — one line of
    code and your students have an interactive simulation on any page
    you control.


### MicroSim Specifications

Within each chapter, you'll find a collapsible **details** section below each MicroSim labeled with its name. Click to expand and see the full specification including:

- **Bloom's Taxonomy level** — What cognitive level the MicroSim targets (Remember, Understand, Apply, Analyze, Evaluate, Create)
- **Learning objective** — What students should be able to do after using the MicroSim
- **Interactive controls** — What sliders, buttons, and inputs are available
- **Default parameters** — The starting values when the MicroSim loads

These specifications are useful for lesson planning and for understanding the pedagogical intent behind each simulation.

## Using the Glossary

### What is the Glossary?

The **glossary** is an alphabetical list of all key terms used in the textbook, each with a precise, concise definition. It serves as a quick-reference dictionary for students encountering unfamiliar vocabulary.

### How to Access the Glossary

- Click **"Glossary"** in the left navigation sidebar from any page
- Use the browser's built-in search (Ctrl+F on Windows/Linux, Cmd+F on Mac) to find a specific term on the glossary page
- Use the site-wide **search bar** at the top of any page to search for a term across the entire textbook

### Tips for Using the Glossary in Class

- **Vocabulary preview** — Before starting a new chapter, have students look up the key terms in the glossary to build familiarity.
- **Definition matching** — Create a warm-up activity where students match glossary definitions to terms from the current chapter.
- **Student-generated definitions** — After reading a chapter, have students write their own definitions, then compare with the glossary.
- **Glossary quizzes** — Use glossary terms for quick formative assessments (flash cards, quiz games, etc.).

## Using the FAQ

### What is the FAQ?

The **FAQ** (Frequently Asked Questions) is a curated list of common questions students ask about Creative Coding, organized by topic. Each question includes a clear, concise answer written at the same reading level as the chapters.

### How the FAQ is Organized

The FAQ covers questions across all 25 chapters. Questions are grouped by topic area to make browsing easy.

### Tips for Using the FAQ in Class

- **Discussion starters** — Pick 2–3 FAQ questions at the start of class and have students discuss before revealing the answer.
- **Homework support** — Point students to the FAQ when they have questions outside of class hours.
- **Extension reading** — The FAQ often covers angles not addressed in the main chapter text, making it good supplementary material.
- **Test review** — Students can use the FAQ as a study guide before assessments.

## Using the Quizzes

### What Are the Quizzes?

Each chapter has an accompanying **quiz page** with multiple-choice questions designed for self-assessment. Quizzes test understanding of the concepts covered in that chapter and are aligned to specific items from the learning graph.

### How Quizzes Work

- Quizzes are accessed by clicking the **"Quiz"** link under each chapter in the left navigation
- Each quiz contains multiple-choice questions at varying Bloom's Taxonomy levels
- Questions are presented as expandable sections — students can click to reveal the answer and explanation after attempting the question
- Quizzes are **not graded automatically** — they are designed as formative self-check tools, not summative assessments

### Tips for Using Quizzes in Class

- **Exit tickets** — Have students complete the quiz at the end of a class period as a quick check for understanding.
- **Pre-reading check** — Assign the quiz before the chapter to see what students already know (diagnostic assessment).
- **Post-reading review** — Use the quiz after reading to identify concepts that need re-teaching.
- **Collaborative quiz** — Have students work in pairs to discuss each question before revealing the answer.
- **Custom assessments** — Use the quiz questions as a bank to create your own tests. The questions are openly licensed (see "Understanding the License" below).

### Bloom's Taxonomy Levels

Each quiz question is tagged with a **Bloom's Taxonomy** level. Bloom's Taxonomy is a framework that classifies thinking skills from simple to complex:

| Level | Name | What It Means | Example Verb |
|-------|------|--------------|-------------|
| L1 | Remember | Recall facts and definitions | Define, list, name |
| L2 | Understand | Explain concepts in your own words | Explain, describe, compare |
| L3 | Apply | Use concepts to solve problems | Calculate, demonstrate, solve |
| L4 | Analyze | Break down and examine relationships | Differentiate, organize, compare |
| L5 | Evaluate | Make judgments based on criteria | Assess, argue, justify |
| L6 | Create | Produce original work or solutions | Design, construct, propose |

A well-balanced assessment includes questions across multiple levels. The quizzes in this textbook primarily target levels L1–L4, with critical thinking challenges in the chapters targeting L5–L6.

## Using the References

### What Are the References?

Each chapter has an accompanying **references page** with a curated list of approximately 10 high-quality sources that students can use for further reading. References prioritize Wikipedia articles for accessibility and reliability, supplemented by authoritative books and research papers.

### How References Are Organized

Each reference includes:

- **Title** — The name of the source
- **URL** — A clickable link to the source
- **Relevance** — A brief description of why this source is useful and how it connects to the chapter content

### A Note About Link Rot

**Link rot** is when a web link (URL) stops working because the page has been moved, renamed, or deleted. This is a common problem with any resource that links to external websites. While we prioritize Wikipedia (which has very stable URLs), some links may become outdated over time.

If you or your students encounter a broken link:

1. Try searching for the article title on the source website
2. Use the [Wayback Machine](https://web.archive.org/) to find archived versions of the page
3. Report the broken link using GitHub Issues (see "Feedback" below)

## Feedback

### Reporting Issues and Suggestions

This textbook is an open-source project hosted on **GitHub**, a website where software and content projects are developed collaboratively. You don't need to understand programming to report a problem or suggest an improvement.

### What is a GitHub Issue?

A **GitHub Issue** is like a support ticket — it's a way to report a bug, suggest an improvement, or ask a question. Each issue gets a unique number and can be discussed by the project team and community.

### How to Submit Feedback

1. Go to the textbook's GitHub repository: [dmccreary/p5-textbook](https://github.com/dmccreary/p5-textbook)
2. Click the **"Issues"** tab at the top of the page
3. Click the green **"New issue"** button
4. Give your issue a clear title (e.g., "Broken link in Chapter 5 references" or "Suggestion: Add MicroSim for topic X")
5. In the description, provide as much detail as possible:
    - Which page or chapter has the problem
    - What you expected to see vs. what you actually see
    - Your browser and device (if relevant)
6. Click **"Submit new issue"**

You will need a free GitHub account to submit issues. If you prefer not to create an account, you can email feedback to the author using the contact page.

### Types of Feedback Welcome

- **Typos and errors** — factual mistakes, spelling errors, broken formatting
- **Broken links** — URLs that no longer work
- **MicroSim bugs** — simulations that don't load or behave unexpectedly
- **Content suggestions** — topics that should be covered, examples that could be improved
- **Accessibility issues** — content that is difficult to read or navigate for students with disabilities

## Understanding the License

### What is a Creative Commons License?

A **license** is a legal document that explains what others are allowed to do with a piece of work. A **Creative Commons (CC) license** is a standardized, easy-to-understand license used for educational and creative content. It tells you exactly what permissions you have without needing a lawyer.

### This Textbook's License

This textbook uses the **CC BY-NC-SA 4.0** license. Here's what each part means:

| Code | Full Name | What It Means |
|------|-----------|---------------|
| **CC** | Creative Commons | A standard open license |
| **BY** | Attribution | You must give credit to the original author |
| **NC** | Non-Commercial | You cannot use the material to make money |
| **SA** | Share-Alike | If you modify the material, you must share it under the same license |
| **4.0** | Version 4.0 | The version of the license (the current standard) |

### What You CAN Do

- **Copy** the entire textbook or individual chapters for your students
- **Share** the textbook link with other teachers, students, or parents
- **Print** chapters for classroom use
- **Modify** the content — add your own examples, remove sections, change the order
- **Translate** the content into other languages
- **Create derivative works** — build your own version of the textbook based on this one

### What You CANNOT Do

- **Sell** the textbook or charge students for access
- **Remove attribution** — you must credit the original author (Dan McCreary)
- **Use a different license** — if you modify and share, it must remain CC BY-NC-SA 4.0
- **Claim it as your own work** — the attribution requirement means you must acknowledge the original source

For the full legal text, see the [Creative Commons License](../license.md) page.

## Customizing Your Own Textbook

One of the most powerful features of this textbook is that you can create your own customized version. This section explains how, step by step.

### Key Technical Terms

Before we begin, here are some terms you'll need to understand:

- **Repository (repo)** — A folder on GitHub that contains all the files for a project. Think of it as the project's home directory.
- **Git** — A version control tool that tracks changes to files. It lets you see what changed, when, and by whom.
- **Clone** — Making a complete copy of a repository on your own computer.
- **Fork** — Making a complete copy of a repository on your own GitHub account (stays on GitHub, not your computer).
- **MkDocs** — The software that converts the textbook's markdown files into a website. You don't need to learn MkDocs deeply — just enough to make basic changes.
- **Markdown** — A simple text formatting language. If you can write an email, you can write Markdown. `**bold**` makes **bold**, `# Heading` makes a heading, and `-` makes a bullet point.
- **mkdocs.yml** — The main configuration file for the textbook website. It controls the site title, navigation structure, colors, and which features are enabled.

### Step 1: Create a GitHub Account

If you don't already have one, go to [github.com](https://github.com) and create a free account.

### Step 2: Fork or Clone the Repository

**Option A: Fork (easier, stays on GitHub)**

1. Go to [dmccreary/p5-textbook](https://github.com/dmccreary/p5-textbook)
2. Click the **"Fork"** button in the upper-right corner
3. This creates a copy in your own GitHub account that you can edit

**Option B: Clone (more control, works on your computer)**

1. Install Git on your computer ([git-scm.com](https://git-scm.com/))
2. Open a terminal (Command Prompt on Windows, Terminal on Mac)
3. Run this command:

```bash
git clone https://github.com/dmccreary/p5-textbook.git
```

This downloads the entire textbook to your computer.

### Step 3: Make Changes

All content files are in the `docs/` folder. They are written in **Markdown** (`.md` files) — plain text files with simple formatting. You can edit them with any text editor.

#### Changing the Title and Description

Open `mkdocs.yml` and edit these lines:

```yaml
site_name: "Your Custom Textbook Title"
site_description: "Your description here"
site_author: "Your Name"
```

#### Changing the Colors

In `mkdocs.yml`, find the `palette` section:

```yaml
theme:
  palette:
    - scheme: default
      primary: indigo    # Change to: blue, red, purple, teal, etc.
      accent: orange      # Change the accent color
```

MkDocs Material supports these primary colors: red, pink, purple, deep purple, indigo, blue, light blue, cyan, teal, green, light green, lime, yellow, amber, orange, deep orange, brown, grey, blue grey.

#### Changing the Logo

Replace the file `docs/img/logo.png` with your own logo image (PNG format, approximately 128x128 pixels).

### Step 4: Preview Your Changes Locally

1. Install Python (version 3.8 or newer) from [python.org](https://python.org)
2. Install MkDocs and the Material theme:

```bash
pip install mkdocs mkdocs-material
```

3. Navigate to the project folder and start the preview server:

```bash
cd p5-textbook
mkdocs serve
```

4. Open your browser to `http://127.0.0.1:8000/p5-textbook/` to see your customized version

The preview server watches for file changes. When you edit and save a Markdown file, the page automatically refreshes in your browser.

### Step 5: Publish Your Version

To publish your customized textbook as a free website using GitHub Pages:

```bash
mkdocs gh-deploy
```

This command builds the website and publishes it to `https://YOUR-USERNAME.github.io/p5-textbook/`. The process takes about 1–2 minutes.

## Customizing Your Analytics

### What is Web Analytics?

**Web analytics** is the process of measuring how visitors use a website — which pages they visit, how long they stay, and where they come from. For an educational textbook, analytics can help you understand which chapters students read most, which MicroSims they interact with, and where they might be struggling.

### Google Analytics

This textbook includes **Google Analytics** — a free service from Google that tracks website visits. The author's analytics property is already configured, but if you create your own fork, you'll want to set up your own.

#### Setting Up Your Own Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com/) and sign in with a Google account
2. Create a new **property** (Google's term for a tracked website)
3. Google will give you a **Measurement ID** — a code that looks like `G-XXXXXXXXXX`
4. In your `mkdocs.yml`, update this section:

```yaml
extra:
  analytics:
    provider: google
    property: G-YOUR-MEASUREMENT-ID
```

5. Rebuild and deploy your site. Analytics data will start appearing within 24–48 hours.

#### What You Can Learn from Analytics

- **Which chapters are most/least visited** — helps you identify where students might be skipping content
- **Average time on page** — longer times may indicate engagement or confusion
- **Device breakdown** — what percentage of students use phones vs. computers
- **Geographic distribution** — where your students are accessing from
- **Search terms** — what students search for on your site

### xAPI Monitoring (Advanced)

**xAPI** (Experience API, also called "Tin Can API") is an advanced standard for tracking detailed learning activities — not just page views, but specific interactions like "student moved a slider to position X" or "student answered quiz question 3 correctly."

#### What is an LRS?

An **LRS** (Learning Record Store) is a database that stores xAPI learning records. Think of it as a specialized analytics system designed specifically for education. If you use an LRS, you can track granular student learning data.

#### Important: Regulatory Considerations

Before collecting student-specific learning data, be aware of these regulations:

- **FERPA** (Family Educational Rights and Privacy Act) — U.S. federal law that protects student education records. If you collect data that can identify individual students, you must comply with FERPA.
- **COPPA** (Children's Online Privacy Protection Act) — U.S. federal law that applies to children under 13. If any of your students are under 13, additional restrictions apply.
- **State laws** — Many U.S. states have additional student privacy laws.
- **GDPR** (General Data Protection Regulation) — European Union law that applies if any of your students are in the EU.

**Recommendation**: The Google Analytics setup described above is anonymous by default — it tracks aggregate page views, not individual students. This is the safest approach. If you want individual student tracking via xAPI, consult your school district's data privacy officer before proceeding.

### Building a Student Progress Dashboard with AI

As AI tools become more accessible, it is becoming possible to build custom dashboards that visualize student progress through the textbook. For example:

- Which chapters each student has completed
- Quiz scores over time
- MicroSim engagement levels
- Concepts that need re-teaching based on quiz performance

Building such a dashboard requires programming knowledge (Python, JavaScript) and careful attention to student data privacy. This is an advanced topic beyond the scope of this guide, but the open-source nature of this textbook means all the data structures are available for developers to build upon.

## The Learning Graph

### What is a Learning Graph?

A **learning graph** is a visual map showing how concepts in the textbook depend on each other. It is structured as a **DAG** (Directed Acyclic Graph) — a diagram where arrows show which concepts must be understood before others.

For example, understanding advanced concepts requires mastering their prerequisites first. The learning graph makes these dependency chains visible.

### How Teachers Can Use the Learning Graph

- **Prerequisite checking** — Before teaching a concept, verify that students have covered its prerequisites
- **Remediation** — If a student struggles with a concept, trace back to its prerequisites to find the gap
- **Curriculum mapping** — Compare the learning graph to your existing syllabus to identify coverage gaps
- **Enrichment** — Advanced students can explore concepts ahead of the current chapter by following the graph forward

The interactive Learning Graph Viewer is available in the "Learning Graph" section of the left navigation.

## Palette the Chameleon: Your Pedagogical Agent

### What is a Pedagogical Agent?

A **pedagogical agent** is a character that appears throughout a textbook to guide students. Research shows that pedagogical agents improve student engagement and perception of learning — a phenomenon called the **persona effect**.

### How Palette Appears

Palette the Chameleon appears as colored callout boxes (called **admonitions**) throughout each chapter. There are seven types:

| Type | Color | Purpose | Frequency |
|------|-------|---------|-----------|
| Welcome | Green | Introduces the chapter | Every chapter opening |
| Thinking | Orange | Highlights key insights | 1–2 per chapter |
| Tip | Green | Shares practical advice | As needed |
| Warning | Red | Alerts to common mistakes | As needed |
| Encourage | Blue | Supports on harder concepts | Where students may struggle |
| Celebration | Purple | Celebrates progress | Every chapter ending |
| Neutral | Gray | General notes | As needed |

Palette appears no more than 5–6 times per chapter to avoid overuse. Mascot admonitions are never placed back-to-back.

### Tips for Teachers

- **Read Palette's tips aloud** — They're written in a conversational tone that works well when spoken
- **Use as discussion prompts** — Palette's "thinking" admonitions highlight the most important insights in each chapter
- **Encourage struggling students** — Point students to Palette's "encourage" admonitions when they're frustrated with a concept