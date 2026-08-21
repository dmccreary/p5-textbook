/* The Generative Art Mixing Desk MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-generative-art-mixing-desk/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let symSlider, densitySlider, turbSlider, weightSlider;
let rotOffset = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  symSlider = createSlider(3, 12, 6, 1);
  densitySlider = createSlider(10, 50, 25, 5);
  turbSlider = createSlider(0.01, 0.1, 0.03, 0.01);
  weightSlider = createSlider(1, 5, 2, 1);

  startBtn = createButton('Start Drawing');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Drawing');
  });
  positionControls();
  describe('Generative art mixing console with parametric symmetry and noise turbulence.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  symSlider.position(col1L, drawHeight + 10);
  symSlider.size(w);

  densitySlider.position(col2L, drawHeight + 10);
  densitySlider.size(w);

  turbSlider.position(col1L, drawHeight + 45);
  turbSlider.size(w);

  weightSlider.position(col2L, drawHeight + 45);
  weightSlider.size(w);
}

function draw() {
  updateCanvasSize();
  if (isRunning) rotOffset += 0.005;

  let sym = symSlider.value();
  let count = densitySlider.value();
  let turb = turbSlider.value();
  let wgt = weightSlider.value();

  // Dark Canvas
  fill(16, 18, 28);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('The Generative Art Mixing Desk', canvasWidth / 2, 12);

  // Render Symmetrical Mandala
  push();
  translate(canvasWidth / 2, drawHeight / 2 + 10);
  rotate(rotOffset);

  strokeWeight(wgt);

  for (let i = 0; i < sym; i++) {
    push();
    rotate((TWO_PI / sym) * i);

    for (let r = 20; r < 140; r += 140 / count) {
      let n = noise(r * turb, frameCount * 0.01);
      let col = lerpColor(color(40, 160, 255), color(255, 60, 180), n);
      stroke(col);
      noFill();
      circle(r, sin(r * 0.1) * 20, 10 + n * 25);
    }
    pop();
  }
  pop();

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Symmetry: ${sym}`, 15, drawHeight + 20);
  text(`Density: ${count}`, canvasWidth / 2 + 15, drawHeight + 20);
  text(`Turbulence: ${turb}`, 15, drawHeight + 55);
  text(`Weight: ${wgt}px`, canvasWidth / 2 + 15, drawHeight + 55);
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
    startBtn = createButton('Start Drawing');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Drawing');
  });
  positionControls();
  }
}
