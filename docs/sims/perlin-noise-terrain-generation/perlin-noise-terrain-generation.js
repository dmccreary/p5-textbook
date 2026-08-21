/* Perlin Noise Terrain Generation MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/perlin-noise-terrain-generation/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let scaleSlider, heightSlider;
let flying = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent(document.querySelector('main'));

  scaleSlider = createSlider(0.05, 0.3, 0.12, 0.01);
  heightSlider = createSlider(20, 120, 60, 5);

  positionControls();
  describe('3D Perlin noise organic terrain landscape mesh with flying forward animation.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  scaleSlider.position(col1L, drawHeight + 15);
  scaleSlider.size(w);

  heightSlider.position(col2L, drawHeight + 15);
  heightSlider.size(w);
}

function draw() {
  updateCanvasSize();
  flying -= 0.03;

  let scl = scaleSlider.value();
  let maxH = heightSlider.value();

  background(25, 30, 50);

  // 3D Perspective Setup
  push();
  rotateX(PI / 3);
  translate(-canvasWidth * 0.7, -drawHeight * 0.4, -60);

  let cols = 24;
  let rows = 20;
  let gridW = canvasWidth * 1.4;
  let gridH = drawHeight * 1.2;
  let dx = gridW / cols;
  let dy = gridH / rows;

  stroke(70, 140, 220, 160);
  strokeWeight(1);
  noFill();

  // Draw Wireframe Mesh Rows
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x <= cols; x++) {
      let z1 = map(noise(x * scl, y * scl + flying), 0, 1, -maxH, maxH);
      let z2 = map(noise(x * scl, (y + 1) * scl + flying), 0, 1, -maxH, maxH);

      let colInterp = map(z1, -maxH, maxH, 0, 1);
      fill(lerpColor(color(30, 80, 180), color(50, 220, 120), colInterp));

      vertex(x * dx, y * dy, z1);
      vertex(x * dx, (y + 1) * dy, z2);
    }
    endShape();
  }
  pop();

  // 2D HUD
  push();
  camera();
  ortho();
  noLights();

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Perlin Noise Terrain Generation', 0, -canvasHeight / 2 + 12);

  // Controls Region
  fill(255);
  stroke('silver');
  rect(-canvasWidth / 2, drawHeight - canvasHeight / 2, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Noise Scale: ${scl}`, -canvasWidth / 2 + 15, drawHeight - canvasHeight / 2 + 25);
  text(`Elevation: ${maxH}px`, 15, drawHeight - canvasHeight / 2 + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Perlin noise coordinates create continuous, coherent natural elevation gradients.', 0, drawHeight - canvasHeight / 2 + 55);
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
