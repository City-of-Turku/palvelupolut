import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import anchorMenuTemplate from '../anchor-menu.twig';
import anchorMenuData from './anchor-menu.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const anchorMenu = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={anchorMenuTemplate(anchorMenuData)}
      label="Anchor menu"
    />
  </CollectionWrapper>
);
