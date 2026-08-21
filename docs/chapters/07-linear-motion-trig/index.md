---
quality_score: 100
readability_score: 50
---
# Linear Motion, Trigonometry & Wave Math

## Summary

Applies linear displacement, velocity, sine/cosine wave functions, and range mapping (map(), lerp()). Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Linear Motion Logic
2. Position Displacement
3. Constant Velocity
4. Sine Function Math
5. Cosine Function Math
6. Tangent Function Math
7. Wave Amplitude Parameter
8. Wave Frequency Parameter
9. Wave Phase Offset
10. Harmonic Motion Wave
11. Circle Polar Coordinates
12. Polar to Cartesian Formula
13. Cartesian to Polar Formula
14. Arc Tangent Atan2 Function
15. Angle Between Coordinates
16. Rotational Tracking Motion
17. Map Range Function

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Matrix Transformations & Coordinate Systems](../06-matrix-transformations/index.md)

---

!!! mascot-welcome "Welcome to Chapter 7!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hello creators! Static art is beautiful, but things get really exciting when they start to move. We'll be using some surprisingly fun math to make your sketches slide, swing, and breathe with natural rhythm. Get ready to bring your canvases to life!

Have you ever watched a pendulum swing back and forth, or seen the rhythmic rise and fall of ocean waves, or marveled at the smooth rotation of a Ferris wheel? These mesmerizing patterns are everywhere in nature and mechanics, and they all share a common, elegant mathematical foundation. When we learn to harness this math, we unlock the ability to breathe life into our digital creations. In this chapter, we are going to dive deep into how we can recreate these natural, fluid movements using code. We will start simple, by moving objects in straight lines, and then we will unlock the powerful secrets of circles, waves, and oscillation using trigonometry.

## The Beauty of Mathematics in Motion

Trigonometry often gets a bad rap in high school classrooms as a collection of dry formulas and abstract triangles. But in the world of creative coding, trigonometry is your paintbrush. It is the language of continuous, organic movement. By the end of this chapter, you won’t just be drawing static shapes on a screen; you will be choreographing dynamic, breathing animations that feel alive!

### Linear Motion: Getting from Point A to Point B

Before we tackle the complexities of waves and circular paths, let's establish a solid foundation with the most basic form of movement: moving in a straight line. In the digital world, **Linear Motion Logic** involves updating an object's position on the screen frame by frame. Since our sketches run in a loop (the `draw()` function), we can make small changes to our variables every time the loop runs, creating the illusion of smooth motion over time.

Think about how you move across a room. You start at one spot, and with each step, your position changes. In programming, this change in position over time is called **Position Displacement**. 

If an object moves the exact same amount in the exact same direction every single frame, it is exhibiting **Constant Velocity**. Velocity is simply speed with a direction. In our 2D canvas, we handle velocity by changing the x-coordinate to move horizontally, the y-coordinate to move vertically, or both simultaneously to move diagonally.

Let's look at a classic example. If we want a ball to move smoothly across our screen from left to right, we might add a small, fixed number to its x-coordinate every time `draw()` runs. 

```javascript
let xPosition = 0;
let speed = 2; // This represents our velocity in pixels per frame

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Clear the background every frame so we don't leave a trail
  background(220);
  
  // Draw the ball at the current xPosition
  fill(50, 150, 250);
  circle(xPosition, height / 2, 50);
  
  // Apply our Constant Velocity to create Position Displacement
  xPosition += speed; 
}
```

This simple addition (`xPosition += speed;`) is the beating heart of **Linear Motion Logic**. But what happens when the ball reaches the right edge of the canvas? Because we never told it to stop, it will continue moving to the right, into the vast, unseen digital void beyond the screen's boundaries.

!!! mascot-tip "Palette's Tip"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }

    Want a quick trick to keep objects from flying off the screen? Multiply their velocity by `-1` the moment they hit the edge! It instantly reverses their direction and creates a perfect bouncing effect with almost zero extra code.

