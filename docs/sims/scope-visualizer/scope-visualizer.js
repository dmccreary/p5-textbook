/* Scope Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/scope-visualizer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let scopeSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  scopeSlider = createSlider(0, 2, 0, 1);

  positionControls();
  describe('Magnifying glass inspecting variable visibility across nested scope blocks.', FALLBACK);
}

function positionControls() {
  scopeSlider.position(canvasWidth / 2 - 80, drawHeight + 25);
  scopeSlider.size(160);
}

function draw() {
  updateCanvasSize();

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Scope Visualizer & Scope Chain', canvasWidth / 2, 12);

  let lvl = scopeSlider.value(); // 0: Global, 1: setup(), 2: for loop

  // Draw Code Hierarchy
  let cx = canvasWidth / 2;
  let codeY = 55;

  fill(255);
  stroke(200);
  rect(20, codeY, canvasWidth - 40, drawHeight - 75, 8);

  fill(40);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  textFont('monospace');

  text('let globalVar = "A";  // Global Scope', 35, codeY + 15);
  text('function setup() {', 35, codeY + 45);
  text('  let funcVar = "B";   // Function Scope', 35, codeY + 70);
  text('  for (let i = 0; ...) { // Block Scope', 35, codeY + 100);
  text('    let blockVar = "C";', 35, codeY + 125);
  text('  }', 35, codeY + 150);
  text('}', 35, codeY + 175);

  textFont('Arial');

  // Magnifying Glass Scope Inspection Window
  let inspectY = codeY + 205;
  fill(240, 248, 255);
  stroke(70, 130, 240);
  strokeWeight(2);
  rect(35, inspectY, canvasWidth - 70, 75, 6);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  text('🔍 Visible Variables at current scope:', 45, inspectY + 8);

  textSize(12);
  fill(40, 120, 50);
  if (lvl === 0) {
    text('• globalVar: "A"', 55, inspectY + 32);
    fill(180, 50, 50);
    text('✕ funcVar, blockVar (ReferenceError: Not defined)', 55, inspectY + 52);
  } else if (lvl === 1) {
    text('• globalVar: "A" (from Scope Chain)\n• funcVar: "B"', 55, inspectY + 32);
  } else {
    text('• globalVar: "A"\n• funcVar: "B"\n• blockVar: "C", i: 0', 55, inspectY + 30);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  let scopeNames = ['Level 0: Global', 'Level 1: Function setup()', 'Level 2: Loop Block'];
  text(`Inspecting: ${scopeNames[lvl]}`, canvasWidth / 2, drawHeight + 5);
  text('Move slider to traverse the scope chain.', canvasWidth / 2, drawHeight + 55);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container && container.offsetWidth > 0) {
    canvasWidth = container.offsetWidth;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  if (typeof positionControls === 'function') {
    positionControls();
  }
}
