import { MutationTree } from 'vuex'
import { State } from './state'
import { ADD_MUSICS, SET_MUSIC } from './types'

export const mutations = {
  [ADD_MUSICS]: (state: State, musics: Array<APlayer.Music>) => {
    state.list = state.list.concat(musics).map((music, index) => {
      if (!music.id) music.id = index // 如果 music 没有指定 id 则通过索引自动生成
      return music
    })
  },
  [SET_MUSIC]: (state: State, music: APlayer.Music) => state.music = music
} as MutationTree<State>
