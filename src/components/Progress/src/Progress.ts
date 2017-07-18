import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Progress.html?style=./Progress.scss'

import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@WithRender
@Component
export class Progress extends Vue {
  @Prop({ type: Number, default: 0, required: true })
  public loaded: Number
  @Prop({ type: Number, default: 0, required: true })
  public played: Number
  @Getter('theme')
  public theme: String
}
