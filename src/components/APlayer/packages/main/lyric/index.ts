import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './lyric.html?style=./lyric.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Lyric extends Vue { }
