/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import classNames from 'classnames';
import shuffle from 'lodash.shuffle';
import Store from 'store';
import StorePluginObserve from 'store/plugins/observe';
import VueAudio, { ReadyState, events } from '@moefe/vue-audio';
import VueStorage from '@moefe/vue-storage';
import Player, { Notice } from './Player';
import PlayList from './PlayList';
import Lyric from './Lyric';
import '../assets/style/aplayer.scss';

Store.addPlugin(StorePluginObserve);

let ColorThief;
let Hls;
const instances: APlayer[] = [];

@Component
export default class APlayer extends Vue.Component<
  APlayer.Options,
  APlayer.Events
> {
  public readonly $refs!: {
    container: HTMLDivElement;
  };

  // #region [只读] 播放器选项
  @Prop({ type: Boolean, required: false, default: false })
  private readonly fixed!: boolean;

  @Prop({ type: Boolean, required: false, default: null })
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

  @Prop({ type: Number, required: false, default: 250 })
  private readonly listMaxHeight!: number;

  @Prop({ type: String, required: false, default: 'aplayer-setting' })
  private readonly storageName!: string;
  // #endregion

  // 提供当前实例的引用，让子组件获取该实例的可响应数据
  @Provide()
  private get aplayer() {
    return this;
  }

  private get settings() {
    return this.store.storage;
  }

  private get currentSettings(): APlayer.Settings {
    return this.settings[instances.indexOf(this)];
  }

  // 当前播放模式对应的播放列表
  private get currentList() {
    return this.currentOrder === 'list' ? this.orderList : this.randomList;
  }

  // 顺序播放列表，数据源，自动生成 ID 作为播放列表项的 key
  private get orderList() {
    return (Array.isArray(this.audio) ? this.audio : [this.audio])
      .filter(x => x)
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }));
  }

  // 根据顺序播放列表生成随机播放列表
  private get randomList() {
    return shuffle(this.orderList);
  }

  // eslint-disable-next-line class-methods-use-this
  private get isMobile(): boolean {
    return /mobile/i.test(window.navigator.userAgent);
  }

  // 是否是 arrow 模式
  private get isArrow(): boolean {
    const { container } = this.$refs;
    return container && container.offsetWidth <= 300;
  }

  // 是否正在缓冲
  private get isLoading(): boolean {
    return (
      !this.media.paused && this.media.readyState < ReadyState.HAVE_FUTURE_DATA
    );
  }

  private readonly _uid!: number;
  private readonly options!: APlayer.InstallOptions;
  private colorThief: any;
  private hls: any;
  private canPlay = !this.isMobile && this.autoplay; // 当 currentMusic 改变时是否允许播放
  private isDraggingProgressBar = false; // 是否正在拖动进度条（防止抖动）
  private isAwaitChangeProgressBar = false; // 是否正在等待进度条更新（防止抖动）
  private isMini = this.mini !== null ? this.mini : this.fixed; // 是否是迷你模式
  private listVisible = this.listFolded; // 播放列表是否可见
  private get listScrollTop(): number {
    return this.currentListIndex * 33;
  }
  private lyricVisible = true; // 控制迷你模式下的歌词是否可见
  private media = new VueAudio(); // 响应式媒体对象
  private player = this.media.audio; // 核心音频对象
  private store = new VueStorage(); // 响应式 localStorage

  // 当前播放的音乐
  private currentMusic: APlayer.Audio = this.currentList[0] || {
    id: NaN,
    name: '未加载音频',
    artist: '(ಗ ‸ ಗ )',
  };

  // 当前播放的音乐索引
  private get currentIndex(): number {
    return this.currentOrder === 'list'
      ? this.currentListIndex
      : this.currentRandomIndex;
  }

  private get currentListIndex(): number {
    return this.orderList.findIndex(item => item.id === this.currentMusic.id);
  }

  private get currentRandomIndex() {
    return this.randomList.findIndex(
      item => item.id === this.currentMusic.id,
    );
  }

  // 当前已缓冲比例
  private get currentLoaded(): number {
    if (this.media.readyState < ReadyState.HAVE_FUTURE_DATA) return 0;
    const { length } = this.media.buffered;
    return length > 0
      ? this.media.buffered.end(length - 1) / this.media.duration
      : 1;
  }

  private currentPlayed = 0; // 当前已播放比例
  private currentVolume = this.volume; // 当前音量
  private currentLoop = this.loop; // 当前循环模式
  private currentOrder = this.order; // 当前顺序模式
  private currentTheme = this.currentMusic.theme || this.theme; // 当前主题，通过封面自适应主题 > 当前播放的音乐指定的主题 > 主题选项
  private notice: Notice = { text: '', time: 2000, opacity: 0 }; // 通知信息

  // #region 监听属性
  @Watch('currentList', { deep: true })
  private handleChangeDataSource(
    newList: APlayer.Audio[],
    oldList?: APlayer.Audio[],
  ) {
    const newLength = newList.length;
    const oldLength = oldList ? oldList.length : 0;
    if (newLength !== oldLength) {
      if (newLength <= 0) this.$emit('listClear');
      else if (newLength > oldLength) this.$emit('listAdd');
      else this.$emit('listRemove');
    }

    if (
      this.currentMusic.id !== undefined &&
      Number.isNaN(this.currentMusic.id)
    ) {
      [this.currentMusic] = this.currentList;
    } else {
      const music = this.currentList[this.currentIndex];
      if (music) Object.assign(this.currentMusic, music);
    }
  }

  @Watch('currentMusic', { immediate: true })
  private async handleChangeCurrentMusic(
    newMusic: APlayer.Audio,
    oldMusic?: APlayer.Audio,
  ) {
    if (newMusic.cover) {
      setTimeout(async () => {
        this.currentTheme = await this.getThemeColorFromCover(newMusic.cover);
      });
    }
    if (newMusic.url) {
      this.currentPlayed = 0;
      if ((oldMusic !== undefined && oldMusic.url) !== newMusic.url) {
        if (oldMusic) {
          // 首次初始化时不要触发事件
          this.handleChangeSettings();
          this.$emit('listSwitch', newMusic);
        }
        const src = await this.getAudioUrl(newMusic);
        if (src) this.player.src = src;
        this.player.playbackRate = newMusic.speed || 1;
        this.player.preload = this.preload;
        this.player.volume = this.currentVolume;
        this.player.currentTime = 0;
        this.player.onerror = (e: ErrorEvent) => this.showNotice(e.message);
      }
      if (this.canPlay) this.play();
      this.canPlay = true;
    }
  }

  @Watch('volume')
  private handleChangeVolume(volume: number) {
    this.currentVolume = volume;
  }

  @Watch('currentVolume')
  private handleChangeCurrentVolume() {
    this.player.volume = this.currentVolume;
    this.$emit('update:volume', this.currentVolume);
  }

  @Watch('media.currentTime')
  private handleChangeCurrentTime() {
    if (!this.isDraggingProgressBar && !this.isAwaitChangeProgressBar) {
      this.currentPlayed = this.media.currentTime / this.media.duration;
    }
  }

  @Watch('media.$data', { deep: true })
  private handleChangeSettings() {
    const settings: APlayer.Settings = {
      currentTime: this.media.currentTime,
      duration: this.media.duration,
      paused: this.media.paused,
      mini: this.isMini,
      lrc: this.lyricVisible,
      volume: this.currentVolume,
      loop: this.currentLoop,
      order: this.currentOrder,
      music: this.currentMusic,
    };

    if (settings.volume <= 0) {
      settings.volume = this.currentSettings.volume;
    }

    Store.set(this.storageName, {
      ...this.settings,
      [instances.indexOf(this)]: settings,
    });
  }

  @Watch('media.ended')
  private handleChangeEnded() {
    if (!this.media.ended) return;
    this.currentPlayed = 0;
    switch (this.currentLoop) {
      default:
      case 'all':
        this.handleSkipForward();
        break;
      case 'one':
        this.play();
        break;
      case 'none':
        if (this.currentIndex === this.currentList.length - 1) {
          [this.currentMusic] = this.currentList;
          this.pause();
          this.canPlay = false;
        } else this.handleSkipForward();
        break;
    }
  }

  @Watch('mini')
  private handleChangeMini() {
    this.isMini = this.mini;
  }

  @Watch('isMini')
  private handleChangeCurrentMini() {
    this.$emit('update:mini', this.isMini);
    this.handleChangeSettings();
  }

  @Watch('loop')
  private handleChangeLoop() {
    this.currentLoop = this.loop;
  }

  @Watch('currentLoop')
  private handleChangeCurrentLoop() {
    this.$emit('update:loop', this.currentLoop);
    this.handleChangeSettings();
  }

  @Watch('order')
  private handleChangeOrder() {
    this.currentOrder = this.order;
  }

  @Watch('currentOrder')
  private handleChangeCurrentOrder() {
    this.$emit('update:order', this.currentOrder);
    this.handleChangeSettings();
  }

  @Watch('listVisible')
  private handleChangeListVisible() {
    this.$emit(this.listVisible ? 'listShow' : 'listHide');
    this.$emit('update:listFolded', this.listVisible);
  }

  @Watch('lyricVisible')
  private handleChangeLyricVisible() {
    this.$emit(this.lyricVisible ? 'lrcShow' : 'lrcHide');
    this.handleChangeSettings();
  }
  // #endregion

  // #region 公开 API

  public async play() {
    try {
      if (this.mutex) this.pauseOtherInstances();
      await this.player.play();
    } catch (e) {
      if (!this.isMini) this.showNotice(e.message);
    }
  }

  public pause() {
    this.player.pause();
  }

  private async seeking(percent: number, paused: boolean = true) {
    try {
      this.isAwaitChangeProgressBar = true;
      if (this.preload === 'none') {
        if (!this.player.src) await this.media.srcLoaded();
        const oldPaused = this.player.paused;
        await this.play(); // preload 为 none 的情况下必须先 play
        if (paused && oldPaused) this.pause();
      }
      await this.media.loaded();
      this.player.currentTime = percent * this.media.duration;
      if (!paused) this.play();
    } catch (e) {
      this.showNotice(e.message);
    } finally {
      this.isAwaitChangeProgressBar = false;
    }
  }

  public async seek(time: number) {
    this.seeking(time / this.media.duration);
  }

  public toggle() {
    if (this.media.paused) this.play();
    else this.pause();
  }

  public skipBack() {
    const playIndex = this.getPlayIndexByMode('skipBack');
    this.currentMusic = this.currentList[playIndex];
  }

  public skipForward() {
    const playIndex = this.getPlayIndexByMode('skipForward');
    this.currentMusic = this.currentList[playIndex];
  }

  public showLrc() {
    this.lyricVisible = true;
  }

  public hideLrc() {
    this.lyricVisible = false;
  }

  public toggleLrc() {
    this.lyricVisible = !this.lyricVisible;
  }

  public showList() {
    this.listVisible = true;
  }

  public hideList() {
    this.listVisible = false;
  }

  public toggleList() {
    this.listVisible = !this.listVisible;
  }

  public showNotice(
    text: string,
    time: number = 2000,
    opacity: number = 0.8,
  ): Promise<void> {
    return new Promise((resolve) => {
      this.notice = { text, time, opacity };
      this.$emit('noticeShow');
      setTimeout(() => {
        this.notice.opacity = 0;
        this.$emit('noticeHide');
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
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (this.options.colorThief) {
          if (!this.colorThief) {
            // prettier-ignore
            ColorThief = await import(
              /* webpackChunkName: "color-thief" */
              /* webpackMode: "lazy" */
              '@moefe/color-thief').then(module => module.default);
            this.colorThief = new ColorThief();
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
        } else resolve(this.currentMusic.theme || this.theme);
      } catch (e) {
        resolve(this.currentMusic.theme || this.theme);
      }
    });
  }

  private getAudioUrl(music: APlayer.Audio): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      let { type } = music;
      if (type && this.customAudioType && this.customAudioType[type]) {
        if (typeof this.customAudioType[type] === 'function') {
          this.customAudioType[type](this.player, music, this);
        } else {
          // eslint-disable-next-line no-console
          console.error(`Illegal customType: ${type}`);
        }
        resolve();
      } else {
        if (!type || type === 'auto') {
          type = /m3u8(#|\?|$)/i.test(music.url) ? 'hls' : 'normal';
        }
        if (type === 'hls' && this.options.hls) {
          try {
            if (this.hls) {
              this.hls.destroy();
              this.hls = null;
            }
            // prettier-ignore
            Hls = await import(
              /* webpackChunkName: "hls" */
              /* webpackMode: "lazy" */
              'hls.js').then(module => module.default);
            if (Hls.isSupported()) {
              this.hls = new Hls();
              this.hls.loadSource(music.url);
              this.hls.attachMedia(this.player);
              resolve();
            } else if (
              this.player.canPlayType('application/x-mpegURL') ||
              this.player.canPlayType('application/vnd.apple.mpegURL')
            ) {
              resolve(music.url);
            } else {
              reject(new Error('HLS is not supported.'));
            }
          } catch (e) {
            reject(new Error('HLS is not supported.'));
          }
        } else {
          resolve(music.url);
        }
      }
    });
  }

  private getPlayIndexByMode(type: 'skipBack' | 'skipForward'): number {
    const index = this.currentIndex;
    const isSkipBack = type === 'skipBack';
    const playIndex = isSkipBack ? index - 1 : index + 1;
    const direction = isSkipBack ? 'prev' : 'next';
    return this.amendArrayBoundaryIndex(this.currentList, playIndex, direction);
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

  private pauseOtherInstances() {
    instances
      .filter(x => x._uid !== this._uid)
      .forEach(inst => inst.pause());
  }

  // #endregion

  // #region 事件处理

  // 切换上一曲
  private async handleSkipBack() {
    this.skipBack();
  }

  // 切换下一曲
  private async handleSkipForward() {
    this.skipForward();
  }

  // 切换播放
  private handleTogglePlay() {
    this.toggle();
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
    this.toggleList();
  }

  // 处理切换歌词显隐事件
  private handleToggleLyric() {
    this.toggleLrc();
  }

  // 处理进度条改变事件
  private async handleChangeProgress(payload: {
    e: MouseEvent | PointerEventInput;
    percent: number;
  }) {
    const { e, percent } = payload;
    this.currentPlayed = percent;
    this.isDraggingProgressBar = e.type === 'panmove';
    if (e.type === 'click' || e.type === 'panend') {
      this.seeking(percent); // preload 为 none 的情况下无法获取到 duration
    }
  }

  // 处理切换迷你模式事件
  private handleMiniSwitcher() {
    this.isMini = !this.isMini;
  }

  // 处理播放曲目改变事件
  private handleChangePlaylist(music: APlayer.Audio) {
    if (music.id === this.currentMusic.id) this.handleTogglePlay();
    else this.currentMusic = music;
  }
  // #endregion

  async created() {
    instances.push(this);
    this.store.key = this.storageName;
    if (this.currentSettings) {
      const {
        mini,
        lrc,
        volume,
        loop,
        order,
        music,
        currentTime,
        duration,
        paused,
      } = this.currentSettings;
      this.isMini = mini;
      this.lyricVisible = lrc;
      this.currentVolume = volume;
      this.currentLoop = loop;
      this.currentOrder = order;
      if (music) {
        this.currentMusic = music;
        if (duration) {
          this.seeking(currentTime / duration, paused);
        }
      }
    }
    events.forEach((event) => {
      this.player.addEventListener(event, e => this.$emit(event, e));
    });
  }

  render() {
    const {
      orderList,
      fixed,
      lrcType,
      isMini,
      isMobile,
      isArrow,
      isLoading,
      notice,
      listVisible,
      listScrollTop,
      currentMusic,
      lyricVisible,
    } = this;

    return (
      <div
        ref="container"
        class={classNames({
          aplayer: true,
          'aplayer-withlist': orderList.length > 1,
          'aplayer-withlrc': !fixed && (lrcType !== 0 && lyricVisible),
          'aplayer-narrow': isMini,
          'aplayer-fixed': fixed,
          'aplayer-mobile': isMobile,
          'aplayer-arrow': isArrow,
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
          dataSource={orderList}
          onChange={this.handleChangePlaylist}
        />
        {fixed && lrcType !== 0 ? <Lyric visible={lyricVisible} /> : null}
      </div>
    );
  }
}
