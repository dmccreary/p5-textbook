/* DOM Layout Explorer MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/dom-layout-explorer/
*/
// CANVAS_HEIGHT: 515
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;

let justifySelect, alignSelect, directionSelect;
let itemCountSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  directionSelect = createSelect();
  directionSelect.option('row');
  directionSelect.option('column');

  justifySelect = createSelect();
  justifySelect.option('flex-start');
  justifySelect.option('center');
  justifySelect.option('flex-end');
  justifySelect.option('space-between');
  justifySelect.option('space-around');

  alignSelect = createSelect();
  alignSelect.option('center');
  alignSelect.option('flex-start');
  alignSelect.option('flex-end');

  itemCountSlider = createSlider(2, 6, 4, 1);

  positionControls();
  describe('CSS Flexbox interactive playground demonstrating justify-content, align-items, and direction.', LABEL);
}

function positionControls() {
  let col1L = 100;
  let col2L = canvasWidth / 2 + 100;
  let w = canvasWidth / 2 - 120;
  if (w < 50) w = 50;

  directionSelect.position(col1L, drawHeight + 10);
  directionSelect.size(w);

  justifySelect.position(col2L, drawHeight + 10);
  justifySelect.size(w);

  alignSelect.position(col1L, drawHeight + 45);
  alignSelect.size(w);

  itemCountSlider.position(col2L, drawHeight + 45);
  itemCountSlider.size(w);
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
  text('DOM & CSS Flexbox Layout Explorer', canvasWidth / 2, 12);

  // Container Box Representation
  let contMargin = 30;
  let contX = contMargin;
  let contY = 50;
  let contW = canvasWidth - contMargin * 2;
  let contH = drawHeight - 75;

  fill(255);
  stroke(100, 140, 220);
  strokeWeight(2);
  rect(contX, contY, contW, contH, 8);

  // CSS Code annotation
  let dir = directionSelect.value();
  let just = justifySelect.value();
  let ali = alignSelect.value();
  let numItems = itemCountSlider.value();

  fill(100);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text(`display: flex; flex-direction: ${dir};\njustify-content: ${just}; align-items: ${ali};`, contX + 12, contY + 12);

  // Layout calculations
  let itemSize = 45;
  let items = [];

  if (dir === 'row') {
    let totalItemsW = numItems * itemSize;
    let availW = contW - 40;
    let startX = contX + 20;
    let gap = 10;

    if (just === 'flex-start') {
      for (let i = 0; i < numItems; i++) items.push({ x: startX + i * (itemSize + gap), y: 0 });
    } else if (just === 'center') {
      let offset = (availW - (totalItemsW + (numItems - 1) * gap)) / 2;
      for (let i = 0; i < numItems; i++) items.push({ x: startX + offset + i * (itemSize + gap), y: 0 });
    } else if (just === 'flex-end') {
      let offset = availW - (totalItemsW + (numItems - 1) * gap);
      for (let i = 0; i < numItems; i++) items.push({ x: startX + offset + i * (itemSize + gap), y: 0 });
    } else if (just === 'space-between') {
      let step = numItems > 1 ? (availW - itemSize) / (numItems - 1) : 0;
      for (let i = 0; i < numItems; i++) items.push({ x: startX + i * step, y: 0 });
    } else if (just === 'space-around') {
      let step = availW / numItems;
      for (let i = 0; i < numItems; i++) items.push({ x: startX + i * step + (step - itemSize) / 2, y: 0 });
    }

    // Align items on Cross Axis (Y)
    for (let it of items) {
      if (ali === 'center') it.y = contY + (contH - itemSize) / 2;
      else if (ali === 'flex-start') it.y = contY + 50;
      else if (ali === 'flex-end') it.y = contY + contH - itemSize - 20;
    }
  } else {
    // Column direction
    let totalItemsH = numItems * itemSize;
    let availH = contH - 60;
    let startY = contY + 50;
    let gap = 8;

    if (just === 'flex-start') {
      for (let i = 0; i < numItems; i++) items.push({ x: 0, y: startY + i * (itemSize + gap) });
    } else if (just === 'center') {
      let offset = (availH - (totalItemsH + (numItems - 1) * gap)) / 2;
      for (let i = 0; i < numItems; i++) items.push({ x: 0, y: startY + offset + i * (itemSize + gap) });
    } else if (just === 'flex-end') {
      let offset = availH - (totalItemsH + (numItems - 1) * gap);
      for (let i = 0; i < numItems; i++) items.push({ x: 0, y: startY + offset + i * (itemSize + gap) });
    } else {
      let step = availH / numItems;
      for (let i = 0; i < numItems; i++) items.push({ x: 0, y: startY + i * step + (step - itemSize) / 2 });
    }

    // Align items on Cross Axis (X)
    for (let it of items) {
      if (ali === 'center') it.x = contX + (contW - itemSize) / 2;
      else if (ali === 'flex-start') it.x = contX + 20;
      else if (ali === 'flex-end') it.x = contX + contW - itemSize - 20;
    }
  }

  // Draw Items
  for (let i = 0; i < items.length; i++) {
    fill(70, 130, 240);
    stroke(255);
    strokeWeight(2);
    rect(items[i].x, items[i].y, itemSize, itemSize, 6);

    fill(255);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(i + 1, items[i].x + itemSize / 2, items[i].y + itemSize / 2);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Direction:', 15, drawHeight + 20);
  text('Justify:', canvasWidth / 2 + 15, drawHeight + 20);
  text('Align:', 15, drawHeight + 55);
  text(`Items: ${numItems}`, canvasWidth / 2 + 15, drawHeight + 55);

  textSize(11);
  fill(100);
  textAlign(CENTER, TOP);
  text('Main Axis determines flow; Cross Axis determines perpendicular alignment.', canvasWidth / 2, drawHeight + 85);
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
