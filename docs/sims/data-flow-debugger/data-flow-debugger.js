/*
 * MicroSim: Data Flow Debugger
 * 
 * Visualizes standard JavaScript array mechanics like map, filter, and reduce.
 */
// CANVAS_HEIGHT: 500

let lengthSlider;
let mapSelect;
let filterSelect;
let inspectorToggle;
let generateBtn;

let rawData = [];
let hoverInfo = null;

function setup() {
  createCanvas(windowWidth, 400);
  
  // Create a container for the controls
  let controlsDiv = createDiv().style('display', 'flex')
                               .style('gap', '20px')
                               .style('flex-wrap', 'wrap')
                               .style('padding', '15px')
                               .style('background', '#f8f9fa')
                               .style('border-top', '2px solid #e9ecef')
                               .style('font-family', 'sans-serif')
                               .style('font-size', '14px');
  
  let col1 = createDiv().parent(controlsDiv);
  col1.html('<strong>Array Length:</strong><br>');
  lengthSlider = createSlider(1, 20, 8, 1).parent(col1);
  lengthSlider.input(generateData);
  
  let col2 = createDiv().parent(controlsDiv);
  col2.html('<strong>Map Transformation:</strong><br>');
  mapSelect = createSelect().parent(col2);
  mapSelect.option('None');
  mapSelect.option('Make Red');
  mapSelect.option('Double Size');
  mapSelect.option('Make Circles');
  
  let col3 = createDiv().parent(controlsDiv);
  col3.html('<strong>Filter Condition:</strong><br>');
  filterSelect = createSelect().parent(col3);
  filterSelect.option('None');
  filterSelect.option('Circles Only');
  filterSelect.option('Size > 20');
  filterSelect.option('Red Only');
  
  let col4 = createDiv().parent(controlsDiv).style('display', 'flex').style('flex-direction', 'column').style('justify-content', 'flex-end');
  inspectorToggle = createCheckbox('Scope Inspector', false).parent(col4);
  
  let col5 = createDiv().parent(controlsDiv).style('display', 'flex').style('flex-direction', 'column').style('justify-content', 'flex-end');
  generateBtn = createButton('Generate New Data').parent(col5);
  generateBtn.mousePressed(generateData);
  
  // Initial data generation
  generateData();
}

