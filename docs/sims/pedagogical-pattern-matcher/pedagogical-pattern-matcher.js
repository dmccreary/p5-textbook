/**
 * Pedagogical Pattern Matcher MicroSim
 * 
 * Educational Purpose: To train educators on identifying student misconceptions 
 * and selecting scaffolding strategies.
 */
// CANVAS_HEIGHT: 600

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
  let canvas = createCanvas(windowWidth, 600);
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
  background('aliceblue');
  
  // Draw Header
  fill(50);
  noStroke();
  textFont("sans-serif");
  textAlign(CENTER, BASELINE);
  
  textSize(24);
  textStyle(BOLD);
  text("Pedagogical Pattern Matcher", width / 2, 35);
  
  textSize(14);
  textStyle(NORMAL);
  text("Review the student's code and reported behavior, then classify the misconception and suggest a scaffolding strategy.", width / 2, 60);
  
  textAlign(LEFT, BASELINE);
  
  // Left Panel: Scenario Code
  let leftW = min(500, width * 0.5 - 20);
  let rightX = width * 0.5 + 10;
  let rightW = width * 0.5 - 30;
  
  fill(255);
  stroke(200);
  rect(20, 80, leftW, 300, 8);
  
  let s = scenarios[currentScenario];
  
  fill(240);
  stroke(200);
  rect(35, 100, leftW - 30, 260, 4);
  
  fill(30, 80, 30);
  noStroke();
  textSize(13);
  textLeading(16);
  textFont("monospace");
  text(s.code, 45, 115);
  
  // Right Panel: Observed Behavior
  fill(255);
  stroke(200);
  rect(rightX, 80, rightW, 300, 8);
  
  textFont("sans-serif");
  fill(50);
  textSize(18);
  textStyle(BOLD);
  text("Observed Behavior:", rightX + 15, 110);
  
  textStyle(NORMAL);
  textSize(14);
  textLeading(20);
  text(s.behavior, rightX + 15, 140, rightW - 30, 100);
  
  // Bottom Region: Evaluation
  fill(255);
  stroke(200);
  rect(10, 390, width - 20, 200, 8);
  
  fill(50);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  text("Teacher Evaluation", 20, 415);
  
  textSize(14);
  textStyle(NORMAL);
  text("1. Classify the misconception:", 20, 445);
  text("2. Select best scaffolding strategy:", 280, 445);
  
  // Feedback area
  if (state === "FEEDBACK") {
    let isCorrectMisconception = (misconceptionSelect.value() === s.misconception);
    let isCorrectScaffolding = (scaffoldingSelect.value() === s.scaffolding);
    let isCorrect = isCorrectMisconception && isCorrectScaffolding;
                     
    if (isCorrect) {
      fill(40, 150, 40);
      textStyle(BOLD);
      textSize(16);
      text("Correct!", 20, 520);
    } else {
      fill(200, 40, 40);
      textStyle(BOLD);
      textSize(16);
      text("Not quite. Review the explanation.", 20, 520);
    }
    
    fill(50);
    textStyle(NORMAL);
    textSize(14);
    textLeading(18);
    text(s.explanation, 20, 540, width - 40, 60);
  }
}

function updateLayout() {
  misconceptionSelect.position(20, 460);
  scaffoldingSelect.position(280, 460);
  submitBtn.position(500, 460);
  nextBtn.position(500, 460);
}

function windowResized() {
  resizeCanvas(windowWidth, 600);
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
