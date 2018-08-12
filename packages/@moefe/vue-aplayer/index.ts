/* eslint-disable no-console */
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
    // eslint-disable-next-line no-console
    console.log(
      `%c vue-aplayer %c v${APLAYER_VERSION} ${GIT_HASH} %c`,
      'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
      'background: #41b883; padding: 1px; border-radius: 0 3px 3px 0; color: #fff',
      'background: transparent',
    );
  }
}
