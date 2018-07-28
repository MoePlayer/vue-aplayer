import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export interface IconProps {
  type: string;
}

// eslint-disable-next-line
export const icon = (type: string) => require(`../assets/svg/${type}.svg`);

@Component
export default class Icon extends Vue.Component<IconProps> {
  @Prop({ type: String, required: true })
  private readonly type!: string;

  render() {
    const I = icon(this.type);
    return <I />;
  }
}
