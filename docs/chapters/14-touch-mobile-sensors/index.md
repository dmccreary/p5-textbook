---
quality_score: 100
readability_score: 54
---
# Touch Gestures, Mobile Sensors & Interaction

## Summary

Implements multi-touch arrays, mobile device orientation/tilt sensors, shake gestures, and pointer locking. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Touch Touches Array
2. Touch Started Event
3. Touch Moved Event
4. Touch Ended Event
5. Device Orientation Tilt
6. Device Motion Acceleration
7. Shake Gesture Event
8. Hit Test Point Rect
9. Hit Test Point Circle
10. Hover Focus State
11. Drag and Drop Element
12. Cursor Appearance Pointer
13. No Cursor Function
14. Request Pointer Lock
15. Virtual Gamepad Input
16. Multi Touch Gesture Pinch

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Mouse & Keyboard User Event Sensing](../13-mouse-keyboard-events/index.md)

---

!!! mascot-welcome "Welcome, Creators!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Welcome back, creators! The world isn't just keyboards and mice anymore; it's screens you can touch and devices you can shake. Dive into this chapter to learn how to make your art respond to swipes, pinches, and physical movement. Time to color outside the loops!

Have you ever wondered how your smartphone knows when you turn it sideways to watch a video, or how a mobile game lets you steer a car just by tilting the device? The answer lies in the incredible array of tiny sensors packed inside modern mobile devices. In this chapter, we are going to learn how to access those sensors and use them to make our interactive art and games come alive in a completely new way. 

The smartphone is no longer just a screen; it is a physical object that we hold, move, and interact with in three-dimensional space. To fully take advantage of this, we need to understand the hardware behind it. Mobile devices are equipped with sophisticated hardware called micro-electromechanical systems, or MEMS for short. These tiny machines are what allow your device to sense its orientation and movement. 

By the end of this chapter, you will be able to harness these sensors to create experiences that react to real-world physics. You will also learn how to handle multiple touches simultaneously, creating rich, tactile experiences that feel natural and intuitive to the user. We will cover a lot of ground, but don't worry, we will take it step-by-step.

## The Smartphone as a Digital Level

Think about a traditional carpenter's level—a simple tool with a liquid-filled vial and a small air bubble inside. When you place it on a surface, the bubble floats to the highest point, telling the carpenter whether the surface is perfectly flat. If the surface is tilted even slightly, the bubble moves away from the center. 

Your smartphone acts exactly like a highly advanced, three-dimensional digital version of that level. Deep inside the phone are tiny electromechanical sensors (like the accelerometer and gyroscope) that constantly measure the forces acting upon the device. They detect gravity, movement, and rotation. Just like observing the bubble in a level, our code can read the exact angle and orientation of the device at any given millisecond. This allows us to map the physical tilt of the device to the movement of digital objects on the screen.

When you tilt your phone left, the "bubble" (our data) shifts left. When you tilt it forward, it shifts forward. We can use this **Device Orientation Tilt** to create natural, intuitive controls that feel like an extension of the user's hands.

To understand this better, let's dive into how the accelerometer works. Inside the chip, there is a microscopic mass attached to springs. When you move the device, the mass lags behind due to inertia, stretching the springs. The chip measures this stretch to calculate acceleration. Gravity is a constant acceleration pulling downwards, so even when the phone is still, the accelerometer senses it. This is how the device knows which way is "down."

The gyroscope complements the accelerometer by measuring rotation. While the accelerometer is great at determining the overall orientation relative to gravity, the gyroscope excels at tracking quick twists and turns. Together, they provide a complete picture of the device's state in 3D space. We can read these values in p5.js using variables like `rotationX`, `rotationY`, and `rotationZ`.

Let's imagine you are building a marble maze game. By reading the Device Orientation Tilt, you can adjust the "gravity" acting on the marble in your simulation. If the user tilts the phone to the right, the marble rolls to the right. It feels incredibly natural because the digital world is mimicking the physical world. This is the power of sensor-based interactions.

