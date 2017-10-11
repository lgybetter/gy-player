<template>
  <div class="w-popup-container" v-show="openInner" @click="handleClick" :style="zIndex">
    <section :class="['w-popup-content', { 'w-popup-content-show': show }]" ref="content">
      <slot name="body"></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.openInner = val
      this.$nextTick(() => {
        this.show = val
      })
    }
  },
  data () {
    return {
      openInner: false,
      show: false
    }
  },
  computed: {
    zIndex () {
      return this.openInner ? { zIndex: 10 } : { zIndex: -10 }
    }
  },
  methods: {
    handleClick (e) {
      if (e.srcElement !== this.$refs.content) {
        this.show = false
        setTimeout(() => {
          this.openInner = false
          this.$emit('input', false)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.w-popup-container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .2);
}

.w-popup-content {
  position: relative;
  z-index: 12;
  padding: 16px 8px;
  height: 100%;
  width: 250px;
  -webkit-filter: drop-shadow(5px 0 5px #fafad2);
  top: 0;
  left: -250px;
  background: rgba(209,95,238,.6);
  transition: all .5s;
}

.w-popup-content-show {
  transform: translateX(250px);
}

</style>
