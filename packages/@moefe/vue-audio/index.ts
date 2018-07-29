import Vue from 'vue';
import Component from 'vue-class-component';
import events from './events';

export { events };

export enum ReadyState {
  /** 没有关于音频是否就绪的信息 */
  HAVE_NOTHING = 0,
  /** 关于音频就绪的元数据 */
  HAVE_METADATA = 1,
  /** 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒 */
  HAVE_CURRENT_DATA = 2,
  /** 当前及至少下一帧的数据是可用的 */
  HAVE_FUTURE_DATA = 3,
  /** 可用数据足以开始播放 */
  HAVE_ENOUGH_DATA = 4,
}

@Component
export default class VueAudio extends Vue implements Media {
  [index: string]: any;

  constructor() {
    super();
    events.forEach((event) => {
      this.audio.addEventListener(event, (e) => {
        this.sync();
      });
    });
  }

  private sync() {
    Object.keys(this.$data).forEach((key) => {
      if (key === 'audio') return;
      this[key] = (this.audio as any)[key];
    });
  }

  public loaded() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.readyState >= ReadyState.HAVE_FUTURE_DATA) {
          resolve();
          clearInterval(timerId);
        }
      }, 100);
    });
  }

  public srcLoaded() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.src) {
          resolve();
          clearInterval(timerId);
        }
      }, 100);
    });
  }

  public readonly audio: HTMLAudioElement = new Audio();
  public readonly audioTracks: AudioTrackList = this.audio.audioTracks;
  public readonly autoplay: boolean = this.audio.autoplay;
  public readonly buffered: TimeRanges = this.audio.buffered;
  public readonly controls: boolean = this.audio.controls;
  public readonly crossOrigin: string | null = this.audio.crossOrigin;
  public readonly currentSrc: string = this.audio.currentSrc;
  public readonly currentTime: number = this.audio.currentTime;
  public readonly defaultMuted: boolean = this.audio.defaultMuted;
  public readonly defaultPlaybackRate: number = this.audio.defaultPlaybackRate;
  public readonly duration: number = this.audio.duration;
  public readonly ended: boolean = this.audio.ended;
  public readonly error: MediaError | null = this.audio.error;
  public readonly loop: boolean = this.audio.loop;
  public readonly mediaKeys: MediaKeys | null = this.audio.mediaKeys;
  public readonly muted: boolean = this.audio.muted;
  public readonly networkState: number = this.audio.networkState;
  public readonly paused: boolean = this.audio.paused;
  public readonly playbackRate: number = this.audio.playbackRate;
  public readonly played: TimeRanges = this.audio.played;
  public readonly preload: string = this.audio.preload;
  public readonly readyState: number = this.audio.readyState;
  public readonly seekable: TimeRanges = this.audio.seekable;
  public readonly seeking: boolean = this.audio.seeking;
  public readonly src: string = this.audio.src;
  public readonly textTracks: TextTrackList = this.audio.textTracks;
  public readonly volume: number = this.audio.volume;

  render() {
    return null;
  }
}
