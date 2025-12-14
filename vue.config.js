const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      hashFunction: 'xxhash64'
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          exclude: /node_modules/,
          use: 'raw-loader'
        }
      ]
    }
  }
})
