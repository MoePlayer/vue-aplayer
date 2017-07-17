import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Button.html?style=./Button.scss'

import { Prop, Watch } from 'vue-property-decorator'
import svg from './svg'

@WithRender
@Component
export class Button extends Vue {
  @Prop({ type: String, default: 'play' })
  public type: String
  @Prop({ type: String, default: 'play' })
  public icon: String
  private path: Array<String> = svg.play

  private created () {
    this.iconChange()
  }

  @Watch('icon')
  private iconChange () {
    this.path = svg[this.icon.toString()]
  }
}

export default Button
