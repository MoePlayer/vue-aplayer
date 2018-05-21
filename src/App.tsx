import Vue from 'vue';
import Comopnent from 'vue-class-component';

@Comopnent
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <h1 style={{ textAlign: 'center' }}>
          Welcome to Your Vue.js + TypeScript App
        </h1>
      </div>
    );
  }
}
