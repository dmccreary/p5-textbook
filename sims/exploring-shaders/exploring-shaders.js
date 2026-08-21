/* Exploring Shaders MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/exploring-shaders/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let freqSlider, speedSlider, patternSelect;
let timeVal = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  freqSlider = createSlider(2, 20, 8, 1);
  speedSlider = createSlider(0.5, 3.0, 1.5, 0.1);

  patternSelect = createSelect();
  patternSelect.option('Ripple Wave');
  patternSelect.option('Plasma Field');
  patternSelect.option('Color Vortex');

  startBtn = createButton('Start Shader Animation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Shader Animation');
  });
  positionControls();
  describe('Simulated fragment shader exploring GPU mathematical wave and color fields.', FALLBACK);
}

function positionControls() {
  let col1L = 80;
  let col2L = canvasWidth / 2 + 80;
  let w = canvasWidth / 2 - 100;
  if (w < 50) w = 50;

  freqSlider.position(col1L, drawHeight + 10);
  freqSlider.size(w);

  speedSlider.position(col2L, drawHeight + 10);
  speedSlider.size(w);

  patternSelect.position(col1L, drawHeight + 45);
  patternSelect.size(w * 2 + 30);
}

function draw() {
  updateCanvasSize();

  if (isRunning) timeVal += 0.02 * speedSlider.value();
  let freq = freqSlider.value();
  let pat = patternSelect.value();

  // Simulated Per-Pixel Fragment Shader on Grid
  let res = 8; // pixel block size for interactive framerate
  noStroke();

  for (let x = 0; x < canvasWidth; x += res) {
    for (let y = 0; y < drawHeight; y += res) {
      // Normalized UV coordinates [0.0, 1.0]
      let u = x / canvasWidth;
      let v = y / drawHeight;

      let r, g, b;

      if (pat === 'Ripple Wave') {
        let d = dist(u, v, 0.5, 0.5);
        let wave = sin(d * freq * 10 - timeVal * 4);
        r = map(wave, -1, 1, 30, 240);
        g = map(sin(u * 10 + timeVal), -1, 1, 60, 200);
        b = map(cos(v * 10 + timeVal), -1, 1, 120, 255);
      } else if (pat === 'Plasma Field') {
        let v1 = sin(u * freq + timeVal);
        let v2 = sin(v * freq + timeVal);
        let v3 = sin((u + v) * freq + timeVal);
        let col = (v1 + v2 + v3) / 3;
        r = map(sin(col * PI), -1, 1, 0, 255);
        g = map(cos(col * PI), -1, 1, 100, 230);
        b = map(sin(col * PI + timeVal), -1, 1, 180, 255);
      } else {
        // Color Vortex
        let angle = atan2(v - 0.5, u - 0.5);
        let d = dist(u, v, 0.5, 0.5);
        let val = sin(angle * freq + d * 15 - timeVal * 3);
        r = map(val, -1, 1, 220, 40);
        g = map(cos(angle * 3), -1, 1, 50, 240);
        b = map(sin(d * 10), -1, 1, 100, 255);
      }

      fill(r, g, b);
      rect(x, y, res, res);
    }
  }

  // Draw Title & Shader Info Overlay
  fill(0, 0, 0, 160);
  rect(0, 0, canvasWidth, 40);
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Exploring Shaders (GLSL UV Simulation)', canvasWidth / 2, 20);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Freq: ${freq}`, 15, drawHeight + 20);
  text(`Speed: ${speedSlider.value().toFixed(1)}x`, canvasWidth / 2 + 15, drawHeight + 20);
  text('Pattern:', 15, drawHeight + 55);
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
    startBtn = createButton('Start Shader Animation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Shader Animation');
  });
  positionControls();
  }
}
