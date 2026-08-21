# Quiz: 3D Cameras, Lighting Models, Materials & Shaders

Test your understanding of Lighting (ambient, point, directional), materials, orbitControl(), and GLSL shaders with these review questions.

---

#### 1. Which built-in p5.js function enables interactive 3D camera panning, orbiting, and zooming using mouse drag and scroll wheel?

<div class="upper-alpha" markdown>
1. orbitControl()
2. cameraControl()
3. mouse3D()
4. enableOrbit()
</div>

??? question "Show Answer"
    The correct answer is **A**. `orbitControl()` placed inside `draw()` enables automatic 3D camera navigation: left-click drag orbits, right-click drag pans, and scrolling zooms. Options B, C, and D are not p5.js functions.

    **Concept Tested:** Orbit Control Camera

---

#### 2. What type of light source illuminates all objects uniformly from all directions without casting specific directional shadows?

<div class="upper-alpha" markdown>
1. ambientLight(v1, v2, v3)
2. directionalLight(v1, v2, v3, x, y, z)
3. pointLight(v1, v2, v3, x, y, z)
4. spotLight(...)
</div>

??? question "Show Answer"
    The correct answer is **A**. `ambientLight()` casts omnidirectional ambient illumination that lights all surfaces equally, preventing completely black unlit shadows. Options B, C, and D are directional/positioned lights.

    **Concept Tested:** Ambient Light Source

---

#### 3. What type of light source emits light rays in parallel from an infinitely distant source (like the Sun)?

<div class="upper-alpha" markdown>
1. pointLight(color, positionVector)
2. directionalLight(color, directionVector)
3. ambientLight(color)
4. spotLight(color, position, direction)
</div>

??? question "Show Answer"
    The correct answer is **B**. `directionalLight()` simulates light rays traveling in parallel from a given direction vector, like sunlight. `pointLight()` emits outward radially from a specific 3D location. Options C and D differ.

    **Concept Tested:** Directional Light Source

---

#### 4. Which material shader displays surface normal vectors mapped directly to RGB colors without requiring external lights?

<div class="upper-alpha" markdown>
1. basicMaterial()
2. normalMaterial()
3. specularMaterial()
4. ambientMaterial()
</div>

??? question "Show Answer"
    The correct answer is **B**. `normalMaterial()` colors each face based on its normal vector (X=Red, Y=Green, Z=Blue), useful for debugging 3D geometry. Options B, C, and D require lights or show flat colors.

    **Concept Tested:** Normal Material Shading

---

#### 5. What material type reflects shiny specular highlights from point, directional, or spot lights?

<div class="upper-alpha" markdown>
1. basicMaterial(color)
2. specularMaterial(color)
3. normalMaterial()
4. emissiveMaterial(color)
</div>

??? question "Show Answer"
    The correct answer is **B**. `specularMaterial()` models shiny surfaces (like polished metal or plastic) with sharp specular reflection highlights calculated from light angles. `basicMaterial()` is unlit. `normalMaterial()` is unlit normal colors.

    **Concept Tested:** Specular Material Highlights

---

#### 6. What is the primary function of a Vertex Shader in the WebGL graphics pipeline?

<div class="upper-alpha" markdown>
1. To compress 3D model files into ZIP archives
2. To calculate the final RGBA color of individual screen pixels (fragments)
3. To calculate the 3D screen space positions and transformations of geometry vertices
4. To simulate audio frequencies on the sound card
</div>

??? question "Show Answer"
    The correct answer is **C**. The Vertex Shader executes once per vertex to transform 3D model coordinates through model, view, and projection matrices into clip space. Option B describes the Fragment Shader. Options C and D are unrelated.

    **Concept Tested:** Vertex Shader Role

---

#### 7. What is the primary function of a Fragment (Pixel) Shader in the WebGL graphics pipeline?

<div class="upper-alpha" markdown>
1. To move the mouse cursor across the canvas
2. To calculate the physical mass of 3D objects
3. To compute the final color, lighting, texture mapping, and transparency for every rasterized pixel fragment
4. To load 3D OBJ files from disk
</div>

??? question "Show Answer"
    The correct answer is **C**. The Fragment (or Pixel) Shader runs on the GPU for every single pixel covered by a polygon, computing lighting formulas, procedural patterns, and texture colors. Options B, C, and D are false.

    **Concept Tested:** Fragment Shader Role

---

#### 8. Which p5.js function loads external GLSL vertex and fragment shader files in `preload()`?

<div class="upper-alpha" markdown>
1. compileShader(vertFile, fragFile)
2. createShader(vertCode, fragCode)
3. loadShader('vertPath.vert', 'fragPath.frag')
4. importShader(shaderName)
</div>

??? question "Show Answer"
    The correct answer is **C**. `loadShader(vertFilename, fragFilename)` loads external GLSL shader source files during `preload()`. `createShader()` compiles raw string code. Options C and D are not p5.js functions.

    **Concept Tested:** Load Shader Function

---

#### 9. How do you pass a variable (such as `time` or `resolution`) from JavaScript into a custom GLSL shader program?

<div class="upper-alpha" markdown>
1. myShader.setGlobal('time', millis());
2. myShader.passVariable('time', millis());
3. myShader.bindAttribute('time', millis());
4. myShader.setUniform('u_time', millis() / 1000.0);
</div>

??? question "Show Answer"
    The correct answer is **D**. Shader uniforms are read-only constants passed from CPU JavaScript to GPU shaders using `shader.setUniform('uniformName', value)`. Options B, C, and D are invalid method names.

    **Concept Tested:** Shader Uniform Passing

---

#### 10. Why are GPU shaders capable of rendering complex mathematical patterns (like fractals or raymarching) thousands of times faster than CPU JavaScript loops?

<div class="upper-alpha" markdown>
1. GPUs do not use floating-point math
2. GPUs have more RAM than CPUs
3. Shaders run without electricity
4. The GPU features thousands of parallel arithmetic cores designed to evaluate shader math on every pixel simultaneously
</div>

??? question "Show Answer"
    The correct answer is **D**. GPUs achieve extreme rendering speed through massive SIMD (Single Instruction, Multiple Data) parallelism, running fragment shader calculations across millions of pixels concurrently. Options B, C, and D are incorrect.

    **Concept Tested:** GPU Massive Parallelism

---
