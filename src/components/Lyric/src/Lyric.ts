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
  public readonly lrc: string
  @Prop({ type: Number, required: false, default: 0 })
  public readonly currentTime: number

  /** 获取解析后的歌词文本 */
  private currentLRC: string = null
  private LRC: Array<LRC> = []

  public get current (): LRC {
    const match = this.LRC.filter(x => x.time < this.currentTime * 1000)
    if (match && match.length > 0) return match[match.length - 1]
    return this.LRC[0]
  }

  public get transform (): { transitionDuration?: string, transform: string } {
    return {
      transitionDuration: `${this.transitionDuration}ms`,
      transform: `translate3d(0, ${this.translateY}px, 0)`
    }
  }

  public get translateY (): number {
    const { time } = this.current || { time: 0 }
    const lrcElements = this.$refs.lrc as Array<HTMLElement> || []
    const currentElement = lrcElements.find(x => Number.parseInt(x.dataset.time) === time)
    const currentIndex = currentElement ? Number.parseInt(currentElement.dataset.index) : 0
    const isLastElement = currentIndex === lrcElements.length - 1
    // 如果 currentElement 是最后一个元素
    // 则返回 currentElement 上一个元素的 offsetTop
    // 去掉末尾的空行 优化歌词面板显示
    if (isLastElement) {
      const lastElement = lrcElements[currentIndex - 1]
      return (lastElement ? lastElement.offsetTop : 0) * -1
    }
    return (currentElement ? currentElement.offsetTop : 0) * -1
  }

  private get transitionDuration (): number {
    return this.LRC.length > 1 ? 500 : 0
  }

  private created (): void {
    this.change()
  }

  @Watch('lrc')
  private change (): void {
    this.LRC = []
    this.currentLRC = null
    this.parseLRC()
  }

  private async parseLRC (): Promise<void> {
    if (!this.lrc || this.lrc === 'loading') return
    if (this.isURL(this.lrc)) { // 如果歌词是一个URL地址则请求该地址获得歌词文本
      const { data } = await Axios.get(this.lrc)
      this.currentLRC = data
    } else this.currentLRC = this.lrc

    const reg = /\[(\d+):(\d+)[.|:](\d+)\](.+)/
    const regTime = /\[(\d+):(\d+)[.|:](\d+)\]/g
    const regCompatible = /\[(\d+):(\d+)]()(.+)/
    const regTimeCompatible = /\[(\d+):(\d+)]/g
    const regOffset = /\[offset:\s*(-{0,1}\d+)\]/
    const offsetMatch = this.lrc.match(regOffset)
    const offset = offsetMatch ? Number.parseInt(offsetMatch[1]) : 0
    this.LRC = []

    const matchAll = (line: string) => {
      let match = line.match(reg) || line.match(regCompatible)
      if (!match) return
      if (match.length !== 5) return
      const minutes = Number.parseInt(match[1]) || 0
      const seconds = Number.parseInt(match[2]) || 0
      const milliseconds = Number.parseInt(match[3]) || 0
      const time = (minutes * 60 * 1000 + seconds * 1000 + milliseconds) + offset
      const text = (match[4] as string).replace(regTime, '').replace(regTimeCompatible, '')
      if (!text) return // 优化：不要显示空行
      this.LRC.push({ time, text })
      matchAll(match[4]) // 递归匹配多个时间标签
    }

    this.currentLRC.replace(/\\n/g, '\n').split('\n').forEach(line => matchAll(line))

    // 歌词格式不支持
    if (this.LRC.length <= 0) this.LRC = [{ time: -1, text: '(・∀・*) 抱歉，该歌词格式不支持' }]
    else this.LRC.sort((a, b) => a.time - b.time)
  }

  private isURL (url: string): boolean {
    const uri = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/
    const path = /.*\/[^\/]+\.[^\.]+$/
    const wrap = /(\r\n)|(\\r\\n)|(\n)|(\\n)/
    return uri.test(url) || (path.test(url) && !wrap.test(url))
  }

}
