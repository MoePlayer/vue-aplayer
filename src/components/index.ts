/* eslint-disable no-console */
import 'console.img';
import { VueConstructor } from 'vue';
import APlayer from './APlayer';

interface Options {
  hls?: boolean;
  colorThief?: boolean;
  productionTip?: boolean;
}

export default async function install(
  Vue: VueConstructor,
  options: Options = {
    hls: false,
    colorThief: false,
    productionTip: true,
  },
) {
  Vue.component('APlayer', APlayer);

  if (options.hls) {
    console.log("import('hls.js')");
    // const hls = await import('hls.js').then(module => module.default);
    // console.log(hls.version);
  }

  if (options.colorThief) {
    const ColorThief = await import('utils/lib/color-thief').then(module => module.default); // prettier-ignore
    Object.assign(APlayer.prototype, { colorThief: new ColorThief() });
  }

  if (options.productionTip) {
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
