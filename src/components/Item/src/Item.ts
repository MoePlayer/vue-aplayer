import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Item.html?style=./Item.scss'

import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@WithRender
@Component
export class Item extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  public active: boolean
  @Prop({ type: Number, required: true })
  public index: number
  @Prop({ type: String, required: true, default: 1 })
  public title: string
  @Prop({ type: String, required: true })
  public author: string

  @Getter('theme')
  private theme: string
}

export default Item
