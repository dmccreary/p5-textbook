/* Render Cycle and Frame Rate Monitor MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/frame-rate-monitor/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let loadSlider, targetFpsSelect;
let fpsHistory = [];
let lastFrameTime = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  loadSlider = createSlider(0, 100000, 5000, 5000);
  targetFpsSelect = createSelect();
  targetFpsSelect.option('60 FPS (16.6ms budget)');
  targetFpsSelect.option('30 FPS (33.3ms budget)');
  targetFpsSelect.option('15 FPS (66.6ms budget)');

  positionControls();
  describe('Frame rate monitor tracking frame time and simulated computational workload.', LABEL);
}

function positionControls() {
  let col1L = 110;
  let col2L = canvasWidth / 2 + 110;
  let w = canvasWidth / 2 - 130;
  if (w < 50) w = 50;

  loadSlider.position(col1L, drawHeight + 10);
  loadSlider.size(w);

  targetFpsSelect.position(col2L, drawHeight + 10);
  targetFpsSelect.size(w);
}

function draw() {
  updateCanvasSize();

  // Set target frame rate
  let targetVal = targetFpsSelect.value();
  if (targetVal.startsWith('60')) frameRate(60);
  else if (targetVal.startsWith('30')) frameRate(30);
  else frameRate(15);

  // Simulate artificial computational load
  let load = loadSlider.value();
  let dummy = 0;
  for (let i = 0; i < load; i++) {
    dummy += Math.sqrt(i);
  }

  let currFps = frameRate();
  fpsHistory.push(currFps);
  if (fpsHistory.length > canvasWidth - 60) fpsHistory.shift();

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Render Cycle & Frame Rate Monitor', canvasWidth / 2, 12);

  // Gauge Meter
  let cx = canvasWidth / 2;
  let cy = 130;
  let r = 70;

  stroke(220);
  strokeWeight(12);
  noFill();
  arc(cx, cy, r * 2, r * 2, PI * 0.8, PI * 2.2);

  let fpsAngle = map(constrain(currFps, 0, 60), 0, 60, PI * 0.8, PI * 2.2);
  let gaugeCol = currFps > 45 ? color(40, 180, 60) : currFps > 25 ? color(240, 160, 0) : color(220, 50, 50);
  stroke(gaugeCol);
  arc(cx, cy, r * 2, r * 2, PI * 0.8, fpsAngle);

  // Numeric Readouts
  fill(0);
  noStroke();
  textSize(28);
  textAlign(CENTER, CENTER);
  text(`${Math.round(currFps)}`, cx, cy - 5);
  textSize(13);
  fill(100);
  text('FPS', cx, cy + 20);

  let frameMs = currFps > 0 ? (1000 / currFps).toFixed(1) : '0';
  textSize(14);
  fill(40);
  text(`Frame Render Time: ${frameMs} ms`, cx, cy + 55);

  // FPS History Graph
  let gx = 30;
  let gy = 230;
  let gw = canvasWidth - 60;
  let gh = 130;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(gx, gy, gw, gh, 6);

  // 60 FPS and 30 FPS guide lines
  stroke(220);
  line(gx, gy + gh - map(30, 0, 60, 0, gh), gx + gw, gy + gh - map(30, 0, 60, 0, gh));
  line(gx, gy + gh - map(60, 0, 60, 0, gh), gx + gw, gy + gh - map(60, 0, 60, 0, gh));

  fill(140);
  noStroke();
  textSize(10);
  text('60 FPS', gx + 25, gy + 12);
  text('30 FPS', gx + 25, gy + gh / 2 + 4);

  // Draw FPS line
  noFill();
  stroke(40, 120, 220);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < fpsHistory.length; i++) {
    let x = gx + i;
    let y = gy + gh - map(constrain(fpsHistory[i], 0, 60), 0, 60, 0, gh);
    vertex(x, y);
  }
  endShape();

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Workload: ${load.toLocaleString()}`, 15, drawHeight + 20);
  text('Target:', canvasWidth / 2 + 15, drawHeight + 20);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Increase workload loop iterations to observe frame rate drops below 60 FPS.', canvasWidth / 2, drawHeight + 52);
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
