/**
 * MicroSim: 3D Scene Editor
 * Primary Learning Domain: 3D WebGL Graphics (WEBGL)
 * Educational Purpose: To introduce the WebGL rendering context, 3D primitives, camera controls, and lighting models.
 */

// CANVAS_HEIGHT: 600

let shapeSelect, materialSelect, lightSelect;
let lightXSlider, lightYSlider, lightZSlider;
let uiContainer;
let drawHeight = 400;

function setup() {
  let canvas = createCanvas(windowWidth, drawHeight, WEBGL);
  pixelDensity(1);

  
  // Prevent context menu on right click for better orbit control
  document.oncontextmenu = () => false;

  // UI Container
  uiContainer = createDiv();
  uiContainer.style('background', '#f5f5f5');
  uiContainer.style('padding', '15px');
  uiContainer.style('font-family', 'sans-serif');
  uiContainer.style('display', 'flex');
  uiContainer.style('flex-direction', 'row');
  uiContainer.style('flex-wrap', 'wrap');
  uiContainer.style('gap', '20px');
  uiContainer.style('box-sizing', 'border-box');
  uiContainer.style('width', '100%');
  uiContainer.style('border-top', '2px solid #ddd');

  // Left column: Dropdowns
  let leftCol = createDiv();
  leftCol.style('display', 'flex');
  leftCol.style('flex-direction', 'column');
  leftCol.style('gap', '10px');
  leftCol.style('min-width', '200px');
  leftCol.parent(uiContainer);

  // Shape Selection
  let shapeDiv = createDiv('<label style="font-size: 0.9em; color: #333; font-weight: bold;">Shape Primitive:</label><br>');
  shapeSelect = createSelect();
  shapeSelect.style('width', '100%');
  shapeSelect.style('margin-top', '3px');
  shapeSelect.option('Box');
  shapeSelect.option('Sphere');
  shapeSelect.option('Torus');
  shapeSelect.parent(shapeDiv);
  shapeDiv.parent(leftCol);

  // Material Selection
  let matDiv = createDiv('<label style="font-size: 0.9em; color: #333; font-weight: bold;">Material Type:</label><br>');
  materialSelect = createSelect();
  materialSelect.style('width', '100%');
  materialSelect.style('margin-top', '3px');
  materialSelect.option('Basic (fill)');
  materialSelect.option('Normal (normalMaterial)');
  materialSelect.option('Ambient (ambientMaterial)');
  materialSelect.option('Specular (specularMaterial)');
  materialSelect.parent(matDiv);
  matDiv.parent(leftCol);

  // Light Selection
  let lightDiv = createDiv('<label style="font-size: 0.9em; color: #333; font-weight: bold;">Light Source:</label><br>');
  lightSelect = createSelect();
  lightSelect.style('width', '100%');
  lightSelect.style('margin-top', '3px');
  lightSelect.option('Ambient Light');
  lightSelect.option('Directional Light');
  lightSelect.option('Point Light');
  lightSelect.option('Spot Light');
  lightSelect.parent(lightDiv);
  lightDiv.parent(leftCol);

  // Right column: Sliders and info
  let rightCol = createDiv();
  rightCol.style('display', 'flex');
  rightCol.style('flex-direction', 'column');
  rightCol.style('gap', '10px');
  rightCol.style('flex-grow', '1');
  rightCol.style('min-width', '200px');
  rightCol.parent(uiContainer);

  let slidersTitle = createDiv('<strong style="font-size: 0.9em; color: #333;">Light Position:</strong>');
  slidersTitle.parent(rightCol);

  let slidersRow = createDiv();
  slidersRow.style('display', 'flex');
  slidersRow.style('gap', '15px');
  slidersRow.style('flex-wrap', 'wrap');
  slidersRow.parent(rightCol);

  let lxDiv = createDiv('<label style="font-size: 0.8em; color: #555; display:block;">X Position:</label>');
  lightXSlider = createSlider(-400, 400, 150);
  lightXSlider.style('width', '120px');
  lightXSlider.parent(lxDiv);
  lxDiv.parent(slidersRow);

  let lyDiv = createDiv('<label style="font-size: 0.8em; color: #555; display:block;">Y Position:</label>');
  lightYSlider = createSlider(-400, 400, -150);
  lightYSlider.style('width', '120px');
  lightYSlider.parent(lyDiv);
  lyDiv.parent(slidersRow);

  let lzDiv = createDiv('<label style="font-size: 0.8em; color: #555; display:block;">Z Depth:</label>');
  lightZSlider = createSlider(-400, 400, 150);
  lightZSlider.style('width', '120px');
  lightZSlider.parent(lzDiv);
  lzDiv.parent(slidersRow);
  
  let instructions = createDiv('<em>Left-click & drag to orbit. Scroll to zoom.</em>');
  instructions.style('font-size', '0.85em');
  instructions.style('color', '#666');
  instructions.style('margin-top', 'auto');
  instructions.parent(rightCol);
}

function draw() {
  background(30);

  // Enable mouse controls for camera
  orbitControl(2, 2, 0.1);

  let matType = materialSelect.value();
  let lightType = lightSelect.value();
  
  let lx = lightXSlider.value();
  let ly = lightYSlider.value();
  let lz = lightZSlider.value();

  // Basic dim ambient light so the scene isn't completely black in shadows
  ambientLight(40); 

  // Setup chosen light source
  if (lightType === 'Ambient Light') {
    ambientLight(255, 255, 255);
  } else if (lightType === 'Directional Light') {
    directionalLight(255, 255, 255, -lx, -ly, -lz);
  } else if (lightType === 'Point Light') {
    pointLight(255, 255, 255, lx, ly, lz);
  } else if (lightType === 'Spot Light') {
    spotLight(255, 255, 255, lx, ly, lz, -lx, -ly, -lz, Math.PI / 4, 10);
  }

  // Draw light source representation
  if (lightType !== 'Ambient Light') {
    push();
    translate(lx, ly, lz);
    noStroke();
    emissiveMaterial(255, 255, 0); // Emit yellow color
    sphere(8, 16, 16);
    pop();
    
    if (lightType === 'Directional Light' || lightType === 'Spot Light') {
      push();
      stroke(255, 255, 0, 100);
      strokeWeight(1);
      line(0, 0, 0, lx, ly, lz);
      pop();
    }
  }

  // Set Material
  noStroke(); // Remove wireframes for better lighting visualization
  let r = 250, g = 100, b = 100; // Base color

  if (matType === 'Basic (fill)') {
    fill(r, g, b);
  } else if (matType === 'Normal (normalMaterial)') {
    normalMaterial();
  } else if (matType === 'Ambient (ambientMaterial)') {
    ambientMaterial(r, g, b);
  } else if (matType === 'Specular (specularMaterial)') {
    specularMaterial(r, g, b);
    shininess(50); // Make it shiny
  }

  // Draw the selected 3D Primitive
  let shape = shapeSelect.value();
  if (shape === 'Box') {
    box(120);
  } else if (shape === 'Sphere') {
    sphere(90, 64, 64);
  } else if (shape === 'Torus') {
    torus(70, 30, 64, 64);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, drawHeight);
}
