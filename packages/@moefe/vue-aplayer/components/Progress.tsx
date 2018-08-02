import * as Vue from 'vue-tsx-support';
import Comopnent from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import Touch from '@moefe/vue-touch';
import Icon from './Icon';

@Comopnent
export default class Progress extends Vue.Component<{}> {
  public $refs!: {
    progressBar: HTMLElement;
  };

  @Inject()
  private readonly aplayer!: {
    currentTheme: string;
    currentLoaded: number;
    currentPlayed: number;
  };

  @Inject()
  private readonly handleChangeProgress!: (
    e: MouseEvent | TouchEvent,
    percent: number
  ) => void;

  private handleChange(e: MouseEvent | TouchEvent) {
    const target = this.$refs.progressBar;
    const targetLeft = target.getBoundingClientRect().left;
    const clientX = e.type.startsWith('mouse')
      ? (e as MouseEvent).clientX
      : (e as TouchEvent).changedTouches[0].clientX;
    const offsetLeft = clientX - targetLeft;
    let percent = offsetLeft / target.offsetWidth;
    percent = Math.min(percent, 1);
    percent = Math.max(percent, 0);
    this.handleChangeProgress(e, percent);
  }

  render() {
    const { currentTheme, currentLoaded, currentPlayed } = this.aplayer;

    return (
      <Touch
        class="aplayer-bar-wrap"
        onClick={this.handleChange}
        onPanMove={this.handleChange}
        onPanEnd={this.handleChange}
      >
        <div ref="progressBar" class="aplayer-bar">
          <div
            class="aplayer-loaded"
            style={{
              width: `${currentLoaded * 100}%`,
            }}
          />
          <div
            class="aplayer-played"
            style={{
              width: `${currentPlayed * 100}%`,
              backgroundColor: currentTheme,
            }}
          >
            <span
              class="aplayer-thumb"
              style={{
                backgroundColor: currentTheme,
              }}
            >
              <span class="aplayer-loading-icon">
                <Icon type="loading" />
              </span>
            </span>
          </div>
        </div>
      </Touch>
    );
  }
}
