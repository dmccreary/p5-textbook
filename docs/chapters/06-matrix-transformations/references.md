# References: Matrix Transformations & Coordinate Systems

1. [Transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix) - Wikipedia - Mathematical foundations of affine transformations, linear mapping, matrix multiplication, and homogeneous coordinate systems. Essential for understanding canvas translation, rotation, and scaling in 2D space.

2. [Call stack](https://en.wikipedia.org/wiki/Call_stack) - Wikipedia - Exhaustive exploration of Last-In-First-Out (LIFO) stack data structures, coordinate frame hierarchies, and state push/pop mechanics. Directly maps to coordinate isolation with p5.js push() and pop() functions.

3. [Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix) - Wikipedia - Trigonometric derivation of 2D and 3D rotational transformations about coordinate origins. Provides theoretical backing for angle conversions, radian measures, and pivot manipulation in computer graphics.

4. Mathematical Elements for Computer Graphics (Second Edition) - David F. Rogers and J. Alan Adams - McGraw-Hill - Rogers and Adams formulated the definitive textbook derivation of concatenated 2D and 3D affine transformation matrices, setting the standard for computer graphics matrix education and computational geometry.

5. Real-Time Rendering (Fourth Edition) - Tomas Akenine-Möller, Eric Haines, Naty Hoffman, Angelo Pesce, Michal Iwanicki, and Sébastien Hillaire - A K Peters/CRC Press - Akenine-Möller and Haines established the modern hierarchical scene graph model, illustrating how nested matrix stacks simplify articulated multi-joint kinematic systems and visual transforms.

6. [p5.js Transform Reference](https://p5js.org/reference/#group-Transform) - p5.js Foundation - Official documentation covering translate(), rotate(), scale(), shearX(), shearY(), and matrix stack state isolation via push() and pop() for local coordinate management in sketches.

7. [Canvas 2D Transformations Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations) - MDN Web Docs - Comprehensive guide on canvas coordinate grid relocation, state saving and restoring, rotation origins, and custom 3x3 matrix multiplication in standard web canvas contexts.

8. [Transformations: Translation and Rotation in p5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) - The Coding Train - Visual video lesson explaining how moving the entire coordinate system rather than recalculating vertex offsets simplifies geometric drawing and complex radial symmetry in sketches.

9. [Matrix Transformations in WebGL and Computer Graphics](https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html) - WebGL Fundamentals - Deep dive into 2D matrix mathematics, demonstrating how translation, rotation, and scaling matrices multiply together into single efficient transform operations for GPU acceleration.

10. [Understanding the Matrix Stack: push() and pop()](https://genekogan.com/code/p5js-transformations/) - Gene Kogan Workshop - Interactive educational guide demonstrating hierarchical transformations, branching trees, and isolated coordinate scopes in creative coding sketches and kinetic mechanical simulations.
