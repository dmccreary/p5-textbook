/* The Solar System Hierarchy MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-solar-system-hierarchy/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let earthSpeedSlider, moonSpeedSlider;
let earthAngle = 0, moonAngle = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  earthSpeedSlider = createSlider(0.5, 3.0, 1.0, 0.1);
  moonSpeedSlider = createSlider(1.0, 6.0, 3.0, 0.2);

  positionControls();
  describe('Hierarchical solar system model showing nested matrix transformations.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  earthSpeedSlider.position(col1L, drawHeight + 15);
  earthSpeedSlider.size(w);

  moonSpeedSlider.position(col2L, drawHeight + 15);
  moonSpeedSlider.size(w);
}

function draw() {
  updateCanvasSize();

  earthAngle += 0.015 * earthSpeedSlider.value();
  moonAngle += 0.04 * moonSpeedSlider.value();

  // Dark Space
  fill(12, 16, 30);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('The Solar System Hierarchy', canvasWidth / 2, 12);

  // Sun Transformation (Level 1)
  push();
  translate(canvasWidth / 2, drawHeight / 2 + 10);

  // Draw Sun
  fill(255, 200, 30);
  stroke(255, 240, 100);
  strokeWeight(3);
  circle(0, 0, 50);

  // Orbit ring for Earth
  noFill();
  stroke(60, 80, 120, 120);
  strokeWeight(1);
  circle(0, 0, 200);

  // Earth Transformation (Level 2)
  rotate(earthAngle);
  translate(100, 0);

  fill(60, 140, 240);
  stroke(255);
  strokeWeight(2);
  circle(0, 0, 22);

  // Orbit ring for Moon
  noFill();
  stroke(100, 120, 160, 120);
  circle(0, 0, 50);

  // Moon Transformation (Level 3)
  rotate(moonAngle);
  translate(25, 0);

  fill(200);
  noStroke();
  circle(0, 0, 9);

  pop(); // Restores to default root matrix

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Earth Speed: ${earthSpeedSlider.value()}x`, 15, drawHeight + 25);
  text(`Moon Speed: ${moonSpeedSlider.value()}x`, canvasWidth / 2 + 15, drawHeight + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Nested matrix stack: Root -> Sun -> Earth -> Moon with push() & pop().', canvasWidth / 2, drawHeight + 55);
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
