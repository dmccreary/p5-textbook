/* The Logic Gate Switchboard MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-logic-gate-switchboard/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let inputASwitch, inputBSwitch, gateSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  inputASwitch = createCheckbox('Input A (true/false)', true);
  inputBSwitch = createCheckbox('Input B (true/false)', false);

  gateSelect = createSelect();
  gateSelect.option('AND (&&)');
  gateSelect.option('OR (||)');
  gateSelect.option('XOR (!==)');
  gateSelect.option('NOT (!A)');

  positionControls();
  describe('Boolean logic gate simulator wiring inputs A and B to an illuminated output bulb.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  gateSelect.position(col1L, drawHeight + 15);
  gateSelect.size(w);

  inputASwitch.position(col2L, drawHeight + 15);
  inputBSwitch.position(col2L, drawHeight + 45);
}

function draw() {
  updateCanvasSize();

  let inA = inputASwitch.checked();
  let inB = inputBSwitch.checked();
  let selGate = gateSelect.value();

  let outVal = false;
  if (selGate.startsWith('AND')) outVal = inA && inB;
  else if (selGate.startsWith('OR')) outVal = inA || inB;
  else if (selGate.startsWith('XOR')) outVal = (inA !== inB);
  else if (selGate.startsWith('NOT')) outVal = !inA;

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('The Logic Gate Switchboard', canvasWidth / 2, 12);

  // Logic Gate Circuit Diagram
  let ax = 60, ay = 120;
  let bx = 60, by = 200;
  let gx = canvasWidth / 2, gy = 160;
  let outX = canvasWidth - 70, outY = 160;

  // Input Wires
  stroke(inA ? color(40, 180, 80) : color(180));
  strokeWeight(4);
  line(ax, ay, gx - 40, ay);
  line(gx - 40, ay, gx - 40, gy - 15);

  if (!selGate.startsWith('NOT')) {
    stroke(inB ? color(40, 180, 80) : color(180));
    line(bx, by, gx - 40, by);
    line(gx - 40, by, gx - 40, gy + 15);
  }

  // Gate Box
  fill(255);
  stroke(80, 120, 200);
  strokeWeight(2);
  rect(gx - 40, gy - 35, 80, 70, 8);
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(selGate.split(' ')[0], gx, gy);

  // Output Wire
  stroke(outVal ? color(40, 180, 80) : color(180));
  strokeWeight(4);
  line(gx + 40, gy, outX, outY);

  // Neon Light Bulb Output
  fill(outVal ? color(255, 230, 40) : color(80, 90, 100));
  stroke(outVal ? color(255, 180, 0) : color(60));
  strokeWeight(3);
  circle(outX, outY, 36);

  fill(outVal ? 0 : 255);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(outVal ? 'ON' : 'OFF', outX, outY);

  // Truth statement
  fill(30);
  textSize(14);
  textAlign(CENTER, TOP);
  text(`Boolean Result: ${outVal ? 'TRUE (1)' : 'FALSE (0)'}`, canvasWidth / 2, drawHeight - 40);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);
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
