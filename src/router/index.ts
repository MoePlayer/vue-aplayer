import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from 'views'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'IndexPage', component: IndexPage }
  ]
})
