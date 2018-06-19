import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Inject, Watch } from 'vue-property-decorator';
import classNames from 'classnames';

@Component
export default class PlayList extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  private readonly visible?: boolean;

  @Prop({ type: Object, required: true })
  private readonly currentMusic!: APlayer.Audio;

  @Prop({ type: Array, required: true })
  private readonly dataSource!: Array<APlayer.Audio>;

  @Prop({ type: Number, required: true })
  private readonly scrollTop!: number;

  @Inject()
  private readonly aplayer!: { currentTheme: string; listMaxHeight: number };

  private get listHeight(): number {
    const { visible, dataSource } = this;
    return !visible
      ? Math.min(dataSource.length * 33, this.aplayer.listMaxHeight)
      : 0;
  }

  @Watch('scrollTop', { immediate: true })
  private async handleChangeScrollTop() {
    await this.$nextTick();
    const list = this.$refs.list as HTMLOListElement;
    list.scrollTop = this.scrollTop;
  }

  render() {
    const { listHeight, dataSource, currentMusic } = this;
    const { currentTheme } = this.aplayer;

    return (
      <ol ref="list" class="aplayer-list" style={{ height: `${listHeight}px` }}>
        {dataSource.map((item, index) => (
          <li
            key={item.id}
            class={classNames({
              'aplayer-list-light': item.id === currentMusic.id,
            })}
            onClick={() => this.$emit('change', item)}
          >
            <span
              class="aplayer-list-cur"
              style={{
                backgroundColor: currentTheme,
              }}
            />
            <span class="aplayer-list-index">{index + 1}</span>{' '}
            <span class="aplayer-list-title">{item.name}</span>
            <span class="aplayer-list-author">{item.artist}</span>
          </li>
        ))}
      </ol>
    );
  }
}
