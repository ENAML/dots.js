require( "babelify/polyfill" );

//panel views
import OptionsPanelView from './OptionsPanelView';
import EditorPanelView from './EditorPanelView';
import DocsPanelView from './DocsPanelView';

// main page ui views
import Preloader from './Preloader';
import IFrame from './IFrame';
import FormView from './FormView';

//other stuff
import utils from './utils';
import pipe from './pipe';

//init code mirror
( function() {

	class App {
		constructor() {

			this._currentPageIds = new Set();

			//config panels with a class and an element
			this._panelConfig = {
				optionsPanel: {
					class: OptionsPanelView,
					$el: $( "#panel-options" ),
					exclusive: true,
					$tab : $(".tabs .options-tab")
				},
				editorPanel: {
					class: EditorPanelView,
					$el: $( "#panel-code-editor" ),
					exclusive: true,
					$tab : $(".tabs .editor-tab")
				},
				docsPanel: {
					class: DocsPanelView,
					$el: $( "#panel-docs" )
				}
			};
		}
		init() {

			this.$submissionModal = $( '.submission-modal' );
			this.$homeOverlay = $("#home-overlay");

			// MAKE & INIT FORM VIEW
			this.formView = new FormView( {
				$el: this.$submissionModal
			} );
			this.formView.init();

			// load iframe
			this.iframe = new IFrame( {
				$parent: $( 'body' ),
				src: "../index.php?editor=true"
			} );

			//create a preloader which waits for the preload animation to play out and the iframe to finish loading
			this._preloader = new Preloader( {
				$el: $( "#preloader" ),
				iframe: this.iframe
			} );

			this.iframe.load().then( () => {
				this._preloader.init().then( () => {
					//show options panel
					this.showPanelView( "optionsPanel" );
					// pipe.emit( pipe.events.IFRAME_CONTROL, "editorStartState", "noise" );
					pipe.emit( pipe.events.RUN_CODE )
					pipe.emit( pipe.events.IFRAME_CONTROL, "editorToggleCinematic", "cinematic" );
					this.toggleInfo(true);
				} );
			} );

			this.initPanels();
			this.bindEvents();

		}
		initPanels() {
			//iterate throught object and instantiate views
			Object.keys( this._panelConfig ).forEach( key => {

				let val = this._panelConfig[ key ];

				val.instance = new val.class( val );

				if ( val.instance.init ) {
					val.instance.init();
				}
			} );
		}
		toggleInfo(on) {

			var $lines = this.$homeOverlay.find(".line");

			TweenMax.to( this.$homeOverlay, 0.5, {
				autoAlpha : on ? 1 : 0,
				onComplete: function(){
					if(on){
						TweenMax.staggerFromTo( $lines, 1, {
							autoAlpha: 0,
							y: 20
						}, {
							autoAlpha: 1,
							y: 0,
							force3D: true,
							ease: Power2.easeInOut
						}, 0.3 );
					} else {
						TweenMax.set( $lines, { autoAlpha : 0 } );
					}
				},
				onCompleteScope: this,
				delay : on ? 0.5 : 0
			} );

		}
		bindEvents() {
			//listen for page change
			pipe.addListener( pipe.events.SHOW_PAGE, ( id, options ) => {
				this.showPanelView(id, options);
			} );
			pipe.addListener( pipe.events.HIDE_PAGE, ( id ) => {
				this.hidePanelView(id);
			} );
			//for iframe control
			pipe.addListener( pipe.events.IFRAME_CONTROL, (...args ) => {
				this.iframe.control.apply( this.iframe, args );
			} );
			pipe.addListener( pipe.events.HIDE_OVERLAY, () => {
				this.toggleInfo( false );
			} );
		}
		showPanelView( id, options ) {
			if( this._currentPageIds.has(id) ) return;

			let newPage = this._panelConfig[ id ];

			if ( newPage.exclusive ) {
				this._currentPageIds.forEach( ( oldId ) => {
					let tPage = this._panelConfig[ oldId ];
					if ( tPage.exclusive ) {
						this.hidePanelView( oldId );
					}
				} );
			}

			this._currentPageIds.add( id );
			this._panelConfig[ id ].instance.show( undefined, options );
		}
		hidePanelView( id ) {
			return this._panelConfig[ id ].instance.hide().then( () => {
				this._currentPageIds.delete( id );
			} );
		}
	}

	let app = new App();
	app.init();

} )();