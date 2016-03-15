webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	// import PIXI from 'pixi.js';
	
	// imports
	
	
	__webpack_require__(2);
	
	var _GameView = __webpack_require__(3);
	
	var _GameView2 = _interopRequireDefault(_GameView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//first thing: monkey patch
	if (!location.origin) {
	  location.origin = location.protocol + "//" + location.host;
	}
	
	//an easy to access global object
	window.Common = window.Common || {};
	
	// set debug status
	window.debug = true;
	
	$(window).resize();
	
	var MyApp = function () {
	  function MyApp() {
	    _classCallCheck(this, MyApp);
	
	    this.$el = $('#content');
	
	    this.gameView = new _GameView2.default({
	      container: this.$el
	    });
	
	    this.start();
	  }
	
	  _createClass(MyApp, [{
	    key: "start",
	    value: function start() {
	      this.gameView.start();
	
	      $(window).resize();
	    }
	  }]);
	
	  return MyApp;
	}();
	
	//kickoff app
	
	
	if (inIframe()) {
	  $(window).load(function () {
	    console.log('starting app (in iframe)');
	    setTimeout(function () {
	      start();
	    }, 1000);
	  });
	} else {
	  $(window).load(function () {
	    console.log('starting app');
	    start();
	  });
	}
	
	function start() {
	  window.app = new MyApp();
	  (function () {
	    var script = document.createElement('script');script.onload = function () {
	      var stats = new Stats();stats.domElement.style.cssText = 'position:fixed;left:0;top:0;z-index:10000';document.body.appendChild(stats.domElement);requestAnimationFrame(function loop() {
	        stats.update();requestAnimationFrame(loop);
	      });
	    };script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);
	  })();
	}
	
	function inIframe() {
	  try {
	    return window.self !== window.top;
	  } catch (e) {
	    return true;
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layoutManager = __webpack_require__(4);
	
	var _layoutManager2 = _interopRequireDefault(_layoutManager);
	
	var _mathUtils = __webpack_require__(5);
	
	var _mathUtils2 = _interopRequireDefault(_mathUtils);
	
	var _Board = __webpack_require__(6);
	
	var _Board2 = _interopRequireDefault(_Board);
	
	var _Renderer = __webpack_require__(10);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(options) {
	    _classCallCheck(this, GameView);
	
	    this.el = document.createElement('canvas');
	    options.container.append(this.el);
	    this.el.width = _layoutManager2.default.width;
	    this.el.height = _layoutManager2.default.height;
	
	    this.context = this.el.getContext("2d");
	
	    this.mousePressed = false;
	    this.currentMousePos = null;
	  }
	
	  _createClass(GameView, [{
	    key: "start",
	    value: function start() {
	      this.board = new _Board2.default();
	      this.renderer = new _Renderer2.default({
	        context: this.context,
	        board: this.board
	      });
	
	      this.bindEvents();
	
	      this.update = this.update.bind(this);
	      this.update();
	    }
	  }, {
	    key: "bindEvents",
	    value: function bindEvents() {
	      document.addEventListener('mousedown', this.mouseDown.bind(this));
	      document.addEventListener('mousemove', this.mouseMove.bind(this));
	      document.addEventListener('mouseup', this.mouseUp.bind(this));
	    }
	
	    /**
	     * Touch Events
	     */
	
	  }, {
	    key: "mouseDown",
	    value: function mouseDown(e) {
	      if (this.board.hasChanged) return;
	
	      var hoverEl = this.getHoverEl(e);
	      if (!hoverEl) return;
	      if (!this.mouseInEl(e, hoverEl)) return;
	
	      this.board.activeEls.push(hoverEl);
	      this.mousePressed = true;
	
	      this.currentMousePos = e;
	    }
	  }, {
	    key: "mouseMove",
	    value: function mouseMove(e) {
	      if (!this.mousePressed || !this.board.activeEls.length || this.board.hasChanged) return;
	
	      this.currentMousePos = e;
	
	      var hoverEl = this.getHoverEl(this.currentMousePos);
	      if (!hoverEl) return;
	
	      if (this.mouseInEl(this.currentMousePos, hoverEl) && !this.board.loopCompleted) {
	
	        this.handleMouseInEl(hoverEl);
	      } else {
	        this.handleMouseOutEl(hoverEl);
	      }
	    }
	  }, {
	    key: "mouseUp",
	    value: function mouseUp(e) {
	      if (this.board.hasChanged) return;
	
	      this.board.turn();
	      this.mousePressed = false;
	    }
	  }, {
	    key: "getHoverEl",
	    value: function getHoverEl(e) {
	      var x = e.clientX;
	      var y = e.clientY;
	
	      for (var i = 0; i < this.board.grid.elements.length; i++) {
	        var element = this.board.grid.elements[i];
	        var elRect = {
	          x: element.gridPos.x * this.board.elWidth,
	          y: element.gridPos.y * this.board.elHeight,
	          width: this.board.elWidth,
	          height: this.board.elHeight
	        };
	
	        if (_mathUtils2.default.pointInRect(x, y, elRect)) {
	          return element;
	        }
	      }
	    }
	  }, {
	    key: "mouseInEl",
	    value: function mouseInEl(e, element) {
	      var x = e.clientX;
	      var y = e.clientY;
	      var circle = {
	        x: element.gridPos.x * this.board.elWidth + this.board.elWidth / 2,
	        y: element.gridPos.y * this.board.elHeight + this.board.elHeight / 2,
	        radius: this.board.maxElSize / 2
	      };
	
	      return _mathUtils2.default.circlePointCollision(x, y, circle);
	    }
	  }, {
	    key: "handleMouseInEl",
	    value: function handleMouseInEl(hoverEl) {
	      var currentEl = this.board.activeEls[this.board.activeEls.length - 1];
	      var neighbors = this.board.grid.getNeighbors(currentEl.gridPos);
	
	      // hoverEl is NOT in activeEls array but IS a neighbor of currentEl
	      // and is of the same type as is the same type as currentEl
	      if (hoverEl.dotType.id === currentEl.dotType.id && this.board.activeEls.indexOf(hoverEl) === -1 && neighbors.indexOf(hoverEl) !== -1) {
	
	        this.board.activeEls.push(hoverEl);
	      }
	
	      // loop is completed
	      else if (hoverEl.dotType.id === currentEl.dotType.id && this.board.activeEls.indexOf(hoverEl) === 0 && neighbors.indexOf(hoverEl) !== -1 && this.board.activeEls.length >= 4) {
	
	          this.board.activeEls.push(hoverEl);
	          this.board.loopCompleted = true;
	        }
	    }
	
	    /**
	     * This method is pretty complicated. In short, it determines when to remove
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
	
	  }, {
	    key: "handleMouseOutEl",
	    value: function handleMouseOutEl(hoverEl) {
	
	      // only try to move back if array length is 2 or more
	      if (this.board.activeEls.length < 2) return;
	
	      var mostRecentActiveEl = this.board.activeEls[this.board.activeEls.length - 1];
	
	      var secondMostRecentActiveEl = this.board.activeEls[this.board.activeEls.length - 2];
	
	      var vectToSecondMostRecent = secondMostRecentActiveEl.gridPos.subtract(mostRecentActiveEl.gridPos);
	
	      var rectBetweenRecents = {
	        width: vectToSecondMostRecent.x * this.board.elWidth,
	        height: vectToSecondMostRecent.y * this.board.elHeight
	      };
	
	      if (rectBetweenRecents.width !== 0) // horizontal collision rectangle
	        {
	          var shiftX = void 0;
	          if (rectBetweenRecents.width > 0) {
	            rectBetweenRecents.width -= this.board.maxElSize;
	            shiftX = this.board.maxElSize / 2;
	          } else {
	            rectBetweenRecents.width += this.board.maxElSize;
	            shiftX = -(this.board.maxElSize / 2);
	          }
	
	          rectBetweenRecents.height = this.board.maxElSize / 1.5;
	
	          rectBetweenRecents.y = mostRecentActiveEl.gridPos.y * this.board.elHeight + this.board.elHeight / 2 - rectBetweenRecents.height / 2;
	          rectBetweenRecents.x = mostRecentActiveEl.gridPos.x * this.board.elWidth + this.board.elWidth / 2 + shiftX;
	        } else // vertical collision rectangle
	        {
	          var shiftY = void 0;
	          if (rectBetweenRecents.height > 0) {
	            rectBetweenRecents.height -= this.board.maxElSize;
	            shiftY = this.board.maxElSize / 2;
	          } else {
	            rectBetweenRecents.height += this.board.maxElSize;
	            shiftY = -(this.board.maxElSize / 2);
	          }
	
	          rectBetweenRecents.width = this.board.maxElSize / 1.5;
	
	          rectBetweenRecents.y = mostRecentActiveEl.gridPos.y * this.board.elHeight + this.board.elHeight / 2 + shiftY;
	          rectBetweenRecents.x = mostRecentActiveEl.gridPos.x * this.board.elWidth + this.board.elWidth / 2 - rectBetweenRecents.width / 2;
	        }
	
	      if (_mathUtils2.default.pointInRect(this.currentMousePos.clientX, this.currentMousePos.clientY, rectBetweenRecents)) {
	
	        this.board.activeEls.pop();
	        if (this.board.loopCompleted) this.board.loopCompleted = false;
	      }
	
	      // window.rectBetweenRecents = rectBetweenRecents;
	    }
	
	    /**
	     * Main Update Loop
	     */
	
	  }, {
	    key: "update",
	    value: function update() {
	
	      requestAnimationFrame(this.update);
	      this.renderer.render(this.board, this.currentMousePos);
	    }
	  }]);
	
	  return GameView;
	}();
	
	module.exports = GameView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * LayoutManager is a singleton. Only one instance should be used per game
	 */
	
	var LayoutManager = function () {
	  function LayoutManager() {
	    _classCallCheck(this, LayoutManager);
	
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	
	    this.bindEvents();
	  }
	
	  _createClass(LayoutManager, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;
	
	      window.addEventListener('resize', function (e) {
	        _this.width = window.innerWidth;
	        _this.height = window.innerHeight;
	      });
	    }
	  }]);
	
	  return LayoutManager;
	}();
	
	var layoutManager = new LayoutManager();
	
	module.exports = layoutManager;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Basic Math Utilities
	 */
	var utils = {
	
	  /**
	   * Normalize:
	   * Calculates a percent (btwn 0 and 1) that a value
	   * represents between a minimum and maximum value
	   *
	   * - Can handle when max is less than min
	   * - Can handle negative numbers
	   * - Can handle when val is greater or less than max / min
	   */
	  norm: function norm(val, min, max) {
	    return (val - min) / (max - min);
	  },
	
	  /**
	   * Lerp (Linear Interpolation):
	   * Takes a normalized number / percentage (between 0 and 1)
	   * and returns the value of it between a range of min and max
	   */
	  lerp: function lerp(norm, min, max) {
	    return (max - min) * norm + min;
	  },
	
	  /**
	   * Map:
	   * Converts a value in one range into
	   * the corresponding value in another range
	   */
	  map: function map(val, sourceMin, sourceMax, destMin, destMax) {
	    return this.lerp(this.norm(val, sourceMin, sourceMax), destMin, destMax);
	  },
	
	  /**
	   * Clamp:
	   * Forces value into range if it is
	   * greater than max or less than min
	   *
	   * - Achieved by calculating the maximum of val and min,
	   * then calculating the minimum of what was returned and max
	   * - Updated function uses second Math.min / Math.max calls
	   * so the function still works when min is greater than max
	   * (good for negative numbers, etc)
	   */
	  clamp: function clamp(val, min, max) {
	    // return Math.min(Math.max(val, min), max);
	    return Math.min(Math.max(val, Math.min(min, max)), Math.max(min, max));
	  },
	
	  /**
	   * Distance:
	   * Calculates distance between two x,y points by using
	   * Pythagoan Theorum to get the hypotenuse.
	   */
	  distance: function distance(x0, y0, x1, y1) {
	    var dx = x1 - x0;
	    var dy = y1 - y0;
	    return Math.sqrt(dx * dx + dy * dy);
	  },
	
	  /**
	   * Circle Collision:
	   * Given two circles, c0 and c1, calculates if distance between
	   * them is greater or less than the sum of their radii
	   */
	  circleCollision: function circleCollision(c0, c1) {
	    return this.distance(c0.x, c0.y, c1.x, c1.y) <= c0.radius + c1.radius;
	  },
	
	  /**
	   * Circle / Point Collision:
	   * Calculates if distance between point and circle is less than radius
	   */
	  circlePointCollision: function circlePointCollision(x, y, circle) {
	    return this.distance(circle.x, circle.y, x, y) <= circle.radius;
	  },
	
	  /**
	   * Point in Rectangle:
	   * Calculates if point is in a rectangle based on rectangle's
	   * x,y coords, width, and height
	   */
	  pointInRect: function pointInRect(x, y, rect) {
	    return this.inRange(x, rect.x, rect.x + rect.width) && this.inRange(y, rect.y, rect.y + rect.height);
	  },
	
	  /**
	   * In Range:
	   * Calcuates if value is between min and max
	   * - Using Math.min & Math.max, min can be larger
	   * than max and vice versa (useful for when width/height
	   * of a rectangle are negative values)
	   */
	  inRange: function inRange(val, min, max) {
	    return val >= Math.min(min, max) && val <= Math.max(min, max);
	  },
	
	  /**
	   * Range Intersect:
	   * Calculates if there is any overlap between two ranges
	   * - Useful for calculating if two rectangles are overlapping
	   * - Updated function wraps everything in Math.min / Math.max
	   * so that mins can be larger than maxes and vise versa
	   */
	  rangeIntersect: function rangeIntersect(min0, max0, min1, max1) {
	    // return max0 >= min1 && min0 <= max1;
	    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
	  },
	
	  /**
	   * Rectangle Intersect
	   * Calculates if two rectangles intersect one another by
	   * comparing the ranges with rangeIntersect function
	   */
	  rectIntersect: function rectIntersect(r0, r1) {
	    return this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) && this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	  },
	
	  /**
	   * randomRange:
	   * Calculates a random number between given range
	   * - Works with negative numbers (ex: get random number btwn -10 and 10)
	   */
	  randomRange: function randomRange(min, max) {
	    return min + Math.random() * (max - min);
	  },
	
	  /**
	   * randomInt:
	   * Calculates a random integer between given range
	   */
	  randomInt: function randomInt(min, max) {
	    return Math.floor(min + Math.random() * (max - min + 1));
	  },
	
	  /**
	   * Random Distribution:
	   * Returns a weighted random number based on the number of
	   * iterations (the higher the iterations, the higher the
	   * chance that the number returned will be in the middle
	   * of the range).
	   */
	  randomDist: function randomDist(min, max, iterations) {
	    var total = 0;
	
	    for (var i = 0; i < iterations; i++) {
	      total += this.randomRange(min, max);
	    }
	
	    return total / iterations;
	  },
	
	  roundToPlaces: function roundToPlaces(value, places) {
	    var mult = Math.pow(10, places);
	    return Math.round(value * mult) / mult;
	  },
	
	  roundNearest: function roundNearest(value, nearest) {
	    return Math.round(value / nearest) * nearest;
	  },
	
	  /**
	   * Degrees to Radians:
	   * Calculates radians from degrees
	   */
	  degreesToRads: function degreesToRads(degrees) {
	    return degrees / 180 * Math.PI;
	  },
	
	  /**
	   * Radians to Degrees:
	   * Calculates degrees from radians
	   */
	  radsToDegrees: function radsToDegrees(radians) {
	    return radians * 180 / Math.PI;
	  },
	
	  /**
	   * RotateTo:
	   * Takes a point in space and rotates it by
	   * an angle around space's center (0,0) coord.
	   *
	   * - You could rotate it around a different
	   * point by modifying point's (x,y) to reflect
	   * a different center coordinate.
	   */
	  rotateTo: function rotateTo(p0, angle) {
	    var cos = Math.cos(angle);
	    var sin = Math.sin(angle);
	
	    var p1 = {
	      x: p0.x * cos - p0.y * sin,
	      y: p0.y * cos + p0.x * sin
	    };
	    return p1;
	  },
	
	
	  /**
	   * Quadratic Bezier Curve:
	   * Two end points and one control point inbetween.
	   * Standard function for computing quadratic
	   * bezier curves. Basically just a super simplified
	   * combination of linear interpolations
	   */
	  quadraticBezier: function quadraticBezier(p0, p1, p2, t, pFinal) {
	    pFinal = pFinal || {};
	    pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
	    pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
	    return pFinal;
	  },
	
	  /**
	   * Cubic Bezier Curve:
	   * Two end points and two control point inbetween.
	   */
	  cubicBezier: function cubicBezier(p0, p1, p2, p3, t, pFinal) {
	    pFinal = pFinal || {};
	    pFinal.x = Math.pow(1 - t, 3) * p0.x + Math.pow(1 - t, 2) * 3 * t * p1.x + (1 - t) * 3 * t * t * p2.x + t * t * t * p3.x;
	    pFinal.y = Math.pow(1 - t, 3) * p0.y + Math.pow(1 - t, 2) * 3 * t * p1.y + (1 - t) * 3 * t * t * p2.y + t * t * t * p3.y;
	    return pFinal;
	  },
	
	  /**
	   * Multi Curve Draw:
	   * Draws a series of connected quadratic curves. Gives
	   * the illusion of being a bezier curve with many mid-points
	   * but not actually 100% accurate. Often good enough though.
	   */
	  multicurve: function multicurve(points, context) {
	    var p0, p1, midx, midy;
	
	    context.moveTo(points[0].x, points[0].y);
	
	    for (var i = 1; i < points.length - 2; i += 1) {
	      p0 = points[i];
	      p1 = points[i + 1];
	      midx = (p0.x + p1.x) / 2;
	      midy = (p0.y + p1.y) / 2;
	      context.quadraticCurveTo(p0.x, p0.y, midx, midy);
	    }
	    p0 = points[points.length - 2];
	    p1 = points[points.length - 1];
	    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
	  }
	
	};
	
	module.exports = utils;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layoutManager = __webpack_require__(4);
	
	var _layoutManager2 = _interopRequireDefault(_layoutManager);
	
	var _Vector = __webpack_require__(7);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _Grid = __webpack_require__(8);
	
	var _Grid2 = _interopRequireDefault(_Grid);
	
	var _Dot = __webpack_require__(9);
	
	var _Dot2 = _interopRequireDefault(_Dot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(options) {
	    _classCallCheck(this, Board);
	
	    if (!options) options = {};
	    options.width = options.width || 16;
	    options.height = options.height || 8;
	
	    this.grid = new _Grid2.default({
	      width: options.width,
	      height: options.height
	    });
	
	    // calculate element dimensions
	    this.elWidth = _layoutManager2.default.width / this.grid.width;
	    this.elHeight = _layoutManager2.default.height / this.grid.height;
	    this.maxElSize = Math.min(this.elWidth, this.elHeight) / 2;
	
	    // populate grid's elements array
	    for (var i = 0; i < this.grid.height; i++) {
	      for (var j = 0; j < this.grid.width; j++) {
	        var newDot = new _Dot2.default({
	          x: j,
	          y: i
	        });
	        this.grid.setElement(new _Vector2.default(j, i), newDot);
	      }
	    }
	
	    this.hasChanged = false; // DO NOT SET THIS VALUE DIRECTLY
	
	    this.cloned = null;
	
	    this.activeEls = [];
	    this.loopCompleted = false;
	  }
	
	  /**
	   * used to set hasChanged var
	   *
	   * - hasChanged should only be set to "true"
	   * at the end of the "turn" function
	   * - hasChanged should only be set to "false"
	   * by the renderer once all relevant turn animations are done
	   */
	
	
	  _createClass(Board, [{
	    key: "setChanged",
	    value: function setChanged(bool) {
	      this.hasChanged = bool;
	
	      if (!bool) {
	        this.activeEls = [];
	        this.loopCompleted = false;
	      }
	    }
	
	    /**
	     * Turn / Update Methods
	     */
	
	  }, {
	    key: "turn",
	    value: function turn() {
	      if (this.activeEls.length < 2) {
	        this.setChanged(false);
	        return;
	      }
	
	      this.startTurn();
	
	      this.removeActiveElsFromGrid();
	
	      this.addPreviousPositions();
	
	      this.shiftElsDown();
	
	      this.createNewEls();
	
	      this.finishTurn();
	    }
	  }, {
	    key: "startTurn",
	    value: function startTurn() {
	
	      // if loop is complete, change activeEls to be array including
	      // every single element of activeEls type / id / color
	      if (this.loopCompleted) {
	        var typeId = this.activeEls[0].dotType.id;
	        for (var i = 0; i < this.grid.elements.length; i++) {
	          var element = this.grid.elements[i];
	          if (element.dotType.id === typeId && this.activeEls.indexOf(element) === -1) {
	
	            this.activeEls.push(element);
	          }
	        }
	      }
	    }
	  }, {
	    key: "removeActiveElsFromGrid",
	    value: function removeActiveElsFromGrid() {
	      // remove activeEls from grid
	      for (var i = 0; i < this.grid.elements.length; i++) {
	        var element = this.grid.elements[i];
	
	        if (this.activeEls.indexOf(element) !== -1) {
	          this.grid.setElement(element.gridPos, null);
	        }
	      }
	    }
	
	    /**
	     * adds property to each grid element with a reference
	     * to its previous position for use when animating
	     */
	
	  }, {
	    key: "addPreviousPositions",
	    value: function addPreviousPositions() {
	      for (var i = 0; i < this.grid.elements.length; i++) {
	        var element = this.grid.elements[i];
	        if (!element) continue;
	
	        element.previousGridPos = new _Vector2.default(element.gridPos.x, element.gridPos.y);
	      }
	    }
	  }, {
	    key: "shiftElsDown",
	    value: function shiftElsDown() {
	      // sort activeEls so that lowest y's are first in arr
	      // (not doing this results in errors while shifting stuff down)
	      this.activeEls.sort(function (a, b) {
	        return a.gridPos.y - b.gridPos.y;
	      });
	
	      // shift everything down
	      for (var i = 0; i < this.activeEls.length; i++) {
	        var element = this.activeEls[i];
	
	        var posVect = element.gridPos;
	        var y = posVect.y - 1;
	        var x = posVect.x;
	        while (y >= 0) {
	
	          var elAbove = this.grid.getElement(new _Vector2.default(x, y));
	
	          this.grid.setElement(new _Vector2.default(x, y + 1), elAbove);
	          this.grid.setElement(new _Vector2.default(x, y), null);
	
	          y--;
	        }
	      }
	
	      // if element exists in position, correct it's gridPos.
	      for (var _i = 0; _i < this.grid.height; _i++) {
	        for (var j = 0; j < this.grid.width; j++) {
	          var gridPos = new _Vector2.default(j, _i);
	
	          var _element = this.grid.getElement(gridPos);
	          if (_element) {
	            _element.gridPos = gridPos;
	          }
	        }
	      }
	    }
	  }, {
	    key: "createNewEls",
	    value: function createNewEls() {
	      for (var i = 0; i < this.grid.height; i++) {
	        for (var j = 0; j < this.grid.width; j++) {
	          var gridPos = new _Vector2.default(j, i);
	
	          var element = this.grid.getElement(gridPos);
	          if (!element) {
	            var newDot = new _Dot2.default(gridPos);
	            this.grid.setElement(gridPos, newDot);
	          }
	        }
	      }
	    }
	  }, {
	    key: "finishTurn",
	    value: function finishTurn() {
	      this.setChanged(true);
	    }
	  }]);
	
	  return Board;
	}();
	
	module.exports = Board;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = function () {
	  function Vector(x, y) {
	    _classCallCheck(this, Vector);
	
	    this.x = x;
	    this.y = y;
	  }
	
	  // should ONLY use this when manipulating grid vectors
	
	
	  _createClass(Vector, [{
	    key: "add",
	    value: function add(vector) {
	      return new Vector(this.x + vector.x, this.y + vector.y);
	    }
	  }, {
	    key: "subtract",
	    value: function subtract(vector) {
	      return new Vector(this.x - vector.x, this.y - vector.y);
	    }
	  }, {
	    key: "multiply",
	    value: function multiply(val) {
	      return new Vector(this.x * val, this.y * val);
	    }
	  }]);
	
	  return Vector;
	}();
	
	module.exports = Vector;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Vector = __webpack_require__(7);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NEIGHBORS = [new _Vector2.default(0, -1), // NORTH
	new _Vector2.default(1, 0), // EAST
	new _Vector2.default(0, 1), // SOUTH
	new _Vector2.default(-1, 0) // WEST
	];
	
	var Grid = function () {
	  function Grid(options) {
	    _classCallCheck(this, Grid);
	
	    this.width = options.width;
	    this.height = options.height;
	
	    // create elements array
	    this.elements = new Array(this.width * this.height);
	  }
	
	  /**
	   * Element Vector methods
	   */
	
	
	  _createClass(Grid, [{
	    key: "getElement",
	    value: function getElement(vector) {
	      return this.elements[vector.y * this.width + vector.x];
	    }
	  }, {
	    key: "setElement",
	    value: function setElement(vector, el) {
	      this.elements[vector.y * this.width + vector.x] = el;
	    }
	  }, {
	    key: "getNeighbors",
	    value: function getNeighbors(vector) {
	      var neighbors = [];
	      for (var i = 0; i < NEIGHBORS.length; i++) {
	        neighbors.push(this.getElement(vector.add(NEIGHBORS[i])));
	      }
	
	      return neighbors;
	    }
	  }]);
	
	  return Grid;
	}();
	
	module.exports = Grid;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _mathUtils = __webpack_require__(5);
	
	var _mathUtils2 = _interopRequireDefault(_mathUtils);
	
	var _Vector = __webpack_require__(7);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOTTYPES = [{
	  id: 1,
	  name: 'red',
	  color: '#f15c3b'
	},
	// {
	//   id: 2,
	//   name: 'yellow',
	//   color: '#e7dd00'
	// },
	// {
	//   id: 3,
	//   name: 'green',
	//   color: '#89ed90'
	// },
	{
	  id: 4,
	  name: 'blue',
	  color: '#8abdff'
	}, {
	  id: 5,
	  name: 'purple',
	  color: '#9d5ab7'
	}];
	
	var Dot = function Dot(options) {
	  _classCallCheck(this, Dot);
	
	  this.gridPos = new _Vector2.default(options.x, options.y);
	  this.dotType = DOTTYPES[_mathUtils2.default.randomInt(0, DOTTYPES.length - 1)];
	};
	
	module.exports = Dot;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _layoutManager = __webpack_require__(4);
	
	var _layoutManager2 = _interopRequireDefault(_layoutManager);
	
	var _tweens = __webpack_require__(11);
	
	var tweens = _interopRequireWildcard(_tweens);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer = function () {
	  function Renderer(options) {
	    _classCallCheck(this, Renderer);
	
	    this.context = options.context;
	
	    this.staticStateEls = []; // this is used when turn animations aren't happening
	    this.prepareStaticData(options.board);
	    this.resetRendererState();
	  }
	
	  _createClass(Renderer, [{
	    key: "resetRendererState",
	    value: function resetRendererState() {
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
	
	  }, {
	    key: "prepareStaticData",
	    value: function prepareStaticData(board) {
	
	      if (this.staticStateEls.length === 0) // should only run when game starts
	        {
	          for (var i = 0; i < board.grid.elements.length; i++) {
	            var element = board.grid.elements[i];
	            this.staticStateEls.push({
	              currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
	              currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
	              dotType: element.dotType,
	              radius: board.maxElSize / 2,
	              loopedRadius: board.maxElSize / 2,
	              maxLoopedRadius: board.maxElSize / 1.5,
	              loopedAlpha: 0.5
	            });
	          }
	        } else // this should run whenever a turn is over and animations are done
	        {
	          this.staticStateEls = [];
	          for (var _i = 0; _i < this.shiftingEls.length; _i++) {
	            this.staticStateEls.push(this.shiftingEls[_i]);
	          }
	          for (var _i2 = 0; _i2 < this.nonShiftingEls.length; _i2++) {
	            this.staticStateEls.push(this.nonShiftingEls[_i2]);
	          }
	          for (var _i3 = 0; _i3 < this.newEls.length; _i3++) {
	            this.staticStateEls.push(this.newEls[_i3]);
	          }
	        }
	    }
	
	    /**
	     * Prepares arrays of data required for turn animations to complete
	     */
	
	  }, {
	    key: "prepareTurnAnimationData",
	    value: function prepareTurnAnimationData(board) {
	      this.isAnimatingTurn = true;
	
	      for (var i = 0; i < board.activeEls.length; i++) {
	        var element = board.activeEls[i];
	        this.activeEls.push({
	          currentX: element.gridPos.x * board.elWidth + board.elWidth / 2,
	          currentY: element.gridPos.y * board.elHeight + board.elHeight / 2,
	          dotType: element.dotType,
	          radius: board.maxElSize / 2,
	          loopedRadius: board.maxElSize / 1.5,
	          maxLoopedRadius: board.maxElSize / 1.5,
	          loopedAlpha: 0.5,
	          loopCompleted: board.loopCompleted
	        });
	      }
	      for (var _i4 = 0; _i4 < board.grid.elements.length; _i4++) {
	        var _element = board.grid.elements[_i4];
	
	        // elements that are changing position
	        if (_element.previousGridPos && (_element.previousGridPos.x !== _element.gridPos.x || _element.previousGridPos.y !== _element.gridPos.y)) {
	
	          this.shiftingEls.push({
	            currentX: _element.gridPos.x * board.elWidth + board.elWidth / 2,
	            currentY: _element.gridPos.y * board.elHeight + board.elHeight / 2,
	            prevX: _element.previousGridPos.x * board.elWidth + board.elWidth / 2,
	            prevY: _element.previousGridPos.y * board.elHeight + board.elHeight / 2,
	            dotType: _element.dotType,
	            radius: board.maxElSize / 2,
	            loopedRadius: board.maxElSize / 2,
	            maxLoopedRadius: board.maxElSize / 1.5,
	            loopedAlpha: 0.5
	          });
	        }
	
	        // new elements
	        else if (!_element.previousGridPos) {
	            this.newEls.push({
	              currentX: _element.gridPos.x * board.elWidth + board.elWidth / 2,
	              currentY: _element.gridPos.y * board.elHeight + board.elHeight / 2,
	              prevX: _element.gridPos.x * board.elWidth + board.elWidth / 2,
	              prevY: -100,
	              dotType: _element.dotType,
	              radius: 0,
	              destRadius: board.maxElSize / 2,
	              loopedRadius: 0,
	              maxLoopedRadius: board.maxElSize / 1.5,
	              loopedAlpha: 0.5
	            });
	          }
	
	          // elements that are not changing position
	          else {
	              this.nonShiftingEls.push({
	                currentX: _element.gridPos.x * board.elWidth + board.elWidth / 2,
	                currentY: _element.gridPos.y * board.elHeight + board.elHeight / 2,
	                dotType: _element.dotType,
	                radius: board.maxElSize / 2,
	                loopedRadius: board.maxElSize / 2,
	                maxLoopedRadius: board.maxElSize / 1.5,
	                loopedAlpha: 0.5
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
	
	  }, {
	    key: "waitForFrames",
	    value: function waitForFrames(frames) {
	      return function () {
	        frames--;
	
	        if (frames < 0) {
	          this.turnAnimationSteps.shift();
	        }
	      };
	    }
	
	    // animation to shrink all activeEls
	
	  }, {
	    key: "shrinkActive",
	    value: function shrinkActive() {
	
	      var tweenLength = 1000; // in ms
	
	      // need to store shiftCompleted in object so that it
	      // can be modified by tween's onComplete function
	      // (just passing a boolean won't work because booleans
	      // don't keep memory references and thus it wouldn't
	      // be the same variable)
	      var state = {
	        shrinkCompleted: true
	      };
	
	      return function () {
	        if (!this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = true;
	
	        state.shrinkCompleted = true;
	
	        for (var i = 0; i < this.activeEls.length; i++) {
	          var element = this.activeEls[i];
	
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
	            }, tweenLength, tweens.easeInOutQuint, function (args) {
	              args[0].shrinkCompleted = false;
	            });
	          }
	
	          element.tween(state);
	        }
	
	        if (state.shrinkCompleted) {
	          this.activeEls = [];
	          this.turnAnimationSteps.shift();
	        }
	      };
	    }
	
	    /**
	     * sorts array into a 2d array of [x][y] values, where the
	     * x-value determines the delay time before it can start
	     * shifting downwards. Then returns the animation function.
	     */
	
	  }, {
	    key: "shiftDown",
	    value: function shiftDown() {
	
	      var baseShiftFrameDelay = 1;
	
	      // sort elements into 2D array of [x][y]
	      var sortedShift2DArr = [];
	
	      for (var i = 0; i < this.shiftingEls.length; i++) {
	        var element = this.shiftingEls[i];
	        var flooredX = Math.floor(element.currentX);
	
	        if (!sortedShift2DArr[flooredX]) {
	          sortedShift2DArr[flooredX] = [];
	        }
	
	        sortedShift2DArr[flooredX].push(element);
	      }
	
	      sortedShift2DArr = sortedShift2DArr.filter(Boolean); // removes empty
	
	      // add frame delays based on prevX and prevY values
	      for (var _i5 = 0; _i5 < sortedShift2DArr.length; _i5++) {
	        var elementArr = sortedShift2DArr[_i5];
	
	        for (var j = 0; j < elementArr.length; j++) {
	          elementArr[j].shiftFrameDelay = baseShiftFrameDelay * _i5;
	        }
	      }
	
	      var tweenLength = 1500; // in ms
	
	      var state = {
	        shiftCompleted: true
	      };
	
	      return function () {
	        if (!this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = true;
	
	        state.shiftCompleted = true;
	
	        var i = void 0,
	            j = void 0,
	            element = void 0;
	
	        for (i = 0; i < sortedShift2DArr.length; i++) {
	          for (j = 0; j < sortedShift2DArr[i].length; j++) {
	            element = sortedShift2DArr[i][j];
	
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
	              }, tweenLength, tweens.easeInOutQuint, function (args) {
	                args[0].shiftCompleted = false;
	              });
	            }
	
	            element.tween(state);
	          }
	        }
	
	        if (state.shiftCompleted) {
	          for (i = 0; i < this.shiftingEls.length; i++) {
	            this.shiftingEls[i].tween = null;
	          }
	
	          this.turnAnimationSteps.shift();
	        }
	      };
	    }
	
	    // increase radius of new els until they reach normal size
	
	  }, {
	    key: "populateNew",
	    value: function populateNew() {
	      var totalNewEls = this.newEls.length;
	      for (var i = 0; i < totalNewEls; i++) {
	        this.newEls[i].spawnFrameDelay = Math.floor(Math.random() * totalNewEls);
	      }
	
	      var tweenLength = 500; // in ms
	
	      var state = {
	        populationComplete: true
	      };
	
	      return function () {
	        if (this.usePrevPosForShiftingEls) this.usePrevPosForShiftingEls = false;
	        if (!this.canShowNew) this.canShowNew = true;
	
	        state.populationComplete = true;
	
	        for (var _i6 = 0; _i6 < this.newEls.length; _i6++) {
	          var element = this.newEls[_i6];
	
	          if (element.spawnFrameDelay > 0) {
	            element.spawnFrameDelay -= 1;
	            state.populationComplete = false;
	            continue;
	          }
	
	          // stores new tween function to be called on every frame
	          if (!element.tween) {
	            element.tween = tweens.getNewTween(element, {
	              radius: element.destRadius,
	              loopedRadius: element.destRadius
	            }, tweenLength, tweens.easeInOutQuad, function (args) {
	              args[0].populationComplete = false;
	            });
	          }
	
	          element.tween(state);
	        }
	
	        if (state.populationComplete) {
	          for (var _i7 = 0; _i7 < this.newEls.length; _i7++) {
	            this.newEls[_i7].tween = null;
	          }
	
	          this.turnAnimationSteps.shift();
	        }
	      };
	    }
	
	    /**
	     * Main Render function
	     * TODO: add comments and optimize
	     */
	
	  }, {
	    key: "render",
	    value: function render(board, currentMousePos) {
	      if (board.hasChanged && !this.isAnimatingTurn) {
	        this.prepareTurnAnimationData(board);
	      }
	
	      this.context.clearRect(0, 0, _layoutManager2.default.width, _layoutManager2.default.height);
	
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
	            if (board.loopCompleted && board.activeEls[0].dotType === element.dotType && element.loopedRadius < element.maxLoopedRadius) {
	
	              element.loopedRadius += 0.5;
	            } else if (!board.loopCompleted && element.loopedRadius > element.radius) {
	
	              element.loopedRadius -= 0.5;
	            }
	
	            this.drawElement(board, element, false);
	          }
	        }
	      }
	    }
	  }, {
	    key: "drawTurnAnimationBoard",
	    value: function drawTurnAnimationBoard(board) {
	      var i = void 0;
	      var element = void 0;
	
	      if (this.activeEls.length > 0) {
	        for (i = 0; i < this.activeEls.length; i++) {
	          element = this.activeEls[i];
	          this.drawElement(board, element, false);
	        }
	      }
	
	      for (i = 0; i < this.shiftingEls.length; i++) {
	        element = this.shiftingEls[i];
	        this.drawElement(board, element, this.usePrevPosForShiftingEls);
	      }
	      for (i = 0; i < this.nonShiftingEls.length; i++) {
	        element = this.nonShiftingEls[i];
	        this.drawElement(board, element, false);
	      }
	
	      if (this.canShowNew) {
	        for (i = 0; i < this.newEls.length; i++) {
	          element = this.newEls[i];
	          this.drawElement(board, element, false);
	        }
	      }
	    }
	  }, {
	    key: "drawElement",
	    value: function drawElement(board, element, usePreviousPos) {
	
	      if (element.radius < 0) return;
	
	      this.context.fillStyle = element.dotType.color;
	
	      // let gridX = usePreviousPos ? element.prevX : element.currentX;
	      // let gridY = usePreviousPos ? element.prevY : element.currentY;
	
	      var x = usePreviousPos ? element.prevX : element.currentX;
	      var y = usePreviousPos ? element.prevY : element.currentY;
	
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
	  }, {
	    key: "drawActiveElConnections",
	    value: function drawActiveElConnections(board, currentMousePos) {
	      this.context.beginPath();
	      this.context.lineWidth = board.maxElSize / 4;
	      this.context.strokeStyle = "#333";
	
	      if (board.activeEls.length > 1) {
	        for (var i = 1; i < board.activeEls.length; i++) {
	          var prevEl = board.activeEls[i - 1];
	          this.context.moveTo(prevEl.gridPos.x * board.elWidth + board.elWidth / 2, prevEl.gridPos.y * board.elHeight + board.elHeight / 2);
	
	          var currentEl = board.activeEls[i];
	          this.context.lineTo(currentEl.gridPos.x * board.elWidth + board.elWidth / 2, currentEl.gridPos.y * board.elHeight + board.elHeight / 2);
	        }
	      }
	
	      var lastEl = board.activeEls[board.activeEls.length - 1];
	      this.context.moveTo(lastEl.gridPos.x * board.elWidth + board.elWidth / 2, lastEl.gridPos.y * board.elHeight + board.elHeight / 2);
	
	      if (board.loopCompleted) {
	        var firstEl = board.activeEls[0];
	        this.context.lineTo(firstEl.gridPos.x * board.elWidth + board.elWidth / 2, firstEl.gridPos.y * board.elHeight + board.elHeight / 2);
	      } else {
	        this.context.lineTo(currentMousePos.clientX, currentMousePos.clientY);
	      }
	      this.context.stroke();
	    }
	  }, {
	    key: "drawBackBounds",
	    value: function drawBackBounds() {
	      this.context.fillStyle = "#ccc";
	      this.context.fillRect(window.rectBetweenRecents.x, window.rectBetweenRecents.y, window.rectBetweenRecents.width, window.rectBetweenRecents.height);
	    }
	  }]);
	
	  return Renderer;
	}();
	
	module.exports = Renderer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNewTween = getNewTween;
	exports.linearTween = linearTween;
	exports.easeInQuad = easeInQuad;
	exports.easeOutQuad = easeOutQuad;
	exports.easeInOutQuad = easeInOutQuad;
	exports.easeInCubic = easeInCubic;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	exports.easeInQuint = easeInQuint;
	exports.easeOutQuint = easeOutQuint;
	exports.easeInOutQuint = easeInOutQuint;
	/**
	 * Returns a tweening function that can be called on every frame,
	 * modifying the object's properties that should be changed over time.
	 * 
	 * Optional onProgress and onComplete callbacks can passed in, and will
	 * be called at end of function depending on whether it is still tweening
	 * or has been completed.
	 */
	function getNewTween(obj, props, duration, easingFn, onProgress, onComplete) {
	  var starts = {};
	  var changes = {};
	  var startTime = new Date();
	
	  var prop;
	
	  for (prop in props) {
	    starts[prop] = obj[prop];
	    changes[prop] = props[prop] - starts[prop];
	  }
	
	  var currentTime = void 0;
	
	  return function () {
	    currentTime = new Date() - startTime;
	
	    if (currentTime < duration) {
	
	      for (prop in props) {
	        obj[prop] = easingFn(currentTime, starts[prop], changes[prop], duration);
	      }
	
	      // pass in arguments in case you need to reference
	      // something when calling returned function in callback
	      if (onProgress) onProgress(arguments);
	    } else {
	
	      currentTime = duration;
	      for (var prop in props) {
	        obj[prop] = easingFn(currentTime, starts[prop], changes[prop], duration);
	      }
	
	      // pass in arguments in case you need to reference
	      // something when calling returned function in callback
	      if (onComplete) onComplete(arguments);
	    }
	  };
	}
	
	/* eslint-disable */
	
	// simple linear tweening - no easing
	// t: current time, b: beginning value, c: change in value, d: duration
	function linearTween(t, b, c, d) {
	  return c * t / d + b;
	}
	
	///////////// QUADRATIC EASING: t^2 ///////////////////
	
	// quadratic easing in - accelerating from zero velocity
	// t: current time, b: beginning value, c: change in value, d: duration
	// t and d can be in frames or seconds/milliseconds
	function easeInQuad(t, b, c, d) {
	  return c * (t /= d) * t + b;
	};
	
	// quadratic easing out - decelerating to zero velocity
	function easeOutQuad(t, b, c, d) {
	  return -c * (t /= d) * (t - 2) + b;
	};
	
	// quadratic easing in/out - acceleration until halfway, then deceleration
	function easeInOutQuad(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	  return -c / 2 * (--t * (t - 2) - 1) + b;
	};
	
	/**
	 * Other Penner Easing fns
	 * (see: https://github.com/bit101/CodingMath/blob/master/episode29/penner_easing.as)
	 */
	
	///////////// CUBIC EASING: t^3 ///////////////////////
	
	// cubic easing in - accelerating from zero velocity
	// t: current time, b: beginning value, c: change in value, d: duration
	// t and d can be frames or seconds/milliseconds
	function easeInCubic(t, b, c, d) {
	  return c * (t /= d) * t * t + b;
	};
	
	// cubic easing out - decelerating to zero velocity
	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	};
	
	// cubic easing in/out - acceleration until halfway, then deceleration
	function easeInOutCubic(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	  return c / 2 * ((t -= 2) * t * t + 2) + b;
	};
	
	///////////// QUINTIC EASING: t^5  ////////////////////
	
	// quintic easing in - accelerating from zero velocity
	// t: current time, b: beginning value, c: change in value, d: duration
	// t and d can be frames or seconds/milliseconds
	function easeInQuint(t, b, c, d) {
	  return c * (t /= d) * t * t * t * t + b;
	};
	
	// quintic easing out - decelerating to zero velocity
	function easeOutQuint(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	};
	
	// quintic easing in/out - acceleration until halfway, then deceleration
	function easeInOutQuint(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	};
	
	/* eslint-enable */

/***/ }
]);
//# sourceMappingURL=bundle.js.map