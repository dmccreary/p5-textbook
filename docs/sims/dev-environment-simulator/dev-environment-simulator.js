// dev-environment-simulator.js
// CANVAS_HEIGHT: 600

/*
 * MicroSim: Dev Environment Simulator
 * Demonstrates CORS errors and local server functionality.
 */

// Layout Constants
let EDITOR_W = 420;
let OUTPUT_H = 320;
let DEV_TOOLS_H = 280;
let CANVAS_W = 800;
let CANVAS_H = 600;

// State
let envMode = "local"; // "local" or "server"
let isRunning = false;
let simulationStep = 0; // 0: stopped, 1: loading, 2: error, 3: success, 4: running
let frameCounter = 0;

let consoleLogs = [];
let networkRequests = [];
let activeTab = "Console"; // "Console" or "Network"

const codeLines = [
  "// sketch.js",
  "let img;",
  "",
  "function preload() {",
  "  console.log('Loading assets...');",
  "  img = loadImage('assets/player.png');",
  "}",
  "",
  "function updateLayout() {
  CANVAS_W = windowWidth;
  EDITOR_W = min(420, CANVAS_W * 0.5);
  
  envBtn = { x: EDITOR_W - 250, y: 15, w: 140, h: 26 };
  runBtn = { x: EDITOR_W - 100, y: 15, w: 80, h: 26 };
  clearBtn = { x: CANVAS_W - 70, y: OUTPUT_H + 8, w: 50, h: 24 };
  tabConsole = { x: EDITOR_W, y: OUTPUT_H, w: 100, h: 40 };
  tabNetwork = { x: EDITOR_W + 100, y: OUTPUT_H, w: 100, h: 40 };
}

function windowResized() {
  resizeCanvas(windowWidth, CANVAS_H);
  updateLayout();
}

function setup() {",
  "  createCanvas(400, 300);",
  "  console.log('Setup complete.');",
  "}",
  "",
  "function draw() {",
  "  background(40);


  push();
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Dev Environment Simulator", width / 2, 10);
  pop();
",
  "  if (img) {",
  "    image(img, 150, 100, 100, 100);",
  "  }",
  "}"
];

// Button bounds for clicking
let envBtn;
let runBtn;
let clearBtn;
let tabConsole;
let tabNetwork;

function updateLayout() {
  CANVAS_W = windowWidth;
  EDITOR_W = min(420, CANVAS_W * 0.5);
  
  envBtn = { x: EDITOR_W - 250, y: 15, w: 140, h: 26 };
  runBtn = { x: EDITOR_W - 100, y: 15, w: 80, h: 26 };
  clearBtn = { x: CANVAS_W - 70, y: OUTPUT_H + 8, w: 50, h: 24 };
  tabConsole = { x: EDITOR_W, y: OUTPUT_H, w: 100, h: 40 };
  tabNetwork = { x: EDITOR_W + 100, y: OUTPUT_H, w: 100, h: 40 };
}

function windowResized() {
  resizeCanvas(windowWidth, CANVAS_H);
  updateLayout();
}

function setup() {
  createCanvas(windowWidth, CANVAS_H);
  updateLayout();
  textFont('monospace');
  
  // Initial console message
  addLog("system", "Dev Environment Ready.");
}

function draw() {
  background(255);
  
  // Simulation Logic Update
  if (isRunning) {
    frameCounter++;
    if (simulationStep === 1) {
      if (frameCounter === 30) {
        addLog("log", "Loading assets...");
      }
      if (frameCounter === 60) {
        if (envMode === "local") {
          // Trigger CORS error
          networkRequests.push({ name: "player.png", status: "(blocked: CORS)", type: "img", color: "red" });
          addLog("error", "Access to image at 'file:///assets/player.png' from origin 'null' has been blocked by CORS policy.");
          addLog("error", "p5.js says: It looks like there was a problem loading your image.");
          simulationStep = 2; // Error state
        } else {
          // Success
          networkRequests.push({ name: "player.png", status: "200 OK", type: "img", color: "green" });
          simulationStep = 3; // Success state
        }
      }
    } else if (simulationStep === 3) {
      if (frameCounter === 90) {
        addLog("log", "Setup complete.");
        simulationStep = 4; // Running state
      }
    }
  }
  
  // Draw Panels
  drawEditor();
  drawOutput();
  drawDevTools();
}

