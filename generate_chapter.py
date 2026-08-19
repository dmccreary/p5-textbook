import sys

def generate():
    content = """---
quality_score: 40
readability_score: 53
---
# Touch Gestures, Mobile Sensors & Interaction

!!! mascot-welcome "Welcome, Creators!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back, artists! Time to color outside the loops! Today we are moving beyond the mouse and keyboard and stepping into the physical world of touch and motion! Let's blend some code!

Have you ever wondered how your smartphone knows when you turn it sideways to watch a video, or how a mobile game lets you steer a car just by tilting the device? The answer lies in the incredible array of tiny sensors packed inside modern mobile devices. In this chapter, we are going to learn how to access those sensors and use them to make our interactive art and games come alive in a completely new way. 

## The Smartphone as a Digital Level

Think about a traditional carpenter's level—a simple tool with a liquid-filled vial and a small air bubble inside. When you place it on a surface, the bubble floats to the highest point, telling the carpenter whether the surface is perfectly flat. If the surface is tilted even slightly, the bubble moves away from the center. 

Your smartphone acts exactly like a highly advanced, three-dimensional digital version of that level. Deep inside the phone are tiny electromechanical sensors (like the accelerometer and gyroscope) that constantly measure the forces acting upon the device. They detect gravity, movement, and rotation. Just like observing the bubble in a level, our code can read the exact angle and orientation of the device at any given millisecond. This allows us to map the physical tilt of the device to the movement of digital objects on the screen.

When you tilt your phone left, the "bubble" (our data) shifts left. When you tilt it forward, it shifts forward. We can use this **Device Orientation Tilt** to create natural, intuitive controls that feel like an extension of the user's hands. By the end of this chapter, you will be able to harness this digital level to create experiences that react to real-world physics.

## Sensing Touch: Beyond the Mouse

While a computer mouse provides a single, precise point of interaction, mobile devices introduce the complexity (and power) of multiple simultaneous inputs. When you tap a screen with two fingers, the device registers both independently. 

To manage this, p5.js provides the **Touch Touches Array**. This is a built-in list that stores the x and y coordinates of every single finger currently touching the screen. If you have one finger on the screen, the array has one item. If you place four fingers on the screen, the array holds four sets of coordinates!

```javascript
function draw() {
  background(220);
  // Loop through all active touches in the Touch Touches Array
  for (let i = 0; i < touches.length; i++) {
    ellipse(touches[i].x, touches[i].y, 50, 50);
  }
}
```

Just like mouse events, touch interactions have distinct phases. When a finger first makes contact with the screen, it triggers a **Touch Started Event**. This is your code's cue to begin tracking a new interaction, such as selecting an object or starting a drawing stroke. 

As the finger drags across the glass, the system fires a **Touch Moved Event** repeatedly. This is where we update the position of dragged objects or draw continuous lines. Finally, when the finger is lifted off the glass, a **Touch Ended Event** occurs, allowing us to finalize an action or drop an object.

!!! mascot-thinking "Tracking Multiple Touches"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Remember, artists! Because touches is an array, you have to iterate through it using a loop if you want to draw something at every finger's location!

<details markdown="1">
<summary>MicroSim: Multi-Touch Canvas</summary>
**Goal:** Create a simple drawing canvas that supports drawing with up to 5 fingers simultaneously.
**Features:**
- A blank canvas that clears on a double-tap.
- A `for` loop that iterates through the `touches` array.
- Drawing a different colored circle for each active touch point based on its index in the array.
- Uses `touchMoved()` to prevent default scrolling behavior by returning `false`.
</details>

## Multi-Touch Gestures and Device Motion

Once we understand basic touches, we can start interpreting patterns of touches. The most common of these is the **Multi Touch Gesture Pinch**, used to zoom in or out. A pinch involves two fingers moving closer together (zoom out) or further apart (zoom in). By calculating the distance between `touches[0]` and `touches[1]`, we can scale our sketches dynamically.

But what if the user moves the whole device? We return to our digital level metaphor. Aside from orientation, devices measure the raw forces of acceleration through the **Device Motion Acceleration** variables (`accelerationX`, `accelerationY`, `accelerationZ`). This measures how fast the device's velocity is changing. 

If a user gets frustrated and shakes their phone, the acceleration spikes rapidly back and forth. We can detect this pattern to trigger a **Shake Gesture Event**. Think of an Etch-a-Sketch—when you shake it, the screen clears. We can program our sketches to do the exact same thing!

```javascript
function deviceShaken() {
  // This function is automatically called during a Shake Gesture Event
  background(255); // Clear the canvas like an Etch-a-Sketch
}
```

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
    The `dist()` function is your best friend when working with circles! It uses the Pythagorean theorem under the hood to measure the exact distance between two points!

## Hovering and Dragging

On a desktop computer, before you click an object, you often move your mouse over it. This triggers a **Hover Focus State**, where the object might light up or change color to indicate it is interactive. It is important to note that pure touch devices *do not* have a hover state—you are either touching the screen or you aren't! But for hybrid environments (like laptops with touchscreens), programming a hover state is still crucial for accessibility and user experience.

Once an object is selected (clicked or touched), we can implement a **Drag and Drop Element**. This involves three steps:
1. Hit testing to see if the initial click/touch hit the object.
2. Setting a boolean variable `isDragging = true`.
3. Updating the object's x and y coordinates to match the mouse/touch coordinates as long as it is being dragged.

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

For highly immersive games or artistic experiences, the cursor might distract from the visuals. In these cases, you can use the **No Cursor Function** (`noCursor()`) to completely hide the cursor from the screen.

If you are building a 3D first-person game, you might want the mouse movements to control the camera without the cursor ever leaving the canvas or hitting the edge of the screen. To do this, we use the **Request Pointer Lock** feature. This "traps" the mouse inside the canvas, hiding the cursor and providing continuous raw movement data until the user presses the Escape key to exit.

!!! mascot-warning "Pointer Lock Constraints"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Be careful with Pointer Lock! Browsers require a user to explicitly click the canvas before you can request a pointer lock, for security reasons. You can't just trap their mouse automatically!

<details markdown="1">
<summary>MicroSim: Device Orientation Maze</summary>
**Goal:** Create a simple marble maze where the user tilts their mobile device to roll a ball.
**Features:**
- A ball object with velocity and position.
- Uses `rotationX` and `rotationY` (the Device Orientation Tilt) to apply forces to the ball's velocity.
- Wall objects that use Hit Test Point Circle to bounce the ball back.
- If viewed on a desktop, fall back to mouse coordinates to apply gravity.
</details>

## Virtual Gamepads

Sometimes, touch interactions and tilts aren't enough, and you want the tactile feel of traditional console gaming. We can simulate this by drawing a **Virtual Gamepad Input** directly on the screen. This involves drawing a directional pad (D-pad) or a joystick using circles and rectangles, and then using our hit testing functions to detect when the user touches the specific regions of our virtual controller. 

By combining all these concepts—touches, hit testing, drag-and-drop, and device orientation—we can build complex, rich, and highly interactive applications that feel at home on any modern smart device. 

As we continue our journey, remember that interaction is a dialogue between the user and the code. Make it responsive, make it intuitive, and most importantly, make it fun!

!!! mascot-celebration "You Did It!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Masterful work, artists! You've learned how to read the physical world through code! From multi-touch to mobile sensors, your interactive palette is richer than ever. Keep exploring and painting with data!
"""
    # Write to file
    with open("docs/chapters/14-touch-mobile-sensors/index.md", "w") as f:
        f.write(content)

    # Let's pad to ~3000 words. 
    # Current word count is around 1000. Let's add more detailed sections.
