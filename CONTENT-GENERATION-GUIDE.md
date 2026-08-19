## Learning Mascot: Palette the Chameleon

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name**: Palette
- **Species**: Chameleon
- **Personality**: Playful and curious, Adaptable, Encouraging, Passionate about color theory
- **Catchphrase**: "Time to color outside the loops!"
- **Visual**: A bright, watercolor-style flat vector chameleon, chartreuse/green and bright orange, wearing a French beret and holding a digital stylus.

### Voice Characteristics

- Uses enthusiastic, art-themed metaphors
- Gentle and supportive when explaining complex logic
- Refers to learners as 'artists' and 'creators'
- Signature phrases: "Let's blend some code!", "Watch this pattern unfold!", "Time to color outside the loops!"

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
        Admonition text goes here after the image.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section completion | mascot-celebration | End of major sections |

### Mascot Admonition Guidelines (Instructional Design Rules)

Each mascot pose serves a specific cognitive and pedagogical purpose. Future agents generating these admonitions must strictly adhere to the following instructional design rules:

#### 1. `mascot-welcome` (Motivational Hook / Advance Organizer)
- **Instructional Purpose**: Addresses the "What's In It For Me?" (WIIFM) factor to break down learning anxiety before diving into technical content. It is not there to teach the chapter yet; it is there to **sell** the chapter.
- **Rule**: Do not summarize technical concepts or explain mechanics. Tell the student *why* they should care and *what amazing things* they will build.
- **Tone**: Fun, funny, and sincerely warm. Use enthusiastic art-themed metaphors. Always include a signature catchphrase like 'Time to color outside the loops!'
- **Length**: Strictly 2-4 sentences. *(Exception: Chapter 1, where Palette formally introduces her six jobs).*

#### 2. `mascot-thinking` (Cognitive Scaffolding / Mental Models)
- **Instructional Purpose**: Highlights a "Eureka!" moment, an abstraction, or a shift in mental models (e.g., computational thinking). It signals to the reader that they need to pause and process the *why* behind the *how*.
- **Rule**: Do not use this for mere facts or syntax. Use it to draw attention to underlying algorithms, core mechanics, or architectural patterns.
- **Tone**: Insightful, reflective, and thought-provoking. Use rhetorical questions or visual analogies (e.g., "Notice how...", "Think about it like this...").

#### 3. `mascot-tip` (Just-in-Time Support / Heuristics)
- **Instructional Purpose**: Provides a heuristic, a shortcut, or a best practice that isn't strictly required but significantly reduces cognitive load or friction. It acts as "expert insight" whispered to the novice.
- **Rule**: Keep it highly actionable. It must contain a practical, immediate takeaway (like a keyboard shortcut, a visual metaphor for a variable, or a clever math trick).
- **Tone**: Conspiratorial, helpful, and clever (e.g., "Here's a secret...", "Want to save some time?").

#### 4. `mascot-warning` (Anticipatory Guidance / Pitfall Prevention)
- **Instructional Purpose**: Serves as "anticipatory guidance" to prevent common novice pitfalls (e.g., infinite loops, CORS errors, syntax gotchas). It interrupts flow specifically to prevent frustration.
- **Rule**: Clearly state the pitfall, *why* it happens, and exactly how to avoid or fix it. You must provide the solution, not just the warning.
- **Tone**: Alert but reassuring. Never condescending or scary (e.g., "Watch out for...", "A common trap here is...").

#### 5. `mascot-encourage` (Affective Support / Normalizing Struggle)
- **Instructional Purpose**: Provides affective (emotional) support at known points of high cognitive friction or frustration (e.g., recursion, complex vector math). It normalizes struggle and promotes a growth mindset.
- **Rule**: Use ONLY when introducing a notoriously difficult topic. Validate the difficulty, remind them of past successes, and encourage them to experiment or take it step by step.
- **Tone**: Empathetic, validating, and motivating (e.g., "If this feels overwhelming, that's completely normal...", "Take a deep breath...").

#### 6. `mascot-celebration` (Formative Reinforcement / Closure)
- **Instructional Purpose**: Provides positive reinforcement and closure at the end of a major cognitive milestone or chapter. It satisfies the "Satisfaction" component of the ARCS model to consolidate learning.
- **Rule**: Do not just say "Good job." Explicitly name the specific concept or skill they just mastered so they feel a concrete sense of achievement.
- **Tone**: Joyful, celebratory, and proud (e.g., "Incredible work!", "You just mastered...").

### Do's and Don'ts

**Do:**

- Use Palette to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Palette more than 7-8 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Palette's personality or speech patterns

## MicroSims (Interactive Examples)

A core pedagogical goal of *The Art of Processing* is to provide hands-on, interactive learning through MicroSims. Text descriptions alone are insufficient for teaching complex, visual computational thinking.

- **Requirement**: Whenever a complex concept can be illustrated with a dynamic, interactive example, you MUST include an in-line MicroSim. 
- **Format**: If writing the chapter spec, use a `<details markdown="1">` block to define the MicroSim requirements. If the chapter has already been generated, embed the finished p5.js MicroSims directly using HTML `<iframe>` tags pointing to the built simulation.
- **Tools**: Rely on p5.js for all interactive physics, graphics, or simulation demonstrations. Ensure they are highly visual and manipulative (e.g. including sliders, draggable points, or live readouts).

## Quality Assurance & Validation

All AI-generated markdown must undergo strict programmatic quality assurance. Human language models frequently hallucinate or drift away from strict formatting constraints.

- **Post-Generation Rule**: After any chapter or markdown section is written, the generating agent MUST run automated validation scripts to verify its formatting.
- **Mascot Validation**: Specifically, after generating chapter content, you must run `python scripts/check_mascots.py` to ensure that:
  1. The chapter begins with a `mascot-welcome` and ends with a `mascot-celebration`.
  2. Admonitions follow the strict custom CSS formatting rules.
  3. No chapter is overwhelmed with too many mascot appearances (no more than 5-6).
  4. The `mascot-welcome` is strictly a 2-4 sentence sales pitch (with the exception of Chapter 1, which includes Palette's full introduction).
- If the quality checks fail, the agent is responsible for running an automated repair script (or manually fixing the file) until it passes validation before reporting completion to the user.

## Anti-Padding & Writing Style Rules

Large Language Models often attempt to artificially inflate text to meet word count targets, resulting in repetitive or hallucinated content. All generating agents MUST abide by these anti-padding rules:

1. **Quality Over Quantity (Soft Constraints)**: Word count targets (e.g., 3,000 words) are guidelines, not strict requirements. A dense, high-quality, 1,500-word chapter is infinitely better than a repetitive 3,500-word chapter. Do not artificially inflate the text length under any circumstances.
2. **Expand via "Show, Don't Tell"**: If a chapter feels too short, expand it by adding concrete code examples, introducing another interactive MicroSim, or detailing the technical mechanics. NEVER expand a chapter by repeating previous paragraphs, summarizing what was just said, or using generic filler text.
3. **Ban Formulaic Templates**: Do not use repetitive boilerplate sentence structures to introduce a list of concepts (e.g., "Let's talk about [Concept]. The concept of [Concept] is fundamental..."). Concepts must be organically woven into natural, flowing narrative paragraphs.
4. **Code Over Prose**: When explaining abstract logic or geometry, default to providing a commented `p5.js` code snippet rather than a long wall of descriptive text. Code provides better educational value than padded prose.
