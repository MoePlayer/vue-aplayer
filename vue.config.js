/* eslint-disable strict */
// https://cli.vuejs.org/config/
// https://cli.vuejs.org/guide/build-targets.html
const path = require('path');

module.exports = {
  css: { extract: false },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.module
        .rule('tsx')
        .test(/\.tsx$/)
        .use('vue-jsx-hot-loader')
        .before('babel-loader')
        .loader('vue-jsx-hot-loader');
    }

    // https://github.com/mozilla-neutrino/webpack-chain#config-output-shorthand-methods
    config.output
      .libraryExport('default'); // prettier-ignore

    // https://cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('vue-svg-loader');

    // https://github.com/mozilla-neutrino/webpack-chain#config-resolve-alias
    config.resolve.alias
      .set('utils', path.resolve(__dirname, 'src/utils'))
      .set('@moefe/vue-audio', path.resolve(__dirname, 'src/packages/@moefe/vue-audio'))
      .set('@moefe/vue-storage', path.resolve(__dirname, 'src/packages/@moefe/vue-storage'))
      .set('@moefe/vue-touch', path.resolve(__dirname, 'src/packages/@moefe/vue-touch'))
      .set('@moefe/vue-aplayer/assets', path.resolve(__dirname, 'src/packages/@moefe/vue-aplayer/assets'))
      .set('@moefe/vue-aplayer/components', path.resolve(__dirname, 'src/packages/@moefe/vue-aplayer/components'))
      .set('@moefe/vue-aplayer/utils', path.resolve(__dirname, 'src/packages/@moefe/vue-aplayer/utils'))
      .set('@moefe/vue-aplayer', path.resolve(__dirname, 'src/packages/@moefe/vue-aplayer')); // prettier-ignore
  },
};
