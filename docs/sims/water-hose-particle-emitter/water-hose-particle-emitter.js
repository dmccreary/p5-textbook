/* Water Hose Particle Emitter MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/water-hose-particle-emitter/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let pressureSlider, angleSlider;
let particles = [];
let obstacleWall = { x: 220, y: 150, w: 20, h: 140 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  pressureSlider = createSlider(2, 10, 6, 0.5);
  angleSlider = createSlider(-60, 20, -25, 2);

  positionControls();
  describe('Water hose particle emitter with gravity and obstacle collision bounce.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  pressureSlider.position(col1L, drawHeight + 15);
  pressureSlider.size(w);

  angleSlider.position(col2L, drawHeight + 15);
  angleSlider.size(w);
}

function draw() {
  updateCanvasSize();

  let pressure = pressureSlider.value();
  let emitAngle = radians(angleSlider.value());
  let nozzlePos = createVector(40, 220);

  // Emit 3 particles per frame
  for (let i = 0; i < 3; i++) {
    let vel = p5.Vector.fromAngle(emitAngle + random(-0.08, 0.08));
    vel.mult(pressure + random(-0.5, 0.5));
    particles.push({
      pos: nozzlePos.copy(),
      vel: vel,
      life: 255
    });
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.vel.y += 0.15; // gravity
    p.pos.add(p.vel);
    p.life -= 3;

    // Bounce off obstacle wall
    if (p.pos.x > obstacleWall.x && p.pos.x < obstacleWall.x + obstacleWall.w &&
        p.pos.y > obstacleWall.y && p.pos.y < obstacleWall.y + obstacleWall.h) {
      p.vel.x *= -0.7;
      p.vel.y += random(-1, 1);
    }

    if (p.life <= 0 || p.pos.y > drawHeight) particles.splice(i, 1);
  }

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Water Hose Particle Emitter', canvasWidth / 2, 12);

  // Draw Obstacle Wall
  fill(120, 130, 150);
  stroke(80, 90, 110);
  strokeWeight(2);
  rect(obstacleWall.x, obstacleWall.y, obstacleWall.w, obstacleWall.h, 4);

  // Draw Hose Nozzle
  push();
  translate(nozzlePos.x, nozzlePos.y);
  rotate(emitAngle);
  fill(60, 160, 60);
  stroke(30, 100, 30);
  strokeWeight(2);
  rect(-15, -8, 30, 16, 3);
  pop();

  // Draw Water Particles
  noStroke();
  for (let p of particles) {
    fill(40, 140, 240, p.life);
    circle(p.pos.x, p.pos.y, map(p.life, 0, 255, 3, 8));
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Pressure: ${pressure}`, 15, drawHeight + 25);
  text(`Angle: ${angleSlider.value()}°`, canvasWidth / 2 + 15, drawHeight + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Water stream simulates ballistic trajectory under gravity and elastic wall impact.', canvasWidth / 2, drawHeight + 55);
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
