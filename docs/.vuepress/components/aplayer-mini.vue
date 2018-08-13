<template>
  <aplayer v-if="showPlayer" :audio="audio" mini />
  <button v-else class="button" @click="showPlayer = true">点击加载播放器</button>
</template>

<script>
export default {
  data() {
    return {
      showPlayer: false,
      audio: {
        name: 'ヒビカセ',
        artist: 'れをる',
        url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
        cover: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300' // prettier-ignore
      },
    }
  },
}
</script>
