---
quality_score: 100
readability_score: 49
---
# Polar Coordinates, Oscillation & Easing

## Summary

Covers polar-to-Cartesian conversion, atan2() rotational tracking, harmonic oscillation, and easing functions. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Constrain Value Function
2. Linear Interpolation Lerp
3. Distance Formula Dist
4. Square Distance Metric
5. Lissajous Curve Generator
6. Spiral Pattern Generation
7. Damped Harmonic Oscillation
8. Pendulum Swing Simulation
9. Wave Interference Pattern
10. Circular Orbit Simulation
11. Elliptical Path Trajectory
12. Easing Function In
13. Easing Function Out
14. Easing Function In Out
15. Frame Independent Motion
16. Step Motion Accumulator
17. Trigonometric Lookup Table

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Linear Motion, Trigonometry & Wave Math](../07-linear-motion-trig/index.md)

---

!!! mascot-welcome "Welcome to Chapter 8!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Welcome back, artists! Are your animations feeling a little stiff and robotic? This chapter will teach you the elegant secrets of circular motion and smooth, natural transitions. Let's add some graceful, organic flow to your digital masterpieces!

Imagine trying to describe the exact position of an airplane high in the sky to an air traffic controller. If you are standing at the control tower, you could theoretically use a massive invisible grid over the earth and say, "The plane is precisely 10 miles east and 5 miles north of the airport." This is exactly how the Cartesian coordinate system works, which we've been using all along in p5.js with our familiar X and Y axes. It is a system built on squares and straight lines. 

## 8.1 Introduction: Beyond the Grid

But there's another, often far more intuitive way to describe where things are in space. Instead of picturing a grid of city blocks, think of **the compass and the radar screen**. A radar sweep doesn't care about a grid; it cares about two completely different pieces of information: how far away something is from the center (the radius or distance), and what direction it's in relative to North (the angle). 

Welcome to the powerful mathematical world of Polar Coordinates. Whenever you want to program things that move in circles, aim at a moving target, draw intricate mandala patterns, or calculate how planets orbit around a central star, polar coordinates are your ultimate secret weapon. Working entirely in X and Y when you are trying to draw a circle is like trying to write a poem using only a calculator. It can be done, but you are fighting against the nature of the shape itself. 

By the end of this chapter, you'll be comfortable translating between the rigid Cartesian grid and the flowing circular logic of polar space. You will be writing code to create a **Circular Orbit Simulation** where planets smoothly revolve around a glowing sun, and even calculating an **Elliptical Path Trajectory** for comets that speed up as they slingshot around the sun! We will also explore how to make motion feel less robotic and more lifelike by utilizing the magic of easing functions.

## 8.2 The Magic of Angles: Polar to Cartesian Conversion

In the p5.js environment, the computer monitor is inherently a Cartesian grid. Every single pixel on your screen has an absolute X and Y address. Because of this hardware limitation, even if we are conceptualizing our animations using polar coordinates (a radius `r` and an angle `theta`), we must always mathematically convert them back to X and Y coordinates before the computer can draw them.

To convert a polar coordinate into a Cartesian coordinate, we rely on the fundamental trigonometric functions we learned in the previous chapter: sine and cosine. 

Let's break down the formulas:
*   `x = r * cos(theta)`
*   `y = r * sin(theta)`

Here, `r` is the radius (how far away from the center we are), and `theta` is the angle (usually measured in radians). In mathematics and programming, an angle of `0` typically points straight to the right (East). As the angle increases, the position rotates clockwise around the origin point.

Let's look at a concrete example. We want to draw a circle that perfectly orbits the center of our canvas.

```javascript
let r = 100;      // Distance from the center (radius)
let theta = 0;    // Starting angle (in radians)

function setup() {
  createCanvas(400, 400);
  // Make sure we are thinking in radians, not degrees!
  angleMode(RADIANS); 
}

function draw() {
  // Clear the background every frame so we don't draw a solid ring
  background(220);
  
  // Move the origin (0,0) to the center of the canvas
  translate(width/2, height/2); 
  
  // The Conversion Magic!
  let x = r * cos(theta);
  let y = r * sin(theta);
  
  // Draw the "planet" at the converted coordinates
  fill(50, 150, 250);
  circle(x, y, 20);
  
  // Increase the angle slightly each frame to make it orbit!
  theta += 0.05; 
}
```

By keeping the radius `r` completely fixed at 100, and constantly adding a small amount to `theta`, the calculated X and Y positions automatically trace out a flawless circle. We have created a simple **Circular Orbit Simulation**.

If we wanted to make the orbit squashed into an oval, we would need to create an **Elliptical Path Trajectory**. In an ellipse, the horizontal radius and the vertical radius are different. We can easily achieve this by multiplying the cosine and sine by different radius values!

