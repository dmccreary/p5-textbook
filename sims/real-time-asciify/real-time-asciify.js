/* Real-Time ASCIIfy Camera MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/real-time-asciify/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let resolutionSlider, rampSelect;
let asciiRamp = " .:-=+*#%@";
let timeVal = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resolutionSlider = createSlider(6, 18, 10, 2);
  rampSelect = createSelect();
  rampSelect.option('Standard ( .:-=+*#%@)');
  rampSelect.option('Dense (Extended Density Ramp)');
  rampSelect.option('Binary (01)');

  startBtn = createButton('Start Animation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Animation');
  });
  positionControls();
  describe('ASCII art converter mapping image pixel luminance to text characters.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  rampSelect.position(col1L, drawHeight + 15);
  rampSelect.size(w);

  resolutionSlider.position(col2L, drawHeight + 45);
  resolutionSlider.size(w);
  startBtn.position(col1L, drawHeight + 45);
  startBtn.size(w);
}

function draw() {
  updateCanvasSize();
  if (isRunning) timeVal += 0.03;

  // Dark terminal canvas
  fill(12, 16, 24);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  let gridSize = resolutionSlider.value();
  let selRamp = rampSelect.value();

  let rampChars = " .:-=+*#%@";
  if (selRamp.startsWith('Dense')) rampChars = " .:-=+*#%@MWB8&WM#";
  else if (selRamp.startsWith('Binary')) rampChars = " 01";

  // Render Synthetic Moving Visual Scene to Sample Grayscale
  fill(0, 255, 120);
  noStroke();
  textSize(gridSize);
  textAlign(CENTER, CENTER);
  textFont('monospace');

  for (let x = gridSize / 2; x < canvasWidth; x += gridSize) {
    for (let y = 40 + gridSize / 2; y < drawHeight - 10; y += gridSize) {
      // Calculate synthetic brightness from animated plasma math
      let u = x / canvasWidth;
      let v = y / drawHeight;
      let d = dist(u, v, 0.5 + cos(timeVal) * 0.2, 0.5 + sin(timeVal) * 0.2);
      let wave = sin(d * 12 - timeVal * 3);
      let bright = map(wave, -1, 1, 0, 255);

      let charIndex = Math.floor(map(bright, 0, 255, 0, rampChars.length - 1));
      let ch = rampChars[charIndex];

      text(ch, x, y);
    }
  }

  // Header Title
  fill(255);
  textSize(22);
  textAlign(CENTER, TOP);
  textFont('Arial');
  text('Real-Time ASCIIfy Camera & Matrix', canvasWidth / 2, 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Cell Size: ${gridSize}px`, canvasWidth / 2 + 15, drawHeight + 25);
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
    startBtn = createButton('Start Animation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Animation');
  });
  positionControls();
  }
}
