const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const chalk = require('chalk'); // colors用法较简单 但没有依赖包
const portfinder = require('portfinder');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const __webpackConfig__ = merge(webpackBaseConfig, {
    mode: 'development',
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        https: true,
        host: '0.0.0.0',
        port: 8080,
        useLocalIp: true,
        open: true,
        openPage: 'demo',
        proxy: {
            '/api': {
                target: 'https://getman.cn/api',
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