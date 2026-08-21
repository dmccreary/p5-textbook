/* Interactive Wave Maker Laboratory MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-wave-maker-laboratory/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let freq1Slider, amp1Slider, freq2Slider, amp2Slider;
let timeVal = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  freq1Slider = createSlider(1, 8, 2, 0.5);
  amp1Slider = createSlider(10, 60, 40, 5);

  freq2Slider = createSlider(1, 8, 3, 0.5);
  amp2Slider = createSlider(10, 60, 30, 5);

  startBtn = createButton('Start Wave');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Wave');
  });
  positionControls();
  describe('Wave superposition simulator synthesizing two independent harmonic sine waves.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  freq1Slider.position(col1L, drawHeight + 10);
  freq1Slider.size(w);

  amp1Slider.position(col2L, drawHeight + 10);
  amp1Slider.size(w);

  freq2Slider.position(col1L, drawHeight + 45);
  freq2Slider.size(w);

  amp2Slider.position(col2L, drawHeight + 45);
  amp2Slider.size(w);
}

function draw() {
  updateCanvasSize();
  if (isRunning) timeVal += 0.03;

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Interactive Wave Maker Laboratory', canvasWidth / 2, 12);

  let f1 = freq1Slider.value();
  let a1 = amp1Slider.value();
  let f2 = freq2Slider.value();
  let a2 = amp2Slider.value();

  // Wave 1 Display (Top)
  let y1 = 80;
  stroke(220, 50, 50, 160);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 30; x <= canvasWidth - 30; x += 4) {
    let angle = map(x, 30, canvasWidth - 30, 0, TWO_PI * f1) + timeVal;
    let y = y1 + sin(angle) * a1 * 0.5;
    vertex(x, y);
  }
  endShape();
  fill(220, 50, 50);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text(`Wave 1 (f=${f1}, A=${a1})`, 30, y1 - 25);

  // Wave 2 Display (Middle)
  let y2 = 170;
  stroke(40, 160, 60, 160);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 30; x <= canvasWidth - 30; x += 4) {
    let angle = map(x, 30, canvasWidth - 30, 0, TWO_PI * f2) + timeVal * 1.5;
    let y = y2 + sin(angle) * a2 * 0.5;
    vertex(x, y);
  }
  endShape();
  fill(40, 160, 60);
  noStroke();
  textSize(11);
  text(`Wave 2 (f=${f2}, A=${a2})`, 30, y2 - 25);

  // Superposition Wave (Bottom: Wave 1 + Wave 2)
  let y3 = 290;
  stroke(200);
  line(30, y3, canvasWidth - 30, y3);

  stroke(40, 90, 220);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let x = 30; x <= canvasWidth - 30; x += 3) {
    let angle1 = map(x, 30, canvasWidth - 30, 0, TWO_PI * f1) + timeVal;
    let angle2 = map(x, 30, canvasWidth - 30, 0, TWO_PI * f2) + timeVal * 1.5;
    let combinedY = (sin(angle1) * a1 + sin(angle2) * a2) * 0.6;
    vertex(x, y3 + combinedY);
  }
  endShape();

  fill(40, 90, 220);
  noStroke();
  textSize(12);
  text('Combined Resultant Wave (Superposition: Wave 1 + Wave 2)', 30, y3 - 40);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Wave 1 Freq: ${f1}`, 15, drawHeight + 20);
  text(`Wave 1 Amp: ${a1}`, canvasWidth / 2 + 15, drawHeight + 20);
  text(`Wave 2 Freq: ${f2}`, 15, drawHeight + 55);
  text(`Wave 2 Amp: ${a2}`, canvasWidth / 2 + 15, drawHeight + 55);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Superposition principle states that net displacement equals sum of individual waves.', canvasWidth / 2, drawHeight + 85);
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
    startBtn = createButton('Start Wave');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Wave');
  });
  positionControls();
  }
}
