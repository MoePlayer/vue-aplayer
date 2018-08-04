import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export interface TouchProps {
  panMoveClass?: string;
}

export interface TouchEvents {
  onPanStart: MouseEvent | TouchEvent;
  onPanMove: MouseEvent | TouchEvent;
  onPanEnd: MouseEvent | TouchEvent;
}

@Component
export default class Touch extends Vue.Component<TouchProps, TouchEvents> {
  @Prop({ type: String, required: false })
  private readonly panMoveClass!: string;

  private isDragMove: boolean = false;

  private get classNames() {
    const { panMoveClass, isDragMove } = this;
    return { [panMoveClass]: isDragMove };
  }

  // eslint-disable-next-line class-methods-use-this
  private get isMobile(): boolean {
    return /mobile/i.test(window.navigator.userAgent);
  }

  private get dragStart(): 'touchstart' | 'mousedown' {
    return this.isMobile ? 'touchstart' : 'mousedown';
  }

  private get dragMove(): 'touchmove' | 'mousemove' {
    return this.isMobile ? 'touchmove' : 'mousemove';
  }

  private get dragEnd(): 'touchend' | 'mouseup' {
    return this.isMobile ? 'touchend' : 'mouseup';
  }

  private thumbMove(e: MouseEvent | TouchEvent) {
    this.isDragMove = true;
    this.$emit('panMove', e);
  }

  private thumbUp(e: MouseEvent | TouchEvent) {
    document.removeEventListener(this.dragMove, this.thumbMove);
    document.removeEventListener(this.dragEnd, this.thumbUp);
    this.isDragMove = false;
    this.$emit('panEnd', e);
  }

  mounted() {
    this.$el.addEventListener(this.dragStart, (e: MouseEvent | TouchEvent) => {
      this.$emit('panStart', e);
      document.addEventListener(this.dragMove, this.thumbMove);
      document.addEventListener(this.dragEnd, this.thumbUp);
    });
  }

  render() {
    return (
      <div
        class={this.classNames}
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
