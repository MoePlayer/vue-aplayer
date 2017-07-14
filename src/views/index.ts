import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './index.html?style=./index.scss'

import { Prop } from 'vue-property-decorator'

import APlayer from 'components/APlayer/plugin'
Vue.use(APlayer)

@WithRender
@Component
export default class IndexPage extends Vue { }
