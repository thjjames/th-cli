const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Components = require('unplugin-vue-components/webpack');
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers');

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
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
      'process.env.BUILD_TIME': JSON.stringify(new Date()),
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
        AntDesignVueResolver({
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
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // to support ant-design-vue@1 Inline Javascript in less
              },
            },
          },
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
              limit: 1024 * 4,
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