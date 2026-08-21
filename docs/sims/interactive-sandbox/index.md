---
title: "Interactive Sandbox"
description: "Interactive p5.js MicroSim for interactive sandbox."
image: /sims/interactive-sandbox/interactive-sandbox.png
og:image: /sims/interactive-sandbox/interactive-sandbox.png
twitter:image: /sims/interactive-sandbox/interactive-sandbox.png
social:
   cards: false
quality_score: 90
---

# Interactive Sandbox

<div align="center"><i>Visualize how p5.js responds to mouse, keyboard, and touch events in real-time.</i></div>

<iframe src="main.html" height="554px" width="100%" scrolling="no"></iframe>

[Run the Interactive Sandbox MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Interactive Sandbox** MicroSim provides a unified playground to understand user input and asynchronous events in p5.js. By presenting an interactive canvas that responds to various user actions alongside a real-time event logger, it helps students visualize exactly which p5.js input variables (`mouseX`, `keyIsPressed`, `keyCode`, etc.) are triggered during specific interactions like clicking, dragging, typing, or touching.

## How to Use

Each interaction with the sandbox demonstrates how p5.js listens and reacts to user input:

*   **Move & Drag (Mouse Interaction)**: Move your cursor across the canvas to see `mouseX` and `mouseY` update. Click and drag to see how `mouseIsPressed` toggles, and observe the path drawn by your actions.
*   **Type & Press (Keyboard Events)**: Press any key on your keyboard while the simulation is focused to see the `key` and `keyCode` variables update in the logger. Notice how `keyIsPressed` changes state while a key is held down.
*   **Touch Simulator Toggle**: Activate the touch simulator to see how touch events (`touches[]`) are handled differently than traditional mouse events, allowing for multi-touch inputs.
*   **Event Logger & Clear Button**: The on-screen overlay tracks a running history of recent events. Use the "Clear Events" button to reset the logger and start tracking fresh inputs.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/interactive-sandbox/main.html"
        height="554px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of variables and data types.
* Familiarity with the `setup()` and `draw()` functions in p5.js.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to click, drag, type, and observe the event logger. Have them identify which actions trigger which specific variables to change.
2. **Guided Practice (10 min)**: 
   * *Concept: Mouse Coordinates & States*: Ask students to move the mouse without clicking, then click and drag. Discuss the difference between `mouseX`/`mouseY` and `pmouseX`/`pmouseY` (previous mouse positions), and how `mouseIsPressed` acts as a boolean condition.
   * *Concept: Keyboard Input*: Instruct students to press letter keys versus special keys (like Shift or Enter). Have them observe the difference between the `key` string and the numeric `keyCode`. Discuss why `keyCode` is useful for standardizing input.
   * *Concept: Touch vs Mouse*: Turn on the Touch Simulator (if applicable/simulated) or discuss mobile contexts. Show how the `touches` array can track multiple simultaneous points, unlike the single `mouseX`/`mouseY` coordinate pair.
3. **Assessment (5 min)**: Present a scenario: "I want to draw a circle only when the user is holding down the spacebar." Ask students which variables they would need to check (`keyIsPressed` and `key` or `keyCode`) to write that conditional statement.

### Assessment
* **Formative**: Observation of students successfully identifying which system variables correspond to their physical actions on the mouse and keyboard.
* **Summative**: Ability to write a simple conditional statement using input variables (e.g., `if (mouseIsPressed) { ... }`) to control what is drawn on the canvas.

## References

1. [p5.js Reference: Events](https://p5js.org/reference/#group-Events)
2. [p5.js Reference: mouseX & mouseY](https://p5js.org/reference/p5/mouseX/)
3. [p5.js Reference: keyCode](https://p5js.org/reference/p5/keyCode/)
