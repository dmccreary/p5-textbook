// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150; // 4 rows * 35 + 10
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let setupCount = 0;
let drawCount = 0;

let fpsSlider, bgColorPicker, widthSlider, heightSlider;
let ptX = 150, ptY = 150;
let isDragging = false;
let mouseOverCanvas = false;

function setup() {
  setupCount++;
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Track mouse enter/leave for animation control
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  // Row 1
  fpsSlider = createSlider(1, 60, 30, 1);
  fpsSlider.position(sliderLeftMargin, drawHeight + 5);

  // Row 2
  bgColorPicker = createColorPicker('#F0F8FF'); // aliceblue
  bgColorPicker.position(sliderLeftMargin, drawHeight + 40);

  // Row 3
  widthSlider = createSlider(100, 600, 300, 10);
  widthSlider.position(sliderLeftMargin, drawHeight + 75);

  // Row 4
  heightSlider = createSlider(100, 350, 250, 10);
  heightSlider.position(sliderLeftMargin, drawHeight + 110);

  describe('Interactive coordinate system grid where a point can be dragged to see its (x,y) position. Controls adjust the simulated canvas dimensions, frame rate, and background color.', FALLBACK);
}

function draw() {
  // Only increment draw count when active
  if (mouseOverCanvas) {
    drawCount++;
  }
  
  frameRate(fpsSlider.value());
  updateCanvasSize();

  // Background areas
  fill(bgColorPicker.color());
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Simulated Canvas/Grid variables
  let simW = widthSlider.value();
  let simH = heightSlider.value();
  let simX = (canvasWidth - simW) / 2;
  let simY = (drawHeight - simH) / 2;
  
  // Draw grid lines inside sim canvas
  push();
  translate(simX, simY);
  fill('white');
  stroke(200);
  rect(0, 0, simW, simH);
  
  stroke(230);
  for(let x = 0; x <= simW; x += 50) { 
    line(x, 0, x, simH); 
  }
  for(let y = 0; y <= simH; y += 50) { 
    line(0, y, simW, y); 
  }
  
  // Draw Axes
  stroke(120);
  strokeWeight(2);
  line(0, 0, simW, 0); // X axis
  line(0, 0, 0, simH); // Y axis
  
  // Labels for Axes
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('X', simW + 5, -5);
  textAlign(RIGHT, BOTTOM);
  text('Y', -5, simH + 10);
  
  // Dragging logic for the coordinate point
  let mx = mouseX - simX;
  let my = mouseY - simY;
  
  if (mouseIsPressed && mouseOverCanvas) {
    if (!isDragging && dist(mx, my, ptX, ptY) < 20) {
      isDragging = true;
    }
  } else {
    isDragging = false;
  }
  
  if (isDragging) {
    ptX = constrain(mx, 0, simW);
    ptY = constrain(my, 0, simH);
  } else {
    // Keep point inside if grid shrinks
    ptX = constrain(ptX, 0, simW);
    ptY = constrain(ptY, 0, simH);
  }
  
  // Draw coordinate point
  fill('red');
  noStroke();
  circle(ptX, ptY, 15);
  
  // Draw coordinates text near point
  fill('black');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text(`(${Math.round(ptX)}, ${Math.round(ptY)})`, ptX + 10, ptY - 10);
  pop();

  // Draw Title AFTER everything else in the draw area
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Canvas Inspector', canvasWidth/2, 10);

  // Info panel for loop counts
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(10, 10, 140, 60, 5);
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(`setup() runs: ${setupCount}`, 20, 20);
  text(`draw() runs: ${drawCount}`, 20, 40);

  // Draw Control Labels
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Frame Rate: ' + fpsSlider.value(), 10, drawHeight + 15);
  text('BG Color:', 10, drawHeight + 50);
  text('Grid Width: ' + widthSlider.value(), 10, drawHeight + 85);
  text('Grid Height: ' + heightSlider.value(), 10, drawHeight + 120);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (typeof fpsSlider !== 'undefined') {
      fpsSlider.size(canvasWidth - sliderLeftMargin - margin);
      widthSlider.size(canvasWidth - sliderLeftMargin - margin);
      heightSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
