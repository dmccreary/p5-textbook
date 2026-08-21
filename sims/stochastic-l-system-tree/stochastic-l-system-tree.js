/* Stochastic L-System Tree MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/stochastic-l-system-tree/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let depthSlider, angleSlider, seedButton;
let currentSeed = 42;
let windAngle = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  depthSlider = createSlider(4, 9, 7, 1);
  angleSlider = createSlider(15, 45, 25, 1);

  seedButton = createButton('New Random Tree');
  seedButton.mousePressed(() => currentSeed = Math.floor(random(10000)));

  positionControls();
  describe('Stochastic recursive L-system tree with randomized branching angles.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  depthSlider.position(col1L, drawHeight + 15);
  depthSlider.size(w);

  angleSlider.position(col2L, drawHeight + 15);
  angleSlider.size(w);

  seedButton.position(col1L, drawHeight + 45);
  seedButton.size(w);
}

function draw() {
  updateCanvasSize();
  windAngle = sin(frameCount * 0.02) * 0.05;

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Stochastic L-System Tree', canvasWidth / 2, 12);

  let maxDepth = depthSlider.value();
  let baseAngle = radians(angleSlider.value());

  // Render Recursive Tree
  randomSeed(currentSeed);
  push();
  translate(canvasWidth / 2, drawHeight - 20);
  drawBranch(75, maxDepth, baseAngle);
  pop();

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Depth: ${maxDepth}`, 15, drawHeight + 25);
  text(`Branch Angle: ${angleSlider.value()}°`, canvasWidth / 2 + 15, drawHeight + 25);
}

function drawBranch(len, depth, baseAngle) {
  if (depth === 0) return;

  strokeWeight(map(depth, 1, 9, 1, 6));
  stroke(lerpColor(color(80, 50, 20), color(40, 160, 60), (9 - depth) / 8));
  line(0, 0, 0, -len);

  translate(0, -len);

  // Branch Left
  push();
  let rAngle1 = baseAngle + random(-0.15, 0.15) + windAngle;
  rotate(-rAngle1);
  drawBranch(len * random(0.68, 0.78), depth - 1, baseAngle);
  pop();

  // Branch Right
  push();
  let rAngle2 = baseAngle + random(-0.15, 0.15) - windAngle;
  rotate(rAngle2);
  drawBranch(len * random(0.68, 0.78), depth - 1, baseAngle);
  pop();
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
