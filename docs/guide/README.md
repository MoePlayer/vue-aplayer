---
sidebarDepth: 2
---

# 入门

::: warning 注意
请确保你的 Vue.js 版本 >= 2.2.0
:::

## 安装

### 使用 npm

```bash
npm install @moefe/vue-aplayer --save
```

### 使用 yarn <Badge text="推荐" />

```bash
yarn add @moefe/vue-aplayer
```

推荐使用 yarn 安装并提交 yarn.lock 锁定版本号

## 快速开始

### 传统方式

📝 index.html

```html
<html>
  <body>
    <div id="app">
      <aplayer :audio="audio" :lrc-type="3" />
    </div>
  </body>
  <!-- 你必须在引入 vue-aplayer 之前引入 vue -->
  <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@moefe/vue-aplayer"></script>
  <script>
    Vue.use(VueAPlayer, {
      defaultCover: 'https://github.com/u3u.png',
      productionTip: true,
    });

    new Vue({
      el: '#app',
      data: {
        audio: {
          name: 'ヒビカセ',
          artist: 'れをる',
          url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
          cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300',
          lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
        },
      },
    });
  </script>
</html>
```

### 单文件组件

📝 main.js

```js
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
```

📝 app.vue

```vue
<!-- prettier-ignore -->
<template>
  <div id="app">
    <aplayer :audio="audio" :lrcType="3" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: {
        name: 'ヒビカセ',
        artist: 'れをる',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
        cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300', // prettier-ignore
        lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
      },
    };
  },
};
</script>
```

::: warning 提示

这种方式是官方推荐的，也是大家熟知的使用最多、上手最快的。但是开发体验不是很友好。  
虽然官方提供了 [Vetur](https://github.com/vuejs/vetur) 扩展来强化开发体验，但依然无法做到以下几点：

1.  目前 Prettier 还不支持格式化模版部分[（正在进行中）](https://github.com/prettier/prettier/pull/4753)
2.  模版部分没有强大的智能感知功能
3.  对 TypeScript 不友好
4.  无法批量传递 `props`
5.  不能使用 HTML 内置标签名

:::

### vue-class-component <Badge text="推荐" />

如果你熟悉 React，或是 JSX 爱好者，那么我推荐你使用这种方式。  
你依然可以使用 `@Component` 装饰器以传统方式传递组件的属性，但我不推荐这么做。

#### JavaScript

::: tip 提示
`@vue/cli` 3.0 默认配置了 [JSX 预设](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)，所以你无需做任何额外的配置。  
安装 [vue-tsx-support](https://github.com/wonderful-panda/vue-tsx-support#install-and-enable)
并配置 [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)
和 [vue-jsx-hot-loader](https://github.com/skyrpex/vue-jsx-hot-loader) 获得最佳开发体验。
:::

📝 main.js

```js
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
```

📝 app.js

```jsx
import Vue from 'vue';
import Component from 'vue-class-component';
import { APlayer } from '@moefe/vue-aplayer';

@Component
export default class App extends Vue {
  audio = {
    name: 'ヒビカセ',
    artist: 'れをる',
    url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
    cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300', // prettier-ignore
    lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
  };

  render() {
    return (
      <div id="app">
        <APlayer audio={this.audio} lrcType={3} />
      </div>
    );
  }
}
```

#### TypeScript <Badge text="推荐" />

::: danger 注意
TypeScript 用户必须安装 [vue-tsx-support](https://github.com/wonderful-panda/vue-tsx-support#install-and-enable)
并配置 [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)  
同样，你也可以配置 [vue-jsx-hot-loader](https://github.com/skyrpex/vue-jsx-hot-loader) 获得最佳开发体验。
:::

📝 main.ts

```ts
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use<APlayer.InstallOptions>(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
```

📝 app.tsx

```tsx
import Vue from 'vue';
import Comopnent from 'vue-class-component';
import { APlayer } from '@moefe/vue-aplayer';

@Comopnent
export default class App extends Vue {
  private audio: APlayer.Audio | APlayer.Audio[] = {
    name: 'ヒビカセ',
    artist: 'れをる',
    url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
    cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300', // prettier-ignore
    lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
  };

  render() {
    return (
      <div id="app">
        <APlayer audio={this.audio} lrcType={3} />
      </div>
    );
  }
}
```
