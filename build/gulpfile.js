/**
 * Refer to these for more info!!!
 * - https://webpack.github.io/docs/usage-with-gulp.html
 * - https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
 */

var path = require('path');
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);


gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: getContentBase('../public/'),
    stats: {
      colors: true
    },
    publicPath: '../public/',
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});


/**
 * taken from webpack dev server source bc
 * this is only enabled by default on the dev
 * server CLI (not the JS API)
 * 
 * (see: https://github.com/webpack/webpack-dev-server/blob/master/bin/webpack-dev-server.js)
 */
function getContentBase(contentBase) {
  if(/^[0-9]$/.test(contentBase))
    contentBase = +contentBase;
  else if(!/^(https?:)?\/\//.test(contentBase))
    contentBase = path.resolve(contentBase);

  return contentBase;
}