var x = 50;
var y = 50;
var diameter = 25;
var speed = 1;
var circles = [];
var staticCircles = [];

function setup() {
  createCanvas(800, 600);
  for (i = 0; i < 10; i++) {
    var randInt1 = Math.round(Math.random());
    if (randInt1 == 0) {
      randInt1 = -1;
    }

    var randInt2 = Math.round(Math.random());
    if (randInt2 == 0) {
      randInt2 = -1;
    }

    circles.push({
      x: Math.floor(Math.random() * (800 - diameter/2)) + diameter/2,
      y: Math.floor(Math.random() * (600 - diameter/2)) + diameter/2,
      diameter: Math.floor(Math.random() * 25) + 25,
      color1: Math.floor(Math.random() * 255) + 1,
      color2: Math.floor(Math.random() * 255) + 1,
      speedX: randInt1,
      speedY: randInt2
    });
  }
}

function draw() {
  background(100, 20, 20);
  createExit();
  createPlayer();
  generateObstacles();
  playerMove();
  winCondition();
}

function mousePressed() {
  staticCircles.push({
    x: mouseX,
    y: mouseY
  });
}

function createPlayer() {
  noStroke();
  fill(24, 200, 229);
  square(x, y, diameter);
}

function createExit() {
  fill(24, 200, 229);
  textSize(40);
  text('EXIT', 350, 560);
  fill(24, 100, 129);
  rect(300,575,200,25);
}

function playerMove() {
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    if (x < width - diameter) {
      x += 5;
    }
  } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    if (x > 0) {
      x -= 5;
    }
  }

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
    if (y > 0) {
      y -= 5;
    }
  } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
    if (y < height - diameter || x > 300 && x < 475) {
      y += 5;
    }

  }
}

function generateObstacles() {
  fill(229, 100, 100);
  for (i = 0; i < circles.length; i++) {
    fill(255, circles[i].color1, circles[i].color2);
    circle(circles[i].x, circles[i].y, circles[i].diameter);
    if (circles[i].x >= width - diameter / 2) {
      circles[i].x = (diameter / 2) + 1;
    }

    if (circles[i].x <= diameter / 2) {
      circles[i].x = width - diameter / 2;
    }

    if (circles[i].y >= height - diameter / 2) {
      circles[i].y = (diameter / 2) + 1;
    }

    if (circles[i].y <= diameter / 2) {
      circles[i].y = height - diameter / 2;
    }

    circles[i].x += circles[i].speedX;
    circles[i].y += circles[i].speedY;
  }

  for (i = 0; i < staticCircles.length; i++) {
    fill(0, 0, 0);
    circle(staticCircles[i].x,staticCircles[i].y, 40);
  }
}

function winCondition() {
  if (y >= height) {
    fill(24, 200, 229);
    textSize(80);
    text('You Win!', 100, 300);
  }
}
