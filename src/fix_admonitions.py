import os

files = {
    "docs/chapters/22-mic-input-fft/index.md": [
        (
            """!!! mascot-tip "Smoothing is Key!"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    If your shapes are twitching too much, try using `lerp()` to create a **Smooth Amplitude Level**!""",
            """!!! mascot-tip "Smoothing is Key!"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a secret for buttery visuals: raw microphone data flickers way too fast. Wrap your volume variable in `lerp(currentVol, targetVol, 0.1)` to smoothly glide between values and create a **Smooth Amplitude Level**. Your users' eyes will thank you!"""
        ),
        (
            """!!! mascot-celebration "Awesome Work!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You've mastered the oscilloscope and the prism! Your code is now dancing to the rhythm of the world! Keep experimenting and painting with sound!""",
            """!!! mascot-celebration "Awesome Work!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered capturing real-time `p5.AudioIn` data, extracting frequency bins with the Fast Fourier Transform, and building dynamic beat detection algorithms!"""
        ),
        (
            """With this array, we can ask for the energy in specific frequency ranges.""",
            """With this array, we can ask for the energy in specific frequency ranges.

!!! mascot-thinking "Unbaking the Cake"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: an oscilloscope shows you *when* a sound is loud, but the Fast Fourier Transform shows you *what* the sound is made of. It's like a magical algorithm that unbakes a cake to tell you exactly how many cups of bass, mid, and treble went into it!"""
        ),
        (
            """### Handling Feedback
When working with live microphones and speakers simultaneously, you might experience a loud squealing noise. This is acoustic feedback, where the microphone picks up the speaker output, amplifies it, and plays it back in a loop. To prevent this, professional systems use a **Microphone Feedback Gate** (or noise gate) to mute the mic when the volume drops below a certain level.""",
            """### Handling Feedback
When working with live microphones and speakers simultaneously, you might experience a loud squealing noise. This is acoustic feedback, where the microphone picks up the speaker output, amplifies it, and plays it back in a loop. To prevent this, professional systems use a **Microphone Feedback Gate** (or noise gate) to mute the mic when the volume drops below a certain level.

!!! mascot-warning "Beware the Squeal!"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for the infinite feedback loop! If your microphone hears your speakers, it will amplify the sound until it creates a deafening screech. To avoid blasting your ears, always wear headphones while coding audio-reactive sketches!"""
        ),
        (
            """The core idea, formulated by Jean-Baptiste Joseph Fourier in the 19th century, is that any complex periodic wave can be constructed by adding together a series of simple sine and cosine waves of varying frequencies and amplitudes. When we call the analyze method on our FFT object, the algorithm is essentially working backwards: it takes the complex, chaotic wave recorded by the microphone and calculates the exact recipe of simple sine waves needed to recreate it.""",
            """The core idea, formulated by Jean-Baptiste Joseph Fourier in the 19th century, is that any complex periodic wave can be constructed by adding together a series of simple sine and cosine waves of varying frequencies and amplitudes. When we call the analyze method on our FFT object, the algorithm is essentially working backwards: it takes the complex, chaotic wave recorded by the microphone and calculates the exact recipe of simple sine waves needed to recreate it.

!!! mascot-encourage "Breathe and Trust the Math"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the calculus behind the Fast Fourier Transform feels overwhelming, that's completely normal! You don't need to manually calculate sine wave interference to be an artist. Just trust `p5.FFT` to hand you the frequencies, and focus on the beautiful visuals you can paint with them."""
        )
    ],
    "docs/chapters/23-image-processing-video/index.md": [
        (
            """!!! mascot-thinking "Thinking about Performance"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Calling the resize command inside the draw loop is a recipe for disaster! Always resize your artwork once during setup so you don't stall the browser.""",
            """!!! mascot-thinking "Thinking about Performance"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: `resize()` doesn't just zoom out, it fundamentally shreds and rebuilds the image pixel-by-pixel. If you put that inside the `draw` loop, your browser is rebuilding the universe 60 times a second! Always resize your artwork once in `setup()`."""
        ),
        (
            """!!! mascot-tip "Filter Stacking"
    ![Palette sharing a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    You can stack multiple filters together! Try applying a blur before a threshold to create smooth, organic blobs instead of sharp, noisy edges.""",
            """!!! mascot-tip "Filter Stacking"
    ![Palette sharing a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a secret recipe for cool effects: stack your filters! If you run `filter(BLUR)` right before `filter(THRESHOLD)`, you'll melt away all the noisy jagged edges and get perfectly smooth, organic blobs."""
        ),
        (
            """!!! mascot-warning "Performance Pitfalls"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    When looping through pixels for ASCIIfy or Halftone effects, don't check every single coordinate! Skip by a defined step size (like 10 or 20 pixels) to keep your frame rate high. Processing two million pixels every frame will freeze the browser.""",
            """!!! mascot-warning "Performance Pitfalls"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for the freeze! If you try to loop through every single pixel of an HD webcam feed every frame, your browser will crash from the sheer mathematical load. To avoid this, change your `for` loops to skip by a step size (`i += 10`) instead of checking every pixel."""
        ),
        (
            """!!! mascot-celebration "Master of the Digital Darkroom!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You've learned how to harness the raw mathematical power of image processing and live video. The digital darkroom is officially open for business.""",
            """!!! mascot-celebration "Master of the Digital Darkroom!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered manipulating the 1D pixel array, processing live `createCapture` video feeds, and applying convolution matrices to build your own custom filters!"""
        ),
        (
            """// A heavy blur convolution kernel (Gaussian approximation)""",
            """!!! mascot-encourage "Matrix Math Can Be Tricky"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If wrapping your head around 3x3 convolution kernels feels like solving a Rubik's cube blindfolded, don't worry! You don't have to invent the math yourself. Start by copying standard blur or sharpen kernels, and slowly tweak the numbers to see how the image reacts.

// A heavy blur convolution kernel (Gaussian approximation)"""
        )
    ],
    "docs/chapters/24-generative-typography/index.md": [
        (
            """!!! mascot-thinking "Measuring Up"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Measuring text bounds is crucial when you want to draw a tight rectangle around a word or detect if the mouse is hovering over it!""",
            """!!! mascot-thinking "Measuring Up"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: a word isn't just a stamp of ink, it's an invisible rectangular container occupying physical space on your canvas. By extracting the **Text Bounds Bounding Box**, you can finally 'see' that invisible container, allowing your code to perfectly align shapes or detect when a mouse touches a specific letter!"""
        ),
        (
            """!!! mascot-celebration "Masterpiece Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You did it, artists! We've turned static text into living, kinetic art. Keep exploring and creating!""",
            """!!! mascot-celebration "Masterpiece Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered loading custom `.ttf` files, extracting vector coordinates using `textToPoints()`, and building interactive, kinetic typography systems!"""
        ),
        (
            """```javascript
let pts;
let myFont;""",
            """!!! mascot-tip "Too Many Points?"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a secret: if your kinetic text sketch is running slow, check your `sampleFactor`! Lowering it from `0.25` to `0.1` will drastically reduce the number of vector points generated, speeding up your physics calculations without ruining the shape of the letters.

```javascript
let pts;
let myFont;"""
        ),
        (
            """### Advanced: Generative Type Grid

A generative type grid involves arranging characters in a systematic yet randomized layout. We can use loops to create a grid and populate it with letters from a string or random characters.""",
            """### Advanced: Generative Type Grid

!!! mascot-warning "Beware the Infinite Loop"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out when building text grids! If you use `textWidth()` inside a `for` loop that runs thousands of times, it will drastically slow down your sketch. Always calculate your font metrics once in `setup()` and store them in variables before drawing!

A generative type grid involves arranging characters in a systematic yet randomized layout. We can use loops to create a grid and populate it with letters from a string or random characters."""
        )
    ],
    "docs/chapters/25-dev-environment-pedagogy/index.md": [
        (
            """!!! mascot-warning "Security Blockers!"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If your local sounds aren't loading, you might be hitting a CORS issue! Let's check our local server.""",
            """!!! mascot-warning "Security Blockers!"
    ![Palette warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watch out for the CORS blocker! If you just double-click your `index.html` file, your browser's security policy will block your local audio and image files from loading, resulting in a blank screen. To fix this, you must run a **Local Web Server Python** (like `python -m http.server`) and open `localhost` in your browser!"""
        ),
        (
            """!!! mascot-thinking "Connecting the Logic"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice how these pioneers broke down complex ideas? That's computational thinking!""",
            """!!! mascot-thinking "Connecting the Logic"
    ![Palette thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think about it like this: computational thinking isn't just about writing code; it's a mental model for translating artistic vision into logic. By breaking a masterpiece down through **Algorithmic Decomposition**, you turn an overwhelmingly complex painting into a series of simple, repeatable brush strokes."""
        ),
        (
            """!!! mascot-celebration "Master of the Workbench!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You are fully equipped to build, debug, and share your interactive masterpieces with the world. Keep blending code!""",
            """!!! mascot-celebration "Master of the Workbench!"
    ![Palette celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Incredible work! You just mastered configuring a local `VS Code Code Editor`, squashing bugs with `JavaScript Breakpoints`, and sharing your sketches via `GitHub Pages Deployment`!"""
        ),
        (
            """At the workbench, professionals track changes. Using **Git Version Control**, you can save snapshots of your code. You'll push these snapshots to **GitHub Repository Hosting** for backup and collaboration.""",
            """At the workbench, professionals track changes. Using **Git Version Control**, you can save snapshots of your code. You'll push these snapshots to **GitHub Repository Hosting** for backup and collaboration.

!!! mascot-tip "Time Travel with Git"
    ![Palette giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a pro-tip for fearless coding: commit your changes to **Git Version Control** frequently! If you accidentally break your sketch while experimenting, you don't have to panic. You can simply time-travel back to your last working commit with a single click."""
        ),
        (
            """Be prepared for standard pitfalls:""",
            """!!! mascot-encourage "Embrace the Bugs"
    ![Palette encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If your screen is suddenly filled with red error text, take a deep breath! Every programmer, from beginners to experts, makes typos and scope errors. Bugs aren't failures; they are just puzzles waiting for your new **Debugging Mental Model** to solve them.

Be prepared for standard pitfalls:"""
        )
    ]
}

base_dir = "/Users/dan/Documents/ws/p5-textbook"

for filepath, replacements in files.items():
    full_path = os.path.join(base_dir, filepath)
    with open(full_path, "r") as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: Could not find string in {filepath}:\n{old}\n---")
            
    with open(full_path, "w") as f:
        f.write(content)

print("Done")
