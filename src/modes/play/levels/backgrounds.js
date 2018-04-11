class Background {
  constructor(game, mode, config, defaults = {}) {
    this.game = game;
    this.mode = mode;
    this.config = Object.assign({}, defaults, config);
  }

  render(renderer) {
  }
}


class SolidBackground extends Background {
  constructor(game, mode, config) {
    super(game, mode, config, {
      fillStyle: 'magenta',
    });
  }

  render(renderer) {
    renderer.clearCanvas(this.config.fillStyle);
  }
}

class VectorPyramidBackground extends Background {
  constructor(game, mode, config) {
    super(game, mode, config, {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      parallax: 0.8,
    });
  }

  render(renderer) {
    renderer.drawPath(
      [
        [this.config.x, this.config.y], 
        [this.config.x + this.config.width/2, this.config.y - this.config.height], 
        [this.config.x + this.config.width, this.config.y]
      ],
      this.config.fillStyle,
      this.config.parallax,
    );
  }
}

export {
  Background,
  SolidBackground,
  VectorPyramidBackground,
};
