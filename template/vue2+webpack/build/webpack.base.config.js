const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Components = require('unplugin-vue-components/webpack');
const { ElementUiResolver } = require('unplugin-vue-components/resolvers');


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
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx', 'vue'],
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ElementUiResolver({
          importStyle: 'less',
        }),
      ],
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
              limit: 8 * 1024,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20 * 1024,
      maxAsyncRequests: 6,
      maxInitialRequests: 6,
      enforceSizeThreshold: 500 * 1024,
      cacheGroups: {
        vue: {
          name: 'chunk-vue',
          priority: 20,
          test: /[\\/]node_modules[\\/]vue(-router|x)?[\\/]/,
        },
        componentLibrary: {
          name: 'chunk-component-library',
          priority: 15,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        },
        vendor: {
          name: 'chunk-vendor',
          chunks: 'initial', // reduce initial code size
          priority: 10,
          test: /[\\/]node_modules[\\/]/,
        },
        default: {
          name: 'chunk-common',
          minChunks: 2,
          priority: 0,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
  },
};