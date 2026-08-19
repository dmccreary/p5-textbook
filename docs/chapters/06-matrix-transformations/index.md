
---
quality_score: 100
readability_score: 62
---
# Matrix Transformations & Coordinate Systems

## Summary

Explains canvas translation, rotation, scaling, matrix isolation (push()/pop()), and hierarchical transformation trees. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 34 concepts from the learning graph:

1. Translate Function
2. Rotate Function
3. Scale Function
4. Push Function
5. Pop Function
6. Matrix Stack Operations
7. Transformation Order Logic
8. Origin Point Relocation
9. Radians Angle System
10. Degrees Angle System
11. Angle Mode Setting
12. Shear X Transformation
13. Shear Y Transformation
14. Uniform Scaling
15. Non Uniform Scaling
16. Negative Scale Reflection
17. Hierarchical Transformation
18. Solar System Transformation
19. Robot Joint Transformation
20. Reset Matrix Function
21. Apply Matrix Function
22. Get Current Matrix
23. Screen to Local Coordinates
24. Local to Screen Coordinates
25. Pivot Point Selection
26. Center Rotation Pattern
27. Corner Rotation Pattern
28. Isolated Canvas Layers
29. Nested Transformation Trees
30. Rotation Speed Variable
31. Oscillating Rotation Angle
32. Scale Factor Animation
33. Transform Matrix Inversion
34. Affine Transformation Model

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Control Flow, Loops & Array Data Structures](../05-control-flow-and-loops/index.md)

---

!!! mascot-welcome "Welcome to Chapter 6!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Welcome to Chapter 6! If you've ever felt constrained by plotting every single point by hand, this is the chapter that sets you free. We are going to learn how to bend, twist, and spin the entire digital canvas itself. Time to color outside the loops!

Welcome to the mind-bending world of matrix transformations! Up until now, we've been drawing shapes by explicitly telling our code exactly where to put them using X and Y coordinates. If you wanted a rectangle at `(100, 100)`, you typed `rect(100, 100, 50, 50)`. 

But what if you want to draw a robot arm that bends at the elbow? Or a spinning solar system with planets orbiting a sun while moons orbit the planets? Doing the math for every single point as it rotates and moves across the screen would be incredibly tedious and complex. 

This is where the magic of transformations comes in. Instead of calculating the math to move a shape, we are going to learn how to change the underlying fabric of the coordinate system itself! 

### The Moving Camera vs Moving the World

Here is the most important metaphor to keep in your head: **The moving camera vs moving the world**. When you use the **Translate Function**, you might think you are picking up your rectangle and moving it 50 pixels to the right. But in reality, you are leaving the rectangle exactly where it is (often drawn at `(0, 0)`), and instead, you are picking up the entire coordinate grid and dragging it! 

Imagine you are standing in a room and you want to take a picture of an apple on a table. You have two options:
1. Walk over to the apple, pick it up, and move it to the center of your camera frame.
2. Walk your camera over to the table so the apple is in the center of the frame.

