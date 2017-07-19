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
import { SET_MUSIC, SET_THEME, SYNC_MEDIA } from 'store/types'

import VueTouch from 'vue-touch'

Vue.use(VueTouch)

enum ReadyState {
  /** 没有关于音频是否就绪的信息 */
  HAVE_NOTHING = 0,
  /** 关于音频就绪的元数据 */
  HAVE_METADATA = 1,
  /** 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒 */
  HAVE_CURRENT_DATA = 2,
  /** 当前及至少下一帧的数据是可用的 */
  HAVE_FUTURE_DATA = 3,
  /** 可用数据足以开始播放 */
  HAVE_ENOUGH_DATA = 4
}

@WithRender
@Component({ components: { vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }, store })
export default class APlayer extends Vue {

  /** narrow style */
  @Prop({ type: Boolean, default: false, required: false })
  public readonly narrow?: boolean
  /** autoplay song(s), not supported by mobile browsers */
  @Prop({ type: Boolean, default: false, required: false })
  public readonly autoplay?: boolean
  /** show lrc, can be 0, 1, 2 */
  @Prop({ type: Boolean, default: false, required: false })
  public readonly showlrc?: boolean
  @Prop({ type: Boolean, default: true, required: false })
  /** pause other players when this player playing */
  public readonly mutex?: boolean
  /** theme color, default: #b7daff */
  @Prop({ type: String, default: '#b7daff', required: false })
  public readonly theme?: string
  /** play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation` */
  @Prop({ type: String, default: 'circulation', required: false })
  public readonly mode?: APlayer.PlayMode
  /** the way to load music, can be 'none' 'metadata' 'auto', default: 'auto' */
  @Prop({ type: String, default: 'auto', required: false })
  public readonly preload?: APlayer.Preload
  /** max height of play list */
  @Prop({ type: String, default: 'auto', required: false })
  public readonly listmaxheight?: string
  /** music info */
  @Prop({ type: Array, default: () => [], required: true })
  public readonly music: Array<APlayer.Music>
  /** play speed */
  @Prop({ type: Number, default: 1, required: false })
  public readonly speed: number

  /** 获取当前 Audio 对象实例 */
  @Getter('audio')
  private readonly audio: HTMLAudioElement
  /** 自定义 Media 类型，用于同步 Audio 对象的属性更新视图 */
  @Getter('media')
  private readonly media: Media
  /** 获取当前播放的音乐信息 */
  @Getter('music')
  private readonly currentMusic: APlayer.Music
  /** 获取当前主题颜色 */
  @Getter('theme')
  private readonly currentTheme: string

  /** 设置当前播放音乐信息 */
  @Mutation(SET_MUSIC)
  private setMusic: (music: APlayer.Music) => void
  /** 设置当前主题 */
  @Mutation(SET_THEME)
  private setTheme: (theme: string) => void
  /** 同步 Audio 对象属性以更新视图 */
  @Mutation(SYNC_MEDIA)
  private syncMedia: (audio: HTMLAudioElement) => void

  /** 已播放的进度比例 */
  public get played (): number {
    return this.media.currentTime / this.media.duration
  }

  /** 已缓冲的进度比例 */
  public get loaded (): number {
    if (Number(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA) {
      return this.media.buffered.end(this.media.buffered.length - 1) / this.media.duration
    }
    return 0
  }

  /** 当前播放状态 */
  public get status (): string {
    return !this.media.paused ? 'pause' : 'play'
  }

  /** 开始播放 */
  public play (): void {
    this.audio.play()
  }

  /** 暂停播放 */
  public pause (): void {
    this.audio.pause()
  }

  /** 切换播放状态 */
  public toggle (): void {
    this.audio.paused ? this.play() : this.pause()
  }

  /** 切换静音 */
  public toggleVolume (): void {
    this.audio.volume = this.audio.volume > 0 ? 0 : 1
  }

  /** 设置当前要播放的音乐 */
  // tslint:disable:unified-signatures
  public setPlayMusic (index: number): void
  public setPlayMusic (music: APlayer.Music): void
  public setPlayMusic (x: number | APlayer.Music): void {
    let music = x as APlayer.Music
    let index = x as number

    if (!music) music = this.music[index]
    if (music.title === this.currentMusic.title) return
    this.setMusic(music)
    this.audio.src = music.url
    this.audio.preload = this.preload
    this.audio.autoplay = this.autoplay
    this.speedChange()
  }

  private beforeCreate (): void {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

  private created (): void {
    this.musicChange()
    this.themeChange()

    // 注册所有 Media 事件
    // 事件触发时同步 Audio 对象的属性到 Media 对象以更新视图
    const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, () => this.syncMedia(this.audio))
      this.$emit(event)
    })
  }

  @Watch('music', { deep: true })
  private musicChange (): void {
    if (this.music.length <= 0) return
    if (!this.audio.paused) return
    this.setPlayMusic(0)
  }

  @Watch('theme')
  private themeChange (): void {
    this.setTheme(this.theme)
  }

  @Watch('speed')
  private speedChange (): void {
    this.audio.playbackRate = this.speed
  }

  private progressChangeHandler (percent: number): void {
    this.audio.currentTime = this.audio.duration * percent
  }

  private volumeChangeHandler (volume: number): void {
    this.audio.volume = volume
  }

}

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
