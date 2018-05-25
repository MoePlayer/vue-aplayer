import Vue from 'vue';
import Comopnent from 'vue-class-component';
import APlayer from '@moefe/vue-aplayer';
import './App.scss';

Vue.use(APlayer, {
  hls: false,
  colorThief: true,
  productionTip: true,
});

const sleep = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

@Comopnent
export default class App extends Vue {
  private readonly aplayer0: APlayer.Options = {
    fixed: true,
    lrcType: 3,
    listMaxHeight: '100px',
    audio: [],
  };

  private readonly aplayer1: APlayer.Options = {
    lrcType: 3,
    audio: [],
  };

  async created() {
    const data: Array<APlayer.Audio> = await fetch('/music/data.json').then(
      res => res.json(),
    );
    await sleep(1500);
    this.aplayer1.audio = data.splice(0, 3);
    await sleep(1500);
    this.aplayer0.audio = data;
  }

  render() {
    const { aplayer0, aplayer1 } = this;

    return (
      <div id="app">
        <a-player {...{ props: aplayer0 }} />
        <div class="landing">
          <h1>Vue-Aplayer</h1>
          <h3>🍰 A beautiful HTML5 music player for Vue.js.</h3>
          <div class="aplayer-wrap">
            <a-player {...{ props: aplayer1 }} />
          </div>
          <div class="landing-buttons">
            <a
              class="landing-button"
              href="https://github.com/MoePlayer/vue-aplayer"
              target="_blank"
            >
              GitHub
            </a>
            {/* eslint-disable-next-line no-script-url */}
            <a class="landing-button" href="javascript:;">
              Docs
            </a>
          </div>
        </div>
      </div>
    );
  }
}
