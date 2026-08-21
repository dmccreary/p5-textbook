# AI Agent Instructions

Welcome, Agent. If you are reading this file, you have been tasked with generating, editing, or validating content for **The Art of Processing** textbook.

Before you make any changes to the markdown files or chapter content, you **MUST** read and strictly follow the rules defined in:
`CONTENT-GENERATION-GUIDE.md`

## Key Directives:

1. **Formatting**: Pay explicit attention to the custom Markdown and CSS rules for Admonitions and character mascots (Palette the Chameleon). Do NOT use generic blockquotes or standard GitHub alerts for mascot dialogue. You must use the exact markdown classes specified.
2. **MicroSims**: This textbook relies on interactive visual examples. When generating content, you must plan for and integrate `p5.js` interactive MicroSims using iframes or specification `<details>` blocks. Do not rely entirely on walls of text. If a concept is complex, it needs a MicroSim.
3. **Quality Assurance**: Do not assume your generated output was formatted perfectly on the first try. You are required to run `python scripts/check_mascots.py` (and any other validation scripts) after generating a chapter to mathematically prove your formatting aligns with the project rules.

Failure to follow the guide will result in broken page layouts and an inconsistent student experience. Read `CONTENT-GENERATION-GUIDE.md` now if you have not already.

## MicroSim Comment Header

When generating any MicroSim, add the following block of comments to the JavaScript file:

```js
/* {MICROSIM_NAME} MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/{MICROSIM_ID}/
*/
```

Where {MICROSIM_NAME} is a title-case name of the MicroSim
and {MICROSIM_ID} is the kabab-case directory of the MicroSim

## MicroSim p5.js Implementation Rules & Pitfalls

When creating or modifying p5.js MicroSims, all agents **MUST** adhere to these lifecycle and architectural rules to prevent blank canvases and runtime crashes:

### 1. Canvas Height Declaration
- Every `.js` file must contain `// CANVAS_HEIGHT: <integer>` on its own line within the first 10 lines.
- `canvasHeight = drawHeight + controlHeight`.

### 2. Initialization Order & `updateCanvasSize()` Lifecycle (CRITICAL)
- **Do NOT call `positionControls()` inside `updateCanvasSize()`** before controls are instantiated in `setup()`. Calling `positionControls()` before `createSlider()`/`createButton()` throws `TypeError: Cannot read properties of undefined (reading 'position')` and breaks `setup()`, leaving the canvas blank.
- Standard pattern:
  ```javascript
  function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // 1. Create all controls first
    mySlider = createSlider(0, 100, 50, 1);
    myButton = createButton('Click Me');

    // 2. Position controls AFTER creation
    positionControls();

    // 3. Set accessibility fallback
    describe('Educational description', FALLBACK);
  }

  function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container && container.offsetWidth > 0) {
      canvasWidth = container.offsetWidth;
    }
  }

  function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    if (typeof positionControls === 'function') {
      positionControls();
    }
  }
  ```
- Always guard `positionControls()` to ensure controls exist before setting positions:
  ```javascript
  function positionControls() {
    if (typeof mySlider === 'undefined' || !mySlider) return;
    // position logic...
  }
  ```

### 3. Accessibility `describe()` Parameter
- In p5.js, use `describe(text, FALLBACK)` or `describe(text)`.
- Never use unquoted `LABEL` (e.g. `describe(text, LABEL)`), as `LABEL` is not a defined variable in global scope and will throw a fatal `ReferenceError`.

### 4. Visual Layout Standards
- **Drawing Region**: `fill('aliceblue'); stroke('silver'); rect(0, 0, canvasWidth, drawHeight);`
- **Controls Region**: `fill('white'); stroke('silver'); rect(0, drawHeight, canvasWidth, controlHeight);`
- **Title**: Rendered in the drawing area after background/grid: `fill('black'); textSize(22); textAlign(CENTER, TOP); noStroke(); text(title, canvasWidth/2, 12);`
- **Text Safety**: Always invoke `noStroke()` before any `text()` drawing call to avoid residual stroke corruption.
- **Control Layout Calculation**: `controlHeight = (numberOfControlRows * 35) + 15`.

### 5. String Literals & Escaping
- When adding string options to `createSelect()`, avoid unescaped nested quotes or raw regex control strings that could cause JavaScript parser syntax errors.

### 6. Mandatory Headless Playwright Verification (CRITICAL)
- **Always test newly generated or modified MicroSims using a headless Playwright browser test** before considering any MicroSim task complete.
- Verify that:
  1. No console errors or unhandled exceptions (`pageerror`) are thrown during initialization or `draw()` cycles.
  2. The `<canvas>` element renders with non-zero bounding dimensions (`width > 0` and `height > 0`).
  3. Interactive controls (sliders, buttons, selects) render and are visible within the iframe boundary.
- Python Playwright test pattern:
  ```python
  from playwright.sync_api import sync_playwright
  import os

  with sync_playwright() as p:
      browser = p.chromium.launch(headless=True)
      page = browser.new_page()
      errors = []
      page.on('pageerror', lambda err: errors.append(str(err)))
      page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
      page.goto(f'file://{os.path.abspath("docs/sims/<sim-id>/main.html")}')
      page.wait_for_timeout(400)
      canvas = page.query_selector('canvas')
      assert canvas and canvas.bounding_box()['width'] > 0
      assert len(errors) == 0, f'Errors found: {errors}'
      browser.close()
  ```