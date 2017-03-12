module.exports = function (env = {}) {
  const webpack = require('webpack')
  const path = require('path')
  const fs = require('fs')
  const packageConf = JSON.parse(fs.readFileSync('package.json'), 'utf-8')

  let name = packageConf.name
  let version = packageConf.version
  let library = name.replace(/^(\w)/, m => m.toUpperCase())
  let proxPort = 8081
  let plugins = []
  let loaders = []

  if (env.production) {
    name += `-${version}.min`
    // compress js in production environment
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false
        }
      })
    )
  }

  if (fs.existsSync('./.babelrc')) {
    // use babel
    let babelConf = JSON.parse(fs.readFileSync('.babelrc'))
    loaders.push({
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: 'babel-loader',
      query: babelConf
    })
  }

  return {
    entry: './src/main.js',
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/static/js/',
      library: `${library}`,
      libraryTarget: 'umd'
    },
    plugins: plugins,
    module: {
      loaders: loaders
    },
    devServer: {
      proxy: {
        '*': `http://127.0.0.1:${proxPort}`
      }
    }
  }
}
