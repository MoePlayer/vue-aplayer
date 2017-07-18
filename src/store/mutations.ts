import { MutationTree } from 'vuex'
import { State } from './state'
import { ADD_MUSICS, SET_MUSIC, SET_THEME, SYNC_MEDIA } from './types'

export const mutations = {
  [ADD_MUSICS]: (state: State, musics: Array<APlayer.Music>) => state.list = state.list.concat(musics),
  [SET_MUSIC]: (state: State, music: APlayer.Music) => state.music = music,
  [SET_THEME]: (state: State, theme: String) => state.theme = theme,
  [SYNC_MEDIA]: (state: State, audio: HTMLAudioElement) => {
    Object.keys(state.media).forEach(key => {
      state.media[key] = audio[key]
    })
  }
} as MutationTree<State>
