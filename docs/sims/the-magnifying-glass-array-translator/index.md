---
title: "The Magnifying Glass Array Translator"
description: "Translate 2D pixel coordinates (x, y) into 1D flat memory indices index = 4*(y*width + x) for pixels[] manipulation."
quality_score: 90
image: /sims/the-magnifying-glass-array-translator/the-magnifying-glass-array-translator.png
og:image: /sims/the-magnifying-glass-array-translator/the-magnifying-glass-array-translator.png
---

# The Magnifying Glass Array Translator

<iframe src="main.html" width="100%" height="487px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/the-magnifying-glass-array-translator/main.html" width="100%" height="487px"></iframe>
```

## Description

Translate 2D pixel coordinates (x, y) into 1D flat memory indices index = 4*(y*width + x) for pixels[] manipulation.

## Learning Objectives

- **Primary Goal:** Students will master the 2D to 1D array indexing formula index = (y * width + x) * 4 for RGBA pixel buffers.
- **Bloom's Taxonomy Level:** Apply

## How to Use

Interact with the visual elements and adjust the control sliders and buttons located beneath the simulation canvas to explore how parameter changes affect the output in real time.

## Lesson Plan

### Prerequisites
- Understanding of basic coordinate systems and p5.js sketch execution.
- Familiarity with variables and interactive event handling.

### Interactive Exploration
1. Observe the default initial state of the simulation.
2. Adjust the sliders systematically to observe the range of behaviors.
3. Compare the visual feedback against the theoretical concepts presented in the chapter.

### Assessment Questions
- How does changing each individual parameter influence the resulting visual output?
- What underlying algorithm or mathematical model governs the state transitions shown in the simulation?

## References

1. [p5.js Reference Documentation](https://p5js.org/reference/) - Official p5.js documentation and API guides.
2. [Processing Foundation](https://processingfoundation.org/) - Educational resources for creative coding.
