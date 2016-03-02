import layoutManager from "layoutManager";
import Vector from "Vector";
import Dot from "GameElements/Dot";

const NEIGHBORS = [
  new Vector(0, -1), // NORTH
  new Vector(1, 0), // EAST
  new Vector(0, 1), // SOUTH
  new Vector(-1, 0) // WEST
];


class Board {
  constructor (options) {
    if (!options) options = {};
    this.width = options.width || 16;
    this.height = options.height || 8;

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
          y: i,
        });
        this.setElement(new Vector(j, i), newDot);
      }
    }

    this.hasChanged = false; // DO NOT SET THIS VALUE DIRECTLY

    this.cloned = null;

    this.activeEls = [];
    this.loopCompleted = false;
  }


  /**
   * used to set hasChanged var
   *
   * - hasChanged should only be set to "true"
   * at the end of the "turn" function
   * - hasChanged should only be set to "false"
   * by the renderer once all relevant turn animations are done
   */
  setChanged(bool) {
    this.hasChanged = bool;

    if (!bool) {
      this.activeEls = [];
      this.loopCompleted = false;
    }
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
      this.setChanged(false);
      return;
    }

    this.startTurn();

    this.removeActiveElsFromGrid();

    this.addPreviousPositions();

    this.shiftElsDown();

    this.createNewEls();

    this.finishTurn();
  }

  startTurn() {

    // if loop is complete, change activeEls to be array including
    // every single element of activeEls type / id / color
    if (this.loopCompleted) {
      let typeId = this.activeEls[0].dotType.id;
      for (let i = 0; i < this.elements.length; i++) {
        let element = this.elements[i];
        if (element.dotType.id === typeId &&
          this.activeEls.indexOf(element) === -1) {

          this.activeEls.push(element);
        }
      }
    }
  }

  removeActiveElsFromGrid () {
    // remove activeEls from grid
    for (let i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];

      if (this.activeEls.indexOf(element) !== -1) {
        this.setElement(element.gridPos, null);
      }
    }
  }


  /**
   * adds property to each grid element with a reference
   * to its previous position for use when animating
   */
  addPreviousPositions() {
    for (let i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];
      if (!element) continue;

      element.previousGridPos = new Vector(element.gridPos.x, element.gridPos.y);
    }
  }

  shiftElsDown() {
    // sort activeEls so that lowest y's are first in arr
    // (not doing this results in errors while shifting stuff down)
    this.activeEls.sort((a, b) => {
      return a.gridPos.y - b.gridPos.y;
    });

    // shift everything down
    for (let i = 0; i < this.activeEls.length; i++) {
      let element = this.activeEls[i];

      let posVect = element.gridPos;
      let y = posVect.y - 1;
      let x = posVect.x;
      while(y >= 0) {

        let elAbove = this.getElement(new Vector(x, y));

        this.setElement(new Vector(x, y + 1), elAbove);
        this.setElement(new Vector(x, y), null);

        y--;
      }
    }

    // if element exists in position, correct it's gridPos.
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let gridPos = new Vector(j, i);

        let element = this.getElement(gridPos);
        if (element) {
          element.gridPos = gridPos;
        }
      }
    }
  }

  createNewEls() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let gridPos = new Vector(j, i);

        let element = this.getElement(gridPos);
        if (!element) {
          let newDot = new Dot(gridPos);
          this.setElement(gridPos, newDot);
        }
      }
    }
  }

  finishTurn() {
    this.setChanged(true);
  }


}

module.exports = Board;
