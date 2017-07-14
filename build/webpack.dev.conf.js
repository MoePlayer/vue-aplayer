var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    // devtool option doesn't output typescript sourcemaps to karma
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js|vue|html)($|\?)/i
    })
  ]
})

if (config.dev.hotModuleReload) {
  module.exports.module.rules.push(
    {
      test: /\.vue\.(ts|js)$/,
      enforce: 'post',
      use: ['vue-hot-reload-loader'],
      include: [resolve('src'), resolve('test')]
    });
}
