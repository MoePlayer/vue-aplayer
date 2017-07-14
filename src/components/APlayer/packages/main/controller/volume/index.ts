import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './volume.html?style=./volume.scss'

import { Prop } from 'vue-property-decorator'
import { Button as vButton } from '../../../button'

@WithRender
@Component({ components: { vButton } })
export class Volume extends Vue { }
