class StartModePhysics {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
  }

  do() {
    if (this.userAction()) {
      this.mode.exit();
    }
  }

  userAction() {
    return this.mode.input.actions.length > 0;
  }
}
