---
title: 1. Introduction to Creative Coding & Canvas Foundations
description: Introduces the p5.js canvas environment, the setup() and draw() lifecycle loops, coordinate grids, and render cycles.
generated_by: claude skill chapter-content-generator
date: 2026-08-19 07:34:00
version: 0.09
---
# Introduction to Creative Coding & Canvas Foundations

## Summary

Introduces the p5.js canvas environment, the setup() and draw() lifecycle loops, coordinate grids, and render cycles. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 33 concepts from the learning graph:

1. Coordinate System
2. Canvas Element
3. Setup Function
4. Draw Function
5. Frame Rate
6. Frame Count
7. Pixel Grid
8. Canvas Width
9. Canvas Height
10. Create Canvas Function
11. Background Color Function
12. Preload Function
13. No Loop Function
14. Redraw Function
15. Loop Control Function
16. Window Resized Event
17. Resize Canvas Function
18. Full Screen Mode
19. Display Density
20. Pixel Density Control
21. Console Log Debugging
22. Statement Semicolon Syntax
23. Code Comments Syntax
24. Script Inclusion Tag
25. p5.js Library Import
26. CDN Script Loading
27. Global Mode Execution
28. Instance Mode Execution
29. p5 Constructor Function
30. Render Cycle Loop
31. Delta Time Tracking
32. Target Frame Rate Setting
33. Canvas Aspect Ratio

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

Welcome to the world of creative coding! In this chapter, we establish the foundational mental models needed to bridge visual art and computer programming. We will set up the p5.js environment, understand how a digital canvas maps to the screen, and learn the essential lifecycle functions that bring code to life. 

!!! mascot-welcome "Hi! I'm Palette."
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome to The Art of Processing! I'm **Palette**, a colorful chameleon who loves creative coding. I'll be popping into the margins all the way through this book, but I do not show up randomly. I have exactly **six jobs**, and you'll learn to recognize me by which one I'm doing:

    1. **Welcome you** at the start of every chapter — that's what I'm doing right now.
    2. **Help you think things through** when an idea is particularly clever or abstract.
    3. **Give you tips** — the secret moves a working creative coder uses.
    4. **Warn you gently** about common mistakes and syntax pitfalls.
    5. **Encourage you** when a difficult concept might feel overwhelming.
    6. **Celebrate with you** at the end of each chapter when you've earned it!

    That's it. If I'm not doing one of those six things, I'm not in the chapter. Time to color outside the loops!

## Getting Started with p5.js

Before we can draw shapes or animate pixels, we need to understand how to bring the **p5.js Library Import** into our web environment. A library is a collection of pre-written code that extends what we can do. p5.js extends standard JavaScript with powerful tools for artists. 

To use it, we use a **Script Inclusion Tag**. This is an HTML element that tells the browser to load an external JavaScript file. A common way to load p5.js is through a Content Delivery Network (CDN), which is a system of distributed servers that deliver web content quickly. This approach is called **CDN Script Loading**.

We also need to establish good habits early. When writing code, we use a **Statement Semicolon Syntax** to indicate the end of a command, much like a period at the end of a sentence. Additionally, we use **Code Comments Syntax** to leave notes for ourselves or other programmers. Comments are ignored by the computer. In JavaScript, a single-line comment starts with two forward slashes (`//`).

Let's look at how we include the library in an HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Script Inclusion Tag using CDN Script Loading -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```

!!! mascot-warning "Mind the Semicolon"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    While modern JavaScript sometimes forgives missing semicolons, getting into the habit of ending your statements with a semicolon (`;`) will prevent bizarre errors later on when we start doing complex mathematics!

## The Digital Canvas

Traditional artists paint on physical canvas. Creative coders paint on a **Canvas Element**, a specialized digital drawing board inside a web browser. The canvas is made up of a **Pixel Grid**, a dense matrix of tiny colored squares. 

To navigate this grid, we use a **Coordinate System**. Unlike the standard Cartesian plane you may have learned in algebra (where the y-axis goes up), the computer graphics coordinate system has its origin `(0, 0)` at the **top-left corner**. The x-axis extends to the right, and the y-axis extends *downward*.

