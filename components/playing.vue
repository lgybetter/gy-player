<template>
  <div class="w-playing-icon">
    <span :style="{ height: line1 + 'px' }"></span>
    <span :style="{ height: line2 + 'px' }"></span>
    <span :style="{ height: line3 + 'px' }"></span>
    <span :style="{ height: line4 + 'px' }"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      line1: 10,
      line2: 18,
      line3: 15,
      line4: 20
    }
  },
  mounted () {
    setInterval(() => {
      this.line1 = parseInt(Math.random() * 10) + 5
      this.line2 = parseInt(Math.random() * 10) + 8
      this.line3 = parseInt(Math.random() * 10) + 10
      this.line4 = parseInt(Math.random() * 10) + 6
    }, 200)
  }
}
</script>

<style scoped>
.w-playing-icon {
  margin: 0 2px;
  display: flex;
  width: 25px;
  height: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-end;
}
.w-playing-icon span {
  width: 3px;
  box-sizing: border-box;
  margin-right: 3px;
  background: white;
}
</style>

