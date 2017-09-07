import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Button.html?style=./Button.scss'

import { Prop } from 'vue-property-decorator'
import svg from './svg'

@WithRender
@Component
export class Button extends Vue {

  @Prop({ type: String, default: 'play' })
  public readonly type: string
  @Prop({ type: String, default: 'play' })
  public readonly icon: string

  public get path () {
    return svg[this.icon]
  }

}

export default Button
