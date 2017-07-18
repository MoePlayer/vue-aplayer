import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Button.html?style=./Button.scss'

import { Prop, Watch } from 'vue-property-decorator'
import svg from './svg'

@WithRender
@Component
export class Button extends Vue {
  @Prop({ type: String, default: 'play' })
  public type: string
  @Prop({ type: String, default: 'play' })
  public icon: string

  public get path () {
    return svg[this.icon]
  }
}

export default Button
