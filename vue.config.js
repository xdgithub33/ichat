const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          // 讲px转化为rem
          require('postcss-pxtorem')({
            //这里是配置项，详见官方文档
            rootValue: 100, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*', '!border*'],
          }),
        ],
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  // 跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  //插件
  pluginOptions: {
    //vue add style-resources-loader 全局调用less的插件
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('/src/style/*valiable.less')],
    },
  },
}
