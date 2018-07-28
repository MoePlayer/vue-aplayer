declare namespace APlayer {
  export type LoopMode = 'all' | 'one' | 'none';
  export type OrderMode = 'list' | 'random';
  export type Preload = 'none' | 'metadata' | 'auto';
  export type AudioType = 'auto' | 'hls' | 'normal';

  export enum LrcType {
    file = 3,
    html = 2, // not support
    string = 1,
    disabled = 0,
  }

  export interface Audio {
    id?: number;
    name: string; // eslint-disable-line no-restricted-globals
    artist: string;
    url: string;
    cover: string;
    lrc?: string;
    theme?: string;
    type?: AudioType;
    speed?: number;
  }

  export interface Options {
    fixed?: boolean;
    mini?: boolean;
    autoplay?: boolean;
    theme?: string;
    loop?: LoopMode;
    order?: OrderMode;
    preload?: Preload;
    volume?: number;
    audio: Audio | Audio[];
    customAudioType?: any;
    mutex?: boolean;
    lrcType?: number;
    listFolded?: boolean;
    listMaxHeight?: number;
    storageName?: string;
  }

  export interface Settings {
    currentTime: number;
    duration: number;
    paused: boolean;
    mini: boolean;
    lrc: boolean;
    volume: number;
    loop: LoopMode;
    order: OrderMode;
    music: Audio | null;
  }
}
