import layoutManager from "layoutManager";
import * as tweens from "utils/tweens";

class Renderer {
  constructor(options) {
    this.context = options.context;

    this.staticStateEls = []; // this is used when turn animations aren't happening
    this.prepareStaticData(options.board);
    this.resetRendererState();
  }

  resetRendererState() {
    this.isAnimatingTurn = false;
    this.activeEls = [];
    this.shiftingEls = [];
    this.nonShiftingEls = [];
    this.newEls = [];
    this.turnAnimationSteps = [];
    this.usePrevPosForShiftingEls = false;
    this.canShowNew = false;
  }

  /**
   * Prepares array of data required to render board in static state
   */
  prepareStaticData(board) {

    if (this.staticStateEls.length === 0) // should only run when game starts
    {
      for (let i = 0; i < board.grid.elements.length; i++) {
        let element = board.grid.elements[i];
        this.staticStateEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
      }
    }
    else // this should run whenever a turn is over and animations are done
    {
      this.staticStateEls = [];
      for (let i = 0; i < this.shiftingEls.length; i++) {
        this.staticStateEls.push(this.shiftingEls[i]);
      }
      for (let i = 0; i < this.nonShiftingEls.length; i++) {
        this.staticStateEls.push(this.nonShiftingEls[i]);
      }
      for (let i = 0; i < this.newEls.length; i++) {
        this.staticStateEls.push(this.newEls[i]);
      }
    }

   }


