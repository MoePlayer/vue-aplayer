import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Inject } from 'vue-property-decorator';
import Cover from './Cover';
import Icon from './Icon';
import Main from './Main';
import Controller from './Controller';
import Button from './Button';

@Component
export default class Player extends Vue {
  @Prop() notice!: any;
  @Inject() aplayer!: { media: Media };

  private get playIcon(): string {
    return this.aplayer.media.paused ? 'play' : 'pause';
  }

  private get noticeOpacity(): number {
    return this.notice.text ? this.notice.opacity : 0;
  }

  @Provide()
  private handleTogglePlay() {
    this.$emit('togglePlay');
  }

  @Provide()
  private handleSkipBack() {
    this.$emit('skipBack');
  }

  @Provide()
  private handleSkipForward() {
    this.$emit('skipForward');
  }

  @Provide()
  private handleToggleOrderMode() {
    this.$emit('toggleOrderMode');
  }

  @Provide()
  private handleToggleLoopMode() {
    this.$emit('toggleLoopMode');
  }

  @Provide()
  private handleTogglePlaylist() {
    this.$emit('togglePlaylist');
  }

  @Provide()
  private handleToggleLyric() {
    this.$emit('toggleLyric');
  }

  @Provide()
  private handleChangeVolume(volume: number) {
    this.$emit('changeVolume', volume);
  }

  @Provide()
  private handleChangeProgress(
    e: MouseEvent | PointerEventInput,
    percent: number,
  ) {
    this.$emit('changeProgress', e, percent);
  }

  private handleMiniSwitcher() {
    this.$emit('miniSwitcher');
  }

  render() {
    const { playIcon, noticeOpacity, notice } = this;

    return (
      <div class="aplayer-body">
        <Cover>
          <div
            class={`aplayer-button aplayer-${playIcon}`}
            onClick={this.handleTogglePlay}
          >
            <Icon type={playIcon} />
          </div>
        </Cover>
        <Main>
          <Controller
            onSkipBack={this.handleSkipBack}
            onSkipForward={this.handleSkipForward}
            onTogglePlay={this.handleTogglePlay}
            onToggleOrderMode={this.handleToggleOrderMode}
            onToggleLoopMode={this.handleToggleLoopMode}
            onTogglePlaylist={this.handleTogglePlaylist}
            onToggleLyric={this.handleToggleLyric}
            onChangeVolume={this.handleChangeVolume}
            onChangeProgress={this.handleChangeProgress}
          />
        </Main>
        <div class="aplayer-notice" style={{ opacity: noticeOpacity }}>
          {notice.text}
        </div>
        <div class="aplayer-miniswitcher" onClick={this.handleMiniSwitcher}>
          <Button type="miniswitcher" icon="right" />
        </div>
      </div>
    );
  }
}
