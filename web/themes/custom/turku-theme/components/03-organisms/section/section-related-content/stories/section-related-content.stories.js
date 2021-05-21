import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionRelatedContentTemplate from '../section-related-content.twig';

import sectionRelatedContentData from './section-related-content.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionRelatedContent = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionRelatedContentTemplate(sectionRelatedContentData)}
      label="Section related content"
    />
  </CollectionWrapper>
);
