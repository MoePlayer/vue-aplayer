import { APlayer } from './APlayer'
export { APlayer }

export default function install (vue) {
  vue.component('APlayer', APlayer)
}

declare namespace window {
  export const Vue: any
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
