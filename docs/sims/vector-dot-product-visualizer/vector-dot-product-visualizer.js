/* Vector Dot Product Visualizer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/vector-dot-product-visualizer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let angleSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  angleSlider = createSlider(0, 360, 45, 2);

  positionControls();
  describe('Vector dot product visualizer showing scalar projection and angle theta.', FALLBACK);
}

function positionControls() {
  angleSlider.position(canvasWidth / 2 - 80, drawHeight + 25);
  angleSlider.size(160);
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
  text('Vector Dot Product Visualizer', canvasWidth / 2, 12);

  let angleDeg = angleSlider.value();
  let theta = radians(angleDeg);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let lenA = 110;
  let lenB = 120;

  // Vector B (Fixed along horizontal X)
  let bX = cx + lenB;
  let bY = cy;

  // Vector A (Rotatable by theta)
  let aX = cx + lenA * cos(theta);
  let aY = cy + lenA * sin(theta);

  // Dot product calculation: A . B = |A| * |B| * cos(theta)
  let dotProd = lenA * lenB * cos(theta);
  let normDot = cos(theta);

  // Scalar projection of A onto B
  let projX = cx + lenA * cos(theta);
  let projY = cy;

  // Projection dotted line
  stroke(160, 160, 200);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(aX, aY, projX, projY);
  drawingContext.setLineDash([]);

  // Draw Vector B (Blue)
  stroke(40, 100, 220);
  strokeWeight(3);
  line(cx, cy, bX, bY);
  fill(40, 100, 220);
  circle(bX, bY, 8);

  // Draw Vector A (Red)
  stroke(220, 50, 50);
  strokeWeight(3);
  line(cx, cy, aX, aY);
  fill(220, 50, 50);
  circle(aX, aY, 8);

  // Center Origin
  fill(0);
  noStroke();
  circle(cx, cy, 10);

  // Vector Labels
  textSize(13);
  fill(220, 50, 50);
  text('Vector A', aX + 8, aY);
  fill(40, 100, 220);
  text('Vector B', bX + 8, bY);

  // Dot Product Value Bar / Gauge
  let barY = drawHeight - 40;
  let barW = 200;
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(cx - barW / 2, barY, barW, 16, 4);

  fill(normDot >= 0 ? color(40, 180, 80) : color(220, 50, 50));
  noStroke();
  let fillW = (barW / 2) * normDot;
  rect(cx, barY, fillW, 16);

  fill(0);
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text(`Angle θ = ${angleDeg}°  |  A · B = |A||B|cos(θ) = ${(normDot).toFixed(2)}`, canvasWidth / 2, barY - 6);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text(`Adjust Angle θ: ${angleDeg}°`, canvasWidth / 2, drawHeight + 6);
  text('Dot product is maximum when parallel (0°), zero when perpendicular (90°).', canvasWidth / 2, drawHeight + 55);
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
