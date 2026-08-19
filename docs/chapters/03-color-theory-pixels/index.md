
---
quality_score: 100
readability_score: 54
---
# Color Theory, Color Modes & Pixel Manipulation

## Summary

Explores RGB, HSB, and HSL color models, alpha transparency, color interpolation, and direct pixel array operations. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 34 concepts from the learning graph:

1. RGB Color Space
2. RGBA Alpha Channel
3. HSB Color Space
4. HSL Color Space
5. Color Mode Setting
6. Fill Color Function
7. Stroke Color Function
8. Grayscale Value Syntax
9. Hex Color Code Strings
10. Web Named Color Strings
11. p5 Color Object
12. Red Channel Extraction
13. Green Channel Extraction
14. Blue Channel Extraction
15. Alpha Value Extraction
16. Hue Component Extraction
17. Saturation Extraction
18. Brightness Extraction
19. Color Interpolation Lerp
20. Palette Color Array
21. Complimentary Color Logic
22. Triadic Palette Generator
23. Load Pixels Function
24. Update Pixels Function
25. Pixels Array Indexing
26. Get Pixel Color
27. Set Pixel Color
28. Color Blend Modes
29. Multiply Blend Mode
30. Screen Blend Mode
31. Additive Color Mixing
32. Subtractive Color Mixing
33. Color Contrast Ratio
34. Color Accessibility Palette

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: 2D Primitive Shapes & Custom Geometries](../02-2d-primitive-shapes/index.md)

---

!!! mascot-welcome "Welcome to Chapter 3!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Palette here! Wireframes are fine, but let's be honest—color is where the real magic happens. This chapter will teach you how to paint with pure math and light, giving you the power to dynamically generate thousands of hues on the fly. Time to color outside the loops!

Welcome to Chapter 3! We are about to dive into one of the most vibrant, expressive, and fundamental aspects of digital art and creative coding: color and pixels. In our previous chapters, you learned the mechanics of drawing shapes—how to command the computer to plot points, draw lines, and render polygons on the digital canvas. But a world of only wireframes and black-and-white outlines can be a bit stark. Now, it's time to bring those geometries to life using the spectacular power of light and mathematics.

By the end of this chapter, you won't just be picking colors from a standard menu like you do in traditional painting software. You will be calculating colors. You will be dynamically generating thousands of unique hues on the fly, manipulating transparency, and diving straight into the microscopic, granular level of the screen itself to reprogram individual pixels. Grab your digital paintbrush, and let's turn on the lights.

---

### Part 1: Painting with Light

#### The Illusion of Paint vs. The Reality of Screens

When you were in elementary school art class, you were almost certainly taught the basics of mixing color using paint. You learned that the primary colors are red, blue, and yellow. You learned that if you mix red and yellow, you get orange. If you mix all the colors together, you get a muddy, dark brown or black. This real-world physical mixing process is known as **Subtractive Color Mixing**. 

It is called "subtractive" because of how physical pigments interact with light. A red apple looks red because its surface absorbs (or subtracts) all the blue and green light hitting it, reflecting only the red light into your eye. When you mix paints together, you are combining their light-absorbing properties. The more paint colors you mix together, the more wavelengths of light are subtracted from the reflection, and the darker the resulting puddle of paint becomes. 

However, computer screens, smartphones, tablets, and LED displays do not work with physical paint. They don't reflect light; they *emit* light. When you are coding in p5.js, you are not mixing pigments. You are quite literally painting with pure light.

If you take three flashlights—one projecting a red beam, one green, and one blue—and shine them all at the exact same spot on a dark wall, the overlapping center won't be dark brown. It will be pure, blinding white. This phenomenon is known as **Additive Color Mixing**. The more colors of light you add together, the brighter and closer to white the result becomes. 

#### The Standard Digital Canvas: **RGB Color Space**

Because screens are built using millions of microscopic light-emitting diodes that emit red, green, and blue light, the most fundamental and common way to represent color in the digital world is the **RGB Color Space**. RGB stands for Red, Green, and Blue. 

Imagine every single pixel on your computer monitor is actually a cluster of three incredibly tiny lightbulbs (subpixels): one red, one green, and one blue. By individually adjusting the brightness of each of these three tiny bulbs, the screen can trick your human eyes into seeing almost any color imaginable. 

