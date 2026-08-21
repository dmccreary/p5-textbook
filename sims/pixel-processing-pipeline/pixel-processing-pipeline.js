/**
 * MicroSim Comment Header
 * name: Pixel Processing Pipeline
 * description: Interactive p5.js MicroSim for pixel processing pipeline.
 */

// CANVAS_HEIGHT: 650

let canvasW = 800;
let canvasH = 650;

let capture;
let sampleImage;

let uiDiv;
let mediaSelect;
let filterSelect;
let thresholdDiv;
let thresholdSlider;
let tValDisplay;
let matrixDiv;
let matrixInputs = [];
let blendSelect;

let matrix = [
  [ 0, -1,  0 ],
  [-1,  5, -1 ],
  [ 0, -1,  0 ]
];

let cachedProcessedImg = null;
let lastSourceType = '';
let lastFilterType = '';
let lastThreshold = -1;
let lastMatrixStr = '';

function windowResized() {
  canvasW = windowWidth;
  resizeCanvas(canvasW, canvasH);
  if (uiDiv) {
    uiDiv.style('width', canvasW - 20 + 'px');
  }
}

function setup() {
  canvasW = windowWidth;
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent(document.querySelector('main'));
  
  createSampleImage();
  
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  setupUI();
}

function createSampleImage() {
  sampleImage = createGraphics(320, 240);
  sampleImage.background(30, 40, 60);
  
  // draw background grid
  sampleImage.stroke(60, 70, 90);
  sampleImage.strokeWeight(2);
  for(let i=0; i<=320; i+=20) {
    sampleImage.line(i, 0, i, 240);
  }
  for(let j=0; j<=240; j+=20) {
    sampleImage.line(0, j, 320, j);
  }
  
  sampleImage.noStroke();
  
  // A red circle
  sampleImage.fill(220, 50, 50);
  sampleImage.circle(90, 110, 120);
  
  // A green square with rotation
  sampleImage.push();
  sampleImage.translate(220, 100);
  sampleImage.rotate(PI / 6);
  sampleImage.fill(50, 200, 80);
  sampleImage.rectMode(CENTER);
  sampleImage.rect(0, 0, 100, 100);
  sampleImage.pop();
  
  // A blue triangle
  sampleImage.fill(50, 100, 250);
  sampleImage.triangle(50, 220, 160, 140, 270, 220);
  
  // Bright yellow circle for high contrast testing
  sampleImage.fill(255, 230, 20);
  sampleImage.circle(160, 130, 60);
}

