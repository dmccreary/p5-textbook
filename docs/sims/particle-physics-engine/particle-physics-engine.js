/* Particle Physics Engine MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/particle-physics-engine/
*/
// CANVAS_HEIGHT: 550

let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;

let gravitySlider;
let massSlider;
let elasticitySlider;
let resetButton;
let startPauseButton;
let isRunning = false;

let joystick;
let particles = [];
let emitterPos;
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  gravitySlider = createSlider(-0.1, 0.5, 0.1, 0.01);
  massSlider = createSlider(1, 30, 10, 1);
  elasticitySlider = createSlider(0.1, 1.0, 0.7, 0.05);
  
  resetButton = createButton('Reset Emitter');
  resetButton.mousePressed(() => {
    particles = [];
  });
  
  startPauseButton = createButton('Start');
  startPauseButton.mousePressed(() => {
    if (isRunning) {
      isRunning = false;
      startPauseButton.html('Start');
    } else {
      isRunning = true;
      startPauseButton.html('Pause');
    }
  });
  
  joystick = new Joystick(0, 0, 50);
  updateCanvasSize();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  if (typeof positionControls === 'function') {
    positionControls();
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    let sliderX = canvasWidth / 2;
    
    if (gravitySlider) {
      gravitySlider.position(sliderX, drawHeight + 35);
      gravitySlider.size(canvasWidth/2 - 40);
      
      massSlider.position(sliderX, drawHeight + 75);
      massSlider.size(canvasWidth/2 - 40);
      
      elasticitySlider.position(sliderX, drawHeight + 115);
      elasticitySlider.size(canvasWidth/2 - 40);
      
      resetButton.position(sliderX, drawHeight + 155);
      
      startPauseButton.position(20, drawHeight + 35);
      
      joystick.pos.x = canvasWidth / 4;
      joystick.pos.y = drawHeight + 95;
    }
  }
}

function draw() {

  // Draw top physics area
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  // Draw control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Draw Title
  fill(0);
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Particle Physics Engine', canvasWidth / 2, 10);
  
  textSize(14);
  textStyle(ITALIC);
  fill(80);
  text('Change the parameters below to see how they impact the particle motion', canvasWidth / 2, 40);
  textStyle(NORMAL);
  
  emitterPos = createVector(canvasWidth / 2, 80);
  
  // Emit particle
  if (isRunning && frameCount % 3 === 0) {
    let initialVel = createVector(random(-1.5, 1.5), random(-3, -1));
    particles.push(new Particle(emitterPos.x, emitterPos.y, massSlider.value(), initialVel));
  }
  
  // Forces
  let gravity = createVector(0, gravitySlider.value());
  let wind = joystick.getVector();
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    
    if (isRunning) {
      // F = m * g (so a = g)
      let weight = p5.Vector.mult(gravity, p.mass);
      p.applyForce(weight);
      
      // Wind force (constant force, accelerates lighter objects more)
      p.applyForce(wind);
      
      p.update();
    }
    p.display();
    
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Draw emitter
  fill('black');
  noStroke();
  ellipse(emitterPos.x, emitterPos.y, 50, 20);
  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text("EMIT", emitterPos.x, emitterPos.y);
  
  // Update and draw controls
  joystick.update();
  joystick.display();
  
  // Draw Sliders Labels
  fill(0);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  let sliderX = canvasWidth / 2;
  text("Gravity", sliderX - 10, drawHeight + 45);
  text("Mass (New)", sliderX - 10, drawHeight + 85);
  text("Elasticity", sliderX - 10, drawHeight + 125);
  
  // Stats
  textAlign(LEFT, TOP);
  fill(100);
  text(`Active Particles: ${particles.length}`, 15, 15);
}

function mousePressed() {
  joystick.mousePressed();
}

function mouseReleased() {
  joystick.mouseReleased();
}

class Particle {
  constructor(x, y, m, v0) {
    this.pos = createVector(x, y);
    this.vel = v0.copy();
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 3 + 2; 
    this.rCol = random(50, 200);
    this.gCol = random(50, 200);
    this.bCol = random(150, 255);
    this.lifespan = 255;
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // clear acceleration each frame
    this.lifespan -= 0.8;
    
    // Bounds checking
    let bounce = elasticitySlider ? elasticitySlider.value() : 0.7;
    
    if (this.pos.y > drawHeight - this.r) {
      this.pos.y = drawHeight - this.r;
      this.vel.y *= -bounce; // restitution bounce
      this.vel.x *= 0.9;  // friction on ground
    }
    if (this.pos.x > canvasWidth - this.r) {
      this.pos.x = canvasWidth - this.r;
      this.vel.x *= -bounce;
    } else if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -bounce;
    }
  }
  
  display() {
    noStroke();
    fill(this.rCol, this.gCol, this.bCol, this.lifespan);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }
  
  isDead() {
    return this.lifespan < 0;
  }
}

class Joystick {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.offset = createVector(0, 0);
    this.dragging = false;
  }
  
  update() {
    if (this.dragging) {
      let mouse = createVector(mouseX, mouseY);
      let d = dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
      if (d > this.r) {
        let diff = p5.Vector.sub(mouse, this.pos);
        diff.setMag(this.r);
        this.offset = diff;
      } else {
        this.offset = p5.Vector.sub(mouse, this.pos);
      }
    }
  }
  
  getVector() {
    let v = this.offset.copy();
    // Scale down the visual offset to a reasonable force
    v.mult(0.005);
    return v;
  }
  
  display() {
    push();
    fill(245);
    stroke(180);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.r * 2);
    
    // Grid/Crosshairs
    stroke(210);
    strokeWeight(1);
    line(this.pos.x - this.r, this.pos.y, this.pos.x + this.r, this.pos.y);
    line(this.pos.x, this.pos.y - this.r, this.pos.x, this.pos.y + this.r);
    
    let knobX = this.pos.x + this.offset.x;
    let knobY = this.pos.y + this.offset.y;
    
    // Vector Arrow
    if (this.offset.magSq() > 1) {
      stroke(255, 100, 100);
      strokeWeight(2);
      line(this.pos.x, this.pos.y, knobX, knobY);
    }
    
    // Knob
    fill(220);
    stroke(120);
    strokeWeight(1);
    circle(knobX, knobY, 20);
    pop();
    
    // Label
    push();
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text("Wind Force", this.pos.x, this.pos.y + this.r + 10);
    pop();
  }
  
  mousePressed() {
    let knobX = this.pos.x + this.offset.x;
    let knobY = this.pos.y + this.offset.y;
    if (dist(mouseX, mouseY, knobX, knobY) < 20) {
      this.dragging = true;
    }
  }
  
  mouseReleased() {
    this.dragging = false;
  }
}
