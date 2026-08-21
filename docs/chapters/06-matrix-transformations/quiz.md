# Quiz: Matrix Transformations & Coordinate Systems

Test your understanding of translate(), rotate(), scale(), push(), pop(), and transformation matrices with these review questions.

---

#### 1. What p5.js function shifts the origin (0, 0) of the coordinate system to a new (x, y) location on the canvas?

<div class="upper-alpha" markdown>
1. translate()
2. move()
3. origin()
4. offset()
</div>

??? question "Show Answer"
    The correct answer is **A**. `translate(x, y)` moves the coordinate grid origin by `x` units horizontally and `y` units vertically. Subsequent drawing commands are evaluated relative to this new origin. Options A, C, and D are not p5.js transformation functions.

    **Concept Tested:** Translate Function

---

#### 2. By default, in what angle units does the `rotate()` function expect its parameter in p5.js?

<div class="upper-alpha" markdown>
1. Radians (0 to TWO_PI)
2. Degrees (0 to 360)
3. Gradians (0 to 400)
4. Percentage (0 to 100)
</div>

??? question "Show Answer"
    The correct answer is **A**. By default, `rotate()` expects angles in radians, where a full circle is `TWO_PI` (~6.283 radians). To use degrees (0-360), you must call `angleMode(DEGREES)`. Options A, C, and D are incorrect default units.

    **Concept Tested:** Rotate Angle Units

---

#### 3. What pair of functions is used to save and restore coordinate transformation states, isolating changes to a specific shape?

<div class="upper-alpha" markdown>
1. saveState() and loadState()
2. push() and pop()
3. beginMatrix() and endMatrix()
4. isolate() and reset()
</div>

??? question "Show Answer"
    The correct answer is **B**. `push()` saves the current drawing style and transformation matrix onto an internal stack, and `pop()` restores the previous state. Options A, B, and D are incorrect function names.

    **Concept Tested:** Push and Pop State Isolation

---

#### 4. Why is rotating a shape around its own center achieved by calling `translate(x, y)` followed by `rotate(angle)` and `rect(-w/2, -h/2, w, h)`?

<div class="upper-alpha" markdown>
1. rect() cannot draw shapes unless coordinates are negative
2. rotate() always rotates the entire coordinate grid around the current origin (0, 0)
3. translate() disables canvas clipping planes
4. rotate() only functions when preceded by a scale transformation
</div>

??? question "Show Answer"
    The correct answer is **B**. Rotation in computer graphics occurs around the active origin (0, 0). Translating the origin to the center of the shape, rotating the grid, and drawing centered at (0, 0) spins the object in place. Options B, C, and D are false.

    **Concept Tested:** Rotation Around Pivot

---

#### 5. What is the visual outcome if you execute `scale(-1, 1);`?

<div class="upper-alpha" markdown>
1. The canvas shrinks to 0 width
2. Subsequent drawings are flipped horizontally across the vertical y-axis
3. The canvas rotates 180 degrees clockwise
4. All color values are inverted to their negatives
</div>

??? question "Show Answer"
    The correct answer is **B**. Passing a negative scaling factor along the x-axis (`-1`) reflects the coordinate system horizontally across the y-axis, creating a mirror image. Option A is incorrect. Option C describes 180-degree rotation (`scale(-1, -1)`). Option D confuses coordinate scale with pixel color inversion.

    **Concept Tested:** Scale Transformation Reflection

---

#### 6. What happens if transformations are called inside `draw()` without using `push()` and `pop()` or `resetMatrix()`?

<div class="upper-alpha" markdown>
1. The canvas automatically centers all shapes on screen
2. The browser throws a MatrixOverflow exception
3. Transformations accumulate cumulatively every frame, causing shapes to drift, spin, or scale infinitely
4. The frame rate locks to 1 FPS
</div>

??? question "Show Answer"
    The correct answer is **C**. Because transformations are applied to the global coordinate matrix, omitting `push()`/`pop()` or canvas resets causes each frame's transformations to compound upon the previous frame's coordinates, resulting in runaway drift. Options B, C, and D are incorrect.

    **Concept Tested:** Cumulative Matrix Transformation

---

#### 7. You want to draw a clock hand rotated by 45 degrees. If you are using default `RADIANS` mode, which rotation command is correct?

<div class="upper-alpha" markdown>
1. rotate(45);
2. rotate(HALF_PI);
3. rotate(QUARTER_PI);
4. rotate(PI);
</div>

??? question "Show Answer"
    The correct answer is **C**. In radians, 180 degrees is `PI`, 90 degrees is `HALF_PI`, and 45 degrees is `QUARTER_PI` (`PI / 4`). Calling `rotate(45)` in radians mode rotates by 45 radians (~2578 degrees). Options C and D represent 90 and 180 degrees.

    **Concept Tested:** Radian Constants

---

#### 8. What data structure is fundamentally manipulated behind the scenes when calling `translate()`, `rotate()`, and `scale()`?

<div class="upper-alpha" markdown>
1. A hash map of shape bounding boxes
2. A doubly linked list of pixel buffers
3. A 3x3 affine transformation matrix
4. A binary search tree of vertex coordinates
</div>

??? question "Show Answer"
    The correct answer is **C**. 2D graphics systems represent coordinate transformations using 3x3 affine transformation matrices. Combining transformations multiplies these matrices together. Options B, C, and D are unrelated data structures.

    **Concept Tested:** Transformation Matrix Representation

---

#### 9. Why does changing the order of transformations from `translate(); rotate();` to `rotate(); translate();` produce radically different visual positions?

<div class="upper-alpha" markdown>
1. p5.js executes rotate() asynchronously on a background thread
2. translate() disables all subsequent rotate() calls
3. rotate() automatically resets the matrix to identity before translating
4. Matrix multiplication is non-commutative (A * B != B * A), so rotating first rotates the translation axes
</div>

??? question "Show Answer"
    The correct answer is **D**. Matrix multiplication is non-commutative. If you translate then rotate, you move the origin and spin in place. If you rotate first, you rotate the coordinate axes, causing subsequent translation to move along the newly angled axes in an orbital arc. Options B, C, and D are false.

    **Concept Tested:** Non-Commutative Transformation Order

---

#### 10. A robotic arm consists of a shoulder joint, an elbow joint, and a hand. How should transformations be structured in code to model this hierarchy?

<div class="upper-alpha" markdown>
1. Reset the matrix after the shoulder and manually offset the hand coordinates
2. Calculate all joint positions independently using global absolute (x, y) coordinates with complex trigonometry
3. Use push() and pop() before every single line of drawing to erase previous joint angles
4. Translate and rotate the shoulder, then nested inside, translate and rotate the elbow relative to the shoulder
</div>

??? question "Show Answer"
    The correct answer is **D**. Hierarchical modeling nests transformations: translating and rotating the parent (shoulder) sets the reference frame for the child (elbow), which in turn sets the frame for the hand. This naturally propagates parent motion down the kinematic chain. Options B, C, and D are clumsy and error-prone.

    **Concept Tested:** Hierarchical Matrix Trees

---
