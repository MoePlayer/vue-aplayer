import Vue from 'vue';
import Comopnent from 'vue-class-component';
import './App.scss';

@Comopnent
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <div class="landing">
          <h1>Vue-Aplayer</h1>
          <h3>🍰 A beautiful HTML5 music player for Vue.js.</h3>
          <div class="aplayer-wrap" />
          <div class="landing-buttons">
            <a
              class="landing-button"
              href="https://github.com/MoePlayer/vue-aplayer"
              target="_blank"
            >
              GitHub
            </a>
            {/* eslint-disable-next-line no-script-url */}
            <a class="landing-button" href="javascript:;">
              Docs
            </a>
          </div>
        </div>
      </div>
    );
  }
}
