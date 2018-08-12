---
sidebar: auto
---

# API

## version <Badge type="warning" text="静态" />

- **类型**：`string`
- **描述**：只读属性，返回 APlayer 的版本号
- **用法**：

```js
import { APlayer } from '@moefe/vue-aplayer';

console.log(APlayer.version);
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
