/* Responsive Dashboard Builder MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/responsive-dashboard-builder/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let previewWidthSlider, widgetCountSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  previewWidthSlider = createSlider(240, 500, 380, 10);
  widgetCountSlider = createSlider(2, 6, 4, 1);

  positionControls();
  describe('Responsive dashboard UI card grid adjusting column counts to simulated device width.', FALLBACK);
}

function positionControls() {
  let col1L = 100;
  let col2L = canvasWidth / 2 + 100;
  let w = canvasWidth / 2 - 120;
  if (w < 50) w = 50;

  previewWidthSlider.position(col1L, drawHeight + 15);
  previewWidthSlider.size(w);

  widgetCountSlider.position(col2L, drawHeight + 15);
  widgetCountSlider.size(w);
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
  text('Responsive Dashboard Builder', canvasWidth / 2, 12);

  let pWidth = Math.min(previewWidthSlider.value(), canvasWidth - 40);
  let numWidgets = widgetCountSlider.value();

  // Determine responsive columns based on viewport breakpoint
  let cols = 1;
  let deviceName = 'Mobile (< 320px)';
  if (pWidth > 420) {
    cols = 3;
    deviceName = 'Desktop (> 420px)';
  } else if (pWidth > 300) {
    cols = 2;
    deviceName = 'Tablet (300px - 420px)';
  }

  // Simulated Device Viewport Frame
  let frameX = (canvasWidth - pWidth) / 2;
  let frameY = 55;
  let frameH = drawHeight - 80;

  fill(250);
  stroke(100, 140, 220);
  strokeWeight(2);
  rect(frameX, frameY, pWidth, frameH, 8);

  // Device Header
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text(`${deviceName} — Width: ${Math.round(pWidth)}px | Grid: ${cols} Col`, canvasWidth / 2, frameY + 8);

  // Render Widget Cards
  let cardMargin = 8;
  let cardW = (pWidth - (cols + 1) * cardMargin) / cols;
  let cardH = 70;
  let startX = frameX + cardMargin;
  let startY = frameY + 30;

  let colors = [
    color(70, 130, 240),
    color(50, 180, 100),
    color(240, 140, 30),
    color(180, 80, 220),
    color(220, 50, 80),
    color(40, 190, 210)
  ];

  for (let i = 0; i < numWidgets; i++) {
    let r = Math.floor(i / cols);
    let c = i % cols;
    let x = startX + c * (cardW + cardMargin);
    let y = startY + r * (cardH + cardMargin);

    if (y + cardH < frameY + frameH) {
      fill(255);
      stroke(210);
      strokeWeight(1);
      rect(x, y, cardW, cardH, 6);

      // Card header bar
      fill(colors[i % colors.length]);
      noStroke();
      rect(x, y, cardW, 8, 6, 6, 0, 0);

      fill(40);
      textSize(11);
      textAlign(LEFT, TOP);
      text(`Widget #${i + 1}`, x + 8, y + 14);

      fill(120);
      textSize(9);
      text(`Metric: ${i * 42 + 88} units`, x + 8, y + 32);
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
  text(`Width: ${pWidth}px`, 15, drawHeight + 25);
  text(`Widgets: ${numWidgets}`, canvasWidth / 2 + 15, drawHeight + 25);
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
