class Level {
  constructor(game, mode, config) {
    this.game = game;
    this.mode = mode;
    this.ground = config.ground;      // TODO: maybe later this will need a deep copy?
  }

  get mobs() {
    return [];
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
}
