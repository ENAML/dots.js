var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path = require('path');


var paths = {
  main: {
    root: path.join(__dirname, '..'),
    entry: path.join(path.resolve('../public'), 'assets/js/user/app.js'),
    outputDir: path.resolve('../public/dist'),
    publicPath: 'dist/',
    outputFilename: 'bundle.js'
  },
  resolve: {
    nodeModulesPath: path.join(__dirname, 'node_modules'),
    bowerComponentsPath: path.join(__dirname, 'bower_components'),
    sassPath: path.resolve('../public/assets/styles/sass')
  }
};

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: {
    app: paths.main.entry,

    // list vendor libs here
    vendors: [
      'pixi.js/src',
      'jquery'
    ]
  },
  output: {
    path: paths.main.outputDir,
    publicPath: paths.main.publicPath, // all outputted files must be DIRECTLY in this dir (can't be in sub-folders)
    filename: paths.main.outputFilename,
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /(node_modules|bower_components)/
      }
    ],
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

      // // for loading PIXI filters -- causes issues with caching though
      // {
      //   test: /\.js$/,
      //   include: paths.resolve.nodeModulesPath + '/pixi.js',
      //   loader: "transform?brfs"
      // },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap')

          // doesn't seem necessary anymore
          // 'css?sourceMap!sass?sourceMap?includePaths[]=' + paths.resolve.sassPath)
      },
      {
        test: /\.json$/,
        // include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'json'
      }
    ],
    postLoaders: [

    ],
  },

  sassLoader: {
    includePaths: [ path.resolve('../public/assets/styles/sass') ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js'),
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery",
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin("app.css"),
  ],

  // for pixi.js
  node: {
    fs: 'empty'
  },

  resolve: {
    root: [
      paths.resolve.nodeModulesPath,
      paths.resolve.bowerComponentsPath,
      paths.resolve.sassPath
    ],
    extensions: ['', '.jsx', '.js', '.json', '.css', '.scss', '.html']
  },

  resolveLoader: {
    root: [paths.resolve.nodeModulesPath]
  },


  eslint: {
    configFile: '.eslintrc'
  }
};