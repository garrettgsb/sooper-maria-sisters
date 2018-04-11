import Obj from './obj';

class Trampoline extends Obj {
  constructor(x, y) {
    super(x, y)
    this.x = x;
    this.y = y;
    this.size = { x: 20, y: 20 };
    this.color = '#94c';
    this.spriteBank = {
      default: ['./assets/sprites/tiles/spring/spring.png'],
    };
  }

  get isGround() {
    return true;
  }
  collisionCallback(obj) {
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

export default Trampoline;
