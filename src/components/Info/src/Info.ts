import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Info.html?style=./Info.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Info extends Vue {
  @Prop({ type: String, required: false, default: '没有加载音频' })
  public readonly title: string
  @Prop({ type: String, required: false, default: '(ಗ ‸ ಗ )' })
  public readonly author: string
}

export default Info
