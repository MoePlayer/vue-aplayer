import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Time.html?style=./Time.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Time extends Vue { }
