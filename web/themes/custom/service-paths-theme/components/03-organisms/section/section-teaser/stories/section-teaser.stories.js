import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionTeaserTemplate from '../section-teaser.twig';

import sectionTeaserData from './section-teaser.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionTeaser = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionTeaserTemplate(sectionTeaserData)}
      label="Section Teaser"
    />
  </CollectionWrapper>
);