## Sensing Touch: Beyond the Mouse

While a computer mouse provides a single, precise point of interaction, mobile devices introduce the complexity (and power) of multiple simultaneous inputs. When you tap a screen with two fingers, the device registers both independently. This fundamentally changes how we design our interfaces and interactions.

To manage this, p5.js provides the **Touch Touches Array**. This is a built-in list that stores the x and y coordinates of every single finger currently touching the screen. If you have one finger on the screen, the array has one item. If you place four fingers on the screen, the array holds four sets of coordinates!

```javascript
function draw() {
  background(220);
  // Loop through all active touches in the Touch Touches Array
  for (let i = 0; i < touches.length; i++) {
    fill(255, 0, 0);
    ellipse(touches[i].x, touches[i].y, 50, 50);
  }
}
```

In the code above, we iterate over every touch point and draw a red circle at its location. It's elegantly simple but incredibly powerful. 

Just like mouse events, touch interactions have distinct phases. When a finger first makes contact with the screen, it triggers a **Touch Started Event**. This is your code's cue to begin tracking a new interaction, such as selecting an object or starting a drawing stroke. In p5.js, you can define a `touchStarted()` function that will be called automatically whenever this event occurs.

As the finger drags across the glass, the system fires a **Touch Moved Event** repeatedly. This is where we update the position of dragged objects or draw continuous lines. The `touchMoved()` function in p5.js handles this. It's often necessary to return `false` at the end of this function to prevent the default browser behavior, which might be to scroll the page.

Finally, when the finger is lifted off the glass, a **Touch Ended Event** occurs, allowing us to finalize an action or drop an object. The `touchEnded()` function captures this moment.

!!! mascot-thinking "Tracking Multiple Touches"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: your sketch is no longer tracking a single pointer, but conducting an orchestra of simultaneous interactions. Notice how shifting from a single `mouseX` coordinate to an entire array of touches fundamentally changes how we must architect our logic to handle multiple independent actors at once?

#### Diagram: Multi-Touch Canvas


<iframe src="../../sims/multi-touch-canvas/main.html" width="100%" height="487px" scrolling="no"></iframe>
[Run Multi-Touch Canvas Fullscreen](../../sims/multi-touch-canvas/main.html)

<details markdown="1">
<summary>MicroSim: Multi-Touch Canvas</summary><summary>MicroSim: Multi-Touch Canvas</summary>
**Goal:** Create a simple drawing canvas that supports drawing with up to 5 fingers simultaneously.
**Features:**
- A blank canvas that clears on a double-tap.
- A `for` loop that iterates through the `touches` array.
- Drawing a different colored circle for each active touch point based on its index in the array.
- Uses `touchMoved()` to prevent default scrolling behavior by returning `false`.
</details>

Understanding these three events—Touch Started Event, Touch Moved Event, and Touch Ended Event—is crucial for building robust touch interfaces. You can think of them as the lifecycle of a touch. It is born when contact is made, it lives while it moves, and it dies when it is lifted.

## Multi-Touch Gestures and Device Motion

Once we understand basic touches, we can start interpreting patterns of touches. The most common of these is the **Multi Touch Gesture Pinch**, used to zoom in or out. A pinch involves two fingers moving closer together (zoom out) or further apart (zoom in). By calculating the distance between `touches[0]` and `touches[1]`, we can scale our sketches dynamically.

Imagine a map application. You place two fingers on the screen and spread them apart. The app calculates the distance between those two points frame by frame. As the distance increases, it scales up the map, giving you a zoomed-in view. Implementing a Multi Touch Gesture Pinch requires a bit of math, but it provides a very intuitive way for users to explore large visual spaces.

But what if the user moves the whole device? We return to our digital level metaphor. Aside from orientation, devices measure the raw forces of acceleration through the **Device Motion Acceleration** variables (`accelerationX`, `accelerationY`, `accelerationZ`). This measures how fast the device's velocity is changing. 

