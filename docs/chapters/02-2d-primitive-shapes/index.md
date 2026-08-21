---
title: 2. 2D Primitive Shapes & Custom Geometries
description: Covers 2D drawing primitives, stroke/fill settings, vertex shapes, and Bézier curves.
generated_by: claude skill chapter-content-generator
date: 2026-08-19 07:48:00
version: 0.09
quality_score: 100
readability_score: 60
---
# 2D Primitive Shapes & Custom Geometries

## Summary

Covers 2D drawing primitives (points, lines, rectangles, ellipses, arcs), stroke/fill settings, vertex shapes, and Bézier curves. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Point Primitive
2. Line Primitive
3. Rectangle Primitive
4. Ellipse Primitive
5. Circle Shortcut Function
6. Square Shortcut Function
7. Triangle Primitive
8. Quad Primitive
9. Arc Shape Primitive
10. Ellipse Mode Center
11. Ellipse Mode Corner
12. Rect Mode Center
13. Rect Mode Corner
14. Begin Shape Function
15. End Shape Function
16. Vertex Coordinates
17. Close Shape Parameter
18. Begin Contour Function
19. End Contour Function
20. Bézier Curve Function
21. Bézier Control Points
22. Bézier Vertex Function
23. Curve Shape Function
24. Curve Tightness Setting
25. Curve Vertex Function
26. Corner Radius Rectangle
27. Shape Stroke Weight
28. Stroke Cap Style
29. Stroke Join Style
30. No Stroke Function
31. No Fill Function
32. Smooth Rendering
33. No Smooth Rendering
34. Bounding Box Calculation
35. Shape Area Computation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Creative Coding & Canvas Foundations](../01-intro-creative-coding/index.md)

---

Every great painting, no matter how complex or hyper-realistic, can be broken down into fundamental brushstrokes. In the world of creative coding, our brushstrokes are geometric primitives: simple mathematical shapes that the computer knows how to render instantly. By layering, scaling, and coloring these simple shapes, we can build infinite visual complexity.

In this chapter, we transition from setting up our digital canvas to actually leaving marks upon it. We will start with the simplest possible mark—a single pixel—and progress through lines, basic geometry, custom polygons, and finally the elegant, sweeping curves that revolutionized automotive design in the 1960s.

!!! mascot-welcome "Time to Draw!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Welcome to Chapter 2, artists! Sure, a blank canvas is exciting, but it's time to actually start making marks. In this chapter, we'll give you the fundamental geometric building blocks you need to sketch absolutely anything your imagination can dream up. Grab your digital stylus and let's get drawing!

The absolute simplest mark you can make on a digital canvas is a **Point Primitive**. A point occupies exactly one unit of space on your pixel grid. It is defined by two numbers: its horizontal `x` position and its vertical `y` position. 

## The Simplest Mark: Points and Lines

Drawing a point in p5.js is as simple as calling `point(x, y)`. While a single point might not seem incredibly useful, remember that a digital photograph is nothing more than millions of colored points arranged in a grid. In generative art, we often use thousands of points to create "particle systems"—simulations of rain, smoke, or swarming bees.

When you connect two points, you create a **Line Primitive**. A line requires two sets of coordinates: a starting point `(x1, y1)` and an ending point `(x2, y2)`. The computer calculates the shortest path between these two points and illuminates the pixels along that path. 

```javascript
function draw() {
  background(240);
  
  // A single point at x: 50, y: 50
  point(50, 50);
  
  // A line connecting (50, 50) to (200, 150)
  line(50, 50, 200, 150);
}
```

### Smoothing the Jagged Edges

When a computer attempts to draw a diagonal line across a grid of square pixels, a visual artifact occurs. The line looks jagged, like a staircase. This is called "aliasing." 

To fix this, graphics engines use an optical illusion called anti-aliasing. By coloring the pixels along the edge of the line with semi-transparent shades of gray, the human eye is tricked into seeing a perfectly smooth diagonal. By default, p5.js automatically uses **Smooth Rendering** (`smooth()`) for all geometry. 

However, if you are intentionally trying to create retro, 8-bit, "pixel art" aesthetics, that smoothness ruins the effect. You can force the computer to draw the raw, jagged, blocky pixels by calling the **No Smooth Rendering** function (`noSmooth()`).

## Rectilinear Geometry: Framing the World

Much of human architecture and design is based on straight lines and right angles. The most fundamental shape in this category is the **Rectangle Primitive**. To draw a rectangle, we call `rect(x, y, width, height)`.

If you need a perfectly square rectangle, you *could* use `rect(x, y, size, size)`. But because squares are so common, p5.js provides a convenient **Square Shortcut Function** (`square(x, y, size)`). 

