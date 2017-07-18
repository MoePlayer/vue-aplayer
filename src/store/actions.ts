import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { ADD_MUSICS } from './types'
import Axios from 'axios'

async function getMusics ({ commit }: ActionContext<State, any>) {
  const { data } = await Axios.get('./static/music/map.json')
  commit(ADD_MUSICS, data)
}

export const actions = { getMusics } as ActionTree<State, any>
