# MicroSim Functional Specifications

This document provides the detailed functional specifications for the 18 core MicroSim environments required for the *Art of Processing* textbook. These environments serve as the interactive backbone for teaching all 600 concepts in the learning graph.

## 1. Canvas Inspector
**Primary Learning Domain**: Foundation Concepts (FND)

**Educational Purpose**:
To visualize the foundational p5.js canvas coordinate plane and the render loop mechanics.

**Functional Specification**:
A split-screen or single-canvas interactive grid displaying an (x,y) plane. A point can be dragged across the grid, instantly updating a visible coordinate readout. The canvas features visual counters displaying the number of times `setup()` and `draw()` have executed. Modifying the Frame Rate slider dynamically changes the speed of the `draw()` loop counter.

**Required Interactive Controls**:
- Coordinate Dragger (Canvas Interaction)
- Simulated Width Slider
- Simulated Height Slider
- Frame Rate Slider
- Background Color Picker

---

## 2. Shape Builder
**Primary Learning Domain**: 2D Shape & Geometry (PRIM)

**Educational Purpose**:
To teach 2D primitive shape drawing, origin modes, and stroke/fill properties.

**Functional Specification**:
An interactive vector playground. The student selects a primitive shape (rect, ellipse, triangle, line) and places it on the canvas. They can toggle rendering modes like `CENTER` or `CORNER` and observe how the origin point shifts relative to the shape's visual boundaries. Properties like stroke weight and fill color can be dynamically altered.

**Required Interactive Controls**:
- Shape Type Dropdown
- Position (x,y) Sliders
- Size (w,h) Sliders
- rectMode/ellipseMode Toggles
- Stroke Weight Slider
- Fill/NoFill Toggle

---

## 3. Color Mixer
**Primary Learning Domain**: Color Theory & Pixels (CLR)

**Educational Purpose**:
To demonstrate color spaces (RGB vs HSB), alpha transparency, and pixel array manipulation.

**Functional Specification**:
Features two main interactive zones. Zone 1 is a color mixing area where sliders adjust RGB and HSB channels to match target colors. Zone 2 is a 'magnifying glass' over a small image or gradient, allowing the student to inspect the `pixels[]` array values (R, G, B, A) at specific coordinates in real-time.

**Required Interactive Controls**:
- Color Space Toggle (RGB/HSB)
- Red/Hue Slider
- Green/Saturation Slider
- Blue/Brightness Slider
- Alpha Slider
- Blend Mode Dropdown
- Pixel Magnifier (Mouse Interaction)

---

## 4. Algorithm Visualizer
**Primary Learning Domain**: Control Flow & Arrays (FLOW)

**Educational Purpose**:
To visualize loop execution (for/while), conditional branching (if/else), and array iterations.

**Functional Specification**:
A step-through visualizer where a standard loop generates a 2D grid of shapes. The student can step forward or backward through the loop iterations. A conditional logic threshold determines the color or shape drawn, which the student can adjust via sliders to immediately see how conditional changes affect the overall pattern.

**Required Interactive Controls**:
- Step Forward/Backward Buttons
- Loop Type Selector (For/While)
- Condition Threshold Slider
- Array Length Adjuster

---

## 5. Robot Arm Kinematics
**Primary Learning Domain**: Matrix Transformations (XFORM)

**Educational Purpose**:
To teach translation, rotation, scaling, and the matrix stack (`push()` and `pop()`).

**Functional Specification**:
A hierarchical, multi-segment robotic arm drawn using transformations. The student can independently rotate and translate each joint. A toggle visualizes the local coordinate axes for each segment, demonstrating how `translate()` and `rotate()` compound, and how `push()`/`pop()` isolate these transformations.

**Required Interactive Controls**:
- Base X/Y Translation Sliders
- Joint 1 Rotation Slider
- Joint 2 Rotation Slider
- Scale Slider
- Show Local Axes Checkbox
- Push/Pop Toggle

---

## 6. Harmonic Oscillator
**Primary Learning Domain**: Animation & Trigonometry (TRIG)

