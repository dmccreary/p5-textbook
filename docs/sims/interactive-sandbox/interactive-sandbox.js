/* Interactive Sandbox MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/interactive-sandbox/
*/
// CANVAS_HEIGHT: 552

let eventLog = [];
let maxLogSize = 11;
let drawingLayer;

let clearBtn;
let touchSimToggle;

let interactArea = {x: 10, y: 10, w: 520, h: 532};
let panelArea = {x: 540, y: 10, w: 250, h: 532};

function setup() {
  createCanvas(windowWidth, 552);
  updateLayout();
  
  drawingLayer = createGraphics(interactArea.w, interactArea.h);
  drawingLayer.background(250);
  
  clearBtn = createButton('Clear Events & Canvas');
  clearBtn.style('padding', '10px');
  clearBtn.style('width', '230px');
  clearBtn.style('cursor', 'pointer');
  clearBtn.style('font-weight', 'bold');
  clearBtn.mousePressed(clearAll);
  
  touchSimToggle = createCheckbox(' Simulate Touch Input', false);
  touchSimToggle.style('font-family', 'sans-serif');
  touchSimToggle.style('font-size', '14px');
  
  positionDOM();
  
  textFont('monospace');
}

function updateLayout() {
  let margin = 10;
  let gap = 10;
  let pWidth = 250;
  
  panelArea.x = width - margin - pWidth;
  panelArea.y = margin;
  panelArea.w = pWidth;
  panelArea.h = 532;
  
  interactArea.x = margin;
  interactArea.y = margin;
  interactArea.w = panelArea.x - gap - margin;
  interactArea.h = 532;
  
  if (interactArea.w < 100) interactArea.w = 100; 
}

function positionDOM() {
  clearBtn.position(panelArea.x + 10, panelArea.y + 480);
  touchSimToggle.position(panelArea.x + 10, panelArea.y + 440);
}

function windowResized() {
  resizeCanvas(windowWidth, 552);
  updateLayout();
  
  let newLayer = createGraphics(interactArea.w, interactArea.h);
  newLayer.background(250);
  newLayer.image(drawingLayer, 0, 0);
  drawingLayer = newLayer;
  
  positionDOM();
}

function clearAll() {
  eventLog = [];
  drawingLayer.background(250);
}

function logEvent(msg) {
  eventLog.push(msg);
  if (eventLog.length > maxLogSize) {
    eventLog.shift();
  }
}

function draw() {
  background(230);


  push();
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text("Interactive Sandbox", width / 2, 10);
  pop();

  
  // 1. Draw Interactive Area
  fill(255);
  stroke(180);
  rect(interactArea.x, interactArea.y, interactArea.w, interactArea.h, 4);
  
  image(drawingLayer, interactArea.x, interactArea.y);
  
  // 2. Draw user cursors / touch points
  let inArea = mouseInArea();
  let isSimTouch = touchSimToggle.checked();
  
  if (inArea) {
    if (isSimTouch) {
      if (mouseIsPressed) {
        fill(0, 150, 255, 80);
        noStroke();
        circle(mouseX, mouseY, 60);
        fill(0, 150, 255);
        circle(mouseX, mouseY, 10);
        
        drawingLayer.noStroke();
        drawingLayer.fill(0, 150, 255, 30);
        drawingLayer.circle(mouseX - interactArea.x, mouseY - interactArea.y, 20);
      } else {
        fill(0, 150, 255, 40);
        noStroke();
        circle(mouseX, mouseY, 30);
      }
    } else {
      // Standard mouse
      noFill();
      stroke(255, 0, 0, 100);
      line(mouseX, interactArea.y, mouseX, interactArea.y + interactArea.h);
      line(interactArea.x, mouseY, interactArea.x + interactArea.w, mouseY);
      
      fill(255, 0, 0);
      noStroke();
      circle(mouseX, mouseY, 6);
      
      if (mouseIsPressed) {
        drawingLayer.stroke(0, 120);
        drawingLayer.strokeWeight(3);
        let px = pmouseX - interactArea.x;
        let py = pmouseY - interactArea.y;
        let cx = mouseX - interactArea.x;
        let cy = mouseY - interactArea.y;
        if (px >= 0 && px <= interactArea.w && py >= 0 && py <= interactArea.h) {
          drawingLayer.line(px, py, cx, cy);
        }
      }
    }
  }

  // Draw actual touch points if on mobile/touch device
  if (touches.length > 0 && !isSimTouch) {
    for (let i = 0; i < touches.length; i++) {
      let tx = touches[i].x;
      let ty = touches[i].y;
      fill(0, 200, 100, 100);
      noStroke();
      circle(tx, ty, 50);
      fill(0, 100, 50);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(`T${i}`, tx, ty);
    }
  }

  // 3. Draw Side Panel
  fill(245);
  stroke(180);
  rect(panelArea.x, panelArea.y, panelArea.w, panelArea.h, 4);
  
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  let px = panelArea.x + 15;
  let py = panelArea.y + 15;
  
  textSize(14);
  textStyle(BOLD);
  text("System Variables", px, py);
  textStyle(NORMAL);
  textSize(13);
  py += 25;
  
  let tLen = isSimTouch && mouseIsPressed && inArea ? 1 : touches.length;
  let dispKey = key;
  if (dispKey === ' ') dispKey = 'Space';
  else if (dispKey === '') dispKey = 'None';

  text(`mouseX:         ${mouseX}`, px, py); py += 18;
  text(`mouseY:         ${mouseY}`, px, py); py += 18;
  text(`pmouseX:        ${pmouseX}`, px, py); py += 18;
  text(`pmouseY:        ${pmouseY}`, px, py); py += 18;
  text(`mouseIsPressed: ${mouseIsPressed}`, px, py); py += 26;

  text(`key:            ${dispKey}`, px, py); py += 18;
  text(`keyCode:        ${keyCode}`, px, py); py += 18;
  text(`keyIsPressed:   ${keyIsPressed}`, px, py); py += 26;

  text(`touches.length: ${tLen}`, px, py); py += 30;

  // Event Logger
  textSize(14);
  textStyle(BOLD);
  text("Event Logger", px, py);
  textStyle(NORMAL);
  textSize(12);
  py += 22;
  
  fill(50);
  for (let i = 0; i < eventLog.length; i++) {
    text(eventLog[i], px, py);
    py += 16;
  }
}

