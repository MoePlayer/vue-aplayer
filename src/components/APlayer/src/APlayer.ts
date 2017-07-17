import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './APlayer.html?style=./APlayer.scss'

import { Prop, Watch } from 'vue-property-decorator'
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

@WithRender
@Component({ components: { vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item } })
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

  /** native audio instance */
  private audio: HTMLAudioElement = new Audio()
  /** 当前播放的音乐信息 */
  private currentMusic: APlayer.Music = { title: '无法加载音频信息', author: '', url: null }

  private beforeCreate () {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

  @Watch('music', { deep: true })
  private musicChange () {
    this.currentMusic = this.music[0]
  }

}

export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }
