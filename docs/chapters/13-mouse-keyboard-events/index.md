---
quality_score: 100
readability_score: 60
---
# Mouse & Keyboard User Event Sensing

## Summary

Captures interactive mouse coordinates, drag states, keyboard events, key codes, and bounding box hit testing. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Mouse X Position
2. Mouse Y Position
3. Previous Mouse X PmouseX
4. Previous Mouse Y PmouseY
5. Mouse Is Pressed Flag
6. Mouse Button Value
7. Mouse Pressed Event
8. Mouse Released Event
9. Mouse Moved Event
10. Mouse Dragged Event
11. Mouse Clicked Event
12. Mouse Wheel Event
13. Key Is Pressed Flag
14. Key Variable Character
15. Key Code Number
16. Key Pressed Event
17. Key Released Event
18. Key Typed Event

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Particle Systems, Forces & Steering Behaviors](../12-particle-systems/index.md)

---

!!! mascot-welcome "Welcome, Creators!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hey artists, it's time to break the fourth wall! This chapter will teach you how to make your digital canvases actually listen and respond to the people looking at them. We're turning your static code into fully interactive playgrounds, so let's blend some code!

Welcome, students! Have you ever played a video game and wondered how the console knows exactly when you press the jump button or swing the analog stick? In this chapter, we are going to dive deep into **Mouse & Keyboard User Event Sensing**, treating our computer peripherals just like a video game controller.

Every time you move your mouse or tap a key, your computer generates an "event." An event is simply a message that says, "Hey, something just happened here!" In Processing, we have built-in variables and functions that are constantly listening for these events. This allows us to create dynamic, interactive applications that respond to user input in real-time. By the end of this chapter, you will be able to harness these events to control your sketches, just like you control a character on screen.

### The Controller Metaphor

Think of your sketch as a video game. The canvas is the screen, and the user's mouse and keyboard are the controller. The controller sends signals to the console (your program), which then updates the game state and redraws the screen.

In video games, controllers have analog sticks (for continuous movement like walking or aiming) and buttons (for discrete actions like jumping or shooting). 
- The **mouse** acts like your primary analog stick, providing continuous positional data, as well as buttons for discrete clicks.
- The **keyboard** acts like a massive array of discrete buttons, each with its own specific function.

Let's break down how we can capture these signals and use them to power our sketches!

## Part 1: The Analog Stick (Mouse Position)

Just like an analog stick gives you an X and Y value for aiming, the mouse gives you its precise location on the screen.

### Current Position

The most fundamental pieces of information we can get from the mouse are its current coordinates. In Processing, these are stored in two built-in variables: **Mouse X Position** and **Mouse Y Position**.

- `mouseX`: The current horizontal position of the mouse, measured in pixels from the left edge of the canvas.
- `mouseY`: The current vertical position of the mouse, measured in pixels from the top edge of the canvas.

These variables are automatically updated by Processing every time the mouse moves. They are incredibly useful for drawing objects that follow the cursor, creating interactive menus, or even just tracking where the user is looking.

!!! mascot-thinking "Tracking Coordinates"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Remember that the top-left corner is (0, 0). As you move right, **Mouse X Position** increases. As you move down, **Mouse Y Position** increases.

### Previous Position

Sometimes, knowing *where* the mouse is isn't enough; we need to know *how fast* or *in what direction* it's moving. To do this, we can compare its current position to its previous position. Processing gives us two variables for this: **Previous Mouse X PmouseX** and **Previous Mouse Y PmouseY**.

- `pmouseX`: The horizontal position of the mouse in the previous frame.
- `pmouseY`: The vertical position of the mouse in the previous frame.

By calculating the difference between `mouseX` and `pmouseX` (or `mouseY` and `pmouseY`), you can determine the speed and direction of the mouse movement. This is exactly how dragging or throwing mechanics work in physics games!

<details markdown="1">
<summary>MicroSim: Mouse Speed Tracker</summary>
**Objective**: Visualize the speed of the mouse by drawing a line from the previous position to the current position. The thickness of the line should be proportional to the speed.
**Elements**:
- A canvas that does not clear its background every frame.
- A `line()` drawn from `(pmouseX, pmouseY)` to `(mouseX, mouseY)`.
- A `strokeWeight()` calculation based on the distance between the current and previous points.
**Interaction**: The user moves the mouse around the canvas to draw. Faster movements create thicker (or thinner, depending on your mapping) lines.
</details>

