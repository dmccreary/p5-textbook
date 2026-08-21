# Quiz: CSS Styling, Layouts & Web Page Integration

Test your understanding of CSS styles, class selectors, flexbox, CSS grid, and parent container embedding with these review questions.

---

#### 1. Which p5.js method attaches a canvas or DOM element as a child of an existing HTML container `<div>`?

<div class="upper-alpha" markdown>
1. element.parent('container-id')
2. element.attach('container-id')
3. element.insert('container-id')
4. element.embed('container-id')
</div>

??? question "Show Answer"
    The correct answer is **A**. `element.parent(container)` attaches the DOM element or canvas inside a specific HTML container element, enabling responsive grid and flexbox layouts. Options B, C, and D are not p5.js methods.

    **Concept Tested:** Parent Container Attachment

---

#### 2. How do you assign a CSS class name to a p5.js DOM element for external stylesheet styling?

<div class="upper-alpha" markdown>
1. element.addClass('my-class')
2. element.setClass('my-class')
3. element.className = 'my-class'
4. element.styleClass('my-class')
</div>

??? question "Show Answer"
    The correct answer is **A**. `element.addClass('className')` adds a CSS class to the element's classList without overwriting existing classes. Options B, C, and D are incorrect.

    **Concept Tested:** Add Class Method

---

#### 3. Which p5.js method allows you to apply inline CSS rules directly to an element from JavaScript?

<div class="upper-alpha" markdown>
1. element.css('property', 'value')
2. element.style('property', 'value')
3. element.setStyle('property', 'value')
4. element.attr('property', 'value')
</div>

??? question "Show Answer"
    The correct answer is **B**. `element.style('color', '#ff0055')` modifies the inline CSS style attribute of the element. Options B, C, and D are not the standard p5.js styling methods.

    **Concept Tested:** DOM Element Style Method

---

#### 4. What CSS layout module provides one-dimensional space distribution and alignment along rows or columns?

<div class="upper-alpha" markdown>
1. CSS Float (float: left)
2. CSS Flexbox (display: flex)
3. CSS Table (display: table)
4. CSS Positioning (position: absolute)
</div>

??? question "Show Answer"
    The correct answer is **B**. Flexbox is specifically designed for 1D layout structure, handling alignment, direction, order, and responsive space distribution along a main axis. Options B, C, and D are legacy or non-flex layout models.

    **Concept Tested:** CSS Flexbox Layout

---

#### 5. What CSS layout system is best suited for complex two-dimensional grid layouts with explicit rows and columns?

<div class="upper-alpha" markdown>
1. CSS Inline-Block
2. CSS Grid (display: grid)
3. CSS Flexbox
4. CSS Clearfix
</div>

??? question "Show Answer"
    The correct answer is **B**. CSS Grid is a 2D layout system capable of arranging elements across both horizontal rows and vertical columns simultaneously. Flexbox is 1D. Options B and D are older techniques.

    **Concept Tested:** CSS Grid Layout

---

#### 6. To make a p5.js canvas resize dynamically whenever the browser window dimensions change, which lifecycle function should be implemented?

<div class="upper-alpha" markdown>
1. onResize()
2. canvasResized()
3. windowResized()
4. browserChanged()
</div>

??? question "Show Answer"
    The correct answer is **C**. `windowResized()` is a built-in p5.js lifecycle handler called whenever the browser viewport changes size. Inside, calling `resizeCanvas(windowWidth, windowHeight)` keeps the canvas responsive. Options B, C, and D are not p5.js functions.

    **Concept Tested:** Window Resized Lifecycle

---

#### 7. How do you make a canvas fill the entire browser viewport width and height upon initialization?

<div class="upper-alpha" markdown>
1. createCanvas(screen.width, screen.height);
2. createCanvas(100%, 100%);
3. createCanvas(windowWidth, windowHeight);
4. createCanvas(MAX_WIDTH, MAX_HEIGHT);
</div>

??? question "Show Answer"
    The correct answer is **C**. `windowWidth` and `windowHeight` contain the current dimensions of the browser window viewport in pixels. Passing them to `createCanvas()` initializes a full-screen canvas. Option B has invalid syntax in JavaScript.

    **Concept Tested:** Fullscreen Canvas Setup

---

#### 8. What CSS property removes the default margin and scrollbars from the HTML `<body>` when embedding a fullscreen canvas?

<div class="upper-alpha" markdown>
1. scroll: none; border: 0;
2. padding: 100px; display: block;
3. margin: 0; overflow: hidden;
4. canvas: fullscreen;
</div>

??? question "Show Answer"
    The correct answer is **C**. Browsers add an 8px default margin to `<body>`. Setting `margin: 0; overflow: hidden;` in CSS removes page margins and scrollbars, preventing scroll jitter on fullscreen sketches. Options B, C, and D are incorrect.

    **Concept Tested:** CSS Fullscreen Reset

---

#### 9. Why is separating visual styling into external CSS classes superior to hardcoding inline `.style()` calls in JavaScript?

<div class="upper-alpha" markdown>
1. External CSS files automatically compress image assets
2. External CSS executes on the GPU while inline styles execute on the CPU
3. Inline styles disable canvas anti-aliasing
4. It maintains separation of concerns, enables centralized design themes, supports media queries, and improves maintainability
</div>

??? question "Show Answer"
    The correct answer is **D**. External stylesheets keep design rules modular, reusable, and responsive via CSS media queries, keeping JavaScript code focused strictly on simulation logic and data flow. Options B, C, and D are false.

    **Concept Tested:** CSS Separation of Concerns

---

#### 10. What CSS property ensures that mouse clicks pass right through an overlay HTML element to reach the interactive canvas beneath it?

<div class="upper-alpha" markdown>
1. touch-action: pass;
2. user-select: none;
3. cursor: transparent;
4. pointer-events: none;
</div>

??? question "Show Answer"
    The correct answer is **D**. `pointer-events: none;` disables hit-testing on the CSS element, allowing mouse and touch events to fall through to underlying elements such as the p5.js canvas. Options B, C, and D do not pass pointer events through.

    **Concept Tested:** CSS Pointer Events None

---
