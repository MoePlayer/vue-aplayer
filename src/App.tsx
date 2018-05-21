import Vue from 'vue';
import Tsx from 'vue-tsx-support';
import Comopnent from 'vue-class-component';
import HelloWorld from 'components/HelloWorld';
import './App.scss';

@Comopnent
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        {/* eslint-disable-next-line global-require */}
        <img src={require('assets/logo.png')} />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
      </div>
    );
  }
}