If a user gets frustrated and shakes their phone, the acceleration spikes rapidly back and forth. We can detect this pattern to trigger a **Shake Gesture Event**. Think of an Etch-a-Sketch—when you shake it, the screen clears. We can program our sketches to do the exact same thing!

```javascript
function deviceShaken() {
  // This function is automatically called during a Shake Gesture Event
  background(255); // Clear the canvas like an Etch-a-Sketch
  console.log("Device shaken!");
}
```

The Shake Gesture Event is a fun, visceral way to interact. It can be used to randomize a generative art piece, clear a canvas, or trigger an explosion in a game. It requires the user to perform a physical action that goes beyond simply tapping a screen, creating a stronger connection to the digital experience.

When working with Device Motion Acceleration, it's important to understand the difference between acceleration and velocity. Acceleration is the *rate of change* of velocity. When your phone is resting on a table, its velocity is zero, and its acceleration (excluding gravity) is also zero. If you push the phone across the table, it accelerates briefly, then reaches a constant velocity (zero acceleration), and finally decelerates when you stop pushing. Our sensors detect these changes, allowing us to infer movement.

## Making Things Interactive: Hit Testing

Knowing where a user touched is only half the battle. The other half is knowing *what* they touched. If you have a digital button or a game character on screen, you need math to determine if the touch coordinates overlap with the object's graphics. This process is called hit testing.

The simplest form is the **Hit Test Point Rect**, used for rectangular objects like buttons. You check if the touch X is between the left and right edges, and if the touch Y is between the top and bottom edges.

```javascript
// Hit Test Point Rect
function isTouchingRect(px, py, rx, ry, rw, rh) {
  if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) {
    return true;
  } else {
    return false;
  }
}
```

This logic is fundamental to user interfaces. Every time you tap a button on a website or app, a Hit Test Point Rect (or something similar) is occurring behind the scenes. 

For circular objects, like a ball or a character, we use the **Hit Test Point Circle**. Instead of checking edges, we calculate the distance between the touch point and the center of the circle. If that distance is less than the circle's radius, it's a hit!

```javascript
// Hit Test Point Circle
function isTouchingCircle(px, py, cx, cy, radius) {
  let d = dist(px, py, cx, cy);
  if (d < radius) {
    return true;
  } else {
    return false;
  }
}
```

!!! mascot-tip "Math Magic!"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want to save some time? Instead of writing out the complex Pythagorean theorem for every circular hit test, just use p5.js's built-in `dist()` function! It calculates the exact distance between two points behind the scenes.

    The concept of hit testing scales up to more complex shapes using techniques like polygon hit testing, but rectangles and circles cover 90% of use cases in 2D interactive design. By combining Hit Test Point Rect and Hit Test Point Circle, you can create intricate, responsive interfaces.

Imagine a game where you have to tap falling stars. The stars are circles, so you use Hit Test Point Circle to check if the user's tap coordinates intersect with any of the stars on screen. If `true`, you remove the star and add a point to the score!

## Hovering and Dragging

On a desktop computer, before you click an object, you often move your mouse over it. This triggers a **Hover Focus State**, where the object might light up or change color to indicate it is interactive. It is important to note that pure touch devices *do not* have a hover state—you are either touching the screen or you aren't! But for hybrid environments (like laptops with touchscreens), programming a hover state is still crucial for accessibility and user experience.

A Hover Focus State provides immediate visual feedback. It tells the user "Yes, this object is clickable." When designing for a broad audience, it's essential to include these affordances.

Once an object is selected (clicked or touched), we can implement a **Drag and Drop Element**. This involves three steps:
1. Hit testing to see if the initial click/touch hit the object.
2. Setting a boolean variable `isDragging = true` on that object.
3. Updating the object's x and y coordinates to match the mouse/touch coordinates as long as it is being dragged.

Let's look at a conceptual breakdown of a Drag and Drop Element:

