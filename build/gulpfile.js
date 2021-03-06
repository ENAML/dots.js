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

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["../public/**/*"], ["webpack:build-dev"]);
});



// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});



// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {

  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  for (var i in myConfig.entry) {
    if (Object.prototype.toString.call( myConfig.entry[i] ) !== '[object Array]') {
      var entryEl = myConfig.entry[i];
      myConfig.entry[i] = [];
      myConfig.entry[i].push(entryEl);
    }
    myConfig.entry[i].unshift("webpack-dev-server/client?http://localhost:8080/");
  }

  myConfig.devtool = "sourcemap";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: getContentBase('../public/'),
    stats: {
      colors: true
    },
    historyApiFallback: true,
    publicPath: "/" + myConfig.output.publicPath,
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    gutil.log("[webpack-dev-server]", "Or http://localhost:8080/index.html for inline");
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