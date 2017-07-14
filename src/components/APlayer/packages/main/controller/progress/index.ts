import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './progress.html?style=./progress.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Progress extends Vue { }
