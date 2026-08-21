# Quiz: Microphone Input & FFT Spectral Analysis

Test your understanding of Live microphone capture, amplitude tracking, Fast Fourier Transform (FFT), and frequency bin visualization with these review questions.

---

#### 1. Which p5.sound class captures live audio input from the user's computer or mobile microphone?

<div class="upper-alpha" markdown>
1. p5.AudioIn
2. p5.Microphone
3. p5.SoundCapture
4. p5.LiveInput
</div>

??? question "Show Answer"
    The correct answer is **A**. `p5.AudioIn` accesses the user's live audio input device (microphone or line-in). Options B, C, and D are not p5.sound classes.

    **Concept Tested:** p5 AudioIn Class

---

#### 2. What mathematical algorithm transforms time-domain audio waveform signals into discrete frequency-domain spectrum bins?

<div class="upper-alpha" markdown>
1. Fast Fourier Transform (FFT)
2. Euler Integration
3. Perlin Gradient Lattice
4. Bresenham Line Algorithm
</div>

??? question "Show Answer"
    The correct answer is **A**. The Fast Fourier Transform (FFT) algorithm efficiently decomposes complex time-domain acoustic waveforms into their constituent frequency components (spectrum amplitudes). Options B, C, and D solve completely different mathematical problems.

    **Concept Tested:** Fast Fourier Transform Concept

---

#### 3. What does `fft.analyze()` return in p5.js?

<div class="upper-alpha" markdown>
1. A single scalar volume float
2. An array of amplitude values (0-255) across frequency spectrum bins from bass to treble
3. The duration of the audio track in seconds
4. An array of 3D vertex coordinates
</div>

??? question "Show Answer"
    The correct answer is **B**. `fft.analyze()` returns an array of energy values (0 to 255) representing the amplitude of each frequency bin from lowest bass to highest treble. Option B describes `amplitude.getLevel()`.

    **Concept Tested:** FFT Analyze Spectrum Array

---

#### 4. Which p5.sound helper method extracts the instantaneous energy level of a predefined frequency range such as `'bass'`, `'mid'`, or `'treble'`?

<div class="upper-alpha" markdown>
1. fft.getBand('bass')
2. fft.getEnergy('bass')
3. fft.sample('bass')
4. fft.filter('bass')
</div>

??? question "Show Answer"
    The correct answer is **B**. `fft.getEnergy(presetOrFrequency)` returns the amplitude energy (0 to 255) of a specific frequency range (e.g. `'bass'`, `'lowMid'`, `'mid'`, `'highMid'`, `'treble'`). Options B, C, and D are not p5.sound methods.

    **Concept Tested:** FFT Get Energy Function

---

#### 5. What is the difference between measuring volume with `p5.Amplitude` versus frequency with `p5.FFT`?

<div class="upper-alpha" markdown>
1. Amplitude only works with microphones while FFT only works with sound files
2. Amplitude measures total overall signal volume (loudness), while FFT breaks sound down into individual pitch/frequency bands
3. FFT only works in 3D WebGL mode
4. Amplitude returns frequencies while FFT returns decibels
</div>

??? question "Show Answer"
    The correct answer is **B**. `p5.Amplitude` tracks single-value overall sound level (loudness from 0.0 to 1.0). `p5.FFT` provides spectral analysis, isolating low bass kicks from high cymbal sizzles. Options B, C, and D are incorrect.

    **Concept Tested:** Amplitude vs FFT Comparison

---

#### 6. What does `fft.waveform()` return, and how is it visually displayed on canvas?

<div class="upper-alpha" markdown>
1. A 3D mesh of sound waves
2. A histogram of audio file sizes
3. An array of time-domain amplitude values (-1.0 to +1.0) used to draw an oscilloscope waveform line
4. An array of RGB color values
</div>

??? question "Show Answer"
    The correct answer is **C**. `fft.waveform()` returns time-domain instantaneous amplitude values between -1.0 and 1.0, which can be plotted across the x-axis to render a real-time audio oscilloscope. Options B, C, and D are incorrect.

    **Concept Tested:** FFT Waveform Oscilloscope

---

#### 7. How do you program an audio-reactive visual where a central circle pulses and expands in response to a live drum kick?

<div class="upper-alpha" markdown>
1. Call random(100) inside draw()
2. Set circle size to frameCount
3. Sample bass energy with fft.getEnergy('bass') and map the value to circle diameter
4. Rotate the canvas by millis()
</div>

??? question "Show Answer"
    The correct answer is **C**. Sampling `fft.getEnergy('bass')` detects low-frequency transients (kick drums). Mapping this energy value (0-255) to circle radius causes the shape to pulse dynamically with the musical rhythm. Options B, C, and D ignore audio input.

    **Concept Tested:** Audio Reactive Beat Pulse

---

#### 8. What does the smoothing parameter (between 0.0 and 1.0) passed to `new p5.FFT(smoothing, bins)` control?

<div class="upper-alpha" markdown>
1. The pitch shift transposition amount
2. The volume level of audio playback
3. The temporal responsiveness and dampening between consecutive analysis frames to reduce jitter
4. The canvas frameRate limit
</div>

??? question "Show Answer"
    The correct answer is **C**. Smoothing dampens rapid fluctuations between FFT frames. A value of 0.8 creates smooth, fluid visualizer transitions, while 0.0 provides raw instantaneous response. Options B, C, and D are false.

    **Concept Tested:** FFT Smoothing Parameter

---

#### 9. Why is threshold beat detection (detecting when instantaneous energy exceeds a rolling average by a multiplier) superior to static threshold checks for live audio?

<div class="upper-alpha" markdown>
1. Rolling averages prevent browser memory leaks
2. Dynamic thresholding runs on GPU compute shaders
3. Static thresholds only work with synthesized sine waves
4. Dynamic thresholding automatically adapts to songs of varying mastering loudness and dynamic range without manual recalibration
</div>

??? question "Show Answer"
    The correct answer is **D**. Music loudness varies widely across genres and recording levels. Comparing current energy against a moving window average ($E > C \cdot \bar{E}$) reliably detects rhythmic peaks regardless of overall master volume. Options B, C, and D are false.

    **Concept Tested:** Dynamic Beat Detection Algorithm

---

#### 10. To draw a classic frequency bar visualizer across the canvas width, how should spectrum array values be mapped?

<div class="upper-alpha" markdown>
1. Apply spectrum values as canvas rotation angles
2. Draw a single rectangle with width = spectrum.length
3. Sort the array alphabetically and print to console
4. Iterate through spectrum array, calculating x from index / length and bar height from spectrum[i]
</div>

??? question "Show Answer"
    The correct answer is **D**. Looping through the array `spectrum = fft.analyze()` and mapping each bin index to horizontal coordinate `x = i * (width / spectrum.length)` with height `h = map(spectrum[i], 0, 255, 0, height)` draws an audio spectrum bar chart. Options B, C, and D do not produce frequency bar charts.

    **Concept Tested:** Frequency Bar Visualizer Layout

---
