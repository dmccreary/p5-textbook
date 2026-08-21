# Quiz: Image Processing, Filters & Video Capture

Test your understanding of p5.Image, pixel manipulation, convolutional kernel filters, thresholding, and live webcam capture with these review questions.

---

#### 1. Which p5.js function captures a live video stream from the user's connected webcam?

<div class="upper-alpha" markdown>
1. createCapture(VIDEO)
2. newWebcam()
3. loadVideo('webcam')
4. getVideoStream()
</div>

??? question "Show Answer"
    The correct answer is **A**. `createCapture(VIDEO)` requests webcam access and creates an HTML5 `<video>` element that can be drawn to the canvas using `image(capture, x, y)`. Options B, C, and D are not p5.js capture functions.

    **Concept Tested:** Create Capture Webcam

---

#### 2. Which built-in p5.js image filter converts an image into pure black and white pixels based on a luminance threshold?

<div class="upper-alpha" markdown>
1. filter(THRESHOLD, [level])
2. filter(GRAY)
3. filter(INVERT)
4. filter(POSTERIZE)
</div>

??? question "Show Answer"
    The correct answer is **A**. `filter(THRESHOLD, [level])` evaluates every pixel's brightness against a threshold level (0.0 to 1.0), converting pixels to pure white or pure black. `filter(GRAY)` creates grayscale. `filter(INVERT)` inverts colors. `filter(POSTERIZE)` quantizes palettes.

    **Concept Tested:** Filter Threshold Function

---

#### 3. What mathematical operation is performed by a 3x3 Convolution Matrix Filter in image processing?

<div class="upper-alpha" markdown>
1. Pixels are sorted alphabetically by RGB hex code
2. Each output pixel is calculated as the weighted sum of its neighboring pixels multiplied by kernel matrix coefficients
3. The image is scaled down by 33%
4. All pixel values are divided by canvas width
</div>

??? question "Show Answer"
    The correct answer is **B**. Convolution slides a small matrix of weights (the kernel) over every pixel, multiplying overlapping neighbor pixels by kernel weights and summing the result to achieve effects like sharpening, blurring, and edge detection. Options B, C, and D are false.

    **Concept Tested:** Convolution Kernel Filter

---

#### 4. Which 3x3 convolution kernel is widely used for edge detection (Sobel / Laplacian)?

<div class="upper-alpha" markdown>
1. A kernel containing all zeros
2. A kernel with high center weight surrounded by negative neighbor weights (e.g. [-1,-1,-1, -1,8,-1, -1,-1,-1])
3. A kernel containing all ones [1,1,1, 1,1,1, 1,1,1]
4. A kernel with identity matrix diagonal ones
</div>

??? question "Show Answer"
    The correct answer is **B**. Edge detection filters use kernels whose weights sum to zero with negative surrounds and positive center (or directional gradients), highlighting areas of rapid brightness transition (edges) while canceling uniform regions. Options B, C, and D do not detect edges.

    **Concept Tested:** Edge Detection Kernel

---

#### 5. How do you sample the RGBA color of a pixel at coordinate (x, y) from a `p5.Image` object `img`?

<div class="upper-alpha" markdown>
1. img.sample(x, y)
2. img.get(x, y)
3. img.pixelAt(x, y)
4. img.read(x, y)
</div>

??? question "Show Answer"
    The correct answer is **B**. `img.get(x, y)` retrieves the color of a specific pixel from an image object as a `[r, g, b, a]` array or `p5.Color`. Options B, C, and D are not p5.Image methods.

    **Concept Tested:** Image Get Pixel Method

---

#### 6. What is the visual technique of replacing fine image pixels with larger graphic shapes (circles, letters, ascii characters) called?

<div class="upper-alpha" markdown>
1. Raster De-interlacing
2. Raytracing
3. Creative Coding Pixelation / ASCII Art Mosaic
4. Vectorization
</div>

??? question "Show Answer"
    The correct answer is **C**. Sampling pixel colors at stepped grid intervals (e.g. every 10 pixels) and drawing sized geometry or characters at those positions creates artistic mosaic, halftoning, and ASCII art effects. Options B, C, and D describe other graphics processes.

    **Concept Tested:** Pixelation Mosaic Concept

---

#### 7. To build an interactive green-screen (chroma key) filter, how does the pixel processing loop operate?

<div class="upper-alpha" markdown>
1. It inverts the canvas coordinate system
2. It replaces all red pixels with blue pixels
3. It checks if a pixel's RGB color is within a target color distance of green, setting its alpha channel to 0 if matched
4. It deletes the webcam capture stream
</div>

??? question "Show Answer"
    The correct answer is **C**. Chroma keying evaluates the Euclidean color distance between each pixel's color `(r, g, b)` and the background green key color. If the distance falls below a tolerance threshold, the pixel's alpha channel `pixels[i+3]` is set to 0 (transparent). Options B, C, and D are false.

    **Concept Tested:** Chroma Key Algorithm

---

#### 8. Why is drawing a video capture to an off-screen `p5.Graphics` buffer or scaling down capture dimensions (e.g. 160x120) critical when processing pixels in JavaScript?

<div class="upper-alpha" markdown>
1. Webcams cannot record video in color unless scaled down
2. p5.js cannot display videos larger than 200 pixels
3. Processing raw 1080p frames requires evaluating over 8 million array elements per frame, which drops JavaScript frame rates below 60 FPS
4. Offscreen buffers automatically convert video to vector paths
</div>

??? question "Show Answer"
    The correct answer is **C**. A 1920x1080 video frame contains ~2.07 million pixels (over 8.2 million array values). Iterating through 8 million array reads and writes in JavaScript on every frame exceeds CPU budgets; downscaling to 160x120 reduces workload by >98%. Options B, C, and D are false.

    **Concept Tested:** Video Processing Optimization

---

#### 9. Which built-in filter blurs an image using a Gaussian convolution filter?

<div class="upper-alpha" markdown>
1. filter(DIFFUSE)
2. filter(SMOOTH)
3. filter(SOFTEN)
4. filter(BLUR, [radius])
</div>

??? question "Show Answer"
    The correct answer is **D**. `filter(BLUR, [radius])` applies Gaussian blur to the canvas with the specified pixel radius. Options B, C, and D are not p5.js filter constants.

    **Concept Tested:** Filter Blur Gaussian

---

#### 10. What function draws a `p5.Image` or video capture object onto the canvas at coordinate (x, y)?

<div class="upper-alpha" markdown>
1. blit(img, x, y)
2. drawImage(img, x, y)
3. renderImage(img, x, y)
4. image(img, x, y, [width], [height])
</div>

??? question "Show Answer"
    The correct answer is **D**. `image(img, x, y, [w], [h])` renders an image, offscreen graphics buffer, or video stream onto the canvas at the specified coordinates. Options B, C, and D are not p5.js drawing commands.

    **Concept Tested:** Image Drawing Function

---
