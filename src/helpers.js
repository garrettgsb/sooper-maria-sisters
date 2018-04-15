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

export {
  getRanges,
  inRange,
  accelTo,
  decelTo,
};
