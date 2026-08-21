---
title: "Render Cycle and Frame Rate Monitor"
description: "Measure real-time frame rates (FPS), frame render time in milliseconds, and the p5.js draw() loop execution lifecycle."
quality_score: 90
image: /sims/frame-rate-monitor/frame-rate-monitor.png
og:image: /sims/frame-rate-monitor/frame-rate-monitor.png
---

# Render Cycle and Frame Rate Monitor

<iframe src="main.html" width="100%" height="487px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/frame-rate-monitor/main.html" width="100%" height="487px"></iframe>
```

## Description

Measure real-time frame rates (FPS), frame render time in milliseconds, and the p5.js draw() loop execution lifecycle.

## Learning Objectives

- **Primary Goal:** Students will understand the 60 FPS animation budget (~16.6ms per frame) and how simulated workload impacts rendering performance.
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
