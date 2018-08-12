import Vue from 'vue';

Vue.config.devtools = true;
Vue.config.productionTip = false;

// hotfix
if (localStorage.getItem('GIT_HASH') !== GIT_HASH) {
  localStorage.clear();
  localStorage.setItem('GIT_HASH', GIT_HASH);
}

new Vue({
  // eslint-disable-next-line global-require
  render: h => h(require('./App').default),
}).$mount('#app');
