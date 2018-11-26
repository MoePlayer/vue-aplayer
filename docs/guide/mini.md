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
        name: 'The Party We Have Never Seen',
        artist: 'Nana Takahashi',
        url: 'https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3',
        cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300' // prettier-ignore
      },
    };
  },
};
</script>
```
