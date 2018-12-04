import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Mixin extends Vue {
  private get isMobile(): boolean {
    const ua = this.$ssrContext
      ? this.$ssrContext.userAgent
      : window.navigator.userAgent;
    return /mobile/i.test(ua);
  }
}
