/* Interactive Map Panning and Zooming MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-map-panning-and-zooming/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let zoomSlider, resetViewButton;
let panX = 0, panY = 0;
let isDragging = false;
let startDragX, startDragY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  zoomSlider = createSlider(0.5, 3.0, 1.0, 0.1);
  resetViewButton = createButton('Reset View');
  resetViewButton.mousePressed(resetView);

  positionControls();
  describe('Interactive 2D map with click-drag panning and slider zoom transformations.', FALLBACK);
}

function resetView() {
  panX = 0;
  panY = 0;
  zoomSlider.value(1.0);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  zoomSlider.position(col1L, drawHeight + 15);
  zoomSlider.size(w);

  resetViewButton.position(col2L, drawHeight + 15);
  resetViewButton.size(w);
}

function draw() {
  updateCanvasSize();

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  let zoom = zoomSlider.value();

  // Apply Viewport Transformation Matrix
  push();
  translate(canvasWidth / 2 + panX, drawHeight / 2 + panY);
  scale(zoom);

  // Draw World Map Grid
  stroke(210);
  strokeWeight(1 / zoom);
  for (let x = -300; x <= 300; x += 50) line(x, -300, x, 300);
  for (let y = -300; y <= 300; y += 50) line(-300, y, 300, y);

  // Draw Continents / Landmarks
  fill(120, 200, 140);
  stroke(80, 160, 100);
  strokeWeight(2 / zoom);
  rect(-180, -120, 140, 100, 12); // North Land
  rect(-160, 20, 100, 120, 12);  // South Land
  rect(30, -140, 160, 130, 16);  // East Continent
  circle(120, 80, 70);           // Island

  // Landmark Markers
  fill(240, 50, 50);
  noStroke();
  circle(0, 0, 12 / zoom);
  fill(0);
  textSize(12 / zoom);
  textAlign(CENTER, BOTTOM);
  text('Origin (0,0)', 0, -10 / zoom);

  pop();

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Interactive Map Panning & Zooming', canvasWidth / 2, 12);

  // HUD Readout
  fill(30);
  textSize(12);
  textAlign(LEFT, TOP);
  text(`Zoom: ${zoom.toFixed(1)}x | Pan: (${Math.round(panX)}, ${Math.round(panY)})`, 15, 42);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Click and drag inside map canvas to pan. Adjust zoom slider to scale.', canvasWidth / 2, drawHeight + 52);
}

function mousePressed() {
  if (mouseY < drawHeight) {
    isDragging = true;
    startDragX = mouseX - panX;
    startDragY = mouseY - panY;
  }
}

function mouseDragged() {
  if (isDragging) {
    panX = mouseX - startDragX;
    panY = mouseY - startDragY;
  }
}

function mouseReleased() {
  isDragging = false;
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
