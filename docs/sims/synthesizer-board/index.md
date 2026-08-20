---
title: Synthesizer Board
description: Interactive p5.js MicroSim for synthesizer board.
image: /sims/synthesizer-board/synthesizer-board.png
og:image: /sims/synthesizer-board/synthesizer-board.png
twitter:image: /sims/synthesizer-board/synthesizer-board.png
social:
   cards: false
quality_score: 95
---

# Synthesizer Board

<div align="center"><i>Learn sound generation, oscillators, and ADSR envelopes interactively.</i></div>

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Synthesizer Board MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Synthesizer Board** MicroSim visualizes the fundamental concepts of sound synthesis utilizing the `p5.sound` library. By providing an interactive interface where students can manipulate the type of wave and the ADSR (Attack, Decay, Sustain, Release) envelope, this simulation illustrates the mechanics of basic audio routing and dynamic sound shaping. It includes a real-time waveform visualizer to show exactly how the sound wave behaves as these parameters are tuned.

## How to Use

Each control in this simulation demonstrates a distinct concept of sound synthesis:

*   **Waveform Selector**: Switch between Sine, Square, Sawtooth, and Triangle oscillators to hear how the shape of the sound wave dictates its timbre (tone quality). The visualizer will reflect the shape of the chosen wave.
*   **Attack Slider**: Adjusts how quickly the sound reaches its maximum volume after the "Play Note" button is pressed.
*   **Decay Slider**: Modifies how quickly the sound drops from its peak volume to the sustain level.
*   **Sustain Slider**: Sets the resting volume level while the note is held.
*   **Release Slider**: Determines how long it takes for the sound to fade to silence after the note is released.
*   **Play Note Button**: Triggers the sound sequence, activating the ADSR envelope and sending the synthesized audio to the speakers while plotting its path on the visualizer.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/synthesizer-board/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Digital Audio)

### Duration
20-30 minutes

### Prerequisites
* Conceptual understanding of sound waves and frequencies.
* Basic understanding of variables and parameters in programming.

### Activities

1. **Exploration (10 min)**: Allow students to freely interact with the simulation. Ask them to test every waveform type (Sine, Square, Sawtooth, Triangle) while holding down the "Play Note" button. Have them observe the relationship between the sound they hear and the visual waveform plotted.
2. **Guided Practice (10 min)**: 
   * *Concept: Oscillator Timbre*: Instruct students to change waveforms and describe the difference. Ask: *"Which wave sounds the smoothest? Which one sounds the most abrasive?"* Discuss how the shape of the wave influences the overtones.
   * *Concept: ADSR Envelope (Attack & Decay)*: Instruct students to max out the Attack slider and play a note. Discuss how a slow attack simulates a bowed instrument like a violin. Ask them to set Attack to zero and Decay to short length for a plucked sound, like a guitar.
   * *Concept: Sustain & Release*: Explain the concept of holding a note versus letting go. Have them modify Sustain to hear the resting volume and change Release to see how long the echo lasts after letting go of the note.
3. **Assessment (5 min)**: Conduct a quick "Match the Sound" quiz. Ask students: *"How would you set the ADSR sliders to simulate a sharp drum hit?"* (Answer: Fast Attack, fast Decay, zero Sustain, short Release).

### Assessment
* **Formative**: Observation of students successfully configuring the ADSR envelope to mimic real-world instruments.
* **Summative**: Ability to accurately articulate the function of Attack, Decay, Sustain, and Release, and explain the difference between Sine and Square waveforms.

## References

1. [p5.js Sound Reference: p5.Oscillator](https://p5js.org/reference/p5.sound/p5.Oscillator/)
2. [p5.js Sound Reference: p5.Env](https://p5js.org/reference/p5.sound/p5.Env/)
3. [p5.js Sound Reference: p5.FFT](https://p5js.org/reference/p5.sound/p5.FFT/)
