//vue.config.js
// const webpack = require('webpack');
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      title: 'Прагматикон',
    },
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 1024000,
      maxAssetSize: 512000,
    },
    plugins: [],
  },
  devServer: {
    port: 3010,
    host: 'localhost',
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3011',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        // "^/api": ""
        // },
        logLevel: 'debug',
      },
      // "/media": {
      //   target: "http://localhost:5000",
      //   changeOrigin: true,
      //   logLevel: 'debug'
      // }
    },
  },
};
