import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Progress.html?style=./Progress.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Progress extends Vue {
  @Prop({ type: Number, default: 0, required: false })
  public loaded: Number
  @Prop({ type: String, default: '', required: false })
  public theme: String
}
