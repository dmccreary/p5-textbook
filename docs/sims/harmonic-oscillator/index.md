---
title: Harmonic Oscillator
description: Interactive p5.js MicroSim for harmonic oscillator.
image: /sims/harmonic-oscillator/harmonic-oscillator.png
og:image: /sims/harmonic-oscillator/harmonic-oscillator.png
twitter:image: /sims/harmonic-oscillator/harmonic-oscillator.png
social:
   cards: false
quality_score: 95
---

# Harmonic Oscillator
<div align="center"><i>Explore amplitude, frequency, and phase by mapping a rotating circle to a sine wave.</i></div>

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Harmonic Oscillator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Harmonic Oscillator** MicroSim provides a real-time visual bridge between polar coordinates (a rotating circle) and Cartesian coordinates (a standard sine/cosine wave). By manipulating the amplitude, frequency, and phase of the oscillator, students can directly observe how these fundamental mathematical properties map to animation, motion, and oscillating patterns in p5.js.

## How to Use

Each control in this simulation demonstrates a distinct trigonometric concept linked to animation:

*   **Amplitude Slider**: Adjust the maximum height of the wave. Notice how the radius of the rotating polar circle expands and contracts to match the peak vertical displacement of the Cartesian wave.
*   **Frequency Slider**: Modify how fast the oscillator cycles. Observe how increasing frequency speeds up the rotation of the point on the circle, compressing the resulting waves on the Cartesian graph.
*   **Phase Offset Slider**: Shift the starting angle of the oscillation. This visually demonstrates the difference between sine and cosine waves and how phase delays offset the animation.
*   **Polar/Cartesian View Toggle**: Switch between the standard Cartesian line graph and the underlying polar circle driving the motion.
*   **Angle Mode Toggle**: Toggle between Radians and Degrees to understand how p5.js handles angle measurements internally.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/harmonic-oscillator/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
10-12 (High School Mathematics / Physics / Creative Coding)

### Duration
20-25 minutes

### Prerequisites
* Basic understanding of a circle (radius, circumference, angles).
* Familiarity with the Cartesian coordinate plane (X and Y axes).
* Conceptual grasp of periodic motion (things that repeat over time).

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to pay attention to the relationship between the rotating point on the left and the wave being drawn on the right.
2. **Guided Practice (10 min)**: 
   * *Concept: Amplitude*: Have students set Frequency to a low value and slowly increase the Amplitude. Ask: *"How does the radius of the circle relate to the height of the wave?"* (They map 1:1).
   * *Concept: Frequency*: Instruct students to double the frequency. Ask: *"What happens to the speed of the point on the circle? What happens to the wave?"* (The point moves twice as fast; the wave periods become twice as dense).
   * *Concept: Phase*: Direct students to shift the Phase Offset by 90 degrees (or $\pi/2$ radians). Ask: *"If the wave started at 0 before, where does it start now?"* Relate this to the difference between `sin()` and `cos()`.
3. **Assessment (5 min)**: Present a scenario: "I want an animation of a ball bobbing up and down very quickly, but only moving a tiny bit." Ask students which slider values they would choose (High frequency, low amplitude).

### Assessment
* **Formative**: Observation of students successfully predicting how changing a slider will affect the wave before they release the mouse.
* **Summative**: Ability to correctly define amplitude and frequency in the context of both a rotating circle and a 2D wave, and apply this knowledge to an animation problem.

## References

1. [p5.js Reference: sin()](https://p5js.org/reference/p5/sin/)
2. [p5.js Reference: cos()](https://p5js.org/reference/p5/cos/)
3. [p5.js Reference: angleMode()](https://p5js.org/reference/p5/angleMode/)
