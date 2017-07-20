import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './index.html?style=./index.scss'

import { Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import store from 'store'
import APlayer from 'components'
import { APlayer as IAPlayer } from 'components'
Vue.use(APlayer)

@WithRender
@Component({ store })
export default class IndexPage extends Vue {

  private aplayer: IAPlayer = null

  private narrow: boolean = false
  private autoplay: boolean = true
  private showlrc: boolean = true
  private mutex: boolean = true
  private fold: boolean = false
  private speed: number = 1
  private theme: string
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
    this.$nextTick(() => this.getLyric(this.aplayer.currentMusic))
  }

}
