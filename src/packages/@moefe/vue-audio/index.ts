import Vue from 'vue';
import Component from 'vue-class-component';
import { ReadyState } from 'utils/enum';
import events from './events';

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
      this.audio.oncanplay = resolve;
      if (
        this.readyState >= ReadyState.HAVE_FUTURE_DATA ||
        this.preload === 'none'
      ) {
        resolve();
      }
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
