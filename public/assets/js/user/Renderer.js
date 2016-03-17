import Dot from "./rendererComponents/Dot";
import * as turnAnimations from "./rendererComponents/turnAnimations";
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
        if (element.tween) element.tween = null;
      }
      for (let i = this.nonShiftingEls.children.length - 1; i >= 0; i--) {
        let element = this.nonShiftingEls.removeChildAt(i);
        this.staticStateEls.addChild(element);
        if (element.tween) element.tween = null;
      }
      for (let i = this.newEls.children.length - 1; i >= 0; i--) {
        let element = this.newEls.removeChildAt(i);
        this.staticStateEls.addChild(element);
        if (element.tween) element.tween = null;
      }

      // MUST GET RID OF ACTIVE ELEMENTS
      for (let i = this.activeEls.children.length - 1; i >= 0; i--) {
        let element = this.activeEls.children[i];
        this.activeEls.removeChild(element);
        element.remove();
        element.destroy(true);
      }

      this.activeElConnections.clear();
      this.activeElConnections.alpha = 1;
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
        loopedRadius: board.loopCompleted ? board.maxElSize / 1.5 : board.maxElSize / 2,
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
    this.canShowNew = false;

    // this.turnAnimationSteps.push(turnAnimations.waitForFrames(this, 50));
    // this.turnAnimationSteps.push(turnAnimations.hideActiveElConnection(this));
    this.turnAnimationSteps.push(turnAnimations.shrinkActive(this));
    this.turnAnimationSteps.push(turnAnimations.shiftDown(this));
    this.turnAnimationSteps.push(turnAnimations.populateNew(this));
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
      }

    } else {

      this.drawActiveElConnections(board, currentMousePos);

      for (let i = 0; i < this.staticStateEls.children.length; i++) {
        let element = this.staticStateEls.children[i];

        if (element) {


          // increases / decreases size of loopedRadius
          if (board.loopCompleted &&
            board.activeEls[0].dotType === element.dotType &&
            element.loopedRadius < element.maxLoopedRadius &&
            !element.tween) {

            element.tween = tweens.getNewTween(element, {
              loopedRadius: element.maxLoopedRadius
            }, 300, tweens.easeInOutQuad, null,
            () => {
              element.tween = null;
            });

          } else if (!board.loopCompleted &&
            element.loopedRadius > element.radius &&
            !element.tween) {

            element.tween = tweens.getNewTween(element, {
              loopedRadius: element.radius
            }, 300, tweens.easeInOutQuad, null,
            () => {
              element.tween = null;
            });

          }
          if (element.tween) element.tween();
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
