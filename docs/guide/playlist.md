# 播放列表

<aplayer-playlist />

📝 example.vue

```vue
<template>
  <aplayer :audio="audio" :lrcType="3" />
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);

export default {
  data() {
    return {
      audio: [
        {
          name: 'I Really Like You 西班牙语版（Cover Carly Rae Jepsen）',
          artist: '熊子',
          url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/mucho.mp3',
          cover: 'http://p1.music.126.net/UhbkP71d9KTMsdNczCf2wA==/109951162986700564.jpg?param=300y300', // prettier-ignore
          lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/mucho.lrc',
        },
        {
          name: 'Mermaid girl (Extended RRver.)',
          artist: '森永真由美',
          url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/mermaidgirl.mp3',
          cover: 'http://p1.music.126.net/xXxBuZksld5HtovQxI1D0A==/3227066630258578.jpg?param=300y300', // prettier-ignore
          lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/mermaidgirl.lrc',
        },
        {
          name: 'ヒビカセ',
          artist: 'れをる',
          url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
          cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300', // prettier-ignore
          lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
        },
      ],
    };
  },
};
</script>
```
