import ImageBank from './imageBank';


class PlayModeRender {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.backgroundColor = '#222';
    this.imageBank = new ImageBank();
    this.camera = {
      x: 100,
      y: 0
    }
  }

  do() {
    this.updateCamera();
    this.clearCanvas();
    // this.drawText('soupmar', 100+(Math.random()*5), 100+(Math.random()*5), '#bbb', 52+(Math.floor(Math.random() * 4)));
    this.drawBackground();
    this.drawMobs();
    this.drawGround();
  }

   updateCamera() {     // return true;
     // Assuming camera is supposed to follow player
    if (this.mode.state.player) {
        // Notice where the player is
        const player = this.mode.state.player;
        const posOnScreen = this.screenCoords({x: player.x, y: player.y});
        if (posOnScreen.x < 0
          || posOnScreen.y < 0
          || posOnScreen.x > this.game.viewport.x
          || posOnScreen.y > this.game.viewport.y) {
            this.centerCameraOn(player);
          }
        if (posOnScreen.x > Math.floor(this.game.viewport.x * 0.33) || posOnScreen.x < Math.floor(this.game.viewport.x * 0.66)) {
          this.camera.x = player.x - Math.floor(this.game.viewport.x * 0.33)
        }

        if (posOnScreen.y < Math.floor(this.game.viewport.y * 0.33)) {
          this.camera.y = player.y - Math.floor(this.game.viewport.y * 0.33)
        }

        if (posOnScreen.y > Math.floor(this.game.viewport.y * 0.66)) {
          this.camera.y = player.y - Math.floor(this.game.viewport.y * 0.66)
        }

        // If the player is more than 35% across the screen
        // And the
        // Set the camera such that
    }
  }

  drawMobs() {
    this.mode.state.mobs.forEach(mob => {
      const [x, y, sizeX, sizeY] = [mob.x, mob.y, mob.size.x, mob.size.y].map(val => Math.floor(val));
      if (mob.sprite) {
        if (mob.status.direction === 'right') {
          this.drawImage(this.imageBank.get(mob.sprite), x, y, sizeX, sizeY);
        } else {
          this.drawImageReversed(this.imageBank.get(mob.sprite), x, y, sizeX, sizeY);
        }
      } else {
        this.drawRect(x, y, sizeX, sizeY);
      }
    });
  }

  drawBackground() {
    const currentLevel = this.mode.state.levels[this.mode.currentLevel];
    if (!currentLevel.backgrounds) return;
    const backgrounds = currentLevel.backgrounds;
    for (let background of backgrounds) {
      background.render(this);
    }
  }

  drawGround() {
    const currentLevel = this.mode.state.levels[this.mode.currentLevel];
    currentLevel.ground.forEach(tile => {
      if (tile.sprite) {
        this.drawImage(this.imageBank.get(tile.sprite), tile.x, tile.y, tile.size.x, tile.size.y);
      } else {
        this.drawRect(tile.x, tile.y, tile.color, tile.size.x, tile.size.y);
      }
    });
  }

  clearCanvas(fillStyle) {
    this.game.ctx.fillStyle = fillStyle || this.backgroundColor;
    this.game.ctx.fillRect(0, 0, this.game.viewport.x, this.game.viewport.y);
  }

  drawText(text, x, y, color, size) {
    const textSize = `${size}px`;
    const ctx = this.game.ctx;
    ctx.fillStyle = color
    ctx.font = `${textSize} monospace`
    ctx.fillText(text, x-this.camera.x, y-this.camera.y);
  }

  drawRect(x, y, color, width, height, parallax = 1) {
    const {x: screenX, y: screenY} = this.screenCoords({ x, y }, parallax);
    const ctx = this.game.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(screenX, screenY, width, height);
  }

  drawPath(points, fillStyle, parallax = 1) {
    points = points
      .map(pt => this.screenCoords({x: pt[0], y: pt[1]}, parallax))
      .map(pt => [pt.x, pt.y]);
    if (points.length < 3) return;
    const ctx = this.game.ctx;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (var point of points.slice(1)) {
      ctx.lineTo(...point);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  drawImage(image, x, y, width, height, parallax = 1) {
    const {x: screenX, y: screenY} = this.screenCoords({ x, y }, parallax);
    const ctx = this.game.ctx;
    ctx.drawImage(image, screenX, screenY, width, height);
  }

  drawImageReversed(image, x, y, width, height) {
    const {x: screenX, y: screenY} = this.screenCoords({ x, y });
    const ctx = this.game.ctx;
    ctx.scale(-1, 1);
    ctx.drawImage(image, -screenX, screenY, -width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  screenCoords(worldCoords, parallax = 1) {
    // worldCoords -> { x, y }
    return {
      x: Math.floor(worldCoords.x - parallax * this.camera.x),
      y: Math.floor(worldCoords.y - parallax * this.camera.y)
    }
  }

  centerCameraOn(obj) {
    this.camera.x = obj.x - (this.game.viewport.x / 2);
    this.camera.y = obj.y - (this.game.viewport.y / 2);
  }
}

export default PlayModeRender;
