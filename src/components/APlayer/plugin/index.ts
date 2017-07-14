import { APlayer } from 'components/APlayer'

export default class APlayerPlugin {
  public static install (vue) {
    vue.component('APlayer', APlayer)
  }
}
