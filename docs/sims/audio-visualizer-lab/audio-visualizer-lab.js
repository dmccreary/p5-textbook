// P5 Audio Visualizer Lab MicroSim
// For a complete lession plan see:  https://dmccreary.github.io/p5-textbook/sims/audio-visualizer-lab/
// This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
// CANVAS_HEIGHT: 480

let drawHeight = 300;
let controlHeight = 180;
let canvasHeight = 480;
let canvasWidth = window.innerWidth || 600;

let mic, fft, osc;
let isAudioStarted = false;
let isPaused = true;
let startPauseBtn;

let sourceSel, visSel, rangeSel;
let smoothSlider, threshSlider;
let synthT = 0;

function setup() {
    let canvas = createCanvas(windowWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  sourceSel = createSelect();
  sourceSel.option('Microphone');
  sourceSel.option('Synth Oscillator');
  sourceSel.selected('Microphone');
  sourceSel.changed(setupSource);
  
  visSel = createSelect();
  visSel.option('Spectrum (FFT)');
  visSel.option('Waveform (Time Domain)');
  visSel.selected('Spectrum (FFT)');
  
  rangeSel = createSelect();
  rangeSel.option('All Frequencies');
  rangeSel.option('Bass (20-250 Hz)');
  rangeSel.option('Mid (250-4000 Hz)');
  rangeSel.option('Treble (4000+ Hz)');
  rangeSel.selected('All Frequencies');
  
  smoothSlider = createSlider(0, 0.99, 0.8, 0.01);
  smoothSlider.style('width', '130px');
  
  threshSlider = createSlider(0, 255, 128, 1);
  threshSlider.style('width', '130px');
  
  startPauseBtn = createButton('Start');
  startPauseBtn.mousePressed(togglePlay);
  
  updateUIPositions();
  
  fft = new p5.FFT();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < canvasHeight) {
    if (!isAudioStarted) {
      togglePlay();
    }
  }
}

function togglePlay() {
  if (isPaused) {
    if (!isAudioStarted) {
      userStartAudio();
      isAudioStarted = true;
    }
    isPaused = false;
    startPauseBtn.html('Pause');
    setupSource();
  } else {
    isPaused = true;
    startPauseBtn.html('Start');
    if (mic) mic.stop();
    if (osc) osc.stop();
  }
}

function setupSource() {
  if (!isAudioStarted) return;
  
  if (sourceSel.value() === 'Microphone') {
    if (osc) osc.amp(0, 0.1);
    if (!mic) {
      mic = new p5.AudioIn();
    }
    if (!isPaused) mic.start();
    fft.setInput(mic);
  } else {
    if (mic) mic.stop();
    if (!osc) {
      osc = new p5.Oscillator('sawtooth');
    }
    if (!isPaused) osc.start();
    fft.setInput(osc);
  }
}

function updateSynth() {
  if (osc && sourceSel.value() === 'Synth Oscillator') {
    if (!isPaused) {
      synthT += 0.02;
      // Sweep frequency back and forth
      let freq = map(sin(synthT * 0.5), -1, 1, 50, 1200);
      osc.freq(freq, 0.1);
      
      // Modulate amplitude for visual interest
      let amp = map(sin(synthT * 1.3), -1, 1, 0, 1.0);
      osc.amp(amp, 0.1);
    } else {
      osc.amp(0, 0.1);
    }
  }
}

function draw() {
  background(30);


  push();
  fill(255);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Audio Visualizer Lab", width / 2, 10);
  pop();

  
  // Control Panel Background
  fill(255);
  noStroke();
  rect(0, drawHeight, width, controlHeight);
  
  // UI Labels
  fill(0);
  textSize(14);
  textAlign(RIGHT, CENTER);
  
  let label1_x = min(130, width * 0.25 - 10);
  let label2_x = min(430, width * 0.65 + 20);
  text('Audio Source:', label1_x, drawHeight + 25);
  text('Visualization:', label1_x, drawHeight + 60);
  text('Highlight Range:', label1_x, drawHeight + 95);
  
  text('FFT Smoothing:', label2_x, drawHeight + 25);
  text('Threshold Level:', label2_x, drawHeight + 60);
  
  // Slider values
  textAlign(LEFT, CENTER);
  text(smoothSlider.value().toFixed(2), min(580, width * 0.65 + 170), drawHeight + 25);
  text(threshSlider.value(), min(580, width * 0.65 + 170), drawHeight + 60);
  
  // Start overlay
  if (!isAudioStarted || isPaused) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    if (!isAudioStarted) {
      text('Click Here or Press Start to Begin Audio Processing', width / 2, drawHeight / 2);
    } else {
      text('Press Start to Resume Audio Processing', width / 2, drawHeight / 2);
    }
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

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
  updateUIPositions();
}

function updateUIPositions() {
  let col1_x = min(140, width * 0.25);
  let col2_x = min(440, width * 0.65 + 30);
  
  sourceSel.position(col1_x, drawHeight + 15);
  visSel.position(col1_x, drawHeight + 50);
  rangeSel.position(col1_x, drawHeight + 85);
  
  smoothSlider.position(col2_x, drawHeight + 15);
  threshSlider.position(col2_x, drawHeight + 50);
  
  startPauseBtn.position(40, drawHeight + 130);
}
