import { addDecorator } from '@storybook/react';
import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';
import setupShowCode from './setupShowCode';
import { DocsRoot } from './setupWrappers';
import { DocsPage } from '@storybook/addon-docs/blocks';

// Import styles for Storybook.
import '../components/storybook/storybook.scss';

// Component CSS.
import '../components/style.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';


export const parameters = {
  html: { root: '#component-root' },
  docs: {
    page: DocsPage,
    container: DocsRoot,
    transformSource: (src, storyContext) => setupShowCode(storyContext.storyFn),
  },
};

// addDecorator is deprecated, but not sure how to use this otherwise.
addDecorator((storyFn) => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});

setupTwig(Twig);
