# FAQ

## 为什么播放器不能在手机上自动播放？

因为大多数移动端浏览器禁止了音频自动播放。

## 为什么在 Safari 中无法切换歌曲？

出现这个问题是因为 Vue.js 2.5+ 重写了 `nextTick`，
Vue.js 优先检测是否支持原生 `setImmediate`，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 `MessageChannel`，如果也不支持的话就会降级为 `setTimeout 0`。

解决方案是在引入 Vue.js 之前将 `setImmediate` 和 `MessageChannel` 设置为 `undefined`

参考资料：<https://juejin.im/post/5a1af88f5188254a701ec230>
