import GroundTile from '../objects/groundTile';
import Trampoline from '../objects/trampoline';

export default {
  scale: [20, 20],
  grid: `
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
..p..XX....X........X..........X.............X.................X........................................................
........................................................................................................................
...............................T........................................................................................
.......T...g...T........T.g.............g............g..................................................................
..XXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXXXXXXXX......
........................................................................................................................
........................................................................................................................
`,

  ground: {
    X: (x, y) => new GroundTile(x, y),
    T: (x, y) => new Trampoline(x, y),
  },

  mobs: {
    p: '',
    g: '',
  },

  playerLetter: 'p',

  misc: {
  },

}