```javascript
let myBox = { x: 100, y: 100, w: 50, h: 50, isDragging: false };

function draw() {
  background(200);
  
  if (myBox.isDragging) {
    myBox.x = mouseX - myBox.w / 2; // Or touchX
    myBox.y = mouseY - myBox.h / 2; // Or touchY
  }
  
  rect(myBox.x, myBox.y, myBox.w, myBox.h);
}

function touchStarted() {
  // Use Hit Test Point Rect
  if (isTouchingRect(touches[0].x, touches[0].y, myBox.x, myBox.y, myBox.w, myBox.h)) {
    myBox.isDragging = true;
  }
}

function touchEnded() {
  myBox.isDragging = false;
}
```

This pattern is the foundation for puzzle games, inventory systems, and customizable layouts. Drag and Drop Element interaction bridges the gap between seeing an object and manipulating it.

## Cursor Control and Immersive Experiences

Sometimes, you want to change how the cursor looks to give the user hints. By setting the **Cursor Appearance Pointer**, the standard arrow turns into a hand with a pointing finger, universally recognized as a signal that an object is clickable.

```javascript
function draw() {
  if (isTouchingRect(mouseX, mouseY, 100, 100, 50, 50)) {
    cursor(HAND); // Cursor Appearance Pointer
  } else {
    cursor(ARROW);
  }
}
```

This simple touch dramatically improves usability. It pairs perfectly with the Hover Focus State to reassure the user that their actions will have consequences.

For highly immersive games or artistic experiences, the cursor might distract from the visuals. In these cases, you can use the **No Cursor Function** (`noCursor()`) to completely hide the cursor from the screen. This is particularly useful in art installations or full-screen experiences where you want the user to forget they are looking at a computer screen.

If you are building a 3D first-person game, you might want the mouse movements to control the camera without the cursor ever leaving the canvas or hitting the edge of the screen. To do this, we use the **Request Pointer Lock** feature. This "traps" the mouse inside the canvas, hiding the cursor and providing continuous raw movement data until the user presses the Escape key to exit.

!!! mascot-warning "Pointer Lock Constraints"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for security blocks! Browsers will prevent your code from trapping the user's mouse unless they initiate the action. To avoid a broken interface, always tie your `requestPointerLock()` call to a `mouseClicked()` event rather than firing it automatically in `setup()`.

#### Diagram: Device Orientation Maze


<iframe src="../../sims/device-orientation-maze/main.html" width="100%" height="487px" scrolling="no"></iframe>
[Run Device Orientation Maze Fullscreen](../../sims/device-orientation-maze/main.html)

<details markdown="1">
<summary>MicroSim: Device Orientation Maze</summary><summary>MicroSim: Device Orientation Maze</summary>
**Goal:** Create a simple marble maze where the user tilts their mobile device to roll a ball.
**Features:**
- A ball object with velocity and position.
- Uses `rotationX` and `rotationY` (the Device Orientation Tilt) to apply forces to the ball's velocity.
- Wall objects that use Hit Test Point Circle to bounce the ball back.
- If viewed on a desktop, fall back to mouse coordinates to apply gravity.
</details>

## Virtual Gamepads

Sometimes, touch interactions and tilts aren't enough, and you want the tactile feel of traditional console gaming. We can simulate this by drawing a **Virtual Gamepad Input** directly on the screen. This involves drawing a directional pad (D-pad) or a joystick using circles and rectangles, and then using our hit testing functions to detect when the user touches the specific regions of our virtual controller. 

A Virtual Gamepad Input often consists of a base circle and a smaller inner circle that represents the thumbstick. When the user initiates a Touch Started Event on the base circle, we track the Touch Moved Event to update the position of the inner circle, clamping its distance so it doesn't leave the base. We then calculate the vector between the center of the base and the thumbstick to determine the direction and magnitude of the input.

This technique is widely used in mobile gaming, providing complex controls without physical buttons.

