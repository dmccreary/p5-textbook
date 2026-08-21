/* Bézier Control Point Sandbox MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/bezier-sandbox/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let p1, p2, p3, p4;
let draggedPoint = null;
let showTangentsCheckbox, showStepsSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  p1 = createVector(60, 320);
  p2 = createVector(100, 100);
  p3 = createVector(300, 90);
  p4 = createVector(340, 310);

  showTangentsCheckbox = createCheckbox('Show Tangent Handles', true);
  showStepsSlider = createSlider(10, 60, 30, 5);

  positionControls();
  describe('Draggable cubic Bezier curve editor with 4 interactive control vertices.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  showTangentsCheckbox.position(col1L, drawHeight + 15);
  showStepsSlider.position(col2L, drawHeight + 45);
  showStepsSlider.size(w);
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
  text('Bézier Control Point Sandbox', canvasWidth / 2, 12);

  // Tangent Handles
  if (showTangentsCheckbox.checked()) {
    stroke(180, 180, 220);
    strokeWeight(2);
    line(p1.x, p1.y, p2.x, p2.y);
    line(p4.x, p4.y, p3.x, p3.y);
  }

  // Draw Cubic Bézier Curve
  noFill();
  stroke(40, 90, 220);
  strokeWeight(3);
  bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  // Draw Interpolated Steps on curve
  let steps = showStepsSlider.value();
  fill(30, 80, 200);
  noStroke();
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = bezierPoint(p1.x, p2.x, p3.x, p4.x, t);
    let y = bezierPoint(p1.y, p2.y, p3.y, p4.y, t);
    circle(x, y, 4);
  }

  // Draw Control Points
  drawControlPoint(p1, 'P1 (Anchor 1)', color(50, 180, 50));
  drawControlPoint(p2, 'P2 (Control 1)', color(220, 140, 20));
  drawControlPoint(p3, 'P3 (Control 2)', color(220, 140, 20));
  drawControlPoint(p4, 'P4 (Anchor 2)', color(50, 180, 50));

  // Code readout
  fill(40);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text(`bezier(${Math.round(p1.x)}, ${Math.round(p1.y)}, ${Math.round(p2.x)}, ${Math.round(p2.y)}, ${Math.round(p3.x)}, ${Math.round(p3.y)}, ${Math.round(p4.x)}, ${Math.round(p4.y)});`, canvasWidth / 2, drawHeight - 25);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Points count: ${steps}`, canvasWidth / 2 + 15, drawHeight + 25);
}

function drawControlPoint(pt, label, col) {
  let isHover = dist(mouseX, mouseY, pt.x, pt.y) < 14;
  fill(col);
  stroke(255);
  strokeWeight(2);
  circle(pt.x, pt.y, isHover ? 18 : 14);

  fill(0);
  noStroke();
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text(`${label}\n(${Math.round(pt.x)}, ${Math.round(pt.y)})`, pt.x, pt.y - 10);
}

function mousePressed() {
  if (mouseY < drawHeight) {
    if (dist(mouseX, mouseY, p1.x, p1.y) < 16) draggedPoint = p1;
    else if (dist(mouseX, mouseY, p2.x, p2.y) < 16) draggedPoint = p2;
    else if (dist(mouseX, mouseY, p3.x, p3.y) < 16) draggedPoint = p3;
    else if (dist(mouseX, mouseY, p4.x, p4.y) < 16) draggedPoint = p4;
  }
}

function mouseDragged() {
  if (draggedPoint) {
    draggedPoint.x = constrain(mouseX, 20, canvasWidth - 20);
    draggedPoint.y = constrain(mouseY, 40, drawHeight - 35);
  }
}

function mouseReleased() {
  draggedPoint = null;
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
