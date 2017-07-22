import { MutationTree } from 'vuex'
import { State } from './state'
import { ADD_MUSICS, SET_MUSIC } from './types'

export const mutations = {
  [ADD_MUSICS]: (state: State, musics: Array<APlayer.Music>) => state.list = musics,
  [SET_MUSIC]: (state: State, music: APlayer.Music) => state.music = music
} as MutationTree<State>