**Educational Purpose**:
To map trigonometric functions (sine/cosine) and polar coordinates to animation and motion.

**Functional Specification**:
A real-time graphing tool mapping a rotating circle (polar coordinates) to a standard sine/cosine wave (Cartesian). The student can adjust the amplitude and frequency of the oscillator and observe the resulting Lissajous curves or wave patterns.

**Required Interactive Controls**:
- Amplitude Slider
- Frequency Slider
- Phase Offset Slider
- Polar/Cartesian View Toggle
- Angle Mode Toggle (Radians/Degrees)

---

## 7. Terrain Generator
**Primary Learning Domain**: Randomness & Perlin Noise (NOISE)

**Educational Purpose**:
To contrast pure randomness with smooth Perlin noise and understand noise detail.

**Functional Specification**:
Generates a 1D and 2D landscape visualization. The student can toggle between standard `random()` and `noise()` to see the structural difference. Sliders allow the adjustment of noise scale, octaves, and falloff, directly altering the generated terrain profile.

**Required Interactive Controls**:
- Random vs Noise Toggle
- Noise Scale Slider
- Octaves (noiseDetail) Slider
- Falloff Slider
- Seed Reset Button

---

## 8. Particle Physics Engine
**Primary Learning Domain**: Vector Math & Physics (VEC)

**Educational Purpose**:
To teach vector addition, velocity, acceleration, mass, and environmental forces.

**Functional Specification**:
A sandbox containing an emitter that shoots particles. The student can manipulate environmental vector forces like gravity and wind. The simulation calculates the sum of forces (F=ma) applied to the particles' velocity vectors, demonstrating realistic physics trajectories.

**Required Interactive Controls**:
- Wind Force Vector Joystick
- Gravity Slider
- Mass Slider
- Friction/Drag Coefficient Slider
- Reset Emitter Button

---

## 9. Interactive Sandbox
**Primary Learning Domain**: User Input & Sensing (INP)

**Educational Purpose**:
To handle asynchronous user events (mouse, keyboard, touch) and device inputs.

**Functional Specification**:
A unified canvas that acts as an event logger and interactive toy. It visually responds to clicks, double-clicks, dragging, and keypresses. An overlay displays the exact p5.js event variables (`mouseX`, `keyIsPressed`, `keyCode`) triggering in real-time.

**Required Interactive Controls**:
- Interactive Canvas Area
- Key Logger Readout
- Touch Simulator Toggle
- Clear Events Button

---

## 10. UI Component Playground
**Primary Learning Domain**: DOM Controls & HTML (DOM)

**Educational Purpose**:
To teach the integration of HTML DOM elements (sliders, buttons, inputs) over the p5.js canvas.

**Functional Specification**:
Demonstrates absolute and relative positioning of DOM elements over a canvas. The student creates generic DOM elements and uses sliders to adjust their `position()` and `style()`, visually breaking them out of the standard canvas flow to build a UI overlay.

**Required Interactive Controls**:
- DOM Element Creator Dropdown
- Element X/Y Position Sliders
- CSS Style Injector Input
- Canvas/DOM Parent Toggle

---

## 11. Data Flow Debugger
**Primary Learning Domain**: Modern ES6+ JavaScript (JS)

**Educational Purpose**:
To visualize standard JS mechanics like array mapping, filtering, object destructuring, and scope.

**Functional Specification**:
A visual data-pipeline tool. An input array of objects is passed through a sequence of higher-order functions (`map`, `filter`, `reduce`). The student configures the filter conditions or map transformations and sees the visual output representation (e.g., shapes changing color or filtering out) at each stage.

**Required Interactive Controls**:
- Data Array Length Slider
- Filter Condition Dropdown
- Map Transformation Selector
- Variable Scope Inspector Toggle

---

## 12. 3D Scene Editor
**Primary Learning Domain**: 3D WebGL Graphics (WEBGL)

**Educational Purpose**:
To introduce the WebGL rendering context, 3D primitives, camera controls, and lighting models.

**Functional Specification**:
A 3D viewport utilizing `orbitControl()`. The student can place 3D primitives (box, sphere, torus) and toggle different light sources (ambient, directional, point, spot). Different materials (basic, normal, ambient, specular) can be applied to see how they react to the lighting.

