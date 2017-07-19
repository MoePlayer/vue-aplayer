export interface State {
  key: string,
  audio: HTMLAudioElement
  media: Media
  music: APlayer.Music
  list: Array<APlayer.Music>
  mode: APlayer.PlayMode
  theme: string
  collapsed: boolean
}
