/* The Interactive Array Train MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-interactive-array-train/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let pushBtn, popBtn, shiftBtn, unshiftBtn;
let trainCars = ['Engine', 'Coal', 'Gold', 'Grain'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  pushBtn = createButton('push("Cargo")');
  pushBtn.mousePressed(() => { if (trainCars.length < 7) trainCars.push('Cargo'); });

  popBtn = createButton('pop()');
  popBtn.mousePressed(() => trainCars.pop());

  shiftBtn = createButton('shift()');
  shiftBtn.mousePressed(() => trainCars.shift());

  unshiftBtn = createButton('unshift("Caboose")');
  unshiftBtn.mousePressed(() => { if (trainCars.length < 7) trainCars.unshift('Caboose'); });

  positionControls();
  describe('Array train cars visualizer demonstrating push, pop, shift, and unshift.', LABEL);
}

function positionControls() {
  let colW = (canvasWidth - 40) / 4;
  pushBtn.position(15, drawHeight + 15);
  pushBtn.size(colW - 5);

  popBtn.position(15 + colW, drawHeight + 15);
  popBtn.size(colW - 5);

  shiftBtn.position(15 + colW * 2, drawHeight + 15);
  shiftBtn.size(colW - 5);

  unshiftBtn.position(15 + colW * 3, drawHeight + 15);
  unshiftBtn.size(colW - 5);
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
  text('The Interactive Array Train', canvasWidth / 2, 12);

  // Draw Railroad Tracks
  let trackY = 220;
  stroke(100, 70, 40);
  strokeWeight(4);
  line(10, trackY, canvasWidth - 10, trackY);
  line(10, trackY + 25, canvasWidth - 10, trackY + 25);

  stroke(140, 100, 60);
  strokeWeight(2);
  for (let x = 15; x < canvasWidth - 15; x += 18) {
    line(x, trackY - 4, x, trackY + 29);
  }

  // Draw Train Cars
  let carW = Math.min((canvasWidth - 40) / Math.max(trainCars.length, 1), 65);
  let startX = (canvasWidth - trainCars.length * carW) / 2;

  for (let i = 0; i < trainCars.length; i++) {
    let x = startX + i * carW;
    let y = trackY - 45;

    // Car Body
    fill(70, 130, 240);
    stroke(30, 80, 180);
    strokeWeight(2);
    rect(x + 4, y, carW - 8, 40, 4);

    // Wheels
    fill(40);
    noStroke();
    circle(x + 12, trackY - 2, 10);
    circle(x + carW - 12, trackY - 2, 10);

    // Coupler
    if (i < trainCars.length - 1) {
      stroke(80);
      strokeWeight(3);
      line(x + carW - 4, y + 20, x + carW + 4, y + 20);
    }

    // Label & Index
    fill(255);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(trainCars[i], x + carW / 2, y + 16);

    // Index Tag
    fill(220, 50, 50);
    textSize(11);
    text(`[${i}]`, x + carW / 2, y - 10);
  }

  // Array length & code representation
  fill(40);
  textSize(13);
  textAlign(CENTER, TOP);
  text(`trainCars.length = ${trainCars.length}  |  cars = [${trainCars.map(c => `"${c}"`).join(', ')}]`, canvasWidth / 2, drawHeight - 40);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('push/pop modify end of array; unshift/shift modify front of array.', canvasWidth / 2, drawHeight + 52);
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
