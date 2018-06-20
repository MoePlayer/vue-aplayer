/* eslint-disable strict */
// https://github.com/vuejs/vue-cli/blob/dev/docs/config.md
// https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
// https://github.com/vuejs/vue-cli/blob/dev/docs/build-targets.md
const path = require('path');

module.exports = {
  css: { extract: false },
  chainWebpack: (config) => {
    // https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md#replace-existing-base-loader
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
