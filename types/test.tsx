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
          listMaxHeight="250px"
          storageName="aplayer-setting"
        />
      </div>
    );
  }
}
