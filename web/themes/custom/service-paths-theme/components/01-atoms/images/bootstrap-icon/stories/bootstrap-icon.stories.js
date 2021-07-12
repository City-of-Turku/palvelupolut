import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import iconTemplate from './bootstrap-icons.twig';

import iconData from './bootstrap-icons.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const bootstrapIcons = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={iconTemplate(iconData)} />
  </CollectionWrapper>
);
