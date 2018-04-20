import {getRanges, inRange, accelTo, decelTo, } from '../../../helpers';

function earlyCutout(theyHit, meHit, meVel) {
  function sq(x) { return x**2; }
  var rangeSquared = meVel.x ** 2 + meVel.y ** 2 + 100;
  var theyX = [theyHit.tR.x, theyHit.tL.x];
  var meX = [meHit.tR.x, meHit.tL.x];
  var diffXSquared = [
    theyX[0] - meX[0],
    theyX[0] - meX[1],
    theyX[1] - meX[0],
    theyX[1] - meX[1],
  ].map(sq);
  var theyY = [theyHit.tR.y, theyHit.bR.y];
  var meY = [meHit.tR.y, meHit.bR.y];
  var diffYSquared = [
    theyY[0] - meY[0],
    theyY[0] - meY[1],
    theyY[1] - meY[0],
    theyY[1] - meY[1],
  ].map(sq);
  return (Math.min(...diffXSquared) > rangeSquared ||
    Math.min(...diffYSquared) > rangeSquared);
}


class Obj {
  constructor(game, mode, x, y) {
    this.name = "Undifferentiated Obj";
    this.x = x;
    this.y = y;
    this.size = { x: 18, y: 18 };
    this.color = "#eee";
    this.game = game;
    this.mode = mode;
    this.collisionRecord = {};
    this.cooldowns = {};
    this.status = {
      action: 'default',
      animationFrame: 0,
    };
    this.spriteBank = {default: []}
  }

  get sprite() {
    this.status.animationFrame %= this.spriteBank[this.status.action].length;
    return this.spriteBank[this.status.action][this.status.animationFrame];
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
    window.garbage.beta = (window.garbage.beta||0) + 1;

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
      point.forEach(obj => {
        if (obj.collisionCallback) {
          obj.collisionCallback(this);
        }
      })
    })
  }

  collision(obj) {
    // const lastX = this.x
    // const lastY = this.y
    if (earlyCutout(obj.hitBox, this.hitBox, this.velocity)) return [this.velocity.x, this.velocity.y];
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
    this.processCooldowns();
    this.processActions();
    this.collisions([...this.mode.level.ground, ...this.mode.state.mobs]);
    this.x += this.velocity.x
    this.y += this.velocity.y;
  }

  processActions() {
    this.brain.actions.forEach(action => {
      this.processAction(action);
    });
  }

  processAction(action) {
    // No default actions for objs
    return null;
  }

  processCooldowns() {
    if (Object.entries(this.cooldowns).length > 0) {
      Object.entries(this.cooldowns).forEach(entry => {
        const [name, time] = entry
        this.cooldowns[name] -= 1
        if (this.cooldowns[name] < 0) { this.cooldowns[name] = null }
      });
    }
  }

  setCooldown(name, time) {
    this.cooldowns[name] = time;
  }
}

export default Obj;
