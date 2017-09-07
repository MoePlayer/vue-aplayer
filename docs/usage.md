# 使用

为了降低新手的使用难度本文档采用 CDN 的方式使用

### 初始化 HTML 结构

```html
<div id="app">
  <!-- 模块化开发下使用 <APlayer /> -->
  <a-player
    ref="aplayer"
    :narrow="narrow"
    :autoplay="autoplay"
    :showlrc="showlrc"
    :mutex="mutex"
    :fold="fold"
    :speed="speed"
    :theme="theme"
    :mode="mode"
    :preload="preload"
    :listmaxheight="listmaxheight"
    :music="music"
    @play="getLyricAsync"
  ></a-player>
  <button @click="aplayer.toggle()">toggle play (current: {{ aplayer ? aplayer.status : 'play' }})</button>
  <button @click="aplayer.toggleVolume()">toggle volume (current: {{ aplayer ? aplayer.volume : 1 }})</button>
  <button @click="narrow = !narrow">switch narrow (current: {{ narrow }})</button>
  <button @click="showlrc = !showlrc">switch showlrc (current: {{ showlrc }})</button>
  <button @click="fold = !fold">switch fold (current: {{ fold }})</button>
  <button @click="speed = (speed * 1000 + 0.1 * 1000) / 1000">change speed (current: {{ speed }})</button>
  <button @click="aplayer.togglePlayMode()">change mode (current: {{ aplayer ? aplayer.playMode : mode }})</button>
  <button @click="listmaxheight = Number.parseInt(listmaxheight) + 33 + 'px'">change listmaxheight (current: {{ listmaxheight }})</button>
  <button @click="music.splice(0, 1)">delete music (count: {{ music.length }})</button>
  <button @click="fold = false; music.reverse()">sort music</button>
</div>
<script src="//cdn.bootcss.com/vue/2.4.1/vue.min.js"></script>
<script src="/path/to/APlayer.min.js"></script>
<link rel="stylesheet" href="/path/to/APlayer.min.css"></link>
```

### 初始化 Vue 实例

```js
/* global Vue */
new Vue({
  el: '#app',
  data: {
    aplayer: null,
    narrow: false,
    autoplay: true,
    showlrc: true,
    mutex: true,
    fold: false,
    speed: 1,
    theme: '#ad7a86',
    mode: 'circulation',
    preload: 'metadata',
    listmaxheight: '200px',
    music: [{
      id: 0,
      title: '本色',
      author: '泠鸢yousa',
      url: 'http://m10.music.126.net/20170722024929/1b306cf3e37379fb0a4d734eaa97c2f1/ymusic/731f/d1d3/6884/0ef39bebf0050d11580b46b72b32e99d.mp3',
      pic: 'https://p1.music.126.net/fTSpa8Et436YQ7eWTvkL0Q==/17963820974811393.jpg',
      lrc: 'loading'
    }]
  },
  mounted () {
    this.aplayer = this.$refs.aplayer
  },
  methods: {
    getLyricAsync () {
      setTimeout(() => this.music[0].lrc = '[by:Raidou]\n[by:raidou]\n[ti:本色]\n[ar:泠鸢yousa]\n[re:lrc-maker (https://weirongxu.github.io/lrc-maker/)]\n[ve:0.1.0]\n[length:05:14]\n[00:00.00] 作曲 : HTT\n[00:01.00] 作词 : 左耳以东\n[00:39.97]天生妩媚风流俏模样\n[00:43.72]偏嫁五尺短儿郎\n[00:46.48]谷树皮 三寸丁\n[00:47.98]夜夜空对 枉自结愁肠\n[00:52.73]生就娉婷袅娜好身段\n[00:55.97]若为娼 无妨\n[00:58.72]冠花街 压群芳\n[01:00.98]身无所拘 心无疆\n[01:42.98][03:41.34]娇莺应和啼婉转\n[01:45.48][03:44.02]金莲颤 青葱缠 享合欢\n[01:51.47][03:49.77]盈盈露滴湿牡丹\n[01:57.26][03:55.52]翩翩粉蝶暗偷香\n[02:03.51][04:01.52]倒浇红烛夜行船\n[02:06.76][04:05.27]鱼水同欢赴巫山\n[02:09.76][04:08.02]长睫倦 媚骨软 再贪欢\n[02:15.76][03:25.34][04:15.40][00:35.47][01:26.72]\n[02:39.19]鸿儒白丁正襟议伦常\n[02:42.19]酒阑横卧温柔乡\n[02:44.94]赏郑声 话高唐\n[02:46.94]男儿本色 矫饰冀流芳\n[02:50.69]未将妇德女戒正眼望\n[02:54.44]有缘人 放浪\n[02:57.19]千夫指 又何干？\n[02:59.19]休要辜负 好皮囊\n[03:02.69][01:04.23]斜阳含羞越花窗\n[03:05.69][01:06.98]浮云带怯偷眼望\n[03:08.69][01:09.98]美人微醺衣半敞\n[03:14.19][01:16.23]青丝半绾慵倚床\n[03:17.44][01:18.97]星眸初泛潋滟光\n[03:20.19][01:21.98]檀口轻启吐兰芳\n[03:26.09][01:27.23]金风玉露相逢晚\n[03:31.84][01:33.48]银盘斜偎乌云漫\n[03:37.84][01:39.47]轻拢慢捻挑抹忙\n[04:42.54]帐暖良宵短\n[04:45.79]天色忽已晚\n[04:48.99]忙着罗袜重整装\n[04:53.24]倚门回首 带笑含情央\n', 2000)
    }
  }
})
```