function drawEditor() {
  push();
  // Editor Background
  fill(30);
  noStroke();
  rect(0, 0, EDITOR_W, height);
  
  // Top Header Bar
  fill(45);
  rect(0, 0, EDITOR_W, 50);
  
  // File Tabs
  fill(255);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("sketch.js", 15, 25);
  stroke(100);
  line(15, 45, 90, 45); // Active tab indicator
  noStroke();
  
  // Env Toggle Button
  let hoverEnv = inBounds(mouseX, mouseY, envBtn);
  fill(hoverEnv ? 70 : 60);
  rect(envBtn.x, envBtn.y, envBtn.w, envBtn.h, 4);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  let envLabel = envMode === "local" ? "Env: Local File" : "Env: Local Server";
  if (envMode === "server") fill(100, 255, 100);
  text(envLabel, envBtn.x + envBtn.w / 2, envBtn.y + envBtn.h / 2);
  
  // Run Button
  let hoverRun = inBounds(mouseX, mouseY, runBtn);
  fill(hoverRun ? 0 : 30, hoverRun ? 150 : 120, hoverRun ? 0 : 30); // Greenish
  rect(runBtn.x, runBtn.y, runBtn.w, runBtn.h, 4);
  fill(255);
  textSize(12);
  text("▶ Run", runBtn.x + runBtn.w / 2, runBtn.y + runBtn.h / 2);
  
  // Code Text
  textSize(14);
  let y = 80;
  for (let i = 0; i < codeLines.length; i++) {
    let lineText = codeLines[i];
    
    // Line numbers
    fill(100);
    textAlign(RIGHT, CENTER);
    text(i + 1, 35, y);
    
    // Extremely crude syntax coloring
    textAlign(LEFT, CENTER);
    fill(220); // Default color
    
    let isComment = lineText.includes("//");
    let isFunction = lineText.includes("function");
    let isKeyword = lineText.includes("let");
    let isString = lineText.includes("'");
    
    if (isComment) {
      fill(106, 153, 85); // Green comments
    } else {
      if (isFunction || isKeyword) {
        fill(86, 156, 214); // Blue keywords
      } else if (isString) {
        fill(206, 145, 120); // Orange strings
      }
    }
    
    text(lineText, 50, y);
    y += 24;
  }
  
  // Border line
  stroke(0);
  line(EDITOR_W, 0, EDITOR_W, height);
  pop();
}

function drawOutput() {
  push();
  translate(EDITOR_W, 0);
  let w = CANVAS_W - EDITOR_W;
  
  // Browser Top Bar
  fill(240);
  noStroke();
  rect(0, 0, w, OUTPUT_H);
  
  fill(220);
  rect(0, 0, w, 40);
  
  // Address Bar
  fill(255);
  stroke(200);
  rect(60, 8, w - 80, 24, 12);
  
  // URL Text
  fill(100);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  let url = envMode === "local" 
    ? "file:///Users/student/desktop/project/index.html" 
    : "http://127.0.0.1:5500/index.html";
  text(url, 70, 20);
  
  // Browser Controls (Fake dots)
  fill(200, 80, 80); ellipse(15, 20, 10, 10);
  fill(200, 200, 80); ellipse(30, 20, 10, 10);
  fill(80, 200, 80); ellipse(45, 20, 10, 10);
  
  // Simulated Canvas Area
  translate(10, 50);
  let innerW = w - 20;
  let innerH = OUTPUT_H - 60;
  
  if (!isRunning) {
    fill(255);
    stroke(200);
    rect(0, 0, innerW, innerH);
    fill(150);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Click 'Run' to execute sketch.", innerW/2, innerH/2);
  } else {
    // Background(40)
    fill(40);
    noStroke();
    rect(0, 0, innerW, innerH); 
    
    if (simulationStep >= 4) {
      // Draw simulated player graphic
      fill(220, 100, 100); // Red body
      rect(innerW/2 - 30, innerH/2 - 30, 60, 60, 8);
      fill(255); // Eyes
      ellipse(innerW/2 - 12, innerH/2 - 10, 14, 14);
      ellipse(innerW/2 + 12, innerH/2 - 10, 14, 14);
      fill(0); // Pupils
      ellipse(innerW/2 - 12, innerH/2 - 10, 6, 6);
      ellipse(innerW/2 + 12, innerH/2 - 10, 6, 6);
      // Smile
      noFill();
      stroke(0);
      strokeWeight(2);
      arc(innerW/2, innerH/2 + 10, 20, 15, 0, PI);
    } else if (simulationStep === 2) {
      // Error state (nothing rendered, or broken image icon)
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text("Canvas is running, but image failed to load.", innerW/2, innerH/2);
    }
  }
  
  // Separator line
  stroke(180);
  strokeWeight(1);
  line(-10, innerH + 10, w - 10, innerH + 10);
  pop();
}