When drawing user interfaces—like buttons or text boxes—sharp 90-degree corners can feel harsh and aggressive. Modern design heavily favors soft, rounded corners. p5.js allows you to automatically curve the corners of any rectangle by providing an optional fifth parameter: the **Corner Radius Rectangle** value. 

```javascript
// Draws a sharp rectangle
rect(20, 20, 100, 50);

// Draws a rectangle with softly rounded corners (10px radius)
rect(150, 20, 100, 50, 10);
```

### The Anchor Point: Rect Modes

When you say `rect(50, 50, 100, 100)`, where exactly does the rectangle go? By default, p5.js uses **Rect Mode Corner** (`rectMode(CORNER)`). This means the `(x, y)` coordinate you provide acts as the top-left anchor point. The rectangle extends 100 pixels to the right, and 100 pixels down from that anchor.

This is perfect for aligning shapes to the edge of a screen. But what if you want to draw a rectangle exactly in the dead center of the canvas? Doing the math from the top-left corner is tedious. 

Instead, you can change the drawing behavior using **Rect Mode Center** (`rectMode(CENTER)`). Once activated, the `(x, y)` coordinates define the exact *middle* of the rectangle, and it grows outward in all directions equally. 

!!! mascot-tip "The Alignment Shortcut"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want to save some time doing math? Instead of calculating complex offsets to center a box on your screen, just use `rectMode(CENTER)` and place it at `width/2, height/2`. It's a massive time-saver for UI design!

## Curves and Arcs: The Compass and Protractor

In contrast to rigid rectangles, organic shapes require curves. The foundational curved primitive is the **Ellipse Primitive** (`ellipse(x, y, width, height)`). An ellipse is simply a squashed or stretched circle. 

Just like rectangles have a square shortcut, ellipses have a **Circle Shortcut Function** (`circle(x, y, diameter)`), allowing you to define a perfectly symmetrical shape with a single size parameter.

Critically, the anchor point logic for ellipses is the exact opposite of rectangles! By default, p5.js uses **Ellipse Mode Center** (`ellipseMode(CENTER)`). The `(x, y)` coordinate dictates the center of the shape. If you prefer to draw your ellipses bounding outward from a top-left origin, you can switch to **Ellipse Mode Corner** (`ellipseMode(CORNER)`).

### Slicing the Pie

What if you don't want a full circle? What if you want a Pac-Man shape, a half-moon, or a slice of pie? For this, we use the **Arc Shape Primitive** (`arc(x, y, width, height, startAngle, stopAngle)`). 

