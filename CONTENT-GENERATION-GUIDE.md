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

### Do's and Don'ts

**Do:**

- Use Palette to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Palette more than 5-6 times per chapter
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
- If the quality checks fail, the agent is responsible for running an automated repair script (or manually fixing the file) until it passes validation before reporting completion to the user.
