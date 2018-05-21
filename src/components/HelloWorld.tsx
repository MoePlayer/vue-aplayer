import Vue from 'vue';
import Comopnent from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import './HelloWorld.scss';

@Comopnent
export default class HelloWorld extends Vue {
  @Prop({ type: String, required: true, default: '' })
  private msg!: string;

  render() {
    return (
      <div class="hello">
        <h1>{this.msg}</h1>
        <p>
          {/* eslint-disable-next-line max-len */}
          For guide and recipes on how to configure / customize this project,<br />
          check out the&nbsp;
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/docs"
            target="_blank"
          >
            vue-cli documentation
          </a>.
        </p>
        <h3>Installed CLI Plugins</h3>
        <ul>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
              target="_blank"
            >
              babel
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
              target="_blank"
            >
              typescript
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
              target="_blank"
            >
              eslint
            </a>
          </li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
          <li>
            <a href="https://vuejs.org" target="_blank">
              Core Docs
            </a>
          </li>
          <li>
            <a href="https://forum.vuejs.org" target="_blank">
              Forum
            </a>
          </li>
          <li>
            <a href="https://chat.vuejs.org" target="_blank">
              Community Chat
            </a>
          </li>
          <li>
            <a href="https://twitter.com/vuejs" target="_blank">
              Twitter
            </a>
          </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
          <li>
            <a
              href="https://router.vuejs.org/en/essentials/getting-started.html"
              target="_blank"
            >
              vue-router
            </a>
          </li>
          <li>
            <a href="https://vuex.vuejs.org/en/intro.html" target="_blank">
              vuex
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-devtools#vue-devtools"
              target="_blank"
            >
              vue-devtools
            </a>
          </li>
          <li>
            <a href="https://vue-loader.vuejs.org" target="_blank">
              vue-loader
            </a>
          </li>
          <li>
            <a href="https://github.com/vuejs/awesome-vue" target="_blank">
              awesome-vue
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
