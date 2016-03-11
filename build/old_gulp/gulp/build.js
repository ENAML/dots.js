var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );

var revision = require( 'git-rev' );
var fs = require( 'fs' );
var mkdirp = require( 'mkdirp' );

/* BUILD */

gulp.task( 'init', function() {

	var exists = fs.existsSync( paths.assetPath );

	console.log("init:", paths.buildPath, paths.rootPath );

	if ( !exists ) {
		gulp.src( [ paths.build.templates + 'public/**/*' ] )
			.pipe( gulp.dest( paths.rootPath ) );
	}

} );

gulp.task( 'release', function() {

	// var sequence = [
	// 	[ 'vendor_scripts_min', 'user_scripts_min', 'minify-css' ]
	// 	// 'add_revision'

	// ];

	return plugins.runSequence( [ 'vendor_scripts_min', 'user_scripts_min', 'minify-css' ] );
} );

// gulp.task( 'add_revision', function() {

// 	var dest = paths.buildPath.replace( "tools/build", "source/resources/" );

// 	revision.short( function( str ) {
// 		// console.log( 'revision short', str )
// 		fs.writeFile( dest + ".revision", str, function( err ) {
// 			if ( err ) {
// 				return console.log( err );
// 			}

// 			console.log( "The file was saved!" );
// 		} );

// 		addRevision( paths.styles.css, "app.css", str );
// 		addRevision( paths.styles.css, "app.min.css", str );

// 	} );

// } );

// gulp.task( 'make_folders', function() {

// 	//make js
// 	mkdirp( paths.js.user );
// 	mkdirp( paths.js.compiled );
// 	mkdirp( paths.js.lib );
// 	mkdirp( paths.js.min );

// 	//make icons
// 	mkdirp( paths.styles.icons );

// 	//make css
// 	mkdirp( paths.styles.sass );
// 	mkdirp( paths.styles.fonts );
// 	mkdirp( paths.styles.css );
// } );

// function addRevision( base, ext, rev ) {
// 	return gulp.src( base + "/" + ext )
// 		.pipe( plugins.consolidate( 'underscore', {
// 			revision: rev
// 		} ) )
// 		.pipe( gulp.dest( base ) )
// }