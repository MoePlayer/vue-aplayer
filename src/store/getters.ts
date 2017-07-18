import { GetterTree } from 'vuex'
import { State } from './state'

export const audio = (state: State): HTMLAudioElement => state.audio
export const theme = (state: State): String => state.theme
export const music = (state: State): APlayer.Music =>
  state.music || { title: null, author: null, url: null, pic: null, lrc: null }
export const list = (state: State): Array<APlayer.Music> => state.list

export const getters = { audio, theme, music, list } as GetterTree<State, any>
