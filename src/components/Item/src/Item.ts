import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Item.html?style=./Item.scss'

import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@WithRender
@Component
export class Item extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  public active: Boolean
  @Prop({ type: Number, required: true })
  public index: Number
  @Prop({ type: String, required: true, default: 1 })
  public title: String
  @Prop({ type: String, required: true })
  public author: String

  @Getter('theme')
  private theme: String
}

export default Item
