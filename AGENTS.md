# AI Agent Instructions

Welcome, Agent. If you are reading this file, you have been tasked with generating, editing, or validating content for **The Art of Processing** textbook.

Before you make any changes to the markdown files or chapter content, you **MUST** read and strictly follow the rules defined in:
`CONTENT-GENERATION-GUIDE.md`

## Key Directives:

1. **Formatting**: Pay explicit attention to the custom Markdown and CSS rules for Admonitions and character mascots (Palette the Chameleon). Do NOT use generic blockquotes or standard GitHub alerts for mascot dialogue. You must use the exact markdown classes specified.
2. **MicroSims**: This textbook relies on interactive visual examples. When generating content, you must plan for and integrate `p5.js` interactive MicroSims using iframes or specification `<details>` blocks. Do not rely entirely on walls of text. If a concept is complex, it needs a MicroSim.
3. **Quality Assurance**: Do not assume your generated output was formatted perfectly on the first try. You are required to run `python scripts/check_mascots.py` (and any other validation scripts) after generating a chapter to mathematically prove your formatting aligns with the project rules.

Failure to follow the guide will result in broken page layouts and an inconsistent student experience. Read `CONTENT-GENERATION-GUIDE.md` now if you have not already.
