interface Media {
  /** 返回表示可用音频轨道的 AudioTrackList 对象。 */
  audioTracks: AudioTrackList
  /** 设置或返回是否在就绪（加载完成）后随即播放音频。 */
  autoplay: boolean
  /** 返回表示音频已缓冲部分的 TimeRanges 对象。 */
  buffered: TimeRanges
  /** 返回表示音频当前媒体控制器的 MediaController 对象。 */
  controller: any
  /** 设置或返回音频是否应该显示控件（比如播放/暂停等）。 */
  controls: boolean
  /** 设置或返回音频的 CORS 设置。 */
  crossOrigin: string
  /** 返回当前音频的 URL。 */
  currentSrc: string
  /** 设置或返回音频中的当前播放位置（以秒计）。 */
  currentTime: number
  /** 设置或返回音频默认是否静音。 */
  defaultMuted: boolean
  /** 设置或返回音频的默认播放速度。 */
  defaultPlaybackRate: number
  /** 返回音频的长度（以秒计）。 */
  duration: number
  /** 返回音频的播放是否已结束。 */
  ended: boolean
  /** 返回表示音频错误状态的 MediaError 对象。 */
  error: MediaError
  /** 设置或返回音频是否应在结束时再次播放。 */
  loop: boolean
  /** 设置或返回音频所属媒介组合的名称。 */
  mediaGroup: string
  /** 设置或返回是否关闭声音。 */
  muted: boolean
  /** 返回音频的当前网络状态。 */
  networkState: string
  /** 设置或返回音频是否暂停。 */
  paused: boolean
  /** 设置或返回音频播放的速度。 */
  playbackRate: number
  /** 返回表示音频已播放部分的 TimeRanges 对象。 */
  played: TimeRanges
  /** 设置或返回音频的 preload 属性的值。 */
  preload: APlayer.Preload
  /** 返回音频当前的就绪状态。 */
  readyState: string
  /** 返回表示音频可寻址部分的 TimeRanges 对象。 */
  seekable: TimeRanges
  /** 返回用户当前是否正在音频中进行查找。 */
  seeking: boolean
  /** 设置或返回音频的 src 属性的值。 */
  src: string
  /** 返回表示可用文本轨道的 TextTrackList 对象。 */
  textTracks: TextTrackList
  /** 设置或返回音频的音量。 */
  volume: number
}
