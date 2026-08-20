/* Algorithm Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/algorithm-visualizer/
*/
// CANVAS_HEIGHT: 500

let canvasWidth = 600;
let drawHeight = 300;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let stepBackBtn, stepFwdBtn, resetBtn;
let loopTypeSelect;
let lengthSlider, thresholdSlider;
let currentStep = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let ctrlY = drawHeight + 10;
  
  // Row 1: Stepping
  stepBackBtn = createButton('Step Backward');
  stepBackBtn.position(margin, ctrlY);
  stepBackBtn.mousePressed(() => {
    if (currentStep > 0) currentStep--;
  });

  stepFwdBtn = createButton('Step Forward');
  stepFwdBtn.position(margin + 120, ctrlY);
  stepFwdBtn.mousePressed(() => {
    if (currentStep < lengthSlider.value()) currentStep++;
  });

  resetBtn = createButton('Reset');
  resetBtn.position(margin + 230, ctrlY);
  resetBtn.mousePressed(() => {
    currentStep = 0;
  });

  // Row 2: Loop Type
  ctrlY += 40;
  loopTypeSelect = createSelect();
  loopTypeSelect.position(margin + 150, ctrlY);
  loopTypeSelect.option('For Loop');
  loopTypeSelect.option('While Loop');

  // Row 3: Array Length
  ctrlY += 40;
  lengthSlider = createSlider(1, 100, 50, 1);
  lengthSlider.position(margin + 150, ctrlY);
  lengthSlider.input(() => {
    if (currentStep > lengthSlider.value()) {
      currentStep = lengthSlider.value();
    }
  });

  // Row 4: Threshold
  ctrlY += 40;
  thresholdSlider = createSlider(0, 100, 25, 1);
  thresholdSlider.position(margin + 150, ctrlY);

  describe('Interactive visualization of for and while loops generating a grid of shapes based on conditional logic.', FALLBACK);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Draw background areas
  fill('#F0F8FF');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);
  fill('#FFFFFF');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(200);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Read state
  let maxLen = lengthSlider.value();
  let thresh = thresholdSlider.value();
  let loopType = loopTypeSelect.value();

  // Split draw area: Left (Code), Right (Visualization)
  let codeWidth = Math.min(canvasWidth * 0.45, 300);
  let visWidth = canvasWidth - codeWidth;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Algorithm Visualizer', canvasWidth / 2, 10);
  
  textSize(12);
  textStyle(ITALIC);
  fill(80);
  text('step through the loop to see shapes drawn', canvasWidth / 2, 35);
  textStyle(NORMAL);

  // Code Panel
  push();
  translate(margin, 60);
  fill(30);
  rect(0, 0, codeWidth - margin * 1.5, drawHeight - 80, 5);
  
  fill('#E6DB74'); // Monokai yellow-ish
  textSize(14);
  textAlign(LEFT, TOP);
  let codeText = '';
  
  if (loopType === 'For Loop') {
    codeText = 
`for (let i = 0; i < ${maxLen}; i++) {
  if (i < ${thresh}) {
    fill('red');
    circle(x, y, d);
  } else {
    fill('blue');
    square(x, y, d);
  }
}`;
  } else {
    codeText = 
`let i = 0;
while (i < ${maxLen}) {
  if (i < ${thresh}) {
    fill('red');
    circle(x, y, d);
  } else {
    fill('blue');
    square(x, y, d);
  }
  i++;
}`;
  }
  
  text(codeText, 15, 15);
  
  // Highlight current line roughly
  // This is a simple approximation
  fill(255, 255, 255, 30);
  noStroke();
  if (currentStep < maxLen) {
    if (loopType === 'For Loop') {
      rect(5, 12, codeWidth - margin * 1.5 - 10, 18, 3);
    } else {
      rect(5, 32, codeWidth - margin * 1.5 - 10, 18, 3);
    }
  } else {
    // done
  }
  pop();

  // Visualization Panel
  push();
  translate(codeWidth, 60);
  
  // Draw Grid background
  let gridW = visWidth - margin;
  let gridH = drawHeight - 80;
  
  // We want to draw up to 100 items. A 10x10 grid.
  let cols = 10;
  let rows = 10;
  let cellW = gridW / cols;
  let cellH = gridH / rows;
  let shapeSize = Math.min(cellW, cellH) * 0.6;
  
  noFill();
  stroke(220);
  rect(0, 0, gridW, gridH);
  
  for (let i = 0; i < currentStep; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let cx = col * cellW + cellW / 2;
    let cy = row * cellH + cellH / 2;
    
    // Draw based on condition
    noStroke();
    if (i < thresh) {
      fill('#FF4C4C'); // Red
      circle(cx, cy, shapeSize);
    } else {
      fill('#4C7AFF'); // Blue
      rectMode(CENTER);
      square(cx, cy, shapeSize);
      rectMode(CORNER);
    }
    
    // Highlight the most recently drawn item
    if (i === currentStep - 1 && currentStep > 0) {
      noFill();
      stroke('black');
      strokeWeight(2);
      circle(cx, cy, shapeSize + 4);
    }
    
    // Text index
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(i, cx, cy);
  }
  
  // Ghost outline for the next item to be drawn
  if (currentStep < maxLen) {
    let col = currentStep % cols;
    let row = Math.floor(currentStep / cols);
    let cx = col * cellW + cellW / 2;
    let cy = row * cellH + cellH / 2;
    
    noFill();
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    if (currentStep < thresh) {
      circle(cx, cy, shapeSize);
    } else {
      rectMode(CENTER);
      square(cx, cy, shapeSize);
      rectMode(CORNER);
    }
    drawingContext.setLineDash([]);
  }

  pop();

  // Control Labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  
  let ctrlYBase = drawHeight + 10;
  
  // Stepping info
  text(`Iteration: ${currentStep} / ${maxLen}`, margin + 300, ctrlYBase + 10);
  
  text('Loop Type:', margin, ctrlYBase + 40 + 10);
  text('Array Length: ' + maxLen, margin, ctrlYBase + 80 + 10);
  text('Condition ( i < ' + thresh + ' ): ', margin, ctrlYBase + 120 + 10);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Adjust sliders
    if (typeof lengthSlider !== 'undefined') {
      let sliderW = Math.max(100, canvasWidth - 150 - margin * 2);
      lengthSlider.size(sliderW);
      thresholdSlider.size(sliderW);
    }
  }
}
