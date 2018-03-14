class Input {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.handleEvent = this.handleEvent.bind(this);
  }

  init() {
    document.addEventListener('keydown', this.handleEvent, false);
    document.addEventListener('keyup', this.handleEvent, false);
  }

  exit() {
    // Jeremy says this probably won't work because you get two different objects when you bind.
    // If that ever matters, I should deal with it.
    // addendum: maybe it works now.  whee.  bind in the ctor.
    document.removeEventListener('keydown', this.handleEvent, false);
    document.removeEventListener('keyup', this.handleEvent, false);
    return true;
  }

  handleEvent(event) {
    if (event.type == 'keyup' || event.type == 'keydown') {
      this.handleKeys(event);
    }
  }

  handleKeys(event) {
    const down = event.type === 'keydown';
    this.newEvent(event.code, down);
  }

  newEvent(key, down) {
    this.keys[key] = down;
  }

  get keysDown() {
    return Object.entries(this.keys).filter(key => key[1]).map(key => key[0]);
  };
}
