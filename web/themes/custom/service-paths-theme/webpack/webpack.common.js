const path = require('path');
const glob = require('glob');
const loaders = require('./loaders');
const plugins = require('./plugins');

const webpackDir = path.resolve(__dirname);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const componentsDir = path.resolve(rootDir, 'components');

function getEntries(pattern) {
  const entries = {};

  // glob.sync(pattern).forEach((file) => {
  //   const filePath = file.split('components/')[1];
  //   const newfilePath = `js/${filePath.replace('.js', '')}`;
  //   entries[newfilePath] = file;
  // });

  entries.svgSprite = path.resolve(webpackDir, 'svgSprite.js');
  entries.css = path.resolve(webpackDir, 'css.js');
  entries.app = path.resolve(componentsDir, 'app.js');

  return entries;
}

module.exports = {
  entry: getEntries(
    path.resolve(
      rootDir,
      'components/**/!(*.stories|*.component|*.min|*.test).js',
    ),
  ),
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.SVGSpriteLoader,
      loaders.ImageLoader,
      loaders.JSLoader,
    ],
  },
  plugins: [
    plugins.MiniCssExtractPlugin,
    plugins.ImageminPlugin,
    plugins.SpriteLoaderPlugin,
    plugins.ProgressPlugin,
    plugins.CleanWebpackPlugin,
  ],
  output: {
    path: distDir,
    filename: '[name].js',
  },
};
