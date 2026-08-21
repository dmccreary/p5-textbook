---
title: "Data Flow Debugger"
description: "Interactive p5.js MicroSim for data flow debugger."
image: /sims/data-flow-debugger/data-flow-debugger.png
og:image: /sims/data-flow-debugger/data-flow-debugger.png
twitter:image: /sims/data-flow-debugger/data-flow-debugger.png
social:
   cards: false
quality_score: 90
---

# Data Flow Debugger
<div align="center"><i>Visualize array operations like map, filter, and reduce</i></div>

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Data Flow Debugger MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The Data Flow Debugger is an interactive visual pipeline tool that demonstrates the mechanics of modern ES6+ JavaScript array methods. As objects are passed through a series of higher-order functions—specifically `map()`, `filter()`, and `reduce()`—their transformations are represented visually. Students can change filter conditions and map transformations to see immediate effects on the data objects, reinforcing how functional programming paradigms manipulate data step by step.

## How to Use

- **Data Array Length**: Adjust the slider to generate a specific number of raw data objects, depicted as shapes on the left side of the canvas.
- **Map Transformation**: Select an operation from the dropdown to modify the original objects (e.g., modifying their color, size, or shape). This represents the `map()` phase.
- **Filter Condition**: Choose a condition from the dropdown to exclude certain objects from the next phase (e.g., keeping only circles or only objects with an area greater than a threshold). This represents the `filter()` phase.
- **Variable Scope Inspector**: Toggle this overlay to see the internal state of the array and the individual variables in scope at each stage of the pipeline.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/data-flow-debugger/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science), College-Level Introductory Computer Science

### Duration
20-25 minutes

### Prerequisites
- Basic understanding of variables and arrays in JavaScript.
- Familiarity with basic JavaScript syntax.
- Conceptual knowledge of loops.

### Activities

1. **Exploration** (5 min): Allow students to interact freely with the sliders and dropdowns. Ask them to notice how the objects change color or shape through the pipeline and which phase eliminates shapes.
2. **Guided Practice** (10 min): Instruct students to set a specific scenario, such as a length of 10 items, map them to double their size, and filter out items of a specific shape. Discuss how the output of the `map()` operation becomes the input for the `filter()` operation.
3. **Assessment** (10 min): Have students turn on the Variable Scope Inspector. Give them a prompt to create a specific output (e.g., exactly three red circles) and have them work backward to configure the inputs and transformations to achieve the goal.

### Assessment
- Formative Assessment: Monitor students' ability to configure the simulation to produce a specific final array of shapes.
- Understanding Check: Ask students to explain, in their own words, the difference between `map()` (which transforms every item) and `filter()` (which keeps or discards items based on a condition).

## References

1. [MDN Web Docs: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
2. [MDN Web Docs: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
3. [MDN Web Docs: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
