/* eslint-disable no-nested-ternary */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import classNames from 'classnames';
import VueAudio from '@moefe/vue-audio';
import { ReadyState } from 'utils/enum';
import Player from './Player';
import PlayList from './PlayList';
import Lyric from './Lyric';
import '../assets/style/aplayer.scss';

@Component
export default class APlayer extends Vue {
  // #region [只读] 播放器选项
  @Prop({ type: Boolean, required: false, default: false })
  private readonly fixed!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  private readonly mini!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  private readonly autoplay!: boolean;

  @Prop({ type: String, required: false, default: '#b7daff' })
  private readonly theme!: string;

  @Prop({ type: String, required: false, default: 'all' })
  private readonly loop!: APlayer.LoopMode;

  @Prop({ type: String, required: false, default: 'list' })
  private readonly order!: APlayer.OrderMode;

  @Prop({ type: String, required: false, default: 'auto' })
  private readonly preload!: APlayer.Preload;

  @Prop({ type: Number, required: false, default: 0.7 })
  private readonly volume!: number;

  @Prop({ type: [Object, Array], required: true })
  private readonly audio!: APlayer.Audio | Array<APlayer.Audio>;

  @Prop({ type: Object, required: false })
  private readonly customAudioType?: any;

  @Prop({ type: Boolean, required: false, default: true })
  private readonly mutex!: boolean;

  @Prop({ type: Number, required: false, default: 0 })
  private readonly lrcType!: APlayer.LrcType;

  @Prop({ type: Boolean, required: false, default: false })
  private readonly listFolded!: boolean;

  @Prop({ type: String, required: false, default: '250px' })
  private readonly listMaxHeight!: string;

  @Prop({ type: String, required: false, default: 'aplayer-setting' })
  private readonly storageName!: string;
  // #endregion

  // 提供当前实例的引用，让子组件获取该实例的可响应数据
  @Provide()
  private get aplayer() {
    return this;
  }

