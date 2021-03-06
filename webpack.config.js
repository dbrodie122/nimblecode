var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

var UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

var PROD = JSON.parse(process.env.PROD_DEV || "0");
// var PROD = true;

module.exports = {
  entry: [
    './client/index.js'
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-1']
      },
    }]
  },

  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  
  plugins: PROD ? [
    new webpack.NoErrorsPlugin(),
    HTMLWebpackPluginConfig,
    UglifyJsPluginConfig,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') 
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify('UA-75858588-1')
    })
  ] : [
    new webpack.NoErrorsPlugin()
  ]
}
