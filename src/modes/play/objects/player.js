import Mob, {Brain} from './mob';

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
    this.configPower('small');
  }

  configPower(power) {
    this.spriteBank = this.spriteSet(power);
    if (power === 'small') {
      this.size = { x: 18, y: 18 };
      this.jumpSpeed = 24;
    } else if (power === 'large') {
      this.y -= 14;
      this.size = { x: 32, y: 32 };
      this.jumpSpeed = 32;
    } else {
      // If power does not match any prescribed statuses, return without
      // setting new power.
      return
    }

    return this.status.power = power;
  }

  spriteSet(setName) {
    if (setName === 'small') {
      return {
        standing: ['./assets/sprites/player/moira/small/bunny2_stand.png'],
        running: ['./assets/sprites/player/moira/small/bunny2_walk1.png', './assets/sprites/player/moira/small/bunny2_walk2.png'],
        jumping: ['./assets/sprites/player/moira/small/bunny2_jump.png'],
      }
    } else if (setName === 'large') {
      return {
        standing: [
          './assets/sprites/player/moira/large/idle1.png',
          './assets/sprites/player/moira/large/idle2.png',
          './assets/sprites/player/moira/large/idle3.png'
        ],
        running: [
          './assets/sprites/player/moira/large/run1.png',
          './assets/sprites/player/moira/large/run2.png',
          './assets/sprites/player/moira/large/run3.png',
          './assets/sprites/player/moira/large/run4.png',
          './assets/sprites/player/moira/large/run5.png',
        ],
        jumping: ['./assets/sprites/player/moira/large/run2.png'],
      }
    }
  }

  get hitBox() {
    return {
      tL: { x: this.x, y: this.y }, // Top left corner
      tR: { x: this.x + this.size.x, y: this.y }, // Top right corner
      tM: { x: this.x + (this.size.x / 2), y: this.y }, // Top middle
      bL: { x: this.x, y: this.y + this.size.y }, // Bottom left corner
      bR: { x: this.x + this.size.x, y: this.y + this.size.y }, // Bottom right corner
      bM: { x: this.x + (this.size.x / 2), y: this.y + this.size.y }, // Bottom middle
      mL: { x: this.x, y: this.y + (this.size.y / 2) }, // Middle left
      mR: { x: this.x + this.size.x, y: this.y + (this.size.y / 2) }, // Middle right
    }
  }

  processAction(action) {
    if (action === 'left') {
      return this.moveLeft();
    } else if (action === 'right') {
      return this.moveRight();
    } else if (action === 'jump') {
      return this.jump();
    } else if (action === 'run') {
      return this.run();
    } else if (action === 'fungus') {
      this.status.power === 'small' ? this.grow() : this.ungrow();
    }
  }

  die() {
    // TODO: maybe there should be some animation here, hey?
    this.game.audio.playerDie();
    this.mode.playerNewLife();
  }

  grow() {
    // For example, from having consumed Growth Fungus.
    if (this.cooldowns.grow) { return };
    this.setCooldown('grow', 20);
    return this.configPower('large');
  }

  ungrow() {
    if (this.cooldowns.grow) { return };
    this.setCooldown('grow', 20);
    this.game.audio.ungrow();
    return this.configPower('small');
  }
}

class PlayerBrain extends Brain {
  get actions() {
    return this.meat.mode.input.actions
  }
}

export default Player;
