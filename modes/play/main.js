class PlayMode {
  constructor(game) {
    this.game = game;
    this.running = false;
    this.input = new PlayModeInput(game, this);
    this.physics = new PlayModePhysics(game, this);
    this.render = new PlayModeRender(game, this);
    this.currentLevel = 1;
    this.state = this.initialState;
  }

  get initialState() {
    const state = {
      player: new Player(this.game, this, 20, 250),
      levels: [
        new Level(this.game, this, level1config),
        new Level(this.game, this, level2config),
      ]
    };
    state.mobs = [ state.player, ...state.levels[this.currentLevel].mobs ];
    return state
  }

  get level() {
    return this.state.levels[this.currentLevel];
  }

  get player() {
    return this.state.player;
  }

  init() {
    this.running = true;
    return true;
  }

  exit(mode) {
    this.running = false; // I think.
    this.game.changeMode(mode);
  }

  run() {
    if (!this.running) { this.init() };
    this.input.do();
    this.physics.do();
    this.render.do();
    this.input.clear();
  }

  playerNewLife() {
    const oldLevel = this.currentLevel;
    this.state = this.initialState;
    this.exit('start');
    this.currentLevel = (oldLevel + 1) % this.state.levels.length;
  }
}
