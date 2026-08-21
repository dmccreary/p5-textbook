/* Pivot Point Selection MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/pivot-point-selection/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let angleSlider, pivotSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  angleSlider = createSlider(0, 360, 45, 5);
  pivotSelect = createSelect();
  pivotSelect.option('Center Pivot (w/2, h/2)');
  pivotSelect.option('Top-Left Origin Pivot (0, 0)');
  pivotSelect.option('Bottom-Right Pivot (w, h)');

  positionControls();
  describe('Matrix transformation visualizer demonstrating object rotation around different pivot anchors.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  pivotSelect.position(col1L, drawHeight + 15);
  pivotSelect.size(w);

  angleSlider.position(col2L, drawHeight + 45);
  angleSlider.size(w);
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
  text('Pivot Point Selection & Rotation', canvasWidth / 2, 12);

  let angleDeg = angleSlider.value();
  let rad = radians(angleDeg);
  let pivotType = pivotSelect.value();

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let rectW = 120;
  let rectH = 70;

  // Background Grid Axis
  stroke(210);
  line(cx - 150, cy, cx + 150, cy);
  line(cx, cy - 120, cx, cy + 120);

  // Transformation Matrix Execution
  push();
  translate(cx, cy); // Move to stage center

  let pivotX = 0;
  let pivotY = 0;

  if (pivotType.startsWith('Center')) {
    rotate(rad);
    // Draw rectangle centered on rotation axis
    fill(70, 130, 240, 180);
    stroke(30, 80, 200);
    strokeWeight(2);
    rect(-rectW / 2, -rectH / 2, rectW, rectH, 6);
  } else if (pivotType.startsWith('Top-Left')) {
    rotate(rad);
    fill(70, 130, 240, 180);
    stroke(30, 80, 200);
    strokeWeight(2);
    rect(0, 0, rectW, rectH, 6);
  } else {
    // Bottom-Right
    rotate(rad);
    fill(70, 130, 240, 180);
    stroke(30, 80, 200);
    strokeWeight(2);
    rect(-rectW, -rectH, rectW, rectH, 6);
  }

  // Draw Pivot Point Marker
  fill(255, 60, 0);
  stroke(255);
  strokeWeight(2);
  circle(0, 0, 12);
  pop();

  // Explanatory Code Readout
  fill(30);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text(`Rotation Angle: ${angleDeg}° | Red circle marks the (0,0) pivot axis`, canvasWidth / 2, drawHeight - 30);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Angle: ${angleDeg}°`, canvasWidth / 2 + 15, drawHeight + 25);
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
