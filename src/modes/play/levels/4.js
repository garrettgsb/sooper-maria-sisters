import GroundTile from '../objects/groundTile';
import Trampoline from '../objects/trampoline';
import BadGuy from '../objects/badGuy';

import {SolidBackground, VectorPyramidBackground}  from './backgrounds';

export default {
  scale: [20, 20],

  // This grid is a tile-by-tile recreation of World 1-1 of Super Mario Bros.
  // ...If that didn't jump out at you.
  grid: `
  .......................................................................g.g.................................................................................................................
......................X..................................................XXXXXXX...XXXX............................XXX.....XXXX..........................................XX..................
........................................................................................................................................................................XXX..................
.......................................................................................................................................................................XXXX..................
.........................................................X............................................................................................................XXXXX..................
................X...XXXXX.........................XX..................XXX.............X.....XX....X..X..X.......X...........XX......X..X............XXXX.............XXXXXX.............XXX..
..........................................XX......XX...............................................................................XX..XX...........................XXXXXXX.............XXX..
................................XX........XX......XX..............................................................................XXX..XXX.....XX...............XX.XXXXXXXX............XXXXX.
......................g.........XXg.......XX..gg..XX......................................gg.......g......gg..........gg.gg......XXXX..XXXX....XX...........gg..XXXXXXXXXXX........X...XXXXX.
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXXXXXXXXX..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXXXXXXXXX..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
`,

  ground: {
    X: (x, y) => new GroundTile(x, y),
    T: (x, y) => new Trampoline(x, y),
    p: (x, y) => new Trampoline(x, y),
  },

  mobs: {
    g: (g, m, x, y) => new BadGuy(g, m, x, y),
  },

  playerLetter: 'p',

  misc: {
  },

}