```javascript
  // Elliptical Conversion Magic!
  let radiusX = 150;
  let radiusY = 75;
  let x = radiusX * cos(theta);
  let y = radiusY * sin(theta);
```

!!! mascot-tip "Palette's Tip"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }

    Here is a secret to perfect rainbow gradients: map your `theta` angle directly to the hue in HSB color mode! Because polar angles loop seamlessly, your colors will transition without any harsh jumps when the circle completes.

<details>
<summary>MicroSim: Polar Radar Sweeper</summary>

**Type:** p5.js  
**Title:** Polar Coordinate Radar System  
**Description:** An interactive radar scanner that draws a sweeping, glowing green line originating from the center using polar coordinates. A small blip appears when the radar beam passes a specific hidden angle, simulating a detected object.  
**Features:**  
- A UI Slider to dynamically control the angular sweep speed.
- A live visual text display showing the current angle `theta` (in both radians and degrees) and the current radius `r`.
- A translucent Cartesian grid overlay showing how the underlying X and Y coordinates correspond to the tip of the radar sweep.

</details>

## 8.3 Drawing Curves, Spirals, and Mathematical Art

What happens if you don't just change the angle `theta` over time, but you also continuously change the radius `r`? If you steadily increase both values simultaneously, your shape won't just orbit in a closed loop; it will spiral outwards endlessly! 

This technique forms the basis of **Spiral Pattern Generation**. An Archimedean spiral, for example, is created when the radius increases at a steady, constant rate alongside the angle. 

```javascript
let r = 0;
let theta = 0;

function setup() {
  createCanvas(400, 400);
  background(255); // Notice we only draw the background ONCE in setup
}

function draw() {
  translate(width/2, height/2);
  
  let x = r * cos(theta);
  let y = r * sin(theta);
  
  fill(0);
  noStroke();
  circle(x, y, 4); // Draw a tiny dot
  
  theta += 0.1; // The angle spins
  r += 0.3;     // The radius slowly grows outward
}
```

Because we aren't clearing the background in the `draw()` loop, every tiny dot leaves a permanent trail, revealing a beautiful, tightly wound spiral shell pattern! 

If we detach the angle of the X axis from the angle of the Y axis, we enter the realm of the **Lissajous Curve Generator**. A Lissajous curve is created by plotting two sine waves against each other at right angles. By making the X position oscillate at a completely different speed or frequency than the Y position, the dot will trace out beautiful, complex, looping figure-eight and ribbon patterns.

```javascript
let angleX = 0;
let angleY = 0;

function draw() {
  translate(width/2, height/2);
  
  // X oscillates fast, Y oscillates slow
  let x = 150 * cos(angleX);
  let y = 150 * sin(angleY);
  
  circle(x, y, 5);
  
  angleX += 0.07;
  angleY += 0.03; 
}
```

### A Note on Performance

In massive simulations running complex physics engines or rendering thousands of moving particles, calling the `sin()` and `cos()` functions thousands of times per frame can actually slow down your computer's CPU. Calculating a true mathematical sine wave requires complex internal processing. 

To bypass this bottleneck, older video games and modern high-performance engines often utilize a **Trigonometric Lookup Table**. Instead of asking the CPU to calculate the sine of an angle on the fly, the programmer pre-calculates the sine values for hundreds or thousands of specific angles right when the program starts. They store all of these results in a massive array (the "lookup table"). Later, when they need the sine of an angle, they simply look up the closest pre-calculated value in that array. Accessing an array index is drastically faster than running a trigonometric function. While today's modern computers are usually fast enough that you won't need this trick for simple web sketches, understanding memory-versus-processing trade-offs is a hallmark of advanced computer science!

## 8.4 Measuring Space: Distances and Safeguards

When working with radar systems, planetary orbits, or any kind of game physics, you frequently need to know exactly how far apart two distinct objects are. Is the spaceship close enough to the asteroid to crash? Is the player's mouse hovering over the button?

To find out, we rely on the **Distance Formula Dist**. In p5.js, you can conveniently use the built-in `dist(x1, y1, x2, y2)` function. Under the hood, this function is simply executing the Pythagorean theorem: \(a^2 + b^2 = c^2\). It calculates the horizontal difference between the two points, squares it, adds it to the squared vertical difference, and then takes the square root of the total.

However, just like trigonometric functions, calculating a true square root is computationally "expensive" and slow for a computer. If you only need to know if an object is *closer* than a certain limit (like detecting a collision radius of 50 pixels), you can optimize your code by comparing their squared distances instead! 

This optimization technique is called utilizing a **Square Distance Metric**. Instead of checking if `distance < 50`, you calculate the squared distance `(dx*dx + dy*dy)` and check if it is less than `50 * 50` (which is 2500). By comparing the squared values against a squared limit, you completely eliminate the need for the heavy square root calculation!

