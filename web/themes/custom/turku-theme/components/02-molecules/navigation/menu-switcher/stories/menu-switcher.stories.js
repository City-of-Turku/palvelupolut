import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import menuSwitcherTemplate from '../menu-switcher.twig';

import '../../../../03-organisms/header/header-overlay/header-overlay';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const menuSwitcher = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={menuSwitcherTemplate({})} label="Menu switcher" />
  </CollectionWrapper>
);
