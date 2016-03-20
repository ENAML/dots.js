import eventEmitter from "../utils/eventEmitter";


class Dot extends PIXI.Container {
  constructor(options) {
    super();

    this.currentX = options.currentX;
    this.currentY = options.currentY;
    this.prevX = options.prevX;
    this.prevY = options.prevY;
    this.dotType = options.dotType;
    this.radius = Math.floor(options.radius);
    this.destRadius = options.destRadius ? Math.floor(options.destRadius) : null;
    this.loopedRadius = Math.floor(options.loopedRadius);
    this.maxLoopedRadius = Math.floor(options.maxLoopedRadius);
    this.loopedAlpha = options.loopedAlpha;
    this.loopCompleted = options.loopCompleted;

    this.createChildren();

    this.update(false);
  }

  createChildren() {
    let loop = circleSpriteGenerator.createNewCircle(this.loopedRadius,
      this.maxLoopedRadius, this.dotType.color, this.loopedAlpha, false);

    // in new elements, the initial radius is set as 0 and the element is given
    // an additional parameter, 'destRadius' containing the element's final radius
    // once it has grown / been populated. this is needed because the
    // 'baseRadius' argument in a Circle's constructor is used to draw a
    // bitmap of that size, and if it's value is 0, no matter how much you 
    // increase the scale / grow it, it won't show up. 
    let mainBaseRadius = (typeof this.destRadius === 'number' ?
      this.destRadius : this.radius);

    // let main = new Circle(0, 0, this.radius, mainBaseRadius,
    //   this.dotType.color, 1);
    let main = circleSpriteGenerator
      .createNewCircle(this.radius, mainBaseRadius, this.dotType.color, 1, true);

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

      element.destroy();
      this.removeChild(element);
      
    }
  }
}


class Circle extends PIXI.Sprite {
  constructor(texture, currentRadius, baseRadius, color, alpha) {
    super(texture);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.baseRadius = baseRadius;
    this.currentRadius = currentRadius;
    this.color = color;
    this.alpha = alpha;

    // this.lineStyle(0);
    // this.beginFill(color, this.alpha);
    // // this.drawCircle(x, y, radius);
    // this.drawEllipse(0, 0, this.baseRadius, this.baseRadius);
    // this.endFill();

    this.update(this.currentRadius, alpha);
  }

  update(radius, alpha) {
    this.currentRadius = radius;

    this.alpha = alpha;
    this.scale.x = this.currentRadius / this.baseRadius;
    this.scale.y = this.currentRadius / this.baseRadius;

  }
}


// There was an error being thrown
// when destroying PIXI.Graphics elements that used
// a drawCircle method were being removed / destroyed
// in Chrome (not Firefox). Seems like drawEllipse works though
class CircleSpriteGenerator {
  constructor() {
    this.graphics = new PIXI.Graphics();

    this.loopCircleTextures = {};
    this.circleTextures = {};

    eventEmitter.on('layout:resize', this.flushCaches, this);
  }


  /**
   * Called by eventEmitter on resize. Since circle textures
   * are based on window size, we need to clear them and create
   * new ones whenever the window resizes.
   */
  flushCaches() {
    let i;
    for (i in this.loopCircleTextures) {
      delete this.loopCircleTextures[i];
    }
    for (i in this.circleTextures) {
      delete this.circleTextures[i];
    }
    // debugger;
  }


  /**
   * Returns a new instance of Circle sprite class
   * if the texture required for that color has already
   * been generated, get it from cache. Otherwise, create new one.
   */
  createNewCircle(currentRadius, baseRadius, color, alpha, isMain) {
    let texture;

    let cache = isMain ? 'circleTextures' : 'loopCircleTextures';

    if (this[cache].hasOwnProperty(color.toString())) {
      texture = this[cache][color.toString()];

    } else {
      // this.graphics.width = baseRadius * 2;
      // this.graphics.height = baseRadius * 2;
      this.graphics.lineStyle();
      this.graphics.beginFill(color, 1);
      this.graphics.drawEllipse(baseRadius, baseRadius, baseRadius, baseRadius);

      texture = this.graphics.generateTexture();
      this[cache][color.toString()] = texture;

      this.graphics.clear();
    }

    let sprite = new Circle(texture, currentRadius,
      baseRadius, currentRadius, alpha);

    return sprite;
  }
}
const circleSpriteGenerator = new CircleSpriteGenerator();


export default Dot;