```javascript
// A highly optimized collision check!
let dx = playerX - enemyX;
let dy = playerY - enemyY;
let squaredDistance = (dx * dx) + (dy * dy);
let collisionLimitSquared = 50 * 50;

if (squaredDistance < collisionLimitSquared) {
  // Boom! Collision detected!
}
```

As you start moving objects around based on these distances and angles, variables can quickly spiral out of control. Objects might fly entirely off the screen, or values might drop into the negatives when you don't want them to. 

To keep your mathematical values strictly within a safe, predictable range, you must utilize the **Constrain Value Function**. In p5.js, the `constrain(value, min, max)` function is a lifesaver. It takes any number and ensures that it never drops below your designated minimum threshold, nor exceeds your absolute maximum threshold. If a spaceship's speed variable reaches 105, but you run `constrain(speed, 0, 100)`, the function will clip the value and return exactly 100. It is the ultimate safety net for erratic variables.

## 8.5 Advanced Oscillations: Nature's Rhythm

Nature is absolutely full of back-and-forth, oscillating movements: springs bouncing, guitar strings vibrating, leaves fluttering in the wind, and grandfather clocks ticking. We can model all of these using our trigonometric tools.

A **Pendulum Swing Simulation** is a classic physics challenge. While a simple sine wave moving left and right looks okay, a true pendulum is driven by gravity. Because gravity pulls harder on the pendulum "bob" when it is swung higher up the arc, the acceleration is not constant. Calculating the angular acceleration based on the gravity constant and the pendulum arm's length creates a mesmerizing, incredibly realistic swinging motion. 

In the real physical world, things don't swing forever in a perfect vacuum. Air resistance, friction at the hinge, and other microscopic forces constantly sap energy from the system. To simulate this realism in our code, we apply **Damped Harmonic Oscillation**. By taking our oscillating value (like velocity) and multiplying it by a tiny "damping factor" each frame—a number slightly less than 1.0, such as 0.995—the swinging motion will gradually, realistically lose energy. The pendulum's swings will get shorter and shorter until it eventually comes to a complete rest at the dead center.

When we start dealing with multiple oscillating forces, things get truly interesting. If you mathematically add two oscillating sine waves together, they interact. Sometimes their peaks line up perfectly, reinforcing each other to create a massive wave. Sometimes, the peak of one wave lines up with the trough of another wave, completely canceling each other out to zero! 

This complex mathematical interaction creates a **Wave Interference Pattern**. By simulating hundreds of interacting waves in a grid of pixels, you can generate breathtaking, rippling fluid effects, mimicking how ripples on a pond bounce off walls and crash into one another.

## 8.6 Smooth Transitions: The Power of Lerp

Sometimes, you don't want the continuous, looping behavior of a mathematical wave; you just want to move an object smoothly from Point A to Point B exactly one time. If you move it by adding 5 pixels every frame, the movement looks extremely rigid, mechanical, and cheap. 

The most fundamental way to smooth out this movement is by utilizing **Linear Interpolation Lerp**.

In mathematics, interpolation is the process of estimating a value between two known endpoints. In p5.js, the built-in `lerp(start, stop, amount)` function finds a specific value between two numbers based on a percentage. The `amount` parameter is a normalized percentage ranging from `0.0` to `1.0`. 
*   If `amount` is `0.0`, `lerp` returns the exact `start` value.
*   If `amount` is `1.0`, `lerp` returns the exact `stop` value.
*   If `amount` is `0.5`, `lerp` returns the perfect, exact midpoint halfway between them.

A classic programming trick uses `lerp` to create a beautiful, asymptotic deceleration effect. By constantly replacing the `start` value with the current position, the object moves a fraction of the *remaining* distance every single frame.

```javascript
let currentX = 10;
let targetX = 350;

function draw() {
  background(220);
  
  // Move 5% of the remaining distance every frame!
  // When far away, 5% is a big jump. 
  // When very close, 5% is a tiny crawl.
  currentX = lerp(currentX, targetX, 0.05); 
  
  circle(currentX, 200, 50);
}
```
Because the remaining distance gets smaller every frame, the 5% movement also gets smaller. The circle starts out moving very fast, and gracefully glides to a silky smooth stop right at the target!

## 8.7 Easing: Breathing Life into Motion

While the `lerp` deceleration trick is fantastic, professional animators and game designers rely on a much broader mathematical concept called Easing.

Think of **easing like a car accelerating and braking**. A heavy physical car does not instantly jump to a velocity of 60 mph the millisecond you touch the gas pedal, nor does it instantly freeze in place the moment you hit the brakes. It gradually builds up momentum, travels at a cruising speed, and then gradually bleeds off momentum to decelerate to a stop. 

