export interface State {
  audio: HTMLAudioElement
  media: Media
  theme: String
  music: APlayer.Music
  list: Array<APlayer.Music>
  mode: APlayer.PlayMode
  volume: number
  speed: number
}