function mouseInArea() {
  return mouseX >= interactArea.x && mouseX <= interactArea.x + interactArea.w &&
         mouseY >= interactArea.y && mouseY <= interactArea.y + interactArea.h;
}

// --- Event Handlers ---

function mousePressed() {
  if (mouseInArea()) {
    if (touchSimToggle.checked()) {
      logEvent(`touchStarted(sim) -> [${mouseX}, ${mouseY}]`);
    } else {
      logEvent(`mousePressed() -> [${mouseX}, ${mouseY}]`);
    }
  }
}

function mouseReleased() {
  if (mouseInArea() || (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height)) {
    if (touchSimToggle.checked()) {
      logEvent(`touchEnded(sim)`);
    } else {
      logEvent(`mouseReleased()`);
    }
  }
}

function mouseDragged() {
  if (mouseInArea() && frameCount % 6 === 0) {
    if (touchSimToggle.checked()) {
      logEvent(`touchMoved(sim) -> [${mouseX}, ${mouseY}]`);
    } else {
      logEvent(`mouseDragged() -> [${mouseX}, ${mouseY}]`);
    }
  }
}

function mouseMoved() {
  if (mouseInArea() && frameCount % 30 === 0) { // Sparse logging to not flood
    if (!touchSimToggle.checked()) {
      logEvent(`mouseMoved()`);
    }
  }
}

function doubleClicked() {
  if (mouseInArea()) {
    logEvent(`doubleClicked()`);
  }
}

function mouseWheel(event) {
  if (mouseInArea()) {
    let d = event.delta > 0 ? "+" + event.delta : event.delta;
    logEvent(`mouseWheel(delta: ${d})`);
  }
}

function keyPressed() {
  let k = key === ' ' ? 'Space' : key;
  logEvent(`keyPressed('${k}')`);
  
  if (keyCode === 32 || (keyCode >= 37 && keyCode <= 40)) {
    return false; // Prevent scrolling when pressing space/arrows
  }
}

function keyReleased() {
  let k = key === ' ' ? 'Space' : key;
  logEvent(`keyReleased('${k}')`);
}

function touchStarted() {
  if (!touchSimToggle.checked() && touches.length > 0) {
    logEvent(`touchStarted(${touches.length} pts)`);
  }
}

function touchMoved() {
  if (mouseInArea()) {
    if (!touchSimToggle.checked() && touches.length > 0 && frameCount % 6 === 0) {
      logEvent(`touchMoved(${touches.length} pts)`);
    }
    return false; // Prevent default scrolling
  }
}

function touchEnded() {
  if (!touchSimToggle.checked()) {
    logEvent(`touchEnded()`);
  }
}
