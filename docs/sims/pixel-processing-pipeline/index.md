---
title: Pixel Processing Pipeline
description: Interactive p5.js MicroSim for pixel processing pipeline.
image: /sims/pixel-processing-pipeline/pixel-processing-pipeline.png
og:image: /sims/pixel-processing-pipeline/pixel-processing-pipeline.png
twitter:image: /sims/pixel-processing-pipeline/pixel-processing-pipeline.png
social:
   cards: false
quality_score: 95
---

# Pixel Processing Pipeline

<div align="center"><i>Interactive image filter pipeline with convolution matrices</i></div>

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Pixel Processing Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The Pixel Processing Pipeline MicroSim provides an interactive exploration of image filtering and pixel-level manipulation. It allows students to toggle between a static sample image and their device's webcam feed to observe how various digital image filters alter pixel data in real-time. By sequentially applying standard filters—such as grayscale, blur, threshold, and posterize—along with a customizable 3x3 convolution matrix, learners gain hands-on experience with foundational concepts in computer vision and image processing.

## How to Use

1. **Media Source:** Use the dropdown to select between the static "Sample Image" and your "Webcam". Note: webcam access must be granted by your browser.
2. **Filter Selection:** Choose from several predefined filters (None, Grayscale, Blur, Threshold, Posterize, Custom Convolution).
3. **Adjust Threshold:** When the "Threshold" filter is selected, adjust the slider to set the cutoff value for black and white conversion.
4. **Custom Convolution:** Select the "Custom Convolution" filter to enable the 3x3 matrix inputs. Enter weights to create effects like edge detection or sharpening. 
5. **Blend Mode:** Choose a blend mode (Normal, Multiply, Screen, Overlay, Hard Light, Difference) to see how the filtered image blends with the original image data.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/pixel-processing-pipeline/main.html"
        height="652px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
11-12 (Advanced Computer Science, Digital Media)

### Duration
20-30 minutes

### Prerequisites
* Basic understanding of RGB color representation.
* Familiarity with arrays and pixel coordinates (x, y).

### Activities

1. **Exploration** (5 min): Select the "Sample Image" and toggle through each filter preset. Observe how grayscale, blur, threshold, and posterization visually affect the image.
2. **Guided Practice - Thresholding** (10 min): Choose the "Threshold" filter. Move the threshold slider back and forth. Discuss how thresholding mathematically maps pixel brightness values to pure black or white.
3. **Deep Dive - Convolution** (10 min): Select the "Custom Convolution" filter. Input a simple edge detection matrix (e.g., center: 8, surrounding: -1) and observe the effect. Modify the center weight to see how it affects the image's overall brightness and sharpness.

### Assessment
* Students should be able to explain how the thresholding filter works.
* Students should be able to predict the visual effect of an edge detection vs. a sharpening convolution kernel.

## References

1. [p5.js Image Processing](https://p5js.org/reference/#/p5.Image)
2. [Convolution Matrix (Wikipedia)](https://en.wikipedia.org/wiki/Kernel_(image_processing))
