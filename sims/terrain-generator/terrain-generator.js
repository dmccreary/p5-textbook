/* Terrain Generator MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/terrain-generator/
*/
// CANVAS_HEIGHT: 550

let algRadio, dimRadio;
let scaleSlider, octSlider, fallSlider;
let scaleVal, octVal, fallVal;
let resetBtn;
let seed = 12345;
let lastState = '';

function windowResized() {
  resizeCanvas(windowWidth, 400);
  lastState = ''; // trigger render
}

function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent(document.querySelector('main'));
  
  // Create UI container
  let ui = createDiv();
  ui.style('display', 'flex');
  ui.style('flex-wrap', 'wrap');
  ui.style('gap', '20px');
  ui.style('padding', '10px');
  ui.style('background', '#f8f9fa');
  ui.style('border', '1px solid #dee2e6');
  ui.style('border-radius', '4px');
  ui.style('font-family', 'sans-serif');
  ui.style('font-size', '14px');
  ui.style('width', 'calc(100% - 22px)'); // 600 - border - padding
  ui.parent(document.querySelector('main'));

  // Algorithm
  let algDiv = createDiv('<strong>Algorithm</strong><br/>');
  algDiv.parent(ui);
  algRadio = createRadio();
  algRadio.option('Random');
  algRadio.option('Noise');
  algRadio.selected('Noise');
  algRadio.parent(algDiv);
  
  // Dimension
  let dimDiv = createDiv('<strong>Dimension</strong><br/>');
  dimDiv.parent(ui);
  dimRadio = createRadio();
  dimRadio.option('1D');
  dimRadio.option('2D');
  dimRadio.selected('1D');
  dimRadio.parent(dimDiv);

  // Parameters
  let paramDiv = createDiv();
  paramDiv.style('display', 'flex');
  paramDiv.style('flex-direction', 'column');
  paramDiv.style('gap', '5px');
  paramDiv.parent(ui);

  // Scale
  let scaleDiv = createDiv();
  scaleDiv.parent(paramDiv);
  scaleDiv.html('<span style="display:inline-block; width:100px;">Noise Scale: </span>');
  scaleSlider = createSlider(0.001, 0.1, 0.02, 0.001);
  scaleSlider.parent(scaleDiv);
  scaleVal = createSpan('0.02');
  scaleVal.style('margin-left', '10px');
  scaleVal.parent(scaleDiv);

  // Octaves
  let octDiv = createDiv();
  octDiv.parent(paramDiv);
  octDiv.html('<span style="display:inline-block; width:100px;">Octaves: </span>');
  octSlider = createSlider(1, 8, 4, 1);
  octSlider.parent(octDiv);
  octVal = createSpan('4');
  octVal.style('margin-left', '10px');
  octVal.parent(octDiv);

  // Falloff
  let fallDiv = createDiv();
  fallDiv.parent(paramDiv);
  fallDiv.html('<span style="display:inline-block; width:100px;">Falloff: </span>');
  fallSlider = createSlider(0, 1, 0.5, 0.05);
  fallSlider.parent(fallDiv);
  fallVal = createSpan('0.5');
  fallVal.style('margin-left', '10px');
  fallVal.parent(fallDiv);

  // Reset
  let btnDiv = createDiv();
  btnDiv.style('display', 'flex');
  btnDiv.style('align-items', 'center');
  btnDiv.parent(ui);
  resetBtn = createButton('Reset Seed');
  resetBtn.style('padding', '5px 10px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.parent(btnDiv);
  resetBtn.mousePressed(() => {
    seed = floor(random(10000));
  });

  noiseSeed(seed);
  randomSeed(seed);
}

function draw() {
  let scaleValStr = scaleSlider.value().toFixed(3);
  let octValStr = octSlider.value().toString();
  let fallValStr = fallSlider.value().toFixed(2);

  scaleVal.html(scaleValStr);
  octVal.html(octValStr);
  fallVal.html(fallValStr);

  let currentState = `${algRadio.value()}_${dimRadio.value()}_${scaleValStr}_${octValStr}_${fallValStr}_${seed}`;
  
  if (currentState !== lastState) {
    noiseSeed(seed);
    randomSeed(seed);
    renderTerrain();
    lastState = currentState;
  }
}

function renderTerrain() {
  background(135, 206, 235);


  push();
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Terrain Generator", width / 2, 10);
  pop();
 // Sky blue background
  
  let isNoise = algRadio.value() === 'Noise';
  let is2D = dimRadio.value() === '2D';
  
  noiseDetail(octSlider.value(), fallSlider.value());
  
  if (is2D) {
    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let val;
        if (isNoise) {
          let nx = x * scaleSlider.value();
          let ny = y * scaleSlider.value();
          val = noise(nx, ny) * 255;
        } else {
          val = random(255);
        }
        
        let c = getTerrainColor(val);
        let index = (x + y * width) * 4;
        pixels[index] = red(c);
        pixels[index + 1] = green(c);
        pixels[index + 2] = blue(c);
        pixels[index + 3] = 255;
      }
    }
    updatePixels();
  } else {
    // 1D View
    noStroke();
    fill(60, 150, 60); // Grass green
    
    beginShape();
    vertex(0, height); // bottom left
    for (let x = 0; x <= width; x++) {
      let val;
      if (isNoise) {
        let nx = x * scaleSlider.value();
        // Shift noise to center around height/2
        val = noise(nx) * height; 
      } else {
        val = random(height);
      }
      
      // We want the landscape to be at the bottom
      // val is the height of the terrain, so we map it appropriately
      // noise goes 0 to 1, val is 0 to height. We want y to be height - val (or similar)
      // Actually, noise(x) tends to hover around 0.5. 
      let y = height - (val * 0.8) - 20; // 0.8 so it doesn't always touch the very top
      
      vertex(x, y);
    }
    vertex(width, height); // bottom right
    endShape(CLOSE);
  }
}

function getTerrainColor(val) {
  if (val < 80) return color(20, 60, 150); // Deep water
  if (val < 110) return color(40, 100, 200); // Shallow water
  if (val < 130) return color(210, 190, 130); // Sand
  if (val < 170) return color(60, 150, 60); // Grass
  if (val < 210) return color(100, 100, 100); // Rock
  return color(240, 240, 255); // Snow
}
