import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Store from 'store';

@Component
export default class VueStorage extends Vue {
  private subId?: number = NaN;
  public key: string = 'aplayer-setting';
  public readonly storage: any = Store.get(this.key) || {};

  private observe() {
    const store: any = Store;
    if (this.subId) store.unobserve(this.subId);
    this.subId = store.observe(this.key, () => {
      const storage = Store.get(this.key);
      if (storage) {
        Object.keys(storage).forEach(key =>
          this.$set(this.storage, key, storage[key]),
        );
      }
    });
  }

  @Watch('key')
  private handleChange() {
    this.observe();
  }

  created() {
    this.observe();
  }

  render() {
    return null;
  }
}
