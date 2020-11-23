'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '新网运营平台管理中心'
const port = process.env.port || process.env.npm_config_port || 9527

const customWebpackConfig = defaultSettings.webpackConfig

// merge proxy
const defaultProxy = {
  '/refundProduct': {
    //target: 'https://host.xinnet.com',
    target: 'https://stage.host.xinnet.com', // 虚机 驰云 
    //target: 'https://test-cloud-boss.xinnet.com', //　箭头云
    changeOrigin: true
  },
  //'/v1': {
    //target: 'https://host.xinnet.com',
    //target: 'https://test-cloud-boss.xinnet.com', //　箭头云
    //changeOrigin: true
  //},
  '/instance': {
    //target: 'https://host.xinnet.com',
    target: 'https://stage.host.xinnet.com', // 虚机 驰云 
    //target: 'https://test-cloud-boss.xinnet.com', //　箭头云
    changeOrigin: true
  }
}
const proxy = merge(defaultProxy, customWebpackConfig.proxy)

// merge configureWebpack
let optimization = {}
if (process.env.NODE_ENV !== 'development') {
  optimization = {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
  }
}
const defaultConfigureWebpack = {
  name: name,
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  optimization,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}
const configureWebpack = merge(defaultConfigureWebpack, customWebpackConfig.configureWebpack)

// merge root
const defaultRootConfig = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static/ec',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false
}
const rootConfig = merge(defaultRootConfig, customWebpackConfig.rootConfig)

// defaultChainWebpack, customChainWebpack二选一
const chainWebpack = customWebpackConfig.chainWebpack ? customWebpackConfig.chainWebpack : defaultChainWebpack
function defaultChainWebpack(config) {
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')

  // set svg-sprite-loader
  config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()

  // set preserveWhitespace
  config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap(options => {
      options.compilerOptions.preserveWhitespace = true
      return options
    })
    .end()

  config
    // https://webpack.js.org/configuration/devtool/#development
    .when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )

  config
    .when(process.env.NODE_ENV !== 'development',
      config => {
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()
        config
          .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
        config.optimization.runtimeChunk('single')
      }
    )
}

module.exports = {
  ...rootConfig,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy,
    disableHostCheck: true,
    before: require('./mock/mock-server.js')
  },
  configureWebpack,
  chainWebpack
}
