# 安装

### 直接下载 / CDN 引用
[https://unpkg.com/vue-aplayer-plugin](https://unpkg.com/vue-aplayer-plugin@1.0.0)  
[Unpkg.com](https://unpkg.com) 提供了基于 NPM 的 CDN 链接，以上的链接会一直指向 NPM 上发布的最新版本。

您也可以通过 https://unpkg.com/vue-aplayer-plugin@1.0.0 这样的方式指定特定的版本。  
您还可以使用饿了么提供的 CDN：https://npm.elemecdn.com/vue-aplayer-plugin@1.0.0/dist/APlayer.min.js

在 Vue 之后引入 vue-aplayer-plugin 会进行自动安装：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/APlayer.min.js"></script>
<link rel="stylesheet" href="/path/to/APlayer.min.css"></link>
```

### NPM
```bash
npm i -S vue-aplayer-plugin
```

### Yarn
```bash
yarn add vue-aplayer-plugin
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 vue-aplayer-plugin

```js
import Vue from 'vue'
import APlayer from 'vue-aplayer-plugin'
import 'vue-aplayer-plugin/dist/APlayer.min.css'

Vue.use(APlayer)
```

当使用全局 script 标签引用时，不需要以上安装过程。
