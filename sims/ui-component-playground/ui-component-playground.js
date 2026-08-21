// CANVAS_HEIGHT: 500
/**
 * UI Component Playground
 * Demonstrates absolute and relative positioning of DOM elements over a canvas.
 */

let targetElement;
let typeSelect;
let xSlider, ySlider;
let styleInput;
let parentToggle;

let canvas;
let wrapper;
let controls = [];

function updateLayout() {
  let canvasW = windowWidth - 2; // wrapper border
  if (canvasW < 400) canvasW = 400;
  
  wrapper.style('width', canvasW + 'px');
  resizeCanvas(canvasW, 580);
  

  // Update max bounds of sliders
  if (xSlider) {
    xSlider.elt.max = canvasW - 20;
  }

  // Arrange controls at the bottom, perhaps in 2 rows
  let row1Y = 460;
  let row2Y = 520;
  let col1X = 20;
  let col2X = 220;
  let col3X = 420;
  
  typeSelect.position(col1X, row1Y);
  xSlider.position(col2X, row1Y);
  ySlider.position(col3X, row1Y);
  
  styleInput.position(col1X, row2Y);
  parentToggle.position(col3X, row2Y);
  
  // Update controls labels array with their new positions for draw()
  controls[0].el.x = col1X; controls[0].el.y = row1Y;
  controls[1].el.x = col2X; controls[1].el.y = row1Y;
  controls[2].el.x = col3X; controls[2].el.y = row1Y;
  controls[3].el.x = col1X; controls[3].el.y = row2Y;
  controls[4].el.x = col3X; controls[4].el.y = row2Y;
}


function windowResized() {
  updateLayout();
}

function setup() {
  let mainEl = select('main');
  if (!mainEl) {
    mainEl = createDiv();
    mainEl.id('main');
  }

  // Create a wrapper with margin to demonstrate positioning context
  wrapper = createDiv();
  wrapper.style('margin', '0'); 
  wrapper.style('position', 'relative');
  wrapper.style('width', '100%');
  wrapper.style('height', '580px');
  wrapper.style('background-color', '#ffffff');
  wrapper.style('border', '1px solid #dee2e6');
  wrapper.style('box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
  wrapper.parent(mainEl);

  canvas = createCanvas(windowWidth - 2, 580);
  canvas.parent(wrapper);
  
  typeSelect = createSelect();
  typeSelect.parent(wrapper);
  typeSelect.option('Button');
  typeSelect.option('Slider');
  typeSelect.option('Text Input');
  typeSelect.option('Checkbox');
  typeSelect.option('Heading');
  typeSelect.changed(createNewTarget);
  controls.push({el: typeSelect, label: 'DOM Element Type'});
  
  xSlider = createSlider(0, 800, 100);
  xSlider.parent(wrapper);
  controls.push({el: xSlider, label: 'X Position (relative to parent)'});
  
  ySlider = createSlider(0, 400, 100);
  ySlider.parent(wrapper);
  controls.push({el: ySlider, label: 'Y Position (relative to parent)'});
  
  styleInput = createInput('background: #ffcc00; padding: 10px; border-radius: 8px;');
  styleInput.parent(wrapper);
  styleInput.size(360);
  styleInput.input(updateStyle);
  controls.push({el: styleInput, label: 'CSS Style Injector'});
  
  parentToggle = createCheckbox(' Parent to Canvas Wrapper', true);
  parentToggle.parent(wrapper);
  parentToggle.changed(updateParent);
  controls.push({el: parentToggle, label: 'DOM Hierarchy'});
  
  createNewTarget();
  updateLayout();
}

function draw() {
  background('#F0F8FF');
  
  // Draw layout boundary for target area vs controls
  noStroke();
  fill(255);
  rect(0, 420, width, height - 420);
  
  stroke(200);
  strokeWeight(2);
  line(0, 420, width, 420);
  
  // Draw labels for controls
  noStroke();
  textSize(12);
  fill(50);
  for (let c of controls) {
    if (c.label) {
      text(c.label, c.el.x, c.el.y - 18);
    }
  }
  
  // Canvas area instructions
  fill(200);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Canvas Area\n(0, 0) is top-left of this box", width/2, 210);
  
  // Add a centered title at the top
  fill(50);
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("UI Component Playground", width/2, 15);
  textStyle(NORMAL);
  
  // Update Target Element Position
  if (targetElement) {
    // If not parented to wrapper, adjust position to appear on canvas visually? 
    // Actually the logic just sets position to slider value.
    targetElement.position(xSlider.value(), ySlider.value());
  }
  
  // Draw a crosshair where the element is being placed relative to canvas
  let tx = xSlider.value();
  let ty = ySlider.value();
  
  // Only draw crosshair if it's within the canvas area
  if (ty <= 420) {
    stroke(255, 0, 0, 150);
    strokeWeight(2);
    line(tx - 15, ty, tx + 15, ty);
    line(tx, ty - 15, tx, ty + 15);
    
    noStroke();
    fill(255, 0, 0);
    textAlign(LEFT, TOP);
    textSize(12);
    text(`(${tx}, ${ty})`, tx + 5, ty - 5);
  }
}

function createNewTarget() {
  if (targetElement) {
    targetElement.remove();
  }
  
  let type = typeSelect.value();
  if (type === 'Button') {
    targetElement = createButton('Click Me!');
  } else if (type === 'Slider') {
    targetElement = createSlider(0, 100, 50);
  } else if (type === 'Text Input') {
    targetElement = createInput('Type here...');
  } else if (type === 'Checkbox') {
    targetElement = createCheckbox(' Check me', false);
  } else if (type === 'Heading') {
    targetElement = createElement('h3', 'Hello World!');
    targetElement.style('margin', '0'); 
  }
  
  updateStyle();
  updateParent();
}

function updateStyle() {
  if (targetElement) {
    targetElement.elt.style.cssText = styleInput.value();
  }
}

function updateParent() {
  if (targetElement) {
    if (parentToggle.checked()) {
      targetElement.parent(wrapper);
    } else {
      targetElement.parent(document.body);
    }
  }
}
