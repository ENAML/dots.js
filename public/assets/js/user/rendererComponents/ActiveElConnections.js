import colors from "../config/colors";
let colorScheme = colors.colorScheme;

class ActiveElConnections extends PIXI.Container {
  constructor() {
    super();
  }

  clearChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].clear();
    }
  }

  /**
   * Looks for a child graphics object at a given index
   * within container's children array. If none exists,
   * creates a new one. Then returns graphics object.
   */
  getChildGfx(index) {
    let childGfx;

    if (!this.children[index]) {
      childGfx = new PIXI.Graphics();
      this.addChild(childGfx);
    } else {
      childGfx = this.children[index];
    }

    return childGfx;
  }


  /**
   * If there are any connections between active elements, loops through
   * them and draws connections, then connects final element with mouse pos.
   * Otherwise just connects the current active element with mouse pos.
   */
  drawConnections(renderer, board, currentMousePos) {
    this.clearChildren();

    if (board.activeEls.length < 1) return;

    let childIndex = 0; // index of child graphics object to draw connection on
    let childGfx;

    let thickness = renderer.maxElSize / 4;
    let color = colorScheme[window.colorScheme].activeElConnections;

    if (board.activeEls.length > 1) {
      for (let i = 1; i < board.activeEls.length; i++) {

        let prevEl = board.activeEls[i - 1];
        let prevElX = prevEl.gridPos.x * renderer.elWidth + renderer.elWidth / 2;
        let prevElY = prevEl.gridPos.y * renderer.elHeight + renderer.elHeight / 2;

        let currentEl = board.activeEls[i];
        let currentElX = currentEl.gridPos.x * renderer.elWidth + renderer.elWidth / 2;
        let currentElY = currentEl.gridPos.y * renderer.elHeight + renderer.elHeight / 2;

        childGfx = this.getChildGfx(childIndex);

        this.drawConnection(prevElX, prevElY, currentElX, currentElY,
          childGfx, thickness, color);

        childIndex++;
      }
    }

    childGfx = this.getChildGfx(childIndex);

    let lastEl = board.activeEls[board.activeEls.length - 1];
    let lastElX = lastEl.gridPos.x * renderer.elWidth + renderer.elWidth / 2;
    let lastElY = lastEl.gridPos.y * renderer.elHeight + renderer.elHeight / 2;

    let firstElX, firstElY;

    if (board.loopCompleted) // connect back to first el
    {
      let firstEl = board.activeEls[0];
      firstElX = firstEl.gridPos.x * renderer.elWidth + renderer.elWidth / 2;
      firstElY = firstEl.gridPos.y * renderer.elHeight + renderer.elHeight / 2;

    } 
    else // connect to mouse cursor
    {
      firstElX = currentMousePos.clientX;
      firstElY = currentMousePos.clientY;
    }

    this.drawConnection(lastElX, lastElY, firstElX, firstElY,
      childGfx, thickness, color);
  }


  /**
   * Given coordinates of two points, a graphics object,
   * thickness, and a color, draws a rounded rectangle
   * connecting the two points.
   */
  drawConnection(x0, y0, x1, y1, gfx, thickness, color) {
    let dx = x1 - x0;
    let dy = y1 - y0;

    let centerX = x0 + (dx / 2);
    let centerY = y0 + (dy / 2);

    let distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);

    gfx.position.x = centerX;
    gfx.position.y = centerY;
    gfx.rotation = angle;

    gfx.beginFill(color, 1);
    gfx.drawRoundedRect(-distance/2, -thickness/2,
      distance, thickness, thickness / 2);
  }
}

export default ActiveElConnections;