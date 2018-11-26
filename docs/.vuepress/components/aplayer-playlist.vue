<template>
  <aplayer v-if="showPlayer" :audio="audio" :lrcType="3" />
  <button v-else class="button" @click="showPlayer = true;">
    点击加载播放器
  </button>
</template>

<script>
export default {
  data() {
    return {
      showPlayer: false,
      audio: [
        {
          name: '东西（Cover：林俊呈）',
          artist: '纳豆',
          url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        },
        {
          name: '响喜乱舞（Cover：MARiA）',
          artist: '泠鸢yousa',
          url: 'https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3',
          cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc',
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc',
        },
      ],
    };
  },
};
</script>
