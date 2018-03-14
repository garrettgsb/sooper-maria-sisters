class Level1 {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.ground = (() => {
      const arr = [];
      var alignments = [
        [25, GroundTile, 300, true],
        [14, Trampoline, 240],
        [8, GroundTile, 140],
      ]
      for (var i = 2; i < 300; i++) {
        for (var [modulus, ObjectClass, height, invert] of alignments) {
          if (( invert && (i % modulus === 0)) || (!invert && (i % modulus !== 0))) {
            arr.push(new ObjectClass(i * 20, height));
          }
        }
      }
      return arr;
    })();
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
