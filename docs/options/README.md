---
sidebar: auto
---

# 选项

::: tip 提示
HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。  
这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名。如果你使用字符串模板，那么这个限制就不存在了。
:::

## fixed <Badge text="可选" />

- **类型**：`boolean?`
- **默认值**：`false`
- **描述**：是否开启吸底模式

## mini <Badge text="可选" />

::: tip 提示
如果开启吸底模式，该选项可以控制播放器展开或收起
:::

- **类型**：`boolean?`
- **默认值**：`false`
- **描述**：是否开启迷你模式

## autoplay <Badge text="可选" />

::: warning 注意
由于大多数移动端浏览器禁止了音频自动播放，所以该选项在移动端无效
:::

- **类型**：`boolean?`
- **默认值**：`false`
- **描述**：是否开启自动播放

## theme <Badge text="可选" />

::: tip 提示
你可以选择引入 [color-thief](https://cdn.jsdelivr.net/npm/colorthief@2.0.2/dist/) 让播放器根据封面图片自动获取主题颜色
:::

- **类型**：`string?`
- **默认值**：`#b7daff`
- **描述**：设置播放器默认主题颜色

## loop <Badge text="可选" />

::: warning 注意
由于播放器会保存用户的使用习惯，所以播放器首次初始化之后该选项将失效
:::

- **类型**：`APlayer.LoopMode?`
- **默认值**：`all`
- **描述**：设置播放器的初始循环模式

```ts
declare namespace APlayer {
  export type LoopMode = 'all' | 'one' | 'none';
}
```

## order <Badge text="可选" />

::: warning 注意
由于播放器会保存用户的使用习惯，所以播放器首次初始化之后该选项将失效
:::

- **类型**：`APlayer.OrderMode?`
- **默认值**：`list`
- **描述**：设置播放器的初始顺序模式

```ts
declare namespace APlayer {
  export type OrderMode = 'list' | 'random';
}
```

## preload <Badge text="可选" />

- **类型**：`APlayer.Preload?`
- **默认值**：`auto`
- **描述**：设置音频的预加载模式

```ts
declare namespace APlayer {
  export type Preload = 'none' | 'metadata' | 'auto';
}
```

## volume <Badge text="可选" />

- **类型**：`number?`
- **默认值**：`0.7`
- **描述**：设置播放器的音量

## audio <Badge type="error" text="必填" />

- **类型**：`APlayer.Audio | Array<APlayer.Audio>`
- **默认值**：`undefined`
- **描述**：设置要播放的音频对象或播放列表

```ts
declare namespace APlayer {
  export type AudioType = 'auto' | 'hls' | 'normal';
  export interface Audio {
    id?: number; // 音频 id
    name: string | VNode; // 音频名称
    artist: string | VNode; // 音频艺术家
    url: string; // 音频播放地址
    cover: string; // 音频封面
    lrc?: string; // lrc 歌词
    theme?: string; // 单曲主题色，它将覆盖全局的默认主题色
    type?: AudioType; // 指定音频的类型
    speed?: number; // 单曲播放速度
  }
}
```

<aplayer-vnode />

这里与 [APlayer](https://github.com/MoePlayer/APlayer) 不同的是新增了 `id` 和 `speed` 属性。  
`id` 默认情况下由播放器自动生成，你也可以手动传一个 `id` 来覆盖它。  
`speed` 属性可以指定该音频的播放速度。

::: warning 注意
`id` 是用来区分音频的唯一标识，不允许重复，如果出现重复可能会导致播放器出现异常。  
默认情况下 `id` 是根据播放列表的索引生成，当播放列表发生变化时 (新增/删除) 会重新生成。  
当你从播放列表中删除音频时，由于播放列表发生了变化，所以会导致当前音频的 `id` 与删除后的播放列表不匹配。
出现这种情况时，会降级根据 `url` 更新当前音频的信息，如果播放列表中每一项的 `url` 都是唯一的，那么不会有问题。
如果有重复的 `url`，你必须设置音频的 `id` 属性，以确保每一项都是唯一的，否则播放器可能出现异常。
:::

## customAudioType <Badge text="可选" />

- **类型**：`{ [index: string]: Function }?`
- **默认值**：`undefined`
- **描述**：自定义音频类型

📝 [example.vue](/guide/hls.html)

```vue
<template>
  <aplayer :audio="audio" :customAudioType="customAudioType" :lrcType="3" />
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);

export default {
  data() {
    return {
      audio: {
        name: 'Let It Go.m3u8',
        artist: 'Idina Menzel',
        url: 'https://cdn.moefe.org/music/hls/frozen.m3u8',
        cover: 'https://p1.music.126.net/n72JJkPg2-ENxhB-DsZ2AA==/109951163115400390.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/frozen.lrc',
        type: 'customHls',
      },
      customAudioType: {
        customHls(audioElement, audio, player) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(audio.url);
            hls.attachMedia(audioElement);
          } else if (
            audioElement.canPlayType('application/x-mpegURL') ||
            audioElement.canPlayType('application/vnd.apple.mpegURL')
          ) {
            audioElement.src = audio.url;
          } else {
            player.showNotice('Error: HLS is not supported.');
          }
        },
      },
    };
  },
};
</script>
```

## mutex <Badge text="可选" />

- **类型**：`boolean?`
- **默认值**：`true`
- **描述**：是否开启互斥模式

如果开启则会阻止多个播放器同时播放，当前播放器播放时暂停其他播放器

## lrcType <Badge text="可选" />

- **类型**：`APlayer.LrcType?`
- **默认值**：`0`
- **描述**：设置 lrc 歌词解析模式

```ts
declare namespace APlayer {
  export enum LrcType {
    file = 3, // 表示 audio.lrc 的值是 lrc 文件地址，将通过 `fetch` 获取 lrc 歌词文本
    html = 2, // 不支持 html 用法
    string = 1, // 表示 audio.lrc 的值是 lrc 格式的字符串，将直接通过它解析歌词
    disabled = 0, // 禁用 lrc 歌词
  }
}
```

## listFolded <Badge text="可选" />

::: warning 注意
由于播放器会保存用户的使用习惯，所以播放器首次初始化之后该选项将失效
:::

- **类型**：`boolean?`
- **默认值**：`false`
- **描述**：是否折叠播放列表

## listMaxHeight <Badge text="可选" />

- **类型**：`number?`
- **默认值**：`250`
- **描述**：设置播放列表最大高度，单位为像素

## storageName <Badge text="可选" />

- **类型**：`string?`
- **默认值**：`aplayer-setting`
- **描述**：设置存储播放器设置的 `localStorage` key

这里与 [APlayer](https://github.com/MoePlayer/APlayer) 有所不同，在 `localStorage` 中保存的是对象数组  
不同的实例之间互不影响，一般情况下你不需要修改此项。

```ts
declare namespace APlayer {
  export type LoopMode = 'all' | 'one' | 'none';
  export type OrderMode = 'list' | 'random';
  export interface Settings {
    currentTime: number; // 当前音频的播放时间
    duration: number | null; // 当前音频的长度
    paused: boolean; // 当前播放器是否暂停
    mini: boolean; // 是否是 mini 模式
    lrc: boolean; // 当前歌词
    list: boolean; // 当前列表是否展开
    volume: number; // 当前播放器音量
    loop: LoopMode; // 当前循环模式
    order: OrderMode; // 当前顺序模式
    music: Audio | null; // 当前播放的音频对象
  }
}
```

```js
// 你可以使用实例的 `currentSettings` 属性获取当前实例的播放器设置
console.log(this.$refs.aplayer.currentSettings);
```
