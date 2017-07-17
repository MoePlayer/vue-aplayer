import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './index.html?style=./index.scss'

import { Prop } from 'vue-property-decorator'
import Axios from 'axios'

import APlayer from 'components'
Vue.use(APlayer)

@WithRender
@Component
export default class IndexPage extends Vue {
  private music: Array<APlayer.Music> = []
  private async created () {
    const { data } = await Axios.get('./static/music/map.json')
    this.music = data as Array<APlayer.Music>
  }
}
