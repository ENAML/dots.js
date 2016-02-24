var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );
var babelify = require( "babelify" );
var hbsfy = require('hbsfy');
var browserify = require( "browserify" );
var watchify = require( "watchify" );
var source = require( 'vinyl-source-stream' );

var watch;
var myBundle = null;

gulp.task( 'user_scripts_min', [ 'browserify_nowatch' ], function() {

	return gulp.src( paths.js.compiled + 'bundle.js' )
		.pipe( plugins.uglify() )
		.pipe( plugins.rename( 'bundle.min.js' ) )
		.pipe( gulp.dest( paths.js.min ) )
} );

gulp.task( 'browserify_watch', function() {
	watch = true;
	return browserifyWrap();
} );

gulp.task( 'browserify_nowatch', function() {
	watch = false
	return browserifyWrap();
} );

function browserifyWrap() {

	b = browserify( {
		debug: true,
		paths: [ paths.js.user, paths.build.nodeModules, paths.js.templates, paths.styles.shared ],
		cache: {},
		packageCache: {}
	} )

	// b.transform( 'node-underscorify' )
	b.transform( hbsfy )
	.transform( babelify )


	if ( watch ) {
		b = watchify( b );
		b.on( 'update', function() {
			console.log( "user code updated" );
			bundle( b );
		} );
	}

	b.add( paths.js.user + 'app.js' );
	bundle( b );
};

function bundle( myBundle ) {

	return myBundle.bundle()
		.on( 'error', function( err ) {
			gulp.src( paths.noop )
				.pipe( plugins.notify( "your JS broke idiot! " + err ) );
		} )
		.pipe( source( 'bundle.js' ) )
		.pipe( gulp.dest( paths.js.compiled ) )
		.pipe( plugins.livereload() );
};
