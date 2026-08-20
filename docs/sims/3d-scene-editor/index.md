---
title: 3D Scene Editor
description: Interactive p5.js MicroSim for 3d scene editor.
image: /sims/3d-scene-editor/3d-scene-editor.png
og:image: /sims/3d-scene-editor/3d-scene-editor.png
twitter:image: /sims/3d-scene-editor/3d-scene-editor.png
social:
   cards: false
quality_score: 95
---

# 3D Scene Editor

<div align="center"><i>Interactive exploration of 3D WebGL scenes, lighting, and materials</i></div>

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the 3D Scene Editor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **3D Scene Editor** MicroSim introduces students to the WEBGL rendering context in p5.js. It provides a sandbox to explore 3D primitives, camera manipulation using orbit controls, and the interaction between various light sources and material types. This simulation bridges the gap between 2D coordinates and 3D space by demonstrating how lighting and materials give volume and depth to 3D objects.

## How to Use

Each interactive control demonstrates a specific concept in 3D rendering:

*   **Orbit Controls (Mouse Drag/Scroll)**: Click and drag on the canvas to rotate the camera around the origin. Scroll to zoom in and out. This demonstrates the camera view in 3D space.
*   **3D Primitive Dropdown**: Select between different 3D shapes (Box, Sphere, Torus) to see how geometry is rendered and how light interacts with different curved or flat surfaces.
*   **Material Type Dropdown**: Switch between basic, normal, ambient, and specular materials. Observe how `normalMaterial()` maps coordinates to colors, while `specularMaterial()` reflects light to create highlights.
*   **Light Type Selector**: Toggle between Ambient, Directional, Point, and Spot lights to see their distinct characteristics.
*   **Light Position / Z-Depth Sliders**: Adjust the position of the point/spot/directional lights in 3D space using X, Y, and Z-Depth sliders. Observe how the light direction and proximity affect the illumination of the object.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/3d-scene-editor/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding / Geometry)

### Duration
15-20 minutes

### Prerequisites
* Understanding of standard 2D Cartesian coordinates (X and Y axes).
* Basic familiarity with the concept of a Z-axis adding depth.

### Activities

1. **Exploration (5 min)**: Allow students to freely interact with the simulation. Ask them to click and drag the canvas to explore the orbit controls and switch between different primitives and materials.
2. **Guided Practice (10 min)**: 
   * *Concept: 3D Camera*: Ask students to drag the canvas and observe the shape from all angles. Explain that `orbitControl()` allows the camera to move while the object stays at the origin.
   * *Concept: Materials vs. Lighting*: Have students select `normalMaterial()`. Ask: *"Does changing the light source affect how this material looks?"* (Answer: No). Then switch to `specularMaterial()` and turn on a Point Light. Observe the reflection and how moving the light sliders changes the highlight.
   * *Concept: The Z-Axis*: Instruct students to move the Z-Depth slider for the light. Ask them to observe how pulling the light closer or further away affects the brightness and shadow on the object.
3. **Assessment (5 min)**: Ask students to set up a specific scene (e.g., a Torus with Specular material, illuminated by a Spot light from the top right). Have them describe the resulting visual.

### Assessment
* **Formative**: Observation of students successfully manipulating the light positions and navigating the 3D space using orbit controls.
* **Summative**: Ability to accurately articulate the difference between how ambient light and a point light illuminate an object, and describe the purpose of the Z-axis in 3D space.

## References

1. [p5.js WebGL Architecture](https://p5js.org/learn/getting-started-in-webgl-geometry.html)
2. [p5.js Reference: orbitControl()](https://p5js.org/reference/p5/orbitControl/)
3. [p5.js Reference: Materials](https://p5js.org/reference/p5/specularMaterial/)
4. [p5.js Reference: Lights](https://p5js.org/reference/p5/pointLight/)
