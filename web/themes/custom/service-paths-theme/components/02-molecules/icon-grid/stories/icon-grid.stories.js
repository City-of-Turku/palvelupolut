import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import iconGridTemplate from '../icon-grid.twig';
import iconGridData from './icon-grid.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Icon Grid' };

export const iconGrid = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={iconGridTemplate(iconGridData)}
      label="Icon Grid"
    />
  </CollectionWrapper>
);
