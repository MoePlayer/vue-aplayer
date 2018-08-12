const path = require('path');

module.exports = {
  base: '/docs/',
  title: 'vue-aplayer',
  description: '🍰 A beautiful HTML5 music player for Vue.js',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.bootcss.com/fetch/2.0.4/fetch.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js' }],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/colorthief/dist/color-thief.min.js',
      },
    ],
  ],
  dest: 'demo/docs',
  serviceWorker: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '选项', link: '/options/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        '',
        'options',
        'api',
        'events',
        'lrc',
        'playlist',
        'fixed',
        'mini',
        'hls',
        'theme',
        'cdn',
        'faq',
      ],
    },
    repo: 'MoePlayer/vue-aplayer',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
    lastUpdated: true,
  },
  chainWebpack: (config, isServer) => {
    config.resolve.set('symlinks', false);
  },
};