  /**
   * Prepares arrays of data required for turn animations to complete
   */
  prepareTurnAnimationData(board) {
    this.isAnimatingTurn = true;

    for (let i = 0; i < board.activeEls.length; i++) {
      let element = board.activeEls[i];
      this.activeEls.push({
        currentX: element.gridPos.x,
        currentY: element.gridPos.y,
        dotType: element.dotType,
        radius: board.maxElSize / 2,
        loopedRadius: board.maxElSize / 1.5,
        maxLoopedRadius: board.maxElSize / 1.5,
        loopedAlpha: 0.5,
        loopCompleted: board.loopCompleted
      });
    }
    for (let i = 0; i < board.grid.elements.length; i++) {
      let element = board.grid.elements[i];

      // elements that are changing position
      if (element.previousGridPos &&
        (element.previousGridPos.x !== element.gridPos.x ||
        element.previousGridPos.y !== element.gridPos.y)) {

        this.shiftingEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          prevX: element.previousGridPos.x,
          prevY: element.previousGridPos.y,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
      }

      // new elements
      else if (!element.previousGridPos) {
        this.newEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          prevX: element.gridPos.x,
          prevY: -100,
          dotType: element.dotType,
          radius: 0,
          destRadius: board.maxElSize / 2,
          loopedRadius: 0,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
      }

      // elements that are not changing position
      else {
        this.nonShiftingEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.maxElSize / 2,
          maxLoopedRadius: board.maxElSize / 1.5,
          loopedAlpha: 0.5,
        });
      }
    }

    this.turnAnimationSteps.push(this.shrinkActive().bind(this));
    // this.turnAnimationSteps.push(this.waitForFrames(25).bind(this));
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

      for (let i = 0; i < this.activeEls.length; i++) {
        let element = this.activeEls[i];

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
        this.activeEls = [];
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

    for (let i = 0; i < this.shiftingEls.length; i++) {
      let element = this.shiftingEls[i];

      if (!sortedShift2DArr[element.currentX]) {
        sortedShift2DArr[element.currentX] = [];
      }

      sortedShift2DArr[element.currentX].push(element);
    }

    sortedShift2DArr = sortedShift2DArr.filter(Boolean); // removes empty

    // add frame delays based on prevX and prevY values
    for (let i = 0; i < sortedShift2DArr.length; i++) {
      let elementArr = sortedShift2DArr[i];

      for (let j = 0; j < elementArr.length; j++) {
        elementArr[j].shiftFrameDelay = baseShiftFrameDelay * i;
      }
    }

    let tweenLength = 500; // in ms

    let state = {
      shiftCompleted: true
    };

    return function() {
      if (!this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = true;

      state.shiftCompleted = true;

      for (let i = 0; i < sortedShift2DArr.length; i++) {
        for (let j = 0; j < sortedShift2DArr[i].length; j++) {
          let element = sortedShift2DArr[i][j];

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
            }, tweenLength, tweens.easeInOutCubic,
            (args) => {
              args[0].shiftCompleted = false;
            });
          }

          element.tween(state);
        }
      }

      if (state.shiftCompleted) {
        for (let i = 0; i < this.shiftingEls.length; i++) {
          this.shiftingEls[i].tween = null;
        }

        this.turnAnimationSteps.shift();
      }
    }
  }

  // increase radius of new els until they reach normal size
  populateNew() {
    let totalNewEls = this.newEls.length;
    for (let i = 0; i < totalNewEls; i++) {
      this.newEls[i].spawnFrameDelay = Math.floor(
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

      for (let i = 0; i < this.newEls.length; i++) {
        let element = this.newEls[i];

        if (element.spawnFrameDelay > 0) {
          element.spawnFrameDelay -= 1;
          state.populationComplete = false;
          continue;
        }

        // stores new tween function to be called on every frame
        if (!element.tween) {
          console.log('first pass')
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
  render(board, currentMousePos) {
    if (board.hasChanged && !this.isAnimatingTurn) {
      this.prepareTurnAnimationData(board);
    }

    this.context.clearRect(0, 0, layoutManager.width, layoutManager.height);

    // debug draws
    if (window.debug && window.rectBetweenRecents) {
      this.drawBackBounds();
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
      }

    } else {
      if (board.activeEls.length > 0) {
        this.drawActiveElConnections(board, currentMousePos);
      }

      for (var i = 0; i < this.staticStateEls.length; i++) {
        var element = this.staticStateEls[i];

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

          this.drawElement(board, element, false);
        }
      }
    }
  }

  drawTurnAnimationBoard(board) {

    if (this.activeEls.length > 0) {
      for (let i = 0; i < this.activeEls.length; i++) {
        let element = this.activeEls[i];
        this.drawElement(board, element, false);
      }
    }

    for (let i = 0; i < this.shiftingEls.length; i++) {
      let element = this.shiftingEls[i];
      this.drawElement(board, element, this.usePrevPosForShiftingEls);
    }
    for (let i = 0; i < this.nonShiftingEls.length; i++) {
      let element = this.nonShiftingEls[i];
      this.drawElement(board, element, false);
    }

    if (this.canShowNew) {
      for (let i = 0; i < this.newEls.length; i++) {
        let element = this.newEls[i];
        this.drawElement(board, element, false);
      }
    }
  }

  drawElement(board, element, usePreviousPos) {

    if (element.radius < 0) return;

    this.context.fillStyle = element.dotType.color;

    let gridX = usePreviousPos ? element.prevX : element.currentX;
    let gridY = usePreviousPos ? element.prevY : element.currentY;

    let x = gridX * board.elWidth + board.elWidth / 2;
    let y = gridY * board.elHeight + board.elHeight / 2;

    if (element.loopedRadius > element.radius) {

      this.context.globalAlpha = Math.max(element.loopedAlpha, 0);
      this.context.beginPath();
      this.context.arc(x, y, Math.max(element.loopedRadius, 0), 0, Math.PI * 2, false);
      this.context.fill();
      this.context.globalAlpha = 1;
    }

    this.context.beginPath();
    this.context.arc(x, y, element.radius, 0, Math.PI * 2, false);
    this.context.fill();
  }



  drawActiveElConnections(board, currentMousePos) {
    this.context.beginPath();
    this.context.lineWidth = board.maxElSize / 4;
    this.context.strokeStyle = "#333";

    if (board.activeEls.length > 1) {
      for (var i = 1; i < board.activeEls.length; i++) {
        let prevEl = board.activeEls[i - 1];
        this.context.moveTo(prevEl.gridPos.x * board.elWidth + board.elWidth / 2,
          prevEl.gridPos.y * board.elHeight + board.elHeight / 2);

        let currentEl = board.activeEls[i];
        this.context.lineTo(currentEl.gridPos.x * board.elWidth + board.elWidth / 2,
          currentEl.gridPos.y * board.elHeight + board.elHeight / 2);
      }
    }

    let lastEl = board.activeEls[board.activeEls.length - 1];
    this.context.moveTo(lastEl.gridPos.x * board.elWidth + board.elWidth / 2,
      lastEl.gridPos.y * board.elHeight + board.elHeight / 2);

    if (board.loopCompleted) {
      let firstEl = board.activeEls[0];
      this.context.lineTo(firstEl.gridPos.x * board.elWidth + board.elWidth / 2,
        firstEl.gridPos.y * board.elHeight + board.elHeight / 2);
    } else {
      this.context.lineTo(currentMousePos.clientX, currentMousePos.clientY);
    }
    this.context.stroke();
  }

  drawBackBounds() {
    this.context.fillStyle = "#ccc";
    this.context.fillRect(rectBetweenRecents.x, rectBetweenRecents.y,
      rectBetweenRecents.width, rectBetweenRecents.height);

  }
}

module.exports = Renderer;
