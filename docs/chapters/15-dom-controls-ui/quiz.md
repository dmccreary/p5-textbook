# Quiz: DOM Controls, Input Fields & UI Elements

Test your understanding of createButton(), createSlider(), createInput(), createSelect(), and DOM event handling with these review questions.

---

#### 1. Which p5.js function creates an HTML range slider user interface control?

<div class="upper-alpha" markdown>
1. createSlider(min, max, [value], [step])
2. newSlider(min, max)
3. makeRange(min, max)
4. sliderControl(min, max)
</div>

??? question "Show Answer"
    The correct answer is **A**. `createSlider(min, max, [value], [step])` instantiates an HTML `<input type='range'>` element on the page. Options B, C, and D are not p5.js DOM creation methods.

    **Concept Tested:** Create Slider Function

---

#### 2. How do you read the current numeric position of a slider element created with `let slider = createSlider(0, 255, 128);`?

<div class="upper-alpha" markdown>
1. slider.value()
2. slider.get()
3. slider.position
4. slider.val
</div>

??? question "Show Answer"
    The correct answer is **A**. Calling `slider.value()` returns the current value of the slider control. Options B, C, and D are incorrect property or method names.

    **Concept Tested:** Slider Value Method

---

#### 3. Which function instantiates an interactive clickable button element on the webpage?

<div class="upper-alpha" markdown>
1. newButton(label)
2. createButton(label)
3. makeButton(label)
4. buttonElement(label)
</div>

??? question "Show Answer"
    The correct answer is **B**. `createButton(label)` creates an HTML `<button>` element with the specified text label. Options B, C, and D are not p5.js DOM methods.

    **Concept Tested:** Create Button Function

---

#### 4. How do you bind a callback function `resetSketch` to execute whenever a button `btn` is clicked?

<div class="upper-alpha" markdown>
1. btn.onClick = resetSketch();
2. btn.mousePressed(resetSketch);
3. btn.attach(resetSketch);
4. btn.addEventListener('draw', resetSketch);
</div>

??? question "Show Answer"
    The correct answer is **B**. Calling `btn.mousePressed(callbackFunction)` attaches an event handler that runs whenever that specific DOM button is clicked. Notice the callback is passed by reference without parentheses `()`. Options B, C, and D are incorrect syntax.

    **Concept Tested:** DOM Button Callback

---

#### 5. What HTML dropdown menu element is created by calling `createSelect()` in p5.js?

<div class="upper-alpha" markdown>
1. `<dropdown>` menu
2. `<select>` with `<option>` child elements
3. `<input type='menu'>`
4. `<datalist>` list
</div>

??? question "Show Answer"
    The correct answer is **B**. `createSelect()` creates an HTML `<select>` dropdown menu. Options are added using `sel.option('Choice Name')`. Options B, C, and D do not represent the created HTML element.

    **Concept Tested:** Create Select Dropdown

---

#### 6. What function positions a p5.js DOM element at absolute pixel coordinates (x, y) on the web page?

<div class="upper-alpha" markdown>
1. element.coords(x, y)
2. element.locate(x, y)
3. element.position(x, y)
4. element.move(x, y)
</div>

??? question "Show Answer"
    The correct answer is **C**. `element.position(x, y)` sets the CSS absolute positioning coordinates (`left: x px; top: y px`) of the DOM element on the web page. Options B, C, and D are incorrect.

    **Concept Tested:** DOM Element Position

---

#### 7. Which event method executes continuously in real time as the user types characters into an input text box (`createInput()`)?

<div class="upper-alpha" markdown>
1. input.typed(callback)
2. input.changed(callback)
3. input.input(callback)
4. input.onKey(callback)
</div>

??? question "Show Answer"
    The correct answer is **C**. `input.input(callback)` fires immediately upon every keystroke, whereas `input.changed(callback)` fires only after the user presses Enter or leaves focus. Options C and D are not p5.js DOM methods.

    **Concept Tested:** DOM Input Realtime Event

---

#### 8. To remove an dynamically created DOM element from the webpage and free its resources, which method is called?

<div class="upper-alpha" markdown>
1. element.destroy()
2. element.delete()
3. element.remove()
4. element.hide()
</div>

??? question "Show Answer"
    The correct answer is **C**. `element.remove()` deletes the DOM element from the HTML document tree and unbinds its event listeners. `element.hide()` merely sets CSS display to none. Options B and C are invalid.

    **Concept Tested:** DOM Element Removal

---

#### 9. Why is building UI controls using native HTML/DOM elements (`createSlider`, `createButton`) often superior to drawing custom buttons manually with `rect()` and `dist()` on the canvas?

<div class="upper-alpha" markdown>
1. HTML sliders eliminate the need for JavaScript functions
2. HTML elements run directly inside the GPU rendering core
3. Canvas rect buttons cannot detect mouse clicks
4. Native HTML elements provide built-in keyboard accessibility, screen-reader support, mobile touch compatibility, and standardized styling
</div>

??? question "Show Answer"
    The correct answer is **D**. Native HTML elements adhere to web standards, offering out-of-the-box keyboard navigation (Tab/Enter), screen reader accessibility (ARIA), focus states, and native mobile controls that custom canvas drawings lack unless manually coded. Options B, C, and D are false.

    **Concept Tested:** DOM vs Canvas UI Accessibility

---

#### 10. Which p5.js function creates a multi-line text entry box rather than a single-line input field?

<div class="upper-alpha" markdown>
1. createMultiInput()
2. createInput()
3. createTextBox()
4. createElement('textarea')
</div>

??? question "Show Answer"
    The correct answer is **D**. `createElement('textarea')` creates a multi-line HTML `<textarea>` element, whereas `createInput()` creates a single-line `<input type='text'>`. Options C and D are not p5.js methods.

    **Concept Tested:** Create Text Area Element

---
