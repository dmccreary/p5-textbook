---
quality_score: 100
readability_score: 62
---
# Audio Synthesis, Oscillators & Envelopes

## Summary

Utilizes the p5.sound library for sound playback, volume/pan control, sound oscillators, ADSR envelopes, and audio effects. Students will gain practical hands-on experience by building interactive sketches and visual experiments that demonstrate these concepts.

## Concepts Covered

This chapter covers the following 34 concepts from the learning graph:
1. p5 Sound Library Include
2. User Start Audio Context
3. Load Sound File
4. Sound File Play
5. Sound File Stop
6. Sound File Pause
7. Sound File Loop
8. Sound Is Playing Status
9. Set Volume Level
10. Sound Pan Spatial
11. Playback Rate Speed
12. p5 Oscillator Class
13. Oscillator Wave Sine
14. Oscillator Wave Square
15. Oscillator Wave Triangle
16. Oscillator Wave Sawtooth
17. Oscillator Start Stop
18. Oscillator Frequency Set
19. ADSR Envelope Class
20. Envelope Attack Time
21. Envelope Decay Time
22. Envelope Sustain Level
23. Envelope Release Time
24. Play Envelope Trigger
25. p5 Noise White Pink
26. Audio Filter Lowpass
27. Audio Filter Highpass
28. Audio Filter Bandpass
29. Reverb Sound Effect
30. Delay Sound Effect
31. Audio Distortion Effect
32. Polyphonic Synthesizer
33. Midi Note to Frequency
34. Audio Node Signal Route

## Prerequisites

This chapter builds on concepts from:

- [Chapter 20: 3D Cameras, Lighting Models, Materials & Shaders](../20-3d-cameras-shaders/index.md)

!!! mascot-welcome "Welcome to the Studio, Artists!"
    ![Palette waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }

    Hello artists! Who says we can only paint with light? In this chapter, we are going to learn how to generate, sculpt, and control sound itself using pure math. Grab your headphones, because it's time to compose some interactive audio masterpieces!

Imagine walking into a vintage recording studio. In the corner, there's a dusty turntable ready to spin some classic vinyl records. Along the walls, towering modular synthesizers blink with colorful LEDs, their faces covered in a chaotic web of cables connecting different modules together. This is the **synthesizer patchbay**, the central nervous system of sound generation. In this chapter, we are going to learn how to operate this virtual studio using code. 

## 1. Entering the Sound Studio

Before we can even press play on our record player or plug a single cable into our synthesizer, we need to bring our audio equipment into the room. In the world of p5.js, this means we need the **p5 Sound Library Include**. This library is an add-on to the core p5.js library, built on top of the Web Audio API, which gives our browser the superpower to generate, manipulate, and analyze sound. By including the `p5.sound.js` file in our HTML `index.html` document alongside `p5.js`, we unlock all the audio features we'll explore today. 

Once our equipment is in the room, there's an important security protocol we must follow. Modern web browsers have strict rules against websites playing sound automatically without the user's permission—nobody likes a sudden blast of music when opening a tab! To unlock the audio engine, we must trigger a **User Start Audio Context**. This means the browser's audio processing (the audio context) will only begin *after* the user interacts with the page, such as clicking a button or pressing a key. You can explicitly call `userStartAudio()` in an interactive event like `mousePressed()` to ensure the context is active and ready to make noise.

## 2. The Turntable: Working with Sound Files

Our first piece of studio gear is the record player. In p5.js, working with pre-recorded audio files is just like placing a vinyl record on a turntable and dropping the needle. First, we need to retrieve the record from the shelf. We use the **Load Sound File** function (`loadSound()`) inside our `preload()` block. This ensures that the entire audio file is downloaded and ready in memory before our sketch even begins to run. 

```javascript
let mySong;

function preload() {
  // Load Sound File into a variable
  mySong = loadSound('assets/groove.mp3');
}
```

With the record loaded onto the platter, we have a set of controls to manipulate playback. To hear the music, we issue a **Sound File Play** command (`mySong.play()`). If we want the music to stop completely and reset the needle back to the beginning of the track, we use a **Sound File Stop** (`mySong.stop()`). However, if you just want to pause the music to take a quick break, leaving the needle exactly where it is so you can resume later, you use **Sound File Pause** (`mySong.pause()`). 

