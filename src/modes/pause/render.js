class PauseModeRender {
  constructor(game, mode) {
    this.game = game;
    this.backgroundColor = '#bbb';
  }

  do() {
    this.clearCanvas();
    this.drawText('pausss', 220+(Math.random()*20), 280+(Math.random()*20), '#222', 50+(Math.floor(Math.random() * 20)));
    this.drawRect(40, 40, '#0d0', 5);
  }

  clearCanvas() {
    this.drawRect(0, 0, this.backgroundColor, this.game.board.width, this.game.board.height);
  }

  drawText(text, x, y, color, size) {
    const textSize = `${size}px`;
    const ctx = this.game.ctx;
    ctx.fillStyle = color
    ctx.font = `${textSize} monospace`
    ctx.fillText(text, x, y);
  }

  drawRect(x, y, color, width, height) {
    const ctx = this.game.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  drawCell(x, y, color, cellSize) {
    const ctx = this.game.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
  }
}

export default PauseModeRender;
