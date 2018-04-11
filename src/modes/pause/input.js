class PauseModeInput {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.actionQueue = [];
    this.keymap = event => {
          if (event.code === 'KeyP') {
            this.addInput('play');
          } else if (event.code === 'KeyR') {
            this.addInput('exit');
          } else {
            console.log("Unknown key: ", event.code);
          };
      };
  }

  init() {
    document.addEventListener('keydown', this.keymap, false);
  }

  exit() {
    this.clear();
    document.removeEventListener('keydown', this.keymap, false);
    return true;
  }

  addInput(input) {
    this.actionQueue.push(input);
    if (this.actionQueue.length > 2) { this.actionQueue.shift() }
  }

  nextAction() {
    return this.actionQueue.shift() || false;
  }

  do() {
    return true;
  }

  clear() {
    this.actionQueue = [];
  }
}

export default PauseModeInput;
