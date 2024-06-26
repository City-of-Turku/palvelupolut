import { addDecorator } from '@storybook/react';
import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';
// import setupSource from './setupSource';
import mdxContainer from './mdxContainer';

// Import styles for Storybook.
import '../components/storybook/storybook.scss';

// Component CSS.
import '../components/style.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';
import './jquery-global.js';
import once from 'jquery-once';

// Add global types to the Storybook toolbar.
export const globalTypes = {
  // Add a language switcher dropdown to the toolbar.
  locale: {
    name: 'Language',
    description: 'Language',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇬🇧', title: 'English' },
        { value: 'fi', right: '🇫🇮', title: 'Finnish' },
      ],
    },
  },
};

export const parameters = {
  options: {
    // Show stories from `Documentation` directory before any other stories.
    storySort: {
      order: [
        'Documentation',
        ['Introduction', 'Interface', 'Component structure'],
      ],
    },
  },
  previewTabs: {
    // Hide the Docs panel.
    // @see https://github.com/storybookjs/storybook/pull/9095
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  html: {
    // Override the wrapper element selector used to grab the component HTML.
    // @see https://github.com/whitespace-se/storybook-addon-html#usage
    root: '#component-root',
  },
  docs: {
    // Customise Source tab content.
    // @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#customizing-source-snippets
    // transformSource: setupSource,
    // Add wrapper for MDX documentation pages.
    // @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#overwriting-docs-container
    container: mdxContainer,
  },
};

// Make sure Drupal behaviours are run on all components.
export const decorators = [
  (Story) => {
    useEffect(() => Drupal.attachBehaviors(), []);
    return <Story />;
  },
];

setupTwig(Twig);
