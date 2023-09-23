const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(), // 打包前删除dist下文件
        new MiniCssExtractPlugin({ // 根据每个entry生成单个css文件
            filename: "[name].[hash:8].css",
            chunkFilename: "[name].[hash:8].css"
        })
    ]
});