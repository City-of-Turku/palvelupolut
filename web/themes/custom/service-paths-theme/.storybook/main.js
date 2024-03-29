module.exports = {
  staticDirs: ['../dist', '../images'],
  stories: ['../components/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
