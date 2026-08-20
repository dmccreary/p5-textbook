// P5 Kinetic Typography Engine MicroSim
// For a complete lesson plan see: https://dmccreary.github.io/p5-textbook/sims/kinetic-typography-engine/
// This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
// CANVAS_HEIGHT: 550

let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let labelWidth = 120;

let textInput, fontSelect, densitySlider, wobbleSlider, explodeBtn;
let fonts = {};
let particles = [];
let currentText = "KINETIC";
let currentDensity = 0.15;
let currentFontName = "Roboto Bold";
let explosionTimeout;

class Particle {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isExploding = false;
    this.color = color(random(50, 100), random(100, 200), random(150, 255));
  }
  
  update(wobble) {
    if (this.isExploding) {
      this.x += this.vx;
      this.y += this.vy;
      // Add slight drag
      this.vx *= 0.95;
      this.vy *= 0.95;
    } else {
      let targetX = this.baseX;
      let targetY = this.baseY;
      
      if (wobble > 0) {
        targetX += random(-wobble, wobble);
        targetY += random(-wobble, wobble);
      }
      
      // Smoothly move to target
      this.x = lerp(this.x, targetX, 0.15);
      this.y = lerp(this.y, targetY, 0.15);
    }
  }
  
  show() {
    fill(this.color);
    circle(this.x, this.y, 4);
  }
  
  explode() {
    this.isExploding = true;
    let angle = random(TWO_PI);
    let speed = random(5, 20);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
  }
}

function preload() {
  fonts['Roboto Bold'] = loadFont('Roboto-Bold.ttf');
  fonts['Roboto Italic'] = loadFont('Roboto-Italic.ttf');
  fonts['Roboto Black'] = loadFont('Roboto-Black.ttf');
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Row 1: Text Input
  textInput = createInput(currentText);
  textInput.position(labelWidth + margin, drawHeight + 15);
  textInput.input(() => {
    currentText = textInput.value();
    generateParticles();
  });
  
  // Row 2: Font Selection
  fontSelect = createSelect();
  fontSelect.position(labelWidth + margin, drawHeight + 50);
  fontSelect.option('Roboto Bold');
  fontSelect.option('Roboto Italic');
  fontSelect.option('Roboto Black');
  fontSelect.changed(() => {
    currentFontName = fontSelect.value();
    generateParticles();
  });
  
  // Row 3: Point Density Slider
  densitySlider = createSlider(0.02, 0.4, currentDensity, 0.01);
  densitySlider.position(labelWidth + margin, drawHeight + 85);
  densitySlider.input(() => {
    currentDensity = densitySlider.value();
    generateParticles();
  });
  
  // Row 4: Wobble Intensity
  wobbleSlider = createSlider(0, 30, 0, 1);
  wobbleSlider.position(labelWidth + margin, drawHeight + 120);
  
  // Row 5: Explode Button
  explodeBtn = createButton('Explode Particles');
  explodeBtn.position(labelWidth + margin, drawHeight + 155);
  explodeBtn.mousePressed(explodeParticles);
  
  generateParticles();
}

function draw() {
  updateCanvasSize();
  
  background(255); // Draw area background
  
  // Draw Control Area background
  fill(245);
  stroke(220);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Draw Control Labels
  fill(50);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Text Input:', margin, drawHeight + 25);
  text('Font Style:', margin, drawHeight + 60);
  text('Point Density: ' + densitySlider.value().toFixed(2), margin, drawHeight + 95);
  text('Wobble Force: ' + wobbleSlider.value(), margin, drawHeight + 130);
  
  // Title
  fill(0);
  textAlign(CENTER, TOP);
  textSize(24);
  textStyle(BOLD);
  text('Kinetic Typography Engine', canvasWidth / 2, 15);
  textStyle(NORMAL);
  
  // Render Particles
  push();
  
  // Calculate bounding box to center text on canvas
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  if (particles.length > 0) {
    for (let p of particles) {
      if (p.baseX < minX) minX = p.baseX;
      if (p.baseX > maxX) maxX = p.baseX;
      if (p.baseY < minY) minY = p.baseY;
      if (p.baseY > maxY) maxY = p.baseY;
    }
    let tw = maxX - minX;
    let th = maxY - minY;
    let cx = canvasWidth / 2 - tw / 2 - minX;
    // Center vertically in the draw area (accounting for title)
    let cy = (drawHeight + 40) / 2 - th / 2 - minY;
    translate(cx, cy);
  }
  
  let wobble = wobbleSlider.value();
  noStroke();
  for (let p of particles) {
    p.update(wobble);
    p.show();
  }
  pop();
  
  // Info overlay
  fill(255, 255, 255, 200);
  stroke(200);
  rect(10, 50, 140, 30, 5);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(`Total Points: ${particles.length}`, 20, 65);
}

function generateParticles() {
  let txt = currentText;
  if (txt.trim() === '') txt = ' ';
  let font = fonts[currentFontName];
  
  // textToPoints(txt, x, y, fontSize, options)
  let pts = font.textToPoints(txt, 0, 0, 100, {
    sampleFactor: currentDensity,
    simplifyThreshold: 0
  });
  
  // Match new points with old points to preserve colors and prevent jumpiness if possible
  // For simplicity and cool effect, just create a new array. 
  // It gives a nice visual refresh.
  particles = [];
  for (let pt of pts) {
    particles.push(new Particle(pt.x, pt.y));
  }
}

function explodeParticles() {
  for (let p of particles) {
    p.explode();
  }
  
  if (explosionTimeout) clearTimeout(explosionTimeout);
  
  // Automatically restore after 2 seconds
  explosionTimeout = setTimeout(() => {
    for (let p of particles) {
      p.isExploding = false;
    }
  }, 2000);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    let maxInputWidth = canvasWidth - labelWidth - margin * 3;
    if (maxInputWidth < 100) maxInputWidth = 100;
    
    if (typeof textInput !== 'undefined') {
      textInput.size(maxInputWidth);
      fontSelect.size(maxInputWidth);
      densitySlider.size(maxInputWidth);
      wobbleSlider.size(maxInputWidth);
      explodeBtn.size(maxInputWidth);
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
