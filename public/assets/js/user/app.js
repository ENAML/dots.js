
// imports
import GameView from "./GameView";

//first thing: monkey patch
if ( !location.origin ) {
  location.origin = location.protocol + "//" + location.host;
}

//an easy to access global object
window.Common = window.Common || {};

// set debug status
window.debug = true;

$( window ).resize();


class MyApp {
  constructor() {
    this.$el = $('#content');

    this.gameView = new GameView({
      container: this.$el,
    });

    this.start();

  }

  start() {
    this.gameView.start();

    $( window ).resize();
  }

};


//kickoff app
$( () => {
  window.FastClick.attach(document.body);
  window.app = new MyApp();

  (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();stats.domElement.style.cssText='position:fixed;left:0;top:0;z-index:10000';document.body.appendChild(stats.domElement);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
} );
