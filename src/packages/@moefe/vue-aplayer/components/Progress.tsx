import Vue from 'vue';
import Comopnent from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import Touch, { PointerEventInput } from '@moefe/vue-touch';
import Icon from './Icon';

@Comopnent
export default class Progress extends Vue {
  @Inject()
  private readonly aplayer!: {
    currentTheme: string;
    currentLoaded: number;
    currentPlayed: number;
  };

  @Inject()
  private readonly handleChangeProgress!: (
    e: MouseEvent | PointerEventInput,
    percent: number
  ) => void;

  private handleChange(e: MouseEvent | PointerEventInput) {
    const target = this.$refs.progressBar as HTMLElement;
    const targetLeft = target.getBoundingClientRect().left;
    const clientX = e.type.startsWith('pan')
      ? (e as PointerEventInput).center.x
      : (e as MouseEvent).clientX;
    const offsetLeft = clientX - targetLeft;
    let percent = offsetLeft / target.offsetWidth;
    if (percent > 1) percent = 1;
    else if (percent < 0) percent = 0;
    this.handleChangeProgress(e, percent);
  }

  render() {
    const { currentTheme, currentLoaded, currentPlayed } = this.aplayer;

    return (
      <Touch
        class="aplayer-bar-wrap"
        nativeOnClick={this.handleChange}
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
