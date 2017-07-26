import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Touch.html'
import Hammer from 'hammerjs'

const events = ['pan', 'panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown']

@WithRender
@Component
export class Touch extends Vue {

  private mounted (): void {
    const mc = new Hammer.Manager(this.$el)
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }))
    events.forEach(event => mc.on(event, evt => this.$emit(event, evt)))
  }

}
export default Touch
