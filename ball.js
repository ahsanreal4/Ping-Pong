function Ball() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 10;
  this.maxSpeed = createVector(20, 15);
  this.collided = true;
  this.collObj = "player";
  this.speed = 5;
  this.muted = false;
  var y;
  var x = document.getElementById("myAudio");
  var hitwallSound = document.getElementById("myAudio4");

  //Show the ball on a position
  this.show = function () {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  };

  //Updates position of a ball
  this.update = function () {
    if (this.collided === true) {
      y = Math.round(Math.random() * 6 - 3);

      this.collided = false;
    }
    if (this.collObj === "player") {
      this.pos.add(this.speed, y);
    } else if (this.collObj === "ai") {
      this.pos.add(-this.speed, y);
    }
  };

  this.edges = function () {
    //Hits Player 2
    //Play Sound when hits a player
    if (
      this.pos.x + 11 > ai.pos.x &&
      this.pos.y > ai.pos.y &&
      this.pos.y < ai.pos.y + ai.h
    ) {
      this.collObj = "ai";
      this.speed = 12;
      this.collided = true;
      if (this.muted === false) {
        x.play();
      }

      //Hits Player
      //Play Sound when hits
    } else if (
      this.pos.x - 23 < player.pos.x &&
      this.pos.y > player.pos.y &&
      this.pos.y < player.pos.y + player.h
    ) {
      this.collObj = "player";
      this.speed = 12;
      this.collided = true;
      if (this.muted === false) {
        x.play();
      }
    }
    //If hits a wall
    //Play Sound when hits
    else if (this.pos.y + this.r > 490) {
      if (this.muted === false) {
        hitwallSound.playbackRate = 1.2;
        hitwallSound.play();
      }
      y = Math.round(Math.random() * 3) - 5;
    } else if (this.pos.y + this.r < 10) {
      if (this.muted === false) {
        hitwallSound.playbackRate = 1.2;
        hitwallSound.play();
      }
      y = Math.round(Math.random() * 3) + 5;
    }
  };

  //Increase score when miss the ball
  this.scores = function () {
    if (this.pos.x <= this.r) {
      AIScore++;

      this.res();
    } else if (this.pos.x > width - this.r) {
      PlayerScore++;

      this.res();
    }
  };

  //Resets the paddles and ball and variables after ball missed
  this.res = function () {
    ai.pos = createVector(width - ai.w * 2, height / 2 - ai.h / 2);
    player.pos = createVector(player.w, height / 2 - player.h / 2);
    this.pos = createVector(width / 2, height / 2);
    this.collided = true;
    this.speed = 5;
  };
}
