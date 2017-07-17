import { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item } from './APlayer'
export { APlayer, vPicture, vButton, Container, Controller, Info, Lyric, ProgressBar, TimeBar, Volume, List, Item }

export default function install (vue) {
  vue.component('APlayer', APlayer)
}

declare namespace window {
  export const Vue: any
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
