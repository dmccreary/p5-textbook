# Quiz: 3D WebGL Coordinates & Primitive Geometries

Test your understanding of WEBGL mode, 3D coordinate system, Z-axis depth, and 3D geometric primitives with these review questions.

---

#### 1. What argument must be passed as the third parameter to `createCanvas()` to enable hardware-accelerated 3D graphics?

<div class="upper-alpha" markdown>
1. WEBGL
2. 3D
3. OPENGL
4. GPU
</div>

??? question "Show Answer"
    The correct answer is **A**. Passing `WEBGL` as the third parameter to `createCanvas(w, h, WEBGL)` switches p5.js from the default 2D HTML5 canvas renderer to a hardware-accelerated 3D WebGL context. Options B, C, and D are invalid renderer constants.

    **Concept Tested:** WEBGL Renderer Mode

---

#### 2. Where is the origin coordinate (0, 0, 0) located by default on a p5.js 3D WebGL canvas?

<div class="upper-alpha" markdown>
1. At the center of the canvas
2. At the top-left corner of the canvas
3. At the bottom-left corner of the canvas
4. At the camera's eye position
</div>

??? question "Show Answer"
    The correct answer is **A**. Unlike default 2D mode (where (0, 0) is top-left), in WebGL 3D mode the origin (0, 0, 0) is centered in the canvas. Positive X points right, positive Y points down, and positive Z points out of the screen toward the viewer. Options B, C, and D are incorrect.

    **Concept Tested:** 3D Coordinate Origin

---

#### 3. In the p5.js 3D coordinate system, which direction does the positive Z-axis point?

<div class="upper-alpha" markdown>
1. Into the screen away from the viewer
2. Out of the screen toward the viewer
3. Directly upward toward the ceiling
4. Directly downward toward the floor
</div>

??? question "Show Answer"
    The correct answer is **B**. In p5.js WebGL mode (right-handed convention), positive Z points out of the display screen toward the viewer, and negative Z extends into the distance away from the viewer. Options B, C, and D are incorrect.

    **Concept Tested:** Z Axis Depth Direction

---

#### 4. Which 3D primitive function draws a box with specified width, height, and depth?

<div class="upper-alpha" markdown>
1. cube(size)
2. box(width, [height], [depth])
3. rect3D(w, h, d)
4. meshBox(w, h, d)
</div>

??? question "Show Answer"
    The correct answer is **B**. `box(width, [height], [depth])` draws a 3D rectangular cuboid centered at the active origin. Options B, C, and D are not p5.js 3D primitive functions.

    **Concept Tested:** Box 3D Primitive

---

#### 5. Which 3D primitive function draws a spherical mesh defined by a radius and optional level-of-detail vertex resolution?

<div class="upper-alpha" markdown>
1. circle3D(radius)
2. sphere(radius, [detailX], [detailY])
3. ball(radius)
4. globe(radius)
</div>

??? question "Show Answer"
    The correct answer is **B**. `sphere(radius, [detailX], [detailY])` creates a 3D UV sphere mesh. Options B, C, and D are not built-in p5.js functions.

    **Concept Tested:** Sphere 3D Primitive

---

#### 6. What rotation function spins an object around the depth axis pointing toward/away from the viewer in 3D WebGL mode?

<div class="upper-alpha" markdown>
1. rotateY(angle)
2. rotateX(angle)
3. rotateZ(angle)
4. rotateDepth(angle)
</div>

??? question "Show Answer"
    The correct answer is **C**. `rotateZ(angle)` rotates geometry around the Z-axis (equivalent to 2D canvas rotation). `rotateX()` pitches around the horizontal axis, and `rotateY()` yaws around the vertical axis.

    **Concept Tested:** Rotate Z Axis

---

#### 7. What 3D primitive draws a torus (doughnut shape) defined by outer radius and tube radius?

<div class="upper-alpha" markdown>
1. ring3D(radius, tubeRadius)
2. donut(radius, thickness)
3. torus([radius], [tubeRadius], [detailX], [detailY])
4. cylinder(radius, height)
</div>

??? question "Show Answer"
    The correct answer is **C**. `torus(radius, tubeRadius)` generates a 3D torus mesh. Options B, C, and D are incorrect.

    **Concept Tested:** Torus 3D Primitive

---

#### 8. What visual rendering artifact occurs if 3D depth testing (Z-buffering) is disabled or geometry surfaces overlap at identical Z depths?

<div class="upper-alpha" markdown>
1. The frame rate drops to 0
2. The canvas goes completely black
3. Z-fighting (flickering texture stitching where triangles compete for depth priority)
4. Objects become transparent
</div>

??? question "Show Answer"
    The correct answer is **C**. Z-fighting occurs when two coplanar surfaces share nearly identical depth values, causing the GPU rasterizer to alternate between fragments due to floating-point precision limits. Options B, C, and D describe other issues.

    **Concept Tested:** Z Fighting Depth Artifact

---

#### 9. To draw a 3D terrain grid mesh from 2D heightmap data, which `beginShape()` mode is typically used with vertex strips?

<div class="upper-alpha" markdown>
1. beginShape(QUADS)
2. beginShape(POINTS)
3. beginShape(LINES)
4. beginShape(TRIANGLE_STRIP)
</div>

??? question "Show Answer"
    The correct answer is **D**. `beginShape(TRIANGLE_STRIP)` connects alternating vertices into efficient continuous strips of triangles, making it the standard algorithm for rendering 3D heightmap terrains. Options B, C, and D are less efficient or non-continuous.

    **Concept Tested:** Triangle Strip Terrain Mesh

---

#### 10. Why does increasing the `detailX` and `detailY` parameters on complex 3D primitives (like `sphere()` or `torus()`) impact rendering performance?

<div class="upper-alpha" markdown>
1. It switches JavaScript execution to single-threaded mode
2. It forces the GPU to download high-resolution bitmap textures
3. It disables WebGL hardware acceleration
4. It increases the total polygon vertex and triangle count that the GPU vertex shader must process per frame
</div>

??? question "Show Answer"
    The correct answer is **D**. Higher detail parameters subdivide the geometry into vastly more vertices and triangular faces, increasing GPU vertex shader workloads and geometry buffer bandwidth. Options B, C, and D are false.

    **Concept Tested:** 3D Level of Detail Polygon Count

---
