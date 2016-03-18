import layoutManager from "./layoutManager";
import Vector from "./Vector";
import Grid from "./Grid";
import Dot from "./GameElements/Dot";


class Board {
  constructor (options) {
    if (!options) options = {};
    options.width = options.width || 16;
    options.height = options.height || 8;

    this.grid = new Grid({
      width: options.width,
      height: options.height
    })

    // calculate element dimensions
    this.elWidth = layoutManager.width / this.grid.width;
    this.elHeight = layoutManager.height / this.grid.height;
    this.maxElSize = Math.min(this.elWidth, this.elHeight) / 2;

    // populate grid's elements array
    for (let i = 0; i < this.grid.height; i++) {
      for (let j = 0; j < this.grid.width; j++) {
        let newDot = new Dot({
          x: j,
          y: i,
        });
        this.grid.setElement(new Vector(j, i), newDot);
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
    // every single element of activeEls type / id / color.
    // ALSO: need to pop lasts element of activeEls array
    // because it is a repeat of the last.
    if (this.loopCompleted) {
      this.activeEls.pop();
      let typeId = this.activeEls[0].dotType.id;
      for (let i = 0; i < this.grid.elements.length; i++) {
        let element = this.grid.elements[i];
        if (element.dotType.id === typeId &&
          this.activeEls.indexOf(element) === -1) {

          this.activeEls.push(element);
        }
      }
    }
  }

  removeActiveElsFromGrid () {
    // remove activeEls from grid
    for (let i = 0; i < this.grid.elements.length; i++) {
      let element = this.grid.elements[i];

      if (this.activeEls.indexOf(element) !== -1) {
        this.grid.setElement(element.gridPos, null);
      }
    }
  }


  /**
   * adds property to each grid element with a reference
   * to its previous position for use when animating
   */
  addPreviousPositions() {
    for (let i = 0; i < this.grid.elements.length; i++) {
      let element = this.grid.elements[i];
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

        let elAbove = this.grid.getElement(new Vector(x, y));

        this.grid.setElement(new Vector(x, y + 1), elAbove);
        this.grid.setElement(new Vector(x, y), null);

        y--;
      }
    }

    // if element exists in position, correct it's gridPos.
    for (let i = 0; i < this.grid.height; i++) {
      for (let j = 0; j < this.grid.width; j++) {
        let gridPos = new Vector(j, i);

        let element = this.grid.getElement(gridPos);
        if (element) {
          element.gridPos = gridPos;
        }
      }
    }
  }

  createNewEls() {
    for (let i = 0; i < this.grid.height; i++) {
      for (let j = 0; j < this.grid.width; j++) {
        let gridPos = new Vector(j, i);

        let element = this.grid.getElement(gridPos);
        if (!element) {
          let newDot = new Dot(gridPos);
          this.grid.setElement(gridPos, newDot);
        }
      }
    }
  }

  finishTurn() {
    this.setChanged(true);
  }


}

module.exports = Board;
