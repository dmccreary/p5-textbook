/* The Color Compass MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-color-compass/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let brightSlider, harmonySelect;
let selectedHue = 0, selectedSat = 80;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  brightSlider = createSlider(0, 100, 90, 5);
  harmonySelect = createSelect();
  harmonySelect.option('Single Color');
  harmonySelect.option('Complementary (180°)');
  harmonySelect.option('Triadic (120°)');

  positionControls();
  describe('HSB color wheel compass navigating hue angles and saturation radii.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  harmonySelect.position(col1L, drawHeight + 15);
  harmonySelect.size(w);

  brightSlider.position(col2L, drawHeight + 45);
  brightSlider.size(w);
}

function draw() {
  updateCanvasSize();
  colorMode(HSB, 360, 100, 100);

  // Drawing Region
  fill(240, 10, 98);
  stroke(0, 0, 80);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill(0, 0, 0);
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('The Color Compass (HSB Wheel)', canvasWidth / 2, 12);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let maxR = 120;
  let br = brightSlider.value();

  // Draw HSB Color Wheel
  for (let angle = 0; angle < 360; angle += 4) {
    let rad = radians(angle);
    for (let r = 10; r <= maxR; r += 10) {
      let sat = map(r, 0, maxR, 0, 100);
      fill(angle, sat, br);
      noStroke();
      circle(cx + r * cos(rad), cy + r * sin(rad), 14);
    }
  }

  // Handle Mouse Interaction on Wheel
  if (mouseIsPressed && mouseY < drawHeight && dist(mouseX, mouseY, cx, cy) <= maxR) {
    let dx = mouseX - cx;
    let dy = mouseY - cy;
    selectedHue = (Math.round(degrees(atan2(dy, dx))) + 360) % 360;
    selectedSat = Math.round(map(dist(mouseX, mouseY, cx, cy), 0, maxR, 0, 100));
  }

  // Draw Selected Color Marker
  let selRad = radians(selectedHue);
  let selDist = map(selectedSat, 0, 100, 0, maxR);
  let selX = cx + selDist * cos(selRad);
  let selY = cy + selDist * sin(selRad);

  stroke(0, 0, 100);
  strokeWeight(3);
  fill(selectedHue, selectedSat, br);
  circle(selX, selY, 18);

  // Color Harmony Markers
  let harm = harmonySelect.value();
  if (harm.startsWith('Complementary')) {
    let compHue = (selectedHue + 180) % 360;
    let compX = cx + selDist * cos(radians(compHue));
    let compY = cy + selDist * sin(radians(compHue));
    stroke(0, 0, 100);
    fill(compHue, selectedSat, br);
    circle(compX, compY, 18);
  } else if (harm.startsWith('Triadic')) {
    let h2 = (selectedHue + 120) % 360;
    let h3 = (selectedHue + 240) % 360;
    fill(h2, selectedSat, br);
    circle(cx + selDist * cos(radians(h2)), cy + selDist * sin(radians(h2)), 18);
    fill(h3, selectedSat, br);
    circle(cx + selDist * cos(radians(h3)), cy + selDist * sin(radians(h3)), 18);
  }

  // Selected Readout Card
  colorMode(RGB, 255);
  fill(255);
  stroke(200);
  rect(cx - 100, drawHeight - 35, 200, 26, 6);
  fill(0);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text(`HSB(${selectedHue}°, ${selectedSat}%, ${br}%)`, cx, drawHeight - 22);

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Brightness: ${br}%`, canvasWidth / 2 + 15, drawHeight + 25);
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
