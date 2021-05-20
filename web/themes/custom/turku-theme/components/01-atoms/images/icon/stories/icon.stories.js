import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import iconTemplate from './icons.twig';

import iconData from './icons.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const icons = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={iconTemplate(iconData)} />
  </CollectionWrapper>
);
