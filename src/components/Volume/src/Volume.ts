import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Volume.html?style=./Volume.scss'

import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { Button as vButton } from 'components/Button'

@WithRender
@Component({ components: { vButton } })
export class Volume extends Vue {
  @Prop({ type: Number, default: 0.8, required: false })
  public readonly value: number
  @Getter('theme')
  public readonly theme: string
}
