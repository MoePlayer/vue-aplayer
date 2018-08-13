<template>
  <aplayer v-if="showPlayer" :audio="audio" :lrcType="lrcType" />
  <button v-else class="button" @click="showPlayer = true">点击加载播放器</button>
</template>

<script>
export default {
  props: {
    lrc: String,
    lrcType: Number,
  },
  data() {
    const { lrc } = this
    return {
      showPlayer: false,
      audio: {
        name: 'Mermaid girl (Extended RRver.)',
        artist: '森永真由美',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/mermaidgirl.mp3',
        cover: 'http://p1.music.126.net/xXxBuZksld5HtovQxI1D0A==/3227066630258578.jpg?param=300y300', // prettier-ignore
        lrc, // http://pdacsgxq7.bkt.clouddn.com/lrc/mermaidgirl.lrc
      },
    }
  },
}
</script>
