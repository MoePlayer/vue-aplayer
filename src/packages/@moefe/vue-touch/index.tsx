import Vue from 'vue';
import Component from 'vue-class-component';
import Hammer from 'hammerjs';
import events from './events';

@Component
export default class Touch extends Vue {
  mounted() {
    const mc = new Hammer.Manager(this.$el);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    events.forEach(event =>
      mc.on(event.toLowerCase(), evt => this.$emit(event, evt)),
    );
  }

  render() {
    return (
      <div
        style={{
          touchAction: 'none',
          userSelect: 'none',
          webkitUserDrag: 'none',
          webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        }}
      >
        {this.$slots.default}
      </div>
    );
  }
}

export { PointerEventInput } from 'hammerjs';