In p5.js, the brightness of each of these three color channels is measured on a scale from `0` to `255`. 
- `0` means the light bulb is completely turned off.
- `255` means the light bulb is burning at maximum absolute brightness.

Why `255`? It all comes down to computer memory. Colors are typically stored using 8 bits of computer memory per channel. In binary math, 8 bits can hold exactly 256 different combinations (from 0 up to 255). 

So, if you want your shape to be painted pure, glowing red, you need to tell the computer: "Turn the red light up to 255, and keep the green and blue lights at 0."

In p5.js, we apply this inside color to a shape using the **Fill Color Function**, which is called `fill()`. To change the color of the outline or border around a shape, we use the **Stroke Color Function**, called `stroke()`.

```javascript
function draw() {
  // Pure Red Fill
  fill(255, 0, 0); 
  
  // Pure Green Outline
  stroke(0, 255, 0); 
  
  // Draw a rectangle
  rect(50, 50, 200, 200);
}
```

!!! mascot-thinking "The Spotlight Metaphor"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of `fill(255, 0, 0)` not as mixing paint, but as directing a microscopic lighting crew. You are commanding them to turn the red spotlight up to maximum brightness, while turning the green and blue spotlights completely off! This additive light model is the foundational architecture of every digital screen you've ever looked at.

What if you just want to draw something simple, like a black and white checkerboard or a stormy gray cloud? Sometimes you only want a shade of gray, varying purely from black to white with no color hue at all. For this, p5.js provides a convenient shortcut called the **Grayscale Value Syntax**. Instead of typing out three identical numbers like `fill(128, 128, 128)` to get a medium gray, you can just provide a single number: `fill(128)`. 
- `fill(0)` gives you pure black (all lights off).
- `fill(255)` gives you pure white (all lights on maximum).

#### Adding Transparency: The **RGBA Alpha Channel**

In the real world, not everything is solid. Glass, water, smoke, and tracing paper all allow light to pass through them. In digital graphics, we simulate this using transparency. We can easily draw shapes that are slightly see-through by adding a fourth number to our color functions. 

This fourth value is known as the **RGBA Alpha Channel**. The 'A' stands for Alpha, a mathematical term in computer graphics that dictates opacity. 

Just like the red, green, and blue values, the alpha value operates on a scale from 0 to 255 by default.
- An alpha of `0` is completely invisible, entirely transparent like clear glass.
- An alpha of `255` is completely solid, entirely opaque like a brick wall.
- An alpha of `127` is exactly halfway transparent.

If you wanted to draw a transparent blue square over a red circle to see how they mix, you would use four numbers: `fill(0, 0, 255, 127)`.

#### Alternative Vocabularies: Hex and Named Colors

While typing out three numbers from 0 to 255 is the standard way a computer understands RGB, it can be a little annoying to remember that `255, 165, 0` makes orange. Sometimes, especially if you are working with web development or copying colors from a design program like Photoshop or Figma, you will want to use alternative ways of specifying color.

One extremely common method is using **Hex Color Code Strings**. These look like `"#FF5733"`. They are exact mathematical representations of RGB values, just written in a base-16 number system (hexadecimal) instead of our standard base-10 decimal system. In hex, `FF` is exactly equal to 255. In p5.js, you can pass these hex codes directly into your color functions, as long as you wrap them in quotation marks so the computer knows it is reading text (a string): `fill("#FF5733")`.

Alternatively, for quick sketching and prototyping, you can use **Web Named Color Strings**. There are over 140 standard color names built into all web browsers. These include simple names like `"red"` and `"blue"`, but also wonderfully specific names like `"tomato"`, `"cornflowerblue"`, `"goldenrod"`, `"papayawhip"`, and `"chartreuse"`.

```javascript
// Using a Web Named Color String
fill("cornflowerblue");

// Using a Hex Color Code String
stroke("#FFcc00");
```