function drawDevTools() {
  push();
  translate(EDITOR_W, OUTPUT_H);
  let w = CANVAS_W - EDITOR_W;
  
  // DevTools BG
  fill(250);
  noStroke();
  rect(0, 0, w, DEV_TOOLS_H);
  
  // Tabs Bar
  fill(235);
  rect(0, 0, w, 40);
  
  // Console Tab
  let hoverC = inBounds(mouseX, mouseY, tabConsole);
  fill(activeTab === "Console" ? 250 : (hoverC ? 240 : 235));
  rect(0, 0, tabConsole.w, tabConsole.h);
  fill(50);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Console", tabConsole.w / 2, tabConsole.h / 2);
  
  // Network Tab
  let hoverN = inBounds(mouseX, mouseY, tabNetwork);
  fill(activeTab === "Network" ? 250 : (hoverN ? 240 : 235));
  rect(tabNetwork.x - EDITOR_W, 0, tabNetwork.w, tabNetwork.h);
  fill(50);
  text("Network", tabNetwork.w / 2 + 100, tabNetwork.h / 2);
  
  // Active Tab Highlight
  stroke(80, 150, 250);
  strokeWeight(2);
  if (activeTab === "Console") {
    line(0, 0, tabConsole.w, 0);
  } else {
    line(tabNetwork.w, 0, tabNetwork.w * 2, 0);
  }
  noStroke();
  
  // Clear Button
  let hoverClear = inBounds(mouseX, mouseY, clearBtn);
  fill(hoverClear ? 210 : 220);
  rect(clearBtn.x - EDITOR_W, clearBtn.y - OUTPUT_H, clearBtn.w, clearBtn.h, 3);
  fill(80);
  textSize(11);
  text("⃠ Clear", clearBtn.x - EDITOR_W + clearBtn.w / 2, clearBtn.y - OUTPUT_H + clearBtn.h / 2);
  
  // Tab Content
  translate(0, 40);
  if (activeTab === "Console") {
    drawConsole(w);
  } else {
    drawNetwork(w);
  }
  
  pop();
}

function drawConsole(w) {
  push();
  let y = 15;
  for (let i = 0; i < consoleLogs.length; i++) {
    let log = consoleLogs[i];
    textSize(12);
    textAlign(LEFT, TOP);
    
    if (log.type === "error") {
      fill(255, 235, 235);
      rect(0, y - 5, w, 32); // background tint
      fill(200, 0, 0);
      text("ⓧ", 10, y);
      
      // Wrap text slightly for long error
      text(log.msg, 30, y, w - 40, 30);
      y += 32;
    } else if (log.type === "system") {
      fill(120);
      text("ℹ " + log.msg, 10, y);
      y += 20;
    } else {
      fill(50);
      text("▶ " + log.msg, 10, y);
      y += 20;
    }
  }
  pop();
}

function drawNetwork(w) {
  push();
  // Header
  fill(240);
  rect(0, 0, w, 25);
  fill(100);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Name", 15, 12);
  text("Status", 160, 12);
  text("Type", 280, 12);
  
  let y = 25;
  for (let i = 0; i < networkRequests.length; i++) {
    let req = networkRequests[i];
    
    fill(255);
    rect(0, y, w, 25);
    stroke(230);
    line(0, y+25, w, y+25);
    noStroke();
    
    if (req.color === "red") fill(200, 0, 0);
    else fill(0, 120, 0);
    
    text(req.name, 15, y + 12);
    text(req.status, 160, y + 12);
    text(req.type, 280, y + 12);
    
    y += 25;
  }
  pop();
}

function mousePressed() {
  // Check Env Button
  if (inBounds(mouseX, mouseY, envBtn)) {
    envMode = envMode === "local" ? "server" : "local";
    // Reset simulation when env changes
    isRunning = false;
    simulationStep = 0;
    addLog("system", "Environment changed to: " + envMode);
  }
  
  // Check Run Button
  if (inBounds(mouseX, mouseY, runBtn)) {
    isRunning = true;
    simulationStep = 1;
    frameCounter = 0;
    
    consoleLogs = [];
    networkRequests = [];
    addLog("system", "Starting sketch execution...");
  }
  
  // Check Tab Console
  if (inBounds(mouseX, mouseY, tabConsole)) {
    activeTab = "Console";
  }
  
  // Check Tab Network
  if (inBounds(mouseX, mouseY, tabNetwork)) {
    activeTab = "Network";
  }
  
  // Check Clear Button
  if (inBounds(mouseX, mouseY, clearBtn)) {
    consoleLogs = [];
    networkRequests = [];
  }
}

function addLog(type, msg) {
  consoleLogs.push({ type: type, msg: msg });
  // Prevent overflow
  if (consoleLogs.length > 7) {
    consoleLogs.shift();
  }
}

// Utility for clicking
function inBounds(mx, my, btn) {
  return mx >= btn.x && mx <= btn.x + btn.w &&
         my >= btn.y && my <= btn.y + btn.h;
}