If your animations move at a constant, linear speed, they lack physical weight; they look like robotic cursors sliding across a screen. Easing algorithms inject the illusion of mass, physics, and gravity into your animations.

There are three primary categories of easing:

1.  **Easing Function In** (Ease-In): This makes an object start very slowly and gradually accelerate over time. It visually resembles a heavy object overcoming inertia, like a train slowly chugging out of a station, or a boulder starting to roll down a steep hill.
2.  **Easing Function Out** (Ease-Out): This is the exact opposite. The object starts at a high velocity and smoothly decelerate to a gentle stop. It resembles a car gently braking at a stop sign, or a sliding puck slowly losing momentum to friction. (Our `lerp` trick from the previous section is a rudimentary form of Ease-Out!)
3.  **Easing Function In Out** (Ease-In-Out): This function masterfully combines both ends of the spectrum. The object starts from a dead stop, smoothly accelerates to top speed in the middle of the journey, and then gracefully decelerates to a halt at its destination. It is widely considered the most organic, natural-looking movement for any object transitioning between two resting states. It perfectly mimics the movement of a human arm reaching out to grab a glass of water.

These easing functions are driven by different mathematical curves—from simple quadratic equations (\(x^2\)) to complex exponential and trigonometric curves. By passing a normalized time variable (ranging from 0 to 1) into these mathematical functions, they warp and bend the output, returning a new smoothed value that drives your animation.

!!! mascot-thinking "Palette's Insight"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }

    Notice how easing isn't just for physical physics? Think about how blending a harsh color change with an Ease-In-Out transition alters the mental perception of the interface. You are injecting simulated physical weight into abstract concepts!

<details>
<summary>MicroSim: The Great Easing Race</summary>

**Type:** p5.js  
**Title:** Easing Function Comparison Tool  
**Description:** A side-by-side interactive visualizer where four circles race horizontally across the screen from left to right. Each circle's movement is governed by a completely different mathematical easing style: Linear (constant speed), Ease-In, Ease-Out, and Ease-In-Out.  
**Features:**  
- A large "Start Race / Reset Race" toggle button to trigger the exact same duration of animation simultaneously for all circles.
- A live visual graph dynamically plotting the mathematical curve of Position over Time for each runner as they progress.
- Dropdown menus allowing the user to swap out the specific underlying mathematical formula (Quadratic, Cubic, Exponential, Sine) to see how dramatically it changes the "flavor" of the easing curve.

</details>

## 8.8 Keeping Time: Advanced Motion Management

Up until this very moment, all of our animations and physics simulations have relied on a massive underlying assumption: that the p5.js `draw()` loop runs exactly 60 times a second, with flawless regularity. We have been moving objects by adding a fixed number of pixels *per frame*.

But what happens if the computer lags?

!!! mascot-encourage "Palette's Encouragement"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }

    If the concept of 'delta time' feels overwhelming, that's completely normal! Decoupling logic from the frame rate is one of the biggest hurdles in computer graphics. Take a deep breath and just remember: you are multiplying by time instead of frames. If you suddenly open a heavy web page in another tab, or if your sketch spawns ten thousand particles, your browser's frame rate might plummet to 30 or even 15 frames per second. 

If your sketch drops to 30 frames per second, a spaceship moving 5 pixels per frame will suddenly move horizontally half as fast in the real world! If it was jumping with gravity, the entire arc of the jump will change. The physics simulation completely breaks down because it is tied directly to the hardware's rendering speed.

To completely fix this universal problem, professional game engines and advanced physics simulations utilize **Frame Independent Motion**. 

Instead of arbitrarily moving an object by a set number of pixels *per frame*, the program meticulously calculates the exact amount of real-world time that has elapsed since the very last frame was drawn. This tiny fraction of a second is often called "delta time" (or `deltaTime` in p5.js). The program then calculates movement based on pixels *per second*, multiplied by that delta time.

If your frame rate suddenly drops, the delta time mathematically increases. The physics equation automatically compensates by taking a physically larger step forward in that specific frame. This ensures that your spaceship travels the exact same total distance over three real-world seconds, regardless of whether the computer drew 180 frames or only 45 frames during that time span.

To implement this reliably, developers often build a **Step Motion Accumulator**. This is a specific programming pattern that gathers up the fluctuating delta time every frame. If the accumulated time exceeds a fixed, predictable physics time-step (for example, 1/60th of a second), the physics engine completely updates the object's position, subtracts that time step from the accumulator, and repeats. This rigorous decoupling of the visual rendering loop from the mathematical physics loop guarantees that your simulations run flawlessly, predictably, and deterministically on every single device, no matter how much the computer hardware struggles!

!!! mascot-celebration "Chapter Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }

    Incredible work! You just mastered polar-to-Cartesian conversion, interpolation, and delta time for frame independent motion. You are now a master of dynamic, fluid choreography!