Sometimes, you want a background track to play infinitely, providing an ongoing ambiance for your sketch. Instead of calling `play()`, you can command the audio to perform a **Sound File Loop** (`mySong.loop()`). This seamlessly restarts the audio file the moment it reaches the end. 

If your user is clicking buttons to play and pause the music, your code needs to know the current state of the turntable. You can check the **Sound Is Playing Status** by calling `mySong.isPlaying()`. This returns a boolean (`true` or `false`), allowing you to create a play/pause toggle button!

!!! mascot-thinking "Is it playing?"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about the `play()` command like physically dropping a needle on a record. If you put that inside your `draw()` loop, you are dropping a new needle 60 times a second! That's why we use `isPlaying()` to make sure the record is already spinning before trying to play it again.

### Mixing and Manipulating the Record

Now that the music is playing, let's look at the mixing desk. The most fundamental control is the volume fader. You can **Set Volume Level** using `mySong.setVolume()`, passing in a value between `0.0` (complete silence) and `1.0` (maximum original volume). You can even gently fade the music in or out by providing a second argument for time (e.g., `mySong.setVolume(0, 3.0)` fades to zero over 3 seconds).

Next, we have the pan knob, which controls the stereo image. By adjusting the **Sound Pan Spatial**, we move the audio left or right in the listener's headphones. Using `mySong.pan()`, a value of `-1.0` sends the audio entirely to the left speaker, `1.0` sends it to the right, and `0.0` keeps it perfectly centered. Imagine coding a race car game where the engine sound pans from left to right as the car drives across the screen!

Finally, we can mess with the turntable's motor speed. By altering the **Playback Rate Speed** (`mySong.rate()`), we can speed up or slow down the audio. A rate of `1.0` is normal speed. A rate of `2.0` plays twice as fast (and pitches the audio up like a chipmunk). A rate of `0.5` plays at half speed (creating a deep, sluggish drone). You can even use negative numbers to play the record backwards!

## 3. The Modular Synthesizer: Oscillators and Waveforms

While playing records is fun, true audio synthesis is about building sounds entirely from scratch. It's time to approach the massive modular synthesizer and its tangled patchbay. The heart of any synthesizer is the oscillator. The **p5 Oscillator Class** generates a continuous, repeating electronic signal—a sound wave. 

Think of an oscillator like a glowing, vibrating string of energy. The shape of this vibration determines the "timbre" or tone color of the sound. There are four primary waveforms we can choose from, each acting as a different raw material for our sonic sculptures:

1. **Oscillator Wave Sine**: The purest sound. It vibrates smoothly back and forth, resembling a gentle, rolling ocean wave. It has no harsh overtones, producing a soft, flute-like, or whistling tone.
2. **Oscillator Wave Square**: A rigid, blocky wave that snaps instantly between high and low values. It sounds hollow and buzzy, exactly like classic 8-bit video game music (think retro arcade blips).
3. **Oscillator Wave Triangle**: A wave that ramps up and down in straight, diagonal lines. It sounds slightly brighter than a sine wave but remains relatively mellow and flute-like.
4. **Oscillator Wave Sawtooth**: A wave that ramps up gradually and then drops instantly, looking like the teeth of a saw. It is rich, bright, and buzzing, perfect for creating huge synthesizer brass sections or aggressive lead sounds.

#### Diagram: Waveform Visualizer & Hearer

<details markdown="1">
<summary>MicroSim: Waveform Visualizer & Hearer</summary><summary>MicroSim: Waveform Visualizer & Hearer</summary>

**Goal:** Allow students to see and hear the four basic oscillator waveforms to understand the relationship between wave shape and timbre.

**Features:**
- A central canvas displaying an oscilloscope that draws the current waveform in real-time.
- Four distinct buttons: "Sine", "Square", "Triangle", "Sawtooth".
- A master "Start Audio / Play" toggle button to initiate the audio context.
- When a wave button is clicked, the oscillator updates its type, and the visualizer smoothly transitions to drawing the new mathematical shape.
- A slider controlling the frequency (pitch) to demonstrate how faster waves sound higher.

