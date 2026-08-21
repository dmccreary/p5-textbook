/* Random Walk Simulation MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/random-walk-simulation/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let walkTypeSelect, stepSizeSlider, resetWalkButton;
let walkerX, walkerY;
let walkHistory = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  walkTypeSelect = createSelect();
  walkTypeSelect.option('Uniform Random Walk');
  walkTypeSelect.option('Gaussian / Normal Walk');
  walkTypeSelect.option('Lévy Flight (Power Law)');

  stepSizeSlider = createSlider(2, 15, 6, 1);
  resetWalkButton = createButton('Reset Walker');
  resetWalkButton.mousePressed(resetWalker);

  resetWalker();
  positionControls();
  describe('Random walk simulator comparing uniform, Gaussian, and Levy flight trajectories.', LABEL);
}

function resetWalker() {
  walkerX = canvasWidth / 2;
  walkerY = drawHeight / 2;
  walkHistory = [createVector(walkerX, walkerY)];
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  walkTypeSelect.position(col1L, drawHeight + 15);
  walkTypeSelect.size(w);

  stepSizeSlider.position(col2L, drawHeight + 45);
  stepSizeSlider.size(w);

  resetWalkButton.position(col1L, drawHeight + 45);
  resetWalkButton.size(w);
}

function draw() {
  updateCanvasSize();

  let stepBase = stepSizeSlider.value();
  let type = walkTypeSelect.value();

  // Perform multiple simulation steps per frame
  for (let s = 0; s < 4; s++) {
    let stepLen = stepBase;

    if (type.startsWith('Gaussian')) {
      stepLen = randomGaussian(stepBase, stepBase * 0.5);
    } else if (type.startsWith('Lévy')) {
      let r = random(1);
      if (r < 0.03) stepLen = stepBase * 8; // rare large jump
    }

    let angle = random(TWO_PI);
    walkerX = constrain(walkerX + cos(angle) * stepLen, 20, canvasWidth - 20);
    walkerY = constrain(walkerY + sin(angle) * stepLen, 40, drawHeight - 20);

    walkHistory.push(createVector(walkerX, walkerY));
    if (walkHistory.length > 600) walkHistory.shift();
  }

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Random Walk Simulation', canvasWidth / 2, 12);

  // Draw Walk Trail
  noFill();
  stroke(40, 100, 220, 140);
  strokeWeight(2);
  beginShape();
  for (let pt of walkHistory) {
    vertex(pt.x, pt.y);
  }
  endShape();

  // Current Walker Head
  fill(255, 60, 0);
  stroke(255);
  strokeWeight(2);
  circle(walkerX, walkerY, 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Step Size: ${stepBase}px | Steps: ${walkHistory.length}`, canvasWidth / 2 + 15, drawHeight + 25);
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