function setupUI() {
  uiDiv = createDiv('');
  uiDiv.position(20, 70);
  uiDiv.style('width', '200px');
  uiDiv.style('background', 'aliceblue');
  uiDiv.style('padding', '15px');
  uiDiv.style('border', '1px solid #ddd');
  uiDiv.style('border-radius', '8px');
  uiDiv.style('box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
  uiDiv.style('font-family', 'sans-serif');
  uiDiv.style('font-size', '14px');
  
  // Media Source
  createSpan('<b>Media Source:</b>').parent(uiDiv);
  createElement('br').parent(uiDiv);
  mediaSelect = createSelect().parent(uiDiv);
  mediaSelect.option('Sample Image');
  mediaSelect.option('Webcam');
  mediaSelect.style('width', '100%');
  mediaSelect.style('padding', '5px');
  mediaSelect.style('margin-bottom', '15px');
  
  // Filter Preset
  createSpan('<b>Filter Preset:</b>').parent(uiDiv);
  createElement('br').parent(uiDiv);
  filterSelect = createSelect().parent(uiDiv);
  filterSelect.option('None');
  filterSelect.option('Grayscale');
  filterSelect.option('Blur');
  filterSelect.option('Threshold');
  filterSelect.option('Posterize');
  filterSelect.option('Custom Convolution');
  filterSelect.style('width', '100%');
  filterSelect.style('padding', '5px');
  filterSelect.style('margin-bottom', '10px');
  filterSelect.changed(updateUIState);
  
  // Threshold controls
  thresholdDiv = createDiv().parent(uiDiv);
  createSpan('<b>Threshold Level:</b>').parent(thresholdDiv);
  createElement('br').parent(thresholdDiv);
  thresholdSlider = createSlider(0, 255, 127).parent(thresholdDiv);
  thresholdSlider.style('width', '80%');
  tValDisplay = createSpan('127').parent(thresholdDiv);
  tValDisplay.style('margin-left', '10px');
  tValDisplay.style('font-family', 'monospace');
  thresholdSlider.input(() => {
    tValDisplay.html(thresholdSlider.value());
  });
  
  // Matrix controls
  matrixDiv = createDiv().parent(uiDiv);
  matrixDiv.style('margin-top', '5px');
  createSpan('<b>3x3 Convolution Kernel:</b>').parent(matrixDiv);
  
  let gridDiv = createDiv().parent(matrixDiv);
  gridDiv.style('display', 'grid');
  gridDiv.style('grid-template-columns', 'repeat(3, 40px)');
  gridDiv.style('gap', '5px');
  gridDiv.style('margin', '10px 0');
  
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      let inp = createInput(matrix[i][j].toString());
      inp.parent(gridDiv);
      inp.style('width', '35px');
      inp.style('text-align', 'center');
      inp.input(matrixChanged);
      matrixInputs.push(inp);
    }
  }
  
  let btnDiv = createDiv().parent(matrixDiv);
  btnDiv.style('display', 'flex');
  btnDiv.style('gap', '5px');
  
  let sharpenBtn = createButton('Sharpen').parent(btnDiv);
  sharpenBtn.mousePressed(() => setMatrix([[0,-1,0],[-1,5,-1],[0,-1,0]]));
  
  let edgeBtn = createButton('Edge').parent(btnDiv);
  edgeBtn.mousePressed(() => setMatrix([[-1,-1,-1],[-1,8,-1],[-1,-1,-1]]));
  
  let blurBtn = createButton('Blur').parent(btnDiv);
  blurBtn.mousePressed(() => setMatrix([[1,1,1],[1,1,1],[1,1,1]]));
  
  // Blend Mode
  let blendDiv = createDiv().parent(uiDiv);
  blendDiv.style('margin-top', '15px');
  createSpan('<b>Blend Mode:</b>').parent(blendDiv);
  createElement('br').parent(blendDiv);
  blendSelect = createSelect().parent(blendDiv);
  blendSelect.option('BLEND');
  blendSelect.option('MULTIPLY');
  blendSelect.option('SCREEN');
  blendSelect.option('OVERLAY');
  blendSelect.option('HARD_LIGHT');
  blendSelect.option('DIFFERENCE');
  blendSelect.style('width', '100%');
  blendSelect.style('padding', '5px');
  blendSelect.style('margin-bottom', '5px');
  
  let blendHelp = createSpan('Applies to the bottom preview.').parent(blendDiv);
  blendHelp.style('color', '#666');
  blendHelp.style('font-size', '12px');
  
  updateUIState();
}

function updateUIState() {
  let fType = filterSelect.value();
  if (fType === 'Threshold') {
    thresholdDiv.style('display', 'block');
  } else {
    thresholdDiv.style('display', 'none');
  }
  
  if (fType === 'Custom Convolution') {
    matrixDiv.style('display', 'block');
  } else {
    matrixDiv.style('display', 'none');
  }
}

function matrixChanged() {
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      let val = parseFloat(matrixInputs[i*3 + j].value());
      if (!isNaN(val)) {
        matrix[i][j] = val;
      }
    }
  }
}

function setMatrix(m) {
  matrix = m;
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      matrixInputs[i*3 + j].value(m[i][j]);
    }
  }
}

function getMatrixString() {
  return matrix.flat().join(',');
}

function processImageIfNeeded(sourceImg) {
  let currentSourceType = mediaSelect.value();
  let currentFilterType = filterSelect.value();
  let currentThreshold = thresholdSlider.value();
  let currentMatrixStr = getMatrixString();
  
  let isWebcam = (currentSourceType === 'Webcam');
  let hasChanged = (currentSourceType !== lastSourceType ||
                    currentFilterType !== lastFilterType ||
                    currentThreshold !== lastThreshold ||
                    currentMatrixStr !== lastMatrixStr);
                    
  if (isWebcam || hasChanged || !cachedProcessedImg) {
    let processedImg = createImage(sourceImg.width, sourceImg.height);
    processedImg.copy(sourceImg, 0, 0, sourceImg.width, sourceImg.height, 0, 0, processedImg.width, processedImg.height);
    
    if (currentFilterType === 'Grayscale') {
      processedImg.filter(GRAY);
    } else if (currentFilterType === 'Blur') {
      processedImg.filter(BLUR, 3);
    } else if (currentFilterType === 'Threshold') {
      processedImg.filter(THRESHOLD, currentThreshold / 255.0);
    } else if (currentFilterType === 'Posterize') {
      processedImg.filter(POSTERIZE, 4);
    } else if (currentFilterType === 'Custom Convolution') {
      processedImg = applyConvolution(processedImg, matrix);
    }
    
    cachedProcessedImg = processedImg;
    lastSourceType = currentSourceType;
    lastFilterType = currentFilterType;
    lastThreshold = currentThreshold;
    lastMatrixStr = currentMatrixStr;
  }
  
  return cachedProcessedImg;
}

