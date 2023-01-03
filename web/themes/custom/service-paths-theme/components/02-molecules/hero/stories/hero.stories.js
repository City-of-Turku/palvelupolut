import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import heroTemplate from '../hero.twig';

import heroData from './hero-dark.yml';
import heroLightData from './hero-light.yml';
import heroWithImageData from './hero-with-image-dark.yml';
import heroWithImageLightData from './hero-with-image-light.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Hero' };

export const hero = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={heroTemplate(heroData)} label="Hero dark" />
    <ComponentWrapper
      markup={heroTemplate(heroWithImageData)}
      label="Hero dark, with image"
    />
    <ComponentWrapper markup={heroTemplate(heroLightData)} label="Hero light" />
    <ComponentWrapper
      markup={heroTemplate(heroWithImageLightData)}
      label="Hero light, with image"
    />
  </CollectionWrapper>
);