**Required Interactive Controls**:
- Orbit Controls (Mouse Drag)
- Light Type Selector
- Light Position Sliders
- Material Type Dropdown
- Z-Depth Slider

---

## 13. Synthesizer Board
**Primary Learning Domain**: Audio Synthesis & Sound (SND)

**Educational Purpose**:
To teach sound generation, oscillators, ADSR envelopes, and basic audio routing.

**Functional Specification**:
A virtual synthesizer interface utilizing the p5.sound library. The student routes a base oscillator through an ADSR envelope to generate notes. A visual waveform displays the shape of the sound (Sine, Square, Sawtooth, Triangle) as parameters are modified.

**Required Interactive Controls**:
- Waveform Selector
- Attack Slider
- Decay Slider
- Sustain Slider
- Release Slider
- Play Note Button

---

## 14. Audio Visualizer Lab
**Primary Learning Domain**: Signal Processing & FFT (FFT)

**Educational Purpose**:
To analyze sound frequencies and amplitudes using the Fast Fourier Transform (FFT).

**Functional Specification**:
A real-time audio spectrum analyzer. It takes an audio input (microphone or file) and maps the FFT frequency bins to visual equalizer bars. The student can adjust smoothing and isolate specific frequency ranges (bass, mid, treble) to trigger visual thresholds.

**Required Interactive Controls**:
- Audio Source Toggle (Mic/File)
- FFT Smoothing Slider
- Frequency Bin Mapper Dropdown
- Waveform vs Spectrum Toggle

---

## 15. Pixel Processing Pipeline
**Primary Learning Domain**: Image & Video Processing (IMG)

**Educational Purpose**:
To teach image loading, tinting, pixel-level manipulation, and convolution filters.

**Functional Specification**:
An interactive image filter pipeline. The student loads a static image or webcam feed and applies sequential filters (grayscale, blur, threshold, posterize). A convolution matrix editor allows students to input custom kernel weights for edge detection and sharpening.

**Required Interactive Controls**:
- Media Source Dropdown
- Filter Preset Selector
- Threshold Value Slider
- 3x3 Convolution Matrix Inputs
- Blend Mode Dropdown

---

## 16. Kinetic Typography Engine
**Primary Learning Domain**: Generative Typography (TYPO)

**Educational Purpose**:
To extract font paths and apply generative physics or parameters to text rendering.

**Functional Specification**:
A text-to-points simulator. The student types a word, and the simulation converts the font glyphs into an array of vector points using `textToPoints()`. Sliders control the sampling density, and physical forces (wobble, explosion) can be applied to scatter the typography.

**Required Interactive Controls**:
- Text Input Field
- Font Selection Dropdown
- Point Density Slider
- Wobble Intensity Slider
- Explode Particles Button

---

## 17. Dev Environment Simulator
**Primary Learning Domain**: Development Tools (TOOL)

**Educational Purpose**:
To simulate debugging, console logs, network errors (CORS), and developer tools.

**Functional Specification**:
A mock 'IDE' layout featuring a code editor panel and a console output panel. The simulation injects intentional errors (like attempting to load a local image without a server). The student must use the mock console and network tabs to identify and 'fix' the configuration.

**Required Interactive Controls**:
- Mock Code Editor
- Console Output Viewer
- Network Tab Viewer
- Environment Toggle (Local/Server)

---

## 18. Pedagogical Pattern Matcher
**Primary Learning Domain**: Pedagogy & Computation (PED)

**Educational Purpose**:
To train educators on identifying student misconceptions and selecting scaffolding strategies.

**Functional Specification**:
A teacher-facing quiz-style simulation. A fictional student's buggy code or misunderstanding is presented. The user must classify the misconception (e.g., scoping error, translation order) and select the most appropriate pedagogical scaffolding (Parsons problem, live coding) to help the student.

**Required Interactive Controls**:
- Student Scenario Generator
- Misconception Classifier Dropdown
- Scaffolding Strategy Selector
- Submit Evaluation Button

---

