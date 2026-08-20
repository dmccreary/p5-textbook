---
title: UI Component Playground
description: Interactive p5.js MicroSim for ui component playground.
image: /sims/ui-component-playground/ui-component-playground.png
og:image: /sims/ui-component-playground/ui-component-playground.png
twitter:image: /sims/ui-component-playground/ui-component-playground.png
social:
   cards: false
quality_score: 95
---

# UI Component Playground

<div align="center"><i>Learn how to create, position, and style DOM elements relative to the p5.js canvas</i></div>

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the UI Component Playground MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim explores the integration of standard HTML DOM elements (such as buttons, sliders, and inputs) with the p5.js canvas. While the canvas is excellent for drawing pixels and shapes, interactive interfaces often require DOM elements that float or layer over the graphics. 

Students can manipulate a target DOM element's type, position, CSS styles, and parent container. By switching the parent hierarchy from the Canvas Wrapper to the main Document Body, students will visually experience the difference between relative and absolute coordinate contexts.

## How to Use

- **DOM Element Type**: Use the dropdown to spawn different types of HTML components (Buttons, Sliders, Text Inputs).
- **Position Sliders**: Adjust the X and Y coordinates. Observe how the DOM element aligns with the red crosshair drawn natively on the canvas.
- **CSS Style Injector**: Type raw inline CSS (e.g., `background-color: blue; padding: 20px;`) to dynamically style the component.
- **DOM Hierarchy Toggle**: Uncheck "Parent to Canvas Wrapper" to attach the element to the page body instead of the canvas wrapper. Notice how the element jumps to a different location, despite having the exact same X and Y coordinates, because its spatial context has changed.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/ui-component-playground/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science or Web Development)

### Duration
15-20 minutes

### Prerequisites
- Basic understanding of the p5.js canvas coordinate system `(x, y)`.
- Familiarity with the concepts of HTML elements and basic CSS styling.

### Activities

1. **Exploration** (5 min): Allow students to freely play with the simulation. Ask them to create a button, style it to look like a pill (using `border-radius: 20px`), and move it to the center of the canvas.
2. **Context Shift** (5 min): Instruct students to set the X and Y sliders to `(0, 0)`. Then, ask them to uncheck the "Parent to Canvas Wrapper" box. Discuss why the element suddenly moved to the top-left of the overall frame rather than the canvas.
3. **Styling Challenge** (5 min): Provide students with a list of CSS properties (`box-shadow`, `border`, `font-family`, `opacity`) and challenge them to recreate specific UI styles (e.g., a "flat design" button or a "glassmorphism" input field).

### Assessment
- **Formative Assessment**: Walk around and verify that students can accurately explain why changing the parent element shifts the visual position of the component.
- **Exit Ticket**: Ask students to write down the difference between rendering text via `text()` on the canvas versus creating a `<p>` tag that overlays the canvas using `createP()`.

## References

1. [p5.js DOM Reference](https://p5js.org/reference/#/p5.Element)
2. [MDN Web Docs: CSS Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
