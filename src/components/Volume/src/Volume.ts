import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Volume.html?style=./Volume.scss'

import { Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { Button as vButton } from 'components/Button'

@WithRender
@Component({ components: { vButton } })
export class Volume extends Vue {

  @Prop({ type: Number, default: 1, required: false })
  public readonly value: number
  @Getter('theme')
  public readonly theme: string

  private currentValue = 1
  private status = 'down'

  private created (): void {
    this.valueChange()
  }

  @Watch('value')
  private valueChange (): void {
    this.currentValue = this.value
    if (this.value > 0.9) this.status = 'up'
    else if (this.value <= 0) this.status = 'off'
    else this.status = 'down'
  }

  private changeHandler (): void {
    const evt = event as MouseEvent
    const target = this.$refs.bar as HTMLElement
    const targetTop = target.getBoundingClientRect().bottom
    if (targetTop <= 0) return // 音量控制面板已隐藏
    const offsetTop = Math.round(targetTop - evt.clientY)
    let percent = offsetTop / target.offsetHeight
    if (percent > 1) percent = 1
    if (percent < 0) percent = 0
    this.currentValue = percent
    this.$emit('change', percent)
  }

}
