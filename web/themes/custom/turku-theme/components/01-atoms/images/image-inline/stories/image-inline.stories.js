import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import imageInlineTemplate from './image-inline.twig';
import imageInlineData from './image-inline.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const iconInline = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={imageInlineTemplate(imageInlineData)} />
  </CollectionWrapper>
);
