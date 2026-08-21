# Quiz: Audio Synthesis, Oscillators & Envelopes

Test your understanding of p5.sound library, oscillators, waveforms, ADSR envelopes, and sound synthesis with these review questions.

---

#### 1. Why must `userStartAudio()` be invoked in response to a user gesture (like a button click) in modern web browsers before audio plays?

<div class="upper-alpha" markdown>
1. Modern browsers enforce Autoplay Policies to prevent websites from playing unwanted sound without user interaction
2. Because web audio requires downloading a 50MB audio codec on demand
3. Because audio cards can only process sound when mouse buttons are held down
4. To allow the browser to check the user's audio copyright license
</div>

??? question "Show Answer"
    The correct answer is **A**. Web browsers block audio contexts from starting automatically until the user performs an explicit gesture (click or tap), avoiding jarring unsolicited sound. `userStartAudio()` initializes the audio hardware. Options B, C, and D are false.

    **Concept Tested:** User Start Audio Policy

---

#### 2. What type of basic electronic waveform produces a pure, smooth tone with no harmonic overtones?

<div class="upper-alpha" markdown>
1. Sine wave ('sine')
2. Square wave ('square')
3. Sawtooth wave ('sawtooth')
4. Triangle wave ('triangle')
</div>

??? question "Show Answer"
    The correct answer is **A**. A sine wave is a fundamental pure tone containing no additional harmonic frequencies. Square, sawtooth, and triangle waves contain rich odd and even harmonics. Options B, C, and D are harmonically rich waves.

    **Concept Tested:** Sine Wave Oscillator Tone

---

#### 3. Which waveform contains all integer harmonic frequencies (both odd and even) and produces a bright, buzzy, brassy timbre?

<div class="upper-alpha" markdown>
1. Sine wave ('sine')
2. Sawtooth wave ('sawtooth')
3. Triangle wave ('triangle')
4. Square wave ('square')
</div>

??? question "Show Answer"
    The correct answer is **B**. Sawtooth waves contain all integer harmonics ($1/n$), creating a bright, harsh, buzzy timbre common in synthesizer leads and brass sounds. Square waves only contain odd harmonics. Sine has none. Triangle has weak odd harmonics.

    **Concept Tested:** Sawtooth Harmonic Content

---

#### 4. What four stages comprise a standard ADSR amplitude envelope in sound synthesis?

<div class="upper-alpha" markdown>
1. Amplitude, Decibel, Sound, Resonance
2. Attack, Decay, Sustain, Release
3. Audio, Digital, Signal, Rate
4. Ascend, Drop, Stabilize, Return
</div>

??? question "Show Answer"
    The correct answer is **B**. ADSR stands for Attack (time to reach peak level), Decay (time to drop to sustain level), Sustain (held volume level), and Release (time to fade to silence after key release). Options B, C, and D are incorrect terms.

    **Concept Tested:** ADSR Envelope Stages

---

#### 5. Which p5.sound class generates periodic audio waveforms at a specified frequency?

<div class="upper-alpha" markdown>
1. p5.SoundFile
2. p5.Oscillator
3. p5.AudioIn
4. p5.FFT
</div>

??? question "Show Answer"
    The correct answer is **B**. `p5.Oscillator([freq], [type])` generates synthesized audio tones at adjustable frequencies and waveforms. `p5.SoundFile` plays recorded audio files. `p5.AudioIn` captures microphone input. `p5.FFT` analyzes spectra.

    **Concept Tested:** p5 Oscillator Class

---

#### 6. How do you configure an oscillator's pitch to 440 Hz (Concert A) and start audio generation?

<div class="upper-alpha" markdown>
1. let osc = createAudio(440); osc.loop();
2. let osc = new p5.Sound('A4'); osc.play();
3. let osc = new p5.Oscillator('sine'); osc.freq(440); osc.start();
4. let osc = new p5.Envelope(440); osc.trigger();
</div>

??? question "Show Answer"
    The correct answer is **C**. Instantiating `new p5.Oscillator('sine')`, calling `.freq(440)`, and invoking `.start()` generates a continuous 440 Hz tone. Options B, C, and D are incorrect syntax.

    **Concept Tested:** Oscillator Frequency Start

---

#### 7. What does the `p5.Envelope` class control when connected to an oscillator's amplitude?

<div class="upper-alpha" markdown>
1. It converts audio into 3D WebGL meshes
2. It changes the audio pan from left to right
3. It shapes the volume dynamics over time (fade-in, sustain, fade-out) when triggered
4. It records audio to an MP3 file on disk
</div>

??? question "Show Answer"
    The correct answer is **C**. A `p5.Envelope` dynamically modulates parameters (typically amplitude or filter cutoff frequency) over time when triggered, creating percussive hits, plucks, or swelling pads. Options B, C, and D are incorrect.

    **Concept Tested:** p5 Envelope Amplitude Control

---

#### 8. What audio effect simulates acoustic reflections in a physical room or cathedral?

<div class="upper-alpha" markdown>
1. p5.Distortion
2. p5.Delay
3. p5.Reverb
4. p5.Compressor
</div>

??? question "Show Answer"
    The correct answer is **C**. `p5.Reverb` simulates acoustic space reflections (echo density and decay time) of rooms, halls, or cathedrals. `p5.Delay` creates discrete echo repeats. Options C and D distort and compress dynamics.

    **Concept Tested:** p5 Reverb Effect

---

#### 9. To map mouse X-position across the musical frequency spectrum from 200 Hz to 800 Hz, which code is used inside `draw()`?

<div class="upper-alpha" markdown>
1. let freq = lerp(200, 800, mouseX); osc.freq(freq);
2. let freq = mouseX * 800 + 200; osc.pitch(freq);
3. let freq = constrain(mouseX, 200, 800); osc.set(freq);
4. let freq = map(mouseX, 0, width, 200, 800); osc.freq(freq);
</div>

??? question "Show Answer"
    The correct answer is **D**. `map(mouseX, 0, width, 200, 800)` smoothly converts horizontal mouse coordinates to frequency values, and `osc.freq(freq)` updates the synthesizer pitch in real time. Options B, C, and D are incorrect math or method calls.

    **Concept Tested:** Interactive Pitch Mapping

---

#### 10. Why does Frequency Modulation (FM Synthesis)—where one oscillator modulates the frequency of another audio oscillator—produce complex metallic, bell-like, or harsh timbres?

<div class="upper-alpha" markdown>
1. FM synthesis converts digital audio into analog FM radio waves
2. FM synthesis disables anti-aliasing filters on the sound card
3. FM synthesis doubles the CPU clock frequency
4. Modulating frequency at audio rates creates complex sideband frequencies that enrich the harmonic spectrum
</div>

??? question "Show Answer"
    The correct answer is **D**. When carrier frequency is modulated at audio rates by a modulator oscillator, mathematical Bessel functions produce sideband frequencies on both sides of the carrier, generating rich, metallic, and bell-like timbres. Options B, C, and D are false.

    **Concept Tested:** FM Synthesis Sidebands

---
