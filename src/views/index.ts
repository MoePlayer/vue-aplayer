import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './index.html?style=./index.scss'

import { Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import store from 'store'
import APlayer from 'components'
Vue.use(APlayer)

@WithRender
@Component({ store })
export default class IndexPage extends Vue {

  @Getter('list')
  private readonly music: Array<APlayer.Music>
  @Action('getMusics')
  private readonly getMusics: () => void

  private created (): void {
    this.getMusics()
  }

}
