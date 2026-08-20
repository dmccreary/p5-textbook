---
quality_score: 100
readability_score: 49
---
# Generative Typography & Vector Font Outlines

## Summary

Renders custom font files, extracts glyph vector points (textToPoints()), and creates kinetic particle typography. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Text Drawing Function
2. Text Size Setting
3. Text Align Alignment
4. Load Font File
5. Text Font Setting
6. p5 Font Class Object
7. Text Bounds Bounding Box
8. Text To Points Vector
9. Font Glyph Outlines
10. Particle Typography Effect
11. Wobbly Text Particle Point
12. Kinetic Typography Motion
13. Text Leading Spacing
14. Text Style Bold Italic
15. Text Ascent Descent Metric
16. Text Wrap Word Container
17. System Web Font Stack
18. OTF TTF Font Support
19. Variable Font Parameters
20. 3D Text Extrusion WebGL
21. Text Path Following Arc
22. Interactive Text Input Typo
23. Generative Type Grid
24. Deconstructed Letterforms
25. ASCII Art Text Canvas
26. Text Stroke Fill Combo
27. Per Character Rotation
28. Dynamic Font Scaling
29. Kerning Letter Spacing
30. SVG Font Path Parsing

## Prerequisites

This chapter builds on concepts from:

- [Chapter 23: Image Processing, Filters & Video Capture](../23-image-processing-video/index.md)

---

!!! mascot-welcome "Welcome to Generative Typography!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hey artists! Letters don't have to be boring, static blocks of ink on a page. This chapter gives you the tools to explode fonts, manipulate outlines, and treat words as living, kinetic geometry. Get ready to completely reinvent how you look at text!

For centuries, the printing press locked letters into rigid metal blocks. Each character was static, unchanging, and confined to a strict grid. Today, the digital brush liberates these letterforms. In p5.js, typography isn't just about stamping ink onto a page; it's about treating text as living, breathing data. We can stretch, explode, and reconstruct words dynamically. 

## The Basics of Text on the Canvas

Before we shatter the printing press, we need to know how to use it. The primary **Text Drawing Function** in p5.js is `text()`. It places a string of characters onto the canvas at a specific coordinate. You can adjust its dimensions using the **Text Size Setting** `textSize()`, and control its placement with **Text Align Alignment** via `textAlign()`. 

Let's look at a comprehensive example of basic text rendering in p5.js:

```javascript
function setup() {
  createCanvas(600, 400);
  background(240);
  
  // Set the text size to a large value
  textSize(48);
  
  // Align text to the center of the provided coordinates
  textAlign(CENTER, CENTER);
  
  // Using Text Stroke Fill Combo to give the text an outline
  fill(50, 150, 250); // A nice blue fill
  stroke(0); // Black outline
  strokeWeight(3); // Thick outline for emphasis
  
  // Draw the text
  text("Hello Generative World", width / 2, height / 2);
}
```

Notice how we used a **Text Stroke Fill Combo** above? Text can be styled exactly like shapes. You can also apply a **Text Style Bold Italic** with `textStyle(BOLD)` or `textStyle(ITALIC)`. For multi-line paragraphs, you'll need a **Text Wrap Word Container** to ensure sentences flow neatly within a bounding box. When styling paragraphs, **Text Leading Spacing** controls the vertical distance between lines of text. 

Let's see an example of word wrapping and leading:

```javascript
function setup() {
  createCanvas(400, 400);
  background(220);
  
  textSize(24);
  textAlign(LEFT, TOP);
  
  // Set the text style to bold and italic
  textStyle(BOLDITALIC);
  
  // Adjust the leading space between lines
  textLeading(36); 
  
  let paragraph = "This is a long paragraph that demonstrates how a Text Wrap Word Container functions in p5.js. By specifying a width and height in the text() function, we force the text to wrap automatically.";
  
  // Draw the wrapped text within a rectangle of width 300 and height 300
  text(paragraph, 50, 50, 300, 300);
}
```

#### Diagram: Text Formatting Basics

