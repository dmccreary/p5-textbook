---
title: Pedagogical Pattern Matcher
description: Interactive p5.js MicroSim for pedagogical pattern matcher.
image: /sims/pedagogical-pattern-matcher/pedagogical-pattern-matcher.png
og:image: /sims/pedagogical-pattern-matcher/pedagogical-pattern-matcher.png
twitter:image: /sims/pedagogical-pattern-matcher/pedagogical-pattern-matcher.png
social:
   cards: false
quality_score: 95
---

# Pedagogical Pattern Matcher

<div align="center"><i>Train educators on identifying student misconceptions and selecting scaffolding strategies</i></div>

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Pedagogical Pattern Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Pedagogical Pattern Matcher** MicroSim provides a teacher-facing quiz-style simulation designed to train educators. By reviewing a fictional student's buggy code and the resulting unexpected behavior, educators practice classifying common programming misconceptions (e.g., scoping errors, transformation accumulation) and selecting the most appropriate pedagogical scaffolding strategies (e.g., Semantic Tracing, Parsons Problems) to support the student's learning.

## How to Use

Interact with the simulation to evaluate each student scenario:

*   **Review the Code**: Read through the provided p5.js code block to understand what the fictional student has written.
*   **Analyze the Behavior**: Read the "Observed Behavior" text which describes what the student sees when running their program.
*   **Classify Misconception**: Use the dropdown menu to identify the core misunderstanding driving the bug.
*   **Select Scaffolding**: Choose the most effective teaching strategy to help the student correct their own understanding.
*   **Submit Evaluation**: Click the submit button to receive feedback on your choices and review the pedagogical explanation. Click "Next Scenario" to proceed to the next example.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/pedagogical-pattern-matcher/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Adult/Educator (Professional Development for Computer Science Teachers)

### Duration
15-20 minutes

### Prerequisites
*   Basic understanding of introductory programming concepts (scoping, variables, conditionals, loops).
*   Familiarity with the p5.js coordinate system and drawing loop (`setup()` and `draw()`).
*   Basic knowledge of common CS pedagogical strategies (e.g., Live Coding, Semantic Tracing, Parsons Problems).

### Activities

1.  **Exploration (5 min)**: Allow educators to interact with the first scenario individually. Have them read the code and behavior, and attempt to classify the error and select a strategy without direct instruction.
2.  **Guided Practice (10 min)**:
    *   *Scenario 1 (Scoping)*: Discuss as a group why variables declared in `draw()` are inaccessible in `mousePressed()`. Highlight why **Semantic Tracing** is the preferred strategy to help students visualize variable scope and memory.
    *   *Scenario 2 (Transformations)*: Review how transformations like `translate()` accumulate in the `draw()` loop. Discuss how **Live Coding** `push()` and `pop()` is highly effective for demonstrating the immediate visual impact of isolated transformations.
    *   *Scenario 3 (State Persistence)*: Analyze why the fill color persists across frames if not explicitly reset. Discuss the value of **Parsons Problems** for helping students structure missing `else` conditions correctly.
3.  **Assessment (5 min)**: Present a new, unseen buggy code scenario (e.g., an infinite `while` loop) and ask educators to write down the misconception and their proposed scaffolding strategy.

### Assessment
*   **Formative**: Observation of educators successfully identifying misconceptions in the simulation and engaging in peer discussion.
*   **Summative**: Educators can correctly articulate the rationale for pairing a specific scaffolding strategy (e.g., Semantic Tracing) with a particular class of error (e.g., Scoping).

## References

1.  [p5.js Reference: Coordinate System and Shapes](https://p5js.org/learn/coordinate-system-and-shapes.html)
2.  [CSEdResearch.org: Parsons Problems](https://csedresearch.org/parsons-problems/)
3.  [TeachAccess: Scaffolding Strategies](https://teachaccess.org/resources/scaffolding-strategies/)
