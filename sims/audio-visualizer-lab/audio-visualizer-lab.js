// P5 Audio Visualizer Lab MicroSim
// For a complete lession plan see:  https://dmccreary.github.io/p5-textbook/sims/audio-visualizer-lab/
// This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
// CANVAS_HEIGHT: 450

let drawHeight = 300;
let controlHeight = 150;
let canvasHeight = 450;
let canvasWidth = 600;

let mic, fft, osc;
let isAudioStarted = false;

let sourceSel, visSel, rangeSel;
let smoothSlider, threshSlider;
let synthT = 0;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // UI - Column 1
  let col1_x = 140;
  let label1_x = 130;
  
  sourceSel = createSelect();
  sourceSel.position(col1_x, drawHeight + 15);
  sourceSel.option('Microphone');
  sourceSel.option('Synth Oscillator');
  sourceSel.selected('Microphone');
  sourceSel.changed(setupSource);
  
  visSel = createSelect();
  visSel.position(col1_x, drawHeight + 50);
  visSel.option('Spectrum (FFT)');
  visSel.option('Waveform (Time Domain)');
  visSel.selected('Spectrum (FFT)');
  
  rangeSel = createSelect();
  rangeSel.position(col1_x, drawHeight + 85);
  rangeSel.option('All Frequencies');
  rangeSel.option('Bass (20-250 Hz)');
  rangeSel.option('Mid (250-4000 Hz)');
  rangeSel.option('Treble (4000+ Hz)');
  rangeSel.selected('All Frequencies');
  
  // UI - Column 2
  let col2_x = 410;
  let label2_x = 400;
  
  smoothSlider = createSlider(0, 0.99, 0.8, 0.01);
  smoothSlider.position(col2_x, drawHeight + 15);
  smoothSlider.style('width', '130px');
  
  threshSlider = createSlider(0, 255, 128, 1);
  threshSlider.position(col2_x, drawHeight + 50);
  threshSlider.style('width', '130px');
  
  fft = new p5.FFT();
}

function mousePressed() {
  if (!isAudioStarted && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < canvasHeight) {
    userStartAudio();
    isAudioStarted = true;
    setupSource();
  }
}

function setupSource() {
  if (!isAudioStarted) {
    userStartAudio();
    isAudioStarted = true;
  }
  
  if (sourceSel.value() === 'Microphone') {
    if (osc) osc.amp(0, 0.1);
    if (!mic) {
      mic = new p5.AudioIn();
      mic.start();
    } else {
      mic.start();
    }
    fft.setInput(mic);
  } else {
    if (mic) mic.stop();
    if (!osc) {
      osc = new p5.Oscillator('sawtooth');
      osc.start();
    }
    fft.setInput(osc);
  }
}

function updateSynth() {
  if (osc && sourceSel.value() === 'Synth Oscillator') {
    synthT += 0.02;
    // Sweep frequency back and forth
    let freq = map(sin(synthT * 0.5), -1, 1, 50, 1200);
    osc.freq(freq, 0.1);
    
    // Modulate amplitude for visual interest
    let amp = map(sin(synthT * 1.3), -1, 1, 0, 1.0);
    osc.amp(amp, 0.1);
  }
}

function draw() {
  background(30);
  
  // Control Panel Background
  fill(240);
  noStroke();
  rect(0, drawHeight, width, controlHeight);
  
  // UI Labels
  fill(0);
  textSize(14);
  textAlign(RIGHT, CENTER);
  
  text('Audio Source:', 130, drawHeight + 25);
  text('Visualization:', 130, drawHeight + 60);
  text('Highlight Range:', 130, drawHeight + 95);
  
  text('FFT Smoothing:', 400, drawHeight + 25);
  text('Threshold Level:', 400, drawHeight + 60);
  
  // Slider values
  textAlign(LEFT, CENTER);
  text(smoothSlider.value().toFixed(2), 550, drawHeight + 25);
  text(threshSlider.value(), 550, drawHeight + 60);
  
  // Start overlay
  if (!isAudioStarted) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Click Here to Start Audio', width / 2, drawHeight / 2);
    return; // Don't draw the visualizer yet
  }
  
  updateSynth();
  
  fft.smooth(smoothSlider.value());
  
  if (visSel.value() === 'Spectrum (FFT)') {
    drawSpectrum();
  } else {
    drawWaveform();
  }
  
  // Draw border around the drawing area
  noFill();
  stroke(100);
  strokeWeight(2);
  rect(0, 0, width, drawHeight);
}

function drawSpectrum() {
  let spectrum = fft.analyze(1024);
  let thresh = threshSlider.value();
  
  // Draw threshold line
  stroke(255, 50, 50);
  strokeWeight(2);
  let yThresh = map(thresh, 0, 255, drawHeight, 0);
  line(0, yThresh, width, yThresh);
  
  noStroke();
  fill(255, 50, 50);
  textAlign(LEFT, BOTTOM);
  text('Threshold', 5, yThresh - 5);
  
  noStroke();
  
  let nyquist = 22050; // standard approx for p5
  let minLog = log(1);
  let maxLog = log(1024);
  let range = rangeSel.value();
  
  for (let i = 1; i < spectrum.length; i++) {
    let freq = i * (nyquist / 1024);
    let amp = spectrum[i];
    let y = map(amp, 0, 255, drawHeight, 0);
    
    // Logarithmic X mapping for equal perceived visual width per octave
    let x = map(log(i), minLog, maxLog, 0, width);
    let nextX = map(log(i + 1), minLog, maxLog, 0, width);
    let bw = (nextX - x) + 0.5;
    
    let inRange = false;
    if (range === 'All Frequencies') inRange = true;
    else if (range.includes('Bass') && freq <= 250) inRange = true;
    else if (range.includes('Mid') && freq > 250 && freq <= 4000) inRange = true;
    else if (range.includes('Treble') && freq > 4000) inRange = true;
    
    if (inRange) {
      if (amp >= thresh) {
        fill(0, 255, 255); // Cyan if over threshold
      } else {
        fill(100, 200, 255); // Light blue
      }
    } else {
      fill(80); // Gray if out of range
    }
    
    rect(x, y, bw, drawHeight - y);
  }
}

function drawWaveform() {
  let waveform = fft.waveform();
  let thresh = threshSlider.value();
  let threshNorm = map(thresh, 0, 255, 0, 1);
  
  // Draw Threshold lines (top and bottom for waveform)
  stroke(255, 50, 50);
  strokeWeight(1);
  let yTop = map(threshNorm, -1, 1, drawHeight, 0);
  let yBot = map(-threshNorm, -1, 1, drawHeight, 0);
  line(0, yTop, width, yTop);
  line(0, yBot, width, yBot);
  
  noStroke();
  fill(255, 50, 50);
  textAlign(LEFT, BOTTOM);
  text('Threshold (+)', 5, yTop - 5);
  textAlign(LEFT, TOP);
  text('Threshold (-)', 5, yBot + 5);
  
  // Draw Waveform
  noFill();
  stroke(100, 200, 255);
  strokeWeight(2);
  
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, drawHeight, 0);
    vertex(x, y);
    
    // Highlight vertices that exceed threshold
    if (abs(waveform[i]) >= threshNorm) {
      push();
      stroke(0, 255, 255);
      strokeWeight(4);
      point(x, y);
      pop();
    }
  }
  endShape();
}
