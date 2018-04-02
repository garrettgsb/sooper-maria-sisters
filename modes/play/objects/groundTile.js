class GroundTile extends Obj {
  constructor(x, y, config) {
    config = config || {};
    super(x, y);
    this.name = "GroundTile";
    this.x = x;
    this.y = y;
    this.size = { x: 20, y: 20 };
    this.color = config.color || '#49c';
    this.spriteBank = {
      default: ['./assets/sprites/tiles/grass/grassMid.png'],
    };
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
