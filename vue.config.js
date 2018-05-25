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
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('utils', path.resolve(__dirname, 'src/utils'))
      .set('@moefe/vue-audio', path.resolve(__dirname, 'src/components/utils/audio.ts'))
      .set('@moefe/vue-aplayer', path.resolve(__dirname, 'src/components/index.ts')); // prettier-ignore
  },
};
