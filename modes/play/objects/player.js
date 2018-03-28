class Player extends Mob {
  constructor(game, mode, x, y) {
    super(game, mode, x, y)
    this.name = "Player";
    this.brain = new PlayerBrain(this);
    this.color = "#e55";
    this.moveSpeed = 12;
    this.jumpSpeed = 24;
    this.fallSpeed = 4;
    this.accel = 1.5;
    this.frictionCoeff = 0.6;
    this.spritePath = './assets/sprites/player/moira/bunny2_walk1.png';
  }
}

class PlayerBrain extends Brain {
  get actions() {
    return this.meat.mode.input.actions
  }

  die() {
    // TODO: maybe there should be some animation here, hey?
    this.mode.playerNewLife();
  }
}
