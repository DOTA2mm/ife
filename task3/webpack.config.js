const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './Observer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader?presets=es2015',
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}