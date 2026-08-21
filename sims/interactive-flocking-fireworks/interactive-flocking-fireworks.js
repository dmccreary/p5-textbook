/* Interactive Flocking Fireworks MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-flocking-fireworks/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let alignSlider, cohesionSlider, sepSlider;
let boids = [];
let fireworkParticles = [];
let isRunning = false;
let startBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  alignSlider = createSlider(0, 3, 1.2, 0.1);
  cohesionSlider = createSlider(0, 3, 1.0, 0.1);
  sepSlider = createSlider(0, 3, 1.5, 0.1);

  for (let i = 0; i < 40; i++) {
    boids.push(new Boid(random(canvasWidth), random(drawHeight)));
  }

  startBtn = createButton('Launch Fireworks');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Launch Fireworks');
  });
  positionControls();
  describe('Flocking boids with interactive fireworks on mouse click.', FALLBACK);
}

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 4));
    this.acc = createVector();
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  flock(boids, aW, cW, sW) {
    let alignment = createVector();
    let cohesion = createVector();
    let separation = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other !== this && d < 60) {
        alignment.add(other.vel);
        cohesion.add(other.pos);
        let diff = p5.Vector.sub(this.pos, other.pos).div(d * d);
        separation.add(diff);
        total++;
      }
    }

    if (total > 0) {
      alignment.div(total).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
      cohesion.div(total).sub(this.pos).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
      separation.div(total).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
    }

    this.acc.add(alignment.mult(aW));
    this.acc.add(cohesion.mult(cW));
    this.acc.add(separation.mult(sW));
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > canvasWidth) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = canvasWidth;
    if (this.pos.y > drawHeight) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = drawHeight;
  }

  show() {
    let theta = this.vel.heading() + radians(90);
    fill(40, 140, 240);
    stroke(255);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    triangle(0, -8, -5, 6, 5, 6);
    pop();
  }
}

function positionControls() {
  let col1L = 80;
  let col2L = canvasWidth / 2 + 80;
  let w = canvasWidth / 2 - 100;
  if (w < 50) w = 50;

  alignSlider.position(col1L, drawHeight + 10);
  alignSlider.size(w);

  cohesionSlider.position(col2L, drawHeight + 10);
  cohesionSlider.size(w);

  sepSlider.position(col1L, drawHeight + 45);
  sepSlider.size(w);
}

function mousePressed() {
  if (mouseY < drawHeight) {
    for (let i = 0; i < 30; i++) {
      fireworkParticles.push({
        pos: createVector(mouseX, mouseY),
        vel: p5.Vector.random2D().mult(random(2, 6)),
        life: 255,
        col: color(random(200, 255), random(100, 255), random(50, 150))
      });
    }
  }
}

function draw() {
  updateCanvasSize();

  // Dark twilight drawing background
  fill(20, 25, 45);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  let aW = alignSlider.value();
  let cW = cohesionSlider.value();
  let sW = sepSlider.value();

  // Update Boids
  for (let b of boids) {
    b.flock(boids, aW, cW, sW);
    b.update();
    b.show();
  }

  // Update Fireworks
  for (let i = fireworkParticles.length - 1; i >= 0; i--) {
    let p = fireworkParticles[i];
    p.pos.add(p.vel);
    p.vel.y += 0.08; // gravity
    p.life -= 6;
    fill(red(p.col), green(p.col), blue(p.col), p.life);
    noStroke();
    circle(p.pos.x, p.pos.y, 5);
    if (p.life <= 0) fireworkParticles.splice(i, 1);
  }

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Interactive Flocking Fireworks', canvasWidth / 2, 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Align: ${aW}`, 15, drawHeight + 20);
  text(`Cohesion: ${cW}`, canvasWidth / 2 + 15, drawHeight + 20);
  text(`Separation: ${sW}`, 15, drawHeight + 55);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Click on canvas to explode fireworks and disperse the flocking boids.', canvasWidth / 2 + 50, drawHeight + 55);
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
    startBtn = createButton('Launch Fireworks');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Launch Fireworks');
  });
  positionControls();
  }
}
