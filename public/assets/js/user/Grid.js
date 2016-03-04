import Vector from "Vector";


const NEIGHBORS = [
  new Vector(0, -1), // NORTH
  new Vector(1, 0), // EAST
  new Vector(0, 1), // SOUTH
  new Vector(-1, 0) // WEST
];

class Grid {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;

    // create elements array
    this.elements = new Array(this.width * this.height);
  }


  /**
   * Element Vector methods
   */
  getElement(vector) {
    return this.elements[(vector.y * this.width) + vector.x];
  }

  setElement(vector, el) {
    this.elements[(vector.y * this.width) + vector.x] = el;
  }

  getNeighbors(vector) {
    let neighbors = [];
    for (let i = 0; i < NEIGHBORS.length; i++) {
      neighbors.push(this.getElement(vector.add(NEIGHBORS[i])));
    }

    return neighbors;
  }
}


module.exports = Grid;