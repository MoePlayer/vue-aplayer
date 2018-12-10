const path = require('path');

module.exports = {
  base: '/docs/',
  title: 'vue-aplayer',
  description: '🍰 A beautiful HTML5 music player for Vue.js',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/hls.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/colorthief' }], // prettier-ignore
  ],
  dest: 'demo/docs',
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          const dayjs = require('dayjs');
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ],
  ],
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
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
  },
  chainWebpack: (config) => {
    config.resolve.set('symlinks', false);
  },
};
