import { request } from 'utils/request'
import { Config } from 'utils/config'
const { playlist, playurl, lyric } = Config.apis

export async function getFavorites () {
  return await request(playlist)
}

export async function getMusicURL (id: number) {
  return await request(playurl, { id })
}

export async function getMusicURLs (id: number[]) {
  return await request(playurl, { id: id.join() })
}

export async function getLyric (id: number) {
  return await request(lyric, { id })
}
