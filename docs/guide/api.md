# API

## version <Badge type="warning" text="静态" />

- **类型**：`string`
- **描述**：只读属性，返回 APlayer 的版本号
- **用法**：

```js
import { APlayer } from '@moefe/vue-aplayer';

console.log(APlayer.version);
```

## media <Badge text="实例" />

- **类型**：`APlayer.Media`
- **描述**：只读的原生 [`Media`](https://www.w3schools.com/tags/ref_av_dom.asp) 对象
- **用法**：

```js
const { media } = this.$refs.aplayer;

console.log(media.currentTime); // 获取音频当前播放时间
console.log(media.duration); // 获取音频总时间
console.log(media.paused); // 获取音频是否暂停
```

## currentMusic <Badge text="实例" />

::: warning 警告
如果你想切换到播放列表中的其他音频请使用 [`switch`](#switch) 方法，而不要直接设置它
:::

- **类型**：`APlayer.Audio`
- **描述**：获取当前正在播放的音频
- **用法**：

```js
console.log(this.$refs.aplayer.currentMusic);
```

## play() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`Promise<void>`
- **描述**：播放音频
- **用法**：

```js
this.$refs.aplayer.play();
```

## pause() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：暂停音频
- **用法**：

```js
this.$refs.aplayer.pause();
```

## toggle() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：切换播放和暂停
- **用法**：

```js
this.$refs.aplayer.toggle();
```

## seek() <Badge text="实例" />

- **类型**：`Function`
- **参数**：
  - `time`
    - **类型**：`number`
    - **描述**：时间（秒）
- **返回值**：`void`
- **描述**：跳到特定时间
- **用法**：

```js
this.$refs.aplayer.seek(100);
```

## switch() <Badge text="实例" />

- **类型**：`Function`
- **参数**：
  - `audio`
    - **类型**：`number` | `string`
    - **描述**：音频索引或音频的部分名称
- **返回值**：`void`
- **描述**：切换到播放列表中的其他音频
- **用法**：

```js
this.$refs.aplayer.switch(1); // 切换到播放列表中的第二首歌
this.$refs.aplayer.switch('东西'); // 切换到播放列表中歌曲名包含“东西”的第一首歌
```

## skipBack() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：切换到上一首音频
- **用法**：

```js
this.$refs.aplayer.skipBack();
```

## skipForward() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：切换到下一首音频
- **用法**：

```js
this.$refs.aplayer.skipForward();
```

## showNotice() <Badge text="实例" />

- **类型**：`Function`
- **参数**：
  - `text`
    - **类型**：`string`
    - **描述**：通知文本
  - `time`
    - **类型**：`number?`
    - **默认值**：2000
    - **描述**：显示时间（毫秒）
  - `opacity`
    - **类型**：`number?`
    - **默认值**：0.8
    - **描述**：通知透明度 (0 ~ 1)
- **返回值**：`Promise<void>`
- **描述**：显示通知，设置时间为 0 可以取消通知自动隐藏
- **用法**：

```js
this.$refs.aplayer.showNotice('喵喵喵');
```

## showLrc() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：显示歌词
- **用法**：

```js
this.$refs.aplayer.showLrc();
```

## hideLrc() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：隐藏歌词
- **用法**：

```js
this.$refs.aplayer.hideLrc();
```

## toggleLrc() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：显示/隐藏歌词
- **用法**：

```js
this.$refs.aplayer.toggleLrc();
```

## showList() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：显示播放列表
- **用法**：

```js
this.$refs.aplayer.showList();
```

## hideList() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：隐藏播放列表
- **用法**：

```js
this.$refs.aplayer.hideList();
```

## toggleList() <Badge text="实例" />

- **类型**：`Function`
- **返回值**：`void`
- **描述**：显示/隐藏播放列表
- **用法**：

```js
this.$refs.aplayer.toggleList();
```