<details>
<summary><strong>MicroSim: Additive Color Mixer</strong></summary>
<strong>Goal:</strong> Allow students to visually experiment with mixing Red, Green, and Blue light to see how Additive Color Mixing creates secondary colors and pure white.
<strong>Visualization:</strong> A stark black canvas background. In the center, three large overlapping circles—representing three colored spotlights (red, green, blue).
<strong>Interactivity:</strong> Below the canvas are three horizontal slider UI elements, each labeled and mapped from 0 to 255, controlling the intensity of the Red, Green, and Blue channels independently. As a student moves the sliders, the respective circles dynamically update their brightness. The overlapping regions in the center automatically compute the additive mixed color (e.g., full red + full green circles overlapping creates a bright yellow intersection).
<strong>Expected Insight:</strong> Students will see firsthand that mixing full red and green light creates yellow, a classic example of additive mixing, which usually surprises beginners who expect a muddy brown due to their intuition originating from physical paint.
</details>

---

### Part 2: Navigating the Color Wheel

#### A Better Compass: **HSB Color Space** and **HSL Color Space**

While the RGB color space makes absolute, perfect mathematical sense to a computer hardware engineer (since physical screens are built using red, green, and blue diodes), it is deeply unintuitive for a human artist trying to design a beautiful image. 

If I show you a pastel pink color on screen and say, "Make it slightly more yellow and a little bit darker," it is incredibly difficult to guess how to adjust the three RGB numbers to achieve that effect. Does adding more green make it yellow? Does lowering blue make it darker? The cognitive load of doing light-mixing math in your head is frustrating.

To make picking colors feel natural, organic, and mathematically predictable for humans, graphic designers rely on alternative color models: the **HSB Color Space** (Hue, Saturation, Brightness) or the closely related **HSL Color Space** (Hue, Saturation, Lightness).

By default, p5.js thinks in RGB. To change the way p5.js interprets the numbers you type, you must use the **Color Mode Setting** function at the top of your code, usually inside `setup()`: 

```javascript
function setup() {
  createCanvas(400, 400);
  // Change color interpretation to HSB
  // Max values: Hue 360, Saturation 100, Brightness 100
  colorMode(HSB, 360, 100, 100); 
}
```

Let's use a mental metaphor: think of the Color Wheel as a navigational compass. 

- **Hue**: This is the direction you are pointing on the compass. It is measured in degrees of a circle, from 0 to 360. `0` degrees points to Red. `120` degrees points to Green. `240` degrees points to Blue. Continuing all the way around to `360` brings you right back to Red. The hue determines the *actual color family* you are looking at.
- **Saturation**: This is how far you walk outward in that compass direction from the dead center. It is measured from `0` to `100` percent. If your saturation is `0`, you are standing directly in the center of the wheel where there is no color at all—only gray. If your saturation is `100`, you have walked all the way to the very outer edge of the wheel, and the color is as intensely vivid and pure as possible.
- **Brightness**: This is a measure of how much literal light is shining on the entire compass. It is also measured from `0` to `100`. A brightness of `0` means you are standing in a pitch-black room; the hue and saturation do not matter because you can't see anything—it's just pure black. A brightness of `100` means the color is fully illuminated.

In the HSB color space, making a color "more yellow" is gloriously easy. You don't have to balance red and green lights. You just turn your hue "compass" to 60 degrees. Making it "darker" just means lowering the brightness number.

<details>
<summary><strong>MicroSim: The Color Compass</strong></summary>
<strong>Goal:</strong> Visualize the HSB Color Space as an interactive navigational wheel, clearly separating hue from saturation and brightness.
<strong>Visualization:</strong> A large, circular color wheel on the left side of the screen, displaying a smooth gradient of all 360 hues around its circumference, fading to gray/white in the exact center. On the right, a tall vertical slider labeled "Brightness".
<strong>Interactivity:</strong> Students can click and drag a small reticle (crosshair) anywhere inside the circular wheel to simultaneously change the Hue (angle) and Saturation (distance from center). The selected color is displayed in a large preview box. They can independently drag the vertical brightness slider to see how lighting affects the chosen hue and saturation coordinate.
<strong>Expected Insight:</strong> Students will intuitively grasp that Hue is purely a geometric angle on a circle. This spatial understanding makes it very easy to transition into using mathematical formulas for color harmonies, like adding 180 degrees to find an exact opposite.
</details>

#### Algorithmic Harmony: Generating Palettes Dynamically

When designing a generative artwork, a user interface, or a data visualization, you rarely use just one single color. You need a collection of colors that look aesthetically pleasing when placed next to each other. In programming, we store these curated collections in a **Palette Color Array**, which is simply a structured list of colors that our code can systematically loop through.

