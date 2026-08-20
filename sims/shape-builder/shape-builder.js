// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150; // 4 rows * 35 + 10
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let shapeSelect, modeSelect, pxSlider, pySlider, swSlider, shSlider, weightSlider, fillCheck;
let mouseOverCanvas = false;
let isDragging = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  // Row 1
  shapeSelect = createSelect();
  shapeSelect.option('Rectangle');
  shapeSelect.option('Ellipse');
  shapeSelect.option('Triangle');
  shapeSelect.option('Line');
  shapeSelect.selected('Rectangle');
  
  modeSelect = createSelect();
  modeSelect.option('CORNER');
  modeSelect.option('CENTER');
  modeSelect.selected('CENTER');

  // Row 2
  pxSlider = createSlider(0, 800, 200, 1);
  pySlider = createSlider(0, 400, 200, 1);

  // Row 3
  swSlider = createSlider(10, 300, 150, 1);
  shSlider = createSlider(10, 300, 100, 1);

  // Row 4
  weightSlider = createSlider(1, 20, 3, 1);
  fillCheck = createCheckbox('Fill Shape', true);

  positionControls();
  
  describe('Interactive shape builder demonstrating 2D primitives, origin modes (CORNER/CENTER), sizes, and stroke/fill properties.', FALLBACK);
}

function positionControls() {
  let col1L = 100;
  let col2L = (canvasWidth / 2) + 100;
  let w = (canvasWidth / 2) - 120;
  if (w < 50) w = 50;

  shapeSelect.position(col1L, drawHeight + 5);
  shapeSelect.size(w);
  modeSelect.position(col2L, drawHeight + 5);
  modeSelect.size(w);

  pxSlider.position(col1L, drawHeight + 40);
  pxSlider.size(w);
  pySlider.position(col2L, drawHeight + 40);
  pySlider.size(w);

  swSlider.position(col1L, drawHeight + 75);
  swSlider.size(w);
  shSlider.position(col2L, drawHeight + 75);
  shSlider.size(w);

  weightSlider.position(col1L, drawHeight + 110);
  weightSlider.size(w);
  fillCheck.position(col2L, drawHeight + 110);
}

function draw() {
  updateCanvasSize();

  // Background areas
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw Grid for spatial awareness
  stroke(220);
  strokeWeight(1);
  for(let x = 0; x < canvasWidth; x += 50) { line(x, 0, x, drawHeight); }
  for(let y = 0; y < drawHeight; y += 50) { line(0, y, canvasWidth, y); }

  // Extract variables
  let px = pxSlider.value();
  let py = pySlider.value();

  // Handle Dragging
  if (mouseIsPressed && mouseOverCanvas) {
    if (!isDragging && dist(mouseX, mouseY, px, py) < 15) {
      isDragging = true;
    }
  } else {
    isDragging = false;
  }

  if (isDragging) {
    let newPx = constrain(mouseX, 0, canvasWidth);
    let newPy = constrain(mouseY, 0, drawHeight);
    pxSlider.value(newPx);
    pySlider.value(newPy);
    // Re-fetch the updated values for rendering
    px = pxSlider.value();
    py = pySlider.value();
  }

  let shapeType = shapeSelect.value();
  let rMode = modeSelect.value();
  let sw = swSlider.value();
  let sh = shSlider.value();
  let weight = weightSlider.value();
  let hasFill = fillCheck.checked();

  // Draw shape
  push();
  strokeWeight(weight);
  stroke('dodgerblue');
  
  if (hasFill) {
    fill(255, 165, 0, 180); // Orange with alpha
  } else {
    noFill();
  }

  if (rMode === 'CENTER') {
    rectMode(CENTER);
    ellipseMode(CENTER);
  } else {
    rectMode(CORNER);
    ellipseMode(CORNER);
  }

  // Handle triangle and line offset logic manually if needed, 
  // since they don't natively use rectMode/ellipseMode
  let w2 = sw / 2;
  let h2 = sh / 2;

  if (shapeType === 'Rectangle') {
    rect(px, py, sw, sh);
  } 
  else if (shapeType === 'Ellipse') {
    ellipse(px, py, sw, sh);
  } 
  else if (shapeType === 'Triangle') {
    if (rMode === 'CENTER') {
      triangle(px, py - h2, px - w2, py + h2, px + w2, py + h2);
    } else {
      triangle(px + w2, py, px, py + sh, px + sw, py + sh);
    }
  } 
  else if (shapeType === 'Line') {
    if (rMode === 'CENTER') {
      line(px - w2, py - h2, px + w2, py + h2);
    } else {
      line(px, py, px + sw, py + sh);
    }
  }
  pop();

  // Draw Origin Point (The anchor)
  fill('red');
  noStroke();
  circle(px, py, 10);
  
  // Origin Coordinates Text
  fill('black');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text(`Origin: (${px}, ${py})`, px + 10, py - 10);

  // Draw Title AFTER grid
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Shape Builder', canvasWidth/2, 10);
  
  textSize(14);
  textStyle(ITALIC);
  fill(80);
  text('drag red dot to move the item', canvasWidth/2, 40);
  textStyle(NORMAL);

  // Draw Control Labels
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  let col1X = 10;
  let col2X = (canvasWidth / 2) + 10;

  // Row 1
  text('Shape:', col1X, drawHeight + 15);
  text('Mode:', col2X, drawHeight + 15);
  
  // Row 2
  text('Pos X: ' + px, col1X, drawHeight + 50);
  text('Pos Y: ' + py, col2X, drawHeight + 50);
  
  // Row 3
  text('Width: ' + sw, col1X, drawHeight + 85);
  text('Height: ' + sh, col2X, drawHeight + 85);
  
  // Row 4
  text('Stroke: ' + weight, col1X, drawHeight + 120);
  // Checkbox handles its own label, but we positioned the input. Let's just adjust positioning if needed.
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
