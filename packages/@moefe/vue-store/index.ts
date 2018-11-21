import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class VueStore extends Vue {
  public key: string = 'aplayer-setting';

  public store: any[] = this.get(this.key);

  // eslint-disable-next-line class-methods-use-this
  public get(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  public set(val: any[]) {
    this.store = val;
    localStorage.setItem(this.key, JSON.stringify(val));
  }

  render() {
    return null;
  }
}
