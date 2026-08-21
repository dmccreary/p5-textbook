---
title: "Shape Builder"
description: "Interactive p5.js MicroSim for shape builder."
image: /sims/shape-builder/shape-builder.png
og:image: /sims/shape-builder/shape-builder.png
twitter:image: /sims/shape-builder/shape-builder.png
social:
   cards: false
quality_score: 95
---

# Shape Builder

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Shape Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Shape Builder** MicroSim is an interactive vector playground designed to teach students how 2D primitive shapes are drawn in p5.js. It visualizes the critical relationship between mathematical coordinates, origin rendering modes (`CENTER` vs `CORNER`), and styling properties like `strokeWeight()` and `fill()`. 

## How to Use

Each control in this simulation maps directly to a line of p5.js code:

*   **Drag the Red Dot / Pos Sliders (`x, y`)**: The red dot represents the mathematical *origin* (anchor point) of the shape. Dragging it updates the `x` and `y` parameters passed into functions like `rect(x, y, w, h)`.
*   **Mode Dropdown (`rectMode`/`ellipseMode`)**: Toggling between `CORNER` and `CENTER` visibly shifts the shape around the red anchor dot. This visually proves that the rendering mode changes how the computer interprets the `x, y` origin point.
*   **Shape Select (`rect`, `ellipse`, `triangle`, `line`)**: Switches the active 2D primitive being drawn.
*   **Width / Height Sliders (`w, h`)**: Adjust the dimension arguments passed to the shape functions.
*   **Stroke / Fill Controls**: The Stroke slider visualizes `strokeWeight(val)`, while the Fill checkbox demonstrates toggling `fill()` vs `noFill()`.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/shape-builder/main.html"
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
* Understanding of the p5.js Cartesian coordinate system (top-left origin).
* Basic familiarity with passing arguments into functions.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to pay close attention to what happens to the shape relative to the red dot when they change the **Mode** dropdown.
2. **Guided Practice (10 min)**: 
   * *Concept: Origin Modes*: Ask students to select **Rectangle**, set Pos X and Pos Y to 200, and change the Mode to `CORNER`. Ask: *"Where is the red dot located on the rectangle?"* (Top-left corner). Now ask them to switch to `CENTER`. *"Did the red dot move, or did the rectangle move?"* (The rectangle moved to center itself on the dot).
   * *Concept: Defaults*: Switch the shape to **Ellipse**. Have them toggle the mode. Discuss why ellipses are naturally easier to draw in `CENTER` mode while rectangles default to `CORNER` mode.
   * *Concept: Styling*: Uncheck the **Fill Shape** box and increase the **Stroke** slider. Discuss the difference between a shape's internal area (fill) and its outline (stroke).
3. **Assessment (5 min)**: Present a scenario: *"If I write the code `rectMode(CENTER); rect(100, 100, 50, 50);`, what will be the exact X coordinate of the left edge of the rectangle?"* (Answer: 75. Because 100 - (50/2) = 75).

### Assessment
* **Formative**: Observation of students correctly predicting how shapes will shift when rendering modes are toggled.
* **Summative**: Students can write code to draw a "target" or "bullseye" (concentric circles) by correctly utilizing `ellipseMode(CENTER)` and stacking multiple shapes.

## References

1. [p5.js Reference: rect()](https://p5js.org/reference/p5/rect/)
2. [p5.js Reference: rectMode()](https://p5js.org/reference/p5/rectMode/)
3. [p5.js Reference: ellipse()](https://p5js.org/reference/p5/ellipse/)
