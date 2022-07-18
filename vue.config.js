const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 3000
  },
  productionSourceMap: false,
  assetsDir: 'assets',
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
})
