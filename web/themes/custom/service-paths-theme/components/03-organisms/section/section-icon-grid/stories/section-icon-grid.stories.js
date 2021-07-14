import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionIconGridTemplate from '../section-icon-grid.twig';

import sectionIconGridData from './section-icon-grid.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionIconGrid = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionIconGridTemplate(sectionIconGridData)}
      label="Section Icon Grid"
    />
  </CollectionWrapper>
);
