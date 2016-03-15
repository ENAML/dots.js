var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );
var fs = require( "fs" );
var jsonminify = require( "jsonminify" );
var _ = require( 'underscore' );

//load vendor scripts from vendor_config
gulp.task( 'vendor_scripts', function( cb ) {

	fs.readFile( paths.js.vendor_config, "utf-8", function( err, data ) {

		var vendorScripts = jsonminify( data );

		var desktopScripts = _.map( JSON.parse( vendorScripts ).desktop, function( s ) {
			return paths.js.base + s
		} );

		var stream = gulp.src( desktopScripts )
		    .pipe( plugins.sourcemaps.init() )
			.pipe( plugins.concat( 'vendor.js' ) )
			.pipe( plugins.sourcemaps.write() )
			.pipe( gulp.dest( paths.js.compiled ) )
			.pipe( plugins.livereload() )

		stream.on( 'end', function() {
			cb();
		} );
	} );
} );

//minify vendor scripts
gulp.task( 'vendor_scripts_min', [ 'vendor_scripts' ], function() {

	return gulp.src( paths.js.compiled + "vendor.js" )
		.pipe( plugins.uglify() )
		.pipe( plugins.rename( 'vendor.min.js' ) )
		.pipe( gulp.dest( paths.js.min ) )
} );