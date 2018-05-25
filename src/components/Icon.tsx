import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// eslint-disable-next-line
export const icon = (type: string) => require(`assets/svg/${type}.svg`);

@Component
export default class Icon extends Vue {
  @Prop() private readonly type!: string;

  render() {
    const I = icon(this.type);
    return <I />;
  }
}
