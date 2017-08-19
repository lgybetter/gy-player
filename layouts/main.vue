<template>
  <div class="p-main-container">
    <mt-header title="测试">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
    </mt-header>
    <section>
      <nuxt/>
    </section>
  </div>
</template>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
html, body, #__nuxt, #__nuxt>div {
  height: 100%;
  overflow: auto;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.p-main-container {
  height: 100%;
}
</style>
