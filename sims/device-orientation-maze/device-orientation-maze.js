/* Device Orientation Maze MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/device-orientation-maze/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let tiltXSlider, tiltYSlider;
let ballPos, ballVel;
let mazeWalls = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  tiltXSlider = createSlider(-45, 45, 0, 1);
  tiltYSlider = createSlider(-45, 45, 0, 1);

  ballPos = createVector(60, 60);
  ballVel = createVector(0, 0);

  // Setup Maze walls
  mazeWalls = [
    { x1: 30, y1: 30, x2: 370, y2: 30 },
    { x1: 370, y1: 30, x2: 370, y2: 370 },
    { x1: 370, y1: 370, x2: 30, y2: 370 },
    { x1: 30, y1: 370, x2: 30, y2: 30 },
    // Interior barriers
    { x1: 120, y1: 30, x2: 120, y2: 240 },
    { x1: 120, y1: 240, x2: 260, y2: 240 },
    { x1: 260, y1: 120, x2: 370, y2: 120 }
  ];

  positionControls();
  describe('Mobile accelerometer tilt simulation rolling a ball through maze walls.', LABEL);
}

function positionControls() {
  let col1L = 100;
  let col2L = canvasWidth / 2 + 100;
  let w = canvasWidth / 2 - 120;
  if (w < 50) w = 50;

  tiltXSlider.position(col1L, drawHeight + 15);
  tiltXSlider.size(w);

  tiltYSlider.position(col2L, drawHeight + 15);
  tiltYSlider.size(w);
}

function draw() {
  updateCanvasSize();

  // Physics update based on simulated tilt
  let tiltX = tiltXSlider.value();
  let tiltY = tiltYSlider.value();

  let ax = map(tiltX, -45, 45, -0.4, 0.4);
  let ay = map(tiltY, -45, 45, -0.4, 0.4);

  ballVel.x += ax;
  ballVel.y += ay;
  ballVel.mult(0.95); // friction

  ballPos.x += ballVel.x;
  ballPos.y += ballVel.y;

  // Boundary Constraints
  ballPos.x = constrain(ballPos.x, 45, canvasWidth - 45);
  ballPos.y = constrain(ballPos.y, 45, drawHeight - 45);

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Device Orientation Maze', canvasWidth / 2, 8);

  // Draw Maze Walls
  stroke(70, 80, 110);
  strokeWeight(6);
  for (let w of mazeWalls) {
    let sx1 = map(w.x1, 0, 400, 10, canvasWidth - 10);
    let sx2 = map(w.x2, 0, 400, 10, canvasWidth - 10);
    let sy1 = map(w.y1, 0, 400, 30, drawHeight - 10);
    let sy2 = map(w.y2, 0, 400, 30, drawHeight - 10);
    line(sx1, sy1, sx2, sy2);
  }

  // Goal Area
  fill(50, 200, 80, 140);
  noStroke();
  rect(canvasWidth - 90, drawHeight - 90, 45, 45, 6);
  fill(0);
  textSize(11);
  textAlign(CENTER, CENTER);
  text('GOAL', canvasWidth - 68, drawHeight - 68);

  // Draw Rolling Ball
  fill(255, 60, 0);
  stroke(255);
  strokeWeight(2);
  circle(ballPos.x, ballPos.y, 22);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Tilt X (Gamma): ${tiltX}°`, 15, drawHeight + 25);
  text(`Tilt Y (Beta): ${tiltY}°`, canvasWidth / 2 + 15, drawHeight + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Adjust tilt sliders to simulate device accelerometer and roll the ball to the GOAL.', canvasWidth / 2, drawHeight + 55);
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