In p5.js, the **Translate Function** works like option 2. It performs an **Origin Point Relocation**. By default, the origin point `(0, 0)` is at the top-left corner of the canvas. When you call `translate(100, 100)`, you are literally shifting that origin point 100 pixels right and 100 pixels down. Any shape you draw at `(0, 0)` after this translation will show up 100 pixels from the top-left of your screen. 

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Draw a red square at the default origin (top-left)
  fill('red');
  rect(0, 0, 50, 50); 
  
  // Perform an Origin Point Relocation
  translate(100, 100);
  
  // Draw a blue square at the NEW origin
  fill('blue');
  rect(0, 0, 50, 50);
}
```

!!! mascot-tip "Palette's Tip"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }

    Hey coders! When I change colors, I change my whole skin. When you use translate, you change the whole grid! Remember, always draw your shapes at `(0, 0)` when you use transformations, and let the translation do the moving for you!

### Spinning the Grid

Once you've moved the origin point, you might want to spin things around. The **Rotate Function** tilts the entire coordinate grid around the current origin point. 

However, before you rotate, you need to understand how p5.js measures angles. By default, it uses the **Radians Angle System**, where a full circle is `TWO_PI` (about 6.28) radians. If you are more comfortable with the **Degrees Angle System** (where a circle is 360 degrees), you can easily switch by changing the **Angle Mode Setting** in your `setup()` function:

```javascript
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); // Switch to the Degrees Angle System
}
```

When you rotate, the grid spins around the `(0, 0)` point. This is why the **Translate Function** is so critical to use *before* the **Rotate Function**. If you don't translate first, your shape will orbit the top-left corner of the canvas! By translating to the center of your shape first, you achieve a **Center Rotation Pattern**. If you translate to a corner of the shape, you achieve a **Corner Rotation Pattern**. It's all about **Pivot Point Selection**.

<details class="microsim">
<summary>MicroSim: Pivot Point Selection</summary>
This simulation demonstrates the difference between the Center Rotation Pattern and Corner Rotation Pattern. Click to toggle where the origin point is translated before the rotation happens. Notice how the grid spins around the red dot (the origin).
```html
<div class="microsim-container" style="height: 400px; border: 1px solid #ccc; background: #f9f9f9;">
  <!-- Simulation code placeholder -->
  <p style="text-align:center; padding-top: 180px;">[Interactive Rotation Simulator Loading...]</p>
</div>
```
</details>

### Making Things Bigger and Smaller

Next up is the **Scale Function**. This stretches or shrinks the coordinate grid. If you call `scale(2)`, every coordinate point becomes twice as far away, and every shape is drawn twice as large. This is called **Uniform Scaling**. 

If you pass two numbers, like `scale(2, 0.5)`, the grid stretches horizontally but shrinks vertically. This is **Non Uniform Scaling**. 

A clever trick with scaling is **Negative Scale Reflection**. If you use `scale(-1, 1)`, you flip the grid horizontally, creating a mirror image. This is incredibly useful for drawing characters that need to face left or right without redrawing all their parts!

### Shearing the Grid

If moving, spinning, and stretching aren't enough, you can also slant the grid using the **Shear X Transformation** and **Shear Y Transformation**. These functions push the parallel lines of the grid into parallelograms, allowing you to create skewed, italic-like effects on your shapes.

### Save States: The Push and Pop Functions

If you change the grid by translating, rotating, and scaling, how do you get back to normal? Every time the `draw()` loop finishes, the grid automatically resets. But what if you want to rotate a square in the center of the screen, and then draw an un-rotated square in the corner?

This brings us to our second major metaphor: **The Push/Pop Save States like video game checkpoints**.

Think of the **Push Function** (`push()`) as saving your game before a boss fight. It records the exact current state of the coordinate system. You can then translate, rotate, and scale to your heart's content. When you are done, you call the **Pop Function** (`pop()`), which restores the coordinate system to exactly how it was when you last pushed! 

These functions create **Isolated Canvas Layers**, ensuring that the transformations applied to one object don't accidentally leak over and affect the next object. The mathematical engine behind this relies on **Matrix Stack Operations**. When you `push()`, you add the current transformation state to a stack (like a stack of plates). When you `pop()`, you take the top plate off, returning to the previous state.

!!! mascot-tip "Palette's Tip"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }

    Push and Pop are best friends! If you use `push()`, you MUST use `pop()`. If you push too many times without popping, your code will crash because the stack gets too high! Always keep them in pairs!

### Transformation Order Logic

The order in which you apply transformations is absolutely critical. **Transformation Order Logic** dictates that transformations stack up and affect each other. 

Let's say you want to draw a spinning square 100 pixels to the right. 
- If you `translate(100, 0)` and then `rotate(45)`, the grid moves right, and then the grid spins on that new spot. The square spins in place.
- If you `rotate(45)` and then `translate(100, 0)`, the grid spins FIRST, meaning the "right" direction is now pointing diagonally down! When you move 100 pixels, it travels along that new diagonal path. 

As a general rule, you should translate first, then rotate, then scale!

### Nested Transformation Trees: The Solar System

Our third metaphor is **The Solar System**, representing a **Hierarchical Transformation**. 

Imagine drawing the sun, the Earth, and the moon. 
1. We translate to the center of the canvas and draw the sun.
2. We `push()`, saving the sun's position.
3. We rotate slightly based on time (the Earth's orbit).
4. We translate outward by 150 pixels and draw the Earth. 
5. We `push()` again, saving the Earth's position.
6. We rotate faster based on time (the moon's orbit).
7. We translate outward by 30 pixels and draw the moon.
8. We `pop()` twice to get back to the sun's baseline state.

This creates **Nested Transformation Trees**. By pushing and popping inside of other pushes and pops, we create a chain of dependencies. The moon inherits the Earth's rotation and translation, and the Earth inherits the sun's translation. This is exactly how the **Solar System Transformation** is modeled, as well as complex mechanical movements like a **Robot Joint Transformation** (where the hand is attached to the forearm, which is attached to the upper arm).

<details class="microsim">
<summary>MicroSim: The Solar System Hierarchy</summary>
Watch how the nested transformations create complex orbital paths. The moon revolves around the Earth, while the Earth revolves around the sun. This is achieved entirely through pushing, popping, translating, and rotating in a hierarchical structure.
```html
<div class="microsim-container" style="height: 400px; border: 1px solid #ccc; background: #f9f9f9;">
  <!-- Simulation code placeholder -->
  <p style="text-align:center; padding-top: 180px;">[Hierarchical Solar System Simulator Loading...]</p>