To handle edges, we use conditional statements (`if` statements) to reverse the velocity when the position exceeds the canvas boundaries. This turns simple displacement into a bouncing simulation, setting the stage for more complex behaviors.

### The Magic of Trigonometry: Circles and Waves

Straight lines and bouncing off walls are great for simple arcade games like Pong, but nature loves curves. How do we make things move in smooth circles, or oscillate back and forth like a leaf in the wind? Enter trigonometry, the mathematics of triangles and circles.

#### The Slinky Metaphor

To truly understand how trigonometric functions translate into motion, imagine a Slinky hanging from your hand. If you pull the bottom of the Slinky down and let go, it bounces up and down. As it bounces, its position changes smoothly over time. It moves fastest when it passes through its resting position in the middle, and it momentarily stops at the very top and bottom of its path before reversing direction. This rhythmic, incredibly smooth bouncing is a perfect, physical example of a **Harmonic Motion Wave**.

Now, take this mental image a step further. Imagine attaching a pen to the bottom of that bouncing Slinky. As the Slinky bounces up and down, you slowly drag a long piece of paper past it horizontally. What does the pen draw? It draws a perfect, smooth, continuous wave on the paper. 

This wave shape is exactly what we get when we graph the sine and cosine functions!

!!! mascot-thinking "Palette's Insight"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }

    Notice how the physical bouncing up and down perfectly maps to the Y-axis, while time progressing maps to the X-axis? You are translating a physical dimension into a temporal one! The up-and-down motion of the Slinky represents the value of the function, and the horizontal dragging of the paper represents the progression of time.

#### Sine and Cosine: The Heartbeat of Animation

In our code, **Sine Function Math** (`sin()`) and **Cosine Function Math** (`cos()`) are the twin engines of organic motion. Both functions take an angle as their input (which we typically measure in radians, not degrees) and return a value that smoothly and eternally oscillates between -1 and 1. 

- `sin(angle)` starts at 0, smoothly goes up to 1, gracefully curves down through 0 to -1, and comes back up to 0.
- `cos(angle)` is identical in shape, but it starts at 1, goes down to -1, and back up to 1. It is perfectly shifted (or out of phase) with the sine function.

In creative coding, we rarely use these functions to solve for the lengths of triangle sides like you do in geometry class. Instead, we use their oscillating output values (-1 to 1) to continuously modulate the position, size, opacity, or color of our shapes.

```javascript
let angle = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  // sin() returns a value between -1 and 1. 
  // We multiply by 100 to make the movement visible (amplitude).
  let yOffset = sin(angle) * 100; 
  
  // Draw the circle in the middle of the screen, plus the offset
  fill(250, 100, 100);
  circle(width / 2, height / 2 + yOffset, 50);
  
  // Increase the angle slightly each frame to progress the wave
  angle += 0.05; 
}
```

By simply mapping the output of `sin()` to the y-coordinate of a circle, we have successfully simulated our bouncing Slinky!

#### Anatomy of a Wave

When we construct a wave using trigonometric functions, there are three primary parameters we can manipulate to change its behavior. These are the dials and knobs of our harmonic engine:

1. **Wave Amplitude Parameter**: This dictates the height of the wave. How far up and down does the Slinky bounce? In our code snippet above, `100` is the amplitude. Because `sin()` maxes out at 1 and bottoms out at -1, multiplying by 100 stretches the wave so it ranges from -100 to 100 pixels. A larger amplitude means a taller, more dramatic wave.
2. **Wave Frequency Parameter**: This controls how fast the wave oscillates. How quickly is the Slinky bouncing up and down? In our code, adding `0.05` to the `angle` each frame determines the frequency. If we added `0.2` instead, the angle would increase faster, the `sin()` function would cycle through its values faster, and our circle would bounce furiously. A higher frequency means more wave cycles squeezed into the same amount of time.
3. **Wave Phase Offset**: This determines where the wave begins its cycle at time zero. Imagine you have two identical Slinkies bouncing next to each other. If you let them go at the exact same time, they bounce together in perfect sync. But if you let one go a split second after the other, they are out of phase. In code, we create this offset by adding a value directly to the angle before passing it into the `sin()` function (e.g., `sin(angle + PI)`).

