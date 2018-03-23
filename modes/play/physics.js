class PlayModePhysics {
  constructor(game, mode) {
    this.game = game;
    this.mode = mode;
    this.constants = {
      gravity: 8,
    }
  }

  do() {
    this.processInput();
    this.collisions();
    this.mode.state.mobs.forEach(mob => mob.physics());
  }

  processInput() {
    let action;
    if (this.mode.input.actions.includes('exit')) {
      this.exit(action);
    };
  }

  collisions() {
    this.mode.state.mobs.forEach(mob => {
      this.mobCollisions(mob);
      // mob.collision(tile);
    })
  }

  mobCollisions(mob) {
    return true;
  };



// Input Handlers
  pause(action) {
    if (action === 'pause') { this.mode.exit('pause'); }
  }

  exit(action) {
    // Should just be able to pass the action, but that's not how I set it up.
    if (action === 'exit') { this.mode.exit('start'); }
    else if (action === 'pause') { this.mode.exit(action); };
  }
}
