level2config = {
  ground: (() => {
    const arr = [];
    var alignments = [
      [26, GroundTile, 300, true],
      [6, Trampoline, 240],
      [15, GroundTile, 140],
    ]
    for (var i = 2; i < 300; i++) {
      for (var [modulus, ObjectClass, height, invert] of alignments) {
        if ((!invert && (i % modulus === 0)) || ( invert && (i % modulus !== 0))) {
          arr.push(new ObjectClass(i * 20, height));
        }
      }
    }
    return arr;
  })(),

  coins: [],

  mobs: [
    {
      type: BadGuy,
      coords: [80, 250]
    }
  ],
};
