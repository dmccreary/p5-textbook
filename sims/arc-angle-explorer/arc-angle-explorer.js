/* Arc and Angle Explorer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/arc-angle-explorer/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let startAngleSlider, stopAngleSlider;
let modeSelect, fillCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startAngleSlider = createSlider(0, 360, 0, 5);
  stopAngleSlider = createSlider(0, 360, 270, 5);

  modeSelect = createSelect();
  modeSelect.option('PIE');
  modeSelect.option('OPEN');
  modeSelect.option('CHORD');

  fillCheckbox = createCheckbox('Fill Shape', true);

  positionControls();
  describe('Interactive arc geometry tool with adjustable start and stop angles and mode selector.', LABEL);
}

function positionControls() {
  let col1L = 95;
  let col2L = canvasWidth / 2 + 95;
  let w = canvasWidth / 2 - 115;
  if (w < 60) w = 60;

  startAngleSlider.position(col1L, drawHeight + 10);
  startAngleSlider.size(w);
  stopAngleSlider.position(col2L, drawHeight + 10);
  stopAngleSlider.size(w);
  modeSelect.position(col1L, drawHeight + 45);
  modeSelect.size(w);
  fillCheckbox.position(col2L, drawHeight + 45);
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
  text('Arc and Angle Explorer', canvasWidth / 2, 12);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let d = Math.min(canvasWidth * 0.55, 230);

  let startDeg = startAngleSlider.value();
  let stopDeg = stopAngleSlider.value();
  let startRad = radians(startDeg);
  let stopRad = radians(stopDeg);

  // Background guide circle and angle markings
  stroke(210);
  strokeWeight(1);
  noFill();
  circle(cx, cy, d);
  line(cx - d / 2 - 15, cy, cx + d / 2 + 15, cy);
  line(cx, cy - d / 2 - 15, cx, cy + d / 2 + 15);

  // Degree labels
  fill(120);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('0° (0 rad)', cx + d / 2 + 32, cy);
  text('90° (HALF_PI)', cx, cy + d / 2 + 16);
  text('180° (PI)', cx - d / 2 - 32, cy);
  text('270° (3*HALF_PI)', cx, cy - d / 2 - 16);

  // Selected mode
  let modeStr = modeSelect.value();
  let arcMode = PIE;
  if (modeStr === 'OPEN') arcMode = OPEN;
  else if (modeStr === 'CHORD') arcMode = CHORD;

  // Render the Arc
  if (fillCheckbox.checked()) {
    fill(65, 105, 225, 180); // RoyalBlue
  } else {
    noFill();
  }
  stroke(30, 60, 180);
  strokeWeight(3);
  arc(cx, cy, d, d, startRad, stopRad, arcMode);

  // Draw angle vector rays
  stroke(220, 50, 50);
  strokeWeight(2);
  let sx = cx + (d / 2) * cos(startRad);
  let sy = cy + (d / 2) * sin(startRad);
  line(cx, cy, sx, sy);
  fill(220, 50, 50);
  noStroke();
  circle(sx, sy, 8);

  stroke(50, 180, 50);
  strokeWeight(2);
  let ex = cx + (d / 2) * cos(stopRad);
  let ey = cy + (d / 2) * sin(stopRad);
  line(cx, cy, ex, ey);
  fill(50, 180, 50);
  noStroke();
  circle(ex, ey, 8);

  // Syntax code readout
  fill(30);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  let radStartText = (startDeg / 180).toFixed(2) + 'π';
  let radStopText = (stopDeg / 180).toFixed(2) + 'π';
  text(`arc(x, y, w, h, radians(${startDeg}), radians(${stopDeg}), ${modeStr});`, cx, drawHeight - 35);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Control Labels
  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  let col1TextX = 15;
  let col2TextX = canvasWidth / 2 + 15;

  text(`Start: ${startDeg}°`, col1TextX, drawHeight + 20);
  text(`Stop: ${stopDeg}°`, col2TextX, drawHeight + 20);
  text('Mode:', col1TextX, drawHeight + 55);

  // Legend
  textSize(12);
  fill(90);
  textAlign(CENTER, TOP);
  text('● Red = Start Angle Ray  |  ● Green = Stop Angle Ray  | Clockwise Direction', canvasWidth / 2, drawHeight + 85);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    positionControls();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
