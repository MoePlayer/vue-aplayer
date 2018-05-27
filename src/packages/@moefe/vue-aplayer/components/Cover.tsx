import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';

@Component
export default class Cover extends Vue {
  @Inject()
  private readonly aplayer!: {
    currentTheme: string;
    currentMusic: APlayer.Audio;
  };

  private readonly defaultCover = 'https://avatars2.githubusercontent.com/u/20062482?s=270';

  private get style() {
    const { defaultCover } = this;
    const { currentTheme, currentMusic } = this.aplayer;
    return {
      backgroundImage: `url("${currentMusic.cover || defaultCover}")`,
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
