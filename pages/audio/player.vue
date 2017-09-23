<template>
  <div class="p-audio-player">
    <header>
      <div class="w-player-btn w-palyer-btn-min" @click="handleShowMenu"><img src="~assets/images/icons/menu.png"></img></div>
    </header>
    <section class="w-player-section">
      <div class="w-music-msg">
        <img :class="['w-avator-icon', { rotation: playing }]" :src="currentMusic.image"></img>
        <div class="w-music-detail">
          <h1>{{currentMusic.name}}</h1>
          <h2>{{currentMusic.author}}</h2>
        </div>
      </div>
      <template v-if="audioContext">
        <canvas ref="audioCanvas" class="w-audio-balanced"></canvas>
      </template>
      <template v-else>
        <div class="w-info-tips">当前浏览器不支持音频分析</div>
      </template>
      <div class="w-progess-bar">
        <span>{{parseInt(currentTime) | formatSec}}</span>
        <silde-bar v-model="currentTime" :total="totalTime" @change="handleSlideChange"></silde-bar>
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
    </section>
    <footer>
    </footer>
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
    <div class="w-background-blur" :style="background"></div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import sildeBar from '../../components/SlideBar'
import popUp from '../../components/PopUp'
import { formatSec } from '../../utils'
import { initAudioContext } from './audio-context'
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
export default {
  filters: {
    formatSec
  },
  created () {
    this.curIndex = 0
    this.musicList = list.map((item, index) => {
      return {
        ...item,
        order: index + 1,
        fixed: false
      }
    })
  },
  mounted () {
    this.audioContextFlag = window.AudioContext || window.webkitAudioContext
  },
  data () {
    return {
      autoplay: false,
      playing: false,
      inited: false,
      currentTime: 0,
      totalTime: 9999,
      showMenu: false,
      isDragging: false,
      delayedDragging: false,
      musicList: [],
      curIndex: 0,
      audioContextFlag: 0,
      test: 
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
    audioContext () {
      return this.audioContextFlag != null
    },
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
    },
    background () {
      return { background: `url(${this.musicList[this.curIndex].image}) no-repeat 100% 100%` }
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
        this.next()
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
      this.currentTime = 0
      this.playing = false
    },
    next () {
      this.curIndex = this.curIndex + 1 > this.musicList.length - 1 ? 0 : ++this.curIndex
      this.currentTime = 0
      this.playing = false
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
      const canvas = this.$refs.audioCanvas
      this.totalTime = audio.duration
      audio.play()
      if (this.inited) {
        return
      }
      this.inited = true
      initAudioContext.call(this, audio, canvas)
    }
  }
}
</script>

<style scoped>
.p-audio-player {
  height: 100%;
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
  /* box-shadow: -1px 0 1px #ccc, 0 0 0 #ccc, 1px 0 1px #ccc, 0 1.5px 1px #ccc; */
  -webkit-filter: drop-shadow(2px 2px 10px #fafad2) drop-shadow(-2px -2px 10px #fafad2);
  border-radius: 50%;
}

.w-player-section .w-music-detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.w-music-detail h1, h2 {
  display: -webkit-box;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.w-music-detail h1 {
  font-size: 18px;
  color: #d590da;
}

.w-music-detail h2 {
  font-size: 15px;
  color: #b580c0;
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
  background: #fafad2;
  border-radius: 3px;
}
.flip-list-move {
  transition: transform 0.5s;
}

.w-background-blur {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(4px);
}

.rotation {
  animation: rotating 6s infinite linear;
}

.w-info-tips {
  width: 100%;
  height: 250px;
  line-height: 250px;
  color: #d590da;
  font-size: 20px;
  text-align: center;
}

@keyframes rotating {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

</style>