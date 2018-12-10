<template>
  <aplayer v-if="showPlayer" :audio="audio" :lrcType="lrcType" />
  <button v-else class="button" @click="showPlayer = true">
    点击加载播放器
  </button>
</template>

<script>
export default {
  props: {
    lrc: String,
    lrcType: Number,
  },
  data() {
    const { lrc } = this;
    return {
      showPlayer: false,
      audio: {
        name: '啵唧',
        artist: 'Hanser',
        url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
        cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
        lrc, // 'https://cdn.moefe.org/music/lrc/kiss.lrc',
      },
    };
  },
};
</script>
