---
title: Kinetic Typography Engine
description: Interactive p5.js MicroSim for kinetic typography engine.
image: /sims/kinetic-typography-engine/kinetic-typography-engine.png
og:image: /sims/kinetic-typography-engine/kinetic-typography-engine.png
twitter:image: /sims/kinetic-typography-engine/kinetic-typography-engine.png
social:
   cards: false
quality_score: 95
---

# Kinetic Typography Engine
<div align="center"><i>Extract font paths and apply generative physics to text rendering</i></div>

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Kinetic Typography Engine MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Kinetic Typography Engine** MicroSim explores how modern generative typography works by converting standard font glyphs into manipulatable point clouds. By extracting paths using `textToPoints()`, this simulation allows students to intuitively see the distinction between a pre-rendered shape and raw vector data. It bridges the gap between static typography and physics-based rendering.

## How to Use

Each interactive control demonstrates a specific generative typography concept:

*   **Text Input**: Change the word on the screen. As you type, the engine dynamically recalculates the vector path of the characters based on your input.
*   **Font Selection**: Switch between different font weights and styles to observe how typographical complexity alters the distribution of generated vector points.
*   **Point Density Slider**: Adjusting this slider changes the `sampleFactor` parameter of `textToPoints()`. A higher density samples the path more frequently, resulting in more particles, while a lower density strips the shape down to its fundamental outline points.
*   **Wobble Intensity Slider**: Introduces randomness to the base position of each particle. This visualizes how noise or offset values can distort strict vectors into organic or energetic forms.
*   **Explode Particles Button**: Triggers a sudden, explosive physical force that scatters the typography. The particles retain memory of their origin points, and will spring back into formation once the physical force ceases.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/kinetic-typography-engine/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding / Design)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of X and Y coordinates.
* Familiarity with the concepts of vector vs. raster graphics.
* Conceptual understanding of loops and arrays (useful for understanding particle generation).

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to manipulate the Point Density slider and observe how the resolution of the text outline changes.
2. **Guided Practice (10 min)**: 
   * *Concept: Text as Paths*: Have students select "Roboto Black" and set the point density to a very low value. Discuss how computers draw fonts not as pixels, but as mathematical curves connected by points.
   * *Concept: Data Structures*: Explain that the word they type is being translated into an array of thousands of tiny objects (particles). Have them adjust the text and observe the immediate visual update of the entire array.
   * *Concept: Generative Physics*: Instruct students to slowly increase the Wobble Intensity. Discuss how "wobble" is achieved by constantly adding a random offset to the target `(x, y)` coordinate of each particle in the rendering loop. Click "Explode Particles" to demonstrate an applied vector velocity.
3. **Assessment (5 min)**: Group discussion. Ask: *"If we wanted to make the text melt downwards instead of explode outwards, what would we change in the particle's code?"* (Answer: Apply a constant downward force or increase the Y-velocity, like gravity).

### Assessment
* **Formative**: Observation of students successfully manipulating density and wobble to achieve distinct visual states of the typography.
* **Summative**: Ability to accurately describe the difference between a static font glyph and an array of vector points extracted via `textToPoints()`.

## References

1. [p5.js Reference: textToPoints()](https://p5js.org/reference/p5.Font/textToPoints/)
2. [p5.js Reference: loadFont()](https://p5js.org/reference/p5/loadFont/)
3. [Coding Train: Steering Behaviors](https://thecodingtrain.com/challenges/59-steering-behaviors)
