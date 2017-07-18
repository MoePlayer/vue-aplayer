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
  /** play speed */
  @Prop({ type: Number, default: 1, required: false })
  public speed: number

  /** 获取当前 Audio 对象实例 */
  @Getter('audio')
  private audio: HTMLAudioElement
  /** 自定义 Media 类型，用于同步 Audio 对象的属性更新视图 */
  @Getter('media')
  private media: Media
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
  /** 同步 Audio 对象属性以更新视图 */
  @Mutation(SYNC_MEDIA)
  private syncMedia: (audio: HTMLAudioElement) => void

  private beforeCreate () {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

  private created () {
    this.musicChange()
    this.themeChange()
    this.speedChange()

    // 注册所有 Media 事件
    // 事件触发时同步 Audio 对象的属性到 Media 对象以更新视图
    const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, () => this.syncMedia(this.audio))
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

  @Watch('speed')
  private speedChange () {
    this.audio.playbackRate = this.speed
  }

}

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
