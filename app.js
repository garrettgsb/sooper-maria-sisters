const config = {
  cellSize: 1,
  renderTick: 10,
  playTick: 10,
}

const elements = {
  canvas: document.getElementById('soupmar'),
}

const game = new Game(config, elements);
game.init();
