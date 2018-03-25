class Trampoline {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = { x: 20, y: 20 };
    this.color = '#94c';
    this.sprite = (function () {
      const image = new Image()
      image.src = './assets/sprites/tiles/spring/spring.png';
      return image;
    })();
  }

  get isGround() {
    return true;
  }

  get hitBox() {
    return {
      tL: { x: this.x, y: this.y }, // Top left corner
      tR: { x: this.x + this.size.x, y: this.y }, // Top right corner
      bL: { x: this.x, y: this.y + this.size.y }, // Bottom left corner
      bR: { x: this.x + this.size.x, y: this.size.y } // Bottom right corner
    }
  }

  callback(obj) {
    obj.velocity.y -= 16;
  }

  coordInside(x, y) {
    return this.insideHorizontal(x) && this.insideVertical(y);
  }

  onTopOf(x, y) {
    return this.insideHorizontal(x) && y == this.y;
  }

  insideHorizontal(x) {
    return (x > this.x && x < this.x + this.size.x);
  }

  insideVertical(y) {
    return (y > this.y && y < this.y + this.size.y);
  }
}
