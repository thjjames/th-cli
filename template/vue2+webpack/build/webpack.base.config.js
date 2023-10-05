const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  entry: { 
    main: './src/main.ts'
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
      'process.env.BUILD_TIME': JSON.stringify(new Date())
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/, 
        use: 'vue-loader'
      }, 
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.((j|t)sx?|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ]
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
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|png|woff2?|svg|eot|ttf|otf)$/,
        // exclude: /node_modules/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 2
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
};