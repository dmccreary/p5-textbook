/* Flow Field Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/flow-field-visualizer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let noiseScaleSlider, speedSlider, showVectorsCheckbox;
let particles = [];
let isRunning = false;
let startBtn;
let numParticles = 120;
let zOff = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  noiseScaleSlider = createSlider(0.005, 0.05, 0.015, 0.002);
  speedSlider = createSlider(1, 5, 2, 0.5);
  showVectorsCheckbox = createCheckbox('Show Vector Grid', false);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  positionControls();
  describe('Perlin noise flow field simulator with autonomous particle tracers.', FALLBACK);
}

class Particle {
  constructor() {
    this.pos = createVector(random(canvasWidth), random(drawHeight));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
    this.hue = random(180, 240);
  }

  update(scaleVal, speedMult) {
    this.maxSpeed = speedMult;
    let angle = noise(this.pos.x * scaleVal, this.pos.y * scaleVal, zOff) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.setMag(0.5);
    this.acc.add(v);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Wrap around borders
    if (this.pos.x > canvasWidth) { this.pos.x = 0; this.prevPos = this.pos.copy(); }
    if (this.pos.x < 0) { this.pos.x = canvasWidth; this.prevPos = this.pos.copy(); }
    if (this.pos.y > drawHeight) { this.pos.y = 0; this.prevPos = this.pos.copy(); }
    if (this.pos.y < 0) { this.pos.y = drawHeight; this.prevPos = this.pos.copy(); }
  }

  show() {
    stroke(this.hue, 120, 220, 160);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  noiseScaleSlider.position(col1L, drawHeight + 10);
  noiseScaleSlider.size(w);

  speedSlider.position(col2L, drawHeight + 10);
  speedSlider.size(w);

  showVectorsCheckbox.position(col1L, drawHeight + 45);
}

function draw() {
  updateCanvasSize();

  // Semi-transparent background for motion blur trail
  fill(240, 248, 255, 30);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Border
  stroke('silver');
  noFill();
  rect(0, 0, canvasWidth, drawHeight);

  let nScale = noiseScaleSlider.value();
  let speed = speedSlider.value();
  zOff += 0.003;

  // Optional Vector Grid display
  if (showVectorsCheckbox.checked()) {
    let step = 25;
    for (let x = 0; x < canvasWidth; x += step) {
      for (let y = 0; y < drawHeight; y += step) {
        let angle = noise(x * nScale, y * nScale, zOff) * TWO_PI * 2;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(12);
        stroke(180, 200, 230);
        strokeWeight(1);
        line(x, y, x + v.x, y + v.y);
      }
    }
  }

  // Update and draw particles
  for (let p of particles) {
    p.update(nScale, speed);
    p.show();
  }

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Perlin Noise Flow Field Visualizer', canvasWidth / 2, 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Noise Scale: ${nScale.toFixed(3)}`, 15, drawHeight + 20);
  text(`Speed: ${speed}x`, canvasWidth / 2 + 15, drawHeight + 20);
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
