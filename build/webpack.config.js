var webpack = require('webpack');
var path = require('path');


var paths = {
  main: {
    root: path.join(__dirname, '..'),
    entry: path.join(path.resolve('../public'), 'assets/js/user/app.js'),
    outputDir: path.resolve('../public/dist'),
    publicDir: path.resolve('../public/'),
    outputFilename: 'bundle.js'
  },
  resolve: {
    nodeModulesPath: path.join(__dirname, 'node_modules'),
    bowerComponentsPath: path.join(__dirname, 'bower_components')
  }
};

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: {
    app: [paths.main.entry],

    // list vendor libs here
    vendors: [
      'pixi.js/src',
      'jquery'
    ]
  },
  output: {
    path: paths.main.outputDir,
    publicPath: 'dist/', // all outputted files must be DIRECTLY in this dir (can't be in sub-folders)
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
      {
        test: /\.json$/,
        // include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'json'
      }
    ],
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
    })
  ],

  // for pixi.js
  node: {
    fs: 'empty'
  },

  resolve: {
    root: [paths.resolve.nodeModulesPath, paths.resolve.bowerComponentsPath],
    extensions: ['', '.js', '.json', '.coffee']
  },

  resolveLoader: {
    root: [paths.resolve.nodeModulesPath]
  },


  eslint: {
    configFile: '.eslintrc'
  }
};