## Part 2: The Action Buttons (Mouse States and Events)

Now that we have our analog stick, let's look at the action buttons: the mouse clicks. Processing provides two main ways to handle button presses: checking the *state* (is it pressed right now?) and handling the *event* (did it just get pressed?).

### Mouse States

State variables are like asking, "Are you holding down the button at this exact moment?"

- **Mouse Is Pressed Flag**: The `mouseIsPressed` boolean variable is `true` if any mouse button is currently held down, and `false` otherwise. This is great for continuous actions, like firing a machine gun as long as the trigger is held.
- **Mouse Button Value**: The `mouseButton` variable tells you *which* button is being pressed (`LEFT`, `RIGHT`, or `CENTER`). This allows you to map different actions to different buttons, just like a real controller.

### Mouse Events

Events, on the other hand, are discrete triggers. They happen once per action. Think of them as functions that Processing automatically calls when something specific occurs.

- **Mouse Pressed Event**: The `mousePressed()` function is called once the instant a mouse button is pressed down. This is perfect for single-shot actions, like jumping or firing a single laser.
- **Mouse Released Event**: The `mouseReleased()` function is called once the instant a mouse button is let go. You might use this to stop an action, drop a dragged object, or charge up an attack based on how long the button was held.
- **Mouse Clicked Event**: The `mouseClicked()` function is called after a mouse button has been both pressed and released. It's typically used for UI interactions, like clicking a button on a menu.