### Props

| 名称            | 类型         | 默认值             |  必填  | 说明                |
| :------------ | :--------- | :-------------- | :--: | :---------------- |
| narrow        | `boolean`  | `false`         |  ✕   | 是否以迷你模式显示         |
| autoplay      | `boolean`  | `false`         |  ✕   | 是否自动播放            |
| showlrc       | `boolean`  | `false`         |  ✕   | 是否显示歌词            |
| mutex         | `boolean`  | `true`          |  ✕   | 是否互斥 暂停其他实例（多标签页） |
| fold          | `boolean`  | `false`         |  ✕   | 是否收起播放列表          |
| speed         | `number`   | 1               |  ✕   | 播放速度 数值越大速度越快     |
| theme         | `string`   | `'#ad7a86'`     |  ✕   | 主题颜色              |
| mode          | `type`     | `'circulation'` |  ✕   | 播放模式              |
| preload       | `type`     | `'auto'`        |  ✕   | 预加载模式             |
| listmaxheight | `string`   | `'auto'`        |  ✕   | 播放列表最大高度          |
| music         | `Array<T>` | `[]`            |  ✓   | 播放列表歌曲            |
| remove        | `boolean`  | `false`         |  ✕   | 是否开启播放列表删除功能      |

**`mode` 可选值：**

* **`circulation`** : 列表循环
* **`singer`** : 单曲循环
* **`random`** : 随机播放
* **`order`** : 顺序播放

**`music` 对象属性：**

* **`id`** : 主键，如果为空则为数组中对应的索引
* **`title`** : 歌曲名称，必填
* **`author`** : 歌曲作者，选填
* **`url`** : 歌曲播放地址，必填
* **`pic`** : 歌曲图片地址，选填
* **`lrc`** : LRC 歌词地址或字符串，选填  
  如果值为 `loading` 则表示该歌词由异步接口获取  
  在值改变之前歌词面板将显示“加载中”的文案



### API

公开了以下属性和方法：

* `this.$refs.aplayer.play()` // 继续播放
* `this.$refs.aplayer.play(index)` // 播放指定索引歌曲
* `this.$refs.aplayer.play(music)` // 播放指定歌曲
* `this.$refs.aplayer.pause()` // 暂停播放
* `this.$refs.aplayer.toggle()` // 切换播放状态（当前暂停则播放，当前播放则暂停）
* `this.$refs.aplayer.toggleVolume()` // 切换静音状态
* `this.$refs.aplayer.togglePlayMode(mode?)` // 按顺序切换播放模式或切换到指定的播放模式
* `this.$refs.aplayer.setMusic(music)` // 重设当前播放曲目信息（仅设置信息不切换播放）
* `this.$refs.aplayer.currentMusic` // [只读] 获取当前播放的歌曲信息  
  如果要修改信息请使用 `this.$refs.aplayer.setMusic(music)`
* `this.$refs.aplayer.audio` // [只读] 获取播放器依赖的 `HTMLAudioElement` 对象

