import Mob from './mob';

class GrowthFungus extends Mob {
  constructor(game, mode, x, y, behavior) {
    super(game, mode, x, y);
    this.name = "GrowthFungus";
    this.color = "#e72";
    this.brain = new GrowthFungusBrain(this, behavior);
    this.spriteBank = {
      standing: ['assets/sprites/mobs/fungus/fungus-1.png'],
      running: ['assets/sprites/mobs/fungus/fungus-1.png', 'assets/sprites/mobs/fungus/fungus-2.png'],
    }
  }

  get animationRate() {
    return Math.random() * 10000;
  }

  set animationRate(val) {
    return 'lol';
  }

  collisionCallback(obj) {
    if (obj.name === 'Player') {
      obj.grow();
      this.die();
      this.game.audio.fungusGet();
    }
  }
}

class GrowthFungusBrain {
  constructor(meat, behavior) {
    this.meat = meat;
    this.behavior = behavior;
    this.actionLoop = [
      'right',
      'left',
    ];
    this.loopPosition = 0;
    this.state = this.actionLoop[0];
    this.timer = 0;
    this.timerLength = 200;
  }

  get actions() {
    if (this.behavior === 'flee') {
      return [this.state];
    }
    return ['actually just always chill for now'];
  }

  think() {
    if (this.timer++ > this.timerLength) {
      this.timer = 0;
      this.loopPosition = (this.loopPosition + 1) % this.actionLoop.length
    }
    this.state = this.actionLoop[this.loopPosition];
  }
}


export default GrowthFungus;
