module.exports = {
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
    // '@storybook/addon-actions/register',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    // '@storybook/addon-links/register',
    '@whitespace/storybook-addon-html',
  ],
};
