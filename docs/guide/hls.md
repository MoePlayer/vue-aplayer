# HLS 支持

<client-only>
  <aplayer-hls />
</client-only>

📝 example.vue

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
        name: '太陽と向日葵.m3u8',
        artist: 'FLOWER',
        url: 'http://pdacsgxq7.bkt.clouddn.com/hls/sunandsunflower.m3u8',
        cover: 'http://p1.music.126.net/CoM8s2FD5q1OgG4LSSDZuw==/5945059371390886.jpg?param=300y300', // prettier-ignore
        lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/sunandsunflower.lrc',
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
