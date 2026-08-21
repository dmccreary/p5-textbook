/* Spectrum Analyzer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/spectrum-analyzer/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let smoothingSlider, viewModeSelect;
let timeVal = 0;
let bandValues = [0, 0, 0, 0, 0];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  smoothingSlider = createSlider(0.5, 0.95, 0.8, 0.05);
  viewModeSelect = createSelect();
  viewModeSelect.option('5 Band EQ View');
  viewModeSelect.option('32 Bin Spectrum Bars');

  positionControls();
  describe('Audio spectrum frequency analyzer tracking Bass, LowMid, Mid, HighMid, and Treble.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  viewModeSelect.position(col1L, drawHeight + 15);
  viewModeSelect.size(w);

  smoothingSlider.position(col2L, drawHeight + 45);
  smoothingSlider.size(w);
}

function draw() {
  updateCanvasSize();
  timeVal += 0.05;

  let smooth = smoothingSlider.value();
  let is5Band = viewModeSelect.value().includes('5 Band');

  // Generate synthetic audio spectrum energies
  let targets = [
    noise(timeVal * 0.8) * 180 + 40,
    noise(timeVal * 1.2 + 10) * 160 + 30,
    noise(timeVal * 1.5 + 20) * 140 + 20,
    noise(timeVal * 1.8 + 30) * 120 + 15,
    noise(timeVal * 2.2 + 40) * 90 + 10
  ];

  for (let i = 0; i < 5; i++) {
    bandValues[i] = bandValues[i] * smooth + targets[i] * (1 - smooth);
  }

  // Dark Analyzer Screen
  fill(15, 20, 30);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(60, 200, 255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('FFT Spectrum Analyzer', canvasWidth / 2, 12);

  let bandNames = ['Bass (60-250Hz)', 'LowMid (250-500Hz)', 'Mid (500-2kHz)', 'HighMid (2-4kHz)', 'Treble (4-20kHz)'];
  let bandColors = [
    color(255, 60, 60),
    color(255, 160, 40),
    color(240, 220, 50),
    color(50, 220, 100),
    color(60, 160, 255)
  ];

  if (is5Band) {
    let barW = (canvasWidth - 60) / 5;
    let startX = 30;
    let baseY = drawHeight - 50;

    for (let i = 0; i < 5; i++) {
      let x = startX + i * barW;
      let h = map(bandValues[i], 0, 220, 0, 220);

      fill(bandColors[i]);
      noStroke();
      rect(x + 6, baseY - h, barW - 12, h, 4);

      fill(255);
      textSize(10);
      textAlign(CENTER, TOP);
      text(bandNames[i].split(' ')[0], x + barW / 2, baseY + 8);
      textSize(9);
      fill(140);
      text(`${Math.round(bandValues[i])}dB`, x + barW / 2, baseY - h - 14);
    }
  } else {
    // 32 bins
    let numBins = 32;
    let binW = (canvasWidth - 60) / numBins;
    let startX = 30;
    let baseY = drawHeight - 50;

    for (let i = 0; i < numBins; i++) {
      let x = startX + i * binW;
      let n = noise(i * 0.2, timeVal);
      let h = n * 200;
      fill(lerpColor(color(50, 100, 255), color(255, 60, 100), i / numBins));
      noStroke();
      rect(x + 1, baseY - h, binW - 2, h, 2);
    }
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Smoothing: ${smooth.toFixed(2)}`, canvasWidth / 2 + 15, drawHeight + 25);
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