An arc is a partial ellipse. It requires you to define a starting angle and an ending angle. In p5.js (and most mathematics), angles are traditionally measured in Radians, not Degrees. A full circle is \(2\pi\) radians. The right side of the circle (3 o'clock) is 0. The bottom (6 o'clock) is \(\pi/2\). The left (9 o'clock) is \(\pi\).

#### Diagram: Arc and Angle Explorer

<details markdown="1">
<summary>Arc and Angle Explorer</summary><summary>Arc and Angle Explorer</summary>
Type: MicroSim
**sim-id:** arc-angle-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning Objective:** Applying (Students will interactively visualize the relationship between radians, degrees, and the drawn arc slice).

**Visual Elements:**
- A large circle with major angles labeled in both Degrees (0, 90, 180, 270) and Radians (0, PI/2, PI, 3*PI/2).
- A shaded arc slice originating from the center.
- Two draggable sliders: "Start Angle" and "Stop Angle".

**Interactivity:**
- As the user drags the sliders, the shaded pie slice grows or shrinks in real-time.
- A toggle allows the user to switch the arc mode between `PIE` (connected to the center), `CHORD` (a straight line connecting the arc endpoints), and `OPEN` (just the curved stroke).
- A readout box shows the exact code generated: `arc(200, 200, 100, 100, 0, PI);`

Implementation: Use `arc()` with the `mode` parameter driven by a dropdown menu. Map slider values to angles.
</details>

## Polygons: The Building Blocks of Graphics

Moving beyond four-sided shapes, we encounter polygons. The most important polygon in all of computer graphics is the **Triangle Primitive** (`triangle(x1, y1, x2, y2, x3, y3)`). 

A triangle requires three explicit points. Why are triangles so important? Because mathematically, any 3-dimensional shape in existence—from a simple cube to a hyper-realistic video game character—can be broken down into a mesh of flat triangles. The modern GPU (Graphics Processing Unit) in your computer is essentially a highly specialized microchip designed to do exactly one thing: draw millions of triangles insanely fast.

For 2D shapes with exactly four irregular sides (like a trapezoid or a diamond), we use the **Quad Primitive** (`quad(x1, y1, x2, y2, x3, y3, x4, y4)`). You must define all four corners in either clockwise or counter-clockwise order to ensure the shape doesn't "bowtie" or twist over itself.

## The Inkwell and the Brush: Styling Shapes

So far, we have only discussed the geometry—the invisible mathematical boundaries of the shapes. Now we must discuss the ink. In p5.js, every shape has two styling properties: a stroke (the outline) and a fill (the inside color).

By default, shapes have a 1-pixel black stroke and a white fill. We can change the thickness of the outline using the **Shape Stroke Weight** function (`strokeWeight(pixels)`). 

When drawing thick lines, the very ends of the lines become noticeable. Do you want the line to end in a sharp, flat cut? Or a soft, rounded pill shape? This is controlled by the **Stroke Cap Style** (`strokeCap(ROUND, SQUARE, or PROJECT)`). 

Similarly, when two thick lines meet at a sharp corner (like the top of a triangle), the joint can be styled using the **Stroke Join Style** (`strokeJoin(MITER, BEVEL, or ROUND)`). A miter join creates a sharp point, a bevel creates a flat chamfered cut, and a round join creates a soft elbow.

Sometimes, you only want an outline, making the shape completely transparent on the inside. You achieve this using the **No Fill Function** (`noFill()`). Conversely, if you want a solid block of color without any outline border, you use the **No Stroke Function** (`noStroke()`).

!!! mascot-warning "The State Machine Trap"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for ghost shapes! Styling commands like `noStroke()` are persistent state changes. If you remove borders for one circle, every subsequent shape will also lack a border. To fix this, always explicitly reset your styles by calling `stroke(0)` (or your desired color) right before drawing your next shape.

## Custom Polygons: Connecting the Dots

What happens when you want to draw a 5-sided pentagon? Or a 12-sided star? The standard primitives (`rect`, `triangle`) are insufficient. You need to define a custom geometry point by point.

We do this by opening a custom drawing block with the **Begin Shape Function** (`beginShape()`). Once the block is open, we can declare as many **Vertex Coordinates** as we want using `vertex(x, y)`. Think of this exactly like a child's "connect-the-dots" puzzle. The computer will automatically draw lines connecting each vertex in the exact order you declare them.

When you are finished connecting the dots, you lock the geometry by calling the **End Shape Function** (`endShape()`). 

If you just call `endShape()`, the computer stops drawing at the final vertex, leaving a gap between the last point and the first point. If you want a fully enclosed polygon, you must pass the **Close Shape Parameter** to the function: `endShape(CLOSE)`.

```javascript
beginShape();
  vertex(50, 150); // Point 1
  vertex(100, 50); // Point 2
  vertex(150, 150); // Point 3
  vertex(100, 250); // Point 4
endShape(CLOSE); // Connects Point 4 back to Point 1
```

### Cutting Holes: Contours and Stencils

Sometimes you need to draw a shape with a hole punched out of the middle, like a doughnut or the letter 'O'. This is known as negative space. 

To achieve this, you start a normal `beginShape()`, draw the outer boundary, and then call the **Begin Contour Function** (`beginContour()`). Inside the contour block, you define the vertices of the *hole*. Crucially, the vertices of the hole must be defined in the *opposite direction* of the outer boundary (e.g., if you drew the outside clockwise, you must draw the inside hole counter-clockwise). 

Let's imagine you are trying to draw a slice of Swiss cheese. A yellow rectangle is easy. But how do you draw the holes? You could draw background-colored circles on top of the yellow rectangle, but what if there's a complex, moving image *behind* the cheese? If you just draw gray circles, they will block the image behind the cheese. You need *actual holes* where the geometry does not exist, allowing the background to show through.

To achieve this, you start a normal `beginShape()`, draw the outer boundary of the Swiss cheese slice, and then call the **Begin Contour Function** (`beginContour()`). Inside the contour block, you define the vertices of the *hole*. Crucially, the vertices of the hole must be defined in the *opposite direction* of the outer boundary (e.g., if you drew the outside clockwise, you must draw the inside hole counter-clockwise). This directional shift is what tells the graphics engine "this is negative space, subtract it from the fill."

Once the hole is defined, you call the **End Contour Function** (`endContour()`). You can open and close as many contours as you need for multiple holes, and finally close the main shape.

```javascript
// Drawing a square donut (a frame)
beginShape();
  // Outer boundary (Clockwise)
  vertex(10, 10);
  vertex(90, 10);
  vertex(90, 90);
  vertex(10, 90);
  
  beginContour();
    // Inner boundary hole (Counter-Clockwise)
    vertex(30, 30);
    vertex(30, 70);
    vertex(70, 70);
    vertex(70, 30);
  endContour();
endShape(CLOSE);
```

## The Art of Splines: Bézier Curves

Straight lines and custom polygons are powerful, but the natural world is rarely sharp and angular. Vines, ocean waves, and human silhouettes are defined by smooth, flowing curves. 

In the 1960s, a French engineer named Pierre Bézier was working for the Renault car company. He needed a mathematical way to describe the sweeping, elegant curves of a car's chassis to a computer-controlled milling machine. He popularized a mathematical formula that we now call the **Bézier Curve Function** (`bezier()`).

A Bézier curve is defined by four points. The first and fourth points are the physical anchors—where the line starts and ends. The second and third points are the **Bézier Control Points**. 

The curve never actually touches the control points. Instead, the control points exert a magnetic "pull" on the line, bending it toward them. 

!!! mascot-thinking "The Magnetic Pull"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice how the curve never actually touches the control points? Think about it like a rubber band stretched between two thumbtacks. The control points act as invisible magnets pulling on the middle of the band. This separation of anchor and control is a core architectural pattern behind all modern vector graphics!

If you need a continuous, flowing ribbon of multiple curves attached end-to-end, you can use `beginShape()` combined with the **Bézier Vertex Function** (`bezierVertex()`). This allows you to construct complex vector art illustrations, identical to how the Pen Tool works in Adobe Illustrator.

If managing complex control points feels too mathematical, p5.js offers a simpler alternative: the **Curve Shape Function** (`curve()`) and the **Curve Vertex Function** (`curveVertex()`). Unlike Bézier curves, a Catmull-Rom curve (which p5.js uses here) actually passes directly *through* all the points you define, making it much more intuitive to draw a smooth path. You can even adjust how sharply the line bends around the points using the **Curve Tightness Setting** (`curveTightness()`).

#### Diagram: Bézier Control Point Sandbox

<details markdown="1">
<summary>Bézier Control Point Sandbox</summary><summary>Bézier Control Point Sandbox</summary>
Type: MicroSim
**sim-id:** bezier-sandbox<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning Objective:** Evaluating (Students will manipulate invisible control points to see how magnetic tension bends a mathematical curve).

**Visual Elements:**
- A thick, smooth Bézier curve drawn across the screen.
- Four distinct, draggable anchor circles (Anchor 1, Control 1, Control 2, Anchor 2).
- Thin, dashed "tangent lines" connecting Anchor 1 to Control 1, and Anchor 2 to Control 2 (this visualizes the magnetic pull).

**Interactivity:**
- Users can drag all four points freely around the canvas.
- As the points move, the thick curve bends elastically in real-time.
- A readout displays the live `bezier(x1, y1, x2, y2, x3, y3, x4, y4)` code so the user can copy/paste their custom curve directly into their own sketch.

Implementation: Store the 4 coordinate pairs in variables. Use `dist()` to check for mouse drag collisions on the handles. Render the curve with `bezier()` and the tangent lines with standard `line()` calls.
</details>

## Mathematical Geometry: The Invisible Fences

As we draw shapes, we must also think about how they exist within the mathematical space of our canvas. If you draw a complex 12-sided star, how do you know if the user's mouse is hovering over it? Calculating collisions against complex polygons is computationally expensive.

Game developers solve this by calculating an invisible, simplified rectangle that perfectly wraps around the complex shape. This is known as a **Bounding Box Calculation**. For a circle, the bounding box is a square whose width equals the circle's diameter. For a custom polygon, the bounding box is determined by finding the minimum and maximum X and Y coordinates of all the vertices. 

By checking if the mouse is inside the simple bounding box first, the computer saves massive amounts of processing power. If the mouse is outside the bounding box, it is mathematically impossible for it to be touching the complex star inside.

Similarly, we often need to calculate the physical weight or mass of a shape in a physics simulation. This requires **Shape Area Computation**. The area of a rectangle is simple (width × height). The area of a circle is \(\pi r^2\). For complex custom polygons, the area is computed by dividing the polygon into a series of triangles, calculating the area of each triangle, and summing them together. 

Understanding these invisible mathematical boundaries—bounding boxes and area calculations—is the bridge between simply drawing a pretty picture and building a fully interactive, physics-driven simulation.

## Summary

In this chapter, we have expanded our artistic vocabulary from a single point to complex, sweeping splines. We learned how to lay down the rigid rectilinear geometry of rectangles and triangles, how to slice arcs using radians, and how to define custom polygons vertex by vertex.

Crucially, we explored the styling state machine, learning how to dip our brush in different colors and stroke weights, and how the computer uses magnetic control points to bend mathematical curves. Finally, we peeked behind the curtain at the invisible bounding boxes that game engines use to understand where these shapes exist in physical space.

!!! mascot-celebration "Shapes Mastered!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered 2D primitives, custom polygons, Bézier curves, and the styling state machine! You have all the mathematical building blocks needed to sketch any geometry. Next, we will dive deep into the science of color!

[See Annotated References](./references.md)
