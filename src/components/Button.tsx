import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from './Icon';

@Component
export default class Button extends Vue {
  @Prop() private readonly type!: string;
  @Prop() private readonly icon!: string;

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
