/* Async Data Fetcher MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/async-data-fetcher/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let fetchButton, failCheckbox, latencySlider;
let state = 'IDLE'; // IDLE, PENDING, FULFILLED, REJECTED
let packetX = 0;
let packetTarget = 0;
let packetDir = 1; // 1: client->server, 2: server->client
let progress = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  fetchButton = createButton('fetch("api/data")');
  fetchButton.mousePressed(startFetch);

  failCheckbox = createCheckbox('Simulate Error 500', false);
  latencySlider = createSlider(30, 150, 70, 5);

  positionControls();
  describe('Asynchronous network request visualizer showing Client, Server, and Promise states.', LABEL);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  fetchButton.position(col1L, drawHeight + 10);
  fetchButton.size(w);

  failCheckbox.position(col2L, drawHeight + 10);

  latencySlider.position(col2L, drawHeight + 45);
  latencySlider.size(w);
}

function startFetch() {
  if (state === 'PENDING') return;
  state = 'PENDING';
  packetDir = 1;
  progress = 0;
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
  text('Async Data Fetcher & Promises', canvasWidth / 2, 12);

  let clientX = 80;
  let serverX = canvasWidth - 80;
  let midY = 160;

  // Draw Client Box
  fill(255);
  stroke(80, 120, 200);
  strokeWeight(2);
  rect(clientX - 55, midY - 45, 110, 90, 8);
  fill(30);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Client Browser\n(p5.js Sketch)', clientX, midY);

  // Draw Server Box
  fill(255);
  stroke(100, 180, 120);
  strokeWeight(2);
  rect(serverX - 55, midY - 45, 110, 90, 8);
  fill(30);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Web API Server\n(JSON Endpoint)', serverX, midY);

  // Network Wire
  stroke(180);
  strokeWeight(2);
  line(clientX + 55, midY, serverX - 55, midY);

  // Packet animation
  let totalSteps = latencySlider.value();
  if (state === 'PENDING') {
    progress++;
    let t = progress / totalSteps;
    if (packetDir === 1) {
      packetX = map(t, 0, 1, clientX + 55, serverX - 55);
      if (progress >= totalSteps) {
        packetDir = 2;
        progress = 0;
      }
    } else {
      packetX = map(t, 0, 1, serverX - 55, clientX + 55);
      if (progress >= totalSteps) {
        state = failCheckbox.checked() ? 'REJECTED' : 'FULFILLED';
      }
    }

    // Draw active traveling packet
    fill(packetDir === 1 ? 'dodgerblue' : (failCheckbox.checked() ? 'crimson' : 'limegreen'));
    noStroke();
    circle(packetX, midY, 16);
    fill(255);
    textSize(9);
    text(packetDir === 1 ? 'REQ' : 'RES', packetX, midY);
  }

  // Promise State Card
  let cardY = 275;
  let cardW = Math.min(canvasWidth - 60, 320);
  let cardX = (canvasWidth - cardW) / 2;

  fill(255);
  stroke(200);
  rect(cardX, cardY, cardW, 90, 8);

  fill(40);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  text('Promise Status:', cardX + 15, cardY + 12);

  // Status Badge
  let badgeColor = color(150);
  if (state === 'PENDING') badgeColor = color(240, 170, 0);
  else if (state === 'FULFILLED') badgeColor = color(40, 180, 80);
  else if (state === 'REJECTED') badgeColor = color(220, 50, 50);

  fill(badgeColor);
  rect(cardX + 125, cardY + 10, 100, 22, 11);
  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  text(state, cardX + 175, cardY + 21);

  // Description text
  fill(80);
  textSize(12);
  textAlign(LEFT, TOP);
  if (state === 'IDLE') {
    text('Press fetch() button below to issue async request.', cardX + 15, cardY + 45);
  } else if (state === 'PENDING') {
    text('Request in flight... UI thread remains unblocked!', cardX + 15, cardY + 45);
  } else if (state === 'FULFILLED') {
    text('Promise resolved with data: { status: 200, data: [...] }', cardX + 15, cardY + 45);
  } else if (state === 'REJECTED') {
    text('Promise rejected: Error: HTTP 500 Internal Error', cardX + 15, cardY + 45);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text(`Latency: ${latencySlider.value()} frames`, canvasWidth / 2 + 15, drawHeight + 55);
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
