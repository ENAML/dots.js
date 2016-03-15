/**
 * Returns a tweening function that can be called on every frame,
 * modifying the object's properties that should be changed over time.
 * 
 * Optional onProgress and onComplete callbacks can passed in, and will
 * be called at end of function depending on whether it is still tweening
 * or has been completed.
 */
export function getNewTween(obj, props, duration, easingFn, onProgress, onComplete) {
  let starts = {};
  let changes = {};
  let startTime = new Date();

  var prop;

  for(prop in props) {
    starts[prop] = obj[prop];
    changes[prop] = props[prop] - starts[prop];
  }

  let currentTime;

  return function() {
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
      for(var prop in props) {
        obj[prop] = easingFn(currentTime, starts[prop], changes[prop], duration);
      }

      // pass in arguments in case you need to reference
      // something when calling returned function in callback
      if (onComplete) onComplete(arguments);
    }
  }
}


/* eslint-disable */

// simple linear tweening - no easing
// t: current time, b: beginning value, c: change in value, d: duration
export function linearTween(t, b, c, d) {
  return c * t / d + b;
}

 ///////////// QUADRATIC EASING: t^2 ///////////////////

// quadratic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds
export function easeInQuad(t, b, c, d) {
  return c*(t/=d)*t + b;
};

// quadratic easing out - decelerating to zero velocity
export function easeOutQuad(t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
};

// quadratic easing in/out - acceleration until halfway, then deceleration
export function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
};




/**
 * Other Penner Easing fns
 * (see: https://github.com/bit101/CodingMath/blob/master/episode29/penner_easing.as)
 */


 ///////////// CUBIC EASING: t^3 ///////////////////////

// cubic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
export function easeInCubic(t, b, c, d) {
  return c*(t/=d)*t*t + b;
};

// cubic easing out - decelerating to zero velocity
export function easeOutCubic(t, b, c, d) {
  return c*((t=t/d-1)*t*t + 1) + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
export function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
};


 ///////////// QUINTIC EASING: t^5  ////////////////////

// quintic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be frames or seconds/milliseconds
export function easeInQuint(t, b, c, d) {
  return c*(t/=d)*t*t*t*t + b;
};

// quintic easing out - decelerating to zero velocity
export function easeOutQuint(t, b, c, d) {
  return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

// quintic easing in/out - acceleration until halfway, then deceleration
export function easeInOutQuint(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
  return c/2*((t-=2)*t*t*t*t + 2) + b;
};


 ///////////// OTHER EASING  ////////////////////

// back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
export function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};


// bounce easing out
export function easeOutBounce(t, b, c, d) {
  if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
};



/* eslint-enable */