#### Diagram: Interactive Wave Maker Laboratory

<details>
<summary>MicroSim: Interactive Wave Maker Laboratory</summary><summary>MicroSim: Interactive Wave Maker Laboratory</summary>

**Goal:** Create a rich interactive simulation where the user can manipulate sliders to adjust the amplitude, frequency, and phase offset of a sine wave, visualizing how these parameters alter the shape of the wave in real-time.

**Implementation Details:**
- Use the p5.js generator to scaffold the sketch.
- Draw a continuous, flowing sine wave across the canvas using the `beginShape()`, `vertex()`, and `endShape()` vertex engine.
- Create a `for` loop that iterates through the x-coordinates across the width of the canvas. Inside the loop, calculate the corresponding y-coordinate using the master wave formula: `y = baselineY + sin(x * frequency + phase) * amplitude`.
- Provide HTML range sliders (using p5's `createSlider()` DOM element) for the user to intuitively control the **Wave Amplitude Parameter**, **Wave Frequency Parameter**, and **Wave Phase Offset**.
- Overlay text on the canvas to display the precise numerical values of the current slider settings, reinforcing the connection between the math and the visual output.
</details>

### Navigating the Circle: Polar Coordinates

Up until this point in your programming journey, you have likely positioned every single object using its x and y coordinates on a rectangular grid. This standard system is known as the Cartesian coordinate system, named after René Descartes. 

The Cartesian system is perfect for **Linear Motion Logic**, but it becomes incredibly cumbersome when we want to place objects on a circle or make them move in a circular orbit. Calculating the exact x and y coordinates of a point moving smoothly along a circular curve is a headache if you only use addition and subtraction.

Thankfully, mathematics provides a much better tool for this specific job: **Circle Polar Coordinates**.

Instead of defining a point by its horizontal distance (x) and vertical distance (y) from the origin, the polar coordinate system defines a point using two entirely different metrics:
1. `r` (radius): The straight-line distance from the center origin to the point.
2. `theta` (angle): The angle of rotation from a reference line (usually the horizontal x-axis pointing to the right).

#### Translating Between Systems: The Ultimate Bridge

While polar coordinates are incredibly intuitive for designing circular motion, computer screens and graphics libraries (like p5.js) are strictly Cartesian. They only know how to draw pixels at specific (x, y) locations. 

Therefore, if we want to design our animation in the elegant world of polar coordinates, we need a reliable bridge to translate those instructions back into the Cartesian world the computer understands. 

This bridge is the **Polar to Cartesian Formula**, and it is arguably the most powerful mathematical spell in your trigonometry spellbook. It flawlessly converts a radius and an angle into an x and y coordinate:

- `x = r * cos(theta)`
- `y = r * sin(theta)`

Notice how cosine is married to the x-axis, and sine is married to the y-axis. This relationship is fundamental. By holding the radius `r` constant and constantly increasing the angle `theta`, the calculated x and y coordinates will trace a perfectly smooth circle on the screen!

```javascript
let r = 150; // The radius of our orbit
let theta = 0; // The starting angle

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS); // Radians are the standard for trig functions
}

function draw() {
  // Draw a faint trail to show the path
  background(22, 22, 36, 20); 
  
  // Center our origin point in the middle of the canvas
  translate(width / 2, height / 2);
  
  // Draw the central "sun"
  fill(255, 200, 0);
  circle(0, 0, 80);
  
  // Apply the Polar to Cartesian Formula!
  let orbitingX = r * cos(theta);
  let orbitingY = r * sin(theta);
  
  // Draw the "planet" at the calculated Cartesian coordinates
  fill(0, 200, 255);
  circle(orbitingX, orbitingY, 30);
  
  // Increase the angle to drive the circular motion
  theta += 0.03; 
}
```

By simply updating one variable (`theta`), we achieve complex, curved motion. This is the elegance of polar coordinates.

Conversely, there are many situations where you have an (x, y) point (like the location of the mouse cursor) and you need to know its angle and distance from a central point. This reverse process requires the **Cartesian to Polar Formula**. 

Finding the distance (the radius `r`) is straightforward using the Pythagorean theorem (`r = sqrt(x*x + y*y)`) or the built-in `dist()` function. However, finding the exact angle is much trickier, because a standard tangent calculation loses track of which quadrant the point is in. This brings us to a specialized mathematical tool designed specifically to solve this problem.

### The Power of Tangent and Atan2

We've established that sine and cosine are the undisputed stars for generating smooth circles and harmonic waves. But what about the third primary trigonometric function? 

**Tangent Function Math** (`tan()`) mathematically represents the ratio between sine and cosine (`sin/cos`). Visually, if you graph the tangent function, it looks completely different from its siblings. Instead of smooth, continuous waves, the tangent function produces severe curves that periodically shoot off to positive and negative infinity. Because it's discontinuous, it is rarely used directly for creating smooth animations.

However, its *inverse* function is an incredibly vital tool for interactive programming.

Imagine you are programming a top-down space shooter game. You want your player's spaceship to dynamically rotate and always point its nose directly toward the player's mouse cursor. You know the Cartesian coordinates of the spaceship (x1, y1), and you know the Cartesian coordinates of the mouse (x2, y2). 

To rotate the spaceship correctly using the `rotate()` function, you need to find the **Angle Between Coordinates**.

To accomplish this, we rely on the **Arc Tangent Atan2 Function**, written in code as `atan2(y, x)`. Unlike the standard inverse tangent function which can get confused by signs, `atan2` looks at both the y-difference and the x-difference independently to accurately calculate the correct angle in radians, covering all 360 degrees (or 2 PI radians) flawlessly.

```javascript
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Step 1: Calculate the difference (delta) in x and y
  // Always subtract the starting point from the target point
  let dx = mouseX - centerX;
  let dy = mouseY - centerY;
  
  // Step 2: Use atan2 to find the Angle Between Coordinates
  let angle = atan2(dy, dx);
  
  // Step 3: Apply transformations
  translate(centerX, centerY);
  rotate(angle);
  
  // Draw an arrow or spaceship shape. 
  // We design it pointing right, which is 0 degrees.
  fill(0);
  triangle(-20, -15, 30, 0, -20, 15);
}
```

This specific technique—calculating the delta, feeding it into `atan2`, and applying the resulting angle to a rotation—is the absolute foundation of **Rotational Tracking Motion**. Whether it's a turret aiming at an enemy, a character's eyes following the cursor, or a plant tilting toward the sun, `atan2` is the function that makes it happen.

!!! mascot-warning "Palette's Warning"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }

    Watch out for the great `atan2` trap! A common mistake is flipping the arguments by passing X before Y. Because of old math library standards, it always expects `atan2(dy, dx)`. If your objects are rotating strangely, check your argument order first!

