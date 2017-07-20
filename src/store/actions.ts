import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { ADD_MUSICS, SET_MUSIC } from './types'
import { Config } from 'utils/config'
import { getFavorites, getMusicURLs, getLyric } from 'api/NeteaseCloudMusicApi'

async function getMusics ({ commit }: ActionContext<State, any>) {
  const { data } = await getFavorites()
  if (!data.success) return

  const tracks = data.playlist.tracks as Array<any>
  const response = await getMusicURLs(tracks.map(x => x.id) as Array<number>)
  if (!response.data.success) return

  const urls = response.data['data']
  const musics: Array<APlayer.Music> = []
  tracks.forEach(item => {
    musics.push({
      id: item.id,
      title: item.name,
      author: item.ar.map(x => x.name).join('／'),
      pic: item.al.picUrl,
      url: urls.find(url => url.id === item.id).url,
      lrc: null
    })
  })

  commit(ADD_MUSICS, musics)
}

async function getLyricAsync ({ commit }: ActionContext<State, any>, music: APlayer.Music) {
  const { data } = await getLyric(music.id)
  if (!data.success) return
  if (!data.lrc) return
  if (!data.lrc.lyric) return
  music.lrc = data.lrc.lyric
  commit(SET_MUSIC, music)
}

export const actions = { getMusics, getLyricAsync } as ActionTree<State, any>
