
import layoutManager from "./layoutManager";
import Dot from "./RendererElements/Dot";
import * as tweens from "./utils/tweens";

class Renderer {
  constructor(options) {
    this.renderer = options.renderer;
    this.stage = new PIXI.Container();

    this.activeElConnections = new PIXI.Graphics();
    this.stage.addChild(this.activeElConnections);

    this.staticStateEls = new PIXI.Container(); // this is used when turn animations aren't happening
    this.stage.addChild(this.staticStateEls);

    this.prepareStaticData(options.board);
    this.resetRendererState();
  }

  resetRendererState() {
    this.isAnimatingTurn = false;

    if (this.stage.children.indexOf(this.activeEls) !== -1) {
      this.stage.removeChild(this.activeEls);
      this.activeEls.destroy(true);
    }
    this.activeEls = new PIXI.Container();
    this.stage.addChild(this.activeEls);

    if (this.stage.children.indexOf(this.shiftingEls) !== -1) {
      this.stage.removeChild(this.shiftingEls);
      this.shiftingEls.destroy(true);
    }
    this.shiftingEls = new PIXI.Container();
    this.stage.addChild(this.shiftingEls);

    if (this.stage.children.indexOf(this.nonShiftingEls) !== -1) {
      this.stage.removeChild(this.nonShiftingEls);
      this.nonShiftingEls.destroy(true);
    }
    this.nonShiftingEls = new PIXI.Container();
    this.stage.addChild(this.nonShiftingEls);

    if (this.stage.children.indexOf(this.newEls) !== -1) {
      this.stage.removeChild(this.newEls);
      this.newEls.destroy(true);
    }
    this.newEls = new PIXI.Container();
    this.stage.addChild(this.newEls);

    this.turnAnimationSteps = [];
    this.usePrevPosForShiftingEls = false;
    this.canShowNew = false;

  }

