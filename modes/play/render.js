class PlayModeRender {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.backgroundColor = '#222';
    this.camera = {
      x: 100,
      y: 0
    }
  }

  do() {
    this.updateCamera();
    this.clearCanvas();
    // this.drawText('soupmar', 100+(Math.random()*5), 100+(Math.random()*5), '#bbb', 52+(Math.floor(Math.random() * 4)));
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
      this.drawRect(mob.x, mob.y, mob.color, mob.size.x, mob.size.y);
    });
  }

  drawGround() {
    const currentLevel = this.mode.state.levels[this.mode.currentLevel];
    currentLevel.ground.forEach(tile => {
      this.drawRect(tile.x, tile.y, tile.color, tile.size.x, tile.size.y);
    });
  }

  clearCanvas() {
    this.game.ctx.fillStyle = this.backgroundColor;
    this.game.ctx.fillRect(0, 0, this.game.viewport.x, this.game.viewport.y);
  }

  drawText(text, x, y, color, size) {
    const textSize = `${size}px`;
    const ctx = this.game.ctx;
    ctx.fillStyle = color
    ctx.font = `${textSize} monospace`
    ctx.fillText(text, x-this.camera.x, y-this.camera.y);
  }

  drawRect(x, y, color, width, height) {
    const {x: screenX, y: screenY} = this.screenCoords({ x, y });
    const ctx = this.game.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(screenX, screenY, width, height);
  }

  screenCoords(worldCoords) {
    // worldCoords -> { x, y }
    return {
      x: Math.floor(worldCoords.x - this.camera.x),
      y: Math.floor(worldCoords.y - this.camera.y)
    }
  }

  centerCameraOn(obj) {
    this.camera.x = obj.x - (this.game.viewport.x / 2);
    this.camera.y = obj.y - (this.game.viewport.y / 2);
  }
}
