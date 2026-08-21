/* Shape Explorer Turntable MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/shape-explorer-turntable/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let shapeSelect, detailSlider;
let rotY = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent(document.querySelector('main'));

  shapeSelect = createSelect();
  shapeSelect.option('Torus');
  shapeSelect.option('Box');
  shapeSelect.option('Sphere');
  shapeSelect.option('Cylinder');
  shapeSelect.option('Cone');

  detailSlider = createSlider(4, 24, 16, 2);

  positionControls();
  describe('3D geometric shape turntable visualizer with orbit camera control.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  shapeSelect.position(col1L, drawHeight + 15);
  shapeSelect.size(w);

  detailSlider.position(col2L, drawHeight + 45);
  detailSlider.size(w);
}

function draw() {
  updateCanvasSize();
  rotY += 0.015;

  background(240, 248, 255);

  let sel = shapeSelect.value();
  let det = detailSlider.value();

  // 3D Lighting & Scene
  push();
  orbitControl();
  ambientLight(120);
  directionalLight(255, 255, 255, 0.5, 1, -1);
  pointLight(255, 180, 100, 0, -100, 150);

  rotateX(-PI / 6);
  rotateY(rotY);

  // Turntable Base Platform
  push();
  translate(0, 80, 0);
  fill(220, 225, 235);
  stroke(180);
  cylinder(110, 10);
  pop();

  // Render 3D Shape
  fill(70, 130, 240);
  stroke(30, 70, 180);
  strokeWeight(1);

  if (sel === 'Torus') torus(55, 22, det, det);
  else if (sel === 'Box') box(80);
  else if (sel === 'Sphere') sphere(65, det, det);
  else if (sel === 'Cylinder') cylinder(50, 90, det);
  else if (sel === 'Cone') cone(55, 90, det);

  pop();

  // 2D HUD
  push();
  camera();
  ortho();
  noLights();

  fill(0);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Shape Explorer Turntable (3D WebGL)', 0, -canvasHeight / 2 + 12);

  // Controls Region
  fill(255);
  stroke('silver');
  rect(-canvasWidth / 2, drawHeight - canvasHeight / 2, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Detail / Tessellation: ${det}`, 15, drawHeight - canvasHeight / 2 + 25);
  pop();
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
