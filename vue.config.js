/* eslint-disable strict */
// https://cli.vuejs.org/config/
// https://cli.vuejs.org/guide/build-targets.html
const path = require('path');

module.exports = {
  css: { extract: false },
  pages: {
    app: {
      entry: 'example/main.ts',
      template: 'example/public/index.html',
      filename: 'index.html',
    },
  },
  devServer: {
    // https://webpack.docschina.org/configuration/dev-server/#devserver-contentbase
    contentBase: 'example/public',
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service-global/lib/globalConfigPlugin.js#L128-L131
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/commands/build/resolveAppConfig.js#L6-L12
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/config/app.js#L211-L221
      // https://github.com/vuejs/vue-cli/issues/1550#issuecomment-401786406
      // eslint-disable-next-line global-require
      config.plugin('copy').use(require('copy-webpack-plugin'), [
        [
          {
            from: path.resolve(__dirname, 'example/public'),
            to: path.resolve(__dirname, 'demo'),
            ignore: ['index.html', '.DS_Store'],
          },
        ],
      ]);
    }

    config
      .entry('app')
      .clear()
      .add('./example/main.ts');

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
      .set('@moefe/color-thief', path.resolve(__dirname, 'packages/@moefe/color-thief'))
      .set('@moefe/vue-audio', path.resolve(__dirname, 'packages/@moefe/vue-audio'))
      .set('@moefe/vue-storage', path.resolve(__dirname, 'packages/@moefe/vue-storage'))
      .set('@moefe/vue-touch', path.resolve(__dirname, 'packages/@moefe/vue-touch'))
      .set('@moefe/vue-aplayer', path.resolve(__dirname, 'packages/@moefe/vue-aplayer')); // prettier-ignore
  },
};
