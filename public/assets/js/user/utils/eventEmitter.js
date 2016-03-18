import EventEmitter from "eventemitter3";

class CustomEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

const eventEmitter = new CustomEmitter();
module.exports = eventEmitter;