// https://github.com/vuejs/vue-cli/blob/dev/docs/config.md
// https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
// https://github.com/vuejs/vue-cli/blob/dev/docs/build-targets.md
const path = require('path');

module.exports = {
  css: { extract: false },
  chainWebpack: (config) => {
    // https://github.com/mozilla-neutrino/webpack-chain#config-resolve-alias
    config.resolve.alias
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'));
  },
};
