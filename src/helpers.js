function getRanges(obj) {
  // Assumes an object with a hitBox method
  const xRange = [obj.hitBox.tL.x, obj.hitBox.tR.x];
  const yRange = [obj.hitBox.tL.y, obj.hitBox.bL.y];
  return [xRange, yRange]
}

function inRange(n, range) {
  // Coord is a number, range is in [x1, x2] (or [y1, y2]) format
  return n <= Math.max(...range) && n >= Math.min(...range);
}


function accelTo(curr, max, rate=2) {
  if (curr < max) {
    return curr + rate;
  }
  return curr;
}

function decelTo(curr, min, rate=2) {
  if (curr > min) {
    return curr - rate;
  }
  return curr;
}

function wontCollide(theyHit, meHit, meVel) {
  // Returns true if a hitbox (theyHit) is too far away from the subject obj's
  // hitbox (meHit) for a collision, based on the subject's velocity (meVel).
  function sq(x) { return x**2; }
  var rangeSquared = meVel.x ** 2 + meVel.y ** 2 + 100;
  var theyX = [theyHit.tR.x, theyHit.tL.x];
  var meX = [meHit.tR.x, meHit.tL.x];
  var diffXSquared = [
    theyX[0] - meX[0],
    theyX[0] - meX[1],
    theyX[1] - meX[0],
    theyX[1] - meX[1],
  ].map(sq);
  var theyY = [theyHit.tR.y, theyHit.bR.y];
  var meY = [meHit.tR.y, meHit.bR.y];
  var diffYSquared = [
    theyY[0] - meY[0],
    theyY[0] - meY[1],
    theyY[1] - meY[0],
    theyY[1] - meY[1],
  ].map(sq);
  return (Math.min(...diffXSquared) > rangeSquared ||
    Math.min(...diffYSquared) > rangeSquared);
}


export {
  getRanges,
  inRange,
  accelTo,
  decelTo,
  wontCollide,
};