### Mapping Values: The Universal Translator

We have covered movement, oscillation, and rotation. Let's conclude this chapter with one final, incredibly practical utility function that ties everything together: the **Map Range Function**.

#### The Thermometer Metaphor

To understand mapping, imagine a digital weather thermometer mounted outside your window. This thermometer measures temperatures ranging from a freezing 0 degrees up to a sweltering 100 degrees Celsius. 

Now, imagine you are building a smart-home dashboard that displays this temperature not as a number, but as an ambient background color. You want the background to smoothly transition from a deep, icy blue when it's 0 degrees, to a blazing, bright red when it hits 100 degrees.

Your input data (the temperature) exists on a scale of 0 to 100. 
However, your output system (the red color channel in RGB) expects a value strictly between 0 and 255. 

How do you translate a temperature of, say, 75 degrees into the precise corresponding red value?

You could certainly perform the cross-multiplication math yourself: first find the percentage by dividing by the input max (75 / 100 = 0.75), and then multiply your output maximum by that percentage (255 * 0.75 = 191.25). 

But what if your input range isn't a friendly number like 100? What if it's -1 to 1? 

The built-in `map()` function performs this translation math for you instantly and flawlessly. It takes a value from a specific *input range* and perfectly scales and translates it to a corresponding value in a specific *output range*.

