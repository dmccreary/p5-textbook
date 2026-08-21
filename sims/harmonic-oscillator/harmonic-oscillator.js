/* Harmonic Oscillator MicroSim */
// CANVAS_HEIGHT: 450

let canvasWidth = 400;
let drawHeight = 270;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 120;

let ampSlider, freqSlider, phaseSlider, viewSelect, modeSelect;
let ampLabelDiv, freqLabelDiv, phaseLabelDiv;
let baseTime = 0;
const dashPattern = [5, 5];
const solidPattern = [];

function setup() {
  updateCanvasSize();
  pixelDensity(1.5);
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Static Title DOM Elements (avoids Canvas font cache invalidations)
  let title = createDiv('Harmonic Oscillator');
  title.position(0, 10);
  title.style('width', canvasWidth + 'px');
  title.style('text-align', 'center');
  title.style('font-size', '22px');
  title.style('font-family', 'sans-serif');
  title.style('font-weight', 'bold');
  
  let subtitle = createDiv('map polar rotations to a sine wave');
  subtitle.position(0, 38);
  subtitle.style('width', canvasWidth + 'px');
  subtitle.style('text-align', 'center');
  subtitle.style('font-size', '12px');
  subtitle.style('font-style', 'italic');
  subtitle.style('font-family', 'sans-serif');
  subtitle.style('color', '#505050');

  // Static Labels
  let vLabel = createDiv('View Mode:');
  vLabel.position(10, drawHeight + 115);
  vLabel.style('font-family', 'sans-serif');
  vLabel.style('font-size', '14px');

  let mLabel = createDiv('Angle Mode:');
  mLabel.position(10, drawHeight + 150);
  mLabel.style('font-family', 'sans-serif');
  mLabel.style('font-size', '14px');

  // Dynamic Labels
  ampLabelDiv = createDiv('Amplitude: 60');
  ampLabelDiv.position(10, drawHeight + 10);
  ampLabelDiv.style('font-family', 'sans-serif');
  ampLabelDiv.style('font-size', '14px');

  freqLabelDiv = createDiv('Frequency: 1.0x');
  freqLabelDiv.position(10, drawHeight + 45);
  freqLabelDiv.style('font-family', 'sans-serif');
  freqLabelDiv.style('font-size', '14px');

  phaseLabelDiv = createDiv('Phase Offset: 0°');
  phaseLabelDiv.position(10, drawHeight + 80);
  phaseLabelDiv.style('font-family', 'sans-serif');
  phaseLabelDiv.style('font-size', '14px');

  // Controls
  ampSlider = createSlider(10, 100, 60, 1);
  ampSlider.position(sliderLeftMargin, drawHeight + 10);
  ampSlider.input(updateLabels);

  freqSlider = createSlider(0.1, 3, 1, 0.1);
  freqSlider.position(sliderLeftMargin, drawHeight + 45);
  freqSlider.input(updateLabels);

  phaseSlider = createSlider(0, 1, 0, 0.01);
  phaseSlider.position(sliderLeftMargin, drawHeight + 80);
  phaseSlider.input(updateLabels);

  viewSelect = createSelect();
  viewSelect.position(sliderLeftMargin, drawHeight + 115);
  viewSelect.option('Both');
  viewSelect.option('Polar Only');
  viewSelect.option('Cartesian Only');

  modeSelect = createSelect();
  modeSelect.position(sliderLeftMargin, drawHeight + 150);
  modeSelect.option('Degrees');
  modeSelect.option('Radians');
  modeSelect.input(updateLabels);

  describe('Interactive harmonic oscillator mapping polar to Cartesian coordinates.', FALLBACK);
  
  updateLabels();
}

function updateLabels() {
  let amp = ampSlider.value();
  let freq = freqSlider.value();
  let phaseNormalized = phaseSlider.value();
  let currentMode = modeSelect.value();
  
  ampLabelDiv.html('Amplitude: ' + amp);
  freqLabelDiv.html('Frequency: ' + freq.toFixed(1) + 'x');
  
  if (currentMode === 'Degrees') {
      phaseLabelDiv.html('Phase Offset: ' + Math.round(phaseNormalized * 360) + '°');
  } else {
      phaseLabelDiv.html('Phase Offset: ' + (phaseNormalized * 2).toFixed(2) + 'π');
  }
}

function draw() {
  let currentMode = modeSelect.value();
  if (currentMode === 'Degrees') {
      angleMode(DEGREES);
  } else {
      angleMode(RADIANS);
  }

  // Background areas
  background(250);


  push();
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Harmonic Oscillator", width / 2, 10);
  pop();

  
  fill(255);
  stroke(192);
  rect(0, drawHeight, canvasWidth, controlHeight);

  let amp = ampSlider.value();
  let freq = freqSlider.value();
  
  baseTime += freq * 0.035;
  
  let phaseNormalized = phaseSlider.value();
  let phase = 0;
  
  if (currentMode === 'Degrees') {
      phase = phaseNormalized * 360;
  } else {
      phase = phaseNormalized * TWO_PI;
  }
  
  let theta = 0;
  if (currentMode === 'Degrees') {
      theta = (baseTime * 180 / PI) + phase;
  } else {
      theta = baseTime + phase;
  }

  let showPolar = viewSelect.value() !== 'Cartesian Only';
  let showCartesian = viewSelect.value() !== 'Polar Only';

  let cx = canvasWidth * 0.25;
  let cy = drawHeight / 2 + 10;
  let sx = canvasWidth * 0.45;
  
  if (!showPolar) {
      sx = canvasWidth * 0.1;
  }
  if (!showCartesian) {
      cx = canvasWidth * 0.5;
  }

  let px = cx + amp * cos(theta);
  let py = cy - amp * sin(theta);

  // Draw Polar View
  if (showPolar) {
      stroke(220);
      strokeWeight(1);
      line(cx - 110, cy, cx + 110, cy);
      line(cx, cy - 110, cx, cy + 110);
      
      noFill();
      stroke(150);
      strokeWeight(2);
      circle(cx, cy, amp * 2);
      
      stroke(100);
      line(cx, cy, px, py);
      
      fill(255, 0, 0);
      noStroke();
      circle(px, py, 12);
  }

  // Draw Cartesian View
  if (showCartesian) {
      if (showPolar) {
          stroke(255, 0, 0, 100);
          strokeWeight(2);
          drawingContext.setLineDash(dashPattern);
          line(px, py, sx, py);
          drawingContext.setLineDash(solidPattern);
      }
      
      stroke(220);
      strokeWeight(1);
      line(sx, cy, canvasWidth - margin, cy);
      
      noFill();
      stroke(0, 0, 255);
      strokeWeight(2);
      beginShape();
      let baseSpatialFreq = 0.026;
      let spatialFreq = currentMode === 'Degrees' ? baseSpatialFreq * (180 / PI) : baseSpatialFreq;
      
      for (let x = sx; x <= canvasWidth - margin; x++) {
          let delay = (x - sx) * spatialFreq * freq;
          let angle = theta - delay;
          let y = cy - amp * sin(angle);
          vertex(x, y);
      }
      endShape();
      
      fill(0, 0, 255);
      noStroke();
      circle(sx, py, 12);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (typeof ampSlider !== 'undefined') {
      let slWidth = canvasWidth - sliderLeftMargin - margin;
      ampSlider.size(slWidth);
      freqSlider.size(slWidth);
      phaseSlider.size(slWidth);
      viewSelect.size(slWidth);
      modeSelect.size(slWidth);
    }
  }
}
