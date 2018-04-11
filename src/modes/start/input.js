class StartModeInput {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    // TODO: Refactor to keys-to-actions architecture, even though this works fine.
    this.actions = [];
  }

  do() {
    this.clear();
    this.actions = this.game.input.keysDown;
  }

  clear() {
    this.actions = [];
  }
}

export default StartModeInput;
