/* Interactive Filter Studio MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-filter-studio/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let kernelSelect, intensitySlider;
let testPatternImg;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  kernelSelect = createSelect();
  kernelSelect.option('Identity (Original)');
  kernelSelect.option('Gaussian Blur');
  kernelSelect.option('Sharpen');
  kernelSelect.option('Edge Detection');
  kernelSelect.option('Emboss');

  intensitySlider = createSlider(0.5, 2.0, 1.0, 0.1);

  positionControls();
  describe('Convolution filter studio demonstrating 3x3 image processing kernels.', FALLBACK);
}

function positionControls() {
  let col1L = 80;
  let col2L = canvasWidth / 2 + 80;
  let w = canvasWidth / 2 - 100;
  if (w < 50) w = 50;

  kernelSelect.position(col1L, drawHeight + 10);
  kernelSelect.size(w);

  intensitySlider.position(col2L, drawHeight + 10);
  intensitySlider.size(w);
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
  text('Interactive Filter Studio (3x3 Kernel)', canvasWidth / 2, 12);

  let sel = kernelSelect.value();
  let intens = intensitySlider.value();

  // Define Kernel Matrix
  let kernel = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];

  if (sel === 'Gaussian Blur') {
    kernel = [
      [1/16, 2/16, 1/16],
      [2/16, 4/16, 2/16],
      [1/16, 2/16, 1/16]
    ];
  } else if (sel === 'Sharpen') {
    kernel = [
      [ 0, -1,  0],
      [-1,  5 * intens, -1],
      [ 0, -1,  0]
    ];
  } else if (sel === 'Edge Detection') {
    kernel = [
      [-1, -1, -1],
      [-1,  8 * intens, -1],
      [-1, -1, -1]
    ];
  } else if (sel === 'Emboss') {
    kernel = [
      [-2 * intens, -1, 0],
      [-1, 1, 1],
      [0, 1, 2 * intens]
    ];
  }

  // Draw Sample Graphic to demonstrate filter
  let cx = canvasWidth / 2;
  let cy = 170;
  let size = 180;

  // Render Synthetic High-Contrast Scene
  push();
  translate(cx - size / 2, cy - size / 2);
  fill(255);
  rect(0, 0, size, size);

  // Geometric target shapes
  fill(220, 40, 40);
  rect(20, 20, 60, 60);

  fill(40, 180, 60);
  circle(130, 50, 50);

  fill(40, 90, 220);
  triangle(30, 160, 80, 100, 130, 160);

  // Simulated Filter overlay effect
  if (sel === 'Gaussian Blur') {
    fill(255, 255, 255, 120);
    rect(0, 0, size, size);
  } else if (sel === 'Edge Detection') {
    fill(10, 15, 25, 200);
    rect(0, 0, size, size);
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(20, 20, 60, 60);
    circle(130, 50, 50);
    triangle(30, 160, 80, 100, 130, 160);
  } else if (sel === 'Sharpen') {
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(20, 20, 60, 60);
    circle(130, 50, 50);
  }
  pop();

  // Draw 3x3 Kernel Matrix Display
  let matX = cx - 80;
  let matY = 295;
  fill(255);
  stroke(200);
  rect(matX - 10, matY - 10, 180, 75, 6);

  fill(0);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let val = kernel[r][c];
      let valStr = typeof val === 'number' ? (Number.isInteger(val) ? val.toString() : val.toFixed(2)) : val;
      text(valStr, matX + c * 50 + 25, matY + r * 20 + 10);
    }
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Filter:', 15, drawHeight + 20);
  text(`Intensity: ${intens.toFixed(1)}x`, canvasWidth / 2 + 15, drawHeight + 20);

  textSize(11);
  fill(90);
  textAlign(CENTER, TOP);
  text('Kernel matrix weights transform pixel color values based on adjacent neighbors.', canvasWidth / 2, drawHeight + 52);
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
