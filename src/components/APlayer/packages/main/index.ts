import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './main.html?style=./main.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Container extends Vue { }
