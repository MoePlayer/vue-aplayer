import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './APlayer.html?style=./APlayer.scss'

import { Prop, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

import { Picture as vPicture } from 'components/Picture'
import { Button as vButton } from 'components/Button'
import { Container } from 'components/Main'
import { Controller } from 'components/Controller'
import { Info } from 'components/Info'
import { Lyric } from 'components/Lyric'
import { Progress as ProgressBar } from 'components/Progress'
import { Time as TimeBar } from 'components/Time'
import { Volume } from 'components/Volume'
import { List } from 'components/List'
import { Item } from 'components/Item'

import store from 'store'
import { State } from 'store/state'
import { SET_MUSIC, SET_THEME } from 'store/types'

@WithRender
@Component({ components: { vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }, store })
export default class APlayer extends Vue {

  /** narrow style */
  @Prop({ type: Boolean, default: false, required: false })
  public narrow?: boolean
  /** autoplay song(s), not supported by mobile browsers */
  @Prop({ type: Boolean, default: false, required: false })
  public autoplay?: boolean
  /** show lrc, can be 0, 1, 2 */
  @Prop({ type: Number, default: 0, required: false })
  public showlrc?: 0 | 1 | 2
  @Prop({ type: Boolean, default: true, required: false })
  /** pause other players when this player playing */
  public mutex?: boolean
  /** theme color, default: #b7daff */
  @Prop({ type: String, default: '#b7daff', required: false })
  public theme?: string
  /** play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation` */
  @Prop({ type: String, default: 'circulation', required: false })
  public mode?: APlayer.PlayMode
  /** the way to load music, can be 'none' 'metadata' 'auto', default: 'auto' */
  @Prop({ type: String, default: 'auto', required: false })
  public preload?: APlayer.Preload
  /** max height of play list */
  @Prop({ type: String, default: 'auto', required: false })
  public listmaxheight?: string
  /** music info */
  @Prop({ type: Array, default: () => [], required: true })
  public music: Array<APlayer.Music>

  /** 获取当前 Audio 对象实例 */
  @Getter('audio')
  private audio: HTMLAudioElement
  /** 获取当前播放的音乐信息 */
  @Getter('music')
  private currentMusic: APlayer.Music
  /** 获取当前主题颜色 */
  @Getter('theme')
  private currentTheme: string

  /** 设置当前播放音乐信息 */
  @Mutation(SET_MUSIC)
  private setMusic: (music: APlayer.Music) => void
  /** 设置当前主题 */
  @Mutation(SET_THEME)
  private setTheme: (theme: string) => void
  /** 自定义 Media 类型，用于同步 Audio 对象的属性更新视图 */
  private media: Media = {
    audioTracks: null,
    /** 设置或返回是否在就绪（加载完成）后随即播放音频。 */
    autoplay: false,
    /** 返回表示音频已缓冲部分的 TimeRanges 对象。 */
    buffered: null,
    /** 返回表示音频当前媒体控制器的 MediaController 对象。 */
    controller: null,
    /** 设置或返回音频是否应该显示控件（比如播放/暂停等）。 */
    controls: false,
    /** 设置或返回音频的 CORS 设置。 */
    crossOrigin: null,
    /** 返回当前音频的 URL。 */
    currentSrc: null,
    /** 设置或返回音频中的当前播放位置（以秒计）。 */
    currentTime: 0,
    /** 设置或返回音频默认是否静音。 */
    defaultMuted: false,
    /** 设置或返回音频的默认播放速度。 */
    defaultPlaybackRate: 1,
    /** 返回音频的长度（以秒计）。 */
    duration: 0,
    /** 返回音频的播放是否已结束。 */
    ended: false,
    /** 返回表示音频错误状态的 MediaError 对象。 */
    error: null,
    /** 设置或返回音频是否应在结束时再次播放。 */
    loop: false,
    /** 设置或返回音频所属媒介组合的名称。 */
    mediaGroup: null,
    /** 设置或返回是否关闭声音。 */
    muted: false,
    /** 返回音频的当前网络状态。 */
    networkState: null,
    /** 设置或返回音频是否暂停。 */
    paused: true,
    /** 设置或返回音频播放的速度。 */
    playbackRate: 1,
    /** 返回表示音频已播放部分的 TimeRanges 对象。 */
    played: null,
    /** 设置或返回音频的 preload 属性的值。 */
    preload: 'auto',
    /** 返回音频当前的就绪状态。 */
    readyState: null,
    /** 返回表示音频可寻址部分的 TimeRanges 对象。 */
    seekable: null,
    /** 返回用户当前是否正在音频中进行查找。 */
    seeking: false,
    /** 设置或返回音频的 src 属性的值。 */
    src: null,
    /** 返回表示可用文本轨道的 TextTrackList 对象。 */
    textTracks: null,
    /** 设置或返回音频的音量。 */
    volume: 1
  }

  private beforeCreate () {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

  private created () {
    this.musicChange()
    this.themeChange()
    const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, () => this.syncAudioProps())
    })
  }

  /** 同步 Audio 对象属性以更新视图 */
  private syncAudioProps () {
    Object.keys(this.media).forEach(key => {
      this.media[key] = this.audio[key]
    })
  }

  @Watch('music', { deep: true })
  private musicChange () {
    if (this.music.length <= 0) return
    const music = this.music[0]
    this.setMusic(music)
    this.audio.src = music.url
    this.audio.preload = this.preload
    this.audio.autoplay = this.autoplay
  }

  @Watch('theme')
  private themeChange () {
    this.setTheme(this.theme)
  }

}

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
