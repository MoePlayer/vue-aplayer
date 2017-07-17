import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './item.html?style=./item.scss'

import { Prop } from 'vue-property-decorator'

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
}
