/* Interactive 3D Coordinate System MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/3d-coordinate-system/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let xSlider, ySlider, zSlider;
let autoRotateCheckbox;
let rotAngle = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent(document.querySelector('main'));

  xSlider = createSlider(-150, 150, 60, 1);
  ySlider = createSlider(-150, 150, -40, 1);
  zSlider = createSlider(-150, 150, 50, 1);
  autoRotateCheckbox = createCheckbox('Auto Orbit', true);

  startBtn = createButton('Rotate Turntable');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Rotate Turntable');
  });
  positionControls();
  describe('Interactive 3D coordinate system showing red X, green Y, and blue Z axes with a glowing sphere.', LABEL);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 60) w = 60;

  xSlider.position(col1L, drawHeight + 10);
  xSlider.size(w);

  ySlider.position(col2L, drawHeight + 10);
  ySlider.size(w);

  zSlider.position(col1L, drawHeight + 45);
  zSlider.size(w);

  autoRotateCheckbox.position(col2L, drawHeight + 45);
}

function draw() {
  updateCanvasSize();
  background(240, 248, 255); // aliceblue

  let posX = xSlider.value();
  let posY = ySlider.value();
  let posZ = zSlider.value();

  // 3D View setup
  push();
  // Camera & rotation
  if (autoRotateCheckbox.checked()) {
    if (isRunning) rotAngle += 0.01;
  }
  orbitControl();
  rotateX(-PI / 6);
  rotateY(rotAngle);

  // Draw 3D Grid Plane (XZ floor)
  stroke(210);
  strokeWeight(1);
  for (let i = -160; i <= 160; i += 40) {
    line(i, 0, -160, i, 0, 160);
    line(-160, 0, i, 160, 0, i);
  }

  // Draw Axes: X (Red), Y (Green), Z (Blue)
  strokeWeight(3);
  
  // +X / -X Axis
  stroke(220, 50, 50);
  line(-200, 0, 0, 200, 0, 0);
  
  // +Y / -Y Axis
  stroke(40, 180, 40);
  line(0, -200, 0, 0, 200, 0);
  
  // +Z / -Z Axis
  stroke(40, 90, 220);
  line(0, 0, -200, 0, 0, 200);

  // Axis labels (spherical markers)
  push();
  translate(210, 0, 0);
  noStroke();
  fill(220, 50, 50);
  sphere(6);
  pop();

  push();
  translate(0, 210, 0);
  noStroke();
  fill(40, 180, 40);
  sphere(6);
  pop();

  push();
  translate(0, 0, 210);
  noStroke();
  fill(40, 90, 220);
  sphere(6);
  pop();

  // Point Position
  // Guide lines to axes
  stroke(180, 180, 180, 150);
  strokeWeight(1);
  line(posX, 0, posZ, posX, posY, posZ);
  line(0, 0, 0, posX, 0, posZ);

  // Sphere
  push();
  translate(posX, posY, posZ);
  ambientLight(150);
  pointLight(255, 255, 255, 0, -100, 200);
  fill(255, 140, 0);
  noStroke();
  sphere(16);
  pop();

  pop();

  // 2D HUD Overlay
  push();
  // Switch to standard 2D projection for HUD
  camera();
  ortho();
  noLights();

  // Controls background
  fill(255);
  stroke(192);
  strokeWeight(1);
  rect(-canvasWidth / 2, drawHeight - canvasHeight / 2, canvasWidth, controlHeight);

  // Title
  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Interactive 3D Coordinate System', 0, -canvasHeight / 2 + 12);

  // Axis Legends in HUD
  textSize(13);
  textAlign(LEFT, TOP);
  fill(200, 30, 30);
  text('● +X (Red: Right)', -canvasWidth / 2 + 15, -canvasHeight / 2 + 40);
  fill(30, 160, 30);
  text('● +Y (Green: Down)', -canvasWidth / 2 + 15, -canvasHeight / 2 + 58);
  fill(30, 70, 200);
  text('● +Z (Blue: Depth/Out)', -canvasWidth / 2 + 15, -canvasHeight / 2 + 76);

  // Coordinates readout
  fill(30);
  textSize(15);
  textAlign(CENTER, TOP);
  text(`Point (X, Y, Z): (${posX}, ${posY}, ${posZ})`, 0, drawHeight - canvasHeight / 2 + 82);

  // Control labels
  textSize(13);
  textAlign(LEFT, CENTER);
  fill(0);
  let col1TextX = -canvasWidth / 2 + 15;
  let col2TextX = 15;
  let topRowY = drawHeight - canvasHeight / 2 + 20;
  let midRowY = drawHeight - canvasHeight / 2 + 55;

  text(`X: ${posX}`, col1TextX, topRowY);
  text(`Y: ${posY}`, col2TextX, topRowY);
  text(`Z: ${posZ}`, col1TextX, midRowY);

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
    startBtn = createButton('Rotate Turntable');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Rotate Turntable');
  });
  positionControls();
  }
}
