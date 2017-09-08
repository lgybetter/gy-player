<template>
  <div class="p-audio-player">
    <header>
      <icon></icon>
      <title></title>
      <icon></icon>
    </header>
    <section>
      <audio ref="audioPlayer" :src="audio.path" :autoplay="false"></audio>
    </section>
    <footer>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audio: {
        path: 'http://os32fgzvj.bkt.clouddn.com/%E6%84%9F%E6%BF%80%E9%81%87%E5%88%B0%E4%BD%A0.mp3'
      }
    }
  },
  methods: {
  }

}
</script>

<style scoped>
.p-audio-player {
  height: 100%;
  background: rgba(209, 95, 238, .5);
}
header {
  display: flex;
  height: 50px;
}
</style>