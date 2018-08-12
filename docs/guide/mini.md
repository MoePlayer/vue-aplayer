# 迷你模式

<aplayer-mini />

📝 example.vue

```vue
<template>
  <aplayer :audio="audio" mini />
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);

export default {
  data() {
    return {
      audio: {
        name: 'ヒビカセ',
        artist: 'れをる',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
        cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300' // prettier-ignore
      },
    };
  },
};
</script>
```