</details>

To actually hear the oscillator, we must plug it in and turn it on using the **Oscillator Start Stop** methods (`osc.start()` and `osc.stop()`). Just like our record player, an oscillator can be running silently in the background if its volume is zero, or it can be stopped entirely to save CPU power.

The pitch of the oscillator is controlled by how fast it vibrates. We change this by using the **Oscillator Frequency Set** command (`osc.freq()`). Frequency is measured in Hertz (Hz), which represents the number of vibrations per second. A frequency of 440 Hz is the standard tuning note "A". A low number like 60 Hz gives a deep bass rumble, while 2000 Hz gives a piercing high screech.

## 4. Sculpting Time: ADSR Envelopes

If we just start an oscillator, it plays a continuous, unending drone. That's not very musical! When you pluck a guitar string, the sound starts abruptly, then slowly fades away. When you press a piano key, the sound has a distinct beginning, middle, and end. To give our synthesized sound a specific "shape" over time, we use an envelope. In p5.js, we create this using the **ADSR Envelope Class** (`new p5.Envelope()`).

ADSR stands for Attack, Decay, Sustain, and Release—the four stages of a sound's life cycle. Think of an envelope as an invisible robot hand that automatically turns the volume knob up and down for you every time you play a note.

1. **Envelope Attack Time**: This is how long it takes for the sound to fade in from zero to its maximum volume. A short attack (0.01 seconds) makes a sharp, percussive sound like a drum. A long attack (2.0 seconds) makes a swelling, atmospheric sound like a slow violin bow.
2. **Envelope Decay Time**: After reaching maximum volume, the sound might briefly drop down to a resting level. The decay time measures how long this initial drop takes.
3. **Envelope Sustain Level**: Unlike the others, this is not a time, but a volume level. Once the attack and decay phases are over, the sound holds steady at this sustain volume for as long as the note is held down.
4. **Envelope Release Time**: When you finally let go of the key, how long does it take for the sound to fade back to silence? A short release stops immediately; a long release rings out like a bell echoing in a canyon.

