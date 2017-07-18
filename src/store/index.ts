import Vue from 'vue'
import Vuex from 'vuex'
import { State } from './state'

import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

const state: State = {
  audio: new Audio(),
  theme: '#b7daff',
  music: null,
  list: []
}

export default new Vuex.Store({ state, getters, actions, mutations })
