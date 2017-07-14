import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './time.html?style=./time.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Time extends Vue { }
