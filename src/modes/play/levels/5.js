import GroundTile from '../objects/groundTile';
import Trampoline from '../objects/trampoline';
import BadGuy from '../objects/badGuy';
import {SolidBackground, VectorPyramidBackground}  from './backgrounds';

export default {
  scale: [20, 20],
  grid: `
........................................................................................................................
........X...............................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
..p..XX..T.X........X..........X.............X.................X........................................................
........T...............................................................................................................
.......T.......T........T......T........................................................................................
...........g.........XX...g.............g............g..................................................................
..XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXX......
..XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXX......
..XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXX......
`,

  ground: {
    X: (x, y) => new GroundTile(x, y),
    T: (x, y) => new Trampoline(x, y),
  },

  mobs: {
    g: (g, m, x, y) => new BadGuy(g, m, x, y),
    //k: (g, m, x, y) => new Kooper(g, m, x, y),
  },

  playerLetter: 'p',

  misc: {
    deathAltitude: 500,
  },

  backgrounds: [
    (g, m, scale) => new SolidBackground(g, m, {
      fillStyle: 'skyblue',
    }),
    (g, m, scale) => new VectorPyramidBackground(g, m, {
      x: 8 * scale[0],
      y: 16 * scale[1],
      width: 16 * scale[0],
      height: 12 * scale[1],
      parallax: .3,
      fillStyle: 'moccasin',
    }),
    (g, m, scale) => new VectorPyramidBackground(g, m, {
      x: 18 * scale[0],
      y: 16 * scale[1],
      width: 12 * scale[0],
      height: 8 * scale[1],
      parallax: .4,
      fillStyle: 'khaki',
    }),
  ]

}
