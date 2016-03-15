
/**
 * LayoutManager is a singleton. Only one instance should be used per game
 */

class LayoutManager {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', (e) => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }
}


const layoutManager = new LayoutManager();

module.exports = layoutManager;
