class StartMode {
  constructor(game) {
    this.game = game;
    this.running = false;
    this.input = new StartModeInput(game, this);
    this.physics = new StartModePhysics(game, this);
    this.render = new StartModeRender(game, this);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      // Probably sth. like menu items, arrow position?
      thing: "👔"
    }
  }

  init() {
    this.running = true;
  }

  exit() {
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

  render() {
    this.game.ctx.fillStyle = '#050';
    this.game.ctx.fillRect(sX, sY, cellSize, cellSize);
  }
}
