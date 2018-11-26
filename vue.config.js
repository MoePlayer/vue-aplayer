/* eslint-disable strict */
/* eslint-disable global-require */
// https://cli.vuejs.org/config/
// https://cli.vuejs.org/guide/build-targets.html
const path = require('path');
const gitRevisionPlugin = new (require('git-revision-webpack-plugin'))();

module.exports = {
  css: { extract: false },
  pages: {
    app: {
      entry: path.resolve(__dirname, 'example/main.ts'),
      template: path.resolve(__dirname, 'example/public/index.html'),
      filename: 'index.html',
    },
  },
  devServer: {
    // https://webpack.docschina.org/configuration/dev-server/#devserver-contentbase
    contentBase: path.resolve(__dirname, 'example/public'),
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service-global/lib/globalConfigPlugin.js#L128-L131
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/commands/build/resolveAppConfig.js#L6-L12
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/config/app.js#L211-L221
      // https://github.com/vuejs/vue-cli/issues/1550#issuecomment-401786406
      config.plugin('copy').use(require('copy-webpack-plugin'), [
        [
          {
            from: path.resolve(__dirname, 'example/public'),
            to: path.resolve(__dirname, 'demo'),
            ignore: ['index.html', '.DS_Store'],
          },
        ],
      ]);
    } else {
      // https://github.com/vuejs/vue-cli/issues/1132
      config.output.filename('[name].[hash].js').end();
    }

    config
      .entry('app')
      .clear()
      .add('./example/main.ts');

    config.plugin('define').tap((args) => {
      Object.assign(args[0], {
        APLAYER_VERSION: JSON.stringify(require('./package.json').version),
        GIT_HASH: JSON.stringify(gitRevisionPlugin.commithash().substr(0, 7)),
      });
      return args;
    });

    // https://cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('vue-svg-loader');

    // https://github.com/mozilla-neutrino/webpack-chain#config-resolve-alias
    config.resolve.alias
      .set('@moefe/vue-audio', path.resolve(__dirname, 'packages/@moefe/vue-audio'))
      .set('@moefe/vue-store', path.resolve(__dirname, 'packages/@moefe/vue-store'))
      .set('@moefe/vue-touch', path.resolve(__dirname, 'packages/@moefe/vue-touch'))
      .set('@moefe/vue-aplayer', path.resolve(__dirname, 'packages/@moefe/vue-aplayer')); // prettier-ignore
  },
};
