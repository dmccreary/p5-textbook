/* Array Methods Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/array-methods-visualizer/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let sourceArray = [2, 5, 8, 3, 7, 4];
let methodSelect, stepButton, resetButton;
let currentStep = -1;
let currentOutput = [];
let reduceAccumulator = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  methodSelect = createSelect();
  methodSelect.option('map(x => x * 2)');
  methodSelect.option('filter(x => x > 4)');
  methodSelect.option('reduce((sum, x) => sum + x, 0)');
  methodSelect.option('find(x => x > 5)');
  methodSelect.changed(resetSim);

  stepButton = createButton('Next Step');
  stepButton.mousePressed(nextStep);

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSim);

  positionControls();
  resetSim();
  describe('Visualizer for array methods map, filter, reduce, and find with step-by-step element evaluation.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  methodSelect.position(col1L, drawHeight + 12);
  methodSelect.size(canvasWidth - 30);

  stepButton.position(col1L, drawHeight + 50);
  stepButton.size(w);

  resetButton.position(col2L, drawHeight + 50);
  resetButton.size(w);
}

function resetSim() {
  currentStep = -1;
  currentOutput = [];
  reduceAccumulator = 0;
}

function nextStep() {
  if (currentStep < sourceArray.length - 1) {
    currentStep++;
    let val = sourceArray[currentStep];
    let sel = methodSelect.value();

    if (sel.startsWith('map')) {
      currentOutput.push(val * 2);
    } else if (sel.startsWith('filter')) {
      if (val > 4) currentOutput.push(val);
    } else if (sel.startsWith('reduce')) {
      reduceAccumulator += val;
      currentOutput = [reduceAccumulator];
    } else if (sel.startsWith('find')) {
      if (currentOutput.length === 0 && val > 5) {
        currentOutput.push(val);
      }
    }
  }
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
  text('Array Methods Visualizer', canvasWidth / 2, 12);

  // Method code explanation
  fill(60);
  textSize(14);
  textAlign(CENTER, TOP);
  let methodStr = methodSelect.value();
  text(`Running: const result = numbers.${methodStr};`, canvasWidth / 2, 42);

  // Draw Input Array
  let boxW = Math.min((canvasWidth - 60) / sourceArray.length, 55);
  let startX = (canvasWidth - (boxW * sourceArray.length + (sourceArray.length - 1) * 8)) / 2;
  let inY = 95;

  fill(0);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('Input Array: numbers', startX, inY - 5);

  for (let i = 0; i < sourceArray.length; i++) {
    let bx = startX + i * (boxW + 8);
    
    // Highlight currently processed item
    if (i === currentStep) {
      fill(255, 230, 100);
      stroke(220, 150, 0);
      strokeWeight(3);
    } else if (i < currentStep) {
      fill(235, 245, 235);
      stroke(160, 200, 160);
      strokeWeight(1);
    } else {
      fill(255);
      stroke(180);
      strokeWeight(1);
    }
    rect(bx, inY, boxW, boxW, 6);

    // Value & index
    fill(0);
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(sourceArray[i], bx + boxW / 2, inY + boxW / 2 - 2);
    textSize(11);
    fill(120);
    text(`[${i}]`, bx + boxW / 2, inY + boxW - 8);
  }

  // Draw Execution Status Indicator
  let statusY = 210;
  stroke(200);
  strokeWeight(1);
  line(startX, statusY, canvasWidth - startX, statusY);

  fill(40);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  if (currentStep === -1) {
    text('Click "Next Step" to start processing elements sequentially', canvasWidth / 2, statusY - 14);
  } else {
    let currVal = sourceArray[currentStep];
    text(`Step ${currentStep + 1} of ${sourceArray.length}: Evaluating element numbers[${currentStep}] = ${currVal}`, canvasWidth / 2, statusY - 14);
  }

  // Draw Output Result
  let outY = 255;
  fill(0);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('Result Array / Value: result', startX, outY - 5);

  if (methodStr.startsWith('reduce')) {
    let bx = canvasWidth / 2 - boxW;
    fill(220, 240, 255);
    stroke(70, 130, 220);
    strokeWeight(2);
    rect(bx, outY, boxW * 2, boxW, 6);
    fill(0);
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(currentOutput.length > 0 ? currentOutput[0] : 0, canvasWidth / 2, outY + boxW / 2);
  } else {
    let count = Math.max(currentOutput.length, 1);
    for (let i = 0; i < currentOutput.length; i++) {
      let bx = startX + i * (boxW + 8);
      fill(220, 240, 255);
      stroke(70, 130, 220);
      strokeWeight(2);
      rect(bx, outY, boxW, boxW, 6);
      fill(0);
      noStroke();
      textSize(18);
      textAlign(CENTER, CENTER);
      text(currentOutput[i], bx + boxW / 2, outY + boxW / 2 - 2);
      textSize(11);
      fill(100);
      text(`[${i}]`, bx + boxW / 2, outY + boxW - 8);
    }
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Higher-order methods execute a callback function on each array element.', canvasWidth / 2, drawHeight + 88);
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
