var dots = [];
var dSize = 8;
var player;
var ball;
var ai;
var PlayerScore = 0;
var AIScore = 0;
var txtSize = 30;
var p1win;
var p2win;

//Set the starting values and objects
function setup() {
  createCanvas(800, 500);

  for (let y = dSize / 2; y < height; y += dSize * 2) {
    dots.push(createVector(width / 2 - dSize / 2, y));
  }

  player = new Player();
  ball = new Ball();
  ai = new AI();
  p1win = document.getElementById("myAudio2");
  p2win = document.getElementById("myAudio3");
}

//Draw everything
function draw() {
  background(0);
  noStroke();
  fill(255, 100);
  drawSquares();
  player.update();
  player.show();
  ball.update();
  ball.show();
  ball.edges();
  ball.scores();
  ai.update();
  ai.show();

  //Check Win Condition
  //Play sound on win according to Player who won
  drawScores();
  if (AIScore > 4) {
    if (ball.muted === false) {
      p2win.play();
    }
    noLoop();
  } else if (PlayerScore > 4) {
    if (ball.muted === false) {
      p1win.play();
    }
    noLoop();
  }
}

//Updates the value of score
function drawScores() {
  let x1 = width / 4;
  let x2 = (width * 3) / 4;
  let y = txtSize * 1.5;

  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(txtSize);
  text(PlayerScore, x1, y);
  text(AIScore, x2, y);
}

function drawSquares() {
  for (let i = 0; i < dots.length; i++) {
    let x = dots[i].x;
    let y = dots[i].y;

    rect(x, y, dSize, dSize);
  }
}

//Control KeyBoard events
function keyPressed(event) {
  event.preventDefault();

  if (keyCode == 87 || keyCode == UP_ARROW) {
    player.up();
  } else if (keyCode == 83 || keyCode == DOWN_ARROW) {
    player.down();
  } else if (keyCode == 104) {
    ai.up();
  } else if (keyCode == 101) {
    ai.down();
  } else if (keyCode == 82) {
    //PRESS R TO RESTART GAME AND RESET SCORES
    ball.pos = createVector(width / 2, height / 2);
    ai.pos = createVector(width - ai.w * 2, height / 2 - ai.h / 2);
    player.pos = createVector(player.w, height / 2 - player.h / 2);
    AIScore = 0;
    PlayerScore = 0;
    ball.speed = 5;
    loop();
  }

  //Pause and unpause game with P
  else if (keyCode === 80) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
  //Mute and Unmute Game with M
  else if (keyCode === 77) {
    if (ball.muted === false) {
      ball.muted = true;
    } else {
      ball.muted = false;
    }
  }
}

function keyReleased() {
  if (
    keyCode == 87 ||
    keyCode == UP_ARROW ||
    keyCode == 83 ||
    keyCode == DOWN_ARROW
  ) {
    player.stop();
  } else if (keyCode === 101 || keyCode === 104) {
    ai.stop();
  }
}
