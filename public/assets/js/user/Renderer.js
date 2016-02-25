import layoutManager from "layoutManager";

class Renderer {
  constructor(options) {
    this.context = options.context;

    this.isAnimatingTurn = false;
    this.activeEls = [];
    this.shiftingEls = [];
    this.newEls = [];
    this.turnAnimationSteps = [];
  }

  prepareAnimationTurnData(board) {
    this.isAnimatingTurn = true;
    for (let i = 0; i < board.activeEls.length; i++) {
      let element = board.activeEls[i];
      this.activeEls.push({
        currentX: element.gridPos.x,
        currentY: element.gridPos.y,
        dotType: element.dotType,
        radius: board.maxElSize / 2,
        loopedRadius: board.loopCompleted ? board.maxElSize / 1.5 : null,
        loopedAlpha: board.loopCompleted ? 0.5 : null
      });
    }
    for (let i = 0; i < board.elements.length; i++) {
      let element = board.elements[i];
      if (element.previousGridPos) {
        this.shiftingEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          prevX: element.previousGridPos.x,
          prevY: element.previousGridPos.y,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
        });
      } else {
        this.newEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          prevX: element.gridPos.x,
          prevY: -100,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
        });
      }
    }

    this.turnAnimationSteps.push(this.shrinkActive.bind(this));
  }

  shrinkActive() {
    var shrinkCompleted = true;
    for (let i = 0; i < this.activeEls.length; i++) {
      let element = this.activeEls[i];

      if (element.radius > 0) {
        element.radius -= 1;

        if (element.loopedAlpha && element.loopedAlpha > 0) {
          element.loopedAlpha -= 0.05;
        }
        if (element.loopedRadius && element.loopedRadius > 0) {
          element.loopedRadius -= 1;
        }

        shrinkCompleted = false;
      }
    }

    if (shrinkCompleted) {
      this.activeEls = [];
      this.turnAnimationSteps.shift();
    }
  }


  render(board, currentMousePos) {
    if (board.hasChanged && !this.isAnimatingTurn) {
      this.prepareAnimationTurnData(board);
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
        this.isAnimatingTurn = false;
        board.setChanged(false);
      }

    } else {
      if (board.activeEls.length > 0) {
        this.drawActiveElConnections(board, currentMousePos);
      }

      for (var i = 0; i < board.elements.length; i++) {
        var element = board.elements[i];
        if (element) this.drawElement(board, element);
      }
    }
  }

  drawTurnAnimationBoard(board) {
    if (this.activeEls.length > 0) {
      for (let i = 0; i < this.activeEls.length; i++) {
        let element = this.activeEls[i];
        this.drawTurnAnimationElement(board, element);
      }
    }
  }

  drawTurnAnimationElement(board, element) {

    if (element.radius < 0) return;

    this.context.fillStyle = element.dotType.color;

    let x = element.currentX * board.elWidth + board.elWidth / 2;
    let y = element.currentY * board.elHeight + board.elHeight / 2;

    if (element.loopedRadius && element.loopedAlpha) {

      this.context.globalAlpha = Math.max(element.loopedAlpha, 0);
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

  drawElement(board, element) {
    this.context.fillStyle = element.dotType.color;

    let x = element.gridPos.x * board.elWidth + board.elWidth / 2;
    let y = element.gridPos.y * board.elHeight + board.elHeight / 2;

    if (board.loopCompleted &&
      board.activeEls[0].dotType.id === element.dotType.id) {

      this.context.globalAlpha = 0.5;
      this.context.beginPath();
      this.context.arc(x, y, board.maxElSize / 1.5, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.globalAlpha = 1;
    }

    this.context.beginPath();
    this.context.arc(x, y, board.maxElSize / 2, 0, Math.PI * 2, false);
    this.context.fill();

  }

  drawBackBounds() {
    this.context.fillStyle = "#ccc";
    this.context.fillRect(rectBetweenRecents.x, rectBetweenRecents.y,
      rectBetweenRecents.width, rectBetweenRecents.height);

  }
}

module.exports = Renderer;
