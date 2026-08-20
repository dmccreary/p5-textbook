---
title: Particle Physics Engine
description: Interactive p5.js MicroSim for particle physics engine.
image: /sims/particle-physics-engine/particle-physics-engine.png
og:image: /sims/particle-physics-engine/particle-physics-engine.png
twitter:image: /sims/particle-physics-engine/particle-physics-engine.png
social:
   cards: false
quality_score: 95
---

# Particle Physics Engine
<div align="center"><i>Observe F=ma and vector addition in an interactive particle sandbox</i></div>

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Particle Physics Engine MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Particle Physics Engine** MicroSim provides an interactive sandbox to explore the core principles of vector math and Newtonian physics (`F=ma`). By emitting a continuous stream of particles and allowing students to manipulate environmental forces (gravity, wind, and drag), this simulation bridges the gap between abstract vector addition equations and their tangible effects on velocity, acceleration, and realistic motion trajectories.

## How to Use

Each control in this simulation demonstrates a distinct physics or programming concept:

*   **Wind Force Vector Joystick**: Click and drag the knob inside the circle to apply a constant vector force (wind). Notice how the force acts independently of mass—meaning lighter particles will be accelerated much faster by the wind than heavier ones!
*   **Gravity Slider**: Adjust the downward (or upward) gravitational pull. In this simulation, gravity is implemented accurately as a force proportional to mass, so you will see that all objects fall at the same rate regardless of their mass.
*   **Mass (New Particles) Slider**: Changes the mass (and consequently the visual size) of newly emitted particles. Use this in conjunction with the Wind Force to observe `a = F / m` in action.
*   **Friction (Drag) Slider**: Introduces a dampening force proportional to the square of a particle's velocity. Increasing drag will slow particles down, simulating air resistance or moving through a viscous fluid.
*   **Reset Emitter**: Clears all current particles from the screen so you can observe a clean slate.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/particle-physics-engine/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Physics / Computer Science)

### Duration
15-20 minutes

### Prerequisites
* Conceptual understanding of velocity and acceleration.
* Basic understanding of vectors (magnitude and direction) and how they can be added together.
* Familiarity with Newton's Second Law (`F = ma`).

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to pay special attention to what happens when they adjust the Mass slider and then apply Wind Force versus Gravity.
2. **Guided Practice (10 min)**: 
   * *Concept: Vector Addition*: Ask students to apply a strong wind force to the right while maintaining normal gravity. Ask: *"How does the trajectory change?"* Discuss how the final velocity vector is the sum of the horizontal and vertical acceleration vectors.
   * *Concept: F=ma and Mass*: Instruct students to set the Mass slider to its lowest setting (1) and apply a gentle wind. Then set the Mass slider to its highest setting (30) and apply the same wind. Ask: *"Why do the smaller particles blow away instantly while the large ones barely move?"* This visually proves that acceleration is inversely proportional to mass for a constant force.
   * *Concept: Gravity vs. Wind*: Ask: *"Why doesn't mass affect how fast the particles fall downwards?"* Explain that the force of gravity is intrinsically tied to mass, so the mass cancels out when calculating acceleration, making all particles fall at the same rate.
3. **Assessment (5 min)**: Conduct a quick "Predict Output" quiz. Ask students: *"If we double the mass of a particle, what happens to the acceleration caused by the Wind force? What happens to the acceleration caused by Gravity?"*

### Assessment
* **Formative**: Observation of students successfully manipulating the forces to create specific trajectories (e.g., getting a heavy particle to touch the right wall).
* **Summative**: Ability to accurately articulate why mass affects wind acceleration differently than gravity acceleration, and how vector forces are accumulated each frame.

## References

1. [p5.js Reference: p5.Vector](https://p5js.org/reference/p5/p5.Vector/)
2. [Nature of Code: Forces](https://natureofcode.com/forces/)
