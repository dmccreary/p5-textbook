/* Orbital Mechanics Simulator MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/orbital-mechanics-simulator/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let massSlider, speedSlider, resetButton;
let planetPos, planetVel;
let isRunning = false;
let startBtn;
let orbitTrail = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  massSlider = createSlider(500, 3000, 1500, 100);
  speedSlider = createSlider(1.0, 5.0, 3.2, 0.1);

  resetButton = createButton('Reset Satellite');
  resetButton.mousePressed(resetSatellite);

  resetSatellite();
  positionControls();
  describe('Gravitational orbit simulation showing central sun and satellite trajectory.', FALLBACK);
}

function resetSatellite() {
  planetPos = createVector(canvasWidth / 2, 100);
  let v = speedSlider.value();
  planetVel = createVector(v, 0);
  orbitTrail = [];
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  massSlider.position(col1L, drawHeight + 10);
  massSlider.size(w);

  speedSlider.position(col2L, drawHeight + 10);
  speedSlider.size(w);

  resetButton.position(col1L, drawHeight + 45);
  resetButton.size(w);
}

function draw() {
  updateCanvasSize();

  // Central Sun Gravitational Physics
  let sunPos = createVector(canvasWidth / 2, drawHeight / 2);
  let sunMass = massSlider.value();

  let force = p5.Vector.sub(sunPos, planetPos);
  let distSq = constrain(force.magSq(), 400, 40000);
  let G = 1.0;
  let strength = (G * sunMass) / distSq;
  force.setMag(strength);

  planetVel.add(force);
  planetPos.add(planetVel);

  orbitTrail.push(planetPos.copy());
  if (orbitTrail.length > 250) orbitTrail.shift();

  // Dark Space drawing background
  fill(15, 20, 35);
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Orbital Mechanics Simulator', canvasWidth / 2, 12);

  // Draw Orbit Trail
  noFill();
  stroke(60, 140, 240, 150);
  strokeWeight(2);
  beginShape();
  for (let pt of orbitTrail) {
    vertex(pt.x, pt.y);
  }
  endShape();

  // Draw Central Sun
  fill(255, 180, 0);
  stroke(255, 220, 100);
  strokeWeight(3);
  circle(sunPos.x, sunPos.y, 36);

  // Draw Satellite
  fill(100, 200, 255);
  stroke(255);
  strokeWeight(2);
  circle(planetPos.x, planetPos.y, 14);

  // Velocity Vector Arrow
  stroke(240, 50, 50);
  strokeWeight(2);
  line(planetPos.x, planetPos.y, planetPos.x + planetVel.x * 12, planetPos.y + planetVel.y * 12);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Sun Mass: ${sunMass}`, 15, drawHeight + 20);
  text(`Init Speed: ${speedSlider.value()}`, canvasWidth / 2 + 15, drawHeight + 20);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Adjust initial velocity and mass to explore circular, elliptical, and escape orbits.', canvasWidth / 2 + 50, drawHeight + 55);
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
