import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import menuMainTemplate from '../menu-main.twig';

import menuMainData from './menu-main.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const menuMain = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={menuMainTemplate(menuMainData)} />
  </CollectionWrapper>
);
