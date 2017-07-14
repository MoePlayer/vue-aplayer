import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './controller.html?style=./controller.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Controller extends Vue { }
