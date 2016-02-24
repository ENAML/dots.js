import layoutManager from "layoutManager";

class Renderer {
  constructor(options) {
    this.context = options.context;
  }

  render(board, currentMousePos) {
    this.context.clearRect(0, 0, layoutManager.width, layoutManager.height);

    if (window.debug && window.rectBetweenRecents) {
      this.context.fillStyle = "#0000ff";
      this.context.fillRect(rectBetweenRecents.x, rectBetweenRecents.y,
        rectBetweenRecents.width, rectBetweenRecents.height);
    }

    if (board.activeEls.length) {

      this.context.beginPath();
      this.context.lineWidth = board.maxElSize / 4;

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

    for (var i = 0; i < board.elements.length; i++) {
      var element = board.elements[i];
      this.drawElement(board, element);
    }
  }

  drawElement(board, element) {
    if (board.loopCompleted && board.activeEls.indexOf(element) !== -1) {
      // DO SOMETHING
    }

    this.context.fillStyle = element.dotType.color;

    let x = element.gridPos.x * board.elWidth + board.elWidth / 2;
    let y = element.gridPos.y * board.elHeight + board.elHeight / 2;
    this.context.beginPath();
    this.context.arc(x, y, board.maxElSize / 2, 0, Math.PI * 2, false);
    this.context.fill();
  }
}

module.exports = Renderer;
