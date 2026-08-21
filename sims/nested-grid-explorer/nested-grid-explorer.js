/* Nested Grid Explorer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/nested-grid-explorer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let rowsSlider, colsSlider, autoStepCheckbox;
let nextBtn, resetBtn;
let currentI = 0, currentJ = 0;
let stepTimer = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  rowsSlider = createSlider(2, 8, 4, 1);
  colsSlider = createSlider(2, 8, 4, 1);
  
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetGrid);

  nextBtn = createButton('Next');
  nextBtn.mousePressed(stepForward);

  autoStepCheckbox = createCheckbox('Auto Step Loop', false);

  positionControls();
  describe('Nested for-loop grid visualizer tracking row index i and column index j.', FALLBACK);
}

function stepForward() {
  let numRows = rowsSlider.value();
  let numCols = colsSlider.value();
  currentJ++;
  if (currentJ >= numCols) {
    currentJ = 0;
    currentI++;
    if (currentI >= numRows) {
      currentI = 0;
    }
  }
}

function resetGrid() {
  currentI = 0;
  currentJ = 0;
}

function positionControls() {
  let col1L = 80;
  let col2L = canvasWidth / 2 + 80;
  let w = canvasWidth / 2 - 100;
  if (w < 50) w = 50;

  if (typeof rowsSlider !== 'undefined' && rowsSlider) {
    rowsSlider.position(col1L, drawHeight + 10);
    rowsSlider.size(w);
  }

  if (typeof colsSlider !== 'undefined' && colsSlider) {
    colsSlider.position(col2L, drawHeight + 10);
    colsSlider.size(w);
  }

  if (typeof resetBtn !== 'undefined' && resetBtn) {
    resetBtn.position(15, drawHeight + 45);
    nextBtn.position(75, drawHeight + 45);
    autoStepCheckbox.position(135, drawHeight + 45);
  }
}

function draw() {
  updateCanvasSize();

  let numRows = rowsSlider.value();
  let numCols = colsSlider.value();

  // Auto step loop execution
  if (autoStepCheckbox.checked()) {
    stepTimer++;
    if (stepTimer % 20 === 0) {
      stepForward();
    }
  }

  if (currentI >= numRows) currentI = 0;
  if (currentJ >= numCols) currentJ = 0;

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Nested Grid Explorer (2D For-Loops)', canvasWidth / 2, 12);

  // Code Loop Display
  fill(50);
  textSize(13);
  textAlign(CENTER, TOP);
  text(`for (let i = 0; i < ${numRows}; i++) {\n  for (let j = 0; j < ${numCols}; j++) { ... }\n}`, canvasWidth / 2, 42);

  // Grid Geometry
  let gridMargin = 40;
  let availW = canvasWidth - gridMargin * 2;
  let availH = drawHeight - 160;
  let cellW = availW / numCols;
  let cellH = availH / numRows;
  let startX = gridMargin;
  let startY = 120;

  // Draw Grid Cells
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let x = startX + j * cellW;
      let y = startY + i * cellH;

      let isCurrent = (i === currentI && j === currentJ);
      let isPast = (i < currentI) || (i === currentI && j < currentJ);

      if (isCurrent) {
        fill(255, 230, 80);
        stroke(220, 140, 0);
        strokeWeight(3);
      } else if (isPast) {
        fill(220, 240, 220);
        stroke(160, 200, 160);
        strokeWeight(1);
      } else {
        fill(255);
        stroke(200);
        strokeWeight(1);
      }

      rect(x, y, cellW, cellH, 4);

      fill(0);
      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      text(`(${i}, ${j})`, x + cellW / 2, y + cellH / 2);
    }
  }

  // Active Index Readout
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text(`Current Step: Row i = ${currentI}, Col j = ${currentJ} | Cell index = ${currentI * numCols + currentJ + 1}`, canvasWidth / 2, drawHeight - 30);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Rows (i): ${numRows}`, 15, drawHeight + 20);
  text(`Cols (j): ${numCols}`, canvasWidth / 2 + 15, drawHeight + 20);
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
