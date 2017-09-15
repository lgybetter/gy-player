<template>
  <div class="p-audio-player">
    <pop-up v-model="showMenu">
      <div slot="body">
        <h3 class="w-music-list">我的歌单</h3>
      </div>
    </pop-up>
    <header>
      <div class="w-player-btn" @click="handleShowMenu"><img src="~assets/images/icons/menu.png"></img></div>
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
        <silde-bar v-model="currentTime" :total="totalTime" @input="handleSlideChange"></silde-bar>
      </div>
      <div class="w-player-controller">
        <div class="w-player-btn"><img src="~assets/images/icons/stop.png" @click="stop"></img></div>
        <div class="w-player-btn"><img src="~assets/images/icons/pre.png"></img></div>
        <div class="w-player-btn w-player-btn-max" @click="play">
          <img v-if="!playing" src="~assets/images/icons/play.png"></img>
          <img v-if="playing" src="~assets/images/icons/pause.png"></img>
        </div>    
        <div class="w-player-btn"><img src="~assets/images/icons/next.png"></img></div>
        <div class="w-player-btn"><img src="~assets/images/icons/comment.png"></img></div>
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
import popUp from '../../components/PopUp'
// import { dateFormat } from '../../utils/index.js'
export default {
  data () {
    return {
      audio: {
        path: 'http://os32fgzvj.bkt.clouddn.com/%E5%95%8A%E6%A0%8B%20-%20%E6%9C%B4%E6%A0%91-%E5%B9%B3%E5%87%A1%E4%B9%8B%E8%B7%AFDJ%EF%BC%88%E5%95%8A%E6%A0%8BRemix%EF%BC%89.mp3'
      },
      autoplay: false,
      playing: false,
      inited: false,
      currentTime: 0,
      totalTime: 0,
      showMenu: false
    }
  },
  components: {
    sildeBar,
    popUp
  },
  methods: {
    timeupdate (event) {
      this.currentTime = this.$refs.audioPlayer.currentTime
      if (this.currentTime >= this.totalTime) {
        this.currentTime = 0
      }
    },
    handleSlideChange (value) {
      this.$refs.audioPlayer.currentTime = value
    },
    handleShowMenu () {
      this.showMenu = true
    },
    stop () {
      this.playing = !this.playing
      this.$refs.audioPlayer.pause()
      this.currentTime = 0
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
  align-items: center;
  justify-content: flex-end;
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

.w-music-list {
  color: #fafad2;
  text-align: center;
  font-size: 18px;
}

</style>