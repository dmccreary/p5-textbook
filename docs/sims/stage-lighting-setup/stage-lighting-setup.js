/* Stage Lighting Setup MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/stage-lighting-setup/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let ambientSlider, dirSlider, pointSlider, materialSelect;
let rotAngle = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent(document.querySelector('main'));

  ambientSlider = createSlider(0, 255, 80, 10);
  dirSlider = createSlider(0, 255, 180, 10);
  pointSlider = createSlider(0, 255, 200, 10);

  materialSelect = createSelect();
  materialSelect.option('Specular Material');
  materialSelect.option('Normal Material');
  materialSelect.option('Ambient Material');

  positionControls();
  describe('3D stage lighting setup with interactive ambient, directional, and point light controls.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  materialSelect.position(col1L, drawHeight + 15);
  materialSelect.size(w);

  ambientSlider.position(col2L, drawHeight + 15);
  ambientSlider.size(w);

  dirSlider.position(col1L, drawHeight + 45);
  dirSlider.size(w);

  pointSlider.position(col2L, drawHeight + 45);
  pointSlider.size(w);
}

function draw() {
  updateCanvasSize();
  rotAngle += 0.01;

  background(20, 25, 35);

  let ambVal = ambientSlider.value();
  let dirVal = dirSlider.value();
  let ptVal = pointSlider.value();
  let matType = materialSelect.value();

  // Configure WebGL Lighting
  push();
  orbitControl();

  ambientLight(ambVal);
  directionalLight(dirVal, dirVal, dirVal, 0.5, 1, -1);
  pointLight(ptVal, ptVal * 0.8, 0, 100 * cos(rotAngle), -80, 100 * sin(rotAngle));

  // Apply Material
  if (matType.startsWith('Specular')) {
    specularMaterial(220, 100, 50);
    shininess(20);
  } else if (matType.startsWith('Normal')) {
    normalMaterial();
  } else {
    ambientMaterial(60, 140, 240);
  }

  // Draw 3D Centerpiece Actor
  rotateY(rotAngle);
  sphere(60, 24, 24);

  // Draw Point Light Visualizer
  push();
  translate(100 * cos(rotAngle), -80, 100 * sin(rotAngle));
  emissiveMaterial(255, 220, 0);
  noStroke();
  sphere(8);
  pop();

  pop();

  // 2D HUD
  push();
  camera();
  ortho();
  noLights();

  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Stage Lighting Setup (3D WebGL)', 0, -canvasHeight / 2 + 12);

  // Controls Region
  fill(255);
  stroke('silver');
  rect(-canvasWidth / 2, drawHeight - canvasHeight / 2, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(`Ambient: ${ambVal}`, 15, drawHeight - canvasHeight / 2 + 25);
  text(`Dir: ${dirVal}`, -canvasWidth / 2 + 15, drawHeight - canvasHeight / 2 + 55);
  text(`Point: ${ptVal}`, 15, drawHeight - canvasHeight / 2 + 55);
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
