---
title: Canvas Inspector
description: Interactive p5.js MicroSim for canvas inspector.
image: /sims/canvas-inspector/canvas-inspector.png
og:image: /sims/canvas-inspector/canvas-inspector.png
twitter:image: /sims/canvas-inspector/canvas-inspector.png
social:
   cards: false
quality_score: 100
---

# Canvas Inspector

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Canvas Inspector MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Canvas Inspector in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/p9P-IZdpz)

## About This MicroSim

The **Canvas Inspector** MicroSim visualizes the fundamental concepts of the p5.js coordinate system and the render loop. By providing a sandbox where students can manipulate the canvas dimensions, the simulation frame rate, and the physical coordinates of a point, this simulation bridges the gap between abstract code concepts (`setup()`, `draw()`, `createCanvas()`) and their tangible visual outputs.

## How to Use

Each mouse action and control in this simulation demonstrates a distinct programming concept:

*   **Drag the Red Point (Coordinates)**: Click and drag the red circle to see its `(x, y)` coordinates update in real-time. Notice how the origin `(0, 0)` is located in the top-left corner, and the Y-axis increases as you move *downward*—a critical difference from standard Cartesian math planes.
*   **Grid Width / Height Sliders (Canvas Dimensions)**: Adjusting these sliders modifies the simulated `createCanvas(width, height)` boundary. Notice how the draggable point is constrained to these new dimensions, demonstrating how the canvas size limits your drawing area.
*   **Frame Rate Slider (The `draw()` Loop)**: Changing the frame rate directly impacts the speed at which the `draw()` runs counter increments. This visually proves that the `draw()` function is an infinite loop that runs continuously, and that the `frameRate()` function dictates its speed.
*   **BG Color Picker (State & Rendering)**: Selecting a new color instantly updates the background, demonstrating how state-setting functions apply changes across the canvas on the next frame.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/canvas-inspector/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of a standard Cartesian coordinate plane (X and Y axes).
* Conceptual understanding that computer programs run instructions sequentially.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to pay special attention to the two numbers located next to the red dot, and the "runs" counters in the top-left corner.
2. **Guided Practice (10 min)**: 
   * *Concept: Coordinate System*: Ask students to drag the point to `(0, 0)`. Ask: *"Why is it in the top-left corner instead of the center like in math class?"* Discuss how computer screens draw from the top-left down. Ask them to move the point straight down, noting that the Y-value *increases*.
   * *Concept: Canvas Dimensions*: Instruct students to set the Grid Width to 200 and Grid Height to 200. Ask them to drag the point as far right and down as possible. This teaches the concepts of the `width` and `height` system variables.
   * *Concept: `setup()` vs `draw()`*: Direct students' attention to the info panel. Ask: *"Why is `setup()` always 1 while `draw()` keeps climbing?"* Have them lower the Frame Rate slider to 5 FPS, then raise it to 60 FPS, observing the counter's speed to solidify the concept of the render loop.
3. **Assessment (5 min)**: Conduct a quick "Predict Output" quiz. Ask students: *"If our canvas is 400x400, and I draw a circle at (400, 0), which corner will it appear in?"* (Answer: Top-Right).

### Assessment
* **Formative**: Observation of students successfully manipulating the point to requested (x, y) coordinates without hesitation.
* **Summative**: Ability to accurately articulate the difference between `setup()` (runs once) and `draw()` (runs continuously in a loop) in their own words, and explain why the Y-axis is inverted.

## References

1. [p5.js Reference: Coordinate System and Shapes](https://p5js.org/learn/coordinate-system-and-shapes.html)
2. [p5.js Reference: setup()](https://p5js.org/reference/p5/setup/)
3. [p5.js Reference: draw()](https://p5js.org/reference/p5/draw/)
