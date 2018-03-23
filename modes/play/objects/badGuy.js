class BadGuy extends Mob {
  constructor(game, mode, x, y) {
    super(game, mode, x, y);
    this.color = "#ee5";
    this.brain = new BadGuyBrain(this);
  }
}


class BadGuyBrain {
  constructor(meat) {
    this.meat = meat;
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
    const jump = Math.random() < 0.01 ? 'jump' : 'just chill'
    return [this.state, jump];
  }

  think() {
    if (this.timer++ > this.timerLength) {
      this.timer = 0;
      this.loopPosition = (this.loopPosition + 1) % this.actionLoop.length
    }
    this.state = this.actionLoop[this.loopPosition];
  }
}
