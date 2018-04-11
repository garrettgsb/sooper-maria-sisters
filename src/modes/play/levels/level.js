class Level {
  constructor(game, mode, config) {
    var misc_config = config.misc || {};
    this.game = game;
    this.mode = mode;
    [this.ground, this.playerSpawn, this.mobs] = this.processGrid(config);
    this.deathAltitude = misc_config.deathAltitude || this.size.y * 2.0;
    this.backgrounds = (config.backgrounds || []).map(bg => bg(game, mode, config.scale));
  }

  get size() {
    const x = this.ground.reduce((furthestTile, nextTile) =>  {
      return furthestTile.x + furthestTile.size.x > nextTile.x + nextTile.size.x
      ? furthestTile
      : nextTile;
    }).x;
    const y = this.ground.reduce((furthestTile, nextTile) =>  {
      return furthestTile.y + furthestTile.size.y > nextTile.y + nextTile.size.y
      ? furthestTile
      : nextTile;
    }).y;
    return { x, y };
  }

  processGrid(config) {
    var playerSpawn = [50, 50];  // hilariously dumb default
    var mobs = [];
    var ground = [];
    var scale = config.scale || [10, 10];
    var grid = config.grid.trim().split('\n');
    for (var row in grid) {
      var gridLine = grid[row];
      for (var col in gridLine) {
        var cell = gridLine[col];
        if (cell === '.') continue;
        var x = +col * scale[0];
        var y = +row * scale[1];
        // NOTA BENE: The following conditions are non-exclusive.  I believe that to be a feature.
        if (cell === config.playerLetter) {
          playerSpawn = [x, y]
        }
        if (config.ground[cell]) {
          ground.push(config.ground[cell](x, y));
        }
        if (config.mobs[cell]) {
          mobs.push(config.mobs[cell](this.game, this.mode, x, y));
        }
      }
    }
    return [ground, playerSpawn, mobs];
  }

}

export default Level;
