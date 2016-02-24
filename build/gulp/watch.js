var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );

/* WATCH */
gulp.task( 'watch', [ 'browserify_watch' ], function() {

	plugins.livereload.listen();

	plugins.watch( paths.styles.icons + "*.svg", function() {
		gulp.start( 'iconfont' );
	} );

	plugins.watch( paths.build.bowerJSON, function() {
		gulp.start( 'bower_update' );
	} );

	plugins.watch( paths.js.vendor_config, function() {
		gulp.start( 'vendor_scripts' );
	} );

	plugins.watch([paths.styles.sass + '**/*.scss', "!"+paths.styles.sass+"_json_vars.sass"], function() {
		gulp.start( 'sass' );
	} );
	
	// start server
	plugins.nodemon({
		script: paths.server.app,
		watch: paths.server.base,
		ext: 'js hbs html',
		env: { 'NODE_ENV': 'development' },
	});

} );