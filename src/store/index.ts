import Vue from 'vue'
import Vuex from 'vuex'
import { State } from './state'

Vue.use(Vuex)

const state: State = {
  theme: '',
  music: null
}

export default new Vuex.Store({ state })