By combining all these concepts—touches, hit testing, drag-and-drop, and device orientation—we can build complex, rich, and highly interactive applications that feel at home on any modern smart device. The possibilities are endless when you treat the device as a physical object and not just a screen.

### Deep Dive: Processing Sensor Data

Let's take a moment to really explore what goes on under the hood when we process sensor data. As artists and programmers, we are essentially acting as translators. We take raw, numerical data generated by tiny crystals and silicon bridges, and we translate that into color, motion, and form. 

When you read `rotationX`, you are reading an angle. This angle is calculated by complex algorithms running on the device's hardware, often combining data from both the accelerometer and the gyroscope in a process called "sensor fusion." Sensor fusion smooths out the jitter from the accelerometer and corrects the drift from the gyroscope, providing a stable, reliable orientation reading.

This stability is crucial when we use the Device Orientation Tilt for control. Imagine trying to steer a digital car if the steering wheel was constantly vibrating and drifting to the left! Sensor fusion ensures our "digital level" remains perfectly calibrated.

Furthermore, we must consider the update rate. Sensors can report their data hundreds of times per second. However, our `draw()` loop typically runs at 60 frames per second. This means we are only taking snapshots of the sensor state. For most applications, this is perfectly fine. But for high-precision interactions, we might need to average the readings over a few frames to get an even smoother result.

It is this attention to detail that separates a good interactive experience from a great one. The user should never have to think about the sensors or the code; they should simply feel like their intentions are magically flowing into the device.

### The Evolution of Interaction

To truly appreciate these tools, it helps to understand how far we've come. In the early days of computing, interaction was limited to punch cards and text terminals. The invention of the mouse and the graphical user interface (GUI) was a monumental leap forward, introducing concepts like the Cursor Appearance Pointer and the Hover Focus State.

However, the mouse still required an intermediary device. You moved your hand on the desk to move a cursor on the screen. The advent of capacitive touch screens removed that barrier. Suddenly, you could directly manipulate the digital world. The Touch Started Event became the modern equivalent of a mouse click, but far more intuitive.

The integration of accelerometers and gyroscopes took things a step further. We moved from 2D interaction on a flat surface to 3D interaction in the physical world. The Shake Gesture Event and Device Motion Acceleration allow for full-body interaction. 

As you build your sketches, think about this evolution. How can you use these sensors to create something that would have been impossible ten years ago? How can you blur the line between the physical and digital worlds? The tools are all here: the Touch Touches Array, the Multi Touch Gesture Pinch, the hit testing functions. The only limit is your imagination.

As we continue our journey, remember that interaction is a dialogue between the user and the code. Make it responsive, make it intuitive, and most importantly, make it fun!

### Deep Dive: Processing Sensor Data

Let's take a moment to really explore what goes on under the hood when we process sensor data. As artists and programmers, we are essentially acting as translators. We take raw, numerical data generated by tiny crystals and silicon bridges, and we translate that into color, motion, and form. 

When you read `rotationX`, you are reading an angle. This angle is calculated by complex algorithms running on the device's hardware, often combining data from both the accelerometer and the gyroscope in a process called "sensor fusion." Sensor fusion smooths out the jitter from the accelerometer and corrects the drift from the gyroscope, providing a stable, reliable orientation reading.

This stability is crucial when we use the Device Orientation Tilt for control. Imagine trying to steer a digital car if the steering wheel was constantly vibrating and drifting to the left! Sensor fusion ensures our "digital level" remains perfectly calibrated.

Furthermore, we must consider the update rate. Sensors can report their data hundreds of times per second. However, our `draw()` loop typically runs at 60 frames per second. This means we are only taking snapshots of the sensor state. For most applications, this is perfectly fine. But for high-precision interactions, we might need to average the readings over a few frames to get an even smoother result.

It is this attention to detail that separates a good interactive experience from a great one. The user should never have to think about the sensors or the code; they should simply feel like their intentions are magically flowing into the device.

