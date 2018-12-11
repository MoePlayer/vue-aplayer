import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export interface IconProps {
  type: string;
}

export const icon = (type: string) =>
  require(`../assets/svg/${type}.svg`).default; // eslint-disable-line

@Component
export default class Icon extends Vue.Component<IconProps> {
  @Prop({ type: String, required: true })
  private readonly type!: string;

  render() {
    const I = icon(this.type);
    return <I />;
  }
}
