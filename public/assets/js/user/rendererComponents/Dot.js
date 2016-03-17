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
    let loop = new Circle(0, 0, this.loopedRadius, this.maxLoopedRadius,
      this.dotType.color, this.loopedAlpha);

    // in new elements, the initial radius is set as 0 and the element is given
    // an additional parameter, 'destRadius' containing the element's radius
    // once the element has grown / been populated. this is needed because the
    // 'baseRadius' argument in a Circle's constructor is used to draw a
    // bitmap of that size, and if it's value is 0, no matter how much you 
    // increase the scale / grow it, it won't show up. 
    let mainBaseRadius = (typeof this.destRadius === 'number' ?
      this.destRadius : this.radius);

    let main = new Circle(0, 0, this.radius, mainBaseRadius,
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
    if (this.children[0].currentRadius !== this.loopedRadius ||
      this.children[0].alpha !== this.loopedAlpha) {

      this.children[0].update(this.loopedRadius, this.loopedAlpha);
    }

    // redraw main circle
    if (this.children[1].currentRadius !== this.radius) {
      this.children[1].update(this.radius, 1);
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
  constructor(x, y, currentRadius, baseRadius, color, alpha) {
    super();

    this.baseRadius = baseRadius;
    this.currentRadius = currentRadius;
    this.color = color;
    this.alpha = 1;

    this.lineStyle(0);
    this.beginFill(color, this.alpha);
    // this.drawCircle(x, y, radius);
    this.drawEllipse(x, y, this.baseRadius, this.baseRadius);
    this.endFill();

    this.update(this.currentRadius, alpha);
  }

  update(radius, alpha) {
    this.currentRadius = radius;
    // console.log(this.currentRadius / this.baseRadius);
    this.alpha = alpha;
    this.scale.x = this.currentRadius / this.baseRadius;
    this.scale.y = this.currentRadius / this.baseRadius;

  }
}

export default Dot;