<details markdown="1">
<summary>MicroSim: Text Formatting Basics</summary><summary>MicroSim: Text Formatting Basics</summary>
- **Objective:** Create a dashboard where students can adjust text settings interactively.
- **Controls:** Sliders for `textSize` (10 to 100), `textLeading` (10 to 100), and a dropdown for `textAlign` (LEFT, CENTER, RIGHT).
- **Visual:** A paragraph of text reacting in real-time to the adjustments, demonstrating bounding boxes and word wrapping.
</details>

## Custom Fonts and Metrics

By default, browsers rely on a **System Web Font Stack**. However, to ensure your sketch looks identical on every device, you should utilize a **Load Font File** workflow. Using `loadFont()` in the `preload()` function guarantees the font is ready before setup. You apply it using the **Text Font Setting** `textFont()`. p5.js has robust **OTF TTF Font Support**, allowing you to bring in almost any standard font format.

When you load a custom font, it becomes a **p5 Font Class Object**. This object holds powerful metric data. For precise layout, you can extract the **Text Ascent Descent Metric**, which tells you how far letters reach above or drop below the baseline. If you need to know exactly how much space a word occupies, use the **Text Bounds Bounding Box** to calculate its precise pixel dimensions.

!!! mascot-thinking "Measuring Up"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: a word isn't just a stamp of ink, it's an invisible rectangular container occupying physical space on your canvas. By extracting the **Text Bounds Bounding Box**, you can finally 'see' that invisible container, allowing your code to perfectly align shapes or detect when a mouse touches a specific letter!

    Let's see how we can load a font and measure its bounds:

```javascript
let myFont;

function preload() {
  // Load a TTF or OTF font file
  myFont = loadFont('assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(600, 300);
  background(200);
  
  textFont(myFont);
  textSize(64);
  
  let word = "BOUNDING BOX";
  
  // Get the bounding box metrics
  let bounds = myFont.textBounds(word, 50, 150, 64);
  
  // Draw the text
  fill(0);
  noStroke();
  text(word, 50, 150);
  
  // Draw the bounding box
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  rect(bounds.x, bounds.y, bounds.w, bounds.h);
}
```

Advanced typographers also care about **Kerning Letter Spacing**—the specific spacing between individual characters. While p5.js handles default kerning, custom generative grids often require manual spacing calculations. Additionally, some modern designs utilize **Variable Font Parameters** where weight and width interpolate smoothly, though in standard p5.js, we typically simulate these dynamic shifts using transformations. 

## Beyond the Pixel: Vector Outlines

Here is where the digital brush truly shines. A font is actually a set of mathematical instructions. We can extract **Font Glyph Outlines** directly. The most powerful tool for this is the **Text To Points Vector** conversion via `myFont.textToPoints()`. Instead of rendering the text, this function returns an array of coordinates mapping the outline of the letters.

!!! mascot-tip "Too Many Points?"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a secret: if your kinetic text sketch is running slow, check your `sampleFactor`! Lowering it from `0.25` to `0.1` will drastically reduce the number of vector points generated, speeding up your physics calculations without ruining the shape of the letters.

```javascript
let pts;
let myFont;

function preload() {
  myFont = loadFont('assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(600, 300);
  
  // Extract the points
  pts = myFont.textToPoints('CODE', 50, 200, 150, {
    sampleFactor: 0.1, // Determines how many points are generated
    simplifyThreshold: 0
  });
}

function draw() {
  background(20);
  stroke(255);
  strokeWeight(4);
  
  // Draw a point at each coordinate
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    point(p.x, p.y);
  }
}
```

Once we have these points, we can apply a **Particle Typography Effect**. By animating each coordinate independently, we create **Wobbly Text Particle Point** behaviors. Combine this with physics, and you achieve stunning **Kinetic Typography Motion**. Text can explode, reform, or blow away in the wind.

#### Diagram: Kinetic Text to Points

