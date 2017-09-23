<template>
  <div class="w-slide-bar" ref="slideBar">
    <div class="w-slide-bar-line w-slide-bar-curline" ref="curline" :style="curWidth"></div>
    <div class="w-slide-bar-line w-slide-bar-remainline" ref="remainline" :style="remainWidth"><div class="w-slide-bar-btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" ></div></div>
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
    value: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    value (val) {
      if (!this.dragging) {
        this.inputValue = val
      }
    },
    inputValue (val) {
      this.$emit('input', this.inputValue)
    }
  },
  computed: {
    percent () {
      let _percent = (this.inputValue / this.total) * 100
      return _percent > 100 ? 100 : _percent < 0 ? 0 : _percent
    },
    remainWidth: {
      get: function () {
        return { width: `${100 - this.percent}%` }
      },
      set: function (val) {
      }
    },
    curWidth: {
      get: function () {
        return { width: `${this.percent}%` }
      },
      set: function (val) {
      }
    }
  },
  data () {
    return {
      dragging: false,
      inputValue: this.value
    }
  },
  methods: {
    handleTouchStart (e) {
      this.setValue(e.touches[0])
      e.preventDefault()
      this.dragging = true
      this.active = true
    },
    handleTouchMove (e) {
      if (this.dragRunning) return
      this.dragRunning = true
      window.requestAnimationFrame(() => {
        this.dragRunning = false
        this.setValue(e.touches[0])
      })
    },
    handleTouchEnd (e) {
      this.dragging = false
      this.active = false
      this.$emit('change', this.inputValue)
    },
    setValue (e) {
      const { $el, total } = this
      let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * total
      value = parseFloat(value.toFixed(5))
      if (value > total) {
        value = total
      } else if (value < 0) {
        value = 0
      }
      this.inputValue = value
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

