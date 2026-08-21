---
title: "Waveform Visualizer & Hearer"
description: "Oscilloscope visualizing the 4 fundamental audio synthesizer waveforms: Sine, Square, Triangle, and Sawtooth with frequency controls."
quality_score: 90
image: /sims/waveform-visualizer-hearer/waveform-visualizer-hearer.png
og:image: /sims/waveform-visualizer-hearer/waveform-visualizer-hearer.png
---

# Waveform Visualizer & Hearer

<iframe src="main.html" width="100%" height="487px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/waveform-visualizer-hearer/main.html" width="100%" height="487px"></iframe>
```

## Description

Oscilloscope visualizing the 4 fundamental audio synthesizer waveforms: Sine, Square, Triangle, and Sawtooth with frequency controls.

## Learning Objectives

- **Primary Goal:** Students will understand periodic oscillator waveforms, wave geometry, and their corresponding acoustic harmonic timbre.
- **Bloom's Taxonomy Level:** Understand

## How to Use

Interact with the visual elements and adjust the controls located beneath the simulation canvas:
- **Waveform Type:** Switch between Sine, Square, Triangle, and Sawtooth to see how the mathematical shape affects the oscilloscope trace.
- **Start/Pause Waveform:** Animate the oscilloscope phase to watch the waveform travel.
- **Frequency Slider:** Adjust the number of wave cycles visible on the screen.
- **Play Sound:** Check this box to hear an audible 440 Hz tone matching the currently selected waveform timbre (make sure your device volume is on!).

## Lesson Plan

### Prerequisites
- Understanding of basic coordinate systems and p5.js sketch execution.
- Familiarity with variables and interactive event handling.

### Interactive Exploration
1. Observe the default initial state of the oscilloscope.
2. Select different waveforms from the dropdown menu and note how the geometric shape changes on the screen.
3. Check the "Play Sound" box to hear the acoustic timbre of the selected waveform.
4. Adjust the Frequency slider and use the "Start Waveform" button to animate the visual phase of the waves.
5. Compare the visual geometry (e.g., pure sine curve vs jagged sawtooth) to the audio feedback (pure tone vs bright, brassy timbre).

### Assessment Questions
- How does changing each individual parameter influence the resulting visual output?
- What underlying algorithm or mathematical model governs the state transitions shown in the simulation?

## References

1. [p5.js Reference Documentation](https://p5js.org/reference/) - Official p5.js documentation and API guides.
2. [Processing Foundation](https://processingfoundation.org/) - Educational resources for creative coding.
