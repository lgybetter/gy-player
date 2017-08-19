<template>
  <div>
    <mt-search v-model="value"></mt-search>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="w-book-mark-container">
      <marks v-for="(item, index) in list" :key="index"></marks>
    </div>
  </div>
</template>

<script>
import marks from '../../components/marks.vue'
export default {
  layout: 'main',
  data () {
    return {
      list: [
        1, 2, 3
      ],
      loading: false,
      value: ''
    }
  },
  components: {
    marks
  },
  methods: {
    loadMore () {
      this.loading = true
      console.log('lgy')
    }
  }
}
</script>


<style>
.w-book-mark-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
