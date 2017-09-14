<template>
  <div class="w-slide-bar" ref="slideBar">
    <div class="w-slide-bar-line w-slide-bar-curline" ref="curline"></div>
    <div class="w-slide-bar-line w-slide-bar-remainline" ref="remainline"><div class="w-slide-bar-btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" ></div></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.totalWidth = this.$refs.slideBar.offsetWidth
    this.remainWidth = this.totalWidth
  },
  props: {
    total: {
      type: Number,
      required: true
    },
    cur: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    cur (val) {
      this.remainWidth = parseInt(parseFloat(((this.total - val) / this.total).toFixed(2)) * this.totalWidth)
      this.curWidth = parseInt(parseFloat((val / this.total).toFixed(2)) * this.totalWidth)
      this.$refs.remainline.style.width = `${this.remainWidth}px`
      this.$refs.curline.style.width = `${this.curWidth}px`
    }
  },
  data () {
    return {
      totalWidth: 0,
      curWidth: 0,
      remainWidth: 0,
      slideStart: 0,
      slideEnd: 0,
      slideDis: 0
    }
  },
  methods: {
    handleTouchStart (e) {
      console.log(this.$refs.remainline.offsetLeft)
      this.slideStart = event.touches[0].pageX
      this.slideEnd = this.slideStart
      console.log('start', this.slideEnd)
    },
    handleTouchMove (e) {
      const slideEndPre = this.slideEnd
      console.log('slideEndPre', slideEndPre)
      this.slideEnd = parseFloat(event.touches[0].pageX)
      console.log('slideEnd', this.slideEnd)
      const curSlideDis = parseFloat(this.slideEnd - slideEndPre)
      this.curWidth = parseFloat(this.curWidth + curSlideDis)
      this.$refs.curline.style.width = `${this.curWidth}px`
    },
    handleTouchEnd (e) {
      this.slideDis = this.slideEnd - this.slideStart
      const timeDis = (this.slideDis / this.totalWidth) * this.total
      console.log(timeDis)
      console.log('touchEnd', this.slideDis)
    }
  }
}
</script>

<style scoped>
.w-slide-bar {
  display: flex;
  align-items: center;
  height: 25px;
}
.w-slide-bar-line {
  height: 2px;
  background: #fafad2;
}

.w-slide-bar-remainline {
  width: 100%;
  display: flex;  
  align-items: center;
}

.w-slide-bar-btn {
  width: 13px;
  height: 13px;
  background: #fafad2;
  border-radius: 50%;
}
.w-slide-bar-curline {
  width: 0;
  background: rgba(209, 95, 238, .5);
}
</style>

