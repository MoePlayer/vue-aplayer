import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import Lyric from './Lyric';
import Controller from './Controller';

@Component
export default class Main extends Vue.Component<{}> {
  @Inject()
  private readonly aplayer!: { fixed: boolean; currentMusic: APlayer.Audio };

  private get music() {
    const { currentMusic } = this.aplayer;
    return {
      name: currentMusic.name,
      artist: currentMusic.artist ? ` - ${currentMusic.artist}` : '',
    };
  }

  render() {
    const { music } = this;
    const { fixed } = this.aplayer;

    return (
      <div class="aplayer-info">
        <div class="aplayer-music">
          <span class="aplayer-title">{music.name}</span>
          <span class="aplayer-author">{music.artist}</span>
        </div>
        {!fixed ? <Lyric /> : null}
        {this.$slots.default}
      </div>
    );
  }
}
