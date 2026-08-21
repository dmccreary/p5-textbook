# Quiz: Particle Systems, Forces & Steering Behaviors

Test your understanding of Particle classes, emitters, lifespan, environmental drag, gravity, and Reynolds steering with these review questions.

---

#### 1. What are the three essential lifecycle phases of an individual particle in a particle system?

<div class="upper-alpha" markdown>
1. Creation (emission), Update (motion & aging), and Deletion (death/culling)
2. Compilation, Linking, and Execution
3. Translation, Rotation, and Scaling
4. Preload, Setup, and Draw
</div>

??? question "Show Answer"
    The correct answer is **A**. Particles are spawned by an emitter, updated on each frame (position, velocity, age, alpha fade), and removed from the array when their lifespan reaches zero. Options B, C, and D describe other computational concepts.

    **Concept Tested:** Particle Lifecycle Phases

---

#### 2. How is particle fading typically rendered visually as a particle approaches the end of its lifespan?

<div class="upper-alpha" markdown>
1. By decreasing the alpha channel value of fill() or stroke() proportionally to remaining lifespan
2. By scaling the canvas width to zero
3. By inverting the RGB color channels
4. By calling noLoop() on death
</div>

??? question "Show Answer"
    The correct answer is **A**. Mapping the particle's remaining lifespan counter to the alpha channel (e.g. 0 to 255) makes the particle dissolve smoothly into the background as it expires. Options B, C, and D are incorrect.

    **Concept Tested:** Particle Alpha Lifespan Fade

---

#### 3. Which environmental force acts opposite to the direction of motion and is proportional to the square of speed?

<div class="upper-alpha" markdown>
1. Gravitational Attraction
2. Fluid Drag / Friction
3. Centrifugal Force
4. Electrostatic Repulsion
</div>

??? question "Show Answer"
    The correct answer is **B**. Fluid resistance (drag) acts in the exact opposite direction of velocity ($-\hat{v}$) with a magnitude proportional to the square of speed ($c \cdot v^2$). Options B, C, and D act in different directions and formulas.

    **Concept Tested:** Drag Force Formula

---

#### 4. What formula expresses Craig Reynolds' classic steering force calculation?

<div class="upper-alpha" markdown>
1. steering = acceleration * mass
2. steering = desired_velocity - current_velocity
3. steering = velocity + gravity
4. steering = target_position / speed
</div>

??? question "Show Answer"
    The correct answer is **B**. Reynolds defined steering force as the difference between the desired velocity (pointing directly toward the target at maximum speed) and the vehicle's current velocity. Options B, C, and D do not represent steering force.

    **Concept Tested:** Reynolds Steering Force

---

#### 5. To model a fireworks explosion emitter, how should initial particle velocities be initialized?

<div class="upper-alpha" markdown>
1. With all velocities set to (0, 0)
2. With random vectors pointing in all directions using p5.Vector.random2D() multiplied by a burst speed
3. With strictly vertical upward vectors (0, -10)
4. With velocities equal to mouseX and mouseY
</div>

??? question "Show Answer"
    The correct answer is **B**. Calling `p5.Vector.random2D().mult(random(2, 8))` generates velocity vectors radiating outwards in all directions with randomized speeds, simulating a radial explosive burst. Options B, C, and D do not create spherical/radial dispersion.

    **Concept Tested:** Emitter Velocity Burst

---

#### 6. When multiple forces (gravity, wind, drag) act on a particle simultaneously, how does the physics engine combine them?

<div class="upper-alpha" markdown>
1. By averaging the angles of each force
2. By only applying the strongest force and discarding the rest
3. By adding all force vectors together to calculate the net accumulated force vector
4. By executing forces sequentially across multiple separate frames
</div>

??? question "Show Answer"
    The correct answer is **C**. According to the principle of superposition in Newtonian mechanics, the net force on a body is the vector sum of all individual forces acting upon it. Options B, C, and D violate Newtonian physics.

    **Concept Tested:** Accumulate Forces Vector Sum

---

#### 7. What is the purpose of the Reynolds 'Seek' steering behavior?

<div class="upper-alpha" markdown>
1. To orbit in an infinite spiral
2. To bounce randomly off canvas walls
3. To steer an autonomous character toward a target position and arrive smoothly
4. To avoid all other particles completely
</div>

??? question "Show Answer"
    The correct answer is **C**. The Seek behavior calculates a desired velocity pointing from the vehicle to a target, creating smooth turning trajectories toward moving or stationary goals. Options B, C, and D describe other behaviors.

    **Concept Tested:** Seek Steering Behavior

---

#### 8. How does Craig Reynolds' 'Arrive' behavior improve upon basic 'Seek' when reaching a target?

<div class="upper-alpha" markdown>
1. It increases speed to maximum upon arrival
2. It teleports the character to the target instantly
3. It decelerates the character smoothly within a slowing radius to stop precisely on target without overshooting
4. It reverses the character's direction 180 degrees
</div>

??? question "Show Answer"
    The correct answer is **C**. While 'Seek' always charges at maximum speed (causing overshooting and endless orbiting), 'Arrive' scales down desired speed when inside an arrival threshold radius, bringing the agent to a graceful halt. Options B, C, and D are false.

    **Concept Tested:** Arrive Steering Behavior

---

#### 9. Why is an object-oriented class architecture (e.g. `class Particle` and `class ParticleSystem`) ideal for managing particle simulations?

<div class="upper-alpha" markdown>
1. It reduces the code to a single global variable
2. It forces all particles to execute on the GPU
3. It eliminates all array loops in JavaScript
4. It encapsulates state (pos, vel, life) and behaviors (update, display, isDead) in modular, reusable instances
</div>

??? question "Show Answer"
    The correct answer is **D**. Object-Oriented Programming cleanly packages particle data and methods, allowing a manager class (`ParticleSystem`) to instantiate, iterate, and cull hundreds of independent entities cleanly. Options B, C, and D are false.

    **Concept Tested:** OOP Particle Architecture

---

#### 10. In the flocking simulation algorithm (Boids), what are the three foundational steering rules?

<div class="upper-alpha" markdown>
1. Translation, Rotation, and Scaling
2. Speed, Acceleration, and Gravity
3. Emission, Collision, and Dissolution
4. Separation, Alignment, and Cohesion
</div>

??? question "Show Answer"
    The correct answer is **D**. Craig Reynolds' 1987 Boids flocking model produces emergent swarm behavior using three simple rules: Separation (avoid crowding neighbors), Alignment (steer towards average heading), and Cohesion (steer towards center of mass). Options B, C, and D are unrelated triplets.

    **Concept Tested:** Flocking Boids Rules

---
