---
title: Audio Visualizer Lab
description: Interactive p5.js MicroSim for audio visualizer lab.
image: /sims/audio-visualizer-lab/audio-visualizer-lab.png
og:image: /sims/audio-visualizer-lab/audio-visualizer-lab.png
twitter:image: /sims/audio-visualizer-lab/audio-visualizer-lab.png
social:
   cards: false
quality_score: 95
---

# Audio Visualizer Lab
<div align="center"><i>Visualize sound frequencies and amplitudes using the Fast Fourier Transform (FFT)</i></div>

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Audio Visualizer Lab MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Audio Visualizer Lab** MicroSim provides an interactive exploration of sound processing and the Fast Fourier Transform (FFT). Using p5.sound, it allows students to feed audio via their device's microphone or a synthesized oscillator and observe the relationship between sound and visualization. Students can switch between analyzing the raw audio waveform and the frequency spectrum, demonstrating how complex sounds are composed of individual frequency components.

## How to Use

Each interactive element in this lab isolates a specific concept of audio processing:

*   **Audio Source Dropdown**: Switch between "Microphone" input and "Synth Oscillator". This demonstrates that FFT can process any audio signal, whether it is live room noise or a mathematically generated tone.
*   **Visualization Toggle**: Switch between "Spectrum (FFT)" and "Waveform (Time Domain)". This contrasts how audio is represented across frequencies (spectrum) versus how it varies over time (waveform).
*   **Frequency Range Highlighter**: Select "All", "Bass", "Mid", or "Treble" to highlight corresponding frequency bands on the spectrum. This connects numerical frequency bins to human-perceived sound characteristics.
*   **FFT Smoothing Slider**: Adjust how quickly the visualization reacts to audio changes. High smoothing creates a fluid visual, while low smoothing provides immediate, jittery feedback reflecting the raw data.
*   **Amplitude Threshold**: An adjustable horizontal line. When specific frequencies exceed this volume, visual triggers (like color changes or particle emissions) occur, simulating how audio input can drive conditional logic in generative art.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/audio-visualizer-lab/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Creative Coding / Music Tech)

### Duration
20-25 minutes

### Prerequisites
* Basic understanding of sound waves, amplitude (volume), and frequency (pitch).
* Conceptual understanding of loops and arrays for visualization.

### Activities

1. **Exploration (5 min)**: Allow students to test the visualizer with their microphones. Encourage them to whistle, clap, or play music from another tab to observe how the visualizer responds.
2. **Guided Practice (10 min)**: 
   * *Concept: Waveform vs Spectrum*: Instruct students to toggle between Waveform and Spectrum while whistling a single tone into the microphone (or using the Synth). Ask: *"What is the main difference between what the two modes show?"* Discuss how waveform is the sound over time, while the spectrum separates the sound by pitch.
   * *Concept: Frequency Bins*: Have students select "Bass" from the Frequency Range. Ask them to make a low humming sound, then a high-pitched sound. They should notice the highlighted bass bars only react to the hum.
   * *Concept: Smoothing & Thresholds*: Ask students to adjust the Smoothing slider and observe the lag/fluidity. Then, set a Threshold. Explain how in code, `if (amplitude > threshold)` can be used to make elements jump, change color, or trigger events.
3. **Assessment (5-10 min)**: Challenge students to produce sounds that cross the threshold *only* in the "Treble" range, and then *only* in the "Bass" range.

### Assessment
* **Formative**: Observation of students successfully identifying which visual bars correspond to high vs low pitches.
* **Summative**: Ask students to explain the difference between a waveform and a frequency spectrum, and describe how a threshold could be used to animate a virtual character dancing to a kick drum.

## References

1. [p5.sound Reference: p5.FFT](https://p5js.org/reference/p5.sound/p5.FFT/)
2. [p5.sound Reference: p5.AudioIn](https://p5js.org/reference/p5.sound/p5.AudioIn/)
3. [Wikipedia: Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
