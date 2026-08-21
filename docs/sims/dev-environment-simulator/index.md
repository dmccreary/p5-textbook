---
title: "Dev Environment Simulator"
description: "Interactive p5.js MicroSim for dev environment simulator."
image: /sims/dev-environment-simulator/dev-environment-simulator.png
og:image: /sims/dev-environment-simulator/dev-environment-simulator.png
twitter:image: /sims/dev-environment-simulator/dev-environment-simulator.png
social:
   cards: false
quality_score: 90
---

# Dev Environment Simulator
<div align="center"><i>Simulate debugging, console logs, network errors (CORS), and developer tools</i></div>

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Dev Environment Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **Dev Environment Simulator** MicroSim familiarizes students with the standard layout and features of an Integrated Development Environment (IDE) or code editor setup. By presenting a mock code editor alongside a console output and network tab, students can experience realistic debugging scenarios—like dealing with Cross-Origin Resource Sharing (CORS) errors—without the frustration of configuring an actual local server environment.

## How to Use

Each panel and control in this simulation represents a real-world development tool:

*   **Mock Code Editor**: A simplified interface where code blocks are displayed. Click the **Run** button to simulate executing the code.
*   **Environment Toggle**: Click the **Env** button in the code editor header to toggle between simulating a 'Local File System' environment and a 'Localhost Web Server'. Notice how certain actions behave differently depending on this environment.
*   **Console Output Viewer**: Displays messages, warnings, and errors. Observe what happens when you attempt to load a local asset in 'Local' mode versus 'Server' mode. 
*   **Network Tab Viewer**: Simulates checking network requests for assets. Failed loads show up here with status codes, reinforcing how developers track down missing files or permission issues.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/p5-textbook/sims/dev-environment-simulator/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Computer Science / Web Development)

### Duration
15-20 minutes

### Prerequisites
* Basic understanding of what a web browser is and how it requests files.
* Introductory knowledge of what an error message is.

### Activities

1. **Exploration (5 min)**: Allow students to explore the interface. Ask them to toggle between the Local and Server environments and click the 'Run' button to see what happens in the console.
2. **Guided Practice (10 min)**: 
   * *Concept: The Console*: Direct students to the Console tab. Have them execute the mock sketch and view the console. Discuss how the console is the primary way programs "talk" to developers.
   * *Concept: CORS Errors*: Have students switch to the 'Local File' environment and click **Run**. When the red CORS error appears in the console, explain that browsers block local files from loading other local files for security reasons.
   * *Concept: Local Servers*: Now ask them to switch to the 'Local Server' environment and run the code again. The image loads successfully. Explain that a local server acts like a mini-website on their computer, bypassing the local file security restrictions.
3. **Assessment (5 min)**: Present a scenario: "You download a p5.js project from GitHub, double-click the `index.html` file, and see a blank white screen. What is the first tool you should check, and what error are you likely to find if there are images?" (Answer: Check the Console/Network tab; likely a CORS error).

### Assessment
* **Formative**: Observation of students navigating between the Console and Network tabs to identify where errors are reported.
* **Summative**: Students can correctly explain why they need a local server (like VS Code Live Server) when working with images, sound, or data files in p5.js.

## References

1. [MDN Web Docs: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
2. [p5.js Wiki: Local server](https://github.com/processing/p5.js/wiki/Local-server)
3. [Chrome DevTools: Console overview](https://developer.chrome.com/docs/devtools/console/)