Before we explore an interactive visualization of this coordinate space, let's formally define the dimensions. The canvas has a specific width in pixels, known as the **Canvas Width**, and a specific height, known as the **Canvas Height**. The ratio between these two measurements is the **Canvas Aspect Ratio** (for example, 16:9 for widescreen displays).

#### Diagram: Coordinate System Explorer

<details markdown="1">
<summary>Coordinate System Explorer</summary>
Type: MicroSim
**sim-id:** coordinate-system-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning Objective:** Understanding (Students will interactively explore how (x, y) coordinates map to the top-left origin canvas).

**Visual Elements:**
- A large grid representing the p5.js canvas.
- The origin `(0, 0)` clearly marked in the top-left corner.
- The x-axis running right (labeled).
- The y-axis running down (labeled).
- A draggable point (a distinct circle) on the grid.

**Interactivity:**
- When the user drags the point, its current `(x, y)` coordinates update in real-time in a large readout panel.
- Hovering over quadrants highlights the area and explains the pixel distances from the origin.
- The grid resizes dynamically to demonstrate `width` and `height` properties.

Implementation: p5.js canvas with `mouseDragged` events to update the coordinate display and `text()` calls to render the math.
</details>

## The Lifecycle: Setup and Draw

Every p5.js sketch relies on a fundamental structure: a beginning and a continuous cycle. This is governed by two essential functions.

The **Setup Function** (`setup()`) is called precisely once when the program starts. It is where we define initial properties, such as the size of the screen. Inside `setup()`, we always call the **Create Canvas Function** (`createCanvas(width, height)`) to generate our drawing area.

The **Draw Function** (`draw()`) is called immediately after setup and executes continuously in a loop. This continuous execution is called the **Render Cycle Loop**. Every time the `draw()` function finishes, it immediately starts over, generating a new frame.

Let's look at a simple example. We will also use the **Background Color Function** (`background()`), which fills the entire canvas with a solid color, effectively erasing the previous frame.

```javascript
// The Setup Function runs once
function setup() {
  // Create Canvas Function: 800 pixels wide by 600 pixels high
  createCanvas(800, 600);
}

// The Draw Function runs in a continuous loop
function draw() {
  // Background Color Function: fills the canvas with light gray (200)
  background(200);
}
```

Sometimes, before `setup()` can run, we need to load large files like images, fonts, or audio. For this, we use the **Preload Function** (`preload()`). The program will wait until everything in `preload()` is fully loaded before it moves on to `setup()`.

## Time and Frame Control

The illusion of animation is created by drawing slightly different images in rapid succession. The speed at which the `draw()` loop executes is called the **Frame Rate**, measured in frames per second (FPS). 

By default, p5.js attempts to run at 60 FPS. You can change this goal using the **Target Frame Rate Setting** (`frameRate(fps)`). The system keeps track of the total number of frames rendered since the sketch started using the **Frame Count** variable (`frameCount`).

In advanced simulations, especially physics engines, relying on frame count isn't enough because computers run at different speeds. Instead, we use **Delta Time Tracking** (`deltaTime`), which measures the exact number of milliseconds that have passed since the last frame. This ensures smooth motion regardless of the computer's processing power.

#### Diagram: Render Cycle and Frame Rate Monitor

<details markdown="1">
<summary>Render Cycle and Frame Rate Monitor</summary>
Type: MicroSim
**sim-id:** frame-rate-monitor<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning Objective:** Analyzing (Students will observe the relationship between the target frame rate, the actual delta time, and the resulting visual smoothness).

**Visual Elements:**
- A simple moving object (like a bouncing ball) crossing the screen.
- A real-time line chart tracking `frameRate` and `deltaTime`.
- A slider to adjust the Target Frame Rate.

**Interactivity:**
- Users slide the target frame rate from 1 FPS to 60 FPS.
- As the frame rate drops, the bouncing ball visibly stutters.
- The chart updates dynamically to show how `deltaTime` spikes when the frame rate is low.
- A toggle button labeled "Use Delta Time" switches the ball's movement logic from frame-dependent (`x += speed`) to time-dependent (`x += speed * deltaTime`).

