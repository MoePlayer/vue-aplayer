import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './List.html?style=./List.scss'

import { Prop, Watch } from 'vue-property-decorator'

@WithRender
@Component
export class List extends Vue {

  @Prop({ type: Array, required: true })
  public readonly music: Array<APlayer.Music>
  @Prop({ type: String, required: false, default: 'auto' })
  public readonly maxheight: string
  @Prop({ type: Boolean, required: false, default: false })
  public readonly collapsed: boolean

  private height: string = 'auto'

  @Watch('music')
  @Watch('collapsed')
  private musicChange (): void {
    // tslint:disable:curly
    if (this.collapsed) this.height = '0px'
    else this.$nextTick(() => {
      const maxHeight = Number.parseInt(this.maxheight)
      const offsetHeight = (this.$refs.list as HTMLElement).offsetHeight
      this.height = `${offsetHeight > maxHeight ? maxHeight : offsetHeight}px`
    })
    // tslint:enable:curly
  }

  private mounted (): void {
    this.musicChange()
  }

}
