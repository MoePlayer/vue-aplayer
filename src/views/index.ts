import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './index.html?style=./index.scss'

import { Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import mock from 'mockjs'
import { store } from './store'
import APlayer from 'components'
import { APlayer as IAPlayer } from 'components'
Vue.use(APlayer)

@WithRender
@Component({ store })
export default class IndexPage extends Vue {

  private aplayer: IAPlayer = null
  private mock = mock

  private narrow: boolean = false
  private autoplay: boolean = false
  private showlrc: boolean = false
  private mutex: boolean = true
  private fold: boolean = false
  private speed: number = 1
  private theme: string = '#ad7a86'
  private mode: APlayer.PlayMode = 'circulation'
  private preload: APlayer.Preload = 'metadata'
  private listmaxheight: string = '200px'

  @Getter('list')
  private readonly music: Array<APlayer.Music>
  @Action('getMusics')
  private readonly getMusics: () => void
  @Action('getLyricAsync')
  private readonly getLyric: (music: APlayer.Music) => void

  private created (): void {
    this.getMusics()
  }

  private mounted (): void {
    this.aplayer = this.$refs.aplayer as IAPlayer
  }

  private getLyricAsync (): void {
    this.showlrc = true
    if (this.aplayer.currentMusic.lrc && this.aplayer.currentMusic.lrc !== 'loading') return
    setTimeout(() => this.getLyric(this.aplayer.currentMusic), 1000)
    // this.$nextTick(() => this.getLyric(this.aplayer.currentMusic))
  }

  private setMusic (): void {
    this.aplayer.setMusic({
      ...this.aplayer.currentMusic,
      title: '歌曲信息已被修改',
      author: '喵喵喵',
      pic: null,
      lrc: '[01:00]啦啦啦啦啦啦\n[02:00]喵喵喵喵喵喵\n[03:00]呱呱呱呱呱呱'
    })
  }

}
