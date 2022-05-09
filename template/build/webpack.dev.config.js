const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const chalk = require('chalk');
const portfinder = require('portfinder');

const __webpackConfig__ = merge(webpackBaseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    // https: true,
    host: '0.0.0.0',
    port: 8089,
    useLocalIp: true,
    disableHostCheck: true,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000/',
        pathRewrite: { '^/api': '' },
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true
      }
    }
  },
  devtool: 'eval-source-map'
});

module.exports = new Promise((resolve, reject) => {
  const port = process.env.PORT || __webpackConfig__.devServer.port;
  portfinder.getPort({
    port,
    stopPort: port + 100
  }, function (err, newPort) {
    if (err) {
      reject(err);
    } else {
      if (port !== newPort) {
        console.log(chalk.bold.blueBright(`port ${port} is in use, use ${newPort} instead!`));
        __webpackConfig__.devServer.port = newPort;
      }
    }
    resolve(__webpackConfig__);
  });  
});