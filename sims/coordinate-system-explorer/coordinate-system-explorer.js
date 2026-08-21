/* Coordinate System Explorer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/coordinate-system-explorer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let gridSpacingSlider, showCartesianCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gridSpacingSlider = createSlider(20, 80, 40, 10);
  showCartesianCheckbox = createCheckbox('Show Cartesian (0,0 at Center)', false);

  positionControls();
  describe('Interactive 2D coordinate grid comparing Screen vs Cartesian coordinate conventions.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  showCartesianCheckbox.position(col1L, drawHeight + 15);
  gridSpacingSlider.position(col2L, drawHeight + 45);
  gridSpacingSlider.size(w);
}

function draw() {
  updateCanvasSize();

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  let grid = gridSpacingSlider.value();
  let isCartesian = showCartesianCheckbox.checked();

  // Draw Grid Lines
  stroke(220);
  strokeWeight(1);
  for (let x = 0; x <= canvasWidth; x += grid) {
    line(x, 0, x, drawHeight);
  }
  for (let y = 0; y <= drawHeight; y += grid) {
    line(0, y, canvasWidth, y);
  }

  // Draw Coordinate Axes
  strokeWeight(2);
  if (isCartesian) {
    let cx = canvasWidth / 2;
    let cy = drawHeight / 2;
    stroke(220, 50, 50); // X-Axis
    line(0, cy, canvasWidth, cy);
    stroke(40, 160, 40); // Y-Axis
    line(cx, 0, cx, drawHeight);

    // Origin marker
    fill(0);
    noStroke();
    circle(cx, cy, 8);
    textSize(12);
    textAlign(LEFT, TOP);
    text('(0, 0) Center', cx + 6, cy + 6);
  } else {
    stroke(220, 50, 50); // X-Axis top
    line(0, 0, canvasWidth, 0);
    stroke(40, 160, 40); // Y-Axis left
    line(0, 0, 0, drawHeight);

    // Origin marker
    fill(0);
    noStroke();
    circle(0, 0, 14);
    textSize(12);
    textAlign(LEFT, TOP);
    text('(0, 0) Screen Origin', 8, 8);
  }

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Coordinate System Explorer', canvasWidth / 2, 16);

  // Mouse Tracker Point
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= drawHeight) {
    // Crosshair guide lines
    stroke(150, 150, 200);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(mouseX, 0, mouseX, drawHeight);
    line(0, mouseY, canvasWidth, mouseY);
    drawingContext.setLineDash([]);

    fill(255, 80, 0);
    noStroke();
    circle(mouseX, mouseY, 10);

    // Coordinate readout
    let screenX = Math.round(mouseX);
    let screenY = Math.round(mouseY);
    let cartX = Math.round(mouseX - canvasWidth / 2);
    let cartY = Math.round(drawHeight / 2 - mouseY);

    fill(0);
    textSize(14);
    textAlign(LEFT, BOTTOM);
    let label = isCartesian ? `Cartesian: (${cartX}, ${cartY})` : `Screen: (${screenX}, ${screenY})`;
    let textX = mouseX + 12 > canvasWidth - 140 ? mouseX - 150 : mouseX + 12;
    let textY = mouseY - 10 < 25 ? mouseY + 25 : mouseY - 10;
    rect(textX - 4, textY - 18, 145, 24, 4);
    fill(255);
    text(label, textX, textY);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Grid Spacing: ${grid}px`, canvasWidth / 2 + 15, drawHeight + 25);
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
