---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 原汁原味
    details: 保持完整的功能和相同的API，与最新 APlayer 保持同步更新，最小化差异。
  - title: Vue 驱动
    details: 使用 Vue 重写了所有逻辑，不是简单的封装，所有属性都是响应式的。
  - title: TypeScript 支持
    details: 提供完整的 TypeScript 类型定义支持，对于喜欢使用 JSX 的用户非常友好。
footer: MIT Licensed | Copyright © 2018-present MoePlayer
---

### 安装

```bash
yarn add @moefe/vue-aplayer # OR npm install @moefe/vue-aplayer --save
```

### 用法

```js
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png', // 设置播放器默认封面图片
  productionTip: false, // 是否在控制台输出版本信息
});
```

::: warning 兼容性说明
vue-aplayer 要求 Vue.js >= 2.2.0
:::
