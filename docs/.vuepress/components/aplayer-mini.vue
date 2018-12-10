<template>
  <aplayer v-if="showPlayer" :audio="audio" mini />
  <button v-else class="button" @click="showPlayer = true">
    点击加载播放器
  </button>
</template>

<script>
export default {
  data() {
    return {
      showPlayer: false,
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
