import { MutationTree } from 'vuex'
import { State } from './state'
import { ADD_MUSICS, SET_MUSIC, SET_THEME } from './types'

export const mutations = {
  [ADD_MUSICS]: (state: State, musics: Array<APlayer.Music>) => state.list = state.list.concat(musics),
  [SET_MUSIC]: (state: State, music: APlayer.Music) => state.music = music,
  [SET_THEME]: (state: State, theme: String) => state.theme = theme
} as MutationTree<State>
