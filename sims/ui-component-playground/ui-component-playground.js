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

function setup() {
  let mainEl = select('main');
  if (!mainEl) {
    mainEl = createDiv();
    mainEl.id('main');
  }

  // Create a wrapper with margin to demonstrate positioning context
  wrapper = createDiv();
  wrapper.style('margin', '40px 0 0 40px'); 
  wrapper.style('position', 'relative');
  wrapper.style('width', '720px');
  wrapper.style('height', '420px');
  wrapper.style('background-color', '#f8f9fa');
  wrapper.style('border', '1px solid #dee2e6');
  wrapper.style('box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
  wrapper.parent(mainEl);

  canvas = createCanvas(720, 420);
  canvas.parent(wrapper);
  
  let controlX = 500;
  let startY = 60;
  let spacing = 65;
  
  typeSelect = createSelect();
  typeSelect.parent(wrapper);
  typeSelect.position(controlX, startY);
  typeSelect.option('Button');
  typeSelect.option('Slider');
  typeSelect.option('Text Input');
  typeSelect.option('Checkbox');
  typeSelect.option('Heading');
  typeSelect.changed(createNewTarget);
  controls.push({el: typeSelect, label: 'DOM Element Type'});
  
  xSlider = createSlider(0, 480, 100);
  xSlider.parent(wrapper);
  xSlider.position(controlX, startY + spacing);
  controls.push({el: xSlider, label: 'X Position (relative to parent)'});
  
  ySlider = createSlider(0, 400, 100);
  ySlider.parent(wrapper);
  ySlider.position(controlX, startY + spacing * 2);
  controls.push({el: ySlider, label: 'Y Position (relative to parent)'});
  
  styleInput = createInput('background: #ffcc00; padding: 10px; border-radius: 8px;');
  styleInput.parent(wrapper);
  styleInput.position(controlX, startY + spacing * 3);
  styleInput.size(180);
  styleInput.input(updateStyle);
  controls.push({el: styleInput, label: 'CSS Style Injector'});
  
  parentToggle = createCheckbox(' Parent to Canvas Wrapper', true);
  parentToggle.parent(wrapper);
  parentToggle.position(controlX, startY + spacing * 4);
  parentToggle.changed(updateParent);
  controls.push({el: parentToggle, label: 'DOM Hierarchy'});
  
  createNewTarget();
}

function draw() {
  background(255);
  
  // Draw layout boundary for target area vs controls
  noStroke();
  fill(245);
  rect(480, 0, 240, height);
  
  stroke(200);
  strokeWeight(2);
  line(480, 0, 480, height);
  
  // Title
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  text("Control Panel", 500, 15);
  
  // Draw labels for controls
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
  text("Canvas Area\n(0, 0) is top-left of this box", 240, height/2);
  
  // Update Target Element Position
  if (targetElement) {
    targetElement.position(xSlider.value(), ySlider.value());
  }
  
  // Draw a crosshair where the element is being placed relative to canvas
  let tx = xSlider.value();
  let ty = ySlider.value();
  
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
