# Quiz: Generative Typography & Vector Font Outlines

Test your understanding of Text rendering, textBounds(), loadFont(), Opentype.js font paths, and particle-based letterforms with these review questions.

---

#### 1. Which function renders text characters directly onto the p5.js canvas?

<div class="upper-alpha" markdown>
1. text(str, x, y, [x2], [y2])
2. drawText(str, x, y)
3. printText(str, x, y)
4. write(str, x, y)
</div>

??? question "Show Answer"
    The correct answer is **A**. `text(str, x, y)` draws text strings onto the canvas at the specified anchor coordinates. Options B, C, and D are not p5.js drawing functions.

    **Concept Tested:** Text Drawing Function

---

#### 2. Which method of a `p5.Font` object extracts an array of coordinate points along the vector outline of a text string?

<div class="upper-alpha" markdown>
1. font.textToPoints(txt, x, y, fontSize, [options])
2. font.getOutlinePoints(txt)
3. font.vectorize(txt)
4. font.samplePoints(txt)
</div>

??? question "Show Answer"
    The correct answer is **A**. `font.textToPoints(txt, x, y, fontSize, options)` returns an array of `{x, y, alpha}` point objects outlining the letterforms, enabling particle typography, swarming text, and generative deformers. Options B, C, and D are not p5.Font methods.

    **Concept Tested:** Font Text To Points

---

#### 3. What parameter in `textToPoints()` options controls the spacing density between sampled points along the glyph path?

<div class="upper-alpha" markdown>
1. density
2. sampleFactor
3. stepSize
4. pointResolution
</div>

??? question "Show Answer"
    The correct answer is **B**. `sampleFactor` (default 0.1) defines the density of points sampled along the path. Increasing `sampleFactor` to 0.5 produces tightly spaced points; decreasing it produces sparse points. Options B, C, and D are incorrect.

    **Concept Tested:** Sample Factor Density

---

#### 4. Which p5.js function sets the horizontal and vertical alignment anchors for rendered text (e.g. `textAlign(CENTER, CENTER)`)?

<div class="upper-alpha" markdown>
1. textAnchor(align)
2. textAlign(horizAlign, [vertAlign])
3. textJustify(align)
4. textOrigin(align)
</div>

??? question "Show Answer"
    The correct answer is **B**. `textAlign(horizAlign, [vertAlign])` sets text baseline alignment relative to the `(x, y)` coordinate (constants include `LEFT`, `CENTER`, `RIGHT`, `TOP`, `BASELINE`, `BOTTOM`). Options B, C, and D are not p5.js functions.

    **Concept Tested:** Text Align Alignment

---

#### 5. How do you calculate the exact bounding box rectangle `{x, y, w, h}` enclosing a text string before drawing it?

<div class="upper-alpha" markdown>
1. text.getBounds(str)
2. font.textBounds(str, x, y, fontSize)
3. boundingBox(str)
4. textSize(str)
</div>

??? question "Show Answer"
    The correct answer is **B**. `font.textBounds(str, x, y, fontSize)` returns an object `{x, y, w, h}` describing the exact bounding box rectangle of the rendered text string. Options B, C, and D are incorrect.

    **Concept Tested:** Font Text Bounds

---

#### 6. Why must custom TrueType (.ttf) or OpenType (.otf) font files be loaded inside `preload()` using `loadFont()`?

<div class="upper-alpha" markdown>
1. Because web browsers do not support vector fonts
2. Because p5.js cannot render text without custom TTF fonts
3. Font files are binary network assets that must be fully parsed before drawing operations execute to prevent font rendering glitches
4. To compile typography into WebGL fragment shaders
</div>

??? question "Show Answer"
    The correct answer is **C**. Loading font files asynchronously in `preload()` ensures that font metrics, glyph curves, and kerning tables are fully buffered and ready before `setup()` and `draw()` run. Options B, C, and D are false.

    **Concept Tested:** Load Font Preload Lifecycle

---

#### 7. What generative animation technique is enabled by extracting vector points with `textToPoints()`?

<div class="upper-alpha" markdown>
1. The text is converted into audio frequency files
2. The text is automatically translated into foreign languages
3. Particles can home in toward text points, swarm, explode on mouse hover, and reassemble dynamically
4. The font is converted into raster bitmap images
</div>

??? question "Show Answer"
    The correct answer is **C**. Converting typography into discrete vector point coordinates enables physics particles to treat font points as steering targets, enabling kinetic effects like exploding text, magnetic displacement, and morphing letterforms. Options B, C, and D describe unrelated processes.

    **Concept Tested:** Generative Particle Typography

---

#### 8. What does the `textLeading()` function configure in p5.js typography?

<div class="upper-alpha" markdown>
1. The slant angle of italic text
2. The horizontal kerning space between adjacent characters
3. The vertical line spacing distance between lines of multi-line text
4. The font weight boldness
</div>

??? question "Show Answer"
    The correct answer is **C**. `textLeading(dist)` sets the vertical distance in pixels between consecutive lines of multi-line text strings. Option B describes letter spacing/kerning. Options C and D describe italic slant and font weight.

    **Concept Tested:** Text Leading Line Spacing

---

#### 9. How do you morph one word (e.g. 'ART') into another word (e.g. 'CODE') using `textToPoints()`?

<div class="upper-alpha" markdown>
1. Call text() twice with different alpha transparency
2. Rotate the canvas 180 degrees
3. Apply a threshold image filter
4. Sample equal numbers of points for both words, then interpolate each particle's position using lerp()
</div>

??? question "Show Answer"
    The correct answer is **D**. Extracting point arrays for both words (normalizing them to equal lengths) allows autonomous particles to smoothly interpolate their `(x, y)` positions from target A to target B using `lerp()`. Options B, C, and D do not produce point-based morphing.

    **Concept Tested:** Typography Morphing Lerp

---

#### 10. Why does kinetic typography in creative coding provide unique communicative value compared to static text in graphic design?

<div class="upper-alpha" markdown>
1. Motion typography uses less internet bandwidth than plain text
2. Kinetic typography eliminates the need for visual font design
3. Kinetic text can only be viewed in virtual reality headsets
4. Dynamic motion, physical response, and algorithmic behavior infuse typography with emotion, interactivity, and temporal narrative
</div>

??? question "Show Answer"
    The correct answer is **D**. Integrating physics simulations, user interactivity, and audio reactivity transforms text from static information into expressive, narrative visual art. Options B, C, and D are false.

    **Concept Tested:** Kinetic Typography Expressiveness

---
