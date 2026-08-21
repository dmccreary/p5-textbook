---
title: "Color Mixer"
description: "Interactive p5.js MicroSim for color mixer."
image: /sims/color-mixer/color-mixer.png
og:image: /sims/color-mixer/color-mixer.png
twitter:image: /sims/color-mixer/color-mixer.png
social:
   cards: false
quality_score: 95
---

# Color Mixer

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Color Mixer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Color Mixer** MicroSim demonstrates how digital color is constructed and mathematically manipulated in p5.js. It features a dual-pane environment: the left side functions as a visual color mixer using standard color spaces (RGB vs. HSB) and Blend Modes, while the right side acts as a magnifying inspector for the canvas `pixels[]` array, revealing the exact 4-channel (R,G,B,A) pixel data underlying the screen.

## How to Use

*   **Space Toggle (RGB/HSB)**: Switches the primary color mode logic. Notice how mixing Red/Green/Blue operates additively, while Hue/Saturation/Brightness behaves more like a digital artist's color wheel.
*   **Color Sliders**: Drag the sliders to configure the exact channel values for the foreground circle. Pay attention to the "Alpha" slider against the checkerboard background—it controls opacity (transparency).
*   **Blend Mode Dropdown**: Simulates the `blendMode()` function. Observe how `ADD` or `MULTIPLY` drastically alters the way the foreground circle combines with the static background circle.
*   **Pixel Magnifier (Right Canvas)**: Click anywhere on the right side of the canvas. The tool uses the `get()` function to read a small region around your click and scales it up in the top right. It explicitly prints out the raw Red, Green, Blue, and Alpha integer values of the exact pixel your mouse is currently locked onto.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/color-mixer/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Digital Art)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding that computer screens emit light rather than reflecting physical paint (Additive color theory).
* Familiarity with arrays or basic data structures is helpful but not strictly required.

### Activities

1. **Exploration (5 min)**: Have students adjust the sliders in RGB mode to try and create pure Yellow, pure Cyan, and pure Magenta. Then, have them switch to HSB mode and attempt to create the same colors.
2. **Guided Practice (10 min)**: 
   * *Concept: Alpha*: Ask students to slide the Alpha slider to exactly 50% (approx 128). Discuss why they can see the checkerboard and the background circle shining through. Explain the concept of the 4th color channel.
   * *Concept: Blend Modes*: Set the Blend Mode to `MULTIPLY`. Ask students to observe what happens to the overlapping section of the two circles. Switch it to `ADD` and discuss how `ADD` can result in pure white (`255, 255, 255`).
   * *Concept: Pixel Array*: Instruct students to click around the right-side gradient until they find a pixel that has exactly `R: 0` and `G: 0` but a high `B` value. Explain that the screen is just a massive 1D array of `[r,g,b,a, r,g,b,a, ...]` data.
3. **Assessment (5 min)**: Give students a target RGB value (e.g., `R:100, G:100, B:100`). Have them use the mixer to find it, and ask them what the resulting color looks like (Answer: A neutral gray).

### Assessment
* **Formative**: Observe if students can correctly navigate the `pixels[]` array magnifier to find specified pure color values.
* **Summative**: Students are able to write a short paragraph comparing the intuitive nature of HSB to the mechanical nature of RGB when attempting to make a color "darker".

## References

1. [p5.js Reference: colorMode()](https://p5js.org/reference/p5/colorMode/)
2. [p5.js Reference: blendMode()](https://p5js.org/reference/p5/blendMode/)
3. [p5.js Reference: pixels](https://p5js.org/reference/p5/pixels/)
