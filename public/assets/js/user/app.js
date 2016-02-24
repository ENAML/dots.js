//babel polyfill
import "babelify/polyfill";

// imports
import GameView from "GameView";


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
} );
