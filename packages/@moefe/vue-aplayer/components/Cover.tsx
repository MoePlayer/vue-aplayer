import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';

export interface CoverEvents {
  onClick?: MouseEvent;
}

@Component
export default class Cover extends Vue.Component<{}, CoverEvents> {
  @Inject()
  private readonly aplayer!: APlayer.Options & {
    options: APlayer.InstallOptions;
    currentTheme: string;
    currentMusic: APlayer.Audio;
  };

  private get style() {
    const { options, currentTheme, currentMusic } = this.aplayer;
    const cover = currentMusic.cover || options.defaultCover;
    return {
      backgroundImage: cover && `url("${cover}")`,
      backgroundColor: currentTheme,
    };
  }

  private handleClick(e: MouseEvent) {
    this.$emit('click', e);
  }

  render() {
    return (
      <div class="aplayer-pic" style={this.style} onClick={this.handleClick}>
        {this.$slots.default}
      </div>
    );
  }
}
