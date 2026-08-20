// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150; // 4 rows * 35 + 10
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let spaceSelect, blendSelect;
let rSlider, gSlider, bSlider, aSlider;
let mouseOverCanvas = false;
let watchX = -1;
let watchY = -1;

// Pre-render gradient to an image for performance and exact pixel reading
let gradientImg;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  // Row 1
  spaceSelect = createSelect();
  spaceSelect.option('RGB');
  spaceSelect.option('HSB');
  spaceSelect.selected('RGB');
  
  blendSelect = createSelect();
  blendSelect.option('BLEND');
  blendSelect.option('ADD');
  blendSelect.option('DARKEST');
  blendSelect.option('LIGHTEST');
  blendSelect.option('MULTIPLY');
  blendSelect.option('SCREEN');
  blendSelect.option('EXCLUSION');
  blendSelect.selected('BLEND');

  // Sliders internally map 0-255. We scale them for HSB later.
  // Row 2
  rSlider = createSlider(0, 255, 128, 1);
  gSlider = createSlider(0, 255, 128, 1);

  // Row 3
  bSlider = createSlider(0, 255, 128, 1);
  aSlider = createSlider(0, 255, 200, 1);

  positionControls();
  createGradient();
  
  describe('Color Mixer demonstrating RGB vs HSB, blend modes, alpha, and a pixel array magnifier.', FALLBACK);
}

function positionControls() {
  let col1L = 110;
  let col2L = (canvasWidth / 2) + 110;
  let w = (canvasWidth / 2) - 130;
  if (w < 50) w = 50;

  spaceSelect.position(col1L, drawHeight + 5);
  spaceSelect.size(w);
  blendSelect.position(col2L, drawHeight + 5);
  blendSelect.size(w);

  rSlider.position(col1L, drawHeight + 40);
  rSlider.size(w);
  gSlider.position(col2L, drawHeight + 40);
  gSlider.size(w);

  bSlider.position(col1L, drawHeight + 75);
  bSlider.size(w);
  aSlider.position(col2L, drawHeight + 75);
  aSlider.size(w);
}

function createGradient() {
  // We'll regenerate this on resize
  let gw = Math.max(1, canvasWidth / 2);
  gradientImg = createImage(Math.floor(gw), drawHeight);
  gradientImg.loadPixels();
  for (let x = 0; x < gradientImg.width; x++) {
    for (let y = 0; y < gradientImg.height; y++) {
      let r = map(x, 0, gradientImg.width, 0, 255);
      let g = map(y, 0, gradientImg.height, 0, 255);
      let b = map(x+y, 0, gradientImg.width+gradientImg.height, 255, 0);
      let index = (x + y * gradientImg.width) * 4;
      gradientImg.pixels[index] = r;
      gradientImg.pixels[index + 1] = g;
      gradientImg.pixels[index + 2] = b;
      gradientImg.pixels[index + 3] = 255;
    }
  }
  gradientImg.updatePixels();
}

