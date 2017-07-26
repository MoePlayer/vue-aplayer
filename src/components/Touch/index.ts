import { Touch } from './src/Touch'
export { Touch }

export default function install (vue) {
  vue.component('Touch', Touch)
}

declare namespace window {
  export const Vue: any
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
