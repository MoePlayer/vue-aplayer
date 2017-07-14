import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './list.html?style=./list.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class List extends Vue { }
