import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Time.html?style=./Time.scss'

import { Prop } from 'vue-property-decorator'

@WithRender
@Component
export class Time extends Vue {

  @Prop({ type: Number, default: 0, required: true })
  public readonly currentTime: number
  @Prop({ type: Number, default: 0, required: true })
  public readonly duration: number

  private get ptime (): string {
    return this.timeSecondsFormat(this.currentTime)
  }
  private get dtime (): string {
    return this.timeSecondsFormat(this.duration)
  }

  private timeSecondsFormat (time: number): string {
    time = time || 0
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${this.padStart(minutes.toString(), 2, '0')}:${this.padStart(seconds.toString(), 2, '0')}`
  }

  private padStart (s: string, targetLength: number, padString: string): string {
    // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    targetLength = targetLength >> 0 // floor if number or convert non-number to 0;
    padString = String(padString || ' ')
    if (s.length > targetLength) {
      return String(s)
    } else {
      targetLength = targetLength - s.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(s)
    }
  }

}
