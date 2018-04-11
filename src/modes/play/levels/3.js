import GroundTile from '../objects/groundTile';
import Trampoline from '../objects/trampoline';
import BadGuy from '../objects/badGuy';

import {SolidBackground, VectorPyramidBackground}  from './backgrounds';

export default {
  scale: [30, 30],
  grid: `
XXXXXX......................X
X.X.........................X
X...........................X
X...X...............X.......X
X...X.......................X
X.p.X......T................X
X...X...............X.......X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
`,

  ground: {
    X: (x, y) => new GroundTile(x, y),
    T: (x, y) => new Trampoline(x, y),
    p: (x, y) => new Trampoline(x, y),
  },

  mobs: {
  },
  
  playerLetter: 'p',

  misc: {
  },

}
