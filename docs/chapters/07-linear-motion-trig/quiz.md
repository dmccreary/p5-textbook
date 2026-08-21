# Quiz: Linear Motion, Trigonometry & Wave Math

Test your understanding of Velocity, acceleration, trigonometry, sine, cosine, and periodic wave motion with these review questions.

---

#### 1. What mathematical relationship defines position update under constant velocity?

<div class="upper-alpha" markdown>
1. pos = pos + velocity;
2. pos = velocity * acceleration;
3. pos = pos / deltaTime;
4. pos = sqrt(velocity);
</div>

??? question "Show Answer"
    The correct answer is **A**. Under constant velocity, new position equals current position plus velocity on each discrete time step. Options B, C, and D do not represent kinematic position integration.

    **Concept Tested:** Linear Motion Logic

---

#### 2. Which trigonometric function calculates the ratio of the opposite side to the hypotenuse in a right triangle?

<div class="upper-alpha" markdown>
1. sin()
2. cos()
3. tan()
4. atan2()
</div>

??? question "Show Answer"
    The correct answer is **A**. Sine is the ratio of opposite side over hypotenuse. Cosine is adjacent over hypotenuse, and tangent is opposite over adjacent.

    **Concept Tested:** Sine Function Math

---

#### 3. What is the output range of the standard mathematical `sin(angle)` and `cos(angle)` functions?

<div class="upper-alpha" markdown>
1. From 0 to 1
2. From -1 to 1
3. From 0 to TWO_PI
4. From -Infinity to +Infinity
</div>

??? question "Show Answer"
    The correct answer is **B**. The sine and cosine wave functions oscillate continuously between a minimum of -1.0 and a maximum of +1.0. Options A, C, and D represent incorrect ranges.

    **Concept Tested:** Trigonometric Range

---

#### 4. To create smooth back-and-forth horizontal oscillation centered at `x = 200` with an amplitude of `50` pixels, which formula is correct?

<div class="upper-alpha" markdown>
1. x = 200 * sin(angle) + 50;
2. x = 200 + sin(angle) * 50;
3. x = sin(200) + angle * 50;
4. x = (200 + angle) * sin(50);
</div>

??? question "Show Answer"
    The correct answer is **B**. Multiplying `sin(angle)` by the amplitude `50` produces an oscillation between -50 and +50. Adding the center offset `200` shifts the oscillation range to [150, 250]. Options B, C, and D yield incorrect movement.

    **Concept Tested:** Oscillation Wave Math

---

#### 5. Which p5.js function computes the angle (in radians) from the origin (0, 0) to any coordinate (x, y)?

<div class="upper-alpha" markdown>
1. atan(y / x)
2. atan2(y, x)
3. acos(x)
4. asin(y)
</div>

??? question "Show Answer"
    The correct answer is **B**. `atan2(y, x)` calculates the angle in radians to `(x, y)` across all four quadrants without division-by-zero errors. `atan()` only handles two quadrants. Options C and D find angles from single ratios.

    **Concept Tested:** Atan2 Function

---

#### 6. How do you convert polar coordinates `(r, theta)` to 2D Cartesian coordinates `(x, y)`?

<div class="upper-alpha" markdown>
1. x = theta * cos(r); y = theta * sin(r);
2. x = r + cos(theta); y = r + sin(theta);
3. x = r * cos(theta); y = r * sin(theta);
4. x = r / cos(theta); y = r / sin(theta);
</div>

??? question "Show Answer"
    The correct answer is **C**. Cartesian `x` is `radius * cos(angle)` and `y` is `radius * sin(angle)`. This formula is fundamental for drawing circles, spirals, and rotational orbits. Options B, C, and D are mathematically incorrect.

    **Concept Tested:** Polar to Cartesian Conversion

---

#### 7. What visual effect is produced when two harmonic sine waves with different frequencies modulate a shape's x and y positions?

<div class="upper-alpha" markdown>
1. A static straight line
2. Random walk brownian motion
3. Lissajous curve figures
4. A square bounding box
</div>

??? question "Show Answer"
    The correct answer is **C**. When x and y positions are driven by perpendicular sinusoidal signals of differing frequencies, the resulting parametric trajectory traces elegant, looping Lissajous figures. Options B, C, and D are incorrect.

    **Concept Tested:** Lissajous Curves

---

#### 8. You want an angle variable to increment by 0.05 on every frame. Where should `angle += 0.05;` be placed?

<div class="upper-alpha" markdown>
1. Inside the preload() function
2. Inside the setup() function
3. Inside the draw() function
4. In the HTML index script header
</div>

??? question "Show Answer"
    The correct answer is **C**. To produce continuous animation across time, the angle must be incremented during each frame execution inside the `draw()` loop. Options A and B execute only once before rendering begins.

    **Concept Tested:** Continuous Animation State

---

#### 9. Why is `atan2(y, x)` preferred over `atan(y / x)` when programming an eye or turret that tracks the mouse position?

<div class="upper-alpha" markdown>
1. atan2() returns angles in degrees instead of radians
2. atan2() runs 10x faster on CPU hardware
3. atan() cannot process floating-point numbers
4. atan2() automatically handles full 360-degree four-quadrant geometry and avoids division by zero when x is 0
</div>

??? question "Show Answer"
    The correct answer is **D**. `atan(y / x)` fails when `x = 0` (division by zero) and cannot distinguish between opposite quadrants (e.g. (+y, +x) vs (-y, -x)). `atan2(y, x)` takes both signs into account to return the correct angle across all four quadrants. Options B, C, and D are false.

    **Concept Tested:** Atan2 Quadrant Analysis

---

#### 10. If a wave's frequency is doubled while maintaining constant speed and amplitude, what happens to the wave on screen?

<div class="upper-alpha" markdown>
1. The waves become twice as tall vertically
2. The wave inverts upside down
3. The wave stops moving completely
4. The peaks appear twice as close together horizontally (wavelength is halved)
</div>

??? question "Show Answer"
    The correct answer is **D**. Frequency represents cycles per unit time or distance. Doubling frequency halves the spatial wavelength, packing twice as many wave crests into the same horizontal space. Amplitude controls height. Options A, C, and D are incorrect.

    **Concept Tested:** Wave Frequency and Wavelength

---
