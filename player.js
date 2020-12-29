function Player() {
  this.w = 12;
  this.h = 80;

  this.pos = createVector(this.w, height / 2 - this.h / 2);
  this.acc = createVector(0, 0);
  this.speed = 8;
  this.maxSpeed = 30;

  //Shows Player
  this.show = function () {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  };

  //Player Movements
  this.up = function () {
    this.acc.y -= this.speed;
  };
  this.down = function () {
    this.acc.y += this.speed;
  };
  this.stop = function () {
    this.acc.y = 0;
  };

  //Updates Positions with constraints
  this.update = function () {
    this.acc.y = constrain(this.acc.y, -this.maxSpeed, this.maxSpeed);
    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 2, height - this.h - 2);
  };
}