  // 播放列表数据源，自动生成 ID 作为播放列表项的 key
  private get dataSource() {
    return (Array.isArray(this.audio) ? this.audio : [this.audio]).map(
      (item, index) => ({
        id: index + 1,
        ...item,
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private get isMobile(): boolean {
    return /mobile/i.test(window.navigator.userAgent);
  }

  // 是否正在缓冲
  private get isLoading(): boolean {
    return Boolean(
      this.currentMusic.id &&
        this.media.readyState < ReadyState.HAVE_FUTURE_DATA,
    );
  }

  private colorThief: any; // 颜色小偷，来自插件注入
  private isDraggingProgressBar = false; // 是否正在拖动进度条
  private isMini = this.fixed || this.mini; // 是否是迷你模式
  private listVisible = !this.listFolded; // 播放列表是否可见
  private get listScrollTop(): number {
    return this.currentIndex * 33;
  }
  private lyricVisible = true; // 控制迷你模式下的歌词是否可见
  private media = new VueAudio(); // 响应式媒体对象
  private player = this.media.audio; // 核心音频对象

  // 当前播放的音乐
  private currentMusic: APlayer.Audio = this.dataSource[0] || {
    id: NaN,
    name: '未加载音频',
    artist: '(ಗ ‸ ಗ )',
  };

  // 当前播放的音乐索引
  private get currentIndex(): number {
    return this.dataSource.findIndex(
      item => item.id === this.currentMusic.id,
    );
  }

  // 当前已缓冲比例
  private get currentLoaded(): number {
    if (this.media.readyState < ReadyState.HAVE_FUTURE_DATA) return 0;
    return (
      this.media.buffered.end(this.media.buffered.length - 1) /
      this.media.duration
    );
  }

  private currentPlayed = 0; // 当前已播放比例
  private currentVolume = this.volume; // 当前音量
  private currentLoop = this.loop; // 当前循环模式
  private currentOrder = this.order; // 当前顺序模式
  private currentTheme = this.currentMusic.theme || this.theme; // 当前主题，通过封面自适应主题 > 当前播放的音乐指定的主题 > 主题选项
  private notice = { text: '', time: 2000, opacity: 0.8 }; // 通知信息

  // #region 监听属性
  @Watch('dataSource', { deep: true })
  private handleChangeDataSource() {
    if (
      this.currentMusic.id !== undefined &&
      Number.isNaN(this.currentMusic.id) &&
      this.dataSource.length > 0
    ) {
      [this.currentMusic] = this.dataSource;
    } else {
      this.currentMusic = this.dataSource[this.currentIndex];
    }
  }

  @Watch('currentMusic', { immediate: true })
  private async handleChangeCurrentMusic(
    newMusic: APlayer.Audio,
    oldMusic?: APlayer.Audio,
  ) {
    if (newMusic.cover) {
      this.currentTheme = await this.getThemeColorFromCover(newMusic.cover);
    }
    if (newMusic.url) {
      this.currentPlayed = 0;
      if ((oldMusic !== undefined && oldMusic.url) !== newMusic.url) {
        this.player.src = newMusic.url;
        this.player.preload = this.preload;
        this.player.autoplay = this.autoplay;
        await this.media.loaded();
        this.player.play(); // TODO: 如果是首次加载需要判断是否自动播放
      }
    }
  }

  @Watch('currentVolume')
  private handleChangeCurrentVolume() {
    this.player.volume = this.currentVolume;
  }

  @Watch('media.currentTime')
  private handleChangeCurrentTime() {
    if (!this.isDraggingProgressBar) {
      this.currentPlayed = this.media.currentTime / this.media.duration;
    }
  }

  @Watch('media.ended')
  private handleChangeEnded() {
    switch (this.loop) {
      default:
      case 'all':
        break;
      case 'one':
        break;
      case 'none':
        break;
    }
  }

  @Watch('mini')
  private handleChangeMini() {
    this.isMini = this.mini;
  }
  // #endregion

  // #region 公开 API

  // eslint-disable-next-line class-methods-use-this
  public play() {
    // TODO: play audio
  }

  // eslint-disable-next-line class-methods-use-this
  public pause() {
    // TODO: pause audio
  }

  // eslint-disable-next-line class-methods-use-this
  public seek() {
    // TODO: seek to specified time, the unit of time is second
  }

  // eslint-disable-next-line class-methods-use-this
  public toggle() {
    // TODO: toggle between play and pause
  }

  // eslint-disable-next-line class-methods-use-this
  public skipBack() {
    // TODO: skip to previous audio
  }

  // eslint-disable-next-line class-methods-use-this
  public skipForward() {
    // TODO: skip to next audio
  }

  // eslint-disable-next-line class-methods-use-this
  public showLrc() {
    // TODO: show lrc
  }

  // eslint-disable-next-line class-methods-use-this
  public hideLrc() {
    // TODO: hide lrc
  }

  // eslint-disable-next-line class-methods-use-this
  public toggleLrc() {
    // TODO: toggle lrc between show and hide
  }

  // eslint-disable-next-line class-methods-use-this
  public showList() {
    // TODO: show list
  }

  // eslint-disable-next-line class-methods-use-this
  public hideList() {
    // TODO: hide list
  }

  // eslint-disable-next-line class-methods-use-this
  public toggleList() {
    // TODO: toggle list between show and hide
  }

  public showNotice(
    text: string,
    time: number = 2000,
    opacity: number = 0.8,
  ): Promise<void> {
    return new Promise((resolve) => {
      this.notice = { text, time, opacity };
      setTimeout(() => {
        this.notice.text = '';
        resolve();
      }, time);
    });
  }

  // #endregion

  // #region 私有 API

  // 从封面中获取主题颜色
  private async getThemeColorFromCover(
    url: string,
    cache: boolean = true,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.colorThief) {
        resolve(this.currentMusic.theme || this.theme);
        return;
      }
      const img = new Image();
      img.src = cache ? url : `${url}?_=${new Date().getTime()}`;
      img.crossOrigin = '';
      img.onload = () => {
        const [r, g, b] = this.colorThief.getColor(img);
        const theme = `rgb(${r}, ${g}, ${b})`;
        resolve(theme || this.currentMusic.theme || this.theme);
      };
      img.onerror = reject;
    });
  }

  private getPlayIndexByMode(type: 'skipBack' | 'skipForward'): number {
    const index = this.currentIndex;
    const { length } = this.dataSource;
    switch (this.loop) {
      default:
      case 'all':
      case 'one':
        return type === 'skipForward' ? index + 1 : index - 1;
      case 'none':
        break;
    }
    return -1;
  }

  // eslint-disable-next-line class-methods-use-this
  private amendArrayBoundaryIndex(
    arr: any[],
    index: number,
    direction: 'prev' | 'next' = 'next',
  ): number {
    return direction === 'next'
      ? index > arr.length - 1
        ? 0
        : index
      : index < 0
        ? arr.length - 1
        : index;
  }

  // #endregion

  // #region 事件处理

  // 切换上一曲
  private async handleSkipBack() {
    const index = this.currentIndex - 1;
    const currentIndex = index < 0 ? this.dataSource.length - 1 : index;
    this.currentMusic = this.dataSource[currentIndex];
    await this.media.loaded();
    this.player.play();
  }

  // 切换下一曲
  private async handleSkipForward() {
    const index = this.currentIndex + 1;
    const currentIndex = index > this.dataSource.length - 1 ? 0 : index;
    this.currentMusic = this.dataSource[currentIndex];
    await this.media.loaded();
    this.player.play();
  }

  // 切换播放
  private handleTogglePlay() {
    if (this.media.paused) this.player.play();
    else this.player.pause();
  }

  // 处理切换顺序模式
  private handleToggleOrderMode() {
    this.currentOrder = this.currentOrder === 'list' ? 'random' : 'list';
  }

  // 处理切换循环模式
  private handleToggleLoopMode() {
    this.currentLoop =
      this.currentLoop === 'all'
        ? 'one'
        : this.currentLoop === 'one'
          ? 'none'
          : 'all';
  }

  // 处理切换播放/暂停事件
  private handleTogglePlaylist() {
    this.listVisible = !this.listVisible;
  }

  // 处理切换歌词显隐事件
  private handleToggleLyric() {
    this.lyricVisible = !this.lyricVisible;
  }

  // 处理声音改变事件
  private handleChangeVolume(volume: number) {
    this.currentVolume = volume;
  }

  // 处理进度条改变事件
  private async handleChangeProgress(
    e: MouseEvent | PointerEventInput,
    percent: number,
  ) {
    this.currentPlayed = percent;
    this.isDraggingProgressBar = e.type === 'panmove';
    if (e.type === 'click' || e.type === 'panend') {
      await this.media.loaded();
      this.player.currentTime = percent * this.media.duration;
      this.player.play();
    }
  }

  // 处理切换迷你模式事件
  private handleMiniSwitcher() {
    this.isMini = !this.isMini;
  }

  // 处理播放曲目改变事件
  private handleChangePlaylist(music: APlayer.Audio) {
    this.currentMusic = music;
  }
  // #endregion

  render() {
    const {
      dataSource,
      fixed,
      lrcType,
      isMini,
      isMobile,
      isLoading,
      notice,
      listVisible,
      listScrollTop,
      currentMusic,
      lyricVisible,
    } = this;

    return (
      <div
        class={classNames({
          aplayer: true,
          'aplayer-withlist': dataSource.length > 0,
          'aplayer-withlrc': !fixed && lrcType !== 0,
          'aplayer-narrow': isMini,
          'aplayer-fixed': fixed,
          'aplayer-mobile': isMobile,
          'aplayer-arrow': fixed,
          'aplayer-loading': isLoading,
        })}
      >
        <Player
          notice={notice}
          onSkipBack={this.handleSkipBack}
          onSkipForward={this.handleSkipForward}
          onTogglePlay={this.handleTogglePlay}
          onToggleOrderMode={this.handleToggleOrderMode}
          onToggleLoopMode={this.handleToggleLoopMode}
          onTogglePlaylist={this.handleTogglePlaylist}
          onToggleLyric={this.handleToggleLyric}
          onChangeVolume={this.handleChangeVolume}
          onChangeProgress={this.handleChangeProgress}
          onMiniSwitcher={this.handleMiniSwitcher}
        />
        <PlayList
          visible={listVisible}
          scrollTop={listScrollTop}
          currentMusic={currentMusic}
          dataSource={dataSource}
          onChange={this.handleChangePlaylist}
        />
        {fixed ? <Lyric visible={lyricVisible} /> : null}
      </div>
    );
  }
}