Instead of manually picking five colors that look nice, we can generate these arrays dynamically on the fly using math! This is where the geometric angle nature of the HSB color wheel becomes a superpower.

For example, **Complimentary Color Logic** relies on the psychological and visual fact that colors located directly opposite each other on the color wheel create the highest vibrant contrast when paired together. If your base hue is defined by the variable `H`, its exact mathematical compliment is located directly across the circle at `(H + 180)`. Because a circle only has 360 degrees, we use the modulo operator `%` to make sure our math wraps around the circle like a clock. If we add 180 to a hue of 300, we get 480. `480 % 360 = 120`. So the compliment of 300 is 120!

Similarly, a **Triadic Palette Generator** will find three colors spaced perfectly evenly in a triangle around the wheel. If your base hue is `H`, the other two colors are located at `(H + 120) % 360` and `(H + 240) % 360`. 

```javascript
let baseHue = 45; // Golden Yellow
let triadic1 = (baseHue + 120) % 360; 
let triadic2 = (baseHue + 240) % 360;
// We now have a mathematically perfect 3-color palette!
```

Sometimes you don't want discrete, separate colors, but rather a smooth, sweeping transition from one color to another over time or space—like drawing a sunset sky gradient from orange to purple. To calculate these in-between colors, we use a function called `lerpColor()` for **Color Interpolation Lerp**. 

"Lerp" is a funny-sounding computer science abbreviation for "Linear Interpolation." You give the `lerpColor()` function a starting color, an ending color, and a fractional percentage (a number strictly between `0.0` and `1.0`), and it mathematically calculates the exact intermediate color sitting perfectly in between them.

```javascript
let colorStart = color(255, 0, 0); // Red
let colorEnd = color(0, 0, 255);   // Blue
// Find the color exactly 50% between red and blue
let blendedColor = lerpColor(colorStart, colorEnd, 0.5); 
```

---

### Part 3: The Microscopic Grid

#### The TV Screen Magnifying Glass: Direct Pixel Manipulation

Up until this point, we have been drawing shapes. We tell p5.js, "Draw a circle at coordinate X and Y with a radius of 50." And p5.js complies. But how does the computer actually do that? 

Imagine taking a powerful magnifying glass and pressing it right up against an old television screen or a modern LED monitor. You wouldn't see smooth, perfect circles anymore. You would see a massive, rigid, unyielding grid of tiny glowing rectangular dots. These dots are the pixels (short for "picture elements"). 

When you command p5.js to draw an `ellipse()`, the computer's graphics processor rapidly calculates exactly which tiny pixels in the grid fall inside the radius of the circle, and turns those specific pixels on. 

But what if we skip the shapes entirely? What if we bypass the high-level drawing commands and manipulate the individual pixels directly? This is where creative coding crosses over into image processing, allowing for static glitches, cellular automata, blur effects, and photo manipulation.

In p5.js, the visual canvas is ultimately just a grid of pixels. To gain access to this grid, we must use the **Load Pixels Function**, written as `loadPixels()`. This crucial command tells the p5.js engine to scan the entire canvas and copy the color data of every single pixel into a giant, specialized list called the `pixels` array. 

Once the data is loaded into the `pixels` array, we can use a `for` loop to write code that mathematically alters those numbers. However, altering the numbers in the array does not automatically change the screen! The array is just a staging area in the computer's memory. After we have finished making our mathematical changes to the array, we must call the **Update Pixels Function**, written as `updatePixels()`, to blast our modified data back onto the actual screen.

!!! mascot-warning "The Missing Bread Pitfall"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap when editing the pixel array is writing brilliant math but seeing absolutely nothing change on the canvas! This happens because the array is just temporary memory. To fix this, you must always "close the sandwich" by explicitly calling `updatePixels()` at the very end of your code block to push your changes to the screen.

#### Unraveling the Grid: **Pixels Array Indexing**

Here is the most mind-bending part of direct pixel manipulation: the `pixels` array is not a 2D grid of X and Y coordinates. It is a 1D list. It is a single, incredibly long, flat line of numbers in the computer's RAM. 

When the computer scans the 2D screen to create the array, it reads it like a book: starting at the top-left corner, reading all the pixels across the first row from left to right, then moving down to the second row, reading it left to right, and so on.

This structure requires a specialized mathematical formula to translate a 2D `(x, y)` coordinate into a 1D index location. We call this **Pixels Array Indexing**. 

