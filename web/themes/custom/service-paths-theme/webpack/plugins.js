/* eslint-disable no-underscore-dangle */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// const _ImageminPlugin = require('imagemin-webpack-plugin').default;
// const path = require('path');
// const glob = require('glob');
// const imagePath = path.resolve(__dirname, '../images');

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'style.css',
  chunkFilename: '[id].css',
});

// Disabled due to vulnerable dependencies in imagemin-webpack-plugin@2.4.2.
// const ImageminPlugin = new _ImageminPlugin({
//  disable: process.env.NODE_ENV !== 'production',
//  externalImages: {
//    context: imagePath,
//    sources: glob.sync(path.resolve(imagePath, '**/*.{png,jpg,gif,svg}')),
//    destination: imagePath,
//  },
// });

const SpriteLoaderPlugin = new _SpriteLoaderPlugin({
  plainSprite: true,
});

const ProgressPlugin = new webpack.ProgressPlugin();

module.exports = {
  ProgressPlugin,
  MiniCssExtractPlugin,
  // ImageminPlugin,
  SpriteLoaderPlugin,
  CleanWebpackPlugin: new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['!*.{png,jpg,gif,svg}'],
    cleanAfterEveryBuildPatterns: ['remove/**', '!js', '!*.{png,jpg,gif,svg}'],
  }),
};
