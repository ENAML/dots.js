import layoutManager from "layoutManager";
import Vector from "Vector";
import Dot from "GameElements/Dot";

const NEIGHBORS = [
  new Vector(0, -1), // NORTH
  new Vector(1, 0), // EAST
  new Vector(0, 1), // SOUTH
  new Vector(-1, 0) // WEST
]

class Board {
  constructor (options) {
    if (!options) options = {};
    this.width = options.width || 10;
    this.height = options.height || 10;

    // calculate element dimensions
    this.elWidth = layoutManager.width / this.width;
    this.elHeight = layoutManager.height / this.height;
    this.maxElSize = Math.min(this.elWidth, this.elHeight) / 2;

    // populate elements array
    this.elements = new Array(this.width * this.height);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let newDot = new Dot({
          x: j,
          y: i
        });
        this.setElement(new Vector(j, i), newDot);
      }
    }

    this.activeEls = [];
    this.loopCompleted = false;
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


  /**
   * Turn / Update Methods
   */
  turn() {
    if (this.activeEls.length < 2) {
      this.finishTurn();
      return;
    }

    // remove activeEls from grid
    for (var i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];

      if (this.activeEls.indexOf(element) !== -1) {
        this.setElement(element.gridPos, null);
      }
    }

    // shift everything down
    for (var i = 0; i < this.activeEls.length; i++) {
      let element = this.activeEls[i];

      for (var y = element.gridPos.y; y < 0; y--) {
        let elAbove = this.getElement(new Vector(element.gridPos.x, y - 1));
        console.log(elAbove);
      }
    }

    this.finishTurn();
  }

  finishTurn() {
    this.activeEls = [];
    this.loopCompleted = false;
  }
}

module.exports = Board;
