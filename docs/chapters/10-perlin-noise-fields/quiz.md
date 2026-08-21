# Quiz: Perlin Noise Landscapes & Vector Flow Fields

Test your understanding of Perlin noise, 1D/2D/3D noise, terrain generation, and vector flow fields with these review questions.

---

#### 1. Who invented Perlin Noise, and for what film visual effects work did he receive an Academy Award?

<div class="upper-alpha" markdown>
1. Ken Perlin, for visual effects in Tron (1982)
2. John Carmack, for Doom
3. Alan Turing, for Enigma morphing
4. Benoit Mandelbrot, for fractal compression
</div>

??? question "Show Answer"
    The correct answer is **A**. Ken Perlin developed Perlin Noise in 1983 while working on computer graphics for the movie Tron to overcome the unnatural, machine-like appearance of pure pseudo-random noise. Options B, C, and D are other pioneers.

    **Concept Tested:** Perlin Noise History

---

#### 2. What is the fundamental difference between `random()` and `noise()` in p5.js?

<div class="upper-alpha" markdown>
1. noise() produces smooth, continuous, naturally coherent transitions between adjacent coordinate inputs, whereas random() produces uncorrelated static
2. noise() returns values from -100 to +100, while random() returns 0 to 1
3. noise() is non-deterministic and cannot be seeded
4. random() only works on integers while noise() works on strings
</div>

??? question "Show Answer"
    The correct answer is **A**. Perlin noise is gradient/lattice noise that produces smooth, organic transitions where inputs close to each other produce outputs close to each other. `random()` produces completely independent, jagged outputs. Options A, C, and D are incorrect.

    **Concept Tested:** Smooth Noise Coherence

---

#### 3. What is the fixed output range of the p5.js `noise()` function?

<div class="upper-alpha" markdown>
1. From -1.0 to 1.0
2. From 0.0 to 1.0
3. From 0 to 255
4. From -Infinity to +Infinity
</div>

??? question "Show Answer"
    The correct answer is **B**. Unlike standard math sine waves or simplex implementations that range between -1 and 1, p5.js `noise()` is normalized to always return a float strictly between `0.0` and `1.0`. Options A, C, and D are incorrect ranges.

    **Concept Tested:** Noise Output Range

---

#### 4. What determines the 'roughness' or scale of details when sampling 2D Perlin noise across a grid?

<div class="upper-alpha" markdown>
1. The canvas width and height
2. The step increment size (frequency) added to x and y coordinates between samples
3. The current frameRate
4. The colorMode setting
</div>

??? question "Show Answer"
    The correct answer is **B**. Sampling noise with small coordinate increments (e.g. `x * 0.01`) produces smooth, gentle rolling hills, whereas larger increments (e.g. `x * 0.5`) sample distant points in the noise space, resulting in jagged roughness. Options B, C, and D do not dictate noise sampling frequency.

    **Concept Tested:** Noise Scale and Frequency

---

#### 5. How do you animate a 2D Perlin noise terrain over time?

<div class="upper-alpha" markdown>
1. Call randomSeed() inside draw()
2. Pass frameCount * speed as a third dimension input to noise(xoff, yoff, zoff)
3. Translate the canvas origin in WebGL mode
4. Invert the pixels[] array every frame
</div>

??? question "Show Answer"
    The correct answer is **B**. By passing a slowly incrementing time offset (such as `frameCount * 0.01`) as the 3rd parameter to `noise(xoff, yoff, timeOff)`, you sample consecutive 2D slices through 3D noise space, creating smooth continuous animation. Options B, C, and D are incorrect.

    **Concept Tested:** 3D Noise Time Slicing

---

#### 6. What function configures the number of octaves and falloff factor for Perlin noise calculations?

<div class="upper-alpha" markdown>
1. noiseOctaves(octaves, falloff)
2. noiseScale(octaves, falloff)
3. noiseDetail(octaves, falloff)
4. noiseConfig(octaves, falloff)
</div>

??? question "Show Answer"
    The correct answer is **C**. `noiseDetail(octaves, falloff)` adjusts the character and level of detail produced by `noise()`. By default, p5.js uses 4 octaves with a falloff of 0.5. Options B, C, and D are not p5.js functions.

    **Concept Tested:** Noise Detail Function

---

#### 7. In a Vector Flow Field, what does each 2D grid cell store?

<div class="upper-alpha" markdown>
1. A font glyph outline
2. An RGBA color value for texture mapping
3. A vector or angle pointing in the direction of the local noise gradient to guide particle movement
4. A sound oscillator frequency
</div>

??? question "Show Answer"
    The correct answer is **C**. A flow field samples 2D noise across a grid and maps the resulting values (0.0 to 1.0) to angles (0 to `TWO_PI`), storing direction vectors that steer particles traversing the canvas. Options B, C, and D describe other concepts.

    **Concept Tested:** Noise Flow Field Concept

---

#### 8. A developer writes `let n = noise(x);` inside a loop where `x` increments by `100` each step. Why does the resulting curve look like jagged random noise rather than smooth hills?

<div class="upper-alpha" markdown>
1. noise() requires at least 3 arguments
2. noise() only accepts float inputs below 1.0
3. The sample coordinate increment is far too large, skipping the continuous gradient regions of the noise space
4. noise() stops working when loop counters exceed 10
</div>

??? question "Show Answer"
    The correct answer is **C**. Perlin noise variations occur smoothly across small fractional intervals (typically 0.005 to 0.05). Stepping by 100 samples distant, uncorrelated points in the lattice, destroying coherence and making it look like random white noise. Options B, C, and D are false.

    **Concept Tested:** Noise Sampling Frequency Bug

---

#### 9. To map a noise value `n = noise(xoff)` to a canvas y-coordinate between 100 and 500, which expression is correct?

<div class="upper-alpha" markdown>
1. y = lerp(100, 500, n * 10);
2. y = n * 500 + 100;
3. y = constrain(n, 100, 500);
4. y = map(n, 0, 1, 100, 500);
</div>

??? question "Show Answer"
    The correct answer is **D**. Since `n` ranges from 0 to 1, `map(n, 0, 1, 100, 500)` cleanly scales it to the desired canvas height range [100, 500]. Option B produces [100, 600]. Option C produces 1.0 because `n <= 1.0`. Option D overshoots.

    **Concept Tested:** Mapping Noise Values

---

#### 10. Why is Perlin noise extensively used for procedural texture generation such as clouds, marble, and wood grain?

<div class="upper-alpha" markdown>
1. It executes directly on audio synthesizer cards
2. It is stored as pre-rendered bitmap images inside p5.js
3. It uses lossless JPEG compression algorithms
4. It exhibits natural multi-scale self-similarity without abrupt discontinuities
</div>

??? question "Show Answer"
    The correct answer is **D**. Perlin noise mimics natural patterns because physical structures (clouds, mountains, coastlines) exhibit smooth gradient continuity and multi-frequency octave characteristics. Options B, C, and D are false.

    **Concept Tested:** Procedural Texturing

---
