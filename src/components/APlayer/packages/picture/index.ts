import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Picture.html?style=./Picture.scss'

import { Prop } from 'vue-property-decorator'
import { Button as vButton } from '../button'

@WithRender
@Component({ components: { vButton } })
export class Picture extends Vue { }
