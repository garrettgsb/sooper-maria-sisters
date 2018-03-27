level1config = {
  ground: (() => {
    const arr = [];
    var alignments = [
      [25, GroundTile, 300, true],
      [14, Trampoline, 240],
      [8, GroundTile, 140],
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

  mobs: [
    {
      type: BadGuy,
      coords: [240, 250]
    },
    {
      type: BadGuy,
      coords: [540, 250]
    },
    {
      type: BadGuy,
      coords: [840, 250]
    },
  ]
};
