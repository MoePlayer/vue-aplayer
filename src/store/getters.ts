import { GetterTree } from 'vuex'
import { State } from './state'

export const audio = (state: State): HTMLAudioElement => state.audio
export const media = (state: State): Media => state.media
export const music = (state: State): APlayer.Music =>
  state.music || { title: null, author: null, url: null, pic: null, lrc: null }
export const list = (state: State): Array<APlayer.Music> => state.list
export const mode = (state: State): string => state.mode
export const theme = (state: State): string => state.theme
export const speed = (state: State): number => state.speed
export const volume = (state: State): number => state.volume
export const collapsed = (state: State): boolean => state.collapsed

export const getters = { audio, media, music, list, mode, theme, speed, collapsed } as GetterTree<State, any>
