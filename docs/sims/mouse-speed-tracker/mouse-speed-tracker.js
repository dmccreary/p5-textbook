/* Mouse Speed Tracker MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/mouse-speed-tracker/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let trailCheckbox;
let speedHistory = [];
let maxObservedSpeed = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  trailCheckbox = createCheckbox('Show Velocity Vector Trails', true);

  positionControls();
  describe('Mouse velocity and acceleration speedometer with live motion vector graphics.', FALLBACK);
}

function positionControls() {
  trailCheckbox.position(20, drawHeight + 25);
}

function draw() {
  updateCanvasSize();

  // Calculate mouse speed using Pythagorean distance
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  let speed = sqrt(dx * dx + dy * dy);
  if (speed > maxObservedSpeed) maxObservedSpeed = speed;

  speedHistory.push(speed);
  if (speedHistory.length > canvasWidth - 60) speedHistory.shift();

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Mouse Speed & Velocity Tracker', canvasWidth / 2, 12);

  // Speedometer Gauge
  let cx = canvasWidth / 2;
  let cy = 120;
  let r = 65;

  stroke(220);
  strokeWeight(10);
  noFill();
  arc(cx, cy, r * 2, r * 2, PI * 0.8, PI * 2.2);

  let speedAngle = map(constrain(speed, 0, 80), 0, 80, PI * 0.8, PI * 2.2);
  let gaugeCol = speed > 40 ? color(220, 50, 50) : speed > 20 ? color(240, 160, 0) : color(40, 160, 60);
  stroke(gaugeCol);
  arc(cx, cy, r * 2, r * 2, PI * 0.8, speedAngle);

  fill(0);
  noStroke();
  textSize(26);
  textAlign(CENTER, CENTER);
  text(`${Math.round(speed)}`, cx, cy - 5);
  textSize(12);
  fill(100);
  text('px / frame', cx, cy + 20);

  // Velocity Vector at Cursor
  if (mouseY < drawHeight && trailCheckbox.checked()) {
    stroke(220, 40, 40);
    strokeWeight(3);
    line(mouseX, mouseY, mouseX + dx * 2, mouseY + dy * 2);
    fill(220, 40, 40);
    noStroke();
    circle(mouseX, mouseY, 8);
  }

  // Speed History Timeline Graph
  let gx = 30;
  let gy = 230;
  let gw = canvasWidth - 60;
  let gh = 130;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(gx, gy, gw, gh, 6);

  stroke(235);
  line(gx, gy + gh / 2, gx + gw, gy + gh / 2);

  noFill();
  stroke(40, 110, 220);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < speedHistory.length; i++) {
    let x = gx + i;
    let y = gy + gh - map(constrain(speedHistory[i], 0, 80), 0, 80, 0, gh - 5);
    vertex(x, y);
  }
  endShape();

  fill(30);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text(`dx: ${dx}px, dy: ${dy}px | Max Speed: ${Math.round(maxObservedSpeed)} px/frame`, gx + 10, gy + 10);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Move your cursor across the canvas at various speeds to measure velocity.', canvasWidth / 2, drawHeight + 52);
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
