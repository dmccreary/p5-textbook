---
title: "Scope Misconception Visualizer"
description: "Explore variable shadowing, temporal dead zones, and var vs let/const lexical block scoping pitfalls."
quality_score: 90
image: /sims/scope-misconception-visualizer/scope-misconception-visualizer.png
og:image: /sims/scope-misconception-visualizer/scope-misconception-visualizer.png
---

# Scope Misconception Visualizer

<iframe src="main.html" width="100%" height="487px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/scope-misconception-visualizer/main.html" width="100%" height="487px"></iframe>
```

## Description

Explore variable shadowing, temporal dead zones, and var vs let/const lexical block scoping pitfalls.

## Learning Objectives

- **Primary Goal:** Students will recognize variable shadowing bugs, block scope containment, and avoid unintended global variable leaks.
- **Bloom's Taxonomy Level:** Analyze

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
