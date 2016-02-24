var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );

var jsonSass = require( 'gulp-json-sass' );

/* SASS */

gulp.task( 'sass', ['sass-vars'], function() {

	return plugins.sass( paths.styles.sass + "app.scss", {
			sourcemap: true
		} )
		.on( 'error', function( err ) {

			gulp.src( paths.noop )
				.pipe( plugins.notify( "your CSS broke idiot! " + err ) );
		} )
		.pipe( plugins.sourcemaps.write() )
		.pipe( gulp.dest( paths.styles.css ) )
		.pipe( plugins.livereload() );
} );

gulp.task( 'minify-css', [ 'sass' ], function() {

	return gulp.src( paths.styles.css + "/app.css" )
		.pipe( plugins.minifyCss( {
			advanced: false,
			processImport: false
		} ) )
		.pipe( plugins.rename( 'app.min.css' ) )
		.pipe( gulp.dest( paths.styles.min ) );
} );

gulp.task( "sass-vars", function() {
	return gulp
		.src( paths.styles.shared + "json-vars.json" )
		.pipe( jsonSass( {
			sass: true
		} ) )
		.pipe( plugins.rename( "_json-vars.sass" ) )
		.pipe( gulp.dest( paths.styles.sass ) )
} );