  /**
   * Prepares array of data required to render board in static state
   */
  prepareStaticData(board) {

    if (board) // should only run when game starts
    {
      for (let i = 0; i < board.grid.elements.length; i++) {
        let element = board.grid.elements[i];

        let dot = new Dot({
          currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
          currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
        this.staticStateEls.addChild(dot);
      }
    }
    else // this should run whenever a turn is over and animations are done
    {

      this.staticStateEls.removeChildren();

      for (let i = this.shiftingEls.children.length - 1; i >= 0; i--) {
        let element = this.shiftingEls.removeChildAt(i);
        this.staticStateEls.addChild(element);
      }
      for (let i = this.nonShiftingEls.children.length - 1; i >= 0; i--) {
        let element = this.nonShiftingEls.removeChildAt(i);
        this.staticStateEls.addChild(element);
      }
      for (let i = this.newEls.children.length - 1; i >= 0; i--) {
        let element = this.newEls.removeChildAt(i);
        this.staticStateEls.addChild(element);
      }

      // MUST GET RID OF ACTIVE ELEMENTS
      for (let i = this.activeEls.children.length - 1; i >= 0; i--) {
        let element = this.activeEls.children[i];
        this.activeEls.removeChild(element);
        element.remove();
        element.destroy(true);
      }

    }

   }


  /**
   * Prepares arrays of data required for turn animations to complete
   */
  prepareTurnAnimationData(board) {
    this.isAnimatingTurn = true;

    this.staticStateEls.removeChildren();

    for (let i = 0; i < board.activeEls.length; i++) {
      let element = board.activeEls[i];

      let dot = new Dot({
        currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
        currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
        dotType: element.dotType,
        radius: board.maxElSize / 2,
        loopedRadius: board.maxElSize / 1.5,
        maxLoopedRadius: board.maxElSize / 1.5,
        loopedAlpha: 0.5,
        loopCompleted: board.loopCompleted
      });
      this.activeEls.addChild(dot);
    }

    for (let i = 0; i < board.grid.elements.length; i++) {
      let element = board.grid.elements[i];

      // elements that are changing position
      if (element.previousGridPos &&
        (element.previousGridPos.x !== element.gridPos.x ||
        element.previousGridPos.y !== element.gridPos.y)) {

        let dot = new Dot({
          currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
          currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
          prevX: element.previousGridPos.x * board.elWidth + board.elWidth / 2,
          prevY: element.previousGridPos.y * board.elHeight + board.elHeight / 2,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
        this.shiftingEls.addChild(dot);
      }

      // new elements
      else if (!element.previousGridPos) {

        let dot = new Dot({
          currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
          currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
          prevX: element.gridPos.x * board.elWidth + board.elWidth / 2,
          prevY: -100,
          dotType: element.dotType,
          radius: 0,
          destRadius: board.maxElSize / 2,
          loopedRadius: 0,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
        this.newEls.addChild(dot);

      }

      // elements that are not changing position
      else {

        let dot = new Dot({
          currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
          currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
        this.nonShiftingEls.addChild(dot);
      }
    }


    this.usePrevPosForShiftingEls = true;

    // this.turnAnimationSteps.push(this.waitForFrames(20).bind(this));
    this.turnAnimationSteps.push(this.shrinkActive().bind(this));
    this.turnAnimationSteps.push(this.shiftDown().bind(this));
    // this.turnAnimationSteps.push(this.waitForFrames(25).bind(this));
    this.turnAnimationSteps.push(this.populateNew().bind(this));
  }


  /**
   * Animation Code
   */

  // returns a function that has access to the number of frames
  // to wait (in a closure) and counts down to that. it shifts itself
  // off of array once the value is 0 or less
  waitForFrames(frames) {
    return function() {
      frames--;

      if (frames < 0) {
        this.turnAnimationSteps.shift();
      }
    }
  }

  // animation to shrink all activeEls
  shrinkActive() {

    let tweenLength = 1000; // in ms

    // need to store shiftCompleted in object so that it
    // can be modified by tween's onComplete function
    // (just passing a boolean won't work because booleans
    // don't keep memory references and thus it wouldn't
    // be the same variable)
    let state = {
      shrinkCompleted: true
    };

    return function() {
      if (!this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = true;

      state.shrinkCompleted = true;

      for (let i = 0; i < this.activeEls.children.length; i++) {
        let element = this.activeEls.children[i];

        if (!element.tween) {
          
          // need to set this when the loop hasn't been completed
          // because the drawElement function will always draw the
          // looped radius if it is larger than the radius
          if (!element.loopCompleted) {
            element.loopedRadius = element.radius;
          }

          element.tween = tweens.getNewTween(element, {
            radius: 0,
            loopedRadius: element.radius * 1.75,
            loopedAlpha: 0
          }, tweenLength, tweens.easeInOutQuint,
          (args) => {
            args[0].shrinkCompleted = false;
          });
        }

        element.tween(state);

      }

      if (state.shrinkCompleted) {
        this.turnAnimationSteps.shift();
      }
    }
  }

  /**
   * sorts array into a 2d array of [x][y] values, where the
   * x-value determines the delay time before it can start
   * shifting downwards. Then returns the animation function.
   */
  shiftDown() {

    let baseShiftFrameDelay = 1;

    // sort elements into 2D array of [x][y]
    let sortedShift2DArr = [];

    for (let i = 0; i < this.shiftingEls.children.length; i++) {
      let element = this.shiftingEls.children[i];
      let flooredX = Math.floor(element.currentX);

      if (!sortedShift2DArr[flooredX]) {
        sortedShift2DArr[flooredX] = [];
      }

      sortedShift2DArr[flooredX].push(element);
    }

    sortedShift2DArr = sortedShift2DArr.filter(Boolean); // removes empty

    // add frame delays based on prevX and prevY values
    for (let i = 0; i < sortedShift2DArr.length; i++) {
      let elementArr = sortedShift2DArr[i];

      for (let j = 0; j < elementArr.length; j++) {
        elementArr[j].shiftFrameDelay = baseShiftFrameDelay * i;
      }
    }

    let tweenLength = 1000; // in ms

    let state = {
      shiftCompleted: true
    };

    return function() {
      if (!this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = true;

      state.shiftCompleted = true;

      let i, j, element;

      for (i = 0; i < sortedShift2DArr.length; i++) {
        for (j = 0; j < sortedShift2DArr[i].length; j++) {
          element = sortedShift2DArr[i][j];

          // increment wait frames down until 0
          if (element.shiftFrameDelay > 0) {
            element.shiftFrameDelay -= 1;
            state.shiftCompleted = false;
            continue;
          }

          // stores new tween function to be called on every frame
          if (!element.tween) {
            element.tween = tweens.getNewTween(element, {
              prevY: element.currentY
            }, tweenLength, tweens.easeInOutQuint,
            (args) => {
              args[0].shiftCompleted = false;
            });
          }

          element.tween(state);
        }
      }

      if (state.shiftCompleted) {
        for (i = 0; i < this.shiftingEls.length; i++) {
          this.shiftingEls[i].tween = null;
        }

        this.turnAnimationSteps.shift();
      }
    }
  }

  // increase radius of new els until they reach normal size
  populateNew() {
    let totalNewEls = this.newEls.children.length;
    for (let i = 0; i < totalNewEls; i++) {
      this.newEls.children[i].spawnFrameDelay = Math.floor(
        Math.random() * totalNewEls);
    }

    let tweenLength = 500; // in ms

    let state = {
      populationComplete: true
    };

    return function() {
      if (this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = false;
      if (!this.canShowNew) this.canShowNew = true;

      state.populationComplete = true;

      for (let i = 0; i < this.newEls.children.length; i++) {
        let element = this.newEls.children[i];

        if (element.spawnFrameDelay > 0) {
          element.spawnFrameDelay -= 1;
          state.populationComplete = false;
          continue;
        }

        // stores new tween function to be called on every frame
        if (!element.tween) {
          element.tween = tweens.getNewTween(element, {
            radius: element.destRadius,
            loopedRadius: element.destRadius
          }, tweenLength, tweens.easeInOutQuad,
          (args) => {
            args[0].populationComplete = false;
          });
        }

        element.tween(state);

      }

      if (state.populationComplete) {
        for (let i = 0; i < this.newEls.length; i++) {
          this.newEls[i].tween = null;
        }

        this.turnAnimationSteps.shift();
      }
    }
  }


  /**
   * Main Render function
   * TODO: add comments and optimize
   */
  update(board, currentMousePos) {
    if (board.hasChanged && !this.isAnimatingTurn) {
      this.prepareTurnAnimationData(board);
    }

    if (this.isAnimatingTurn) {
      if (this.turnAnimationSteps.length > 0) {
        this.turnAnimationSteps[0](board, currentMousePos);
      }

      this.drawTurnAnimationBoard(board);

      if (this.turnAnimationSteps.length === 0) {
        this.prepareStaticData();
        this.resetRendererState();
        board.setChanged(false);
        window.gldebug = true;
      }

    } else {

      this.drawActiveElConnections(board, currentMousePos);

      for (let i = 0; i < this.staticStateEls.children.length; i++) {
        let element = this.staticStateEls.children[i];

        if (element) {

          // increases / decreases size of loopedRadius
          if (board.loopCompleted &&
            board.activeEls[0].dotType === element.dotType &&
            element.loopedRadius < element.maxLoopedRadius) {

            element.loopedRadius += 0.5;
          } else if (!board.loopCompleted &&
            element.loopedRadius > element.radius) {

            element.loopedRadius -= 0.5;
          }

          element.update(false);
        }
      }
    }
  }

  drawTurnAnimationBoard(board) {
    let i;
    let element;

    if (this.activeEls.children.length > 0) {
      for (i = 0; i < this.activeEls.children.length; i++) {
        element = this.activeEls.children[i];
        element.update(false);
      }
    }

    for (i = 0; i < this.shiftingEls.children.length; i++) {
      element = this.shiftingEls.children[i];
      element.update(this.usePrevPosForShiftingEls);
    }
    for (i = 0; i < this.nonShiftingEls.children.length; i++) {
      element = this.nonShiftingEls.children[i];
      element.update(false);
    }

    if (this.canShowNew) {
      for (i = 0; i < this.newEls.children.length; i++) {
        element = this.newEls.children[i];
        element.update(false);
      }
    }
  }

  drawElement(board, element, usePreviousPos) {

    if (element.radius < 0) return;

    this.context.fillStyle = element.dotType.color;

    let x = usePreviousPos ? element.prevX : element.currentX;
    let y = usePreviousPos ? element.prevY : element.currentY;

    if (element.loopedRadius > element.radius) {

      this.context.globalAlpha = element.loopedAlpha;
      this.context.beginPath();
      this.context.arc(x, y, element.loopedRadius, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.globalAlpha = 1;
    }

    this.context.beginPath();
    this.context.arc(x, y, element.radius, 0, Math.PI * 2, false);
    this.context.fill();
  }



  drawActiveElConnections(board, currentMousePos) {
    this.activeElConnections.clear();

    if (board.activeEls.length < 1) return;

    this.activeElConnections.lineStyle(board.maxElSize / 4, 0x333333);

    if (board.activeEls.length > 1) {
      for (var i = 1; i < board.activeEls.length; i++) {
        let prevEl = board.activeEls[i - 1];
        this.activeElConnections.moveTo(prevEl.gridPos.x * board.elWidth + board.elWidth / 2,
          prevEl.gridPos.y * board.elHeight + board.elHeight / 2);

        let currentEl = board.activeEls[i];
        this.activeElConnections.lineTo(currentEl.gridPos.x * board.elWidth + board.elWidth / 2,
          currentEl.gridPos.y * board.elHeight + board.elHeight / 2);
      }
    }

    let lastEl = board.activeEls[board.activeEls.length - 1];
    this.activeElConnections.moveTo(lastEl.gridPos.x * board.elWidth + board.elWidth / 2,
      lastEl.gridPos.y * board.elHeight + board.elHeight / 2);

    if (board.loopCompleted) {
      let firstEl = board.activeEls[0];
      this.activeElConnections.lineTo(firstEl.gridPos.x * board.elWidth + board.elWidth / 2,
        firstEl.gridPos.y * board.elHeight + board.elHeight / 2);
    } else {
      this.activeElConnections.lineTo(currentMousePos.clientX, currentMousePos.clientY);
    }
  }

}

module.exports = Renderer;
