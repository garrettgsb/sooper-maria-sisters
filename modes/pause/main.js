class PauseMode {
  constructor(game) {
    this.game = game;
    this.running = false;
    this.input = new PauseModeInput(game, this);
    this.physics = new PauseModePhysics(game, this);
    this.render = new PauseModeRender(game, this);
  }

  init() {
    // setup input handlers
    this.input.init();
    this.running = true;
  }

  exit() {
    // TODO: Destroy event listeners
    this.input.exit();
    this.running = false; // I think.
    this.game.changeMode('play');
  }

  run() {
    if (!this.running) { this.init() };
    this.input.do();
    this.physics.do();
    this.render.do();
    this.input.clear();
  }
}
