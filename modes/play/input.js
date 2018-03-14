class PlayModeInput {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.actions = [];
    this.keys = [];
    this.keymap = {
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'ArrowUp': 'up',
      'Comma': 'jump',
      'KeyA': 'left',
      'KeyD': 'right',
      'KeyP': 'pause',
      'KeyR': 'exit',
      'KeyS': 'down',
      'KeyW': 'up',
      'KeyX': 'run',
      'KeyZ': 'jump',
      'Period': 'run',
      'default': 'default',
    }

    // Deprecated, but keeping handy for now.
    // this.keymap = event => {
    //       if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
    //         this.addInput('left');
    //       } else if (event.code === 'KeyW' || event.code === 'ArrowUp') {
    //         this.addInput('up');
    //       } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
    //         this.addInput('right');
    //       } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
    //         this.addInput('down');
    //       } else if (event.code === 'KeyZ' || event.code === 'Comma') {
    //         this.addInput('jump'); // Like button A on a NES controller
    //       } else if (event.code === 'KeyX' || event.code === 'Period') {
    //         this.addInput('run');
    //       } else if (event.code === 'KeyP') {
    //         this.addInput('pause');
    //       } else if (event.code === 'KeyR') {
    //         this.addInput('exit');
    //       } else {
    //         console.log("Unknown key: ", event.code);
    //       };
    //   };
  }

  do() {
    this.clear();
    this.game.input.keysDown.forEach(key => {
      this.actions.push(this.keymap[key] || this.keymap['default']);
    });
  }

  nextAction() {
    return this.actions.shift();
  }

  clear() {
    this.actions = [];
    this.keys = [];
  }
}
