# Quiz: 2D Primitive Shapes & Custom Geometries

Test your understanding of 2D primitives, shape modes, custom vertices, and Bézier curves with these review questions.

---

#### 1. Which function is used in p5.js to begin recording custom vertex positions for a polygonal shape?

<div class="upper-alpha" markdown>
1. beginShape()
2. createShape()
3. startPath()
4. initPolygon()
</div>

??? question "Show Answer"
    The correct answer is **A**. `beginShape()` begins recording vertices for a complex shape. You then call `vertex(x, y)` multiple times, and complete the shape using `endShape()`. Options B, C, and D are not standard p5.js custom shape drawing commands.

    **Concept Tested:** Begin Shape Function

---

#### 2. By default, what do the first two arguments of `rect(x, y, w, h)` specify?

<div class="upper-alpha" markdown>
1. The top-left corner coordinates of the rectangle
2. The center point coordinates of the rectangle
3. The bottom-right corner coordinates of the rectangle
4. The baseline anchor coordinates of the bounding box
</div>

??? question "Show Answer"
    The correct answer is **A**. Under default `rectMode(CORNER)`, the first two parameters `(x, y)` represent the coordinates of the top-left corner of the rectangle. Option A describes the behavior when `rectMode(CENTER)` is enabled. Options C and D are incorrect.

    **Concept Tested:** Rectangle Primitive

---

#### 3. How does `rectMode(CENTER)` alter the way p5.js interprets the parameters `rect(100, 100, 50, 50)`?

<div class="upper-alpha" markdown>
1. It places the top-left corner at (100, 100) and extends 50 pixels toward the center
2. It places the center of the rectangle at (100, 100) with a width and height of 50
3. It constrains the rectangle to the exact center of the browser viewport
4. It rounds all four corners with a radius of 100 pixels
</div>

??? question "Show Answer"
    The correct answer is **B**. Calling `rectMode(CENTER)` changes the interpretation of `(x, y)` from the upper-left corner to the center point of the rectangle, maintaining `w` and `h` as the full width and height. Options A, C, and D misrepresent the mode's behavior.

    **Concept Tested:** Rect Mode Setting

---

#### 4. What argument must be passed to `endShape()` to automatically connect the final vertex back to the first vertex?

<div class="upper-alpha" markdown>
1. endShape(CONNECT);
2. endShape(CLOSE);
3. endShape(LOOP);
4. endShape(FILL);
</div>

??? question "Show Answer"
    The correct answer is **B**. Passing the constant `CLOSE` to `endShape(CLOSE)` draws an outline segment connecting the final vertex back to the starting vertex, forming a closed polygon. Options A, B, and D are invalid constants for `endShape()`.

    **Concept Tested:** End Shape Close

---

#### 5. You need to draw a regular triangle with vertices at (100, 50), (150, 150), and (50, 150). Which function call is correct?

<div class="upper-alpha" markdown>
1. triangle(50, 150, 100, 50);
2. triangle(100, 50, 150, 150, 50, 150);
3. rect(100, 50, 150, 150);
4. polygon(3, 100, 50, 150, 150, 50, 150);
</div>

??? question "Show Answer"
    The correct answer is **B**. The `triangle(x1, y1, x2, y2, x3, y3)` function expects exactly six numeric arguments representing three pairs of coordinates. Option B provides only 4 arguments. Option C draws a rectangle. Option D is not a built-in p5.js function.

    **Concept Tested:** Triangle Primitive

---

#### 6. How does an ellipse behave differently from a circle in p5.js?

<div class="upper-alpha" markdown>
1. An ellipse requires 3D WebGL rendering mode
2. An ellipse cannot be outlined with stroke(), whereas circle() supports strokes
3. An ellipse accepts independent width and height radii/diameters, whereas circle() takes a single diameter
4. An ellipse can only be drawn with quadratic curve anchors
</div>

??? question "Show Answer"
    The correct answer is **C**. `ellipse(x, y, w, [h])` allows separate width and height parameters to render stretched ovals, whereas `circle(x, y, d)` is a dedicated shortcut taking a single diameter `d`. Options B, C, and D are incorrect.

    **Concept Tested:** Ellipse Primitive

---

#### 7. Which function creates a smooth cubic curve requiring two endpoint coordinates and two control points?

<div class="upper-alpha" markdown>
1. curve()
2. arc()
3. bezier()
4. spline()
</div>

??? question "Show Answer"
    The correct answer is **C**. `bezier(x1, y1, x2, y2, x3, y3, x4, y4)` draws a cubic Bézier curve evaluated between start point `(x1, y1)` and end point `(x4, y4)`, shaped by control points `(x2, y2)` and `(x3, y3)`. Option A uses Catmull-Rom splines. Option C draws an elliptical arc. Option D is not a built-in p5.js function.

    **Concept Tested:** Bezier Curve Primitive

---

#### 8. To draw a 90-degree pie slice from an ellipse starting at angle 0 to PI/2, which function and mode are used?

<div class="upper-alpha" markdown>
1. ellipse(x, y, w, h, 0, HALF_PI);
2. arc(x, y, w, h, 0, PI, CHORD);
3. arc(x, y, w, h, 0, HALF_PI, PIE);
4. curve(x, y, w, h, 0, 90);
</div>

??? question "Show Answer"
    The correct answer is **C**. The `arc(x, y, w, h, start, stop, [mode])` function takes angles in radians (0 to `HALF_PI` for 90 degrees). The `PIE` mode connects the arc endpoints back to the center point to form a closed wedge. Option B spans 180 degrees with a chord line. Options C and D use incorrect functions and units.

    **Concept Tested:** Arc Primitive

---

#### 9. What is the key geometric difference between `bezierVertex()` and `quadraticVertex()` inside `beginShape()`?

<div class="upper-alpha" markdown>
1. bezierVertex uses 3 control points, while quadraticVertex uses 2 control points
2. bezierVertex cannot be filled with solid color
3. quadraticVertex can only be used in 3D WebGL mode
4. bezierVertex uses 2 control points and 1 anchor, while quadraticVertex uses 1 control point and 1 anchor
</div>

??? question "Show Answer"
    The correct answer is **D**. Cubic Bézier curves (`bezierVertex(cx1, cy1, cx2, cy2, x, y)`) use two control points, whereas quadratic Bézier curves (`quadraticVertex(cx, cy, x, y)`) use a single control point. Options A, C, and D are factually inaccurate.

    **Concept Tested:** Custom Vertex Curves

---

#### 10. A developer wants to create an interactive star polygon where the number of points dynamically updates with a slider. Why is `beginShape()` with trigonometric loop placement superior to hardcoded `triangle()` primitives?

<div class="upper-alpha" markdown>
1. Hardcoding triangles consumes significantly more browser RAM per pixel
2. beginShape() executes on the GPU shader pipeline while triangle() runs on CPU
3. triangle() automatically enables stroke anti-aliasing while beginShape() disables it
4. beginShape() with polar coordinate math allows programmatic calculation of N vertices dynamically
</div>

??? question "Show Answer"
    The correct answer is **D**. Using `beginShape()` inside a loop calculating points along inner and outer radii with `cos()` and `sin()` enables dynamic generation of any N-pointed star. Hardcoded `triangle()` calls cannot scale dynamically. Options A, C, and D are technically incorrect.

    **Concept Tested:** Algorithmic Shape Generation

---
