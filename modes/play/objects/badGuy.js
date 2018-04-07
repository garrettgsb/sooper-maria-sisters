class BadGuy extends Mob {
  constructor(game, mode, x, y) {
    super(game, mode, x, y);
    this.name = "BadGuy";
    this.color = "#ee5";
    this.brain = new BadGuyBrain(this);
    this.spriteBank = {
      standing: ['assets/sprites/enemies/slimeBlock/slimeBlock.png'],
      running: ['assets/sprites/enemies/slimeBlock/slimeBlock_move.png', 'assets/sprites/enemies/slimeBlock/slimeBlock.png'],
      jumping: ['assets/sprites/enemies/slimeBlock/slimeBlock.png'],
    }
    this.animationRate = 500;
  }

  collisionCallback(obj) {
    if (obj.name !== 'Player' || this.cooldowns['playerCollision']) { return };
    this.setCooldown('playerCollision', 100);
    const colors = [
      '#ee5',
      '#bb2',
      '#ffa',
      '#33f',
      '#aaf',
      '#ccf',
    ]
    const phrases = [
      'ow',
      'ouch',
      'hey',
      'heck',
      'rude',
      'stop it',
      "don't",
      'where did you learn to drive?',
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]
    !window.speechSynthesis.speaking && window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(phrases[Math.floor(Math.random() * phrases.length)])
    );
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