Furthermore, every single pixel on the screen takes up *four sequential slots* in the array: one slot for Red, one for Green, one for Blue, and one for Alpha (RGBA). Even if you are working in HSB color mode, the underlying pixel array is *always* hard-coded in RGBA.

To find the exact starting index location for a specific pixel's red value at any given `(x, y)` coordinate, the formula is:
`let index = (x + y * width) * 4;`

Let's break that down. `y * width` skips over all the full rows of pixels above the one we want. `+ x` moves us across the current row to the specific column we want. And `* 4` multiplies the whole position by 4 because every single pixel requires four individual slots of memory.

!!! mascot-encourage "The Pixel Math Wall"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the formula `(x + y * width) * 4` feels incredibly overwhelming right now, take a deep breath. That's completely normal! Converting 2D space into 1D memory is one of the hardest concepts in creative coding. Don't worry about memorizing the formula—just copy and paste it until it clicks. You've got this!

Once you calculate the starting index, you can set the color values directly in the array memory:

```javascript
loadPixels();

let x = 50;
let y = 100;
let index = (x + y * width) * 4;

pixels[index]     = 255; // Red channel
pixels[index + 1] = 0;   // Green channel (next slot over)
pixels[index + 2] = 0;   // Blue channel (next slot over)
pixels[index + 3] = 255; // Alpha channel (next slot over)

updatePixels();
```

While this complex array-indexing formula is incredibly fast—allowing you to manipulate hundreds of thousands of pixels in milliseconds—p5.js also provides a much easier, albeit significantly slower, alternative. You can use the **Get Pixel Color** function (`get(x, y)`) to read a pixel, and the **Set Pixel Color** function (`set(x, y, color)`) to change a pixel. These are great for simple tasks where speed isn't critical, but for heavy image processing, the raw `pixels` array formula is mandatory.

<details>
<summary><strong>MicroSim: The Magnifying Glass Array Translator</strong></summary>
<strong>Goal:</strong> Visually demystify the relationship between the 2D screen coordinate system and the 1D flat memory architecture of the `pixels` array.
<strong>Visualization:</strong> The screen is split. On the left is a small 10x10 grid of brightly colored squares (representing a tiny 100-pixel canvas). On the right is a long, winding snake-like ribbon representing the 1D `pixels` array in computer memory, clearly segmented into groups of 4 slots (R, G, B, A).
<strong>Interactivity:</strong> The user hovers their mouse over any square on the 2D grid. Instantly, the corresponding 4 slots on the 1D memory ribbon light up. A dynamic text overlay displays the math in real-time: `(x + y * width) * 4`. As the mouse moves, the numbers change, proving exactly how the formula jumps through the memory slots.
<strong>Expected Insight:</strong> Students will overcome the initial intimidation of the pixel indexing formula by seeing a tangible, real-time visual proof of how a 2D image is unraveled into a flat 1D tape.
</details>

#### Deconstructing Colors: The **p5 Color Object**

When you use the high-level `get(x, y)` function, it doesn't return a simple number. It returns a **p5 Color Object**. This is a special type of data structure in p5.js that acts as a secure container holding all the color information for that pixel.

You cannot simply print a color object to the screen or use it in normal math equations directly. To look inside the container and read the individual data values out of this object, we must use dedicated extraction functions. 

If you want to know the RGB breakdown of the pixel, you can perform **Red Channel Extraction** using `red(c)`, **Green Channel Extraction** using `green(c)`, **Blue Channel Extraction** using `blue(c)`, and **Alpha Value Extraction** using `alpha(c)`. 

```javascript
let myPixelColor = get(50, 50); // Get a p5 Color Object
let amountOfRed = red(myPixelColor); // Extract just the red value
```

Even more powerfully, if you want to analyze an image in terms of human perception, you can use HSB extraction. Regardless of whether the original image was drawn in RGB, you can perform **Hue Component Extraction** using `hue(c)`, **Saturation Extraction** using `saturation(c)`, and **Brightness Extraction** using `brightness(c)` to analyze the color's properties. This is incredibly useful for writing code that, for example, tracks a brightly colored ball moving across a webcam video feed by constantly checking the `hue()` of the pixels!

---

### Part 4: Advanced Aesthetics and Empathy

#### Mathematical Overlaps: **Color Blend Modes**

