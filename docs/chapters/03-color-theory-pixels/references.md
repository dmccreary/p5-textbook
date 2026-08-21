# References: Color Theory, Color Modes & Pixel Manipulation

1. [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) - Wikipedia - Cylindrical-coordinate representations of RGB color space, defining hue, saturation, value, and lightness. Crucial for understanding why HSB mode facilitates intuitive generative palette harmonies in computational art.

2. [Alpha compositing](https://en.wikipedia.org/wiki/Alpha_compositing) - Wikipedia - Mathematical formulation of Porter-Duff alpha blending, opacity calculations, and transparency layering. Explains how overlapping semi-transparent strokes accumulate color on the digital canvas in real-time rendering.

3. [Color theory](https://en.wikipedia.org/wiki/Color_theory) - Wikipedia - Historical and scientific overview of additive versus subtractive color mixing, complementary color schemes, and perceptual contrasts. Essential foundation for generating aesthetic algorithmic color palettes in code.

4. Interaction of Color (50th Anniversary Edition) - Josef Albers - Yale University Press - Albers pioneered the experiential pedagogy of color relativity, demonstrating how adjacent colors alter human perception—a principle vital for procedural generative palette design and color contrast.

5. Generative Design: Visualize, Program, and Create with JavaScript in p5.js - Benedikt Groß, Hartmut Bohnacker, Julia Laub, and Claudius Lazzeroni - Princeton Architectural Press - Groß and collaborators created the definitive generative color system models, showcasing dynamic HSB interpolation, color wheel distributions, and direct pixel array manipulation in JavaScript.

6. [p5.js Color Reference](https://p5js.org/reference/#group-Color) - p5.js Foundation - Comprehensive documentation of color modes (RGB, HSB, HSL), color interpolation with lerpColor, and direct pixel buffer access via loadPixels() and updatePixels() for algorithmic shading and pixel effects.

7. [Color Spaces and Color Models in Web Development](https://developer.mozilla.org/en-US/docs/Glossary/Color_space) - MDN Web Docs - Technical guide explaining RGB, HSL, and sRGB color gamuts in web browsers, including channel bit depth and color representation in memory buffers for canvas pixel operations and rendering.

8. [ImageData and Pixel Array Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) - MDN Web Docs - Exhaustive reference for the underlying Uint8ClampedArray 4-channel (RGBA) pixel memory layout used by HTML5 Canvas and p5.js pixel array indexing for fast raster manipulation.

9. [The Coding Train: The Pixel Array in p5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) - The Coding Train - Interactive video lesson unpacking the one-dimensional index formula `(x + y * width) * 4` to inspect, alter, and invert individual pixel channels in real time on canvas surfaces.

10. [Adobe Color Wheel and Harmony Rules](https://color.adobe.com/create/color-wheel) - Adobe - Interactive color harmony exploration tool calculating complementary, triadic, and analogous palettes, reinforcing algorithmic color selection rules for generative artwork and UI themes across applications.
