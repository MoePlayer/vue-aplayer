/* eslint-disable no-console */
import 'console.img';
import { VueConstructor } from 'vue';
import APlayer, { Options } from './components/APlayer';

export default async function install(Vue: VueConstructor, options: Options) {
  const defaultOptions: Options = {
    hls: false,
    colorThief: false,
    productionTip: true,
    defaultCover: 'https://avatars2.githubusercontent.com/u/20062482?s=270',
  };
  const opts = { ...defaultOptions, ...options };
  Object.assign(APlayer.prototype, { options: opts });

  Vue.component('APlayer', APlayer);

  if (opts.productionTip) {
    const avatar = 'https://avatars2.githubusercontent.com/u/20062482?s=270';
    setTimeout(async () => {
      await console.img(avatar, 80, 80);
      console.log('%c@u3u', 'font-weight: bold;');
      console.log('享受血賺的時刻 管它三年哪裡過');
      console.log('🚀 Based on APlayer: https://aplayer.js.org');
      console.log('💗 Follow me on Github: https://github.com/u3u');
      console.log('🎉 Powered by: https://github.com/u3u/console.img');
    }, 233);
  }
}
