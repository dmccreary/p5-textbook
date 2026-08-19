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
