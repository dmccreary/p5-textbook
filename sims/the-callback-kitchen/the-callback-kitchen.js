/* The Callback Kitchen MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/the-callback-kitchen/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let chopButton, boilButton, bakeButton;
let tasks = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  chopButton = createButton('chopOnions(callback)');
  chopButton.mousePressed(() => startKitchenTask('Chop Onions', 120, () => '🧅 Onions Chopped!'));

  boilButton = createButton('boilWater(callback)');
  boilButton.mousePressed(() => startKitchenTask('Boil Water', 180, () => '♨ Water Boiling!'));

  bakeButton = createButton('bakeCake(callback)');
  bakeButton.mousePressed(() => startKitchenTask('Bake Cake', 240, () => '🎂 Cake Ready!'));

  positionControls();
  describe('Kitchen metaphor visualizer explaining asynchronous callback functions.', FALLBACK);
}

function startKitchenTask(name, duration, cb) {
  tasks.push({
    name: name,
    duration: duration,
    progress: 0,
    callback: cb,
    completed: false,
    msg: ''
  });
}

function positionControls() {
  let colW = (canvasWidth - 40) / 3;
  chopButton.position(15, drawHeight + 25);
  chopButton.size(colW);

  boilButton.position(15 + colW + 5, drawHeight + 25);
  boilButton.size(colW);

  bakeButton.position(15 + (colW + 5) * 2, drawHeight + 25);
  bakeButton.size(colW);
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
  text('The Callback Kitchen (Async Tasks)', canvasWidth / 2, 12);

  // Active Kitchen Task Cards
  let cardW = canvasWidth - 60;
  let cardH = 55;
  let startY = 60;

  if (tasks.length === 0) {
    fill(120);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Kitchen is idle. Click a task button below to trigger an async callback!', canvasWidth / 2, drawHeight / 2);
  }

  for (let i = 0; i < tasks.length; i++) {
    let t = tasks[i];
    let y = startY + i * (cardH + 12);

    if (!t.completed) {
      t.progress++;
      if (t.progress >= t.duration) {
        t.completed = true;
        t.msg = t.callback(); // Execute callback!
      }
    }

    fill(255);
    stroke(200);
    rect(30, y, cardW, cardH, 6);

    // Progress bar
    let pct = constrain(t.progress / t.duration, 0, 1);
    fill(t.completed ? color(40, 180, 80) : color(70, 130, 240));
    noStroke();
    rect(32, y + cardH - 10, (cardW - 4) * pct, 8, 0, 0, 4, 4);

    fill(0);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(t.completed ? `✅ ${t.msg}` : `⏳ ${t.name}... (${Math.round(pct * 100)}%)`, 45, y + 20);
  }

  // Limit tasks on screen
  if (tasks.length > 4) tasks.shift();

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Tasks run concurrently without blocking the UI thread until callback fires.', canvasWidth / 2, drawHeight + 58);
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
