/* The Magnifying Glass Array Translator MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-magnifying-glass-array-translator/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let gridColsSlider;
let inspectX = 2, inspectY = 2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gridColsSlider = createSlider(4, 8, 5, 1);

  positionControls();
  describe('Interactive 2D screen coordinate to 1D flat pixels array memory index translator.', FALLBACK);
}

function positionControls() {
  gridColsSlider.position(canvasWidth / 2 - 80, drawHeight + 25);
  gridColsSlider.size(160);
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
  text('Magnifying Glass Array Translator', canvasWidth / 2, 12);

  let gridDim = gridColsSlider.value();
  let cellW = Math.min((canvasWidth - 60) / gridDim, 45);
  let startX = (canvasWidth - gridDim * cellW) / 2;
  let startY = 60;

  // Handle Mouse Hover to inspect 2D cell
  if (mouseY < startY + gridDim * cellW && mouseY >= startY && mouseX >= startX && mouseX < startX + gridDim * cellW) {
    inspectX = Math.floor((mouseX - startX) / cellW);
    inspectY = Math.floor((mouseY - startY) / cellW);
  }

  // Render 2D Grid
  for (let y = 0; y < gridDim; y++) {
    for (let x = 0; x < gridDim; x++) {
      let bx = startX + x * cellW;
      let by = startY + y * cellW;

      let isHover = (x === inspectX && y === inspectY);
      fill(isHover ? color(255, 230, 80) : color(255));
      stroke(isHover ? color(220, 140, 0) : color(180));
      strokeWeight(isHover ? 3 : 1);
      rect(bx, by, cellW, cellW, 3);

      fill(0);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text(`${x},${y}`, bx + cellW / 2, by + cellW / 2);
    }
  }

  // 1D Memory Index Calculation
  let pixelIndex = inspectY * gridDim + inspectX;
  let rgbaIndex = pixelIndex * 4;

  // 1D Array Tape Strip
  let tapeY = startY + gridDim * cellW + 30;
  let tapeBoxW = Math.min((canvasWidth - 40) / (gridDim * gridDim), 18);
  let tapeStartX = (canvasWidth - gridDim * gridDim * tapeBoxW) / 2;

  fill(40);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(`1D Flat Memory Buffer: [0 ... ${(gridDim * gridDim) - 1}]`, tapeStartX, tapeY - 4);

  for (let i = 0; i < gridDim * gridDim; i++) {
    let bx = tapeStartX + i * tapeBoxW;
    fill(i === pixelIndex ? color(255, 120, 40) : color(240));
    stroke(i === pixelIndex ? color(220, 50, 0) : color(180));
    strokeWeight(1);
    rect(bx, tapeY, tapeBoxW, 20);
  }

  // Formula Card
  fill(255);
  stroke(200);
  rect(30, tapeY + 35, canvasWidth - 60, 40, 6);
  fill(0);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  text(`Formula: index = 4 * (y * width + x) => 4 * (${inspectY} * ${gridDim} + ${inspectX}) = ${rgbaIndex} [R,G,B,A]`, canvasWidth / 2, tapeY + 55);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text(`Grid Dimensions: ${gridDim} x ${gridDim} (${gridDim * gridDim} pixels)`, canvasWidth / 2, drawHeight + 8);
  text('Hover over any grid cell to calculate its 1D buffer offset.', canvasWidth / 2, drawHeight + 55);
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
