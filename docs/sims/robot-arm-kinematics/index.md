---
title: "Robot Arm Kinematics"
description: "Interactive p5.js MicroSim for robot arm kinematics."
image: /sims/robot-arm-kinematics/robot-arm-kinematics.png
og:image: /sims/robot-arm-kinematics/robot-arm-kinematics.png
twitter:image: /sims/robot-arm-kinematics/robot-arm-kinematics.png
social:
   cards: false
quality_score: 90
---

# Robot Arm Kinematics

<div align="center"><i>Manipulate the controls to move the robot arm and observe local vs global coordinates.</i></div>

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Robot Arm Kinematics MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Robot Arm Kinematics** MicroSim demonstrates how 2D matrix transformations—specifically `translate()`, `rotate()`, and `scale()`—work in combination with the transformation matrix stack (`push()` and `pop()`). By observing a multi-segment robotic arm, students can visualize how transformations applied to a parent object cascade down to its children, and how local coordinate systems behave relative to the global canvas coordinate system.

## How to Use

Each control in this simulation helps break down complex transformation concepts into observable actions:

*   **Base X/Y Translation Sliders**: Moves the root of the robot arm around the canvas. This demonstrates global translation, shifting the entire coordinate space for all subsequent drawing operations.
*   **Joint 1 and Joint 2 Rotation Sliders**: Adjusts the angle of individual segments of the arm. Notice how rotating Joint 1 also moves Joint 2 and the end effector in an arc, demonstrating hierarchical, compounded rotations. Rotating Joint 2 only affects itself and anything attached to it.
*   **Scale Slider**: Uniformly scales the entire robot arm, demonstrating how scaling multiplies the coordinate grid itself.
*   **Show Local Axes Checkbox**: Toggles visual indicators for the X and Y axes at each joint. This is critical for seeing how `rotate()` actually turns the entire coordinate space, not just the shape being drawn.
*   **Push/Pop Toggle**: When disabled, transformations leak into the global state, affecting everything drawn afterward. When enabled, it demonstrates how `push()` saves the current transformation state and `pop()` restores it, isolating the robot arm's transformations from the rest of the canvas.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/robot-arm-kinematics/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Mathematics)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of a standard Cartesian coordinate plane.
* Familiarity with the concepts of origin (0, 0) and basic angles in degrees or radians.
* Conceptual understanding of code sequence and state.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to toggle the "Show Local Axes" on and observe how the red and green lines move as they adjust the rotation sliders.
2. **Guided Practice (10 min)**: 
   * *Concept: Hierarchical Transformation*: Ask students to move only Joint 1, then only Joint 2. Discuss why moving Joint 1 also moves Joint 2, but not the other way around. This introduces the concept of parent-child relationships in coordinate spaces.
   * *Concept: Local Coordinate Systems*: Have students observe the local axes. Ask: *"When you rotate a joint, does the shape rotate inside the grid, or does the whole grid rotate?"* (Answer: The whole grid rotates).
   * *Concept: Matrix Stack*: Direct students to turn off the "Push/Pop" toggle. Observe what happens to any static elements (like background grids or text, if present) when transformations aren't contained. Toggle it back on to show how `push()` and `pop()` act as "save" and "restore" points for the coordinate space.
3. **Assessment (5 min)**: Conduct a quick "Predict Output" quiz. Ask students: *"If I translate by (50, 0) and then rotate by 90 degrees, where is the local X axis pointing?"*

### Assessment
* **Formative**: Observation of students successfully manipulating the arm to reach specific targets or configurations.
* **Summative**: Ability to accurately articulate the purpose of `push()` and `pop()` and explain why transformations order matters (e.g., translating then rotating vs. rotating then translating).

## References

1. [p5.js Reference: 2D Transformations](https://p5js.org/learn/2d-transformations.html)
2. [p5.js Reference: push()](https://p5js.org/reference/p5/push/)
3. [p5.js Reference: pop()](https://p5js.org/reference/p5/pop/)
4. [p5.js Reference: translate()](https://p5js.org/reference/p5/translate/)
