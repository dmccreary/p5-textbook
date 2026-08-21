/* Interactive Image Gallery Filter MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-image-gallery-filter/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let tagSelect, sortSelect;
let galleryItems = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  galleryItems = [
    { title: 'Neon Vortex', tag: 'Generative', color: [240, 50, 100], stars: 5 },
    { title: 'Forest Fractal', tag: 'Nature', color: [40, 180, 80], stars: 4 },
    { title: 'Geometric Grid', tag: 'Minimal', color: [60, 120, 220], stars: 3 },
    { title: 'Ocean Waves', tag: 'Nature', color: [30, 190, 230], stars: 5 },
    { title: 'Solar Flares', tag: 'Generative', color: [255, 140, 20], stars: 4 },
    { title: 'Monochrome Poly', tag: 'Minimal', color: [100, 110, 120], stars: 4 }
  ];

  tagSelect = createSelect();
  tagSelect.option('All Categories');
  tagSelect.option('Generative');
  tagSelect.option('Nature');
  tagSelect.option('Minimal');

  sortSelect = createSelect();
  sortSelect.option('Default Order');
  sortSelect.option('Sort by Stars (High-Low)');

  positionControls();
  describe('Interactive art gallery filter with categories and rating sort.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  tagSelect.position(col1L, drawHeight + 15);
  tagSelect.size(w);

  sortSelect.position(col2L, drawHeight + 15);
  sortSelect.size(w);
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
  text('Interactive Image Gallery Filter', canvasWidth / 2, 12);

  // Filter Items
  let selTag = tagSelect.value();
  let selSort = sortSelect.value();

  let filtered = galleryItems.filter(item => {
    if (selTag === 'All Categories') return true;
    return item.tag === selTag;
  });

  if (selSort.includes('Stars')) {
    filtered.sort((a, b) => b.stars - a.stars);
  }

  // Draw Grid of Cards (3 cols x 2 rows)
  let cols = 3;
  let cardW = (canvasWidth - 80) / cols;
  let cardH = 120;
  let startX = 30;
  let startY = 60;

  for (let i = 0; i < filtered.length; i++) {
    let r = Math.floor(i / cols);
    let c = i % cols;
    let x = startX + c * (cardW + 10);
    let y = startY + r * (cardH + 15);

    let it = filtered[i];

    // Card background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, cardW, cardH, 6);

    // Color Swatch Art Preview
    fill(it.color[0], it.color[1], it.color[2]);
    noStroke();
    rect(x + 8, y + 8, cardW - 16, 50, 4);

    // Title
    fill(30);
    textSize(11);
    textAlign(LEFT, TOP);
    text(it.title, x + 8, y + 64);

    // Tag Badge
    fill(235, 240, 250);
    stroke(180, 200, 240);
    rect(x + 8, y + 80, 55, 16, 8);
    fill(40, 80, 180);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(it.tag, x + 35, y + 88);

    // Star rating
    fill(240, 160, 0);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text('★'.repeat(it.stars), x + cardW - 8, y + 88);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text(`Showing ${filtered.length} of ${galleryItems.length} gallery artworks.`, canvasWidth / 2, drawHeight + 52);
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