!!! mascot-tip "The Shape of Sound"
    ![Palette tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut to remember ADSR: Attack, Decay, and Release are amounts of TIME (in seconds), but Sustain is a LEVEL (from 0.0 to 1.0). Try `env.setADSR(0.01, 0.1, 0.5, 1.0)` to instantly get a classic plucky synthesizer sound!

    Once we have defined our ADSR values (`env.setADSR(attack, decay, sustain, release)`), we need to trigger it. We connect the envelope to our oscillator, and then issue a **Play Envelope Trigger** (`env.play()`). This tells the envelope to execute its volume automation, bringing our flat drone to life with percussive plucks or sweeping cinematic swells.

## 5. Noise and Filters: Carving the Sonic Marble

Synthesizers don't just make pure tones; they can also create chaos. In audio, "noise" is an electrical signal that contains all possible frequencies playing at random simultaneously. We can generate this using **p5 Noise White Pink**. 

White noise sounds like static on an old television or the harsh hiss of a crashing wave; it has equal energy across all frequencies. Pink noise is mathematically adjusted to have more energy in the lower frequencies, making it sound warmer and more natural, like heavy rain or a rushing waterfall. Noise is the perfect raw material for synthesizing drums, wind, or sci-fi sweep effects.

But pure noise is too raw. To make it musical, we must carve away the frequencies we don't want, much like a sculptor chiseling away marble. We do this using audio filters.

1. **Audio Filter Lowpass**: This filter acts like a bouncer at a club, only letting low frequencies pass through while blocking the high, screechy frequencies. It makes sounds darker, muffled, and underwater.
2. **Audio Filter Highpass**: The exact opposite. It lets high frequencies pass while slicing away the heavy bass. It makes sounds thin, airy, and tinny, like music playing from a cheap phone speaker.
3. **Audio Filter Bandpass**: This filter only lets a narrow "band" or chunk of frequencies pass through, rejecting both the extreme highs and the extreme lows. It sounds like someone talking through a walkie-talkie or an old telephone.

#### Diagram: Interactive Filter Sweep on Noise

<details markdown="1">
<summary>MicroSim: Interactive Filter Sweep on Noise</summary><summary>MicroSim: Interactive Filter Sweep on Noise</summary>

**Goal:** Demonstrate how a Lowpass filter shapes the frequency content of White Noise.

**Features:**
- A continuous stream of White Noise plays in the background.
- An interactive X/Y grid on the canvas.
- Mouse X controls the filter's cutoff frequency (from 10Hz to 10,000Hz). Moving right lets more high frequencies through.
- Mouse Y controls the filter's resonance (how much the frequencies at the cutoff point are boosted).
- A graphical representation of the frequency spectrum updates in real-time, showing the higher frequencies being chopped off as the mouse moves left.

</details>

## 6. The Effects Rack: Space and Destruction

At the bottom of our studio rack are the effects processors. These take our synthesized sounds and place them into physical spaces or mangle them for artistic effect.

First, we can add a **Reverb Sound Effect**. Reverb simulates the complex, dense echoes of a physical room. By running an oscillator through a p5.Reverb, we can make a tiny beep sound like it was played inside a massive cathedral or a long concrete tunnel. It adds depth, space, and emotion.

Next is the **Delay Sound Effect**. Unlike the smeared echoes of reverb, delay creates distinct, repeating copies of the sound—like yelling into a canyon and hearing your voice bounce back: "Hello... hello... hello...". You can control the delay time (how long between echoes) and feedback (how many echoes occur before they fade away).

Finally, if our sound is too clean, we can apply an **Audio Distortion Effect**. Distortion intentionally overloads the audio signal, clipping the tops of the waveforms. This introduces harmonic grit, crunch, and aggression. It's the exact same concept as plugging an electric guitar into an overdrive pedal and cranking the amp to 11. 

!!! mascot-warning "Watch your ears!"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out when adding distortion! It drastically increases your audio's raw signal amplitude and can hurt your ears or blow out speakers. To fix this, always chain an `.amp(0.1)` directly after your distortion node to protect your hearing!

## 7. Connecting the Cables: The Polyphonic Synth

To build a complete instrument, we must understand the **Audio Node Signal Route**. In the Web Audio API, audio flows through a chain of interconnected nodes. An oscillator (source node) connects to a filter (processing node), which connects to a reverb (effect node), which finally connects to the master output (destination node). Understanding this signal path is like tracing the cables on our synthesizer patchbay. We use methods like `.disconnect()` and `.connect()` in p5.js to route our audio precisely where we want it to go.

So far, we've only played one note at a time (a monophonic synthesizer). To play beautiful chords, we need a **Polyphonic Synthesizer**. "Polyphonic" means multiple voices. To achieve this in code, we create an array of multiple oscillators and envelopes. When the user presses three keys simultaneously, our code assigns three different oscillators to play the three different notes, allowing them to overlap and form a chord.

But how do we know what frequencies to assign? Musicians think in musical notes (C, D, E, F, G, A, B), not raw Hz values. To bridge this gap, we use a **Midi Note to Frequency** conversion (`midiToFreq()`). MIDI notes are simple numbers where 60 is Middle C, 61 is C-sharp, 62 is D, and so on. By feeding a MIDI note number into `midiToFreq()`, p5.js automatically calculates the exact Hertz value required to tune the oscillator perfectly. This makes it incredibly easy to program melodies and sequences using arrays of simple whole numbers!

## Conclusion

We have successfully wired our studio patchbay! We loaded records, synthesized raw waveforms, carved them with envelopes and filters, and bathed them in lush effects. We've traced the signal route from a mathematical sine wave all the way to a complex polyphonic chord. The world of generative sound design is now at your fingertips.

!!! mascot-celebration "Symphony Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    What a masterpiece, artists! You've successfully mastered the p5.sound library, synthesized custom oscillators, shaped time with ADSR envelopes, and routed audio effects! Let your sketches sing!
