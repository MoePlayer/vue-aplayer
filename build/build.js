require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')

/** build components configuration */
var path = require('path')
var merge = require('webpack-merge')
var webpackConfig = require('./webpack.prod.conf')
var outputDir = '../dist'

webpackConfig.entry = {
  'APlayer': './src/components/index.ts',
}
webpackConfig.output = {
  path: path.resolve(__dirname, outputDir),
  filename: '[name].min.js',
  libraryTarget: 'umd',
  umdNamedDefine: true
}
webpackConfig.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
}

const getPlugins = () => webpackConfig.plugins.map(x => x.constructor.name)
const removePlugins = (pluginName) => {
  const pluginNames = getPlugins()
  const plugins = pluginNames.filter(name => name === pluginName)
  plugins.forEach(item => {
    const index = getPlugins().indexOf(item)
    webpackConfig.plugins.splice(index, 1)
  })
}

webpackConfig.plugins.forEach((item, index) => {
  if (item.constructor.name === 'ExtractTextPlugin') {
    webpackConfig.plugins[index].filename = `${outputDir}/[name].min.css`
  }
})

removePlugins('HtmlWebpackPlugin')
removePlugins('CommonsChunkPlugin')
removePlugins('Object')
/** build components configuration */

var spinner = ora('building for production...')
spinner.start()

rm(path.join(__dirname, outputDir), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
