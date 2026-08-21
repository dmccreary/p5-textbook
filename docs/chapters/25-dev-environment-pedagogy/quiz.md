# Quiz: Development Environment, Tools & Pedagogy

Test your understanding of p5 Web Editor, VS Code, local development, debugging strategies, and creative coding pedagogy with these review questions.

---

#### 1. What is the primary advantage of the browser-based p5.js Web Editor for introductory students?

<div class="upper-alpha" markdown>
1. Zero setup barrier: students can write, execute, save, and share sketches instantly in the browser without installing local software
2. It compiles JavaScript directly to native C++ binaries
3. It provides unlimited GPU cloud rendering power
4. It eliminates all syntax errors automatically
</div>

??? question "Show Answer"
    The correct answer is **A**. The p5.js Web Editor runs entirely in the web browser, eliminating installation hurdles, terminal configuration, and path issues, making it accessible for classrooms, workshops, and beginners. Options B, C, and D are false.

    **Concept Tested:** p5 Web Editor Accessibility

---

#### 2. Why is running a local HTTP development server (such as VS Code Live Server or `python3 -m http.server`) necessary when loading external images, sounds, or fonts in local sketches?

<div class="upper-alpha" markdown>
1. Web browsers block cross-origin local file reading (`file:///`) due to CORS security policies
2. Local files run 100x slower without an HTTP server
3. JavaScript cannot execute on desktop computers without a web server
4. Web browsers require a server to compile HTML5 canvas
</div>

??? question "Show Answer"
    The correct answer is **A**. Browsers enforce the Same-Origin Policy and Cross-Origin Resource Sharing (CORS) rules that prevent web pages on `file:///` URLs from reading local disk files via `fetch()`, `loadImage()`, or `loadSound()`. Running a local server provides `http://localhost`, satisfying CORS. Options B, C, and D are false.

    **Concept Tested:** Local Web Server CORS

---

#### 3. What developer tool in web browsers allows programmers to inspect errors, log variable values with `console.log()`, and set breakpoints?

<div class="upper-alpha" markdown>
1. HTML Validator
2. Browser Developer Tools (Web Console / Debugger)
3. CSS Preprocessor
4. WebGL Texture Compiler
</div>

??? question "Show Answer"
    The correct answer is **B**. Browser Developer Tools provide the Web Console (for logs, warnings, and uncaught exceptions) and interactive Debugger (for pausing execution on breakpoints and inspecting scope variables). Options B, C, and D are other tools.

    **Concept Tested:** Browser Dev Tools Console

---

#### 4. What pedagogical debugging technique involves explaining code line by line to an inanimate object to identify logic errors?

<div class="upper-alpha" markdown>
1. Pair Programming
2. Rubber Duck Debugging
3. Binary Search Tracing
4. Test-Driven Development
</div>

??? question "Show Answer"
    The correct answer is **B**. Rubber Duck Debugging is the practice of explaining code line-by-line in plain human language to an inanimate object (or peer), which forces metacognitive reflection and reveals hidden assumptions or logical flaws. Options B, C, and D are other practices.

    **Concept Tested:** Rubber Duck Debugging

---

#### 5. In creative coding education, what is the 'Low Floor, High Ceiling, Wide Walls' pedagogical design principle?

<div class="upper-alpha" markdown>
1. Sketches must have low memory usage, high screen resolution, and wide aspect ratios
2. Easy for beginners to start (low floor), extensible for complex advanced work (high ceiling), and supportive of diverse creative pathways (wide walls)
3. Classroom rooms must have low floors and high ceilings for projector visibility
4. Algorithms must have low time complexity and wide array structures
</div>

??? question "Show Answer"
    The correct answer is **B**. Articulated by Seymour Papert and Mitch Resnick, this principle emphasizes that educational tools should be easy to start with minimal barriers, capable of sophisticated advanced creation, and flexible across varied artistic interests. Options B, C, and D misinterpret the metaphor.

    **Concept Tested:** Low Floor High Ceiling Pedagogy

---

#### 6. What is the primary role of Git and GitHub in professional creative coding development?

<div class="upper-alpha" markdown>
1. Automatically fixing syntax errors in JavaScript
2. Real-time GPU shader compiling
3. Version control, history tracking, open-source collaboration, and website deployment via GitHub Pages
4. Running audio synthesizer plugins in the browser
</div>

??? question "Show Answer"
    The correct answer is **C**. Git manages project version history, branches, and code collaboration, while GitHub hosts repositories and automates deployment (e.g. GitHub Pages). Options B, C, and D are unrelated software functions.

    **Concept Tested:** Git Version Control Role

---

#### 7. When teaching creative coding, why are live-coding demonstrations and deliberate error modeling effective instructional strategies?

<div class="upper-alpha" markdown>
1. They ensure all students write identical code
2. They prove the instructor never makes mistakes
3. They demystify the coding process, normalize debugging as an authentic practice, and demonstrate real-time problem-solving
4. They reduce lesson duration to 5 minutes
</div>

??? question "Show Answer"
    The correct answer is **C**. Watching an instructor write code live, encounter genuine errors, interpret console error messages, and systematically resolve bugs models authentic expert practice and reduces learner anxiety. Options B, C, and D are incorrect.

    **Concept Tested:** Live Coding Pedagogical Modeling

---

#### 8. Which accessibility standard ensures that interactive canvas sketches and learning materials are usable by individuals with visual or motor impairments?

<div class="upper-alpha" markdown>
1. ECMAScript 2026 Spec
2. OpenGL Specification 4.6
3. Web Content Accessibility Guidelines (WCAG) and ARIA attributes
4. W3C CSS Grid Standard
</div>

??? question "Show Answer"
    The correct answer is **C**. WCAG provides guidelines (contrast ratios, keyboard operability, screen reader descriptions via ARIA) to make web content accessible to users with disabilities. Options B, C, and D are non-accessibility technical standards.

    **Concept Tested:** Web Accessibility WCAG

---

#### 9. How does formative assessment (such as self-paced quizzes and interactive MicroSims) support student learning in an intelligent textbook?

<div class="upper-alpha" markdown>
1. It limits student access to subsequent chapters until 100% score is achieved
2. It assigns permanent letter grades that cannot be changed
3. It replaces all classroom instruction with automated bots
4. It provides low-stakes retrieval practice, immediate feedback, and diagnostic self-monitoring of concept mastery
</div>

??? question "Show Answer"
    The correct answer is **D**. Formative quizzes and interactive simulations leverage cognitive science principles (retrieval practice, testing effect, immediate feedback) to consolidate memory and identify knowledge gaps without punitive grading pressure. Options B, C, and D are harmful or incorrect educational practices.

    **Concept Tested:** Formative Assessment Retrieval Practice

---

#### 10. What is the educational purpose of scaffolding differentiated challenge tracks (mild, medium, spicy) in programming assignments?

<div class="upper-alpha" markdown>
1. To prevent students from collaborating on projects
2. To segregate students into separate locked grading categories
3. To reduce the instructor's grading workload
4. To accommodate learners with diverse prior experience, providing structured support for beginners while offering open-ended extensions for advanced students
</div>

??? question "Show Answer"
    The correct answer is **D**. Differentiated scaffolding provides accessible starter scaffolds for novice learners to build confidence, alongside creative extension prompts that challenge advanced students within the same classroom. Options B, C, and D are counterproductive.

    **Concept Tested:** Scaffolding Differentiated Tracks

---
