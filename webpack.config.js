var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPath = path.join(__dirname, 'public', 'assets');
var publicPath = '/assets/';

module.exports = [
  {
    // The configuration for the client
    name: 'client',
    entry: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',

      // our app's entry point for client code
      './src/client.js'
    ],
    stats: {
      hash: false,
      version: false,
      timings: false,
      assets: true,
      entrypoints: false,
      chunks: true,
      modules: false,
      reasons: false,
      usedExports: false,
      providedExports: false,
      children: true,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true
    },
    output: {
      filename: 'bundle.js',
      path: assetsPath,
      publicPath: publicPath
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
        // using ExtractTextPlugin in dev mode here to support styles on the server-side until I set up proper CSS module support for server-side rendering components
        // { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),

      // activates HMR
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      new webpack.NoErrorsPlugin(),

      new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
    ]
  },
  {
    // The configuration for the server-side rendering
    name: 'server',
    entry: [
      './src/page.js'
    ],
    stats: {
      hash: false,
      version: false,
      timings: false,
      assets: true,
      entrypoints: false,
      chunks: true,
      modules: false,
      reasons: false,
      usedExports: false,
      providedExports: false,
      children: true,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true
    },
    target: 'node',
    output: {
      path: assetsPath,
      filename: '../../src/page.generated.js',
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        // using ExtractTextPlugin in dev mode here to support styles on the server-side until I set up proper CSS module support for server-side rendering components
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [{loader: 'css-loader'}, {loader: 'sass-loader'}]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
    ]
  }
];
