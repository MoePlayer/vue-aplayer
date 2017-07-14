// Use this file to register components custom hooks.
// @see https://github.com/vuejs/vue-class-component#adding-custom-hooks
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

// Workaround for https://github.com/babel/babel-loader/issues/188
export default undefined
