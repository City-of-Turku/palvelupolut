import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import gridTemplate from '../grid.twig';

import gridData from './grid.yml';
import gridFourItemsData from './grid-four-items.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Templates/Grids' };

export const grid = () => (
  <CollectionWrapper>
    <ComponentWrapper label="Grid" markup={gridTemplate(gridData)} />
    <ComponentWrapper
      label="Grid with four items"
      markup={gridTemplate(gridFourItemsData)}
    />
  </CollectionWrapper>
);
