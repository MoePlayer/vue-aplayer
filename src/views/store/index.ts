import Vue from 'vue'
import Vuex from 'vuex'

import { State } from './state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

Vue.use(Vuex)

const state: State = {
  list: [],
  music: null
}

export const store = new Vuex.Store<State>({ state, actions, getters, mutations })
export default store
