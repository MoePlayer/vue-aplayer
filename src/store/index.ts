import Vue from 'vue'
import Vuex from 'vuex'
import { State } from './state'

import { getters } from './getters'
import { mutations } from './mutations'

declare namespace window {
  export const Vue: any
}

if (typeof window === 'undefined' || !window.Vue) {
  // [vuex] already installed. Vue.use(Vuex) should be called only once.
  // 只有在模块化环境下调用 全局环境下 Vuex 会自动安装
  Vue.use(Vuex)
}

const state: State = {
  key: 'APLAYER_VEUX_STATE',
  audio: new Audio(),
  media: {
    audioTracks: null,
    /** 设置或返回是否在就绪（加载完成）后随即播放音频。 */
    autoplay: false,
    /** 返回表示音频已缓冲部分的 TimeRanges 对象。 */
    buffered: null,
    /** 返回表示音频当前媒体控制器的 MediaController 对象。 */
    controller: null,
    /** 设置或返回音频是否应该显示控件（比如播放/暂停等）。 */
    controls: false,
    /** 设置或返回音频的 CORS 设置。 */
    crossOrigin: null,
    /** 返回当前音频的 URL。 */
    currentSrc: null,
    /** 设置或返回音频中的当前播放位置（以秒计）。 */
    currentTime: 0,
    /** 设置或返回音频默认是否静音。 */
    defaultMuted: false,
    /** 设置或返回音频的默认播放速度。 */
    defaultPlaybackRate: 1,
    /** 返回音频的长度（以秒计）。 */
    duration: 0,
    /** 返回音频的播放是否已结束。 */
    ended: false,
    /** 返回表示音频错误状态的 MediaError 对象。 */
    error: null,
    /** 设置或返回音频是否应在结束时再次播放。 */
    loop: false,
    /** 设置或返回音频所属媒介组合的名称。 */
    mediaGroup: null,
    /** 设置或返回是否关闭声音。 */
    muted: false,
    /** 返回音频的当前网络状态。 */
    networkState: null,
    /** 设置或返回音频是否暂停。 */
    paused: true,
    /** 设置或返回音频播放的速度。 */
    playbackRate: 1,
    /** 返回表示音频已播放部分的 TimeRanges 对象。 */
    played: null,
    /** 设置或返回音频的 preload 属性的值。 */
    preload: 'auto',
    /** 返回音频当前的就绪状态。 */
    readyState: null,
    /** 返回表示音频可寻址部分的 TimeRanges 对象。 */
    seekable: null,
    /** 返回用户当前是否正在音频中进行查找。 */
    seeking: false,
    /** 设置或返回音频的 src 属性的值。 */
    src: null,
    /** 返回表示可用文本轨道的 TextTrackList 对象。 */
    textTracks: null,
    /** 设置或返回音频的音量。 */
    volume: 1
  },
  music: null,
  mode: 'circulation',
  theme: '#ad7a86',
  volume: 1,
  collapsed: false
}

state.audio.volume = 0.8
state.volume = state.audio.volume

export const store = new Vuex.Store<State>({ state, getters, mutations })
export default store
