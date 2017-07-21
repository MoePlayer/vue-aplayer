import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Item.html?style=./Item.scss'

import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@WithRender
@Component
export class Item extends Vue {

  @Prop({ type: Number, required: true })
  public readonly id: number
  @Prop({ type: Boolean, required: false, default: false })
  public readonly active: boolean
  @Prop({ type: Number, required: true })
  public readonly index: number
  @Prop({ type: String, required: true, default: 1 })
  public readonly title: string
  @Prop({ type: String, required: true })
  public readonly author: string

  @Getter('theme')
  private readonly theme: string

  private mounted (): void {
    this.$nextTick(() => this.$emit('render'))
  }

}

export default Item
