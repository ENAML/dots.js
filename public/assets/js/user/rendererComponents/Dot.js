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
    let loop = new Circle(0, 0, this.loopedRadius,
      this.dotType.color, this.loopedAlpha);

    let main = new Circle(0, 0, this.radius,
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

    // redraw looped circle
    if (this.children[0].radius !== this.loopedRadius ||
      this.children[0].alpha !== this.loopedAlpha) {

      this.children[0].redraw(this.loopedRadius, this.loopedAlpha);
    }

    // redraw main circle
    if (this.children[1].radius !== this.radius) {
      this.children[1].redraw(this.radius, 1);
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

    this.radius = radius;
    this.color = color;
    this.alpha = alpha;

    this.lineStyle(0);
    this.beginFill(color, this.alpha);
    // this.drawCircle(x, y, radius);
    this.drawEllipse(x, y, this.radius, this.radius);
    this.endFill();
  }

  redraw(radius, alpha) {
    this.radius = radius;
    this.alpha = alpha;

    this.clear();
    this.lineStyle(0);
    this.beginFill(this.color, this.alpha);
    this.drawEllipse(0, 0, this.radius, this.radius);
    this.endFill();
  }
}

export default Dot;