function generateData() {
  rawData = [];
  let len = lengthSlider.value();
  let types = ['square', 'circle', 'triangle'];
  let colors = ['blue', 'green', 'yellow'];
  
  for (let i = 0; i < len; i++) {
    rawData.push({
      id: i,
      type: random(types),
      size: floor(random(10, 16)), // Sizes between 10 and 15
      color: random(colors)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}

function getColor(c) {
  if (c === 'blue') return color('#3498db');
  if (c === 'green') return color('#2ecc71');
  if (c === 'yellow') return color('#f1c40f');
  if (c === 'red') return color('#e74c3c');
  return color(150);
}

function draw() {
  background(255);


  push();
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Data Flow Debugger", width / 2, 10);
  pop();

  hoverInfo = null;
  
  let mapVal = mapSelect.value();
  let filterVal = filterSelect.value();
  
  // Pipeline functions
  let mapFn = x => ({...x});
  let mapCode = "x => x";
  if (mapVal === 'Make Red') {
    mapFn = x => ({...x, color: 'red'});
    mapCode = "x => ({...x, color: 'red'})";
  } else if (mapVal === 'Double Size') {
    mapFn = x => ({...x, size: x.size * 2});
    mapCode = "x => ({...x, size: x.size * 2})";
  } else if (mapVal === 'Make Circles') {
    mapFn = x => ({...x, type: 'circle'});
    mapCode = "x => ({...x, type: 'circle'})";
  }
  
  let filterFn = x => true;
  let filterCode = "x => true";
  if (filterVal === 'Circles Only') {
    filterFn = x => x.type === 'circle';
    filterCode = "x => x.type === 'circle'";
  } else if (filterVal === 'Size > 20') {
    filterFn = x => x.size > 20;
    filterCode = "x => x.size > 20";
  } else if (filterVal === 'Red Only') {
    filterFn = x => x.color === 'red';
    filterCode = "x => x.color === 'red'";
  }
  
  let mappedData = rawData.map(mapFn);
  let filteredData = mappedData.filter(filterFn);
  let reduceCode = "(acc, cur) => acc + cur.size";
  let reducedValue = filteredData.reduce((acc, cur) => acc + cur.size, 0);
  
  let rowH = height / 4;
  
  // Draw background rows
  for (let i = 1; i < 4; i++) {
    stroke(240);
    strokeWeight(1);
    line(0, i * rowH, width, i * rowH);
  }
  
  let startX = 220;
  let availWidth = width - startX - 20;
  let maxItems = lengthSlider.value();
  let spacing = availWidth / (maxItems + 1);
  
  // Draw connecting arrows
  for (let item of rawData) {
    let cx = startX + (item.id + 1) * spacing;
    drawConnectingLine(cx, 0 * rowH + rowH/2 + 15, cx, 1 * rowH + rowH/2 - 15);
  }
  for (let item of mappedData) {
    let cx = startX + (item.id + 1) * spacing;
    drawConnectingLine(cx, 1 * rowH + rowH/2 + 15, cx, 2 * rowH + rowH/2 - 15);
  }
  for (let item of filteredData) {
    let cx = startX + (item.id + 1) * spacing;
    drawConnectingLine(cx, 2 * rowH + rowH/2 + 15, width/2, 3 * rowH + rowH/2 - 30);
  }
  
  // Stages Definition
  let stages = [
    { name: '1. Source Array', data: rawData, code: "const data = [...]" },
    { name: '2. map()', data: mappedData, code: "data.map(\n  " + mapCode + "\n)" },
    { name: '3. filter()', data: filteredData, code: "data.filter(\n  " + filterCode + "\n)" }
  ];
  
  for (let i = 0; i < stages.length; i++) {
    let y = i * rowH + rowH / 2;
    
    // Labels
    fill(40);
    noStroke();
    textAlign(LEFT, BASELINE);
    textSize(14);
    textStyle(BOLD);
    textFont('sans-serif');
    text(stages[i].name, 20, y - 5);
    
    textStyle(NORMAL);
    textSize(12);
    textFont('monospace');
    fill(100);
    text(stages[i].code, 20, y + 15);
    
    // Draw array elements
    drawDataArray(stages[i].data, y, inspectorToggle.checked(), startX, spacing);
  }
  
  // Reduce Stage
  let i = 3;
  let y = i * rowH + rowH / 2;
  
  fill(40);
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(14);
  textStyle(BOLD);
  textFont('sans-serif');
  text("4. reduce()", 20, y - 5);
  
  textStyle(NORMAL);
  textSize(12);
  textFont('monospace');
  fill(100);
  text("data.reduce(\n  " + reduceCode + "\n, 0)", 20, y + 15);
  
  // Draw Reduce Value
  if (reducedValue > 0) {
    let rRadius = sqrt(reducedValue) * 4; // Scaled for better visibility
    rRadius = min(rRadius, 90); // Cap radius
    fill('#9b59b6');
    stroke(0);
    strokeWeight(1.5);
    circle(width / 2, y, rRadius);
    
    fill(255);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(reducedValue, width / 2, y);
  } else {
    fill(150);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text("0", width / 2, y);
  }
  
  // Draw Inspector
  if (inspectorToggle.checked()) {
    drawInspector();
  }
}

function drawConnectingLine(x1, y1, x2, y2) {
  stroke(220);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  
  push();
  translate(x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  rotate(angle);
  fill(220);
  noStroke();
  triangle(0, 0, -5, -4, -5, 4);
  pop();
}

function drawDataArray(arr, y, inspectorOn, startX, spacing) {
  for (let j = 0; j < arr.length; j++) {
    let item = arr[j];
    let cx = startX + (item.id + 1) * spacing;
    let cy = y;
    
    let drawSize = item.size;
    
    fill(getColor(item.color));
    stroke(0);
    strokeWeight(1.5);
    
    if (item.type === 'circle') {
      circle(cx, cy, drawSize);
    } else if (item.type === 'square') {
      rectMode(CENTER);
      rect(cx, cy, drawSize, drawSize);
    } else if (item.type === 'triangle') {
      let r = drawSize / 2 + 2; // slight adjustment so triangle looks similar area
      triangle(cx, cy - r, cx - r * 1.15, cy + r * 0.85, cx + r * 1.15, cy + r * 0.85);
    }
    
    if (inspectorOn) {
      let d = dist(mouseX, mouseY, cx, cy);
      if (d < drawSize) {
        hoverInfo = { item: item, x: cx, y: cy };
      }
    }
  }
}

function drawInspector() {
  if (!hoverInfo) return;
  
  let lines = [
    `{`,
    `  id: ${hoverInfo.item.id},`,
    `  type: '${hoverInfo.item.type}',`,
    `  size: ${hoverInfo.item.size},`,
    `  color: '${hoverInfo.item.color}'`,
    `}`
  ];
  
  let txt = lines.join('\n');
  
  textFont('monospace');
  textSize(12);
  textStyle(NORMAL);
  
  let tw = 0;
  for (let l of lines) {
    let w = textWidth(l);
    if (w > tw) tw = w;
  }
  tw += 20;
  let th = lines.length * 15 + 10;
  
  let tx = hoverInfo.x + 15;
  let ty = hoverInfo.y - 15;
  if (tx + tw > width) tx = hoverInfo.x - tw - 15;
  if (ty + th > height) ty = hoverInfo.y - th - 15;
  
  fill(255, 255, 255, 240);
  stroke(50);
  strokeWeight(1);
  rectMode(CORNER);
  rect(tx, ty, tw, th, 5);
  
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  text(txt, tx + 10, ty + 10);
}
