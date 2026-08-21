/* The Object Factory MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-object-factory/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let spawnButton, sizeSlider, clearButton;
let spawnedObjects = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  spawnButton = createButton('new Ball(size, speed)');
  spawnButton.mousePressed(spawnObject);

  sizeSlider = createSlider(15, 45, 25, 5);

  clearButton = createButton('Clear Instances');
  clearButton.mousePressed(() => spawnedObjects = []);

  spawnObject();
  positionControls();
  describe('OOP Object Factory instantiating interactive class instances.', FALLBACK);
}

function spawnObject() {
  let s = sizeSlider.value();
  spawnedObjects.push(new BouncingBall(random(50, canvasWidth - 50), random(60, 200), s));
}

class BouncingBall {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = random(-3, 3);
    this.vy = random(1, 4);
    this.col = color(random(50, 240), random(80, 220), random(120, 255));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > canvasWidth - this.r / 2 || this.x < this.r / 2) this.vx *= -1;
    if (this.y > drawHeight - this.r / 2 || this.y < 45 + this.r / 2) this.vy *= -1;
  }

  show() {
    fill(this.col);
    stroke(255);
    strokeWeight(2);
    circle(this.x, this.y, this.r);
  }
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  spawnButton.position(col1L, drawHeight + 15);
  spawnButton.size(w);

  sizeSlider.position(col2L, drawHeight + 45);
  sizeSlider.size(w);

  clearButton.position(col1L, drawHeight + 45);
  clearButton.size(w);
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
  text('The Object Factory (OOP Instances)', canvasWidth / 2, 12);

  // Update & Draw All Instances
  for (let obj of spawnedObjects) {
    obj.update();
    obj.show();
  }

  // Active Instances readout
  fill(40);
  textSize(13);
  textAlign(LEFT, TOP);
  text(`Active Instances: ${spawnedObjects.length}`, 20, 42);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Constructor Radius: ${sizeSlider.value()}px`, canvasWidth / 2 + 15, drawHeight + 25);
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
