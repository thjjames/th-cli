const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devServer: {
    allowedHosts: 'auto',
    historyApiFallback: true,
    host: 'local-ip',
    port: 'auto', // 'auto'解决'8080'可能冲突需要手动portfinder
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://getman.cn/api',
        pathRewrite: { '^/api': '' },
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
      },
    },
  },
  devtool: 'eval-source-map',
});
