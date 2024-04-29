import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import imageTemplate from '../responsive-image.twig';
import figureTemplate from '../responsive-figure.twig';

import imageData from './image.yml';
import figureData from './figure.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const image = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={figureTemplate(figureData)} label="Figure" />
    <ComponentWrapper markup={imageTemplate(imageData)} label="Image" />
  </CollectionWrapper>
);
