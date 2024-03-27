const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
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
  performance: {
    maxAssetSize: 500 * 1024,
    maxEntrypointSize: 500 * 1024,
  },
});
