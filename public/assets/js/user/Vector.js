

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // should ONLY use this when manipulating grid vectors
  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(val) {
    return new Vector(this.x * val, this.y * val);
  }
}

module.exports = Vector;
