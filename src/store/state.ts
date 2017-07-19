export interface State {
  audio: HTMLAudioElement
  media: Media
  music: APlayer.Music
  list: Array<APlayer.Music>
  mode: APlayer.PlayMode
  theme: string
  collapsed: boolean
}
