import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class VueStore extends Vue {
  public key: string = 'aplayer-setting';
  public readonly store: any = this.get(this.key);

  // eslint-disable-next-line class-methods-use-this
  public get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  public set(key: string, val: any) {
    Object.keys(val).forEach((k) => {
      this.$set(this.store, k, val[k]);
    });
    localStorage.setItem(key, JSON.stringify(val));
  }

  render() {
    return null;
  }
}
