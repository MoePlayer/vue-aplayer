import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import Hammer, { PointerEventInput } from 'hammerjs';
import events from './events';

export interface TouchEvents {
  onClick: MouseEvent;
  onPan: PointerEventInput;
  onPanStart: PointerEventInput;
  onPanMove: PointerEventInput;
  onPanEnd: PointerEventInput;
  onPanCancel: PointerEventInput;
  onPanLeft: PointerEventInput;
  onPanRight: PointerEventInput;
  onPanUp: PointerEventInput;
  onPanDown: PointerEventInput;
}

@Component
export default class Touch extends Vue.Component<{}, TouchEvents> {
  private handleClick(e: Event) {
    this.$emit('click', e);
  }

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
        onClick={this.handleClick}
      >
        {this.$slots.default}
      </div>
    );
  }
}

export { PointerEventInput } from 'hammerjs';
