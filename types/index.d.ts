// TypeScript Version: 2.8
import _Vue from 'vue';
import * as Vue from 'vue-tsx-support';

import * as _APlayer from './aplayer';

export * from './aplayer';

// eslint-disable-next-line no-use-before-define
export as namespace APlayer;

export class APlayer extends Vue.Component<_APlayer.Options, _APlayer.Events> {
  static readonly version: string;

  readonly $refs: {
    container: HTMLDivElement;
  };

  readonly currentMusic: _APlayer.Audio;

  readonly currentSettings: _APlayer.Settings;

  readonly media: _APlayer.Media;

  play(): Promise<void>;

  pause(): void;

  toggle(): void;

  seek(time: number): void;

  switch(audio: number | string): void;

  skipBack(): void;

  skipForward(): void;

  showLrc(): void;

  hideLrc(): void;

  toggleLrc(): void;

  showList(): void;

  hideList(): void;

  toggleList(): void;

  showNotice(text: string, time?: number, opacity?: number): void;
}

export default function install(
  Vue: typeof _Vue,
  options?: _APlayer.InstallOptions
): void;
