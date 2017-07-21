import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Progress.html?style=./Progress.scss'

import { Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@WithRender
@Component
export class Progress extends Vue {

  @Prop({ type: Number, default: 0, required: true })
  public readonly loaded: number
  @Prop({ type: Number, default: 0, required: true })
  public readonly played: number
  @Getter('theme')
  public readonly theme: string

  private isPan = false // 解决事件冲突
  private currentPlayed = 0
  private thumbStyles = {
    borderWidth: `1px`,
    borderStyle: 'solid',
    borderColor: 'transparent',
    background: '#fff'
  }

  @Watch('played')
  playedChange (): void {
    if (this.isPan) return
    this.currentPlayed = this.played || 0
  }

  @Watch('theme')
  private themeChange (): void {
    this.thumbStyles.borderColor = this.theme
  }

  private created (): void {
    this.themeChange()
    this.playedChange()
  }

  private mouseOverHandler (): void {
    this.thumbStyles.background = this.theme
  }

  private mouseOutHandler (): void {
    this.thumbStyles.background = '#fff'
  }

  private changeHandler (): void {
    if (this.isPan) return
    const evt = event as MouseEvent
    const target = this.$refs.bar as HTMLElement
    const targetLeft = target.getBoundingClientRect().left
    const offsetLeft = evt.clientX - targetLeft
    this.$emit('change', offsetLeft / target.offsetWidth)
  }

  private panMoveHandler (): void {
    const evt = event as MouseEvent
    const target = this.$refs.bar as HTMLElement
    const targetLeft = target.getBoundingClientRect().left
    const offsetLeft = evt.clientX - targetLeft
    let percent = offsetLeft / target.offsetWidth
    if (percent > 1) percent = 1
    else if (percent < 0) percent = 0
    this.currentPlayed = percent
  }

  private panStartHandler (): void {
    this.isPan = true
  }

  private panEndHandler (): void {
    this.$emit('change', this.currentPlayed)
    setTimeout(() => this.isPan = false)
  }

}