!!! mascot-tip "State vs. Event"
    ![Palette offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Use `mouseIsPressed` for continuous effects (like drawing a line). Use `mousePressed()` for one-time triggers (like spawning an explosion). Don't mix them up!

### Complex Mouse Movements

Sometimes, the action isn't just a simple click; it's a combination of movement and clicking.

- **Mouse Moved Event**: The `mouseMoved()` function is called every time the mouse moves while *no* buttons are pressed. You could use this to highlight interactive objects as the cursor hovers over them.
- **Mouse Dragged Event**: The `mouseDragged()` function is called every time the mouse moves while a button *is* pressed. This is essential for dragging objects around the screen, drawing, or panning a map.
- **Mouse Wheel Event**: The `mouseWheel()` function is called when the scroll wheel is rotated. The event object passed to this function tells you the direction and amount of the scroll. It's perfect for zooming in and out or scrolling through menus!

<details markdown="1">
<summary>MicroSim: Interactive Map Panning and Zooming</summary>
**Objective**: Create a large grid or image that the user can navigate using drag and scroll.
**Elements**:
- A large grid drawn on the screen.
- Use the **Mouse Dragged Event** to update an offset variable, moving the grid around.
- Use the **Mouse Wheel Event** to update a scale variable, zooming the grid in and out.
**Interaction**: The user clicks and drags to pan the map, and uses the scroll wheel to zoom.
</details>

## Part 3: The Massive Button Array (Keyboard Events)

The keyboard is a powerful input device because it has so many discrete buttons. In a video game context, you might use WASD for movement, Space to jump, and numbers for selecting weapons.

### Keyboard States

Just like with the mouse, we can check the current state of the keyboard.

- **Key Is Pressed Flag**: The `keyIsPressed` boolean variable is `true` if *any* key on the keyboard is currently held down. This is useful for knowing if the user is actively typing or holding a modifier key.

### Identifying the Key

When a key is pressed, we need to know *which* key it is. Processing provides two variables for this:

- **Key Variable Character**: The `key` variable stores the actual character of the most recently pressed key (e.g., 'a', 'A', '1', ' '). This is useful for detecting standard letter and number presses. Note that 'a' and 'A' are considered different characters!
- **Key Code Number**: Not all keys have characters (like the arrow keys, Shift, Enter, etc.). For these, we use the `keyCode` variable, which stores a numeric code representing the physical key on the keyboard. Processing provides handy constants like `UP`, `DOWN`, `LEFT`, `RIGHT`, `ENTER`, `SHIFT`, etc., to make checking these codes easier.

!!! mascot-warning "Key vs. KeyCode"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Always use `key` for printable characters (like 'a' or '1') and `keyCode` for special control keys (like `UP_ARROW` or `SHIFT`). Mixing them up can lead to confusing bugs!

### Keyboard Events

Keyboard events work exactly like mouse events, providing discrete triggers for our actions.

- **Key Pressed Event**: The `keyPressed()` function is called once the instant a key is pressed down. This is perfect for initiating movement, triggering an ability, or typing a character into a text box.
- **Key Released Event**: The `keyReleased()` function is called once the instant a key is let go. This is crucial for stopping movement. For example, if you press the 'W' key, your character starts moving forward. When the **Key Released Event** for 'W' fires, your character stops.
- **Key Typed Event**: The `keyTyped()` function is called when a key is pressed, but it ignores special keys like Shift, Ctrl, and Alt. It's specifically designed for text input, ensuring that holding Shift to type a capital letter doesn't trigger multiple events in confusing ways.

## Building the Ultimate Controller

By combining all of these concepts, you can build incredibly complex and responsive interaction systems. 

Imagine a spaceship game:
1. You use the **Mouse X Position** and **Mouse Y Position** to aim the ship's cannons.
2. You use the **Mouse Pressed Event** to fire a laser.
3. You use the **Key Pressed Event** to detect when the 'W' key is pressed to engage the thrusters.
4. You use the **Key Released Event** to turn the thrusters off.
5. You use the **Mouse Wheel Event** to cycle through different weapon types.

Every input from the user is captured, processed, and translated into an action on the screen. This is the essence of interactive programming!

## Deep Dive: The Logic of Dragging

Let's look at a very common interaction pattern: clicking and dragging an object. This requires coordinating several different events.

1. **Hover Detection**: First, we use `mouseX` and `mouseY` to check if the cursor is hovering over the object. This is often called "hit testing".
2. **Grabbing**: When the **Mouse Pressed Event** occurs, we check if we were hovering over the object. If so, we set a boolean flag (e.g., `isDragging = true`) and calculate the offset between the mouse position and the object's origin.
3. **Dragging**: During the **Mouse Dragged Event**, if `isDragging` is true, we update the object's position to follow the mouse, applying the offset so it doesn't snap abruptly.
4. **Dropping**: Finally, when the **Mouse Released Event** occurs, we set `isDragging = false`, releasing the object.

This pattern demonstrates how individual events and variables are woven together to create a seamless user experience.

## Expanding Your Arsenal: Keyboard Combos

Just like in fighting games, you can create combo moves by tracking the sequence and timing of **Key Pressed Event**s. 

To do this, you might use an array to store the recent history of **Key Variable Character** presses. Every time a new key is pressed, you add it to the array and check if the recent sequence matches a specific combo pattern (e.g., UP, UP, DOWN, DOWN, LEFT, RIGHT). 

You'll also need to consider timing. If the player presses the keys too slowly, the combo shouldn't trigger. You can use the `millis()` function to record the time of each press and ensure they occur within a specific window.

## Conclusion

Sensing user input is what separates a passive animation from an interactive experience. By mastering mouse coordinates, button states, and keyboard events, you've unlocked the ability to create games, tools, and dynamic art that responds directly to the user's touch.

Remember the controller metaphor: your sketch is the console, and it's waiting for those signals. Now it's up to you to decide what those signals do!

!!! mascot-celebration "Level Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You've mastered the controller! Now go out there and build something truly interactive. The canvas is your playground!

## Extended Deep Dive: Understanding the Nuances of Event Sensing

To truly master the art of interactive programming, we need to explore the subtle nuances of each event and how they interact with one another. The video game controller metaphor is powerful, but a computer's input system is even more complex and versatile.

### The Anatomy of a Mouse Click

Consider the **Mouse Clicked Event**. It seems simple enough: the user clicks the mouse. But under the hood, a click is actually a sequence of distinct phases. First, the physical button is depressed. This triggers the **Mouse Pressed Event**. The computer registers this change in physical state. Then, there is a duration of time where the button remains down. During this time, the **Mouse Is Pressed Flag** is true. Finally, the user releases the button, springing it back to its original position. This triggers the **Mouse Released Event**. 

Only if the mouse has not moved significantly between the press and the release does the system officially register a **Mouse Clicked Event**. If the mouse *did* move, the system interprets it as a drag instead, firing the **Mouse Dragged Event** repeatedly during the movement. 

Understanding this sequence is crucial for building robust interfaces. For example, if you want a button to activate *only* when the user intentionally clicks it, you should bind your action to the **Mouse Clicked Event**. If you bind it to the **Mouse Pressed Event**, the action will trigger instantly, even if the user changes their mind, holds the button down, and drags their cursor away.

### The Intricacies of Keyboard Input

Keyboard input carries its own set of complexities. When you press and hold a key, you might expect a single **Key Pressed Event**. However, due to standard operating system behaviors, holding a key down often results in a "key repeat" feature. This means the **Key Pressed Event** might fire repeatedly as long as the key is held, rapidly registering the **Key Variable Character** over and over again.

This behavior is fantastic for typing a document (allowing you to hold the spacebar to insert many spaces), but it can be disastrous for a video game. If you bind a "jump" action to the **Key Pressed Event**, and the key repeats, your character might try to jump multiple times in rapid succession, leading to erratic physics or double-jumping glitches.

To circumvent this, game developers often rely on a combination of the **Key Pressed Event** and the **Key Released Event** to build their own custom state tracking. They might maintain a boolean array or a dictionary mapping each **Key Code Number** to a simple `true` or `false` state. 
1. When the **Key Pressed Event** fires for the 'W' key, they set `keys[W] = true`. 
2. The game loop constantly checks `keys[W]`. As long as it is true, the character moves forward.
3. Crucially, they ignore any subsequent **Key Pressed Event**s for 'W' if `keys[W]` is already true.
4. Finally, when the **Key Released Event** fires for 'W', they set `keys[W] = false`, stopping the movement.

This approach guarantees smooth, continuous movement regardless of the operating system's key repeat settings.

### Coordinating Multiple Inputs

The most sophisticated interactive experiences seamlessly blend mouse and keyboard inputs. Think of a first-person shooter or a complex 3D modeling application.

In these scenarios, the **Mouse X Position** and **Mouse Y Position** might control the camera angle or the direction a character is facing. The keyboard controls movement (forward, backward, strafing left and right). The **Mouse Button Value** determines actions (left click to interact or fire, right click to aim down sights or open a context menu).

Achieving this harmony requires careful architecture in your code. You must ensure that the logic handling the **Mouse Moved Event** does not interfere with the logic handling the **Key Is Pressed Flag**. Often, this means separating input gathering from game logic execution. In the `draw()` loop, you simply check the current state of all inputs (gathered by the various event functions) and then calculate the next frame based on that unified snapshot of the input state.

### Advanced Mouse Movement: Delta vs. Absolute

We've discussed absolute positioning using `mouseX` and `mouseY`, and relative positioning using **Previous Mouse X PmouseX** and **Previous Mouse Y PmouseY**. This relative movement is often called "delta" movement (representing the change in position).

In certain applications, particularly 3D environments, delta movement is far more important than absolute position. Imagine a first-person view where dragging the mouse rotates the camera. If you rely on absolute position, you are limited by the edges of the screen. Once the cursor hits the edge of the monitor, you can't rotate the camera any further in that direction!

To solve this, developers use techniques to "lock" or "capture" the cursor to the center of the screen. When the cursor is locked, the operating system still tracks its movement, but prevents it from actually leaving the center. The application then relies entirely on the delta values (calculated using **Previous Mouse X PmouseX** and **Previous Mouse Y PmouseY** before the cursor is forcibly reset) to rotate the camera infinitely in any direction.

### The Role of Bounding Boxes

We mentioned "hit testing" earlier. This is the process of determining if a geometric shape (usually representing the mouse cursor) intersects with another geometric shape (representing an interactive object like a button or a game character).

The simplest and most common form of hit testing uses an Axis-Aligned Bounding Box (AABB). An AABB is a rectangle defined by its top-left corner coordinates and its width and height.

To check if the **Mouse X Position** and **Mouse Y Position** are inside a button's AABB, you must perform four simultaneous logical checks:
1. Is `mouseX` greater than the button's left edge?
2. Is `mouseX` less than the button's right edge (left edge + width)?
3. Is `mouseY` greater than the button's top edge?
4. Is `mouseY` less than the button's bottom edge (top edge + height)?

If all four of these conditions are true simultaneously, the cursor is hovering over the button. You can combine this logic with the **Mouse Pressed Event** to create fully functional, custom UI elements from scratch!

### Beyond the Basics: Touch Events

While this chapter focuses on the mouse and keyboard, the principles you are learning apply directly to modern touch interfaces. A tap on a smartphone screen is conceptually identical to a **Mouse Clicked Event**. A swipe is a translation of the **Mouse Dragged Event**. Pinch-to-zoom is an evolution of the **Mouse Wheel Event**.

By building a strong foundation in handling discrete events and continuous states, you are preparing yourself to develop software for any platform, from traditional desktop computers to the latest mobile devices and tablets. The controller might change shape, but the logic of interaction remains remarkably consistent.
