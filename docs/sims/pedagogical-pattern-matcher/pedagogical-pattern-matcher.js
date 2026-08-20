/**
 * Pedagogical Pattern Matcher MicroSim
 * 
 * Educational Purpose: To train educators on identifying student misconceptions 
 * and selecting scaffolding strategies.
 */
// CANVAS_HEIGHT: 450

let scenarios = [
  {
    studentName: "Alex",
    code: "let x = 50;\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  let y = 100;\n  ellipse(x, y, 50, 50);\n}\n\n// Error: y is not defined\nfunction mousePressed() {\n  y = y + 10; \n}",
    behavior: "When the mouse is pressed, the program crashes with 'ReferenceError: y is not defined'.",
    misconception: "Scoping Error",
    scaffolding: "Semantic Tracing",
    explanation: "The variable 'y' is declared inside draw(), making it a local variable. It cannot be accessed in mousePressed(). Semantic Tracing helps the student step through code execution to see where variables exist in memory."
  },
  {
    studentName: "Jordan",
    code: "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  translate(50, 50);\n  rect(0, 0, 40, 40);\n  \n  translate(100, 100);\n  rect(0, 0, 40, 40);\n}",
    behavior: "The second rectangle appears further down and right than expected (at 150, 150 instead of 100, 100).",
    misconception: "Transformation Accumulation",
    scaffolding: "Live Coding",
    explanation: "Transformations like translate() accumulate within the draw loop. The second translate(100, 100) adds to the first. Live coding demonstrating push() and pop() is highly effective here."
  },
  {
    studentName: "Taylor",
    code: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n}\n\nfunction draw() {\n  if (mouseX > 200) {\n    fill(255, 0, 0);\n  }\n  ellipse(mouseX, mouseY, 50, 50);\n}",
    behavior: "Once the mouse goes past x=200, the circles turn red. But when moving back left, they stay red!",
    misconception: "State Persistence",
    scaffolding: "Parsons Problem",
    explanation: "p5.js retains the fill state until it's changed. The student is missing an 'else' block or a default fill. A Parsons Problem can guide them to correctly structure the if/else logic."
  }
];

let currentScenario = 0;
let misconceptionSelect;
let scaffoldingSelect;
let submitBtn;
let nextBtn;
let state = "PLAYING"; // "PLAYING", "FEEDBACK"

const misconceptions = [
  "Select Misconception...",
  "Scoping Error",
  "Transformation Accumulation",
  "State Persistence",
  "Syntax Error",
  "Infinite Loop"
];

const scaffoldings = [
  "Select Strategy...",
  "Semantic Tracing",
  "Live Coding",
  "Parsons Problem",
  "Rubber Ducking",
  "Worked Example"
];

function setup() {
  let canvas = createCanvas(windowWidth, 450);
  canvas.parent(document.querySelector('main') || document.body);
  
  misconceptionSelect = createSelect();
  
  misconceptionSelect.style('font-size', '16px');
  misconceptionSelect.style('padding', '5px');
  misconceptions.forEach(m => misconceptionSelect.option(m));
  
  scaffoldingSelect = createSelect();
  
  scaffoldingSelect.style('font-size', '16px');
  scaffoldingSelect.style('padding', '5px');
  scaffoldings.forEach(s => scaffoldingSelect.option(s));
  
  submitBtn = createButton('Submit Evaluation');
  
  submitBtn.style('font-size', '16px');
  submitBtn.style('padding', '8px 16px');
  submitBtn.style('background-color', '#4CAF50');
  submitBtn.style('color', 'white');
  submitBtn.style('border', 'none');
  submitBtn.style('border-radius', '4px');
  submitBtn.style('cursor', 'pointer');
  submitBtn.mousePressed(checkAnswer);
  
  nextBtn = createButton('Next Scenario');
  
  nextBtn.style('font-size', '16px');
  nextBtn.style('padding', '8px 16px');
  nextBtn.style('background-color', '#2196F3');
  nextBtn.style('color', 'white');
  nextBtn.style('border', 'none');
  nextBtn.style('border-radius', '4px');
  nextBtn.style('cursor', 'pointer');
  nextBtn.mousePressed(nextScenario);
  nextBtn.hide();
  updateLayout();
}

