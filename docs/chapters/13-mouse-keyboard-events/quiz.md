# Quiz: Mouse & Keyboard User Event Sensing

Test your understanding of Mouse coordinates, pmouseX, mouse events, keyboard codes, and interactive event loops with these review questions.

---

#### 1. What do the system variables `pmouseX` and `pmouseY` store in p5.js?

<div class="upper-alpha" markdown>
1. The mouse position coordinates from the immediately preceding frame
2. The future predicted mouse coordinates for the next frame
3. The physical pixel density of the mouse hardware
4. The coordinates where the mouse was first clicked
</div>

??? question "Show Answer"
    The correct answer is **A**. `pmouseX` and `pmouseY` record the mouse position from the previous frame. Comparing them to current `mouseX` and `mouseY` enables velocity calculation and continuous line drawing with `line(pmouseX, pmouseY, mouseX, mouseY)`. Options A, C, and D are incorrect.

    **Concept Tested:** Previous Mouse Coordinates

---

#### 2. Which built-in boolean variable evaluates to `true` whenever the user is actively pressing any mouse button?

<div class="upper-alpha" markdown>
1. mouseIsPressed
2. mouseClicked
3. mouseState
4. isMouseDown
</div>

??? question "Show Answer"
    The correct answer is **A**. `mouseIsPressed` is a built-in boolean variable that is `true` while a mouse button is held down and `false` otherwise. Options B, C, and D are not the built-in p5.js boolean state variable.

    **Concept Tested:** Mouse Is Pressed Flag

---

#### 3. What is the fundamental behavioral difference between the `mouseIsPressed` polling variable and the `mousePressed()` event function?

<div class="upper-alpha" markdown>
1. mouseIsPressed only works on mobile devices
2. mouseIsPressed is checked continuously inside draw(), while mousePressed() is an asynchronous event handler triggered only once per click
3. mousePressed() cannot read mouse coordinates
4. mouseIsPressed freezes the sketch when clicked
</div>

??? question "Show Answer"
    The correct answer is **B**. Polling `mouseIsPressed` inside `draw()` checks continuous button hold state on every frame, whereas `mousePressed()` is an event listener that executes exactly once per discrete click event. Options B, C, and D are incorrect.

    **Concept Tested:** Polling vs Event Handler

---

#### 4. To draw a continuous brush stroke that follows the mouse cursor without gaps when moving quickly, which line of code is used in `draw()`?

<div class="upper-alpha" markdown>
1. point(mouseX, mouseY);
2. line(pmouseX, pmouseY, mouseX, mouseY);
3. rect(mouseX, mouseY, 10, 10);
4. ellipse(pmouseX, pmouseY, 5, 5);
</div>

??? question "Show Answer"
    The correct answer is **B**. Because fast mouse motion moves multiple pixels per frame, drawing disconnected points leaves gaps. Connecting `(pmouseX, pmouseY)` to `(mouseX, mouseY)` with a `line()` creates an unbroken continuous stroke. Options B, C, and D leave gaps.

    **Concept Tested:** Continuous Brush Drawing

---

#### 5. Which event function is triggered whenever a key on the keyboard is pressed down?

<div class="upper-alpha" markdown>
1. keyTyped()
2. keyPressed()
3. keyReleased()
4. keyHold()
</div>

??? question "Show Answer"
    The correct answer is **B**. `keyPressed()` is called once every time a key is pressed down. `keyReleased()` runs when released. `keyTyped()` ignores special modifier keys. `keyHold()` is not a p5.js function.

    **Concept Tested:** Key Pressed Event

---

#### 6. What system variable contains the ASCII character string of the most recently typed key?

<div class="upper-alpha" markdown>
1. keyChar
2. keyCode
3. key
4. keyString
</div>

??? question "Show Answer"
    The correct answer is **C**. The system variable `key` contains the single-character string (e.g. `'a'`, `'B'`, `'1'`) of the most recent key press. `keyCode` stores numeric codes for special keys like `LEFT_ARROW` or `ENTER`.

    **Concept Tested:** Key System Variable

---

#### 7. How do you detect if the user pressed the Up Arrow key inside `keyPressed()`?

<div class="upper-alpha" markdown>
1. if (key === UP_ARROW)
2. if (key === 'UP')
3. if (keyCode === UP_ARROW)
4. if (keyCode === 'up')
</div>

??? question "Show Answer"
    The correct answer is **C**. Non-character special keys (such as arrow keys, SHIFT, CONTROL, ENTER) are identified by checking `keyCode` against p5.js constants like `UP_ARROW`. Option B and C are incorrect syntax.

    **Concept Tested:** Key Code Special Keys

---

#### 8. Which function is called when the mouse wheel is scrolled, allowing zoom or scrolling interactions?

<div class="upper-alpha" markdown>
1. wheelDelta()
2. mouseScrolled()
3. mouseWheel(event)
4. scrollEvent()
</div>

??? question "Show Answer"
    The correct answer is **C**. `mouseWheel(event)` is triggered by scroll wheel movements. The `event.delta` property indicates scroll direction and magnitude. Options B, C, and D are not p5.js event functions.

    **Concept Tested:** Mouse Wheel Event

---

#### 9. Why is circular hit detection `dist(mouseX, mouseY, circleX, circleY) < radius` computationally cleaner than rectangular bounding box checks for round buttons?

<div class="upper-alpha" markdown>
1. Circular detection prevents double-clicking
2. dist() executes on GPU hardware
3. Bounding box math requires matrix inversion
4. It measures Euclidean distance from the center point regardless of approach angle, whereas bounding boxes falsely trigger on corners
</div>

??? question "Show Answer"
    The correct answer is **D**. A circle's boundary is defined by constant radial distance from its center. Checking distance accurately identifies clicks inside the circle and ignores the empty corners of its rectangular bounding box. Options B, C, and D are false.

    **Concept Tested:** Circular Button Hit Detection

---

#### 10. To prevent the browser from executing its default action (such as scrolling the page when pressing space or arrow keys), what should an event function return?

<div class="upper-alpha" markdown>
1. return -1;
2. return true;
3. return null;
4. return false;
</div>

??? question "Show Answer"
    The correct answer is **D**. Returning `false` from a p5.js event callback function (like `keyPressed()` or `touchMoved()`) cancels the default browser event behavior, preventing unwanted page scrolling. Options B, C, and D do not suppress default browser actions.

    **Concept Tested:** Prevent Default Browser Action

---
