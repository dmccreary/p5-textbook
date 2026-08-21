/* Water Hose Particle Emitter MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/water-hose-particle-emitter/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 105;
let canvasHeight = drawHeight + controlHeight;

let pressureSlider, angleSlider, startBtn;
let isRunning = false;
let particles = [];
let obstacleWall = { x: 220, y: 150, w: 20, h: 140 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startBtn = createButton('Start Simulation');
  startBtn.mousePressed(() => {
    isRunning = !isRunning;
    startBtn.html(isRunning ? 'Pause' : 'Start Simulation');
  });

  pressureSlider = createSlider(2, 10, 6, 0.5);
  angleSlider = createSlider(-60, 20, -25, 2);

  positionControls();
  describe('Water hose particle emitter with gravity and obstacle collision bounce.', FALLBACK);
}

function positionControls() {
  if (typeof pressureSlider === 'undefined' || !pressureSlider) return;
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  startBtn.position(col1L, drawHeight + 15);
  startBtn.size(w);

  pressureSlider.position(col2L, drawHeight + 15);
  pressureSlider.size(w);

  angleSlider.position(col2L, drawHeight + 50);
  angleSlider.size(w);
}

function draw() {
  updateCanvasSize();

  let pressure = pressureSlider.value();
  let emitAngle = radians(angleSlider.value());
  let nozzlePos = createVector(40, 220);

  if (isRunning) {
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

      if (p.life <= 0 || p.pos.y > drawHeight || p.pos.x > canvasWidth) {
        particles.splice(i, 1);
      }
    }
  }

  // Visual layout
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Water Hose Particle Emitter', canvasWidth / 2, 12);

  // Obstacle Wall
  fill(160, 170, 185);
  stroke(100, 110, 130);
  rect(obstacleWall.x, obstacleWall.y, obstacleWall.w, obstacleWall.h, 4);
  noStroke();
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Wall', obstacleWall.x + obstacleWall.w / 2, obstacleWall.y + obstacleWall.h / 2);

  // Draw Nozzle
  push();
  translate(nozzlePos.x, nozzlePos.y);
  rotate(emitAngle);
  fill(60, 70, 90);
  stroke(30);
  rect(-20, -10, 25, 20, 3);
  fill(40, 140, 220);
  rect(5, -6, 8, 12);
  pop();

  // Draw Particles
  noStroke();
  for (let p of particles) {
    fill(40, 140, 240, p.life);
    circle(p.pos.x, p.pos.y, map(p.life, 0, 255, 3, 10));
  }

  // Trajectory guideline when paused
  if (!isRunning && particles.length === 0) {
    stroke(80, 160, 240, 140);
    strokeWeight(2);
    let aimVec = p5.Vector.fromAngle(emitAngle).mult(60);
    line(nozzlePos.x, nozzlePos.y, nozzlePos.x + aimVec.x, nozzlePos.y + aimVec.y);
    noStroke();
    fill(100);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Click 'Start Simulation' to emit particles", canvasWidth / 2, drawHeight / 2 - 30);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill('black');
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  let col2L = canvasWidth / 2 + 15;
  text('Water Pressure: ' + pressure.toFixed(1), col2L, drawHeight + 5);
  text('Aim Angle: ' + angleSlider.value() + '°', col2L, drawHeight + 40);
  text('State: ' + (isRunning ? 'Running' : 'Paused') + ' (' + particles.length + ' particles)', 15, drawHeight + 55);
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
