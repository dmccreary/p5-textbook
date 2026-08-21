# Quiz: Polar Coordinates, Oscillation & Easing

Test your understanding of Polar geometry, spirals, easing algorithms, lerp(), and smooth interpolation with these review questions.

---

#### 1. What does the `lerp(start, stop, amt)` function compute?

<div class="upper-alpha" markdown>
1. Linear interpolation between two values based on a percentage amount (0.0 to 1.0)
2. The trigonometric tangent of an angle
3. The Euclidean distance between two points
4. The maximum of two integers
</div>

??? question "Show Answer"
    The correct answer is **A**. `lerp(a, b, amt)` calculates a number between `a` and `b` at normalized progression `amt` (where 0.0 is `a` and 1.0 is `b`). Options A, C, and D describe other mathematical operations.

    **Concept Tested:** Linear Interpolation Lerp

---

#### 2. Which function calculates the straight-line Euclidean distance between two points `(x1, y1)` and `(x2, y2)` in p5.js?

<div class="upper-alpha" markdown>
1. dist(x1, y1, x2, y2)
2. mag()
3. diff(x1, y1, x2, y2)
4. length()
</div>

??? question "Show Answer"
    The correct answer is **A**. `dist(x1, y1, x2, y2)` uses the Pythagorean theorem `sqrt((x2-x1)^2 + (y2-y1)^2)` to calculate Euclidean distance between two 2D coordinates. Options A, C, and D are incorrect function signatures.

    **Concept Tested:** Distance Formula Dist

---

#### 3. What type of curve is generated when radius `r` increases proportionally as angle `theta` increases in polar coordinates (`r = a * theta`)?

<div class="upper-alpha" markdown>
1. Parabola
2. Archimedean spiral
3. Sine wave
4. Hyperbola
</div>

??? question "Show Answer"
    The correct answer is **B**. An Archimedean spiral is formed when the radius grows linearly as the angle sweeps around the origin. Options B, C, and D are non-spiral geometric forms.

    **Concept Tested:** Archimedean Spiral

---

#### 4. To create smooth 'easing' where a circle lags behind and glides toward `mouseX`, which code snippet is placed in `draw()`?

<div class="upper-alpha" markdown>
1. x = mouseX;
2. x += (mouseX - x) * 0.05;
3. x = lerp(x, 0, 0.05);
4. x += mouseX * 0.05;
</div>

??? question "Show Answer"
    The correct answer is **B**. Adding a fraction of the distance between current position and target (`x += (target - x) * easing`) creates an exponential ease-out curve where motion is fast initially and decelerates smoothly as it nears the target. Options B, C, and D do not create smooth target tracking.

    **Concept Tested:** Easing Interpolation

---

#### 5. Which p5.js function restricts a numeric value to remain between a minimum and maximum boundary?

<div class="upper-alpha" markdown>
1. clamp(val, min, max)
2. constrain(val, min, max)
3. limit(val, min, max)
4. bound(val, min, max)
</div>

??? question "Show Answer"
    The correct answer is **B**. `constrain(val, min, max)` clamps a value so that if it is lower than `min` it returns `min`, and if higher than `max` it returns `max`. Options B, C, and D are not built-in p5.js functions.

    **Concept Tested:** Constrain Value Function

---

#### 6. Why is checking squared distance `(dx*dx + dy*dy < r*r)` preferred in high-performance particle collision loops over calling `dist()`?

<div class="upper-alpha" markdown>
1. dist() only works in 3D WebGL mode
2. Squared distance automatically sorts the particles
3. It avoids the computationally expensive square root calculation (Math.sqrt)
4. dist() allocates extra heap memory on every call
</div>

??? question "Show Answer"
    The correct answer is **C**. Calculating `dist()` requires `sqrt()`, which is relatively expensive when repeated across thousands of particle pairs per frame. Comparing `dx*dx + dy*dy` against `(r1+r2)*(r1+r2)` gives the identical collision boolean result without calculating square roots. Options B, C, and D are incorrect.

    **Concept Tested:** Square Distance Metric

---

#### 7. What value does `norm(value, low, high)` return if `value = 150`, `low = 100`, and `high = 200`?

<div class="upper-alpha" markdown>
1. 50
2. 1.5
3. 0.5
4. 0.25
</div>

??? question "Show Answer"
    The correct answer is **C**. `norm(val, low, high)` maps a value in `[low, high]` to the normalized range `[0.0, 1.0]`. Since 150 is halfway between 100 and 200, `norm` returns 0.5. Options B, C, and D are incorrect calculations.

    **Concept Tested:** Normalize Function Norm

---

#### 8. What does the `map(value, start1, stop1, start2, stop2)` function do?

<div class="upper-alpha" markdown>
1. It downloads a geographic map from Google Maps
2. It iterates through an array like Array.prototype.map
3. It re-maps a number from an incoming source range to a target destination range
4. It renders an image texture onto a 3D plane
</div>

??? question "Show Answer"
    The correct answer is **C**. `map()` linearly scales a value from one domain `[start1, stop1]` to a new range `[start2, stop2]`. For example, `map(mouseX, 0, width, 0, 255)` maps screen position to RGB color range. Options A, C, and D confuse this with other mapping concepts.

    **Concept Tested:** Map Function

---

#### 9. In a polar coordinate system, what happens to the rendered point if the radius `r` is set to a constant value while angle `theta` sweeps from `0` to `TWO_PI`?

<div class="upper-alpha" markdown>
1. It draws a square boundary
2. It draws an outward straight line
3. It draws a parabola
4. It draws a perfect circle around the origin
</div>

??? question "Show Answer"
    The correct answer is **D**. Keeping radius constant while angle sweeps from 0 to 2*PI traces a circle of radius `r` centered at the origin. Options B, C, and D are incorrect.

    **Concept Tested:** Polar Circle Geometry

---

#### 10. A developer applies `x = lerp(x, targetX, 0.1);` on each frame. If `targetX = 100` and `x` starts at `0`, what is the value of `x` after the first frame?

<div class="upper-alpha" markdown>
1. 100
2. 1
3. 90
4. 10
</div>

??? question "Show Answer"
    The correct answer is **D**. `lerp(0, 100, 0.1)` computes `0 + (100 - 0) * 0.1 = 10`. On the second frame `x` would become `10 + (100 - 10) * 0.1 = 19`. Options B, C, and D are incorrect.

    **Concept Tested:** Lerp Calculation Step

---
