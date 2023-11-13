let bouncers = []
let colors = ['#FF5E76','#AF6BFF','#52C2FF','#38FF60','#FCFA42']
const sizeFactor = 1.3;


let song;
let playing = false;
let ready = false;
function preload() {
  soundFormats('mp3', 'ogg');
  song = loadSound('myOrdinaryLife.mp3');
}

function start() {
  song.play();
}
function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60);
  pixelDensity(0.5);
  canvas.parent("#p5canvas");

  for (let i = 0; i < 13; i++) {
    bouncers.push(new Bouncer(0, 0, 200, color(colors[int(random(0, colors.length))]), 0, 0, 0, 0));
    bouncers[i].show();
  }
  // song.play();
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  text("Click to start", width/2, height/2);
  ready = true;
}
function mouseClicked() {
  if (playing || !ready) return;
  playing = true;
  song.play();
}
function draw() {
  if (!playing) return;
  background(200, 240, 255);

  let bouncer = bouncers[0].clone();
  bouncer.update(); 
  bouncers.unshift(bouncer);
  if (bouncers.length > 13) {
    bouncers.pop();
  }
  if (frameCount % 41 == 0) {
    bouncers[0].bump();
  }
  for (let i = bouncers.length - 1; i >= 0; i--) {
    if (i > 0) {
      bouncers[i].size *= sizeFactor;
    }
    if (i % 1 == 0) {
      bouncers[i].show();
      if (i > 1) {
        bouncers[i].glitch(bouncers[i-1]);
      }
      if (i < bouncers.length - 1) {
        bouncers[i].glitchBefore(bouncers[i+1]);
      }
    }

  }
  // blendMode(BLEND);
  // noStroke();
  // fill(0);

  // text(frameRate(), 50, 50);
}

function windowResized() {
  resizeCanvas(window.innerWidth-1, window.innerHeight-1);
}
class Bouncer {
  constructor(x, y, size, c, rot, vx, vy, vs) {
    this.x=x; 
    this.y=y; 
    this.size=size; 
    this.c=c; 
    this.rot=rot;
    this.vx = vx;
    this.vy = vy;
    this.vs = vs;
  }
  show() {
    blendMode(BLEND);
    fill(this.c);
    stroke(255, 255, 255);
    strokeWeight(10);
    push();
    translate(width/2 + this.x, height/2 + this.y, 0);
    rotate(radians(this.rot));
    rect(-this.size/2, -this.size/2, this.size, this.size);
    pop();
  }
  glitch(previous) {
    let size = previous.size * sizeFactor;
    blendMode(ADD);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(10);
    push();
    translate(width/2 + previous.x, height/2 + previous.y, 0);
    rotate(radians(previous.rot + 1));
    rect(-size/2, -size/2, size, size);
    pop();
  }
  glitchBefore(previous) {
    let size = (previous.size / sizeFactor);
    blendMode(SCREEN);
    noFill();
    stroke(0, 255, 0);
    strokeWeight(10);
    push();
    translate(width/2 + previous.x, height/2 + previous.y, 0);
    rotate(radians(previous.rot - 1));
    rect(-size/2, -size/2, size, size);
    pop();
  }
  bump() {
    this.vx = random(-60, 60);
    this.vy = random(-60, 60);
    this.vs = 40;
    this.c = colors[int(random(0, colors.length))];
  }
  update() {
    this.x *= 0.9;
    this.y *= 0.9;
    this.size = 200 + (this.size - 200) * 0.7;
    this.vx *= 0.95;
    this.vy *= 0.95;
    this.vs *= 0.95;
    this.x += this.vx;
    this.y += this.vy;
    this.size += this.vs;

    this.rot += 2;
  }
  clone() {
    return new Bouncer(this.x, this.y, this.size, this.c, this.rot, this.vx, this.vy, this.vs);
  }
}
