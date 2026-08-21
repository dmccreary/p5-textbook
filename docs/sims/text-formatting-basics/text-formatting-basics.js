/* Text Formatting Basics MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/text-formatting-basics/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let sizeSlider, leadingSlider, alignSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  sizeSlider = createSlider(14, 36, 20, 2);
  leadingSlider = createSlider(16, 50, 26, 2);

  alignSelect = createSelect();
  alignSelect.option('LEFT');
  alignSelect.option('CENTER');
  alignSelect.option('RIGHT');

  positionControls();
  describe('Interactive text formatting inspector demonstrating textSize, textLeading, and textAlign.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  alignSelect.position(col1L, drawHeight + 15);
  alignSelect.size(w);

  sizeSlider.position(col2L, drawHeight + 15);
  sizeSlider.size(w);

  leadingSlider.position(col2L, drawHeight + 45);
  leadingSlider.size(w);
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
  text('Text Formatting Basics', canvasWidth / 2, 12);

  let tSize = sizeSlider.value();
  let tLead = leadingSlider.value();
  let selAlign = alignSelect.value();

  // Text Bounding Box Container
  let boxX = 35;
  let boxY = 65;
  let boxW = canvasWidth - 70;
  let boxH = drawHeight - 110;

  fill(255);
  stroke(180, 200, 240);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  // Apply p5 typography rules
  textSize(tSize);
  textLeading(tLead);

  let alignX = boxX + 15;
  if (selAlign === 'LEFT') {
    textAlign(LEFT, TOP);
    alignX = boxX + 15;
  } else if (selAlign === 'CENTER') {
    textAlign(CENTER, TOP);
    alignX = boxX + boxW / 2;
  } else {
    textAlign(RIGHT, TOP);
    alignX = boxX + boxW - 15;
  }

  fill(30);
  noStroke();
  let sampleText = "Processing and p5.js empower artists and educators to create expressive interactive experiences.\n\nTypography controls line leading, alignment, and visual hierarchy.";
  text(sampleText, alignX, boxY + 20, boxW - 30);

  // Code Readout
  fill(80);
  textSize(12);
  textAlign(CENTER, TOP);
  text(`textSize(${tSize}); textLeading(${tLead}); textAlign(${selAlign});`, canvasWidth / 2, drawHeight - 35);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Size: ${tSize}px`, canvasWidth / 2 + 15, drawHeight + 25);
  text(`Leading: ${tLead}px`, canvasWidth / 2 + 15, drawHeight + 55);
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