function draw() {
  updateCanvasSize();
  colorMode(RGB, 255);
  blendMode(BLEND); // Reset blend mode for UI drawing

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // --- ZONE 1: Color Mixer (Left Half) ---
  let halfW = canvasWidth / 2;
  
  // Draw Checkerboard for Alpha demonstration
  noStroke();
  let checkSize = 20;
  for (let x = 0; x < halfW; x += checkSize) {
    for (let y = 0; y < drawHeight; y += checkSize) {
      if ((x / checkSize + y / checkSize) % 2 === 0) fill(200);
      else fill(255);
      rect(x, y, checkSize, checkSize);
    }
  }

  // Base circle
  fill(50, 150, 200);
  circle(halfW / 2 - 20, drawHeight / 2 - 20, halfW * 0.6);

  // User Color Setup
  let mode = spaceSelect.value();
  let v1 = rSlider.value();
  let v2 = gSlider.value();
  let v3 = bSlider.value();
  let v4 = aSlider.value();
  
  let label1, label2, label3, label4;
  let displayColor;
  
  if (mode === 'RGB') {
    label1 = 'Red: ' + v1;
    label2 = 'Green: ' + v2;
    label3 = 'Blue: ' + v3;
    label4 = 'Alpha: ' + v4;
    colorMode(RGB, 255, 255, 255, 255);
    displayColor = color(v1, v2, v3, v4);
  } else {
    let h = Math.round(map(v1, 0, 255, 0, 360));
    let s = Math.round(map(v2, 0, 255, 0, 100));
    let b = Math.round(map(v3, 0, 255, 0, 100));
    let a = map(v4, 0, 255, 0, 1);
    label1 = 'Hue: ' + h;
    label2 = 'Sat: ' + s;
    label3 = 'Bri: ' + b;
    label4 = 'Alpha: ' + a.toFixed(2);
    colorMode(HSB, 360, 100, 100, 1);
    displayColor = color(h, s, b, a);
  }

  // Apply blend mode and draw User circle
  let bMode = blendSelect.value();
  if (bMode === 'ADD') blendMode(ADD);
  else if (bMode === 'DARKEST') blendMode(DARKEST);
  else if (bMode === 'LIGHTEST') blendMode(LIGHTEST);
  else if (bMode === 'MULTIPLY') blendMode(MULTIPLY);
  else if (bMode === 'SCREEN') blendMode(SCREEN);
  else if (bMode === 'EXCLUSION') blendMode(EXCLUSION);
  else blendMode(BLEND);

  fill(displayColor);
  noStroke();
  circle(halfW / 2 + 20, drawHeight / 2 + 20, halfW * 0.6);
  
  // Reset modes for Zone 2 and UI
  blendMode(BLEND);
  colorMode(RGB, 255);

  // --- ZONE 2: Pixel Magnifier (Right Half) ---
  if (gradientImg) {
    image(gradientImg, halfW, 0);
  }

  // Update watch coordinates on click
  if (mouseIsPressed && mouseOverCanvas && mouseX > halfW && mouseX < canvasWidth && mouseY > 0 && mouseY < drawHeight) {
    watchX = mouseX;
    watchY = mouseY;
  }

  // Draw magnifier if a pixel has been selected
  if (watchX !== -1) {
    // Read 11x11 pixel region
    let rSize = 11;
    let magBox = 110; // 11 * 10
    
    let sx = watchX - Math.floor(rSize/2);
    let sy = watchY - Math.floor(rSize/2);
    let sample = get(sx, sy, rSize, rSize);
    
    // Draw magnifier box at top right
    let magX = canvasWidth - magBox - 20;
    let magY = 80; // Below title
    
    stroke(255);
    strokeWeight(2);
    noFill();
    // draw cursor box
    rect(watchX - Math.floor(rSize/2), watchY - Math.floor(rSize/2), rSize, rSize);
    
    // Draw magnified image (No smooth for crisp pixels)
    push();
    noSmooth();
    image(sample, magX, magY, magBox, magBox);
    pop();
    
    // Grid over magnifier
    stroke(0, 50);
    strokeWeight(1);
    for (let i = 0; i <= magBox; i += 10) {
      line(magX + i, magY, magX + i, magY + magBox);
      line(magX, magY + i, magX + magBox, magY + i);
    }
    
    // Center pixel highlight
    stroke('red');
    noFill();
    rect(magX + 50, magY + 50, 10, 10);
    
    // Get exact color of center pixel
    let exactColor = get(watchX, watchY);
    
    // Display values below magnifier
    fill(0, 180);
    noStroke();
    rect(magX, magY + magBox + 5, magBox, 50, 4);
    
    fill('white');
    textSize(12);
    textAlign(LEFT, TOP);
    text(`pixels[] Inspector`, magX + 5, magY + magBox + 10);
    text(`R:${exactColor[0]} G:${exactColor[1]} B:${exactColor[2]} A:${exactColor[3]}`, magX + 5, magY + magBox + 25);
  }

  // Draw Line Separator
  stroke('silver');
  strokeWeight(2);
  line(halfW, 0, halfW, drawHeight);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title and subtitle background
  textSize(14);
  let subW = textWidth('Click right side to magnify pixels[]');
  
  push();
  rectMode(CENTER);
  fill(255, 255, 255, 230); // 90% opaque white
  noStroke();
  rect(canvasWidth/2, 32, Math.max(subW + 40, 200), 55, 8); 
  pop();

  // Title and subtitle
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Color Mixer', canvasWidth/2, 10);
  
  textSize(14);
  textStyle(ITALIC);
  fill(80);
  text('Click right side to magnify pixels[]', canvasWidth/2, 40);
  textStyle(NORMAL);

  // Draw Control Labels
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  fill('black');
  
  let col1X = 10;
  let col2X = (canvasWidth / 2) + 10;

  // Row 1
  text('Space:', col1X, drawHeight + 15);
  text('Blend:', col2X, drawHeight + 15);
  
  // Row 2
  text(label1, col1X, drawHeight + 50);
  text(label2, col2X, drawHeight + 50);
  
  // Row 3
  text(label3, col1X, drawHeight + 85);
  text(label4, col2X, drawHeight + 85);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  createGradient();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
