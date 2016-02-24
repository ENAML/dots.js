var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );

// var _ = require('underscore');
var del = require('del');
var mainBowerFiles = require('main-bower-files');

//bower install / update
gulp.task( 'bower_update', function( cb ) {

	console.log('bower update!');

	plugins.runSequence(
		'bower_build',
		'bower_clear',
		'bower_clean',
		cb
	);
} );

//run bower
gulp.task( 'bower_build', function( cb ) {

	return plugins.bower()
} );

//clean libs folder
gulp.task( 'bower_clear', function( cb ) {

	del( paths.js.bower + "*.js", {
		force: true
	}, cb );
} );

//filter bower files and move
gulp.task( 'bower_clean', function( cb ) {

	return gulp.src( mainBowerFiles() )
		.pipe( plugins.filter( '**/*.js' ) )
		.pipe( gulp.dest( paths.js.bower ) );
} );