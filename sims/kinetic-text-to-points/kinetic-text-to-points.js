/* Kinetic Text to Points MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/kinetic-text-to-points/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let textInput, scatterForceSlider;
let particles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textInput = createInput('CODE');
  textInput.input(rebuildParticles);

  scatterForceSlider = createSlider(20, 100, 50, 5);

  rebuildParticles();
  startBtn = createButton('Start Animation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Animation');
  });
  positionControls();
  describe('Kinetic typography particles responding to mouse hover with spring return physics.', FALLBACK);
}

function rebuildParticles() {
  particles = [];
  let txt = textInput.value().toUpperCase() || 'P5';
  let charW = Math.min((canvasWidth - 60) / txt.length, 70);
  let startX = (canvasWidth - charW * txt.length) / 2;

  // Generate synthetic point outlines for letters
  for (let c = 0; c < txt.length; c++) {
    let ox = startX + c * charW + charW / 2;
    let oy = drawHeight / 2 + 10;
    let ch = txt[c];

    // Create simple point shapes per letter
    for (let angle = 0; angle < TWO_PI; angle += 0.25) {
      let r = charW * 0.35;
      let tx = ox + cos(angle) * r;
      let ty = oy + sin(angle) * r;
      particles.push(new KineticParticle(tx, ty));
    }
  }
}

class KineticParticle {
  constructor(x, y) {
    this.target = createVector(x, y);
    this.pos = createVector(x + random(-50, 50), y + random(-50, 50));
    this.vel = createVector();
    this.acc = createVector();
  }

  update(forceRange) {
    let mouseV = createVector(mouseX, mouseY);
    let d = p5.Vector.dist(this.pos, mouseV);

    // Repulsion from mouse
    if (d < forceRange && mouseY < drawHeight) {
      let repulse = p5.Vector.sub(this.pos, mouseV);
      repulse.setMag(map(d, 0, forceRange, 5, 0));
      this.acc.add(repulse);
    }

    // Spring attraction back to home target
    let spring = p5.Vector.sub(this.target, this.pos);
    spring.mult(0.08); // spring stiffness
    this.acc.add(spring);

    this.vel.add(this.acc);
    this.vel.mult(0.85); // damping
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(40, 100, 220);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  textInput.position(col1L, drawHeight + 15);
  textInput.size(w);

  scatterForceSlider.position(col2L, drawHeight + 45);
  scatterForceSlider.size(w);
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
  text('Kinetic Text to Points', canvasWidth / 2, 12);

  let forceRange = scatterForceSlider.value();

  // Update and render particles
  for (let p of particles) {
    p.update(forceRange);
    p.show();
  }

  // Mouse repulsion circle guide
  if (mouseY < drawHeight) {
    noFill();
    stroke(220, 100, 100, 120);
    strokeWeight(1);
    circle(mouseX, mouseY, forceRange * 2);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Scatter Radius: ${forceRange}px`, canvasWidth / 2 + 15, drawHeight + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Hover mouse over letter points to scatter them; watch them spring back to home.', canvasWidth / 2, drawHeight + 60);
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
  rebuildParticles();
}
