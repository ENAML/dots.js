var gulp = require('gulp');
var paths = require( "./paths" );
var marked = require('marked');
var plugins = require( "./plugins" );
var marked = require('marked');
var _ = require("underscore");

var fs = require('fs');
var ncp = require('ncp').ncp;

var docPaths = {
	root: paths.projectPath + "docs/",
	public: paths.rootPath + "docs/"
}

var fileNames = [ "tumblr" ];

gulp.task('markdown', function(){
	copyImages();
	convertHtml();
});

gulp.task( 'markdown_watch', function() {

	plugins.livereload.listen();

	plugins.watch(docPaths.root + "**/*.md", function() {
		convertHtml();
	} );

	plugins.watch(docPaths.root + "images/**/*", function() {
		copyImages();
	} );

} );

function copyImages(){
	ncp( docPaths.root + "images", docPaths.public + "images" );
}

function convertHtml(){
	fs.readdir(docPaths.root, function(err, files){
		files.filter(function(file){
			return file.indexOf(".md") >= 0 ;
		}).forEach(function(file){
			convertDoc(file);
		});
	});
}

function convertDoc( fileName ){
	var test = docPaths.root + fileName;

	console.log(fileName);

	fs.readFile( test, 'utf8', function(err,data){
		var markdown = marked(data);

		gulp.src( paths.build.templates + "markdown.html" )
	        .pipe( plugins.consolidate( 'underscore', {
	           markdown: markdown
	        } ) )
	        .pipe( plugins.rename( fileName.replace("md", "html") ) )
	        .pipe(gulp.dest(docPaths.public))
	        .pipe( plugins.livereload() );
	});
}

