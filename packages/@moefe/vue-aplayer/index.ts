/* eslint-disable no-console */
import 'console.img';
import _Vue from 'vue';
import APlayer from './components/APlayer';

export { APlayer };

export default function install(
  Vue: typeof _Vue,
  options?: APlayer.InstallOptions,
) {
  const defaultOptions: APlayer.InstallOptions = {
    productionTip: true,
    defaultCover: 'https://avatars2.githubusercontent.com/u/20062482?s=270',
  };
  const opts = { ...defaultOptions, ...options };
  Object.assign(APlayer.prototype, { options: opts });

  Vue.component('aplayer', APlayer);
  Vue.component('APlayer', APlayer);

  if (opts.productionTip) {
    const avatar = 'https://avatars2.githubusercontent.com/u/20062482?s=270';
    setTimeout(async () => {
      await console.img(avatar, 80, 80);
      console.log('%c@u3u', 'font-weight: bold;');
      console.log('(<ゝω·) 可愛くなりたい');
      console.log('🚀 Based on APlayer: https://aplayer.js.org');
      console.log('💗 Follow me on Github: https://github.com/u3u');
      console.log('🎉 Powered by: https://github.com/u3u/console.img');
    }, 233);
  }
}
