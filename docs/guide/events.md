---
pageClass: guide
---

# 事件绑定

::: tip 提示
跟组件和 prop 不同，事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。
并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以在 DOM 模板中请始终使用全小写监听事件。
:::

## 原生 Media 事件

| 事件名称           | 描述                                                       |
| :----------------- | :--------------------------------------------------------- |
| onAbort            | 在退出时触发                                               |
| onCanplay          | 当文件就绪可以开始播放时触发（缓冲已足够开始时）           |
| onCanplaythrough   | 当媒介能够无需因缓冲而停止即可播放至结尾时触发             |
| onDurationchange   | 当媒介长度改变时触发                                       |
| onEmptied          | 当发生故障并且文件突然不可用时触发（比如连接意外断开时）   |
| onEnded            | 当媒介已到达结尾时触发（可发送类似“感谢观看”之类的消息）   |
| onError            | 当在文件加载期间发生错误时触发                             |
| onLoadeddata       | 当媒介数据已加载时触发                                     |
| onLoadedmetadata   | 当元数据（比如分辨率和时长）被加载时触发                   |
| onLoadstart        | 在文件开始加载且未实际加载任何数据前触发                   |
| onPause            | 当媒介被用户或程序暂停时触发                               |
| onPlay             | 当媒介已就绪可以开始播放时触发                             |
| onPlaying          | 当媒介已开始播放时触发                                     |
| onProgress         | 当浏览器正在获取媒介数据时触发                             |
| onRatechange       | 每当回放速率改变时触发（比如当用户切换到慢动作或快进模式） |
| onReadystatechange | 每当就绪状态改变时触发（就绪状态监测媒介数据的状态）       |
| onSeeked           | 当 seeking 属性设置为 false（指示定位已结束）时触发        |
| onSeeking          | 当 seeking 属性设置为 true（指示定位是活动的）时触发       |
| onStalled          | 在浏览器不论何种原因未能取回媒介数据时触发                 |
| onSuspend          | 在媒介数据完全加载之前不论何种原因终止取回媒介数据时触发   |
| onTimeupdate       | 当播放位置改变时触发                                       |
| onVolumechange     | 每当音量改变时（包括将音量设置为静音）时触发               |
| onWaiting          | 当媒介已停止播放但打算继续播放时触发                       |

📝 example.vue

```vue
<template>
  <aplayer
    :audio="audio"
    @abort="handleEvent"
    @canplay="handleEvent"
    @canplaythrough="handleEvent"
    @durationchange="handleEvent"
    @emptied="handleEvent"
    @ended="handleEvent"
    @error="handleEvent"
    @loadeddata="handleEvent"
    @loadedmetadata="handleEvent"
    @loadstart="handleEvent"
    @pause="handleEvent"
    @play="handleEvent"
    @playing="handleEvent"
    @progress="handleEvent"
    @ratechange="handleEvent"
    @readystatechange="handleEvent"
    @seeked="handleEvent"
    @seeking="handleEvent"
    @stalled="handleEvent"
    @suspend="handleEvent"
    @timeupdate="handleEvent"
    @volumechange="handleEvent"
    @waiting="handleEvent"
  />
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);

export default {
  data() {
    return {
      audio: {
        name: 'I Really Like You 西班牙语版（Cover Carly Rae Jepsen）',
        artist: '熊子',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/mucho.mp3',
        cover: 'http://p1.music.126.net/UhbkP71d9KTMsdNczCf2wA==/109951162986700564.jpg?param=300y300' // prettier-ignore
      },
    };
  },
  methods: {
    handleEvent(e) {
      console.log(e);
    },
  },
};
</script>
```

## 播放器事件

| 事件名称     | 描述                   |
| :----------- | :--------------------- |
| onListShow   | 播放列表显示时触发     |
| onListHide   | 播放列表隐藏时触发     |
| onListAdd    | 播放列表新增音频时触发 |
| onListRemove | 播放列表删除音频时触发 |
| onListClear  | 播放列表清空时触发     |
| onListSwitch | 切换播放的音频时触发   |
| onNoticeShow | 通知消息显示时触发     |
| onNoticeHide | 通知消息隐藏时触发     |
| onLrcShow    | 歌词面板显示时触发     |
| onLrcHide    | 歌词面板隐藏时触发     |

::: warning 注意
由于某些选项会通过用户的操作直接修改，如果你传递了它们，会导致双向绑定的值不一致。  
如果你想同步它们，可以通过监下面的事件来操作。你也可以使用
[.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6) 来同步。
:::

| 事件名称          | 描述                                                                           |
| :---------------- | :----------------------------------------------------------------------------- |
| update:volume     | 修改音量时触发，用于同步 [`volume`](options.html#volume) 选项                  |
| update:mini       | 修改迷你模式时触发，用于同步 [`mini`](options.html#mini) 选项                  |
| update:loop       | 修改循环模式时触发，用于同步 [`loop`](options.html#loop) 选项                  |
| update:order      | 修改顺序模式时触发，用于同步 [`order`](options.html#order) 选项                |
| update:listFolded | 播放列表展开/隐藏时触发，用于同步 [`listFolded`](options.html#listfolded) 选项 |

📝 example.vue

```vue
<template>
  <aplayer
    :audio="audio"
    :volume.sync="volume"
    :mini.sync="mini"
    :loop.sync="loop"
    :order.sync="order"
    :listFolded.sync="listFolded"
    @listShow="handleEvent"
    @listHide="handleEvent"
    @listAdd="handleEvent"
    @listRemove="handleEvent"
    @listClear="handleEvent"
    @listSwitch="handleEvent"
    @noticeShow="handleEvent"
    @noticeHide="handleEvent"
    @lrcShow="handleEvent"
    @lrcHide="handleEvent"
  />
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);

export default {
  data() {
    return {
      audio: {
        name: 'I Really Like You 西班牙语版（Cover Carly Rae Jepsen）',
        artist: '熊子',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/mucho.mp3',
        cover: 'http://p1.music.126.net/UhbkP71d9KTMsdNczCf2wA==/109951162986700564.jpg?param=300y300' // prettier-ignore
      },
      volume: 0.7,
      mini: false,
      loop: 'all',
      order: 'list',
      listFolded: false,
    };
  },
  methods: {
    handleEvent() {
      console.log('Meow~');
    },
  },
};
</script>
```
