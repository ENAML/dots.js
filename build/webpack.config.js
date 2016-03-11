var webpack = require('webpack');
var path = require('path');

var paths = {
  main: {
    root: path.join(__dirname, '..'),
    entry: path.join(path.resolve('../public'), 'assets/js/user/app.js'),
    outputDir: path.resolve('../public/assets/js/compiled'),
    publicDir: path.resolve('../public/'),
    outputFilename: 'bundle.js'
  },
  resolve: {
    nodeModulesPath: path.join(__dirname, 'node_modules'),
    bowerComponentsPath: path.join(__dirname, 'bower_components')
  }
};

module.exports = {
  entry: {
    app: paths.main.entry,

    // list vendor libs here
    vendors: [
      // 'pixi.js/src',
      'jquery'
    ]
  },
  output: {
    path: paths.main.outputDir,
    filename: paths.main.outputFilename,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: [
            require.resolve('babel-preset-es2015'), // need to require.resolve bc bug
            // require.resolve("babel-preset-stage-0"),
          ],
          plugins: {
            // require.resolve("babel-plugin-add-module-exports"),
            // require.resolve("babel-plugin-transform-decorators-legacy")
          }
        }
      },
      {
        test: /\.json$/,
        // include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'json'
      },

      // for jquery
      {
        test: /jquery[\\\/]src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader'
      }
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.$' : 'jquery',
      'window.jQuery' : 'jquery'
    })
  ],

  // for pixi.js
  node: {
    fs: 'empty'
  },

  resolve: {
    root: [paths.resolve.nodeModulesPath, paths.resolve.bowerComponentsPath],
    alias: {
      // jquery: "jquery/src/jquery"
    }
  },

  resolveLoader: {
    root: [paths.resolve.nodeModulesPath]
  }

};