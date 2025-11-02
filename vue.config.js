const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      hashFunction: 'xxhash64'
    }
  }
})
