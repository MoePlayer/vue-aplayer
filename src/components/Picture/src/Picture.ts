import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Picture.html?style=./Picture.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Picture extends Vue {
  @Prop({ type: String, default: 'https://avatars5.githubusercontent.com/u/29977599?v=3&s=90' })
  public readonly url: string
}
