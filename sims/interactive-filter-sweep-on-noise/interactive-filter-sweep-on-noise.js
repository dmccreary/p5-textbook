/* Interactive Filter Sweep on Noise MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-filter-sweep-on-noise/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let cutoffSlider, resSlider, typeSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cutoffSlider = createSlider(20, 5000, 1000, 50);
  resSlider = createSlider(0.1, 10.0, 2.5, 0.1);

  typeSelect = createSelect();
  typeSelect.option('lowpass');
  typeSelect.option('highpass');
  typeSelect.option('bandpass');

  positionControls();
  describe('Audio filter sweep frequency response curve visualizer.', LABEL);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  cutoffSlider.position(col1L, drawHeight + 10);
  cutoffSlider.size(w);

  resSlider.position(col2L, drawHeight + 10);
  resSlider.size(w);

  typeSelect.position(col1L, drawHeight + 45);
  typeSelect.size(w);
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
  text('Audio Filter Sweep on Noise', canvasWidth / 2, 12);

  let cutoff = cutoffSlider.value();
  let resonance = resSlider.value();
  let fType = typeSelect.value();

  // Graph Area
  let gx = 40;
  let gy = 60;
  let gw = canvasWidth - 80;
  let gh = drawHeight - 110;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(gx, gy, gw, gh, 6);

  // Frequency Grid Lines (Log Scale: 20Hz, 100Hz, 1kHz, 10kHz, 20kHz)
  let freqs = [100, 1000, 5000, 10000];
  stroke(230);
  for (let f of freqs) {
    let x = map(log(f / 20) / log(1000), 0, 1, gx, gx + gw);
    line(x, gy, x, gy + gh);
    fill(130);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text(`${f >= 1000 ? (f/1000)+'k' : f}Hz`, x, gy + gh + 4);
  }

  // Draw Dynamic Frequency Response Curve (Bode Plot)
  noFill();
  stroke(40, 120, 240);
  strokeWeight(3);
  beginShape();
  for (let px = 0; px <= gw; px += 2) {
    let normX = px / gw;
    let f = 20 * pow(1000, normX); // log frequency
    let gain = 0;

    let ratio = f / cutoff;
    if (fType === 'lowpass') {
      gain = 1 / sqrt(1 + pow(ratio, 4));
      if (abs(f - cutoff) < cutoff * 0.3) gain += (resonance * 0.15) * exp(-sq((f - cutoff)/(cutoff * 0.2)));
    } else if (fType === 'highpass') {
      gain = pow(ratio, 2) / sqrt(1 + pow(ratio, 4));
      if (abs(f - cutoff) < cutoff * 0.3) gain += (resonance * 0.15) * exp(-sq((f - cutoff)/(cutoff * 0.2)));
    } else {
      // Bandpass
      gain = exp(-sq(log(ratio) * resonance * 0.8));
    }

    let py = gy + gh - constrain(gain * (gh * 0.75), 0, gh - 10);
    vertex(gx + px, py);
  }
  endShape();

  // Cutoff marker
  let cutNorm = log(cutoff / 20) / log(1000);
  let cutX = map(cutNorm, 0, 1, gx, gx + gw);
  stroke(220, 50, 50);
  strokeWeight(2);
  line(cutX, gy, cutX, gy + gh);
  fill(220, 50, 50);
  noStroke();
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text(`Cutoff: ${cutoff}Hz`, cutX, gy - 2);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Cutoff: ${cutoff}Hz`, 15, drawHeight + 20);
  text(`Res (Q): ${resonance.toFixed(1)}`, canvasWidth / 2 + 15, drawHeight + 20);
  text('Type:', 15, drawHeight + 55);
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
