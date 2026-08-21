---
quality_score: 100
readability_score: 51
---
# DOM Controls, Input Fields & UI Elements

!!! mascot-welcome "Welcome Artists!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Palette here! Want to give your users a dashboard to play with your generative art? This chapter shows you how to build sliders, buttons, and text inputs right on top of your canvas. Let's turn your sketches into professional, interactive tools!

Imagine stepping into a professional recording studio or a live concert venue. What is the first thing that catches your eye? It is almost certainly the massive mixing desk—a glowing dashboard covered in hundreds of sliders, buttons, knobs, and dials. The audio engineer uses this interface to shape the music, tweaking the bass, raising the vocals, and adjusting the tempo in real-time. 

## The Mixing Desk Metaphor

Up until now, your p5.js sketches have been a bit like a pre-recorded track or an instrument that only responds to simple mouse clicks and keyboard presses. While mouse positions and keyboard events are fantastic for direct interaction, they can sometimes feel limiting. What if you want your users to choose a specific color from a palette, type in their name, select a mode from a list, or smoothly transition between different sizes using a sliding scale? 

To build these richer experiences, we need to build our own mixing desk. In the world of web development and p5.js, this mixing desk is constructed using the Document Object Model (DOM). The DOM is the structure of the web page itself. By using p5.js DOM libraries, we can create standard HTML controls—buttons, sliders, text inputs, dropdowns—and place them right alongside or over our sketch canvas. 

This chapter is your guide to building that dashboard. You will learn how to instantiate these controls, organize them neatly, style them to match your aesthetic, and wire them up so that every toggle, slide, and click immediately influences the generative artwork on your canvas. 

By the end of this journey, you'll be able to hand over the mixing desk to your audience, empowering them to become co-creators in your visual experiments.

## Creating Your First Interface Controls

Let's start by laying down the fundamental tracks of our mixing desk: buttons, sliders, and text boxes.

### **Create Button Element**

A button is the simplest and most decisive control. It waits patiently for a click, and when it happens, it triggers a specific action. In p5.js, you **Create Button Element** using the `createButton()` function. 

```javascript
let myButton;

function setup() {
  createCanvas(400, 400);
  // Create the button and give it a label
  myButton = createButton('Generate Shape');
  // Assign a function to trigger when pressed
  myButton.mousePressed(drawRandomShape);
}

function drawRandomShape() {
  fill(random(255), random(255), random(255));
  ellipse(random(width), random(height), 50, 50);
}
```

Buttons are excellent for actions that should happen instantaneously, like clearing the screen, saving an image, or triggering an explosion of particles.

!!! mascot-thinking "Hooking up the wires"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: the DOM interface and your p5.js canvas exist in two fundamentally different systems. A button doesn't intrinsically know about your sketch. Notice how we are establishing an architectural bridge—using event listeners to allow actions in the HTML world to safely mutate the state of the canvas world?

### **Create Slider Control**

While buttons are discrete (on or off, clicked or not), sliders represent a continuous range of values. They are the faders on our mixing desk. To **Create Slider Control**, we use the `createSlider(min, max, [default], [step])` function.

```javascript
let sizeSlider;

function setup() {
  createCanvas(400, 400);
  // min value 10, max value 200, default value 50
  sizeSlider = createSlider(10, 200, 50);
}

function draw() {
  background(220);
  // Use the slider's current value to determine size
  let currentSize = sizeSlider.value();
  ellipse(width/2, height/2, currentSize, currentSize);
}
```

Sliders are perfect for properties that require fine-tuning, such as the speed of an animation, the volume of a sound, the size of a brush, or the intensity of a light source.

### **Create Input Textbox**

Sometimes, you need the user to provide specific, open-ended information, like a name or a password. To **Create Input Textbox**, you use the `createInput()` function.

```javascript
let nameInput;

function setup() {
  createCanvas(400, 400);
  nameInput = createInput('Type your name here');
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(32);
  // Read the text from the input
  text("Hello, " + nameInput.value() + "!", width/2, height/2);
}
```

Input textboxes are essential for interactive stories, personalized greetings, and creating command-line-style interfaces within your sketches.

