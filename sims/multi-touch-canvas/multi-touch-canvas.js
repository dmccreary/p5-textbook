/* Multi-Touch Canvas MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/multi-touch-canvas/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let clearButton, touchModeSelect;
let touchPoints = [];
let simulatedTouch2 = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  clearButton = createButton('Clear Canvas');
  clearButton.mousePressed(() => touchPoints = []);

  touchModeSelect = createSelect();
  touchModeSelect.option('Single Touch / Mouse');
  touchModeSelect.option('Simulate 2-Finger Pinch');

  positionControls();
  describe('Multi-touch mobile gesture simulation tracking touch points and pinch distance.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  clearButton.position(col1L, drawHeight + 15);
  clearButton.size(w);

  touchModeSelect.position(col2L, drawHeight + 15);
  touchModeSelect.size(w);
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
  text('Multi-Touch Canvas & Gestures', canvasWidth / 2, 12);

  // Draw Paint Trails
  for (let pt of touchPoints) {
    fill(pt.col);
    noStroke();
    circle(pt.x, pt.y, pt.size);
  }

  // Multi-Touch Handlers
  let isPinch = touchModeSelect.value().includes('Pinch');

  if (mouseIsPressed && mouseY < drawHeight) {
    touchPoints.push({ x: mouseX, y: mouseY, size: 16, col: color(240, 60, 60, 180) });

    if (isPinch) {
      let simX = canvasWidth - mouseX;
      let simY = drawHeight - mouseY + 30;
      touchPoints.push({ x: simX, y: simY, size: 16, col: color(60, 120, 240, 180) });

      // Draw Pinch Distance Guideline
      stroke(100);
      strokeWeight(2);
      drawingContext.setLineDash([4, 4]);
      line(mouseX, mouseY, simX, simY);
      drawingContext.setLineDash([]);

      let pinchDist = Math.round(dist(mouseX, mouseY, simX, simY));
      fill(0);
      noStroke();
      textSize(13);
      textAlign(CENTER, CENTER);
      text(`Pinch Distance: ${pinchDist}px`, (mouseX + simX) / 2, (mouseY + simY) / 2 - 12);
    }
  }

  // Touch Indicators
  if (mouseY < drawHeight) {
    fill(240, 60, 60, 100);
    stroke(220, 30, 30);
    strokeWeight(2);
    circle(mouseX, mouseY, 36);
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Touch 0', mouseX, mouseY);

    if (isPinch) {
      let simX = canvasWidth - mouseX;
      let simY = drawHeight - mouseY + 30;
      fill(60, 120, 240, 100);
      stroke(30, 80, 220);
      circle(simX, simY, 36);
      fill(0);
      noStroke();
      text('Touch 1', simX, simY);
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
  text('Touch or click-drag to draw. Toggle Pinch mode to simulate 2-finger touch array.', canvasWidth / 2, drawHeight + 52);
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