The syntax is: `map(value, inputMin, inputMax, outputMin, outputMax)`

```javascript
// Map 75 from a range of [0, 100] to a range of [0, 255]
let redValue = map(75, 0, 100, 0, 255); 
```

This function becomes absolutely indispensable when working with trigonometry. 

Remember that **Sine Function Math** always returns values oscillating between -1 and 1. What if you want to use the output of a sine wave to control the diameter of a circle, making it pulse between 20 pixels and 150 pixels? 

You cannot have a circle with a negative diameter of -1 pixel! You must translate the trigonometric output into usable graphic values. The **Map Range Function** is the perfect, elegant solution:

```javascript
let angle = 0;

function draw() {
  background(220);
  
  // Get the raw sine value (-1 to 1)
  let osc = sin(angle); 
  
  // Translate the sine wave to a valid size range (20 to 150)
  let size = map(osc, -1, 1, 20, 150);
  
  // Draw the pulsing circle
  circle(width/2, height/2, size);
  
  angle += 0.05;
}
```

#### Diagram: Orbital Mechanics Simulator

<details>
<summary>MicroSim: Orbital Mechanics Simulator</summary><summary>MicroSim: Orbital Mechanics Simulator</summary>

**Goal:** Create an advanced, integrated simulation demonstrating polar coordinates, rotational tracking, and mapping all working simultaneously in a dynamic system.

**Implementation Details:**
- Use the p5.js generator.
- Draw a prominent central "sun" in the middle of the canvas.
- Animate a "planet" orbiting the sun using **Circle Polar Coordinates** and the fundamental **Polar to Cartesian Formula** (`x = r * cos(theta)`, `y = r * sin(theta)`).
- Create a distinct "satellite" object that explicitly tracks and follows the mouse cursor's position on the canvas.
- Draw a line connecting the planet and the satellite. Use the **Arc Tangent Atan2 Function** to calculate the precise **Angle Between Coordinates** so that a drawn directional "sensor dish" on the planet continuously rotates and points directly at the moving satellite, demonstrating perfect **Rotational Tracking Motion**.
- Finally, use the **Map Range Function** to dynamically alter the visual state based on distance. Calculate the distance between the planet and the satellite, and map that distance to the fill color of the planet (e.g., mapping a distance range of 0-400 to a color range of red to blue), creating a visual heat-map effect.
</details>

### Conclusion: Choreographing with Code

Trigonometry might have seemed like an abstract, intimidating subject in a textbook, but in the realm of creative coding, it is the fundamental engine of life, oscillation, and organic movement. 

By mastering the rigid predictability of **Linear Motion Logic**, understanding the smooth, eternal oscillations provided by **Sine Function Math** and **Cosine Function Math**, and wielding the rotational targeting power of the **Arc Tangent Atan2 Function**, you have vastly expanded your programming toolkit. 

When you learn to seamlessly link these mathematical properties together using the **Map Range Function**, your code transcends simple drawing. You are no longer just rendering shapes; you are choreographing intricate, dynamic systems that breathe, pulse, and interact with the fluidity of the natural world. Keep experimenting, keep tweaking those wave parameters, and watch your sketches come alive!

!!! mascot-celebration "Chapter Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }

    Incredible work! You just mastered linear displacement, harmonic sine waves, and rotational tracking using atan2. You have everything you need to choreograph organic movement!

[See Annotated References](./references.md)
