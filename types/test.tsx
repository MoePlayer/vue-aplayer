import Vue from 'vue';
import Comopnent from 'vue-class-component';
import APlayer from './'; // eslint-disable-line

@Comopnent
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <APlayer
          mutex
          fixed
          mini
          autoplay
          theme="#b7daff"
          loop="all"
          order="random"
          preload="metadata"
          volume={0.75}
          audio={{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
            theme: '#ebd0c2',
          }}
          lrcType={2}
          listFolded={false}
          listMaxHeight={250}
          storageName="aplayer-setting"
          onAbort={() => {}}
          onCanplay={() => {}}
          onCanplaythrough={() => {}}
          onDurationchange={() => {}}
          onEmptied={() => {}}
          onEnded={() => {}}
          onError={() => {}}
          onLoadeddata={() => {}}
          onLoadedmetadata={() => {}}
          onLoadstart={() => {}}
          onPause={() => {}}
          onPlay={() => {}}
          onPlaying={() => {}}
          onProgress={() => {}}
          onRatechange={() => {}}
          onReadystatechange={() => {}}
          onSeeked={() => {}}
          onSeeking={() => {}}
          onStalled={() => {}}
          onSuspend={() => {}}
          onTimeupdate={() => {}}
          onVolumechange={() => {}}
          onWaiting={() => {}}
          onListSwitch={() => {}}
          onListShow={() => {}}
          onListHide={() => {}}
          onNoticeShow={() => {}}
          onNoticeHide={() => {}}
          onLrcShow={() => {}}
          onLrcHide={() => {}}
        />
      </div>
    );
  }
}
