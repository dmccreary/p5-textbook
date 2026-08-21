# Quiz: Introduction to Creative Coding & Canvas Foundations

Test your understanding of p5.js canvas foundations, coordinate system, and lifecycle functions with these review questions.

---

#### 1. Where is the origin coordinate (0, 0) located by default on a standard p5.js canvas?

<div class="upper-alpha" markdown>
1. At the top-left corner of the canvas
2. At the exact center of the canvas
3. At the bottom-left corner of the canvas
4. At the top-right corner of the canvas
</div>

??? question "Show Answer"
    The correct answer is **A**. In p5.js and standard 2D computer screen coordinate systems, the origin (0, 0) is situated at the top-left corner. The x-axis increases horizontally to the right, and the y-axis increases vertically downward. Option B is typical of 3D WebGL mode or Cartesian math, not default 2D. Option C is the traditional Cartesian origin. Option D is incorrect.

    **Concept Tested:** Coordinate System

---

#### 2. What is the primary architectural purpose of the `setup()` function in a p5.js sketch lifecycle?

<div class="upper-alpha" markdown>
1. To initialize the canvas and configure one-time global environment settings
2. To continuously execute drawing instructions at 60 frames per second
3. To load external asynchronous media assets before execution begins
4. To handle asynchronous mouse and keyboard user interaction events
</div>

??? question "Show Answer"
    The correct answer is **A**. The `setup()` function runs exactly once when the program starts and is used to define initial environment properties like `createCanvas()` and background defaults. Option A describes the `draw()` loop. Option C refers to the `preload()` function. Option D refers to event callback handlers such as `mousePressed()` or `keyPressed()`.

    **Concept Tested:** Setup Function

---

#### 3. Which p5.js function runs continuously in a loop to render successive frames for animation?

<div class="upper-alpha" markdown>
1. preload()
2. draw()
3. setup()
4. render()
</div>

??? question "Show Answer"
    The correct answer is **B**. The `draw()` function is called repeatedly in a continuous execution loop right after `setup()` finishes, generating animations frame by frame. Option A (`preload()`) executes before `setup()` to load assets. Option B (`setup()`) runs only once. Option D (`render()`) is not a standard built-in p5.js lifecycle function.

    **Concept Tested:** Draw Function

---

#### 4. If you need to ensure an external image file is completely loaded into memory before `setup()` executes, which lifecycle function should you use?

<div class="upper-alpha" markdown>
1. setup()
2. preload()
3. draw()
4. init()
</div>

??? question "Show Answer"
    The correct answer is **B**. `preload()` is executed right before `setup()` to handle asynchronous asset loading (such as images, fonts, and sound). It halts sketch execution until all assets are fully buffered. Options A, B, and C do not guarantee that asynchronous asset loading will finish before the canvas initializes.

    **Concept Tested:** Preload Function

---

#### 5. A student wants to draw a diagonal line spanning from the top-left corner to the bottom-right corner of any canvas. Which code snippet accomplishes this dynamically?

<div class="upper-alpha" markdown>
1. line(width, 0, 0, height);
2. line(0, 0, width, height);
3. line(0, height, width, 0);
4. line(width/2, height/2, width, height);
</div>

??? question "Show Answer"
    The correct answer is **B**. The top-left corner is at coordinate (0, 0) and the bottom-right corner is at (width, height). Calling `line(0, 0, width, height)` connects these two points across the canvas diagonal. Option B draws a line from top-right to bottom-left. Option C draws from bottom-left to top-right. Option D draws from center to bottom-right.

    **Concept Tested:** Canvas Width and Height

---

#### 6. What happens to the visual canvas display if you omit the `background()` call inside the `draw()` loop when animating a moving shape?

<div class="upper-alpha" markdown>
1. The canvas throws a fatal runtime reference error and stops rendering
2. The canvas becomes completely transparent and reveals the underlying webpage
3. The moving shape leaves a persistent trail of all previous frames
4. The frame rate drops to zero and the browser freezes
</div>

??? question "Show Answer"
    The correct answer is **C**. If `background()` is not called at the start of each `draw()` cycle, previous frames are not cleared. As a result, subsequent shape drawings accumulate on top of one another, leaving visual trails. Option A is incorrect because omitting `background()` is syntactically valid. Options C and D are incorrect.

    **Concept Tested:** Frame Rate Animation

---

#### 7. What built-in p5.js system variable tracks the total number of frames rendered since the sketch started?

<div class="upper-alpha" markdown>
1. frameRate
2. millis
3. frameCount
4. deltaTime
</div>

??? question "Show Answer"
    The correct answer is **C**. `frameCount` contains the integer count of frames that have been displayed since the program started. Option A (`frameRate`) is a function or variable indicating the current FPS. Option C (`millis()`) tracks elapsed milliseconds. Option D (`deltaTime`) tracks the difference in milliseconds between the previous frame and the current frame.

    **Concept Tested:** Frame Count

---

#### 8. Why is creative coding uniquely beneficial for learning computational thinking compared to traditional text-only programming?

<div class="upper-alpha" markdown>
1. It replaces all mathematical logic with intuitive visual art filters
2. It eliminates the need for syntax and algorithmic decomposition
3. It provides immediate visual and sensory feedback that reinforces mental models of code execution
4. It allows programs to run without memory or CPU hardware constraints
</div>

??? question "Show Answer"
    The correct answer is **C**. Creative coding bridges the abstract nature of code and concrete human perception by providing immediate visual, interactive, and acoustic feedback. This enables learners to test hypotheses and build strong mental models. Options A and C are false because creative coding relies heavily on math and algorithms. Option D is nonsensical.

    **Concept Tested:** Creative Coding Philosophy

---

#### 9. You execute `createCanvas(800, 600);` in `setup()`. At what coordinates is a point drawn if you call `point(width / 2, height / 2);`?

<div class="upper-alpha" markdown>
1. (0, 0)
2. (800, 600)
3. (200, 150)
4. (400, 300)
</div>

??? question "Show Answer"
    The correct answer is **D**. With `width = 800` and `height = 600`, `width / 2` evaluates to 400 and `height / 2` evaluates to 300. Thus `point(400, 300)` positions the point at the exact horizontal and vertical center of the canvas. Options A, B, and D reflect arithmetic miscalculations.

    **Concept Tested:** Coordinate Geometry

---

#### 10. An animation appears choppy and stutters inconsistently. What is the first analytical step you should take to diagnose the performance issue?

<div class="upper-alpha" markdown>
1. Rewrite the sketch in raw WebGL shaders without investigating JavaScript execution
2. Replace all arithmetic operators with bitwise shifts
3. Increase `createCanvas()` dimensions to force the GPU to allocate more video RAM
4. Inspect the console output and monitor the real-time frame rate using `frameRate()` to isolate frame drops
</div>

??? question "Show Answer"
    The correct answer is **D**. Systematic debugging starts with observing performance metrics using `frameRate()` and reviewing console logs to see if expensive calculations or unnecessary allocations are occurring inside the `draw()` loop. Options A, C, and D are counterproductive and do not systematically isolate the root cause.

    **Concept Tested:** Frame Rate Diagnostics

---
