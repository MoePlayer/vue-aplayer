import { GetterTree } from 'vuex'
import { State } from './state'

export const list = (state: State): Array<APlayer.Music> => state.list
export const getters = { list } as GetterTree<State, any>
