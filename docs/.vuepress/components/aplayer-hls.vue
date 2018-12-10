<template>
  <aplayer
    v-if="showPlayer"
    :audio="audio"
    :customAudioType="customAudioType"
    :lrcType="3"
  />
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
        name: 'Let It Go.m3u8',
        artist: 'Idina Menzel',
        url: 'https://cdn.moefe.org/music/hls/frozen.m3u8',
        cover: 'https://p1.music.126.net/n72JJkPg2-ENxhB-DsZ2AA==/109951163115400390.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/frozen.lrc',
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
