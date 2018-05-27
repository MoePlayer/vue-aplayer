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
  private readonly aplayer!: { currentTheme: string; listMaxHeight: string };

  @Watch('scrollTop')
  private handleChangeScrollTop() {
    const list = this.$refs.list as HTMLDivElement;
    list.scrollTop = this.scrollTop;
  }

  render() {
    const { visible, dataSource, currentMusic } = this;
    const { currentTheme, listMaxHeight } = this.aplayer;

    return (
      <div
        class={classNames({
          'aplayer-list': true,
          'aplayer-list-hide': !visible,
        })}
        style={{ maxHeight: listMaxHeight }}
      >
        <ol ref="list" style={{ maxHeight: listMaxHeight }}>
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
      </div>
    );
  }
}
