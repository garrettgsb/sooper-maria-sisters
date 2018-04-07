class Game {
  constructor(config, elements) {
    this.canvas = elements.canvas;
    this.ctx = elements.canvas.getContext('2d');
    this.viewport = {
      x: this.canvas.width,
      y: this.canvas.height
    }
    this.cellSize = config.cellSize;
    this.lastTick = window.performance.now();
    this.now = window.performance.now();
    this.input = new Input(this);
    this.board = new Board(this.canvas, this.cellSize);
    this.modes = {
      start: new StartMode(this),
      pause: new PauseMode(this),
      play: new PlayMode(this),
    }
    this.state = {
      mode: 'start',
      renderTick: config.renderTick,
      playTick: config.renderTick,
    }
  }

  init() {
    // TODO: this.input.setupEventListeners();
    // Or maybe I don't need an init method here at all.
    this.input.init();
    this.run();
  }

  run() {
    const Run = this.run.bind(this);
    this.now = window.performance.now();
    requestAnimationFrame(Run);
    if (this.lastTick + this.state.renderTick < window.performance.now()) {
      this.lastTick = window.performance.now();
      this.modes[this.state.mode].run();
    }
  }

  changeMode(mode) {
    return this.state.mode = mode;
  }
}
