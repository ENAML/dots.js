import mathUtils from "../utils/mathUtils";
import Vector from "../Vector";

import colors from "../config/colors";
let colorScheme = colors.colorScheme;
// debugger;

const DOTTYPES = [
  {
    id: 1,
    name: 'red',
    color: colorScheme[window.colorScheme].red,
  },
  // {
  //   id: 2,
  //   name: 'yellow',
  //   color: colorScheme[window.colorScheme].yellow
  // },
  // {
  //   id: 3,
  //   name: 'green',
  //   color: colorScheme[window.colorScheme].green
  // },
  {
    id: 4,
    name: 'blue',
    color: colorScheme[window.colorScheme].blue
  },
  {
    id: 5,
    name: 'purple',
    color: colorScheme[window.colorScheme].purple
  }
];

class Dot {
  constructor(options) {
    this.gridPos = new Vector(options.x, options.y);
    this.dotType = DOTTYPES[mathUtils.randomInt(0, DOTTYPES.length - 1)];
  }
}

module.exports = Dot;
