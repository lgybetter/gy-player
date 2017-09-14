<template>
  <div class="p-audio-player">
    <header>
    </header>
    <section class="w-player-section">
      <div class="w-music-msg">
        <img class="w-avator-icon" src="http://os32fgzvj.bkt.clouddn.com/d57586537c5f44728925090d0cca10a1-head-picture.jpg"></img>
        <div class="w-music-detail">
          <h1>xxxx</h1>
          <h2>xxxx</h2>
        </div>
      </div>
      <canvas ref="audioCanvas" class="w-audio-balanced"></canvas>
      <div class="w-progess-bar">
        <span>{{parseInt(currentTime)}}</span>
        <silde-bar :cur="currentTime" :total="totalTime"></silde-bar>
      </div>
      <div class="w-player-controller">
        <div class="w-player-btn"><img src="http://os32fgzvj.bkt.clouddn.com/%E5%81%9C%E6%AD%A2.png"></img></div>
        <div class="w-player-btn"><img src="http://os32fgzvj.bkt.clouddn.com/%E5%BF%AB%E9%80%80.png"></img></div>
        <div class="w-player-btn w-player-btn-max" @click="play"><img src="http://os32fgzvj.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"></img></div>        
        <div class="w-player-btn"><img src="http://os32fgzvj.bkt.clouddn.com/%E5%BF%AB%E8%BF%9B.png"></img></div>
        <div class="w-player-btn"><img src="http://os32fgzvj.bkt.clouddn.com/%E4%BF%A1%E6%81%AF.png"></img></div>
      </div>
      <audio ref="audioPlayer" :src="audio.path" :autoplay="false" crossOrigin="anonymous" @timeupdate="timeupdate"></audio>
      <!-- <button @click="play">Test</button> -->
    </section>
    <footer>
    </footer>
  </div>
</template>

<script>
import sildeBar from '../../components/SlideBar'
// import { dateFormat } from '../../utils/index.js'
export default {
  data () {
    return {
      audio: {
        path: 'http://os32fgzvj.bkt.clouddn.com/Elvins.J%20-%20Conan%C2%A0Rock%C2%A0%28%E6%91%87%E6%BB%9A%E7%89%88%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97%E4%B8%BB%E9%A2%98%E6%9B%B2%29.mp3'
      },
      autoplay: false,
      playing: false,
      inited: false,
      currentTime: 0,
      totalTime: 0
    }
  },
  components: {
    sildeBar
  },
  methods: {
    timeupdate (event) {
      this.currentTime = this.$refs.audioPlayer.currentTime
    },
    play () {
      const audio = this.$refs.audioPlayer
      this.totalTime = audio.duration
      this.playing = !this.playing
      if (this.playing) {
        audio.play()
      } else {
        this.$refs.audioPlayer.pause()
      }
      if (this.inited) {
        return
      }
      this.inited = true
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext()
      const source = audioContext.createMediaElementSource(audio)
      const analyser = audioContext.createAnalyser()
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      const audioCanvas = this.$refs.audioCanvas
      const context = audioCanvas.getContext('2d')
      let arrData = new Uint8Array(analyser.frequencyBinCount)
      let count = Math.min(500, arrData.length)
      let step = Math.round(arrData.length * 0.6 / count)
      let value = 0
      let drawX = 0
      let drawY = 0
      let height = audioCanvas.height
      let width = audioCanvas.width
      let lineWidth = context.lineWidth = audioCanvas.width / count * 10
      context.lineWidth = lineWidth
      render()
      function render () {
        context.clearRect(0, 0, width, height)
        analyser.getByteFrequencyData(arrData)
        for (let i = 0; i < count / 10; i++) {
          value = arrData[i * step + step]
          drawX = i * lineWidth
          drawY = parseInt(Math.max((height - value / 2), 10))
          context.beginPath()
          context.strokeStyle = '#d590da'
          context.moveTo(drawX, height)
          context.lineTo(drawX, drawY)
          context.stroke()
        }
        requestAnimationFrame(render)
      }
    }
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
.w-player-section {
  padding: 8px 16px;
}

.w-player-section > .w-music-msg {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.w-avator-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.w-player-section .w-music-detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.w-music-detail h1 {
  font-size: 18px;
  color: #FAFAD2;
}

.w-music-detail h2 {
  font-size: 15px;
  color: #F0FFF0;
}

.w-audio-balanced {
  height: 250px;
  width: 100%;
}

.w-progess-bar {
  display: flex;
  flex-direction: column;
}

.w-progess-bar > span {
  font-size: 15px;
  color: #fafad2;
}

.w-player-controller {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.w-player-btn {
  padding: 10px;
}

.w-player-btn > img {
  width: 35px;
  height: 35px;
} 

.w-player-btn-max > img {
  width: 70px;
  height: 70px;
}

</style>