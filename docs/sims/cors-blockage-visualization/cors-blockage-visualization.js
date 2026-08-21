/* CORS Blockage Visualization MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/cors-blockage-visualization/
*/
// CANVAS_HEIGHT: 485
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;

let corsToggleCheckbox, sendRequestButton;
let packetX = 0;
let isBlocked = false;
let animState = 'IDLE'; // IDLE, FLIGHT, RESOLVED
let animProgress = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  corsToggleCheckbox = createCheckbox('Enable CORS Header on Server', false);
  sendRequestButton = createButton('Send API Request');
  sendRequestButton.mousePressed(sendRequest);

  positionControls();
  describe('Visualizer demonstrating Cross-Origin Resource Sharing security checks and browser blockage.', FALLBACK);
}

function positionControls() {
  let col1L = 15;
  let col2L = canvasWidth / 2 + 15;
  let w = canvasWidth / 2 - 30;
  if (w < 80) w = 80;

  corsToggleCheckbox.position(col1L, drawHeight + 15);
  sendRequestButton.position(col2L, drawHeight + 45);
  sendRequestButton.size(w);
}

function sendRequest() {
  if (animState === 'FLIGHT') return;
  animState = 'FLIGHT';
  animProgress = 0;
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
  text('CORS Blockage Visualization', canvasWidth / 2, 12);

  let clientX = 85;
  let serverX = canvasWidth - 85;
  let midY = 150;

  // Origin 1: Client
  fill(255);
  stroke(60, 110, 200);
  strokeWeight(2);
  rect(clientX - 65, midY - 45, 130, 90, 8);
  fill(30);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  text('Origin: localhost:3000\n(Client App)', clientX, midY);

  // Origin 2: Server
  fill(255);
  stroke(200, 120, 40);
  strokeWeight(2);
  rect(serverX - 65, midY - 45, 130, 90, 8);
  fill(30);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  text('Origin: api.domain.com\n(Remote API)', serverX, midY);

  // Connection Bridge / Firewall
  let bridgeMidX = (clientX + serverX) / 2;
  stroke(180);
  strokeWeight(2);
  line(clientX + 65, midY, serverX - 65, midY);

  // Browser Security Gate
  let corsEnabled = corsToggleCheckbox.checked();
  fill(corsEnabled ? 50 : 220, corsEnabled ? 180 : 50, 50);
  rect(bridgeMidX - 10, midY - 35, 20, 70, 4);

  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text(corsEnabled ? 'ALLOW' : 'BLOCK', bridgeMidX, midY);

  // Request Animation
  if (animState === 'FLIGHT') {
    animProgress += 0.02;
    if (animProgress < 0.5) {
      packetX = map(animProgress, 0, 0.5, clientX + 65, bridgeMidX);
    } else {
      if (!corsEnabled) {
        animState = 'RESOLVED';
        isBlocked = true;
      } else {
        packetX = map(animProgress, 0.5, 1.0, bridgeMidX, serverX - 65);
        if (animProgress >= 1.0) {
          animState = 'RESOLVED';
          isBlocked = false;
        }
      }
    }

    fill(255, 180, 0);
    circle(packetX, midY, 16);
  }

  // Security Status Card
  let cardY = 255;
  let cardW = Math.min(canvasWidth - 50, 340);
  let cardX = (canvasWidth - cardW) / 2;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(cardX, cardY, cardW, 100, 8);

  fill(30);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Browser Security Log:', cardX + 15, cardY + 12);

  textSize(12);
  if (!corsEnabled) {
    fill(200, 30, 30);
    text('🚫 CORS Error: No Access-Control-Allow-Origin header\npresent on requested resource.', cardX + 15, cardY + 40);
    fill(80);
    text('The browser blocks the response to protect user data.', cardX + 15, cardY + 75);
  } else {
    fill(30, 160, 50);
    text('✅ Access-Control-Allow-Origin: * accepted.', cardX + 15, cardY + 40);
    fill(80);
    text('The browser successfully delivers the API response to p5.js.', cardX + 15, cardY + 65);
  }

  // Controls Region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);
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
