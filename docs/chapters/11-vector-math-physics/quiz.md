# Quiz: Vector Math Fundamentals & Physics Acceleration

Test your understanding of p5.Vector, magnitude, normalization, dot product, and Newton's laws of motion with these review questions.

---

#### 1. What two fundamental physical quantities are encapsulated in a Euclidean vector?

<div class="upper-alpha" markdown>
1. Magnitude (length) and Direction
2. Color and Transparency
3. Mass and Temperature
4. Frequency and Wavelength
</div>

??? question "Show Answer"
    The correct answer is **A**. A vector in 2D or 3D space represents an entity having both a magnitude (length or speed) and a directional orientation. Options A, C, and D are scalar or non-geometric properties.

    **Concept Tested:** Vector Definition

---

#### 2. Which p5.js function instantiates a new 2D or 3D vector object?

<div class="upper-alpha" markdown>
1. createVector(x, y, [z])
2. newVector(x, y)
3. makeVector(x, y)
4. vector(x, y)
</div>

??? question "Show Answer"
    The correct answer is **A**. `createVector(x, y, [z])` creates a new instance of the `p5.Vector` class. Options B, C, and D are not standard p5.js factory functions.

    **Concept Tested:** Create Vector Function

---

#### 3. According to Newton's Second Law of Motion ($F = m \cdot a$), how is acceleration calculated from applied force and mass?

<div class="upper-alpha" markdown>
1. acceleration = force * mass
2. acceleration = force / mass
3. acceleration = mass / force
4. acceleration = force + mass
</div>

??? question "Show Answer"
    The correct answer is **B**. Rearranging $F = m \cdot a$ yields $a = F / m$. Acceleration is directly proportional to net force and inversely proportional to mass. Options A, C, and D are algebraic errors.

    **Concept Tested:** Newton Second Law Integration

---

#### 4. What is the magnitude of a unit vector obtained by calling `v.normalize()`?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. TWO_PI
4. Equal to the canvas diagonal
</div>

??? question "Show Answer"
    The correct answer is **B**. Normalizing a vector scales its components so that its length (magnitude) becomes exactly 1 unit while preserving its original direction. Options A, C, and D are incorrect.

    **Concept Tested:** Vector Normalization Unit

---

#### 5. Given two vectors `pos` and `vel`, how do you update position by adding velocity in place using `p5.Vector` methods?

<div class="upper-alpha" markdown>
1. pos = add(pos, vel);
2. pos.add(vel);
3. pos += vel;
4. pos.append(vel);
</div>

??? question "Show Answer"
    The correct answer is **B**. `p5.Vector.prototype.add()` adds the components of the passed vector to the calling vector in place. Option C (`pos += vel`) fails in JavaScript because `+` does not support vector operator overloading.

    **Concept Tested:** Vector Addition Add

---

#### 6. What does the dot product `v1.dot(v2)` return if two vectors are perpendicular (orthogonal) to each other?

<div class="upper-alpha" markdown>
1. 1
2. -1
3. 0
4. Infinity
</div>

??? question "Show Answer"
    The correct answer is **C**. The dot product is defined as $|v1| \cdot |v2| \cdot \cos(\theta)$. When two vectors are perpendicular, $\theta = 90^\circ$ and $\cos(90^\circ) = 0$, yielding a dot product of 0. Options A, C, and D are incorrect.

    **Concept Tested:** Vector Dot Product Orthogonal

---

#### 7. To limit a particle's maximum speed to `10`, which `p5.Vector` method should be called on its velocity vector?

<div class="upper-alpha" markdown>
1. vel.max(10);
2. vel.constrain(10);
3. vel.limit(10);
4. vel.cap(10);
</div>

??? question "Show Answer"
    The correct answer is **C**. `vel.limit(max)` caps the magnitude of the vector at `max` without altering its direction if it exceeds `max`. Options B, C, and D are not `p5.Vector` methods.

    **Concept Tested:** Vector Limit Speed

---

#### 8. Why must acceleration be reset to zero (`acc.mult(0)`) at the end of each frame's physics update in Euler integration?

<div class="upper-alpha" markdown>
1. To reset the particle back to origin (0, 0)
2. To stop the particle from moving
3. To clear accumulated forces so forces do not persist and multiply indefinitely across subsequent frames
4. To save memory in the garbage collector
</div>

??? question "Show Answer"
    The correct answer is **C**. Forces act instantaneously or continuously per frame. If acceleration is not cleared to zero (`acc.set(0, 0)`), forces from previous frames accumulate indefinitely, causing runaway exponential acceleration. Options B, C, and D are false.

    **Concept Tested:** Accumulate Forces Newton

---

#### 9. How do you calculate a vector pointing from particle `A` to target `B`?

<div class="upper-alpha" markdown>
1. let dir = p5.Vector.dist(targetB, posA);
2. let dir = p5.Vector.add(targetB, posA);
3. let dir = p5.Vector.mult(targetB, posA);
4. let dir = p5.Vector.sub(targetB, posA);
</div>

??? question "Show Answer"
    The correct answer is **D**. Subtracting the starting position vector from the target position vector (`target - current`) yields the vector pointing from `posA` to `targetB`. Option B sums them. Option D returns a scalar distance, not a vector.

    **Concept Tested:** Vector Subtraction Direction

---

#### 10. What is the visual difference between updating motion with velocity alone versus velocity plus acceleration?

<div class="upper-alpha" markdown>
1. Acceleration locks frameRate to 30 FPS
2. Acceleration only works in 3D WebGL
3. Velocity alone moves randomly
4. Velocity alone produces constant speed linear motion, while acceleration produces curved trajectories, gravity arcs, and steering behaviors
</div>

??? question "Show Answer"
    The correct answer is **D**. Position updated only by constant velocity yields fixed-speed straight lines. Acceleration continuously alters velocity's speed and direction, enabling gravity curves, drag deceleration, and realistic physics. Options B, C, and D are false.

    **Concept Tested:** Velocity vs Acceleration Motion

---
