import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './APlayer.html?style=./themes/APlayer.scss'

import { Prop } from 'vue-property-decorator'
import { Picture as vPicture } from './packages/picture'
import { Button as vButton } from './packages/button'
import { Container } from './packages/main'
import { Controller } from './packages/main/controller'
import { Info } from './packages/main/info'
import { Lyric } from './packages/main/lyric'
import { Progress as ProgressBar } from './packages/main/controller/progress'
import { Time as TimeBar } from './packages/main/controller/time'
import { Volume } from './packages/main/controller/volume'
import { List } from './packages/list'
import { Item } from './packages/list/item'

@WithRender
@Component({ components: { vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item } })
export class APlayer extends Vue {

  private beforeCreate () {
    console.log('\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')
  }

}
