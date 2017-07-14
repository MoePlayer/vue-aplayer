import Vue from 'vue'

import './hooks' // This must be imported before any component

import App from './App.vue'
import router from './router'

import 'console.img'

Vue.config.productionTip = false

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: 'app',
  router,
  render: (h) => h(App),
  beforeCreate () {
    const time = { start: 0, end: 0, timespan: () => time.end - time.start }
    time.start = Number(new Date())
    const img = new Image()
    img.onload = () => { // 确保文字必须在图片输出之后再输出
      time.end = Number(new Date())
      setTimeout(() => {
        const moe = 'color: #fd5557; font-weight: bold'
        console.log('\n%cMoe %cis justice!!!', moe, 'font-weight: bold')
        console.log('%cqwq欢迎加入 %c@MoeFE Studio', 'font-weight: bold', moe)
        console.log('%cGitHub: %chttps://github.com/MoeFE', 'font-weight: bold', 'color: #42b983; font-weight: bold')
        console.log('')
      }, time.timespan())
    }
    img.src = 'https://avatars3.githubusercontent.com/u/29977599?v=3&s=100'
    console.img(img.src)
  }
})
