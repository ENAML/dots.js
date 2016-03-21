import eventEmitter from "./utils/eventEmitter";
import layoutManager from "./layoutManager";
import mathUtils from "./utils/mathUtils";
import Board from "./Board";
import Renderer from "./Renderer";
import ticker from "./utils/ticker";

import colors from "./config/colors";
let colorScheme = colors.colorScheme;

import animationTest from "./utils/animationTest";

class GameView {
  constructor(options) {
    this.el = PIXI.autoDetectRenderer(layoutManager.width,
      layoutManager.height, {backgroundColor : colorScheme.dark.bg, antialias: true});

    options.container.appendChild(this.el.view);

    this.mousePressed = false;
    this.currentMousePos = {
      clientX: 0,
      clientY: 0
    };

  }

  start() {
    this.board = new Board();
    this.renderController = new Renderer({
      renderer: this.el,
      board: this.board
    });

    this.bindEvents();

    ticker.add(this.update, this);
    ticker.start();
  }

  bindEvents() {
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));

    eventEmitter.on('layout:resize', this.resize, this);
  }

  /**
   * Touch Events
   */
  mouseDown(e) {
    if (this.board.hasChanged) return;

    let hoverEl = this.getHoverEl(e);
    if (!hoverEl) return;
    if (!this.mouseInEl(e, hoverEl)) return;

    hoverEl.newlyActive = true;
    this.board.activeEls.push(hoverEl);

    this.mousePressed = true;

    this.currentMousePos = e;
  }

  mouseMove(e) {
    if (!this.mousePressed ||!this.board.activeEls.length ||
      this.board.hasChanged) return;

    this.currentMousePos = e;

    let hoverEl = this.getHoverEl(this.currentMousePos);
    if (!hoverEl) return;


    if (this.mouseInEl(this.currentMousePos, hoverEl) &&
      !this.board.loopCompleted) {

      this.handleMouseInEl(hoverEl);
    } else {
      this.handleMouseOutEl(hoverEl);
    }


  }

  mouseUp() {
    if (this.board.hasChanged) return;

    this.board.turn();
    this.mousePressed = false;
  }


  getHoverEl(e) {
    let x = e.clientX;
    let y = e.clientY;

    for (let i = 0; i < this.board.grid.elements.length; i++) {
      let element = this.board.grid.elements[i];
      let elRect = {
        x: element.gridPos.x * this.renderController.elWidth,
        y: element.gridPos.y * this.renderController.elHeight,
        width: this.renderController.elWidth,
        height: this.renderController.elHeight
      }

      if (mathUtils.pointInRect(x, y, elRect)) {
        return element;
      }
    }
  }

  mouseInEl(e, element) {
    let x = e.clientX;
    let y = e.clientY;
    let circle = {
      x: element.gridPos.x * this.renderController.elWidth + this.renderController.elWidth / 2,
      y: element.gridPos.y * this.renderController.elHeight + this.renderController.elHeight / 2,
      radius: this.renderController.maxElSize / 2
    }

    return mathUtils.circlePointCollision(x, y, circle);
  }

  handleMouseInEl(hoverEl) {
    let currentEl = this.board.activeEls[this.board.activeEls.length - 1];
    let neighbors = this.board.grid.getNeighbors(currentEl.gridPos);

    // hoverEl is NOT in activeEls array but IS a neighbor of currentEl
    // and is of the same type as is the same type as currentEl
    if (hoverEl.dotType.id === currentEl.dotType.id &&
      this.board.activeEls.indexOf(hoverEl) === -1 &&
      neighbors.indexOf(hoverEl) !== -1) {

      hoverEl.newlyActive = true;
      this.board.activeEls.push(hoverEl);
    }

    // loop is completed
    else if (hoverEl.dotType.id === currentEl.dotType.id &&
      this.board.activeEls.indexOf(hoverEl) === 0 &&
      neighbors.indexOf(hoverEl) !== -1 &&
      this.board.activeEls.length >= 4) {

      this.board.activeEls.push(hoverEl);
      this.board.loopCompleted = true;
    }
  }


  /**
   * This method is kinda complicated. In short, it determines when to remove
   * the last element of the activeEls array when the user is trying to. It could
   * probably be simplified vastly but it seems to work for now.
   *
   * Note: if window.debug = true and you set window.rectBetweenRecents to
   * the rectangle, it will be drawn in renderer.render().
   *
   * Steps:
   * - get the most recent and the second most recent activeEls
   * - get the grid vector pointing from the most recent to the second most recent
   * - generate a rectangle to represent this vector in screen space and modify
   * the x, y, width, & height such that it doesn't overlap too much with either element
   * - do a hit / collision test to check if cursor is in this rectangle
   * and if so remove / [].pop() the most recent activeEl
   */
  handleMouseOutEl( /*hoverEl */ ) {

    // only try to move back if array length is 2 or more
    if (this.board.activeEls.length < 2) return;

    let mostRecentActiveEl =
      this.board.activeEls[this.board.activeEls.length - 1];

    let secondMostRecentActiveEl =
      this.board.activeEls[this.board.activeEls.length - 2];

    let vectToSecondMostRecent =
      secondMostRecentActiveEl.gridPos.subtract(mostRecentActiveEl.gridPos);

    let rectBetweenRecents = {
      width: vectToSecondMostRecent.x * this.renderController.elWidth,
      height: vectToSecondMostRecent.y * this.renderController.elHeight,
    };

    if (rectBetweenRecents.width !== 0) // horizontal collision rectangle
    {
      let shiftX;
      if (rectBetweenRecents.width > 0) {
        rectBetweenRecents.width -= this.renderController.maxElSize;
        shiftX = (this.renderController.maxElSize / 2);
      } else {
        rectBetweenRecents.width += this.renderController.maxElSize;
        shiftX = -(this.renderController.maxElSize / 2);
      }

      rectBetweenRecents.height = this.renderController.maxElSize / 1.5;

      rectBetweenRecents.y = (mostRecentActiveEl.gridPos.y * this.renderController.elHeight) +
        (this.renderController.elHeight / 2) - (rectBetweenRecents.height / 2);
      rectBetweenRecents.x = (mostRecentActiveEl.gridPos.x * this.renderController.elWidth) +
        (this.renderController.elWidth / 2) + shiftX;

    } else // vertical collision rectangle
    {
      let shiftY;
      if (rectBetweenRecents.height > 0) {
        rectBetweenRecents.height -= this.renderController.maxElSize;
        shiftY = (this.renderController.maxElSize / 2);
      } else {
        rectBetweenRecents.height += this.renderController.maxElSize;
        shiftY = -(this.renderController.maxElSize / 2);
      }

      rectBetweenRecents.width = this.renderController.maxElSize / 1.5;

      rectBetweenRecents.y = (mostRecentActiveEl.gridPos.y * this.renderController.elHeight) +
        (this.renderController.elHeight / 2) + shiftY;
      rectBetweenRecents.x = (mostRecentActiveEl.gridPos.x * this.renderController.elWidth) +
        (this.renderController.elWidth / 2) - (rectBetweenRecents.width / 2);
    }

    if (mathUtils.pointInRect(this.currentMousePos.clientX,
      this.currentMousePos.clientY, rectBetweenRecents)) {

      this.board.activeEls.pop();
      if (this.board.loopCompleted) this.board.loopCompleted = false;
    }

    // window.rectBetweenRecents = rectBetweenRecents;
  }

  /**
   * Resize method called by eventEmittered when
   * layoutManager detects a window resize
   */
  resize(width, height) {
    this.el.view.width = width;
    this.el.view.height = height;
    this.el.resize(width, height);
    this.renderController.resize(width, height);
  }

  /**
   * Main Update Loop
   */
  update() {

    if (window.debug && !this.board.hasChanged) {
      animationTest(this.board);
    }

    this.renderController.update(this.board, this.currentMousePos);
    this.renderController.renderer.render(this.renderController.stage);
  }
}

module.exports = GameView;