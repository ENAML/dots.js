var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );


/**
 * IF YOU ARE RUNNING INTO ISSUES WITH ICONFONT TASK ::
 * 
 * 1: https://www.npmjs.com/package/gulp-iconfont - instructons here
 * 
 * 2: make sure svg files do NOT have paths --
 * convert stroked paths to objects in illustrator
 * 
 */


gulp.task( 'iconfont', function() {

    console.log( "ASDASD", paths.styles.icons );

    gulp.src( paths.styles.icons + "*.svg" )
        // .pipe( plugins.svgmin() )
        .pipe( plugins.iconfont( {
            fontName: 'myfont', // required 
            appendCodepoints: true, // recommended option 
            normalize: true
        } ) )
        .on( 'codepoints', function( codepoints, options ) {
            // CSS templating, e.g. 
            console.log( "!" )
            gulp.src( paths.build.templates + "icons.css" )
                .pipe( plugins.consolidate( 'underscore', {
                    glyphs: codepoints,
                    fontName: 'myfont',
                    fontPath: '../fonts/',
                    className: 's'
                } ) )
                .pipe( plugins.rename( '_icons.scss' ) )
                .pipe( gulp.dest( paths.styles.sass ) );
        } )
        .pipe( gulp.dest( paths.styles.fonts ) );
} );