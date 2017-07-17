declare namespace APlayer {
  export type PlayMode = 'random' | 'single' | 'circulation' | 'order'
  export type Preload = 'none' | 'metadata' | 'auto'
  export interface Music {
    id?: number
    /** music title */
    title: string
    /** music author */
    author: string
    /** music url */
    url: string
    /** music picture */
    pic?: string
    /** lyric */
    lrc?: string
  }
  export interface Option {
    /** player element */
    element?: string | HTMLElement
    /** narrow style */
    narrow?: boolean
    /** autoplay song(s), not supported by mobile browsers */
    autoplay?: boolean
    /** show lrc, can be 0, 1, 2 */
    showlrc?: 0 | 1 | 2
    /** pause other players when this player playing */
    mutex?: boolean
    /** theme color, default: #b7daff */
    theme?: string
    /** play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation` */
    mode?: PlayMode
    /** the way to load music, can be 'none' 'metadata' 'auto', default: 'auto' */
    preload?: Preload
    /** max height of play list */
    listmaxheight?: string
    /** music info */
    music: Music | Array<Music>
  }
}
