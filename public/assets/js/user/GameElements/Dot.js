import mathUtils from "../utils/mathUtils";
import Vector from "../Vector";

const DOTTYPES = [
  {
    id: 1,
    name: 'red',
    color: '#f15c3b'
  },
  {
    id: 2,
    name: 'yellow',
    color: '#e7dd00'
  },
  {
    id: 3,
    name: 'green',
    color: '#89ed90'
  },
  // {
  //   id: 4,
  //   name: 'blue',
  //   color: '#8abdff'
  // },
  // {
  //   id: 5,
  //   name: 'purple',
  //   color: '#9d5ab7'
  // }
];

class Dot {
  constructor(options) {
    this.gridPos = new Vector(options.x, options.y);
    this.dotType = DOTTYPES[mathUtils.randomInt(0, DOTTYPES.length - 1)];
  }
}

module.exports = Dot;