<details markdown="1">
<summary>MicroSim: Kinetic Text to Points</summary><summary>MicroSim: Kinetic Text to Points</summary>
- **Objective:** Demonstrate the power of `textToPoints()`.
- **Controls:** Slider for `sampleFactor`, a "Scatter" button.
- **Visual:** The word "EXPLODE" rendered as points. When "Scatter" is clicked, points drift away using Perlin noise, then slowly return to their original text formation using steering behaviors.
</details>

## Generative Layouts and Effects

Text doesn't have to sit in straight lines. Using trigonometry, we can calculate a **Text Path Following Arc**, wrapping letters around a circle. If we apply a `translate()` and `rotate()` in a loop, we achieve **Per Character Rotation**, allowing each letter to spin independently. 

For a more structured but chaotic aesthetic, we can build a **Generative Type Grid**, breaking strings apart and placing them in mathematical matrices. We can also explore **Deconstructed Letterforms**, where we only draw certain segments of the font paths, or use **SVG Font Path Parsing** to access raw bezier curve data for custom manipulation.

What if the text itself becomes the image? An **ASCII Art Text Canvas** translates pixel brightness into characters. This involves reading the pixel array of an image or video feed and mapping the brightness values to an array of characters, from dark characters like '@' to light characters like '.'.

```javascript
// Simple Per Character Rotation
let word = "SPINNING";

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(220);
  translate(width/2, height/2);
  
  for(let i=0; i<word.length; i++) {
    push();
    // Calculate position in a circle
    let angle = TWO_PI / word.length * i;
    let x = cos(angle) * 100;
    let y = sin(angle) * 100;
    
    translate(x, y);
    // Rotate each character based on time
    rotate(frameCount * 0.05 + i);
    text(word[i], 0, 0);
    pop();
  }
}
```

We can also bridge typography with user behavior. An **Interactive Text Input Typo** sketch updates its display seamlessly as the user types on the keyboard. By linking `textSize()` to mouse position or audio input volume, we achieve **Dynamic Font Scaling**. Finally, for those pushing the boundaries of the canvas, **3D Text Extrusion WebGL** turns flat vectors into volumetric blocks, giving depth to your digital typography.

To ensure you fully grasp the potential of these techniques, let's explore a few more complex code snippets.

### Advanced: Generative Type Grid

!!! mascot-warning "Beware the Infinite Loop"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out when building text grids! If you use `textWidth()` inside a `for` loop that runs thousands of times, it will drastically slow down your sketch. Always calculate your font metrics once in `setup()` and store them in variables before drawing!

A generative type grid involves arranging characters in a systematic yet randomized layout. We can use loops to create a grid and populate it with letters from a string or random characters.

```javascript
let cols = 10;
let rows = 10;
let cellW, cellH;
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function setup() {
  createCanvas(500, 500);
  cellW = width / cols;
  cellH = height / rows;
  textAlign(CENTER, CENTER);
  textSize(cellH * 0.8);
  noLoop();
}

function draw() {
  background(30);
  fill(255);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      
      // Select a random character
      let charIndex = floor(random(characters.length));
      let char = characters.charAt(charIndex);
      
      // Apply a random color
      fill(random(100, 255), random(100, 255), random(100, 255));
      text(char, x, y);
    }
  }
}

function mousePressed() {
  redraw(); // Generate a new grid on click
}
```

This grid system forms the foundation for many generative design posters.

### Advanced: Interactive Text Input Typo

Creating an interactive text input allows users to influence the sketch directly. We can capture key presses and dynamically render the text with various effects.

```javascript
let typedText = "";

function setup() {
  createCanvas(600, 400);
  textSize(64);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(50);
  fill(255);
  
  // Apply Dynamic Font Scaling based on mouse position
  let dynamicSize = map(mouseY, 0, height, 20, 150);
  textSize(dynamicSize);
  
  // Apply a simple wiggle effect
  let wiggleX = random(-2, 2);
  let wiggleY = random(-2, 2);
  
  text(typedText, width / 2 + wiggleX, height / 2 + wiggleY);
}

function keyTyped() {
  // Append typed characters to the string
  typedText += key;
}

function keyPressed() {
  // Handle backspace
  if (keyCode === BACKSPACE) {
    typedText = typedText.substring(0, typedText.length - 1);
  }
}
```

