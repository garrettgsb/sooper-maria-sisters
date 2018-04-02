class Mob extends Obj {
  constructor(game, mode, x, y) {
    super(game, mode, x, y)
    this.name = "Undifferentiated Mob";
    this.color = "#eee";
    this.brain = new Brain(this);
    this.moveSpeed = 2;
    this.jumpSpeed = 24;
    this.fallSpeed = 4;
    this.accel = 0.5;
    this.frictionCoeff = 0.6;
    this.velocity = { x: 0, y: 0 };
    this.jumpLength = 1;
    this.status.action = 'standing';
    this.status.direction = 'right';
  }

  physics() {
    //TODO: Find a better place to reset sprite to standing;
    this.status.action = 'standing';
    this.brain.think();
    this.processCooldowns();
    this.friction();
    this.gravity();
    this.processActions();
    this.collisions([...this.mode.level.ground, ...this.mode.state.mobs]);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.y > this.mode.level.deathAltitude) {
      this.die();
    }
  }

  gravity() {
    if (this.velocity.y < this.fallSpeed) {
      this.velocity.y = accelTo(this.velocity.y, this.fallSpeed, 2);
    };
  }

  friction() {
    if (this.velocity.x > -1 && this.velocity.x < 1) {
      this.velocity.x = 0;
    } else {
      this.velocity.x *= this.frictionCoeff;
    }
  }

  processAction(action) {
    if (action === 'left') {
      return this.moveLeft();
    } else if (action === 'right') {
      return this.moveRight();
    } else if (action === 'jump') {
      return this.jump();
    } else if (action === 'run') {
      return this.run();
    }
  }
  
// Movement methods
  moveLeft() {
    this.status.action = 'running';
    this.status.direction = 'left';
    this.velocity.x = accelTo(Math.abs(this.velocity.x), this.moveSpeed, this.accel) * -1;
  }

  moveRight() {
    // TODO: Make sure you can move
    this.status.action = 'running';
    this.status.direction = 'right';
    this.velocity.x = accelTo(this.velocity.x, this.moveSpeed, this.accel);
  }

  moveUp(amount=this.moveSpeed) {
    this.velocity.y -= amount;
  }
  
  moveDown(amount=this.fallSpeed) {
    if (this.velocity.y < this.moveSpeed) {
      this.velocity.y += this.accel;
    };
  }
  
  jump() {
    this.status.action = 'jumping';
    const canJump = (!!this.collisionRecord['bL'] || !!this.collisionRecord['bR']);
    if (this.cooldowns['jump']) {
      this.moveUp(this.jumpAccel);
      this.jumpAccel = decelTo(this.jumpAccel, 0, 1)
    } else if (canJump) {
      this.setCooldown('jump', this.jumpLength);
      this.jumpAccel = this.jumpSpeed;
      this.jump();
    }
  }

  run() {
    //TODO
    return true;
  }

  die() {
    // TODO: non-player mobs are currently immortal
  }
}


class Brain {
  constructor(meat) {
    this.meat = meat;
  }

  get actions() {
    return ['jump'];
  }

  think() {
    const whatToDoAllTheTime = 'jump';
  }
}
