const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'chunks',
        },
      },
    },
  },
});
