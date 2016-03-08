class Dot extends PIXI.Container {
  constructor(options) {
    super();

    this.currentX = options.currentX;
    this.currentY = options.currentY;
    this.prevX = options.prevX;
    this.prevY = options.prevY;
    this.dotType = options.dotType;
    this.radius = options.radius;
    this.destRadius = options.destRadius;
    this.loopedRadius = options.loopedRadius;
    this.maxLoopedRadius = options.maxLoopedRadius;
    this.loopedAlpha = options.loopedAlpha;
    this.loopCompleted = options.loopCompleted;

    this.createChildren();
    this.update(false);
  }

  createChildren() {
    let loop = new Circle(this.x, this.y, this.loopedRadius,
      this.dotType.color, this.loopedAlpha);

    let main = new Circle(this.x, this.y, this.radius,
      this.dotType.color, 1);

    this.addChild(loop);
    this.addChild(main);
  }

  update(usePreviousPosition) {
    let x = usePreviousPosition ? this.prevX : this.currentX;
    let y = usePreviousPosition ? this.prevY : this.currentY;

    if (this.position.x !== x || this.position.y !== y) {
      this.position.x = x;
      this.position.y = y;
    }
  }

  remove() {
    for (let i = this.children.length - 1; i >= 0; i--) {
      let element = this.children[i];
      element.clear();
      element.destroy(true);
      this.removeChild(element);
      
    }
  }
}


// There was an error being thrown
// when destroying PIXI.Graphics elements that used
// a drawCircle method were being removed / destroyed
// in Chrome (not Firefox). Seems like drawEllipse works though
class Circle extends PIXI.Graphics {
  constructor(x, y, radius, color, alpha) {
    super();

    this._radius = radius;

    this.lineStyle(0);
    this.beginFill(color, alpha);
    // this.drawCircle(x, y, radius);
    this.drawEllipse(x, y, radius, radius);
    this.endFill();
  }
}

export default Dot;