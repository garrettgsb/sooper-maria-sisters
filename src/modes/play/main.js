import PlayModeInput from './input.js';
import PlayModePhysics from './physics.js';
import PlayModeRender from './render.js';

import Level from './levels/level';
import level1config from './levels/1';
import level2config from './levels/2';
import level3config from './levels/3';
import level4config from './levels/4';
import level5config from './levels/5';
import level6config from './levels/6';

import Player from './objects/player';

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
      levels: [
        new Level(this.game, this, level1config),
        new Level(this.game, this, level2config),
        new Level(this.game, this, level3config),
        new Level(this.game, this, level4config),
      ]
    };
    state.player = new Player(this.game, this, ...(state.levels[this.currentLevel].playerSpawn || [50, 50]));
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
    window.garbage = {};
    this.input.do();
    this.physics.do();
    this.render.do();
    this.input.clear();
    this.diagnose();
  }

  diagnose() {
    // console.log(JSON.stringify(window.garbage));
  }

  cycleLevel() {
    const oldLevel = this.currentLevel;
    this.currentLevel = (oldLevel + 1) % this.state.levels.length;
    this.state = this.initialState;
    this.exit('start');
  }

  playerNewLife() {
    this.cycleLevel();
  }
}

export default PlayMode;
