import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import Touch from '@moefe/vue-touch';
import Icon from './Icon';
import Button from './Button';
import Progress from './Progress';

export interface ControllerEvents {
  onTogglePlay: void;
  onSkipBack: void;
  onSkipForward: void;
  onToggleOrderMode: void;
  onToggleLoopMode: void;
  onTogglePlaylist: void;
  onToggleLyric: void;
  onChangeVolume: number;
  onChangeProgress: (e: MouseEvent | TouchEvent, percent: number) => void;
  onMiniSwitcher: void;
}

@Component
export default class Controller extends Vue.Component<{}, ControllerEvents> {
  public readonly $refs!: {
    volumeBar: HTMLElement;
  };

  @Inject()
  private readonly aplayer!: {
    media: APlayer.Media;
    currentTheme: string;
    currentVolume: number;
    currentPlayed: number;
    currentLoop: APlayer.LoopMode;
    currentOrder: APlayer.OrderMode;
    currentSettings: APlayer.Settings;
  };

  @Inject()
  private handleSkipBack!: () => void;

  @Inject()
  private handleSkipForward!: () => void;

  @Inject()
  private handleTogglePlay!: () => void;

  @Inject()
  private handleToggleOrderMode!: () => void;

  @Inject()
  private handleToggleLoopMode!: () => void;

  @Inject()
  private handleTogglePlaylist!: () => void;

  @Inject()
  private handleToggleLyric!: () => void;

  @Inject()
  private handleChangeVolume!: (volume: number) => void;

  private get playIcon(): string {
    return this.aplayer.media.paused ? 'play' : 'pause';
  }

  private get volumeIcon(): string {
    const { currentVolume } = this.aplayer;
    return currentVolume <= 0 ? 'off' : currentVolume >= 0.95 ? 'up' : 'down'; // eslint-disable-line no-nested-ternary
  }

  private get ptime(): string {
    const { media, currentPlayed } = this.aplayer;
    return this.timeSecondsFormat(currentPlayed * media.duration);
  }

  private get dtime(): string {
    return this.timeSecondsFormat(this.aplayer.media.duration);
  }

  // eslint-disable-next-line class-methods-use-this
  private timeSecondsFormat(time: number = 0): string {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // prettier-ignore
  }

  private handleToggleVolume() {
    const { currentVolume, currentSettings } = this.aplayer;
    this.handleChangeVolume(currentVolume > 0 ? 0 : currentSettings.volume);
  }

  private handleClickVolumeBar(e: MouseEvent) {
    this.handlePanMove(e);
  }

  private handlePanMove(e: MouseEvent | TouchEvent) {
    const target = this.$refs.volumeBar;
    const targetTop = target.getBoundingClientRect().bottom;
    if (targetTop <= 0) return; // 音量控制面板已隐藏
    const clientY = !e.type.startsWith('touch')
      ? (e as MouseEvent).clientY
      : (e as TouchEvent).changedTouches[0].clientY;
    const offsetTop = Math.round(targetTop - clientY);
    let volume = offsetTop / target.offsetHeight;
    volume = Math.min(volume, 1);
    volume = Math.max(volume, 0);
    this.handleChangeVolume(volume);
  }

  render() {
    const { ptime, dtime, volumeIcon } = this;
    const {
      media,
      currentTheme,
      currentVolume,
      currentOrder,
      currentLoop,
    } = this.aplayer;

    return (
      <div class="aplayer-controller">
        <Progress />
        <div class="aplayer-time">
          <span class="aplayer-time-inner">
            <span class="aplayer-ptime">{ptime}</span> /{' '}
            <span class="aplayer-dtime">{dtime}</span>{' '}
          </span>
          <span
            class="aplayer-icon aplayer-icon-back"
            onClick={this.handleSkipBack}
          >
            <Icon type="skip" />
          </span>
          <span
            class="aplayer-icon aplayer-icon-play"
            onClick={this.handleTogglePlay}
          >
            <Icon type={this.playIcon} />
          </span>
          <span
            class="aplayer-icon aplayer-icon-forward"
            onClick={this.handleSkipForward}
          >
            <Icon type="skip" />
          </span>
          <div class="aplayer-volume-wrap">
            <Button
              type={`volume-${volumeIcon}`}
              icon={`volume-${volumeIcon}`}
              onClick={this.handleToggleVolume}
            />
            <Touch
              class="aplayer-volume-bar-wrap"
              panMoveClass="aplayer-volume-bar-wrap-active"
              onPanMove={this.handlePanMove}
            >
              <div
                ref="volumeBar"
                class="aplayer-volume-bar"
                onClick={this.handleClickVolumeBar}
              >
                <div
                  class="aplayer-volume"
                  style={{
                    height: `${currentVolume * 100}%`,
                    backgroundColor: currentTheme,
                  }}
                />
              </div>
            </Touch>
          </div>{' '}
          <Button
            type="order"
            icon={`order-${currentOrder}`}
            onClick={this.handleToggleOrderMode}
          />{' '}
          <Button
            type="loop"
            icon={`loop-${currentLoop}`}
            onClick={this.handleToggleLoopMode}
          />{' '}
          <Button type="menu" icon="menu" onClick={this.handleTogglePlaylist} />
          <Button type="lrc" icon="lrc" onClick={this.handleToggleLyric} />
        </div>
      </div>
    );
  }
}
