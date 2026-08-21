# p5 and MicroSims

## Introduction

In the pursuit of understanding how students grasp computational concepts, educators Val Lockhart, Troy Peterson, and Dan McCreary have pioneered the use of p5.js (and other JavaScript libraries) to gather interaction events directly from intelligent textbooks. This approach shifts the focus from traditional, repetitive multiple-choice quizzes to interactive, engaging activities that students genuinely enjoy.

By logging how a student interacts with a MicroSim—such as adjusting a slider to see real-time updates in a geometric sketch or pressing buttons to simulate physics forces—we can generate rich, granular data. This data is far more predictive of a student's true comprehension than simply checking if they selected the correct answer in a static quiz.

## The MicroSim Framework

The framework driving this interactive learning approach is formally defined in recent research.

> **Lockhart, V., McCreary, D., & Peterson, T. A.** (2025). *MicroSims: A Framework for AI-Generated, Scalable Educational Simulations with Universal Embedding and Adaptive Learning Support*. arXiv:2511.19864 [cs.HC].  
> Paper URL: [https://arxiv.org/abs/2511.19864](https://arxiv.org/abs/2511.19864)

This paper formalizes the architectural specifications, prompt generation pipelines, and universal embedding standards for **MicroSims**—lightweight, self-contained, interactive simulation widgets that dynamically adapt to student learning needs without LMS lock-in.

## Why Interaction Beats Quizzing

Gathering events from fun activities provides several distinct advantages:

1. **Continuous Assessment**: Instead of pausing the learning process to take a test, the learning activity *is* the assessment.
2. **Behavioral Insights**: We can track how many attempts a student makes, how quickly they adjust parameters, and whether they methodically test limits or randomly click.
3. **Reduced Test Anxiety**: When the evaluation is embedded in a playful simulation, students are more likely to explore and make mistakes, which are critical parts of the learning process.
4. **Predictive Analytics**: The rich telemetry gathered from tools like p5.js can be fed into machine learning models to predict a student's grasp of a concept long before a formal exam.

## Integrating MicroSim Data

For more detailed information on how to integrate an intelligent textbook (like this one) with MicroSims into an external system, please see the appendix on [LMS Integration](../lms-integration/index.md). By leveraging universal embedding and event streaming, telemetry from these p5.js sketches can seamlessly communicate with Learning Record Stores (LRS) or other analytics backends, allowing for real-time dashboards of student comprehension.