**仅提供最基础和常用的 API ，因为所有 Props 都是 [响应式](https://cn.vuejs.org/v2/guide/reactivity.html) 绑定的。**  
**所以如果您需要往播放列表添加歌曲只需要往 `music` 数组中 `push` 对象即可。**

### 事件

支持所有原生 Media 事件

| 属性                 | 值      | 描述                                   |
| :----------------- | :----- | :----------------------------------- |
| onabort            | script | 在退出时运行的脚本                            |
| oncanplay          | script | 当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）          |
| oncanplaythrough   | script | 当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本           |
| ondurationchange   | script | 当媒介长度改变时运行的脚本                        |
| onemptied          | script | 当发生故障并且文件突然不可用时运行的脚本（比如连接意外断开时）      |
| onended            | script | 当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）     |
| onerror            | script | 当在文件加载期间发生错误时运行的脚本                   |
| onloadeddata       | script | 当媒介数据已加载时运行的脚本                       |
| onloadedmetadata   | script | 当元数据（比如分辨率和时长）被加载时运行的脚本              |
| onloadstart        | script | 在文件开始加载且未实际加载任何数据前运行的脚本              |
| onpause            | script | 当媒介被用户或程序暂停时运行的脚本                    |
| onplay             | script | 当媒介已就绪可以开始播放时运行的脚本                   |
| onplaying          | script | 当媒介已开始播放时运行的脚本                       |
| onprogress         | script | 当浏览器正在获取媒介数据时运行的脚本                   |
| onratechange       | script | 每当回放速率改变时运行的脚本（比如当用户切换到慢动作或快进模式）     |
| onreadystatechange | script | 每当就绪状态改变时运行的脚本（就绪状态监测媒介数据的状态）        |
| onseeked           | script | 当 seeking 属性设置为 false（指示定位已结束）时运行的脚本 |
| onseeking          | script | 当 seeking 属性设置为 true（指示定位是活动的）时运行的脚本 |
| onstalled          | script | 在浏览器不论何种原因未能取回媒介数据时运行的脚本             |
| onsuspend          | script | 在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本      |
| ontimeupdate       | script | 当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本   |
| onvolumechange     | script | 每当音量改变时（包括将音量设置为静音）时运行的脚本            |
| onwaiting          | script | 当媒介已停止播放但打算继续播放时运行的脚本                |
| onfoldChange       | script | 播放列表收起状态发生改变时运行的脚本                   |

### 歌词

##### LRC [歌词格式](https://zh.wikipedia.org/wiki/LRC%E6%A0%BC%E5%BC%8F)

```
[ti:歌词(歌曲)的标题]
[al:本歌所在的唱片集]
[ar:演出者-歌手]
[au:歌词作者-作曲家]
[by:此LRC文件的创建者]
[offset:+/- 以毫秒为单位加快或延后歌词的播放]

[re:创建此LRC文件的播放器或编辑器]
[ve:程序的版本]

[mm:ss.ms] 我们这一路走来真的不容易
[mm:ss.ms][mm:ss:ms] 多少次流着泪说还不如分离
...
```

##### LRC 字符串

```js
{
  title: '我们（Cover 杨清柠&王乐乐）',
  author: '锦零／凤九',
  url: 'path/to/music.mp3',
  pic: 'https://p4.music.126.net/4zCLh5OcpB8Hb2woMjSs3Q==/109951162978917893.jpg',
  lrc: '[01:00.01]我们这一路走来真的不容易\n[01:00.06]多少次流着泪说还不如分离'
}
```



##### LRC 文件

```js
{
  title: '我们（Cover 杨清柠&王乐乐）',
  author: '锦零／凤九',
  url: 'path/to/music.mp3',
  pic: 'https://p4.music.126.net/4zCLh5OcpB8Hb2woMjSs3Q==/109951162978917893.jpg',
  lrc: 'path/to/music.lrc'
}
```



##### 异步 API 歌词

```js
new Vue({
  el: '#app',
  data: {
    music: [{
      title: '我们（Cover 杨清柠&王乐乐）',
      author: '锦零／凤九',
      url: 'path/to/music.mp3',
      pic: 'https://p4.music.126.net/4zCLh5OcpB8Hb2woMjSs3Q==/109951162978917893.jpg',
      lrc: null
    }]
  },
  async created () {
    const { data } = await Axios.get('https://api.quq.cat/lyric?id=491778843')
    if (data.code === 200) this.music[0].lrc = data.lrc.lyric
  }
})
```

