/* Polar Radar Sweeper MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/polar-radar-sweeper/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let sweepSpeedSlider, targetCountSlider;
let sweepAngle = 0;
let targets = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  sweepSpeedSlider = createSlider(1, 5, 2, 0.5);
  targetCountSlider = createSlider(2, 8, 4, 1);

  generateTargets();
  startBtn = createButton('Start Sweep');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Sweep');
  });
  positionControls();
  describe('Polar coordinate radar sweeping beam detecting radar blip targets.', FALLBACK);
}

function generateTargets() {
  targets = [];
  let num = targetCountSlider ? targetCountSlider.value() : 4;
  for (let i = 0; i < num; i++) {
    targets.push({
      r: random(40, 130),
      theta: random(0, TWO_PI),
      blip: 0
    });
  }
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  sweepSpeedSlider.position(col1L, drawHeight + 15);
  sweepSpeedSlider.size(w);

  targetCountSlider.position(col2L, drawHeight + 15);
  targetCountSlider.size(w);
}

function draw() {
  updateCanvasSize();
  sweepAngle = (sweepAngle + 0.02 * sweepSpeedSlider.value()) % TWO_PI;

  // Radar Dark Display
  fill(10, 25, 20);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(80, 255, 140);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Polar Radar Sweeper (r, θ)', canvasWidth / 2, 12);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let maxR = 140;

  // Radar Concentric Circles (r rings)
  stroke(30, 100, 60);
  strokeWeight(1);
  noFill();
  circle(cx, cy, maxR * 2);
  circle(cx, cy, maxR * 1.33);
  circle(cx, cy, maxR * 0.66);

  // Polar Crosshair Axes (0°, 90°, 180°, 270°)
  line(cx - maxR, cy, cx + maxR, cy);
  line(cx, cy - maxR, cx, cy + maxR);

  // Radar Sweep Beam
  stroke(80, 255, 140);
  strokeWeight(2);
  let beamX = cx + maxR * cos(sweepAngle);
  let beamY = cy + maxR * sin(sweepAngle);
  line(cx, cy, beamX, beamY);

  // Radar Targets Detection Check
  for (let t of targets) {
    let tx = cx + t.r * cos(t.theta);
    let ty = cy + t.r * sin(t.theta);

    let angleDiff = abs((sweepAngle - t.theta + TWO_PI) % TWO_PI);
    if (angleDiff < 0.1) t.blip = 1.0;
    t.blip *= 0.96;

    if (t.blip > 0.05) {
      fill(80, 255, 140, t.blip * 255);
      stroke(255);
      strokeWeight(1);
      circle(tx, ty, 10);

      fill(255);
      noStroke();
      textSize(10);
      textAlign(LEFT, CENTER);
      text(`r:${Math.round(t.r)}, θ:${Math.round(degrees(t.theta))}°`, tx + 8, ty);
    }
  }

  // Trigonometry Formula
  fill(80, 255, 140);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text('x = r · cos(θ)   |   y = r · sin(θ)', canvasWidth / 2, drawHeight - 30);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Sweep Speed: ${sweepSpeedSlider.value()}x`, 15, drawHeight + 25);
  text(`Targets: ${targetCountSlider.value()}`, canvasWidth / 2 + 15, drawHeight + 25);
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
    startBtn = createButton('Start Sweep');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Sweep');
  });
  positionControls();
  }
}
