import Game from './game.js';

const config = {
  cellSize: 1,
  renderTick: 10,
  playTick: 10,
  runtimeDebug: false, // This should be false in every commit, only change during dev.
}

const elements = {
  canvas: document.getElementById('soupmar'),
}

const game = new Game(config, elements);
game.init();

if (config.runtimeDebug) {
  window.game = game; // Allows developer to examine the game object at runtime.
}