## Advancing the Dashboard: Complex Controls

Once you have mastered the basics, it's time to add more specialized modules to your mixing desk.

### **Create Select Dropdown**

When you want to offer the user a specific list of options to choose from, a dropdown menu is the most space-efficient choice. To **Create Select Dropdown**, we use the `createSelect()` function and then add options to it.

```javascript
let shapeSelector;

function setup() {
  createCanvas(400, 400);
  shapeSelector = createSelect();
  shapeSelector.option('Circle');
  shapeSelector.option('Square');
  shapeSelector.option('Triangle');
}

function draw() {
  background(220);
  let choice = shapeSelector.value();
  
  if (choice === 'Circle') {
    ellipse(200, 200, 100, 100);
  } else if (choice === 'Square') {
    rectMode(CENTER);
    rect(200, 200, 100, 100);
  } else if (choice === 'Triangle') {
    triangle(200, 150, 150, 250, 250, 250);
  }
}
```

Dropdowns are ideal for switching between different visual modes, selecting themes, or changing the underlying mathematical model of a simulation.

### **Create Checkbox Control**

A checkbox represents a simple boolean choice: true or false, yes or no. To **Create Checkbox Control**, you use `createCheckbox(label, [defaultState])`.

```javascript
let outlineCheckbox;

function setup() {
  createCanvas(400, 400);
  // Default is true (checked)
  outlineCheckbox = createCheckbox('Show Outlines', true);
}

function draw() {
  background(220);
  
  if (outlineCheckbox.checked()) {
    stroke(0);
    strokeWeight(4);
  } else {
    noStroke();
  }
  
  fill(255, 100, 100);
  ellipse(200, 200, 150, 150);
}
```

Checkboxes are great for toggling features like grid overlays, debug information, or specific visual effects.

!!! mascot-warning "Checked vs Value"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for undefined errors when reading checkboxes! Because a checkbox represents a boolean state rather than a continuous number or string, querying it with `.value()` will fail. To fix this and avoid broken logic, always use `.checked()` to verify if the box is ticked.

### **Create Radio Buttons**

If you have a small list of mutually exclusive options (where only one can be selected at a time) and you want them all visible at once, radio buttons are the way to go. To **Create Radio Buttons**, use `createRadio()`.

```javascript
let colorRadio;

function setup() {
  createCanvas(400, 400);
  colorRadio = createRadio();
  colorRadio.option('red', 'Red');
  colorRadio.option('green', 'Green');
  colorRadio.option('blue', 'Blue');
  colorRadio.selected('red'); // set default
}

function draw() {
  background(220);
  let col = colorRadio.value();
  fill(col);
  rect(100, 100, 200, 200);
}
```

Radio buttons are perfect for short option lists where visibility of all choices is more important than saving screen space.

### **Create Color Picker**

One of the most fun and visually satisfying controls is the color picker. It allows the user to browse a full spectrum of colors and select exactly the shade they want. To **Create Color Picker**, use `createColorPicker(defaultColor)`.

```javascript
let myColorPicker;

function setup() {
  createCanvas(400, 400);
  // Start with a default magenta color
  myColorPicker = createColorPicker('#ff00ff');
}

function draw() {
  // Use the chosen color to clear the background
  background(myColorPicker.value());
}
```

Color pickers immediately transform a static sketch into a vibrant, personalized digital canvas.

#### Diagram: The Generative Art Mixing Desk

<details markdown="1">
<summary>MicroSim Specification: The Generative Art Mixing Desk</summary><summary>MicroSim Specification: The Generative Art Mixing Desk</summary>

**Title**: The Generative Art Mixing Desk
**Goal**: Allow students to interact with multiple DOM controls simultaneously to see how they govern a complex visual system.

**Interface Layout**:
- A large canvas (600x400) on the right.
- A "Mixing Desk" panel on the left built using HTML elements.
- The panel contains:
  - A slider for `Shape Complexity` (number of vertices).
  - A color picker for `Primary Color`.
  - A dropdown select for `Motion Style` (Rotate, Pulse, Wobble).
  - A checkbox for `Wireframe Mode`.
  - A button to `Regenerate Seed`.

