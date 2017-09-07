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

import { store } from 'store'
import { State } from 'store/state'
import {
  SET_MUSIC,
  SET_THEME,
  SET_SPEED,
  SET_VOLUME,
  SET_COLLAPSED,
  SET_PLAY_MODE,
  SYNC_MEDIA,
  SAVE_STATE,
  RECORD_VOLUME
} from 'store/types'

import { Thread } from 'utils/thread'
import Touch from 'components/Touch'
import 'console.img'

Vue.use(Touch)

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
  /** pause other players when this player playing */
  @Prop({ type: Boolean, default: true, required: false })
  public readonly mutex?: boolean
  /** theme color, default: #ad7a86 */
  @Prop({ type: String, default: '#ad7a86', required: false })
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
  /** fold playlist */
  @Prop({ type: Boolean, default: false, required: false })
  public readonly fold?: boolean
  /** enable/disable remove features */
  @Prop({ type: Boolean, default: false, required: false })
  public readonly remove?: boolean

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
  public readonly playMode: APlayer.PlayMode
  /** 获取当前主题颜色 */
  @Getter('theme')
  private readonly currentTheme: string
  /** 获取播放速度 */
  @Getter('speed')
  private readonly playRate: number
  /** 获取播放音量 */
  @Getter('volume')
  private readonly volume: number
  /** 静音前的音量 */
  @Getter('historyVolume')
  private readonly historyVolume: number
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
  /** 记录静音前的音量 取消静音后恢复原音量 */
  @Mutation(RECORD_VOLUME)
  private recordVolume: (volume: number) => void

  /** 当前播放的音乐在播放列表中的位置 */
  private currentMusicOffsetTop: number = 0

  /** 获取当前播放的音乐索引 */
  public get playIndex (): number {
    return this.music.findIndex(x => x.id === this.currentMusic.id)
  }

  /** 已播放的进度比例 */
  private get played (): number {
    return this.media.currentTime / this.media.duration
  }

  /** 已缓冲的进度比例 */
  private get loaded (): number {
    if (Number.parseInt(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA) {
      return this.media.buffered.end(this.media.buffered.length - 1) / this.media.duration
    }
    return 0
  }

  /** 当前播放状态 */
  private get status (): string {
    return !this.media.paused ? 'pause' : 'play'
  }

  /** 当前播放模式对应文案 */
  private get displayPlayMode (): string {
    const map = { circulation: '列表循环', single: '单曲循环', random: '随机播放', order: '顺序播放' }
    return map[this.playMode]
  }

  /** 计算当前播放的音乐在播放列表中的位置 */
  private async setCurrentMusicOffsetTop (index?: number): Promise<void> {
    await Thread.sleep(0) // 延迟执行，确保 Item 组件渲染完毕
    if (this.music.length <= 0) return
    if (index && this.music.length - 1 !== index) return

    const list = this.$refs.list as List
    const items = this.$refs.items as Array<Item> || []
    const { id } = this.currentMusic
    const active = items.find(item => item.id === id)
    if (active) this.currentMusicOffsetTop = active.$el.offsetTop - list.$el.offsetTop
    else this.currentMusicOffsetTop = 0
  }

  /** 设置当前要播放的音乐 */
  // tslint:disable:unified-signatures
  public play (): void
  public play (index: number): Promise<any>
  public play (music: APlayer.Music): Promise<any>
  public play (x?: number | APlayer.Music): Promise<any> {
    this.mutex && this.postMessage({ action: 'mutex', timestamp: new Date().getTime() })
    if (x === void 0) {
      if (!this.currentMusic.url) this.play(this.getPlayIndexByPlayMode(this.playMode))
      else if (Number.parseInt(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA) this.audio.play()
      return void 0
    }

    let music = x as APlayer.Music
    let index = x as number

    if (index < 0) {
      this.setMusic(null)
      this.audio.src = '' // 不要赋值为 null ， null 还会发一次请求
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
      this.audio.oncanplay = () => {
        const canplay = this.config && this.config.media && this.config.media.paused === false
        if (this.autoplay && canplay) this.play() // Safari 不支持 autoplay 属性
      }
      this.audio.onloadeddata = resolve
      this.speedChange()
      this.setCurrentMusicOffsetTop()
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
    if (this.audio.volume > 0) this.recordVolume(this.audio.volume)
    this.setVolume(this.audio.volume > 0 ? 0 : this.historyVolume || 1)
  }

  /** 切换播放模式 */
  public togglePlayMode (mode?: APlayer.PlayMode): void {
    // play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
    if (mode) {
      this.setPlayMode(mode)
      return
    }
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
    console.log('\n%c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
    const time = { start: 0, end: 0, timespan: () => time.end - time.start }
    time.start = new Date().getTime()
    const img = new Image()
    img.onload = () => { // 确保文字必须在图片输出之后再输出
      time.end = new Date().getTime()
      setTimeout(() => {
        const moe = 'color: #fd5557; font-weight: bold'
        console.log('\n%cMoe %cis justice!!!', moe, 'font-weight: bold')
        console.log('%cqwq欢迎加入 %c@MoeFE Studio', 'font-weight: bold', moe)
        console.log('%cGitHub: %chttps://github.com/MoeFE', 'font-weight: bold', 'color: #42b983; font-weight: bold')
        console.log('')
      }, time.timespan())
    }
    img.src = 'https://avatars5.githubusercontent.com/u/29977599?v=3&s=90'
    console.img(img.src)
  }

  /** 初始化组件信息 */
  private created (): void {
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
        setTimeout(() => this.audio.currentTime = media.currentTime, 100) // 恢复播放进度 Safari 下必须延迟 100 ms 才能生效
        // 恢复播放状态
        if (media.paused) this.pause()
        else this.play()
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
      this.audio.addEventListener(event, evt => {
        this.syncMedia(this.audio)
        this.$emit(event, evt)
      })
    })

    this.syncMedia(this.audio)
    this.themeChange()
    this.musicChange()
    this.audio.addEventListener('ended', this.endedHandler)

    // 暂停其他实例（多标签页）
    if (!this.mutex) return
    const action = 'mutex'
    const key = this.postMessage({ action, timestamp: new Date().getTime() })
    window.addEventListener('storage', evt => {
      if (evt.key !== key) return
      const data = JSON.parse(evt.newValue) as { action: string; timestamp: number }
      if (data && data.action === action) this.pause()
    })
  }

  @Watch('theme')
  private themeChange (): void {
    this.setTheme(this.theme)
  }

  @Watch('speed')
  private speedChange (): void {
    this.setSpeed(this.speed)
  }

  @Watch('fold')
  private foldChange (): void {
    this.setCollapsed(this.fold)
    this.$emit('foldChange', this.fold)
  }

  /**
   * 监听播放列表
   * 如果是首次初始化列表则
   * 根据当前播放模式设置要播放的音乐
   */
  @Watch('music', { deep: true })
  private musicChange (): void {
    if (this.music.length <= 0) return
    this.music.forEach((music, index) => {
      if (!music.id) music.id = index // 如果 music 没有指定 id 则通过索引自动生成
    })
    if (!this.audio.paused) return
    if (this.config && this.config.music) return

    const index = this.getPlayIndexByPlayMode(this.playMode)
    this.play(index < 0 ? 0 : index)
  }

  /** 进度条发生改变触发的事件，设置新的播放进度 */
  private async progressChangeHandler (percent: number): Promise<void> {
    // tslint:disable:curly
    if (!this.currentMusic.url)
      await this.play(this.getPlayIndexByPlayMode(this.playMode))
    else if (Number.parseInt(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA)
      this.audio.currentTime = this.audio.duration * percent
    // tslint:enable:curly
  }

  /** 音频播放完毕，在此根据当前播放模式处理下一曲逻辑 */
  private async endedHandler (): Promise<void> {
    const index = this.getPlayIndexByPlayMode(this.playMode)
    await this.play(index)
    if (index >= 0) this.play() // 下一曲时忽略 [autoplay = false] 的影响，所以需要再调用一次
  }

  /** 列表项被单击时触发的函数 */
  private async playHandler (music: APlayer.Music): Promise<void> {
    await this.play(music)
    this.play() // 点击列表播放时忽略 [autoplay = false] 的影响，所以需要再调用一次
  }

  /** 删除当前歌曲 */
  private async deleteMusic (index: number): Promise<void> {
    if (!this.remove) return
    const isCurrentMusic = index === this.playIndex
    this.music.splice(index, 1)
    if (isCurrentMusic) { // 如果当前删除的歌曲是当前播放的歌曲则自动切换下一首
      await this.$nextTick()
      this.play(index)
    }
  }

  /**
   * 根据当前播放模式获取下一曲要播放的音乐索引
   *
   * @private
   * @param {APlayer.PlayMode} mode 当前播放模式
   * @returns {number} 下一曲要播放的音乐索引
   * @memberof APlayer
   */
  private getPlayIndexByPlayMode (mode: APlayer.PlayMode): number {
    let next = this.playIndex
    switch (mode) {
      default: return next
      case 'single': return next < 0 ? 0 : next // 单曲循环
      case 'circulation':
        if (++next >= this.music.length) next = 0 // 播放完回到第一项
        return next // 列表循环
      case 'order':
        if (++next >= this.music.length) next = -1 // 播放完停止
        return next // 顺序播放
      case 'random':
        next = Math.floor(Math.random() * this.music.length)
        return next // 随机播放
    }
  }

  private postMessage (data: any): string {
    const key = 'APLAYER_POST_MESSAGE'
    localStorage.setItem(key, JSON.stringify(data))
    return key
  }

}

// tslint:enable:member-ordering

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