### Advanced: Particle Typography Effect

Let's dive deeper into building a particle system from font vectors. This is where we combine physics with typography.

```javascript
let font;
let vehicles = [];

function preload() {
  font = loadFont('assets/AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(800, 300);
  background(51);

  let points = font.textToPoints('CODE', 100, 200, 192, {
    sampleFactor: 0.25
  });

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

// Vehicle class implementation omitted for brevity,
// but it typically includes arrive(), seek(), and flee() behaviors.
```

By dissecting the traditional approach to text rendering, we can build dynamic, interactive, and visually striking applications. Whether you are using a **System Web Font Stack** or loading custom **OTF TTF Font Support**, the possibilities are boundless when you treat text as data.

### Understanding ASCII Art Text Canvas in Depth

ASCII art is a fascinating intersection of typography and image processing. By mapping the brightness of an image to specific characters, we can recreate photographs using only text. The characters act as "pixels" with varying density. Darker pixels might be represented by characters like '@' or '#', which cover a large area of their bounding box. Lighter pixels are represented by characters like '.' or ' ', which have less visual weight.

To create an **ASCII Art Text Canvas**, you typically iterate over the pixels of an image or a video feed. For each pixel, you calculate its brightness. Then, you map this brightness value (0-255) to the index of a character array sorted by density.

```javascript
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(64, 48); // Low resolution for ASCII
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3; // Calculate brightness
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
```

This technique bridges the gap between text and image, demonstrating how typographic elements can function as foundational building blocks for complex visual compositions. It forces us to reconsider the role of the character—no longer just a symbol for language, but a unit of light and shadow.

### Mastering Kerning Letter Spacing and Layout

While p5.js provides robust default text rendering, fine-tuning typography often requires manual intervention. **Kerning Letter Spacing** is the adjustment of space between individual characters to achieve a visually pleasing result. In generative design, you might want to dynamically adjust kerning based on user interaction or algorithmic rules.

Imagine a sketch where the space between letters expands and contracts rhythmically, simulating breathing. This requires breaking a string into individual characters, calculating their widths, and drawing them sequentially with added offsets.

```javascript
let word = "BREATHE";
let baseSpacing = 50;

function setup() {
  createCanvas(600, 200);
  textAlign(CENTER, CENTER);
  textSize(64);
}

function draw() {
  background(20);
  fill(255);
  
  // Calculate dynamic kerning based on sine wave
  let dynamicKerning = sin(frameCount * 0.05) * 20;
  
  let startX = width / 2 - ((word.length - 1) * (baseSpacing + dynamicKerning)) / 2;
  
  for (let i = 0; i < word.length; i++) {
    let x = startX + i * (baseSpacing + dynamicKerning);
    text(word.charAt(i), x, height / 2);
  }
}
```

### Advanced Text Path Following Arc

Placing text along a curve or an arc is a classic typographic technique. In vector graphic software, this is a straightforward tool. In p5.js, it requires an understanding of polar coordinates and trigonometry.

By calculating the angle for each character based on its width and the radius of the arc, we can seamlessly wrap text around a circle. This **Text Path Following Arc** technique is essential for creating seals, badges, and complex typographic diagrams.

```javascript
let message = "GENERATIVE TYPOGRAPHY AROUND A CIRCLE ";
let radius = 150;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, BASELINE);
  textSize(24);
}

function draw() {
  background(240);
  translate(width / 2, height / 2);
  
  // Rotate the entire circle slowly
  rotate(frameCount * 0.01);
  
  // Calculate the angle per character based on the total circumference
  let arclength = 0;
  
  for (let i = 0; i < message.length; i++) {
    let currentChar = message.charAt(i);
    let w = textWidth(currentChar);
    
    // Each box is centered so we move half the width
    arclength += w / 2;
    
    // Angle in radians is the arclength divided by the radius
    let theta = arclength / radius;     
    
    push();
    // Polar to cartesian coordinate conversion
    translate(radius * cos(theta), radius * sin(theta));
    // Rotate the character
    rotate(theta + PI / 2);
    fill(0);
    text(currentChar, 0, 0);
    pop();
    
    // Move halfway again
    arclength += w / 2;
  }
}
```