**Behavior**:
- The canvas draws a complex geometric mandala.
- Changing the slider immediately increases or decreases the geometry's vertices.
- The color picker changes the base stroke or fill color.
- The dropdown changes the mathematical function driving the animation loop.
- The checkbox toggles between `fill()` and `noFill()` with `stroke()`.
- The button resets the `randomSeed()` to generate a completely new structural pattern.

**Learning Outcome**: Students see how multiple discrete and continuous controls can harmoniously feed into a single `draw()` loop to create a rich, explorable possibility space.
</details>

## Structuring the Dashboard: HTML Elements

A mixing desk isn't just a pile of sliders on the floor; it's a carefully organized panel with labels, groupings, and instructional text. To build this structure in p5.js, we create standard HTML text and container elements.

### **Create Paragraph Tag**

To add blocks of text, instructions, or descriptions, you **Create Paragraph Tag** using `createP()`.

```javascript
function setup() {
  createCanvas(400, 200);
  createP('Use the controls below to modify the artwork. Have fun!');
  createSlider(0, 100, 50);
}
```
Paragraphs add necessary context to your UI.

### **Create Div Container**

A `<div>` is an invisible box used to group other elements together. It is essential for organizing layouts. To **Create Div Container**, use `createDiv()`.

```javascript
let controlPanel;

function setup() {
  // Create a container div
  controlPanel = createDiv();
  
  // Create a slider and put it INSIDE the div using .parent()
  let slider = createSlider(0, 100, 50);
  slider.parent(controlPanel);
}
```

Divs are the structural scaffolding of your mixing desk.

### **Create Span Text Inline**

While a paragraph creates a new block of text that drops down to the next line, a span is an inline element. It sits right next to whatever precedes it. To **Create Span Text Inline**, use `createSpan()`.

```javascript
function setup() {
  createSpan('Volume: ');
  createSlider(0, 100, 50);
}
```

Spans are perfect for labeling sliders and text inputs without breaking the layout.

### **Create Img Element**

Sometimes you need to display static images outside of your canvas, like a logo, an instructional diagram, or a decorative banner. To **Create Img Element**, use `createImg(src, alt)`.

```javascript
function setup() {
  // Adds an image to the page, not inside the canvas
  createImg('assets/logo.png', 'The Project Logo');
  createCanvas(400, 400);
}
```

## Designing the Panel: Position, Size, and Style

Having all the controls is great, but if they are scattered randomly on the page, the mixing desk will be unusable. We need to organize them.

### **DOM Element Position**

By default, DOM elements are placed one after another below your canvas. To take control, you can define the exact **DOM Element Position** using the `.position(x, y)` method.

```javascript
let myButton;
function setup() {
  createCanvas(400, 400);
  myButton = createButton('Click Me');
  // Place the button at exactly 50 pixels right and 50 pixels down from the top-left of the page
  myButton.position(50, 50); 
}
```

!!! mascot-tip "Absolute vs Relative"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want to place a DOM control perfectly over your sketch without guessing pixels? Store your canvas in a variable (`let cnv = createCanvas(...)`), then retrieve its top-left corner with `cnv.position()`. Add those `x` and `y` values to your button's position for perfect, dynamic alignment every time!

### **DOM Element Size**

You can also control the physical dimensions of your inputs. To adjust the **DOM Element Size**, use `.size(width, height)`.

```javascript
let giantButton;
function setup() {
  giantButton = createButton('GIANT BUTTON');
  giantButton.size(300, 100); // 300px wide, 100px tall
}
```

Sizing is crucial for making mobile-friendly interfaces where buttons need to be large enough to tap with a finger.

### **DOM Element Style CSS**

To truly make the interface your own, you can apply CSS (Cascading Style Sheets) directly to your elements. This is how you change fonts, colors, borders, and margins. To modify a **DOM Element Style CSS**, use the `.style('property', 'value')` method.

```javascript
let stylishButton;
function setup() {
  stylishButton = createButton('Fancy Click');
  stylishButton.style('background-color', 'magenta');
  stylishButton.style('color', 'white');
  stylishButton.style('font-size', '24px');
  stylishButton.style('border-radius', '10px');
}
```

