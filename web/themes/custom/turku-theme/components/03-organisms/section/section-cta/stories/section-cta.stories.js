import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionCTATemplate from '../section-cta.twig';

import sectionCTAData from './section-cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionCTA = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionCTATemplate(sectionCTAData)}
      label="Section CTA"
    />
  </CollectionWrapper>
);
