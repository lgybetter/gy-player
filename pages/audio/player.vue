<template>
  <div class="p-audio-player">
    <pop-up v-model="showMenu">
      <div slot="body">
        <h3 class="w-music-list-title">我的歌单</h3>
        <draggable class="w-music-list" element="ul" v-model="musicList" :options="dragOptions" :move="handleMove" @start="isDragging=true"　@end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <li class="w-music-list-item" v-for="item in musicList" :key="item.order"> 
              {{item.name}}
            </li> 
          </transition-group>
        </draggable>
      </div>
    </pop-up>
    <header>
      <div class="w-player-btn w-palyer-btn-min" @click="handleShowMenu"><img src="~assets/images/icons/menu.png"></img></div>
    </header>
    <section class="w-player-section">
      <div class="w-music-msg">
        <img class="w-avator-icon" :src="currentMusic.image"></img>
        <div class="w-music-detail">
          <h1>{{currentMusic.name}}</h1>
          <h2>{{currentMusic.author}}</h2>
        </div>
      </div>
      <canvas ref="audioCanvas" class="w-audio-balanced"></canvas>
      <div class="w-progess-bar">
        <span>{{parseInt(currentTime)}}</span>
        <silde-bar v-model="currentTime" :total="totalTime" @input="handleSlideChange"></silde-bar>
      </div>
      <div class="w-player-controller">
        <div class="w-player-btn"><img src="~assets/images/icons/stop.png" @click="stop"></img></div>
        <div class="w-player-btn" @click="pre"><img src="~assets/images/icons/pre.png"></img></div>
        <div class="w-player-btn w-player-btn-max" @click="toPlay">
          <img v-if="!playing" src="~assets/images/icons/play.png"></img>
          <img v-if="playing" src="~assets/images/icons/pause.png"></img>
        </div>    
        <div class="w-player-btn" @click="next"><img src="~assets/images/icons/next.png"></img></div>
        <div class="w-player-btn"><img src="~assets/images/icons/comment.png"></img></div>
      </div>
      <audio ref="audioPlayer" :src="currentMusic.src" :autoplay="false" crossOrigin="anonymous" @timeupdate="timeupdate" @canplay="canplay"></audio>
      <!-- <button @click="play">Test</button> -->
    </section>
    <footer>
    </footer>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import sildeBar from '../../components/SlideBar'
import popUp from '../../components/PopUp'
const list = [
  {
    name: '平凡之路DJ',
    src: 'http://os32fgzvj.bkt.clouddn.com/%E5%95%8A%E6%A0%8B%20-%20%E6%9C%B4%E6%A0%91-%E5%B9%B3%E5%87%A1%E4%B9%8B%E8%B7%AFDJ%EF%BC%88%E5%95%8A%E6%A0%8BRemix%EF%BC%89.mp3',
    image: 'http://os32fgzvj.bkt.clouddn.com/61f5f9ef033256b18c276766d6ba4a9f-1496423688843.jpg',
    author: 'DJ'
  },
  {
    name: '摇滚版名侦探柯南主题曲',
    src: 'http://os32fgzvj.bkt.clouddn.com/Elvins.J%20-%20Conan%C2%A0Rock%C2%A0%28%E6%91%87%E6%BB%9A%E7%89%88%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97%E4%B8%BB%E9%A2%98%E6%9B%B2%29.mp3',
    image: 'http://os32fgzvj.bkt.clouddn.com/79935f57a749ce19c07536534592079b-20150921111514727.jpg',
    author: 'King'
  },
  {
    name: '感激遇到你',
    src: 'http://os32fgzvj.bkt.clouddn.com/%E6%84%9F%E6%BF%80%E9%81%87%E5%88%B0%E4%BD%A0.mp3',
    image: 'http://os32fgzvj.bkt.clouddn.com/454595047.jpg',
    author: 'Wei'
  }
]
// import { dateFormat } from '../../utils/index.js'
export default {
  data () {
    return {
      autoplay: false,
      playing: false,
      inited: false,
      currentTime: 0,
      curIndex: 0,
      totalTime: 0,
      showMenu: false,
      isDragging: false,
      delayedDragging: false,
      musicList: list.map((item, index) => {
        return {
          ...item,
          order: index + 1,
          fixed: false
        }
      })
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    currentMusic: {
      get () {
        return this.musicList[this.curIndex]
      },
      set () {
      }
    }
  },
  components: {
    sildeBar,
    popUp,
    draggable
  },
  methods: {
    timeupdate (event) {
      this.currentTime = this.$refs.audioPlayer.currentTime
      if (this.currentTime >= this.totalTime) {
        this.currentTime = 0
        this.curIndex = this.curIndex++ % this.musicList.length
      }
    },
    canplay () {
      if (!this.playing) {
        return
      }
      this.play()
    },
    pre () {
      this.curIndex = this.curIndex - 1 < 0 ? this.musicList.length - 1 : --this.curIndex
      console.log(this.curIndex, this.currentMusic.name, this.musicList)
      this.currentTime = 0
    },
    next () {
      this.curIndex = this.curIndex + 1 > this.musicList.length - 1 ? 0 : ++this.curIndex
      console.log(this.curIndex, this.currentMusic.name, this.musicList)
      this.currentTime = 0
    },
    handleSlideChange (value) {
      this.$refs.audioPlayer.currentTime = value
    },
    handleShowMenu () {
      this.showMenu = true
    },
    handleMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    toPlay () {
      this.playing = !this.playing
      if (this.playing) {
        this.play()
      } else {
        this.$refs.audioPlayer.pause()
      }
    },
    stop () {
      this.playing = false
      this.$refs.audioPlayer.pause()
      this.currentTime = 0
    },
    play () {
      const audio = this.$refs.audioPlayer
      this.totalTime = audio.duration
      audio.play()
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
  background: rgba(209, 95, 238, .3);
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

.w-player-btn > img:active {
  transform: scale(1.1);
}

.w-player-btn-max > img {
  width: 70px;
  height: 70px;
}

.w-music-list {
  margin: 16px 0;
}

.w-music-list-item {
  display: block;
  padding: 4px;
  color: #f0fff0;
}

.w-music-list-title {
  color: #fafad2;
  text-align: center;
  font-size: 18px;
}

.w-palyer-btn-min > img {
  width: 25px;
  height: 25px;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.flip-list-move {
  transition: transform 0.5s;
}

</style>