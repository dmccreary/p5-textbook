---
title: Algorithm Visualizer
description: Interactive p5.js MicroSim demonstrating control flow, loops, and conditional branching.
image: /sims/algorithm-visualizer/algorithm-visualizer.png
og:image: /sims/algorithm-visualizer/algorithm-visualizer.png
twitter:image: /sims/algorithm-visualizer/algorithm-visualizer.png
social:
   cards: false
quality_score: 95
---

# Algorithm Visualizer

<div align="center"><i>Step through the loop one iteration at a time to see how code shapes the canvas.</i></div>

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Algorithm Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Algorithm Visualizer** MicroSim demonstrates how code control flow concepts—like `for` loops, `while` loops, and `if/else` statements—translate into visual outputs on the canvas. Instead of writing code and instantly seeing the result, this sandbox lets you execute code *one iteration at a time*. This bridges the gap between understanding logic theoretically and observing exactly how algorithms construct complex visual patterns.

## How to Use

Each interactive element in this simulation allows you to break down the mechanics of iteration and branching logic:

*   **Step Forward / Step Backward**: Click these buttons to move through the loop step-by-step. The highlighted code line changes, and you can see exactly which shape is drawn at the current iteration.
*   **Loop Type Selector**: Toggle between a `For Loop` and a `While Loop` to see the syntactical differences between them, while observing that they can achieve the exact same logic and output.
*   **Array Length Slider (Loop Bound)**: Adjusts the total number of iterations (`maxLen`). Increasing this will increase the total number of shapes drawn if you step through to the end.
*   **Condition Threshold Slider**: Changes the value of `thresh` in the `if/else` statement. If the loop counter `i` is less than `thresh`, a red circle is drawn; otherwise, a blue square is drawn.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/algorithm-visualizer/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of boolean expressions and comparative operators (`<`, `>`).
* Conceptual understanding that code runs sequentially line-by-line.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to manipulate the threshold slider and step forward to see how the shapes change midway through the pattern.
2. **Guided Practice (10 min)**: 
   * *Concept: Iteration*: Ask students to set the Array Length to 20 and press "Step Forward" 10 times. Ask: *"What variable is changing each time we step forward?"* (Answer: `i` or the index).
   * *Concept: Branching Logic*: Instruct students to set the Condition Threshold to 15. Have them predict what will happen on step 14, 15, and 16. Step through to confirm their predictions, emphasizing how the `if` and `else` blocks execute conditionally.
   * *Concept: Loop Equivalency*: Have students switch between the For Loop and While Loop views. Ask: *"Does the visual output change? What lines of code are different?"* Discuss how standard `for` loops handle initialization, condition, and incrementing all in one line.
3. **Assessment (5 min)**: Conduct a quick "Predict Output" quiz. Ask students: *"If Array Length is 50 and Condition Threshold is 10, how many blue squares will be drawn?"* (Answer: 40).

### Assessment
* **Formative**: Observation of students successfully predicting the shape drawn based on the current step and threshold.
* **Summative**: Ability to accurately articulate the difference between a `for` loop and a `while` loop, and explain how an `if/else` block branches code execution.

## References

1. [p5.js Reference: for loop](https://p5js.org/reference/p5/for/)
2. [p5.js Reference: while loop](https://p5js.org/reference/p5/while/)
3. [p5.js Reference: if/else](https://p5js.org/reference/p5/if/)
