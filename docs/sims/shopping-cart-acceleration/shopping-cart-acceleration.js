/* Shopping Cart Acceleration MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/shopping-cart-acceleration/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let massSlider, frictionSlider;
let cartPos, cartVel, cartAcc;
let isDraggingForce = false;
let forceStart, forceCurrent;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  massSlider = createSlider(1, 10, 3, 1);
  frictionSlider = createSlider(0.9, 0.99, 0.96, 0.01);

  cartPos = createVector(canvasWidth / 2, drawHeight / 2);
  cartVel = createVector(0, 0);
  cartAcc = createVector(0, 0);

  positionControls();
  describe('Interactive physics simulation applying force vectors to a shopping cart.', FALLBACK);
}

function positionControls() {
  let col1L = 90;
  let col2L = canvasWidth / 2 + 90;
  let w = canvasWidth / 2 - 110;
  if (w < 50) w = 50;

  massSlider.position(col1L, drawHeight + 15);
  massSlider.size(w);

  frictionSlider.position(col2L, drawHeight + 15);
  frictionSlider.size(w);
}

function draw() {
  updateCanvasSize();

  let mass = massSlider.value();
  let friction = frictionSlider.value();

  // Physics update: F = m * a => a = F / m
  cartVel.add(cartAcc);
  cartVel.mult(friction);
  cartPos.add(cartVel);
  cartAcc.mult(0); // reset acceleration

  // Boundary bounce
  if (cartPos.x > canvasWidth - 30) { cartPos.x = canvasWidth - 30; cartVel.x *= -0.8; }
  if (cartPos.x < 30) { cartPos.x = 30; cartVel.x *= -0.8; }
  if (cartPos.y > drawHeight - 30) { cartPos.y = drawHeight - 30; cartVel.y *= -0.8; }
  if (cartPos.y < 50) { cartPos.y = 50; cartVel.y *= -0.8; }

  // Drawing Region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Shopping Cart Acceleration (F = ma)', canvasWidth / 2, 12);

  // Draw Force Drag Arrow
  if (isDraggingForce) {
    stroke(220, 50, 50);
    strokeWeight(3);
    line(cartPos.x, cartPos.y, mouseX, mouseY);
    fill(220, 50, 50);
    noStroke();
    circle(mouseX, mouseY, 8);

    let forceMag = dist(cartPos.x, cartPos.y, mouseX, mouseY);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(`Force: ${Math.round(forceMag)} N`, (cartPos.x + mouseX) / 2, (cartPos.y + mouseY) / 2 - 6);
  }

  // Draw Shopping Cart Body (Top-down view)
  push();
  translate(cartPos.x, cartPos.y);

  fill(220, 230, 240);
  stroke(60, 80, 100);
  strokeWeight(2);
  rect(-25, -20, 50, 40, 6);

  // Wheels
  fill(40);
  noStroke();
  rect(-28, -24, 8, 5);
  rect(20, -24, 8, 5);
  rect(-28, 19, 8, 5);
  rect(20, 19, 8, 5);

  // Cart Grid Wire
  stroke(140);
  strokeWeight(1);
  line(-15, -18, -15, 18);
  line(0, -18, 0, 18);
  line(15, -18, 15, 18);

  pop();

  // Velocity Vector Arrow (Green)
  if (cartVel.mag() > 0.1) {
    stroke(40, 180, 60);
    strokeWeight(3);
    line(cartPos.x, cartPos.y, cartPos.x + cartVel.x * 8, cartPos.y + cartVel.y * 8);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Mass: ${mass} kg`, 15, drawHeight + 25);
  text(`Friction: ${friction.toFixed(2)}`, canvasWidth / 2 + 15, drawHeight + 25);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Click and drag from the cart to apply a continuous force vector.', canvasWidth / 2, drawHeight + 55);
}

function mousePressed() {
  if (mouseY < drawHeight && dist(mouseX, mouseY, cartPos.x, cartPos.y) < 40) {
    isDraggingForce = true;
  }
}

function mouseDragged() {
  if (isDraggingForce) {
    let force = createVector(mouseX - cartPos.x, mouseY - cartPos.y);
    let mass = massSlider.value();
    force.mult(0.04 / mass); // a = F / m
    cartAcc.add(force);
  }
}

function mouseReleased() {
  isDraggingForce = false;
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
