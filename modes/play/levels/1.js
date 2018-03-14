class Level1 {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.ground = (() => {
      const arr = [];
      for (var i=2; i<300; i++) {
        if (i % 25 > 0) {
          arr.push(new GroundTile(i*20, 300))
        }

        if (!(i % 14 > 0)) {
          arr.push(new Trampoline(i*20,240));
        }

        if (!(i % 8 > 0)) {
          arr.push(new GroundTile(i*20,140));
        }
      }
      return arr;
    })()
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
