# Quiz: Color Theory, Color Modes & Pixel Manipulation

Test your understanding of Color spaces, RGB, HSB, alpha transparency, and direct pixel array operations with these review questions.

---

#### 1. What is the fourth parameter in `color(r, g, b, a)` or `fill(r, g, b, a)`?

<div class="upper-alpha" markdown>
1. Alpha transparency
2. Ambient lighting intensity
3. Aspect ratio multiplier
4. Angle of color rotation
</div>

??? question "Show Answer"
    The correct answer is **A**. The fourth parameter `a` represents the alpha channel (opacity/transparency), where 0 is fully transparent and 255 (by default) is completely opaque. Options A, C, and D do not represent the fourth parameter in p5.js color functions.

    **Concept Tested:** RGBA Alpha Channel

---

#### 2. What three color properties are configured when using `colorMode(HSB)`?

<div class="upper-alpha" markdown>
1. Hue, Saturation, Brightness
2. High, Saturation, Brightness
3. Hue, Shade, Blackness
4. Heat, Spectrum, Bloom
</div>

??? question "Show Answer"
    The correct answer is **A**. HSB stands for Hue (the color type on a 360-degree color wheel), Saturation (the purity or intensity of the color), and Brightness (the lightness/luminance from black to full color). Options A, C, and D are incorrect terms.

    **Concept Tested:** HSB Color Space

---

#### 3. How many values in the `pixels[]` array represent a single pixel on a standard density canvas?

<div class="upper-alpha" markdown>
1. 1 (grayscale index)
2. 4 (Red, Green, Blue, Alpha)
3. 3 (Red, Green, Blue)
4. 8 (32-bit floating point components)
</div>

??? question "Show Answer"
    The correct answer is **B**. In p5.js, the 1D `pixels[]` array stores four consecutive values (RGBA) between 0 and 255 for every single pixel. Option A is only true in single-channel buffers. Option B omits alpha. Option D is incorrect.

    **Concept Tested:** Pixel Array Structure

---

#### 4. What function must be invoked before reading from or writing to the `pixels[]` array to synchronize the canvas buffer?

<div class="upper-alpha" markdown>
1. updatePixels()
2. loadPixels()
3. getPixels()
4. bindPixels()
</div>

??? question "Show Answer"
    The correct answer is **B**. `loadPixels()` loads the current display pixel data into the `pixels[]` array so you can inspect or modify it. `updatePixels()` is called afterward to commit changes. Options C and D are not p5.js functions.

    **Concept Tested:** Load Pixels Function

---

#### 5. Given a canvas of width `w`, what is the mathematical formula to find the starting index `i` of pixel `(x, y)` in the `pixels[]` array?

<div class="upper-alpha" markdown>
1. i = (y + x * w) * 4;
2. i = (x + y * w) * 4;
3. i = (x * w + y) * 2;
4. i = (x + y) * w * 4;
</div>

??? question "Show Answer"
    The correct answer is **B**. Pixels are stored in row-major order. The pixel offset is `(x + y * w)`. Because each pixel takes 4 consecutive array slots (R, G, B, A), the starting index is `(x + y * w) * 4`. Options B, C, and D use incorrect indexing math.

    **Concept Tested:** Pixel Index Formula

---

#### 6. What is the primary advantage of HSB color space over RGB when creating generative rainbow palettes or cycling colors?

<div class="upper-alpha" markdown>
1. HSB requires half as much memory as RGB
2. HSB renders natively on monitors without color space conversion
3. Hue can be continuously incremented from 0 to 360 in a loop while keeping saturation and brightness constant
4. HSB automatically removes all shadows from rendered 3D objects
</div>

??? question "Show Answer"
    The correct answer is **C**. In HSB mode, cycling through the entire color spectrum requires incrementing a single numeric variable (Hue) while holding Saturation and Brightness stable. In RGB, multiple channels must change non-linearly. Options A, C, and D are false.

    **Concept Tested:** Color Palette Generation

---

#### 7. Which function disables drawing the fill interior of subsequent 2D shapes, leaving only the outline?

<div class="upper-alpha" markdown>
1. noStroke()
2. clear()
3. noFill()
4. transparent()
</div>

??? question "Show Answer"
    The correct answer is **C**. `noFill()` disables filling geometry with color so only outlines are drawn. `noStroke()` disables outlines. `clear()` clears the canvas pixels. `transparent()` is not a p5.js function.

    **Concept Tested:** Fill and Stroke State

---

#### 8. A sketch needs to blend between two colors `c1` and `c2` by an interpolation factor `amt = 0.5`. Which function should be used?

<div class="upper-alpha" markdown>
1. blendColor(c1, c2, 0.5);
2. mixColor(c1, c2, 0.5);
3. lerpColor(c1, c2, 0.5);
4. fadeColor(c1, c2, 0.5);
</div>

??? question "Show Answer"
    The correct answer is **C**. `lerpColor(c1, c2, amt)` calculates a color between two colors at a specific increment between 0.0 and 1.0. Options A, B, and D are incorrect function names in p5.js.

    **Concept Tested:** Linear Color Interpolation

---

#### 9. Why does modifying individual pixels via `pixels[]` inside nested loops execute significantly faster than calling `set(x, y, color)` repeatedly?

<div class="upper-alpha" markdown>
1. pixels[] compiles JavaScript code directly into WebAssembly
2. pixels[] runs directly on asynchronous web worker threads
3. set() always forces an immediate hardware screen refresh for every pixel call
4. Direct array index assignment avoids function call overhead and deferred synchronization
</div>

??? question "Show Answer"
    The correct answer is **D**. Directly indexing a flat typed array in memory avoids the overhead of thousands of function calls and internal validations per frame. `set()` incurs method call overhead. Options B, C, and D are inaccurate descriptions of p5.js architecture.

    **Concept Tested:** Pixel Performance Optimization

---

#### 10. An image brightness filter needs to calculate the grayscale value for a pixel with `[r, g, b]`. Which formula accurately models human perceptual luminance?

<div class="upper-alpha" markdown>
1. gray = (r + g + b) / 3;
2. gray = sqrt(r * g * b);
3. gray = max(r, g, b);
4. gray = r * 0.299 + g * 0.587 + b * 0.114;
</div>

??? question "Show Answer"
    The correct answer is **D**. The human eye is most sensitive to green and least sensitive to blue. Standard perceptual luminance weighting (such as ITU-R BT.601) uses `0.299 * R + 0.587 * G + 0.114 * B`. Option A is simple unweighted average. Options C and D are not standard luminance models.

    **Concept Tested:** Perceptual Luminance

---
