/* Waveform Visualizer & Hearer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/waveform-visualizer-hearer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let waveTypeSelect, freqSlider;
let phase = 0;
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  waveTypeSelect = createSelect();
  waveTypeSelect.option('Sine Wave');
  waveTypeSelect.option('Square Wave');
  waveTypeSelect.option('Triangle Wave');
  waveTypeSelect.option('Sawtooth Wave');

  freqSlider = createSlider(1, 6, 2, 0.5);

  startBtn = createButton('Start Waveform');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Waveform');
  });
  positionControls();
  describe('Oscilloscope visualizing Sine, Square, Triangle, and Sawtooth audio waveforms.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  waveTypeSelect.position(col1L, drawHeight + 15);
  waveTypeSelect.size(w);

  freqSlider.position(col2L, drawHeight + 45);
  freqSlider.size(w);
}

function draw() {
  updateCanvasSize();
  if (isRunning) phase += 0.04;

  let waveType = waveTypeSelect.value();
  let freq = freqSlider.value();

  // Dark Oscilloscope Canvas
  fill(12, 20, 24);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(60, 240, 160);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Waveform Visualizer (Oscilloscope)', canvasWidth / 2, 12);

  // Oscilloscope Grid
  stroke(20, 50, 40);
  strokeWeight(1);
  let midY = drawHeight / 2 + 10;
  for (let x = 30; x < canvasWidth - 30; x += 30) line(x, 50, x, drawHeight - 30);
  for (let y = 50; y < drawHeight - 30; y += 30) line(30, y, canvasWidth - 30, y);

  stroke(30, 90, 70);
  line(30, midY, canvasWidth - 30, midY); // Center baseline

  // Plot Waveform
  stroke(80, 255, 180);
  strokeWeight(3);
  noFill();

  beginShape();
  let amp = 80;
  for (let x = 30; x <= canvasWidth - 30; x += 2) {
    let t = map(x, 30, canvasWidth - 30, 0, TWO_PI * freq) + phase;
    let yVal = 0;

    if (waveType.startsWith('Sine')) {
      yVal = sin(t);
    } else if (waveType.startsWith('Square')) {
      yVal = sin(t) >= 0 ? 1 : -1;
    } else if (waveType.startsWith('Triangle')) {
      yVal = (2 / PI) * asin(sin(t));
    } else if (waveType.startsWith('Sawtooth')) {
      yVal = (2 * (t / TWO_PI - Math.floor(0.5 + t / TWO_PI)));
    }

    vertex(x, midY - yVal * amp);
  }
  endShape();

  // Wave properties readout
  fill(80, 255, 180);
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text(`${waveType} | Cycles: ${freq} | Timbre: ${getTimbreDescription(waveType)}`, canvasWidth / 2, drawHeight - 25);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Frequency: ${freq} Hz`, canvasWidth / 2 + 15, drawHeight + 25);
}

function getTimbreDescription(type) {
  if (type.startsWith('Sine')) return 'Pure fundamental tone';
  if (type.startsWith('Square')) return 'Hollow, clarinet-like (odd harmonics)';
  if (type.startsWith('Triangle')) return 'Mellow, soft harmonics';
  return 'Bright, brassy (all harmonics)';
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
    startBtn = createButton('Start Waveform');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Waveform');
  });
  positionControls();
  }
}
