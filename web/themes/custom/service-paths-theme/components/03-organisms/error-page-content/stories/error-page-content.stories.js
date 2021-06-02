import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import errorPageContentTemplate from '../error-page-content.twig';

import errorPageContentData from './error-page-content.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Error page content' };

export const errorPageContentContent = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={errorPageContentTemplate(errorPageContentData)}
      label="Error page content"
    />
  </CollectionWrapper>
);