CSS allows you to transform a boring default gray button into a sleek, customized UI component that matches your artistic vision.

### **DOM Element Class Add**

If you have many elements, applying `.style()` to each one individually becomes messy. Instead, you can define classes in a separate CSS file and apply them to your p5 elements. To do this, use **DOM Element Class Add** via `.addClass('className')`.

```javascript
// In your style.css file:
// .highlight-text { color: yellow; font-weight: bold; background: black; }

let myText;
function setup() {
  myText = createP('Pay attention to this!');
  myText.addClass('highlight-text');
}
```

Using classes keeps your code clean and allows you to update the look of your entire dashboard from one centralized CSS file.

#### Diagram: Interactive Image Gallery Filter

<details markdown="1">
<summary>MicroSim Specification: Interactive Image Gallery Filter</summary><summary>MicroSim Specification: Interactive Image Gallery Filter</summary>

**Title**: Interactive Image Gallery Filter
**Goal**: Demonstrate how HTML structures (divs, spans), positioning, and CSS styling work together to create a cohesive web application layout outside the canvas.

**Interface Layout**:
- An image element (`createImg`) displayed prominently in the center.
- Below it, a `<div>` container styled with CSS to look like a sleek, dark-mode control bar.
- Inside the control bar:
  - Several spans acting as labels.
  - Three sliders controlling CSS filter properties applied to the image: Blur, Sepia, and Invert.
  - A text input allowing the user to type an image URL to load a custom image into the `createImg` element.

**Behavior**:
- As the user moves the sliders, the `DOM Element Style CSS` of the image updates in real-time (e.g., `img.style('filter', 'blur(5px)')`).
- Typing a URL and pressing a "Load" button updates the `src` attribute of the image.

**Learning Outcome**: Students learn that p5.js can be used not just for drawing on a canvas, but for manipulating standard HTML elements and creating functional web apps.
</details>

## The Flow of Information

A mixing desk is a two-way street. The sliders control the sound, but motorized sliders also snap to positions when a preset is loaded. In UI design, we need to both read from and write to our controls.

### **DOM Element Value Get**

We've seen this throughout the chapter. Whenever you need to know what the user has done, you perform a **DOM Element Value Get** using the `.value()` method.

```javascript
let mySlider;
function setup() {
  mySlider = createSlider(0, 255, 100);
}
function draw() {
  // GETTING the value
  let gray = mySlider.value();
  background(gray);
}
```

### **DOM Element Value Set**

Conversely, if an event happens in your sketch and you want the interface to update to reflect it, you can push data back into the control. To perform a **DOM Element Value Set**, you pass an argument into `.value(newValue)`.

```javascript
let timeInput;
function setup() {
  createCanvas(400, 400);
  timeInput = createInput('');
}
function draw() {
  background(220);
  // SETTING the value programmatically
  timeInput.value(frameCount);
}
```

By dynamically setting values, you can create readouts, synchronized dashboards, and complex feedback loops between your generative code and the HTML interface.

!!! mascot-celebration "Master of the Dashboard!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work, artists! You just mastered instantiating DOM elements, styling them with CSS classes, and wiring their values directly into your canvas loops. You have successfully built a robust, interactive dashboard!

## Summary and Next Steps

In this chapter, we expanded our toolkit far beyond the canvas. We built a comprehensive UI dashboard—our mixing desk—using buttons, sliders, text inputs, dropdowns, checkboxes, radio buttons, and color pickers. We learned how to organize these controls using standard HTML structures like paragraphs, divs, and spans, and how to display images outside the sketch. 

Furthermore, we took command of the layout by manipulating DOM element position, size, and styling them with CSS and classes. Finally, we learned how to continuously read from and write to our interface components using get and set value methods. 

By integrating DOM controls, you invite your users to actively participate in your art. In the next phases of your learning journey, you will combine these UI concepts with complex data structures and external APIs, allowing your dashboards to control far more than just visual shapes—they will become the steering wheels for navigating the entire web!

[See Annotated References](./references.md)
