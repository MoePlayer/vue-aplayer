import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Volume.html?style=./Volume.scss'

import { Prop } from 'vue-property-decorator'
import { Button as vButton } from 'components/Button'

@WithRender
@Component({ components: { vButton } })
export class Volume extends Vue {
  @Prop({ type: Number, default: 0.9, required: false })
  public value: Number
  @Prop({ type: String, default: '', required: false })
  public theme: String
}
