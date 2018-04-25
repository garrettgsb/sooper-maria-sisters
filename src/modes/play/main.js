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
    this.currentLevel = 0;
    this.state = this.initialState;

    this.profiling_log = [];
    this.should_profile = true;
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
    var start_ts = window.performance.now()

    if (!this.running) { this.init() };
    this.input.do();
    this.physics.do();
    this.render.do();
    this.input.clear();

    if (this.should_profile) {
      const PROFILING_MEMORY_LENGTH = 20;
      var delta_t = window.performance.now() - start_ts;
      this.profiling_log.push(delta_t);
      if (this.profiling_log.length >= PROFILING_MEMORY_LENGTH) {
        var mean_time = this.profiling_log.reduce((a, b) => a + b, 0) / PROFILING_MEMORY_LENGTH;
        this.profiling_log.sort((a, b) => (a - b))[0];
        var some_times = [0, 1, 2, 3, 4].map(tile => this.profiling_log[Math.floor((tile/4.0)*(this.profiling_log.length-1))]);
        some_times.push(mean_time);
        console.log(
          "0/4  1/4  2/4  3/4  4/4  mean    ",
          some_times.map(time => time.toFixed(2).toString().padStart(7)).join("    ")
        );
        this.profiling_log = [];
      }
    }
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

  killMob(mob) {
    this.state.mobs.splice(this.state.mobs.indexOf(mob), 1);
  }
}

export default PlayMode;
