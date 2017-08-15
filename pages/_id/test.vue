<template>
  <div>
    <mt-search v-model="value"></mt-search>
  </div>
</template>

<script>
export default {
  validate ({ params, query, store }) {
    console.log(params)
    return true // if the params are valid
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>