class Mob {
  constructor(game, mode, x, y) {
    this.x = x;
    this.y = y;
    this.size = { x: 18, y: 18 };
    this.color = "#eee";
    this.brain = new Brain(this);
    this.game = game;
    this.mode = mode;
    this.moveSpeed = 2;
    this.jumpSpeed = 24;
    this.fallSpeed = 4;
    this.accel = 0.5;
    this.frictionCoeff = 0.6;
    this.velocity = { x: 0, y: 0 };
    this.jumpLength = 1;
    this.collisionRecord = {};
  }

  get hitBox() {
    return {
      tL: { x: this.x, y: this.y }, // Top left corner
      tR: { x: this.x + this.size.x, y: this.y }, // Top right corner
      bL: { x: this.x, y: this.y + this.size.y }, // Bottom left corner
      bR: { x: this.x + this.size.x, y: this.y + this.size.y } // Bottom right corner
    }
  }

  collisions(collection) {
    this.collisionRecord = {};
    let x, y;
    collection.forEach(obj => {
      if (obj === this) { return }
      [x, y] = this.collision(obj);
      this.velocity.x = x;
      this.velocity.y = y;
    });

    this.processCollisions(this.collisionRecord);

  }

  processCollisions(collisionRecord) {
    Object.values(this.collisionRecord).forEach(point => {
      point.forEach(collision => {
        if (collision.callback) {
          collision.callback(this);
        }
      })
    })
  }

  collision(obj) {
    // const lastX = this.x
    // const lastY = this.y
    let [xRange, yRange] = getRanges(obj);
    const xVects = [];
    const yVects = [];
    const names = []
    let badNews = false;
    Object.entries(this.hitBox).forEach(pt => {
      names.push(pt[0])
      const point = pt[1];
      let timeout = 1000;
      let yTimeout = 100;
      let xTimeout = 100;
      let [vectX, vectY] = [this.velocity.x, this.velocity.y];
      let x = point.x + vectX;
      let y = point.y + vectY;
      this.recordCollision(pt[0], {x: x, y: y}, obj);
      while (timeout > 0 && inRange(x, xRange) && inRange(y, yRange)) {
        while (yTimeout > 0 && inRange(y, yRange)) {
          vectY *= 0.9;
          if (Math.abs(vectY) < 1) { vectY = 0 }
          y = point.y + vectY;
          yTimeout -= 1;
        }

        while (xTimeout && inRange(y, yRange)) {
          vectX *= 0.9;
          if (Math.abs(vectX) < 1) { vectX = 0 }
          x = point.x + vectX;
          xTimeout -= 1;
        }
        timeout -= 1
        if (timeout < 1) { badNews = true };
      };
      if (badNews) {
        timeout = 100;
        console.log('Attempting to avert crisis');
        let invX = this.velocity.x * -1;
        let invY = this.velocity.y * -1;
        x = point.x + invX;
        y = point.y + invY;
        while (timeout > 0 && inRange(x, xRange) && inRange(y, yRange)) {
          invX *= 1.1
          invY *= 1.1
          timeout -= 1;
        }
        [vectX, vectY] = [invX, invY];
      }
      xVects.push(vectX);
      yVects.push(vectY);
    });
    const finalVectX = xVects.reduce((a, b) => Math.abs(a) < Math.abs(b) ? a : b);
    const finalVectY = yVects.reduce((a, b) => Math.abs(a) < Math.abs(b) ? a : b);
    return [finalVectX, finalVectY];
  }

  recordCollision(name, coords, obj) {
    const [xRange, yRange] = getRanges(obj);
    if (inRange(coords.x, xRange) && inRange(coords.y, yRange)) {
      if (this.collisionRecord[name]) {
        this.collisionRecord[name].push(obj);
      } else {
        this.collisionRecord[name] = [obj];
      }
    };
  }

  physics() {
    this.brain.think();
    this.friction();
    this.gravity();
    this.processActions();
    this.collisions([...this.mode.level.ground, ...this.mode.state.mobs]);
    this.x += this.velocity.x
    this.y += this.velocity.y;
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

  processActions() {
    this.brain.actions.forEach(action => {
      this.processAction(action);
    });
  }

  processAction(action) {
    if (action === 'left') {
      return this.moveLeft();
    } else if (action === 'right') {
      return this.moveRight();
    } else if (action === 'jump') {
      this.jump();
    } else if (action === 'run') {
      this.run();
    }
  }

// Movement methods
  moveLeft() {
      this.velocity.x = accelTo(Math.abs(this.velocity.x), this.moveSpeed, this.accel) * -1;
  }

  moveRight() {
    // TODO: Make sure you can move
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
    const canJump = (!!this.collisionRecord['bL'] || !!this.collisionRecord['bR']);
    if (this.jumpTimer) {
      this.moveUp(this.jumpAccel);
      this.jumpAccel = decelTo(this.jumpAccel, 0, 1)
      this.jumpTimer -= 1;
    } else if (canJump) {
      this.jumpTimer = this.jumpLength
      this.jumpAccel = this.jumpSpeed;
      this.jump();
    }
  }

  run() {
    //TODO
    return true;
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