In standard digital drawing, when you draw a blue circle and then draw a red square directly on top of it, the red square completely overwrites and hides the blue pixels underneath. This default behavior is called "Blend" mode. But what if we want the top layer to interact mathematically with the bottom layer, creating beautiful, complex optical effects? 

We can achieve this by invoking **Color Blend Modes**. By changing the blend mode using the `blendMode()` function before drawing our shapes, we alter the fundamental mathematical rules the computer uses to calculate overlapping pixel colors.

- **Multiply Blend Mode** (`blendMode(MULTIPLY)`): This mode mathematically multiplies the color values of the top layer with the bottom layer. Because the computer normalizes the color values to a scale between 0.0 and 1.0 under the hood, multiplying two fractions always results in a smaller fraction (e.g., 0.5 * 0.5 = 0.25). Therefore, the Multiply blend mode *always* results in a darker color. It perfectly simulates the physical effect of drawing with semi-transparent magic markers on paper, or layering pieces of colored stained glass on top of one another.
- **Screen Blend Mode** (`blendMode(SCREEN)`): This mode is essentially the opposite of Multiply. The math is slightly more complex: it inverts both layers, multiplies them, and then inverts the result. Visually, the result is *always* a brighter, lighter color. It brilliantly simulates the overlapping of brightly glowing lights in a dark room, like intersecting stage spotlights at a rock concert. 

Experimenting with different blend modes allows creative coders to generate rich, organic textures that feel less like computer graphics and more like natural physical phenomena.

#### Designing for Everyone: Color Contrast and Accessibility

As creative coders, developers, and artists, we have a profound responsibility to ensure that the art, tools, and interfaces we build are accessible and usable by everyone, regardless of their physical abilities. Color is a powerful tool for communication, but it can also be a massive barrier if used recklessly.

Approximately 8% of all men and 0.5% of all women worldwide experience some form of color vision deficiency (commonly referred to as color blindness). Furthermore, millions of people have low-vision conditions, or simply try to use their phones outdoors in bright, glaring sunlight. If your educational simulation relies entirely on a user being able to distinguish between a pale green dot and a pale red dot, a significant portion of your audience will not be able to use your software.

We evaluate the readability of visual elements using the **Color Contrast Ratio**. This is a mathematical formula that compares the luminance (the perceived brightness) of a foreground color (like text) against a background color. 

The contrast ratio is written as a fraction ranging from `1:1` up to `21:1`.
- A ratio of `1:1` means there is absolutely zero contrast. The text is the exact same brightness as the background. It is completely invisible.
- A ratio of `21:1` represents the maximum possible mathematical contrast in the digital world: pure black text on a pure white background.

The World Wide Web Consortium (W3C), which dictates global Web Content Accessibility Guidelines (WCAG), has strict recommendations for contrast ratios. For normal-sized text to be legally and ethically considered accessible, it must have a contrast ratio of at least `4.5:1` against its background. Large text (like big headers) needs a minimum ratio of `3.0:1`.

To be an inclusive and professional designer, you should always mathematically test your visual designs using contrast-checking tools. Furthermore, when designing data visualizations or complex UI, you should establish a **Color Accessibility Palette**. This means deliberately choosing a specific array of colors that maintain high contrast against each other *even when converted entirely to grayscale*. A good accessibility palette guarantees that you are never relying *only* on hue to convey critical information. Always pair color differences with variations in brightness, shape, or explicit text labels.

---

### Conclusion

Color in the world of creative coding is so much more than just picking a pretty shade from a dropdown menu. It is a profound blend of artistry, human psychology, and rigorous mathematics. 

From painting with pure, additive light in the RGB space, to navigating the intuitive angles of the HSB color wheel compass, to diving deep into the microscopic memory architecture of the 1D pixels array, you now have complete, granular control over every photon of light emitting from the screen. By mastering these 34 concepts, you have unlocked the ability to write algorithms that generate dynamic, mathematically harmonious, and ethically accessible visual experiences. 

You have learned to draw the shapes, and you have learned to light them up. In the next chapter, we will take these glowing, colored shapes and breathe the final element of life into them: movement over time!

!!! mascot-celebration "Illuminated!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered additive RGB mixing, the HSB color wheel compass, array interpolation, and the complex 1D math of direct pixel manipulation! You are officially painting with pure math and light.
