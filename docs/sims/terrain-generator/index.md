---
title: "Terrain Generator"
description: "Interactive p5.js MicroSim for terrain generator."
image: /sims/terrain-generator/terrain-generator.png
og:image: /sims/terrain-generator/terrain-generator.png
twitter:image: /sims/terrain-generator/terrain-generator.png
social:
   cards: false
quality_score: 90
---

# Terrain Generator
<div align="center"><i>Contrast standard randomness with smooth Perlin noise to generate organic landscapes</i></div>

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Terrain Generator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Terrain Generator** MicroSim demonstrates the critical differences between standard computer randomness (`random()`) and coherent Perlin noise (`noise()`). While standard randomness is jagged and discontinuous, Perlin noise generates smooth, organic transitions, making it ideal for simulating natural phenomena like terrain, clouds, and textures. This interactive tool visualizes these concepts through 1D and 2D terrain generation, allowing for deep exploration of noise parameters.

## How to Use

Interact with the controls to explore how different algorithms and parameters affect the generated terrain:

*   **Algorithm Toggle (Random vs. Noise)**: Switch between standard randomness and Perlin noise. Notice how `random()` produces a chaotic, spikey profile, while `noise()` creates smooth rolling hills and continuous 2D textures.
*   **Dimensions (1D vs 2D)**: Switch between viewing a 1D landscape cross-section and a 2D topographic map (represented by grayscale values or colors).
*   **Noise Scale Slider**: Adjust how 'zoomed in' the noise is. A larger scale makes the terrain features spread out (lower frequency), while a smaller scale results in tighter, more frequent variations.
*   **Octaves & Falloff Sliders (`noiseDetail`)**: Modify how many layers of noise (octaves) are combined and how quickly their influence diminishes (falloff). Higher octaves add more fine detail (like rocks on a mountain), while adjusting falloff determines the prominence of these finer details.
*   **Reset Seed Button**: Generates a new random seed (`noiseSeed()` and `randomSeed()`), creating an entirely new terrain landscape while preserving your current parameter settings.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/terrain-generator/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding / Math)

### Duration
20-30 minutes

### Prerequisites
* Basic understanding of loops (for generating grids/lines).
* Familiarity with standard variables and mapping values to visual properties.
* Concept of randomness in computer science.

### Activities

1. **Exploration (5 min)**: Allow students to experiment with the sliders and toggles. Ask them to flip back and forth between "Random" and "Noise" in the 1D view and note the visual differences.
2. **Guided Practice (10 min)**: 
   * *Concept: Coherent Noise*: In the 1D view, set the algorithm to "Noise". Have students slowly adjust the "Noise Scale" slider. Ask: *"How does changing the scale affect the shape of the hills?"* Explain how Perlin noise relates adjacent values.
   * *Concept: Fractal Detail*: Switch to 2D view. Guide students to change "Octaves" from 1 to 8. Discuss how adding octaves layers finer details on top of the base terrain, similar to adding boulders to mountains, then gravel to boulders.
3. **Assessment (5 min)**: Present a scenario: *"If I am trying to generate a realistic cloud texture, should I use `random()` or `noise()`? Which octave setting (low or high) would give me fluffy clouds versus highly detailed, wispy clouds?"*

### Assessment
* **Formative**: Observe students correctly identifying the differences between the jagged output of `random()` and the smooth output of `noise()`.
* **Summative**: Ask students to write a short paragraph explaining how `noiseScale` changes the frequency of the generated terrain and why Perlin noise is preferred for natural simulations.

## References

1. [p5.js Reference: random()](https://p5js.org/reference/p5/random/)
2. [p5.js Reference: noise()](https://p5js.org/reference/p5/noise/)
3. [p5.js Reference: noiseDetail()](https://p5js.org/reference/p5/noiseDetail/)
