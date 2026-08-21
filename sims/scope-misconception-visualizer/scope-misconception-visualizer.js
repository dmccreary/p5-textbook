/* Scope Misconception Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/scope-misconception-visualizer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let scenarioSelect, stepScopeButton;
let scopeLevel = 0; // 0: Global, 1: Outer Func, 2: Inner Block

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  scenarioSelect = createSelect();
  scenarioSelect.option('Variable Shadowing (let x in block)');
  scenarioSelect.option('var Leaking Outside Loop');
  scenarioSelect.option('Global Accidental Declaration');
  scenarioSelect.changed(() => scopeLevel = 0);

  stepScopeButton = createButton('Step Scope Level');
  stepScopeButton.mousePressed(() => scopeLevel = (scopeLevel + 1) % 3);

  positionControls();
  describe('Visualizer demonstrating common JavaScript scope misconceptions and variable shadowing.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  scenarioSelect.position(col1L, drawHeight + 15);
  scenarioSelect.size(w);

  stepScopeButton.position(col2L, drawHeight + 15);
  stepScopeButton.size(w);
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
  text('Scope Misconception Visualizer', canvasWidth / 2, 12);

  let scenario = scenarioSelect.value();

  // Draw Nested Scope Enclosures (Boxes)
  let gX = 25, gY = 50, gW = canvasWidth - 50, gH = drawHeight - 80;
  let fX = gX + 25, fY = gY + 40, fW = gW - 50, fH = gH - 60;
  let bX = fX + 25, bY = fY + 40, bW = fW - 50, bH = fH - 60;

  // Global Scope
  fill(240, 245, 255);
  stroke(scopeLevel === 0 ? color(220, 50, 50) : color(180));
  strokeWeight(scopeLevel === 0 ? 3 : 1);
  rect(gX, gY, gW, gH, 8);
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('🌐 Global Scope (let x = 10;)', gX + 8, gY + 8);

  // Function Scope
  fill(230, 240, 235);
  stroke(scopeLevel === 1 ? color(220, 50, 50) : color(160));
  strokeWeight(scopeLevel === 1 ? 3 : 1);
  rect(fX, fY, fW, fH, 8);
  fill(0);
  noStroke();
  text('📦 Function Scope (draw)', fX + 8, fY + 8);

  // Block Scope
  fill(255, 245, 230);
  stroke(scopeLevel === 2 ? color(220, 50, 50) : color(160));
  strokeWeight(scopeLevel === 2 ? 3 : 1);
  rect(bX, bY, bW, bH, 8);
  fill(0);
  noStroke();
  text('🧱 Block Scope (if / for { let x = 99; })', bX + 8, bY + 8);

  // Current Active Scope Value Readout
  let activeValue = (scopeLevel === 2) ? 'x = 99 (Shadows outer x)' : (scopeLevel === 1) ? 'x = 10 (Inherited from global)' : 'x = 10 (Global)';
  fill(40);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(`Active Inspection: ${scopeLevel === 0 ? 'Global' : scopeLevel === 1 ? 'Function' : 'Block'}\nResolved Value: ${activeValue}`, canvasWidth / 2, bY + bH / 2);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Click "Step Scope Level" to see which variable binding is active in each scope.', canvasWidth / 2, drawHeight + 52);
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
