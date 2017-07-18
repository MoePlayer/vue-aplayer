import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './Lyric.html?style=./Lyric.scss'

import { Prop, Watch } from 'vue-property-decorator'
import Axios from 'axios'

export interface LRC {
  time: number
  text: string
}

@WithRender
@Component
export class Lyric extends Vue {

  @Prop({ type: String, required: false })
  public lrc: string
  @Prop({ type: Number, required: false, default: 0 })
  public currentTime: number

  /** 获取解析后的歌词文本 */
  private currentLRC: string = null
  private LRC: Array<LRC> = []

  public get current (): LRC {
    const match = this.LRC.filter(x => x.time < this.currentTime * 1000)
    if (match && match.length > 0) return match[match.length - 1]
    return this.LRC[0]
  }

  public get scrollTop (): number {
    const { time } = this.current || { time: 0 }
    const lrcElements = this.$refs.lrc as Array<HTMLElement> || []
    const currentElement = lrcElements.find(x => Number.parseInt(x.dataset.time) === time)
    return (currentElement ? currentElement.offsetTop : 0) * -1
  }

  private created () {
    this.change()
  }

  @Watch('lrc')
  private change () {
    this.parseLRC()
  }

  private async parseLRC () {
    if (!this.lrc) return
    if (this.isURL(this.lrc)) { // 如果歌词是一个URL地址则请求该地址获得歌词文本
      const { data } = await Axios.get(this.lrc.toString())
      this.currentLRC = data
    } else this.currentLRC = this.lrc

    const reg = /\[(\d+):(\d+)\.(\d+)\](.+)/
    this.LRC = []
    this.currentLRC.replace(/\\n/g, '\n').split('\n').forEach(line => {
      const match = line.match(reg)
      if (!match) return
      if (match.length !== 5) return
      const minute = Number.parseInt(match[1])
      const second = Number.parseInt(match[2])
      const millisecond = Number.parseInt(match[3])
      const time = minute * 60 * 1000 + second * 1000 + millisecond
      const text = match[4]
      this.LRC.push({ time, text })
    })
  }

  private isURL (url: String) {
    const uri = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/
    const path = /.*\/[^\/]+\.[^\.]+$/
    return uri.test(url.toString()) || path.test(url.toString())
  }

}
