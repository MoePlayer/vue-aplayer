import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Controller.html?style=./Controller.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Controller extends Vue { }
export default Controller