</div>
```
</details>

### Animating Transformations

To make things move over time, we use variables. By creating a **Rotation Speed Variable**, we can steadily increase an angle every frame. 

```javascript
let angle = 0;
let rotationSpeed = 1; // Rotation Speed Variable

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  
  translate(width/2, height/2);
  rotate(angle);
  rectMode(CENTER);
  rect(0, 0, 100, 100);
  
  angle += rotationSpeed; 
}
```

If you want an object to swing back and forth instead of spinning continuously, you can use the `sin()` or `cos()` functions to create an **Oscillating Rotation Angle**. Similarly, you can apply a changing number to the scale function to create a breathing or pulsing **Scale Factor Animation**.

### Under the Hood: Matrix Math

If you are feeling brave, let's talk about what's actually happening mathematically. Every transformation alters a grid of numbers in the background known as an **Affine Transformation Model**. 

You have direct access to this math if you need it. You can call the **Reset Matrix Function** (`resetMatrix()`) to instantly clear all translations, rotations, and scales, snapping the grid back to the default top-left origin. 

You can also use the **Get Current Matrix** function to look at the raw mathematical numbers that define the current grid state, or use the **Apply Matrix Function** (`applyMatrix()`) to perform complex custom skews and morphs by manually feeding it 6 specific numbers. 

### Bridging the Two Worlds

Sometimes, you need to know where a transformed object actually is on your computer screen. If you translated 100 right, rotated 45 degrees, and translated 50 right, what is the actual X and Y pixel coordinate of your shape? 

You can map between the transformed grid and the raw screen pixels. To convert a point from your weird, spun-around coordinate grid back to the flat screen coordinates, you use **Local to Screen Coordinates** mapping functions (`screenX()` and `screenY()`). Conversely, if a user clicks their mouse on the screen and you need to know where that click lands in your rotated world, you calculate the **Screen to Local Coordinates** (which sometimes involves a **Transform Matrix Inversion** to run the math backwards!).

Understanding how to manipulate the coordinate grid transforms you from someone who draws static shapes into an architect who can construct complex, articulated, and infinitely scalable digital worlds!

### Deep Dive: Step-by-Step Robot Arm

Let's put everything together to build a classic project: a robotic arm. This perfectly illustrates the power of **Nested Transformation Trees** and **Robot Joint Transformation**. 

Imagine a robot arm with three parts: a base, a lower arm, and an upper arm. If we didn't use transformations, calculating the tip of the arm as the base rotates and the elbow bends would require serious trigonometry (sines, cosines, and the Pythagorean theorem). But with our matrix functions, it becomes incredibly simple. We just "walk" along the arm, placing our coordinate system at each joint.

Here is the plan:
1. Move to the bottom of the screen (the base).
2. Rotate the entire grid based on the base's motor.
3. Draw the lower arm pointing straight up.
4. Move the grid to the top of the lower arm (the elbow).
5. Rotate the grid again based on the elbow's motor.
6. Draw the upper arm.

```javascript
let baseAngle = 0;
let elbowAngle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(200);
  
  // Let the mouse control the angles for fun!
  baseAngle = map(mouseX, 0, width, -45, 45);
  elbowAngle = map(mouseY, 0, height, 0, 135);
  
  // 1. Move to the base
  translate(width / 2, height);
  
  // 2. Rotate the base
  rotate(baseAngle);
  
  // 3. Draw the lower arm
  fill(150);
  rect(-10, -100, 20, 100); 
  // (Notice we draw it pointing up, starting from 0)
  
  // 4. Move to the elbow (which is 100 pixels up)
  translate(0, -100);
  
  // 5. Rotate the elbow
  rotate(elbowAngle);
  
  // 6. Draw the upper arm
  fill(100);
  rect(-8, -80, 16, 80);
}
```

By changing the `baseAngle`, the entire arm sways. By changing the `elbowAngle`, only the upper arm bends, but it perfectly follows the swaying base because of **Transformation Order Logic**. The second translation and rotation are happening *relative* to the first one!

### Troubleshooting Matrix Mayhem

As you start using **Push Function** and **Pop Function**, you might run into some wild visual glitches. Here are the most common pitfalls and how to fix them:

**The Runaway Spin:**
If your object is spinning faster and faster, or flying off the screen, you might have forgotten to use `push()` and `pop()`. If you don't isolate your transformations into **Isolated Canvas Layers**, the rotation from frame 1 will carry over into frame 2, and frame 3, accumulating endlessly. Always reset your grid, or use push/pop pairs!

**The Wobbly Orbit:**
If you intended to have an object spin on its center (a **Center Rotation Pattern**), but it looks like a moon orbiting a planet, you probably called `rotate()` *before* `translate()`. Remember, **Rotate Function** always spins around `(0, 0)`. If `(0, 0)` is far away from your shape, your shape will travel in a giant circle.

**The Squished Distortions:**
When using **Non Uniform Scaling** (like `scale(2, 0.5)`), everything you draw afterwards is going to be stretched wide and squished flat. Even worse, if you try to rotate *after* a non-uniform scale, your shape will distort in bizarre ways. The underlying **Affine Transformation Model** gets skewed. Always try to scale *last* in your order of operations. 

### Why Does This Matter? The Video Game Connection

You might be wondering if professional programmers actually use these tools. The answer is a resounding YES!

Every 3D video game you have ever played relies entirely on matrix transformations. When you play Minecraft, the game engine uses a giant matrix stack to figure out where every block is relative to the world, and then another matrix to figure out where the world is relative to your player's camera. 

When you move your mouse to look around in a first-person shooter, you aren't actually moving the world; the engine is applying an **Origin Point Relocation** and a **Transform Matrix Inversion** to figure out how to project the 3D world onto your flat 2D screen. 

By mastering the **Translate Function**, **Rotate Function**, and **Scale Function** in 2D space right now, you are building the exact mathematical intuition you will need if you ever decide to learn 3D graphics, Unity, Unreal Engine, or advanced physics simulations.

### Summary Challenge

Before moving on to the next chapter, try this challenge:
Create a sketch with three gears that interlock. 
- The first gear should spin clockwise.
- The second gear (placed next to it) must spin counter-clockwise.
- The third gear should be half the size (**Uniform Scaling**) and spin twice as fast!

Use variables like `angle`, **Push Function**, and **Pop Function** to ensure each gear has its own **Isolated Canvas Layers**. 

You've got this! Matrices are powerful, but with a little practice, you'll be bending the coordinate grid to your will.

!!! mascot-celebration "Chapter Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){{ class="mascot-admonition-img" }}
    Amazing work! You've mastered another set of core concepts. Take a moment to celebrate!
