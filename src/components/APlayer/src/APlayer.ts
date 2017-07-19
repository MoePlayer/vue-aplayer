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
import {
  SET_MUSIC,
  SET_THEME,
  SET_SPEED,
  SET_VOLUME,
  SET_COLLAPSED,
  SET_PLAY_MODE,
  SYNC_MEDIA,
  SAVE_STATE
} from 'store/types'

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

// tslint:disable:member-ordering
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
  public readonly currentMusic: APlayer.Music
  /** 获取播放模式 */
  @Getter('mode')
  private readonly playMode: APlayer.PlayMode
  /** 获取当前主题颜色 */
  @Getter('theme')
  private readonly currentTheme: string
  /** 获取播放速度 */
  @Getter('speed')
  private readonly playRate: number
  /** 获取播放音量 */
  @Getter('volume')
  private readonly volume: number
  /** 获取播放列表收缩状态 */
  @Getter('collapsed')
  private readonly collapsed: boolean
  @Getter('config')
  private readonly config: State

  /** 设置当前播放音乐信息 */
  @Mutation(SET_MUSIC)
  public setMusic: (music: APlayer.Music) => void
  /** 设置播放模式 */
  @Mutation(SET_PLAY_MODE)
  private setPlayMode: (mode: APlayer.PlayMode) => void
  /** 设置当前主题 */
  @Mutation(SET_THEME)
  private setTheme: (theme: string) => void
  /** 设置播放速度 */
  @Mutation(SET_SPEED)
  private setSpeed: (speed: number) => void
  /** 设置播放音量 */
  @Mutation(SET_VOLUME)
  private setVolume: (volume: number) => void
  /** 设置播放列表收缩状态 */
  @Mutation(SET_COLLAPSED)
  private setCollapsed: (collapsed: boolean) => void
  /** 同步 Audio 对象属性以更新视图 */
  @Mutation(SYNC_MEDIA)
  private syncMedia: (audio: HTMLAudioElement) => void
  /** 保存状态到本地 */
  @Mutation(SAVE_STATE)
  private saveState: (state: State) => void

  /** 已播放的进度比例 */
  private get played (): number {
    return this.media.currentTime / this.media.duration
  }

  /** 已缓冲的进度比例 */
  private get loaded (): number {
    if (Number(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA) {
      return this.media.buffered.end(this.media.buffered.length - 1) / this.media.duration
    }
    return 0
  }

  /** 当前播放状态 */
  private get status (): string {
    return !this.media.paused ? 'pause' : 'play'
  }

  /** 设置当前要播放的音乐 */
  // tslint:disable:unified-signatures
  public play (): void
  public play (index: number): Promise<any>
  public play (music: APlayer.Music): Promise<any>
  public play (x?: number | APlayer.Music): Promise<any> {
    if (x === void 0) {
      if (!this.currentMusic.url) this.play(this.getPlayIndexByPlayMode(this.playMode, this.currentMusic, this.music))
      else this.audio.play()
      return void 0
    }

    let music = x as APlayer.Music
    let index = x as number

    if (index < 0) {
      this.setMusic(null)
      this.audio.src = null
      return void 0
    }
    if (typeof music !== 'object') music = this.music[index]
    if (music.id === this.currentMusic.id && !this.audio.paused) return void 0
    this.setMusic(music)

    return new Promise(resolve => {
      this.audio.src = music.url
      this.audio.preload = this.preload
      this.audio.autoplay = this.autoplay
      this.audio.volume = this.volume
      this.audio.oncanplay = resolve
      if (this.playMode === 'single') this.audio.loop = true
      this.speedChange()
    })
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
    this.setVolume(this.audio.volume > 0 ? 0 : this.config.media.volume || 1)
  }

  /** 切换播放模式 */
  public togglePlayMode (): void {
    // play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
    const modes = ['circulation', 'single', 'random', 'order']
    let index = modes.indexOf(this.playMode) + 1
    if (index >= modes.length) index = 0
    this.setPlayMode(modes[index] as APlayer.PlayMode)
  }

  /** 切换播放列表收缩状态 */
  public toggleCollapsed (): void {
    this.setCollapsed(!this.collapsed)
  }

  /**
   * 尊重原作者 输出版本信息和原 APlayer 地址
   *
   * The Star And Thank Author License (SATA)
   * Copyright (c) 2016-2017 DIYgod(i@html.love)
   * Project Url: https://github.com/DIYgod/APlayer
   */
  private beforeCreate (): void {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

  /** 初始化组件信息 */
  private created (): void {
    this.themeChange()

    // 恢复播放器状态信息
    if (this.config) {
      const music = this.config.music
      const media = this.config.media
      const mode = this.config.mode

      this.setCollapsed(this.config.collapsed) // 恢复播放列表展开状态
      if (music) this.play(music) // 恢复播放的音频
      if (mode) this.setPlayMode(mode) // 恢复播放模式
      if (media) {
        this.setSpeed(media.playbackRate) // 恢复播放速度
        this.setVolume(media.volume) // 恢复播放音量
        // 恢复播放状态
        if (media.paused) this.pause()
        // 如果设置了自动播放则恢复播放进度
        if (this.autoplay) this.audio.currentTime = media.currentTime
      }
    }

    // 监听 Store
    // 保存播放器状态信息
    this.$store.subscribe((mutation, state: State) => {
      if (mutation.type === SAVE_STATE) return // 防止递归调用
      const ignore = ['key', 'audio', 'list'] // 忽略保存不必要的项
      const storage = {}
      Object.keys(state)
        .filter(key => ignore.indexOf(key) === -1)
        .forEach(key => storage[key] = state[key])

      this.saveState(storage as State)
    })

    // 注册所有 Media 事件
    // 事件触发时同步 Audio 对象的属性到 Media 对象以更新视图
    const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, () => this.syncMedia(this.audio))
      this.$emit(event)
    })

    this.audio.addEventListener('ended', this.endedHandler)
  }

  @Watch('theme')
  private themeChange (): void {
    this.setTheme(this.theme)
  }

  @Watch('speed')
  private speedChange (): void {
    this.setSpeed(this.speed)
  }

  /**
   * 监听播放列表
   * 如果是首次初始化列表则
   * 根据当前播放模式设置要播放的音乐
   */
  @Watch('music', { deep: true })
  private musicChange (): void {
    if (this.music.length <= 0) return
    if (!this.audio.paused) return
    if (this.config && this.config.music) return
    this.play(0)
  }

  /** 进度条发生改变触发的事件，设置新的播放进度 */
  private async progressChangeHandler (percent: number): Promise<void> {
    if (!this.currentMusic.url) await this.play(this.getPlayIndexByPlayMode(this.playMode, this.currentMusic, this.music))
    this.audio.currentTime = this.audio.duration * percent
  }

  /** 音频播放完毕，在此根据当前播放模式处理下一曲逻辑 */
  private endedHandler () {
    this.play(this.getPlayIndexByPlayMode(this.playMode, this.currentMusic, this.music))
  }

  /**
   * 根据当前播放模式获取下一曲要播放的音乐索引
   *
   * @private
   * @param {APlayer.PlayMode} mode 当前播放模式
   * @param {APlayer.Music} music 当前播放音乐
   * @param {Array<APlayer.Music>} musics 音乐列表
   * @returns {number} 下一曲要播放的音乐索引
   * @memberof APlayer
   */
  private getPlayIndexByPlayMode (mode: APlayer.PlayMode, music: APlayer.Music, musics: Array<APlayer.Music>): number {
    const index: number = musics.findIndex(x => x.id === music.id)
    let next = index < 0 ? 0 : index
    switch (mode) {
      default: return next
      case 'single': return next // 单曲循环
      case 'circulation':
        if (++next >= musics.length) next = 0 // 播放完回到第一项
        return next // 列表循环
      case 'order':
        if (++next >= musics.length) next = -1 // 播放完停止
        return next // 顺序播放
      case 'random':
        next = Math.floor(Math.random() * musics.length)
        return next // 随机播放
    }
  }

}

// tslint:enable:member-ordering

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
