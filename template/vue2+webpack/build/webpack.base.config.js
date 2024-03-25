const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  entry: { 
    main: './src/main.ts',
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].chunk.[contenthash:8].js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
      'process.env.BUILD_TIME': JSON.stringify(new Date().toLocaleString()),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx', 'vue'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/, 
        use: 'vue-loader',
      }, 
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/, 
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)$/,
        // exclude: /node_modules/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 1024 * 8,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
  },
};