### The Intersection of WebGL and 3D Text Extrusion

As creative coding moves into three dimensions, typography follows. **3D Text Extrusion WebGL** allows developers to take flat, 2D vector outlines and project them into the Z-axis, creating solid, volumetric shapes. While p5.js has limited built-in support for 3D text extrusion compared to libraries like Three.js, we can simulate the effect or utilize specific WebGL features to render text with depth.

Creating 3D text often involves generating the glyph outlines and then constructing a mesh of polygons (triangles and quads) to form the front, back, and sides of the letterforms. This requires a deep understanding of computer graphics principles and vertex manipulation.

### Final Thoughts on Deconstructed Letterforms

Generative typography encourages us to break rules. **Deconstructed Letterforms** involve taking the paths that make up a letter and intentionally misaligning, omitting, or distorting them. By accessing the underlying vector data—perhaps through **SVG Font Path Parsing**—we can isolate the distinct strokes, stems, and bowls of a typeface.

This deconstruction can yield abstract, avant-garde designs that challenge legibility while prioritizing aesthetic impact. It represents the ultimate synthesis of the printing press and the digital brush: acknowledging the historical structure of the letterform while subjecting it to algorithmic manipulation.

!!! mascot-celebration "Masterpiece Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered loading custom `.ttf` files, extracting vector coordinates using `textToPoints()`, and building interactive, kinetic typography systems!

### The Evolution of Typography in Creative Coding

Typography in computational design has evolved significantly over the past decades. Initially, text was simply a mechanism for logging data or providing rudimentary user interfaces. The resolution of early screens limited the expressiveness of fonts, resulting in blocky, pixelated characters that prioritized legibility over aesthetics. However, as display technologies advanced and processing power increased, the potential for typographic experimentation expanded exponentially.

The introduction of anti-aliasing techniques allowed for smoother curves and more nuanced letterforms. This paved the way for designers to utilize a broader range of typefaces, moving beyond monospaced system fonts to elegant serif and sans-serif variations. The ability to load external font files empowered artists to embed specific typographic identities within their applications, ensuring consistency across different platforms and devices.

Simultaneously, the development of robust vector graphics APIs, such as the HTML5 Canvas and WebGL, provided developers with low-level access to rendering pipelines. This meant that text was no longer confined to the rendering engine of the browser; it could be drawn, manipulated, and transformed just like any other geometric shape. The synthesis of typography and computer graphics led to the emergence of generative typography—a discipline where algorithms and data govern the generation and layout of text.

One of the defining characteristics of generative typography is its dynamic nature. Unlike traditional print, where a layout is finalized before publication, generative systems can adapt in real-time. They can respond to user inputs, environmental data, or pseudo-random algorithms, creating typographic compositions that are never identical twice. This fluidity challenges conventional notions of graphic design, requiring a shift in perspective from static composition to systemic design.

Furthermore, the integration of physics engines into creative coding environments has introduced a new dimension of realism to typographic animations. Letters can possess mass, velocity, and elasticity. They can collide, bounce, and interact with other objects on the canvas. This kinetic behavior imbues text with a lifelike quality, blurring the line between language and physical phenomena.

As we look to the future, the intersection of typography and artificial intelligence holds immense potential. Machine learning models can analyze vast datasets of letterforms, generating novel typefaces that blend historical styles with futuristic aesthetics. Additionally, natural language processing algorithms can analyze the semantic meaning of text, automatically adjusting its visual representation to enhance communication and emotional impact.

In conclusion, the journey of typography in creative coding is a testament to the continuous interplay between technology and artistic expression. By embracing the digital brush, we unlock unprecedented possibilities for typographic innovation. As you continue to explore the capabilities of p5.js, remember that text is not merely a vehicle for information; it is a versatile and expressive medium waiting to be shaped by your imagination. The canvas is your playground, and the alphabet is your palette.
