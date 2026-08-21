/* Beat Detector System MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/beat-detector-system/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let sensitivitySlider, decaySlider, tempoSlider;
let energyHistory = [];
let currentEnergy = 0;
let threshold = 120;
let beatPulse = 0;
let timeCount = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  sensitivitySlider = createSlider(1.0, 2.5, 1.4, 0.1);
  decaySlider = createSlider(0.85, 0.99, 0.95, 0.01);
  tempoSlider = createSlider(60, 180, 120, 1);

  positionControls();
  describe('Audio beat detection visualizer showing instantaneous energy vs dynamic decaying threshold.', FALLBACK);
}

function positionControls() {
  let col1L = 100;
  let col2L = canvasWidth / 2 + 100;
  let w = canvasWidth / 2 - 120;
  if (w < 50) w = 50;

  sensitivitySlider.position(col1L, drawHeight + 10);
  sensitivitySlider.size(w);

  decaySlider.position(col2L, drawHeight + 10);
  decaySlider.size(w);

  tempoSlider.position(col1L, drawHeight + 45);
  tempoSlider.size(w);
}

function draw() {
  updateCanvasSize();

  // Synthetic Audio Beat Generator
  timeCount++;
  let bpm = tempoSlider.value();
  let beatInterval = Math.floor(3600 / bpm);
  let isBeatFrame = (timeCount % beatInterval === 0);

  // Generate synthetic bass energy
  let baseNoise = noise(timeCount * 0.1) * 40 + 30;
  let kickEnergy = isBeatFrame ? 180 : 0;
  currentEnergy = currentEnergy * 0.8 + (baseNoise + kickEnergy) * 0.2;

  // Beat Detection Algorithm: Compare current energy with decaying threshold
  let sens = sensitivitySlider.value();
  let decay = decaySlider.value();
  threshold = Math.max(threshold * decay, 60);

  if (currentEnergy > threshold * sens) {
    beatPulse = 1.0;
    threshold = currentEnergy; // reset threshold on beat
  }
  beatPulse *= 0.9;

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Beat Detector System', canvasWidth / 2, 12);

  // Visual Speaker / Flash on Beat
  let cx = canvasWidth / 2;
  let cy = 130;
  let baseSize = 80;
  let pulseSize = baseSize + beatPulse * 40;

  fill(255, 60 + beatPulse * 195, 60, 220);
  stroke(200, 30, 30);
  strokeWeight(3);
  circle(cx, cy, pulseSize);

  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(beatPulse > 0.3 ? 'BEAT!' : 'LISTEN', cx, cy);

  // Energy Oscilloscope / History Graph
  energyHistory.push({ e: currentEnergy, th: threshold * sens });
  if (energyHistory.length > canvasWidth - 60) {
    energyHistory.shift();
  }

  let graphX = 30;
  let graphY = 220;
  let graphW = canvasWidth - 60;
  let graphH = 130;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 6);

  // Graph Grid
  stroke(240);
  line(graphX, graphY + graphH / 2, graphX + graphW, graphY + graphH / 2);

  // Draw History Lines
  noFill();
  // Threshold Line (Red)
  stroke(220, 50, 50);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < energyHistory.length; i++) {
    let x = graphX + i;
    let y = map(energyHistory[i].th, 0, 220, graphY + graphH - 5, graphY + 5);
    vertex(x, constrain(y, graphY, graphY + graphH));
  }
  endShape();

  // Instant Energy Line (Blue)
  stroke(50, 100, 220);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < energyHistory.length; i++) {
    let x = graphX + i;
    let y = map(energyHistory[i].e, 0, 220, graphY + graphH - 5, graphY + 5);
    vertex(x, constrain(y, graphY, graphY + graphH));
  }
  endShape();

  // Graph Legend
  noStroke();
  textSize(11);
  fill(50, 100, 220);
  text('— Instant Energy', graphX + 50, graphY + 12);
  fill(220, 50, 50);
  text('— Beat Threshold', graphX + 160, graphY + 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  let col1TextX = 15;
  let col2TextX = canvasWidth / 2 + 15;

  text(`Sens: ${sens.toFixed(1)}x`, col1TextX, drawHeight + 20);
  text(`Decay: ${decay.toFixed(2)}`, col2TextX, drawHeight + 20);
  text(`BPM: ${bpm}`, col1TextX, drawHeight + 55);
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
