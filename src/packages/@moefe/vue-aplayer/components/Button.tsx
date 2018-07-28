import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from './Icon';

export interface ButtonProps {
  type: string;
  icon: string;
}

export interface ButtonEvents {
  onClick?: MouseEvent;
}

@Component
export default class Button extends Vue.Component<ButtonProps, ButtonEvents> {
  @Prop({ type: String, required: true })
  private readonly type!: string;

  @Prop({ type: String, required: true })
  private readonly icon!: string;

  private handleClick() {
    this.$emit('click');
  }

  render() {
    return (
      <button
        type="button"
        class={`aplayer-icon aplayer-icon-${this.type}`}
        onClick={this.handleClick}
      >
        <Icon type={this.icon} />
      </button>
    );
  }
}
