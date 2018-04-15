class PauseModePhysics {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
  }

  do() {
    this.processInput();
  }

  processInput() {
    let action;
    while (action = this.mode.input.nextAction()) {
      if (action === 'play' || action === 'start') {
        this.mode.exit(action);
      }
    }
  };
}

export default PauseModePhysics;
