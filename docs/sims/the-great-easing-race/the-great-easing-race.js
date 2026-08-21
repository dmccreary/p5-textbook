/* The Great Easing Race MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-great-easing-race/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let startRaceButton, loopCheckbox;
let raceProgress = 0;
let isRunning = false;
let startBtn;
let isRacing = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startRaceButton = createButton('Restart Race');
  startRaceButton.mousePressed(() => raceProgress = 0);

  loopCheckbox = createCheckbox('Auto Loop', true);

  positionControls();
  describe('Side-by-side easing function race demonstrating Linear, EaseIn, EaseOutBounce, and EaseInOut.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  startRaceButton.position(col1L, drawHeight + 15);
  startRaceButton.size(w);

  loopCheckbox.position(col2L, drawHeight + 15);
}

// Easing math formulas
function easeInQuad(t) { return t * t; }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2; }
function easeOutBounce(t) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  else return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

function draw() {
  updateCanvasSize();

  if (isRacing) {
    if (isRunning) raceProgress += 0.008;
    if (raceProgress > 1.0) {
      if (loopCheckbox.checked()) raceProgress = 0;
      else raceProgress = 1.0;
    }
  }

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('The Great Easing Race', canvasWidth / 2, 12);

  let startX = 110;
  let endX = canvasWidth - 50;
  let trackDist = endX - startX;

  let racers = [
    { name: '1. Linear', tVal: raceProgress, col: color(220, 50, 50) },
    { name: '2. EaseInQuad', tVal: easeInQuad(raceProgress), col: color(240, 140, 20) },
    { name: '3. EaseInOutCubic', tVal: easeInOutCubic(raceProgress), col: color(40, 160, 60) },
    { name: '4. EaseOutBounce', tVal: easeOutBounce(raceProgress), col: color(60, 110, 240) }
  ];

  let startY = 60;
  let rowH = 65;

  for (let i = 0; i < racers.length; i++) {
    let y = startY + i * rowH;
    let r = racers[i];

    // Track lane
    stroke(220);
    strokeWeight(1);
    line(startX, y + 20, endX, y + 20);

    // Finish Line
    stroke(180, 50, 50);
    strokeWeight(2);
    line(endX, y, endX, y + 40);

    // Label
    fill(0);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text(r.name, 15, y + 20);

    // Racer Ball
    let posX = startX + trackDist * r.tVal;
    fill(r.col);
    stroke(255);
    strokeWeight(2);
    circle(posX, y + 20, 22);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text(`Progress t = ${(raceProgress * 100).toFixed(0)}% | Observe acceleration differences across easing curves.`, canvasWidth / 2, drawHeight + 52);
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
