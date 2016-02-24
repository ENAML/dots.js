// ------------------------------------------
//  Imports:
// ------------------------------------------

var path = require('path');

// ------------------------------------------
//  Utilities:
// ------------------------------------------

/**
 * Create a new global  variable
 *
 * NOTE: only do do this from root file, and
 * only use if it will be used in many/most files
 */
exports.newGlobal = function(name, pathToModule, basepath) {
  if (basepath) pathToModule = path.join(basepath, pathToModule);
  if (!global[name]) {
    global[name] = require(pathToModule);
  } else {
    throw new Error('Global  `' + name + '` already exists');
  }
};