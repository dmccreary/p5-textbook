/**
 * MicroSim: Synthesizer Board
 * Description: A virtual synthesizer interface using p5.sound. Route a base oscillator through an ADSR envelope to generate notes.
 */
// CANVAS_HEIGHT: 500

let osc, env, fft;
let waveSelect;
let attackSlider, decaySlider, sustainSlider, releaseSlider;
let playBtn;

let isPlaying = false;
let audioStarted = false;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('main'));
  
  // Setup audio components
  osc = new p5.Oscillator('sine');
  env = new p5.Envelope();
  
  // setRange(attackLevel, releaseLevel)
  env.setRange(1.0, 0.0);
  
  osc.amp(env);
  osc.freq(261.63); // Middle C
  
  fft = new p5.FFT();
  
  // Setup UI Controls
  waveSelect = createSelect();
  waveSelect.option('sine');
  waveSelect.option('square');
  waveSelect.option('sawtooth');
  waveSelect.option('triangle');
  waveSelect.changed(() => {
    osc.setType(waveSelect.value());
  });
  
  attackSlider = createSlider(0, 2, 0.1, 0.01);
  decaySlider = createSlider(0, 1, 0.2, 0.01);
  sustainSlider = createSlider(0, 1, 0.5, 0.01);
  releaseSlider = createSlider(0, 3, 0.5, 0.01);
  
  playBtn = createButton('Hold to Play Note');
  
  // Handle mouse/touch events for sustained note
  playBtn.elt.addEventListener('mousedown', playSynth);
  playBtn.elt.addEventListener('mouseup', releaseSynth);
  playBtn.elt.addEventListener('mouseleave', releaseSynth);
  
  playBtn.elt.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    playSynth(); 
  });
  playBtn.elt.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    releaseSynth(); 
  });

  positionControls();
}

function positionControls() {
  let col1X = 30;
  let col2X = 200;
  let startY = 330;
  
  waveSelect.position(col1X, startY);
  
  playBtn.position(col1X, startY + 40);
  playBtn.size(120, 100);
  
  attackSlider.position(col2X, startY);
  decaySlider.position(col2X, startY + 40);
  sustainSlider.position(col2X, startY + 80);
  releaseSlider.position(col2X, startY + 120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionControls();
}

function playSynth() {
  if (!audioStarted) {
    userStartAudio();
    osc.start();
    audioStarted = true;
  }
  
  if (!isPlaying) {
    let a = attackSlider.value();
    let d = decaySlider.value();
    let s = sustainSlider.value();
    let r = releaseSlider.value();
    
    // setADSR(attackTime, decayTime, sustainRatio, releaseTime)
    env.setADSR(a, d, s, r);
    env.triggerAttack();
    isPlaying = true;
    
    playBtn.style('background-color', '#4CAF50');
    playBtn.style('color', 'white');
  }
}

function releaseSynth() {
  if (isPlaying) {
    env.triggerRelease();
    isPlaying = false;
    
    playBtn.style('background-color', '');
    playBtn.style('color', '');
  }
}

function draw() {
  background(30);
  
  drawWaveform();
  drawEnvelope();
  drawLabels();
}

function drawWaveform() {
  push();
  translate(0, 0);
  
  // Background box
  fill(40);
  stroke(100);
  rect(10, 10, width - 20, 140, 10);
  
  // Fetch waveform data
  let waveform = fft.waveform();
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  
  beginShape();
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 10, width - 10);
    // Smooth rendering
    let y = map(waveform[i], -1, 1, 140, 20);
    vertex(x, y);
  }
  endShape();
  
  // Title
  noStroke();
  fill(200);
  textSize(14);
  textAlign(LEFT, TOP);
  text("Oscilloscope (Real-time Waveform)", 20, 20);
  
  pop();
}

function drawEnvelope() {
  push();
  translate(0, 160);
  
  // Background box
  fill(40);
  stroke(100);
  rect(10, 0, width - 20, 140, 10);
  
  let a = attackSlider.value();
  let d = decaySlider.value();
  let s = sustainSlider.value();
  let r = releaseSlider.value();
  
  // Total max time to show = max attack (2) + max decay (1) + fake sustain (2) + max release (3) = 8 seconds
  let maxTime = 8;
  
  let startX = 40;
  let endX = width - 40;
  let baseWidth = endX - startX;
  
  let bottomY = 120;
  let topY = 20;
  let graphHeight = bottomY - topY;
  
  // Calculate node points
  let p0 = { x: startX, y: bottomY };
  let p1 = { x: startX + (a / maxTime) * baseWidth, y: topY };
  let p2 = { x: p1.x + (d / maxTime) * baseWidth, y: bottomY - (s * graphHeight) };
  let p3 = { x: p2.x + (2 / maxTime) * baseWidth, y: p2.y }; // Hold note for 2 seconds graphically
  let p4 = { x: p3.x + (r / maxTime) * baseWidth, y: bottomY };
  
  // Draw baseline
  stroke(60);
  strokeWeight(1);
  line(startX, bottomY, endX, bottomY);
  
  // Draw envelope shape
  noFill();
  stroke(0, 150, 255);
  strokeWeight(3);
  beginShape();
  vertex(p0.x, p0.y);
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape();
  
  // Draw nodes
  fill(255);
  noStroke();
  circle(p0.x, p0.y, 6);
  circle(p1.x, p1.y, 6);
  circle(p2.x, p2.y, 6);
  circle(p3.x, p3.y, 6);
  circle(p4.x, p4.y, 6);
  
  // Labels
  fill(200);
  textSize(14);
  textAlign(LEFT, TOP);
  text("ADSR Envelope Visualization", 20, 10);
  
  textSize(12);
  textAlign(CENTER, TOP);
  fill(150);
  
  if (p1.x > p0.x + 10) text("A", (p0.x + p1.x) / 2, bottomY + 5);
  if (p2.x > p1.x + 10) text("D", (p1.x + p2.x) / 2, bottomY + 5);
  text("Sustain", (p2.x + p3.x) / 2, bottomY + 5);
  if (p4.x > p3.x + 10) text("R", (p3.x + p4.x) / 2, bottomY + 5);
  
  pop();
}

function drawLabels() {
  push();
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  
  let col1X = 30;
  let col2X = 200;
  let startY = 330;
  
  let a = attackSlider.value().toFixed(2);
  let d = decaySlider.value().toFixed(2);
  let s = sustainSlider.value().toFixed(2);
  let r = releaseSlider.value().toFixed(2);
  
  // Display slider values
  text(`Attack: ${a}s`, col2X + 145, startY + 10);
  text(`Decay: ${d}s`, col2X + 145, startY + 50);
  text(`Sustain: ${s}`, col2X + 145, startY + 90);
  text(`Release: ${r}s`, col2X + 145, startY + 130);
  
  text("Oscillator Type", col1X, startY - 10);
  pop();
}
