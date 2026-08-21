/* Additive Color Mixer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/additive-color-mixer/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let rSlider, gSlider, bSlider;
let blendModeSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  rSlider = createSlider(0, 255, 255, 1);
  gSlider = createSlider(0, 255, 255, 1);
  bSlider = createSlider(0, 255, 255, 1);

  blendModeSelect = createSelect();
  blendModeSelect.option('ADD (Additive Light)');
  blendModeSelect.option('BLEND (Standard)');
  blendModeSelect.option('SCREEN');

  positionControls();
  describe('Additive color mixing with overlapping Red, Green, and Blue circles on a dark stage.', LABEL);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 60) w = 60;

  rSlider.position(col1L, drawHeight + 10);
  rSlider.size(w);
  gSlider.position(col2L, drawHeight + 10);
  gSlider.size(w);
  bSlider.position(col1L, drawHeight + 45);
  bSlider.size(w);
  blendModeSelect.position(col2L, drawHeight + 45);
  blendModeSelect.size(w);
}

function draw() {
  updateCanvasSize();

  // Dark stage for additive light visualization
  fill(18, 20, 28);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Additive Color Mixer (RGB)', canvasWidth / 2, 12);

  let rVal = rSlider.value();
  let gVal = gSlider.value();
  let bVal = bSlider.value();

  // Geometry for 3 spotlights
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let radius = Math.min(canvasWidth * 0.22, 90);
  let offset = radius * 0.65;

  let rX = cx;
  let rY = cy - offset;
  let gX = cx - offset * 0.9;
  let gY = cy + offset * 0.65;
  let bX = cx + offset * 0.9;
  let bY = cy + offset * 0.65;

  // Selected blend mode
  let selMode = blendModeSelect.value();
  if (selMode.includes('ADD')) blendMode(ADD);
  else if (selMode.includes('SCREEN')) blendMode(SCREEN);
  else blendMode(BLEND);

  noStroke();

  // Red Spotlight
  fill(rVal, 0, 0, 220);
  circle(rX, rY, radius * 2);

  // Green Spotlight
  fill(0, gVal, 0, 220);
  circle(gX, gY, radius * 2);

  // Blue Spotlight
  fill(0, 0, bVal, 220);
  circle(bX, bY, radius * 2);

  // Reset blend mode for HUD
  blendMode(BLEND);

  // Stage labels
  fill(240);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(`R: ${rVal}`, rX, rY - radius * 0.6);
  text(`G: ${gVal}`, gX - radius * 0.5, gY + radius * 0.4);
  text(`B: ${bVal}`, bX + radius * 0.5, bY + radius * 0.4);

  // Color Swatch summary
  let swatchW = 70;
  let swatchH = 26;
  fill(rVal, gVal, bVal);
  stroke(200);
  rect(cx - swatchW / 2, cy + offset + radius * 0.7, swatchW, swatchH, 4);
  fill(rVal + gVal + bVal > 380 ? 0 : 255);
  noStroke();
  textSize(11);
  text(`rgb(${rVal},${gVal},${bVal})`, cx, cy + offset + radius * 0.7 + swatchH / 2);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Control Labels
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  let col1TextX = 15;
  let col2TextX = canvasWidth / 2 + 15;

  text(`Red: ${rVal}`, col1TextX, drawHeight + 20);
  text(`Green: ${gVal}`, col2TextX, drawHeight + 20);
  text(`Blue: ${bVal}`, col1TextX, drawHeight + 55);
  text('Mode:', col2TextX, drawHeight + 55);

  // Intersection formula hint
  textSize(12);
  fill(90);
  textAlign(CENTER, TOP);
  text('R + G = Yellow  |  R + B = Magenta  |  G + B = Cyan  |  R + G + B = White', canvasWidth / 2, drawHeight + 85);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    positionControls();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