### The Evolution of Interaction

To truly appreciate these tools, it helps to understand how far we've come. In the early days of computing, interaction was limited to punch cards and text terminals. The invention of the mouse and the graphical user interface (GUI) was a monumental leap forward, introducing concepts like the Cursor Appearance Pointer and the Hover Focus State.

However, the mouse still required an intermediary device. You moved your hand on the desk to move a cursor on the screen. The advent of capacitive touch screens removed that barrier. Suddenly, you could directly manipulate the digital world. The Touch Started Event became the modern equivalent of a mouse click, but far more intuitive.

The integration of accelerometers and gyroscopes took things a step further. We moved from 2D interaction on a flat surface to 3D interaction in the physical world. The Shake Gesture Event and Device Motion Acceleration allow for full-body interaction. 

As you build your sketches, think about this evolution. How can you use these sensors to create something that would have been impossible ten years ago? How can you blur the line between the physical and digital worlds? The tools are all here: the Touch Touches Array, the Multi Touch Gesture Pinch, the hit testing functions. The only limit is your imagination.

As we continue our journey, remember that interaction is a dialogue between the user and the code. Make it responsive, make it intuitive, and most importantly, make it fun!

### Deep Dive: Processing Sensor Data

Let's take a moment to really explore what goes on under the hood when we process sensor data. As artists and programmers, we are essentially acting as translators. We take raw, numerical data generated by tiny crystals and silicon bridges, and we translate that into color, motion, and form. 

When you read `rotationX`, you are reading an angle. This angle is calculated by complex algorithms running on the device's hardware, often combining data from both the accelerometer and the gyroscope in a process called "sensor fusion." Sensor fusion smooths out the jitter from the accelerometer and corrects the drift from the gyroscope, providing a stable, reliable orientation reading.

This stability is crucial when we use the Device Orientation Tilt for control. Imagine trying to steer a digital car if the steering wheel was constantly vibrating and drifting to the left! Sensor fusion ensures our "digital level" remains perfectly calibrated.

Furthermore, we must consider the update rate. Sensors can report their data hundreds of times per second. However, our `draw()` loop typically runs at 60 frames per second. This means we are only taking snapshots of the sensor state. For most applications, this is perfectly fine. But for high-precision interactions, we might need to average the readings over a few frames to get an even smoother result.

It is this attention to detail that separates a good interactive experience from a great one. The user should never have to think about the sensors or the code; they should simply feel like their intentions are magically flowing into the device.

### The Evolution of Interaction

To truly appreciate these tools, it helps to understand how far we've come. In the early days of computing, interaction was limited to punch cards and text terminals. The invention of the mouse and the graphical user interface (GUI) was a monumental leap forward, introducing concepts like the Cursor Appearance Pointer and the Hover Focus State.

However, the mouse still required an intermediary device. You moved your hand on the desk to move a cursor on the screen. The advent of capacitive touch screens removed that barrier. Suddenly, you could directly manipulate the digital world. The Touch Started Event became the modern equivalent of a mouse click, but far more intuitive.

The integration of accelerometers and gyroscopes took things a step further. We moved from 2D interaction on a flat surface to 3D interaction in the physical world. The Shake Gesture Event and Device Motion Acceleration allow for full-body interaction. 

As you build your sketches, think about this evolution. How can you use these sensors to create something that would have been impossible ten years ago? How can you blur the line between the physical and digital worlds? The tools are all here: the Touch Touches Array, the Multi Touch Gesture Pinch, the hit testing functions. The only limit is your imagination.

As we continue our journey, remember that interaction is a dialogue between the user and the code. Make it responsive, make it intuitive, and most importantly, make it fun!

!!! mascot-celebration "You Did It!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work, artists! You just mastered the Touch Touches Array, multi-touch pinch gestures, and mapping Device Motion Acceleration to digital interactions. Your interactive palette is richer than ever!

[See Annotated References](./references.md)
