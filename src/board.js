class Board {
    constructor(canvas, cellSize) {
        this.width = canvas.width;
        this.height = canvas.height;

        // Instead of this.width/height
        this.dim = {x: canvas.width, y: canvas.height}

        this.cellSize = cellSize;
        this.grid = this.calcGridSize(this.width, this.height, this.cellSize);
        this.midpoint = {
            x: Math.floor(this.grid.x / 2),
            y: Math.floor(this.grid.y / 2)
        }

        this.areas = {
          play: new Area(...this.calcPlayArea(), this.cellSize),
        };
    }

    newArea(x, y, width, height, name) {
      this.areas[name] = new Area(x, y, width, height, this.canvas, this.cellSize);
    }

    calcGridSize(width, height, cellSize) {
        const x = (width - (width % cellSize)) / cellSize;
        const y = (height - (height % cellSize)) / cellSize;
        return {x, y}
    }

    calcPlayArea() {
      // Tetris-specific
      let playWidth = ((this.width / 3) * 2)
      playWidth = playWidth - (playWidth % this.cellSize)
      return [0, 0, playWidth, this.height]
    }
}

class Area {
  constructor(x, y, width, height, cellSize) {
    // super(canvas, cellSize);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.grid = this.calcGridSize(this.width, this.height, this.cellSize);
  }

  get columns() {
    return this.width / this.cellSize;
  }

  get rows() {
    return this.height / this.cellSize
  }

  get coords() {
    return [this.x, this.y, this.width, this.height]
  }

  absCoords(x, y) {
    // Used for rendering
    // console.log(this.x, this.y);
    return [this.x + x, this.y + y];
  }

  calcGridSize(width, height, cellSize) {
      const x = (width - (width % cellSize)) / cellSize;
      const y = (height - (height % cellSize)) / cellSize;
      return {x, y}
  }
}

export default Board;
