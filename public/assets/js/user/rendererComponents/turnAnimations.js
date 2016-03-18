/**
 * These functions represent the steps each turn animation in the Renderer
 */

import * as tweens from "../utils/tweens";


// returns a function that has access to the number of frames
// to wait (in a closure) and counts down to that. it shifts itself
// off of turnAnimationSteps array once the value is 0 or less
export function waitForFrames(renderer, frames) {
  return function() {
    frames--;

    if (frames < 0) {
      renderer.turnAnimationSteps.shift();
    }
  }
}


// hides activeElConnections lines
export function hideActiveElConnection(renderer) {
  let tweenLength = 100; // in ms

  let state = {
    hideCompleted: true
  };

  let tween;

  return function() {
    if (!renderer.usePrevPosForShiftingEls) renderer.usePrevPosForShiftingEls = true;

    state.hideCompleted = true;

    if (!tween) {
      tween = tweens.getNewTween(renderer.activeElConnections, {
        alpha: 0,
      }, tweenLength, tweens.easeInOutQuint,
      (args) => {
        args[0].hideCompleted = false;
      });
    }

    tween(state);

    if (state.hideCompleted) {
      renderer.turnAnimationSteps.shift();
    }
  }
}


// animation to shrink all activeEls
export function shrinkActive(renderer) {

  let tweenLength = 500; // in ms

  // need to store shiftCompleted in object so that it
  // can be modified by tween's onComplete function
  // (just passing a boolean won't work because booleans
  // don't keep memory references and thus it wouldn't
  // be the same variable)
  let state = {
    shrinkCompleted: true
  };

  return function() {
    if (!renderer.usePrevPosForShiftingEls) renderer.usePrevPosForShiftingEls = true;

    state.shrinkCompleted = true;

    for (let i = 0; i < renderer.activeEls.children.length; i++) {
      let element = renderer.activeEls.children[i];

      if (!element.tween) {

        element.tween = tweens.getNewTween(element, {
          radius: 0,
          loopedRadius: element.radius * 1.75,
          loopedAlpha: 0
        }, tweenLength, tweens.easeInOutQuint,
        (args) => {
          args[0].shrinkCompleted = false;
        });
      }

      element.tween(state);

    }

    if (state.shrinkCompleted) {
      renderer.turnAnimationSteps.shift();
    }
  }
}


/**
 * sorts array into a 2d array of [x][y] values, where the
 * x-value determines the delay time before it can start
 * shifting downwards. Then returns the animation function.
 */
export function shiftDown(renderer) {

  let baseShiftFrameDelay = 2;

  // sort elements into 2D array of [x][y]
  let sortedShift2DArr = [];

  for (let i = 0; i < renderer.shiftingEls.children.length; i++) {
    let element = renderer.shiftingEls.children[i];
    let flooredX = Math.floor(element.currentX);

    if (!sortedShift2DArr[flooredX]) {
      sortedShift2DArr[flooredX] = [];
    }

    sortedShift2DArr[flooredX].push(element);
  }

  sortedShift2DArr = sortedShift2DArr.filter(Boolean); // removes empty

  // add frame delays based on prevX and prevY values
  for (let i = 0; i < sortedShift2DArr.length; i++) {
    let elementArr = sortedShift2DArr[i];

    for (let j = 0; j < elementArr.length; j++) {
      elementArr[j].shiftFrameDelay = baseShiftFrameDelay * i;
    }
  }

  let tweenLength = 500; // in ms

  let state = {
    shiftCompleted: true
  };

  return function() {
    if (!renderer.usePrevPosForShiftingEls) renderer.usePrevPosForShiftingEls = true;

    state.shiftCompleted = true;

    let i, j, element;

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
          }, tweenLength, tweens.easeInOutQuad,
          (args) => {
            args[0].shiftCompleted = false;
          });
        }

        element.tween(state);
      }
    }

    if (state.shiftCompleted) {
      for (i = 0; i < renderer.shiftingEls.length; i++) {
        renderer.shiftingEls[i].tween = null;
      }

      renderer.turnAnimationSteps.shift();
    }
  }
}


// increase radius of new els until they reach normal size
export function populateNew(renderer) {
  let totalNewEls = renderer.newEls.children.length;
  for (let i = 0; i < totalNewEls; i++) {
    renderer.newEls.children[i].spawnFrameDelay = Math.floor(
      Math.random() * totalNewEls / 3);
  }

  let tweenLength = 500; // in ms

  let state = {
    populationComplete: true
  };

  return function() {
    if (renderer.usePrevPosForShiftingEls) renderer.usePrevPosForShiftingEls = false;
    if (!renderer.canShowNew) renderer.canShowNew = true;

    state.populationComplete = true;

    for (let i = 0; i < renderer.newEls.children.length; i++) {
      let element = renderer.newEls.children[i];

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
        }, tweenLength, tweens.easeOutBack,
        (args) => {
          args[0].populationComplete = false;
        });
      }

      element.tween(state);

    }

    if (state.populationComplete) {
      for (let i = 0; i < renderer.newEls.length; i++) {
        renderer.newEls[i].tween = null;
      }

      renderer.turnAnimationSteps.shift();
    }
  }
}


