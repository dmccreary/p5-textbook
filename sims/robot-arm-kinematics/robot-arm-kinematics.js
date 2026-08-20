/* Robot Arm Kinematics MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/robot-arm-kinematics/
*/
// CANVAS_HEIGHT: 600

let canvasWidth = 800; // will be updated based on container
let drawHeight = 350;
let controlHeight = 250;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 160;

let baseXSlider, baseYSlider, j1Slider, j2Slider, scaleSlider;
let axesCheckbox, pushPopCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  baseXSlider = createSlider(0, 1000, canvasWidth / 2, 1);
  baseYSlider = createSlider(0, 1000, drawHeight / 2 + 50, 1);
  j1Slider = createSlider(-180, 180, -45, 1);
  j2Slider = createSlider(-180, 180, 90, 1);
  scaleSlider = createSlider(0.5, 2.0, 1.0, 0.1);
  
  axesCheckbox = createCheckbox('Show Local Axes', true);
  pushPopCheckbox = createCheckbox('Use Push/Pop', true);

  positionControls();
  
  describe('Interactive multi-segment robotic arm demonstrating 2D matrix transformations (translate, rotate, scale) and the matrix stack (push/pop).', FALLBACK);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (canvasWidth < 300) canvasWidth = 800; // fallback
  }
}

function positionControls() {
  let yStart = drawHeight + 15;
  let spacing = 35;
  
  let sliderWidth = canvasWidth - sliderLeftMargin - margin;
  if (sliderWidth < 100) sliderWidth = 100;

  let controls = [baseXSlider, baseYSlider, j1Slider, j2Slider, scaleSlider];
  controls.forEach((slider, index) => {
    slider.position(sliderLeftMargin, yStart + spacing * index);
    slider.size(sliderWidth);
  });

  axesCheckbox.position(margin, yStart + spacing * 5);
  pushPopCheckbox.position(margin + 160, yStart + spacing * 5);
}

function draw() {
  background('#F0F8FF'); // sky blue background for draw area
  
  // draw control panel area background
  fill('white');
  noStroke();
  rectMode(CORNER);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // draw top border for control panel
  stroke(200);
  strokeWeight(2);
  line(0, drawHeight, canvasWidth, drawHeight);

  // draw labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  textStyle(NORMAL);
  
  let yStart = drawHeight + 25;
  let spacing = 35;
  
  text(`Base X: ${baseXSlider.value()}px`, margin, yStart);
  text(`Base Y: ${baseYSlider.value()}px`, margin, yStart + spacing);
  text(`Joint 1 Angle: ${j1Slider.value()}°`, margin, yStart + spacing*2);
  text(`Joint 2 Angle: ${j2Slider.value()}°`, margin, yStart + spacing*3);
  text(`Scale: ${scaleSlider.value().toFixed(1)}x`, margin, yStart + spacing*4);
  
  drawBackgroundGrid();

  // Draw title
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  textStyle(NORMAL);
  text('Robot Arm Kinematics', canvasWidth/2, 10);

  // Draw a "fixed" target on the background (unaffected by arm transformations)
  fill('rgba(0, 150, 255, 0.2)');
  stroke('rgba(0, 150, 255, 0.5)');
  strokeWeight(2);
  circle(canvasWidth * 0.75, drawHeight * 0.25, 40);
  noStroke();
  fill(100);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Target", canvasWidth * 0.75, drawHeight * 0.25 - 30);
  
  // -----------------------------------------------------
  // THE ROBOT ARM
  // -----------------------------------------------------
  if (pushPopCheckbox.checked()) {
    push();
  }

  // 1. Base Translation
  translate(baseXSlider.value(), baseYSlider.value());
  
  // 2. Base Scale
  scale(scaleSlider.value());

  if (axesCheckbox.checked()) drawAxes('Base');

  // Draw Base mount
  fill('#4A5568'); // dark slate
  rectMode(CENTER);
  stroke(50);
  strokeWeight(1);
  rect(0, 0, 40, 40, 5);

  // 3. Joint 1 Rotation
  rotate(radians(j1Slider.value()));
  
  // Draw Joint 1 segment
  fill('#A0AEC0'); // lighter slate
  rectMode(CORNER);
  rect(-15, -15, 120, 30, 15);
  
  // Draw Joint 1 pin
  fill('#2D3748');
  circle(0, 0, 20);

  // Translate to end of Segment 1
  translate(100, 0); // length = 100
  
  if (axesCheckbox.checked()) drawAxes('Joint 1');

  // 4. Joint 2 Rotation
  rotate(radians(j2Slider.value()));

  // Draw Joint 2 segment
  fill('#CBD5E0'); 
  rectMode(CORNER);
  rect(-12, -12, 90, 24, 12);
  
  // Draw Joint 2 pin
  fill('#2D3748');
  circle(0, 0, 16);

  // Translate to end of Segment 2 (End Effector)
  translate(75, 0); // length = 75
  
  if (axesCheckbox.checked()) drawAxes('Joint 2');

  // Draw End Effector (Gripper)
  fill('#718096');
  rectMode(CENTER);
  rect(10, 0, 20, 40, 3); // Gripper base
  fill('#4A5568');
  rect(25, -18, 30, 6, 2); // Top finger
  rect(25, 18, 30, 6, 2);  // Bottom finger

  if (pushPopCheckbox.checked()) {
    pop();
  }
  
  // -----------------------------------------------------
  // DRAW FIXED BOX AFTER ARM
  // -----------------------------------------------------
  // If push/pop is OFF, this shape will inherit all transformations!
  fill(255, 100, 100, 220);
  stroke(200, 0, 0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(60, 60, 80, 40, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Static Box", 60, 60);

  if (!pushPopCheckbox.checked()) {
    fill(200, 0, 0);
    textSize(12);
    text("Oh no! Matrix leaked!", 60, 90);
  } else {
    fill(100);
    textSize(12);
    text("Safe & Global", 60, 90);
  }
}

function drawBackgroundGrid() {
  stroke(200, 200, 200, 100);
  strokeWeight(1);
  for (let x = 0; x <= canvasWidth; x += 50) {
    line(x, 0, x, drawHeight);
  }
  for (let y = 0; y <= drawHeight; y += 50) {
    line(0, y, canvasWidth, y);
  }
}

function drawAxes(labelTxt) {
  push();
  strokeWeight(3);
  
  // X Axis (Red)
  stroke(220, 50, 50);
  line(0, 0, 60, 0);
  fill(220, 50, 50);
  noStroke();
  triangle(60, -5, 60, 5, 70, 0);
  
  // Y Axis (Green)
  stroke(50, 200, 50);
  line(0, 0, 0, 60);
  fill(50, 200, 50);
  noStroke();
  triangle(-5, 60, 5, 60, 0, 70);

  // Label
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(labelTxt, 5, 5);
  pop();
}
