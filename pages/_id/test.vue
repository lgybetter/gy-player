<template>
  <div>测试</div>
</template>

<script>
export default {
  validate ({ params, query, store }) {
    console.log(params)
    return true // if the params are valid
  }
}
</script>