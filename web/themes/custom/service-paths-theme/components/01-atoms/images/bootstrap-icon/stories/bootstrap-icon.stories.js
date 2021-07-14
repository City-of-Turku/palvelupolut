import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import bootstrapIconTemplate from './bootstrap-icons.twig';

import bootstrapIconData from './bootstrap-icons.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const bootstrapIcons = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={bootstrapIconTemplate(bootstrapIconData)} />
  </CollectionWrapper>
);
