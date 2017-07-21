export interface State {
  key: string,
  audio: HTMLAudioElement
  media: Media
  music: APlayer.Music
  mode: APlayer.PlayMode
  theme: string
  volume: number
  collapsed: boolean
}