Implementation: p5.js canvas utilizing DOM sliders. The chart can be drawn using `beginShape()` and `endShape()` tracking a history array of frame rates.
</details>

If you are creating a static piece of art that does not need to animate, running the render cycle 60 times a second wastes computing power. You can stop the loop entirely using the **No Loop Function** (`noLoop()`). If you need to update the screen exactly once after calling `noLoop()`, you can use the **Redraw Function** (`redraw()`). Alternatively, you can resume continuous execution using the **Loop Control Function** (`loop()`).

!!! mascot-tip "Static Art Optimization"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    If your sketch doesn't move or respond to the mouse, always put `noLoop();` at the end of your `setup()` function. It saves battery life on laptops and mobile devices!

## Responsiveness and High-Density Displays

Modern web browsers run on everything from tiny smartphones to massive 4K monitors. A robust sketch must adapt to its container. 

When a user resizes their browser window, the **Window Resized Event** (`windowResized()`) is triggered. Inside this event, we can call the **Resize Canvas Function** (`resizeCanvas(newWidth, newHeight)`) to dynamically adjust our drawing board. If you want your sketch to take up the entire monitor, bypassing the browser UI entirely, you can activate **Full Screen Mode** (`fullscreen(true)`).

Another consideration is screen sharpness. Modern phones and "Retina" laptops use high-resolution screens where a single CSS pixel actually contains multiple physical hardware pixels. This ratio is called the **Display Density**. 

By default, p5.js automatically scales the canvas to look sharp on high-density screens. However, drawing four times as many pixels can cause performance lag in complex 3D scenes. You can manually override this behavior using **Pixel Density Control** (`pixelDensity(1)`), forcing the sketch to render at standard resolution to prioritize speed over crispness.

The following table summarizes the key responsive functions:

| Function / Variable | Purpose | Typical Usage Context |
| :--- | :--- | :--- |
| `windowWidth`, `windowHeight` | System variables holding the current browser window size. | Used inside `createCanvas()` or `resizeCanvas()`. |
| `windowResized()` | Event function triggered when the browser changes size. | Used to hold the `resizeCanvas()` command. |
| `fullscreen()` | Toggles the browser into full-screen presentation mode. | Triggered by a button click or key press. |
| `pixelDensity()` | Sets or gets the pixel scaling ratio for high-res monitors. | Used inside `setup()` to optimize performance. |

## Advanced Execution Modes & Debugging

Throughout this book, we will primarily write code in **Global Mode Execution**. In Global Mode, all p5.js functions (like `createCanvas` and `background`) are available everywhere in your script without any special prefixes. It is fast, easy to read, and perfect for learning.

However, when you integrate a p5.js sketch into a complex React or Vue web application, Global Mode can cause conflicts. For professional web development, developers use **Instance Mode Execution**. In Instance Mode, the entire sketch is wrapped inside a **p5 Constructor Function** (`new p5()`), encapsulating the variables so they don't leak into the rest of the website. 

Regardless of which mode you use, things will eventually go wrong. When they do, your best tool is **Console Log Debugging**. By writing `console.log("My variable is:", myVariable);`, you can print text and data directly to the browser's developer console. It is the most direct way to peer inside your program's brain and see what it is actually thinking.

!!! mascot-thinking "The Power of the Console"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    If a shape isn't drawing where you expect it to, don't guess! Use `console.log(x, y)` inside your draw loop to see the exact coordinate numbers. Let the data guide your debugging.

## Summary

We have mapped the foundational architecture of a creative coding environment. You now understand the top-left coordinate system, the execution pipeline from `preload()` to `setup()` to the continuous `draw()` render cycle, and the critical distinction between frame rates and real-time delta tracking. You also possess the tools to make your canvas responsive and debug logic errors using the console. 

In the next chapter, we will take these structural concepts and begin rendering geometry to the screen using 2D primitive shapes.

!!! mascot-celebration "Canvas Mastered!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You've set up the scaffolding for every digital artwork you will ever create. The canvas is yours, the loop is running, and you're ready to start drawing!

