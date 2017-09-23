module.exports = {
  head: {
    title: 'nuxt-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'http://os32fgzvj.bkt.clouddn.com/flexible.min.js' }
    ]
  },
  loading: '~/components/loading.vue',
  build: {
    postcss: {
      plugins: {
        'autoprefixer': {browsers: 'last 5 version'},
        'postcss-px2rem': {remUnit: 40}
      }
    },
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  vendor: ['mint-ui'],
  plugins: ['~plugins/mint-ui.js'],
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