function applyConvolution(img, kMatrix) {
  let w = img.width;
  let h = img.height;
  let result = createImage(w, h);
  
  img.loadPixels();
  result.loadPixels();
  
  let matrixSum = 0;
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      matrixSum += kMatrix[i][j];
    }
  }
  let divisor = matrixSum > 0 ? matrixSum : 1;

  for (let x = 1; x < w - 1; x++) {
    for (let y = 1; y < h - 1; y++) {
      let r = 0.0;
      let g = 0.0;
      let b = 0.0;

      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          let posX = x + k;
          let posY = y + l;
          let idx = (posY * w + posX) * 4;
          let weight = kMatrix[l+1][k+1];
          r += img.pixels[idx] * weight;
          g += img.pixels[idx + 1] * weight;
          b += img.pixels[idx + 2] * weight;
        }
      }

      let resIdx = (y * w + x) * 4;
      result.pixels[resIdx] = constrain(r / divisor, 0, 255);
      result.pixels[resIdx + 1] = constrain(g / divisor, 0, 255);
      result.pixels[resIdx + 2] = constrain(b / divisor, 0, 255);
      result.pixels[resIdx + 3] = 255;
    }
  }
  
  result.updatePixels();
  return result;
}

function draw() {
  background('aliceblue');


  // Draw Title

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Pixel Processing Pipeline", width / 2, 10);


  
  let sourceImg;
  if (mediaSelect.value() === 'Sample Image') {
    sourceImg = sampleImage;
  } else {
    if (capture.width > 10) {
      sourceImg = capture.get();
    } else {
      sourceImg = sampleImage;
    }
  }
  
  if (sourceImg && sourceImg.width > 0) {
    let processedImg = processImageIfNeeded(sourceImg);
    
    let bModeStr = blendSelect.value();
    let bMode = BLEND;
    if (bModeStr === 'MULTIPLY') bMode = MULTIPLY;
    else if (bModeStr === 'SCREEN') bMode = SCREEN;
    else if (bModeStr === 'OVERLAY') bMode = OVERLAY;
    else if (bModeStr === 'HARD_LIGHT') bMode = HARD_LIGHT;
    else if (bModeStr === 'DIFFERENCE') bMode = DIFFERENCE;
    
    fill(40);
    noStroke();
    textSize(16);
    textAlign(CENTER);
    textStyle(BOLD);
    
    // Top row thumbnails (Original and Processed side by side)
    let startX = 290;
    let availableW = width - startX - 20;
    if (availableW < 200) availableW = 200;
    
    let thumbW = availableW / 2 - 10;
    let thumbH = thumbW * 0.75;
    
    let img1X = startX;
    let img2X = startX + thumbW + 20;
    
    noStroke();
    text("Original Input", img1X + thumbW/2, 60);
    image(sourceImg, img1X, 80, thumbW, thumbH);
    
    text("Filtered Output", img2X + thumbW/2, 60);
    image(processedImg, img2X, 80, thumbW, thumbH);
    
    // Main preview (Blended)
    let mainW = availableW;
    let mainH = mainW * 0.75;
    let mainY = 90 + thumbH + 50;
    
    text("Blended Result", startX + mainW/2, mainY - 30);
    
    push();
      translate(startX, mainY);
      // Draw base (Original)
      image(sourceImg, 0, 0, mainW, mainH);
      
      // Draw overlay (Processed) with blend mode
      blendMode(bMode);
      image(processedImg, 0, 0, mainW, mainH);
    pop();
    
    // Reset blend mode for future text/UI rendering
    blendMode(BLEND);
    
  }
}