function draw() {
  background(245);
  
  // Draw Header
  fill(50);
  noStroke();
  textFont("sans-serif");
  textSize(24);
  textStyle(BOLD);
  text("Pedagogical Pattern Matcher", 20, 35);
  
  textSize(14);
  textStyle(NORMAL);
  text("Review the student's code and reported behavior, then classify the misconception and suggest a scaffolding strategy.", 20, 60);
  
  // Left Panel: Scenario
  fill(255);
  stroke(200);
  rect(20, 80, min(400, width * 0.5 - 20), 350, 8);
  
  let s = scenarios[currentScenario];
  
  fill(50);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text(`Student: ${s.studentName}`, 35, 110);
  
  textSize(14);
  textStyle(NORMAL);
  text("Code:", 35, 140);
  
  fill(240);
  stroke(200);
  rect(35, 150, min(370, width * 0.5 - 50), 185, 4);
  
  fill(30, 80, 30);
  noStroke();
  textSize(13);
  textLeading(16);
  textFont("monospace");
  text(s.code, 45, 165);
  
  textFont("sans-serif");
  fill(50);
  textSize(14);
  textStyle(BOLD);
  text("Observed Behavior:", 35, 365);
  
  textStyle(NORMAL);
  textSize(13);
  textLeading(18);
  text(s.behavior, 35, 375, 370, 60);
  
  // Right Panel: Evaluation
  fill(50);
  textSize(18);
  textStyle(BOLD);
  let pX = min(450, width * 0.55);
  text("Teacher Evaluation", pX, 110);
  
  textSize(14);
  textStyle(NORMAL);
  text("1. Classify the misconception:", pX, 165);
  
  text("2. Select best scaffolding strategy:", pX, 235);
  
  // Feedback area
  if (state === "FEEDBACK") {
    let isCorrectMisconception = (misconceptionSelect.value() === s.misconception);
    let isCorrectScaffolding = (scaffoldingSelect.value() === s.scaffolding);
    let isCorrect = isCorrectMisconception && isCorrectScaffolding;
                     
    if (isCorrect) {
      fill(40, 150, 40);
      textStyle(BOLD);
      textSize(16);
      text("Correct!", pX, 375);
    } else {
      fill(200, 40, 40);
      textStyle(BOLD);
      textSize(16);
      text("Not quite. Review the explanation.", pX, 375);
    }
    
    fill(50);
    textStyle(NORMAL);
    textSize(13);
    textLeading(18);
    text(s.explanation, pX, 395, 330, 60);
  }
}

function updateLayout() {
  let CANVAS_W = windowWidth;
  let CANVAS_H = 450;
  
  let pX = min(450, CANVAS_W * 0.55);
  
  misconceptionSelect.position(pX, 180);
  scaffoldingSelect.position(pX, 250);
  submitBtn.position(pX, 310);
  nextBtn.position(pX + 170, 310);
}

function windowResized() {
  resizeCanvas(windowWidth, 450);
  updateLayout();
}

function checkAnswer() {
  if (misconceptionSelect.value() === "Select Misconception..." || 
      scaffoldingSelect.value() === "Select Strategy...") {
    return; // Don't submit if incomplete
  }
  
  state = "FEEDBACK";
  submitBtn.hide();
  
  if (currentScenario < scenarios.length - 1) {
    nextBtn.show();
  } else {
    // End of scenarios, show a reset button
    nextBtn.html('Restart');
    nextBtn.show();
  }
}

function nextScenario() {
  if (currentScenario < scenarios.length - 1) {
    currentScenario++;
  } else {
    currentScenario = 0;
  }
  
  state = "PLAYING";
  misconceptionSelect.selected("Select Misconception...");
  scaffoldingSelect.selected("Select Strategy...");
  submitBtn.show();
  nextBtn.hide();
  updateLayout();
  nextBtn.html('Next Scenario');
}
