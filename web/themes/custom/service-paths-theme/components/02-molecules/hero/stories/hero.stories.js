import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import heroTemplate from '../hero.twig';

import heroData from './hero-dark.yml';
import heroLightData from './hero-light.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Hero' };

export const hero = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={heroTemplate(heroData)} label="Hero dark" />
    <ComponentWrapper markup={heroTemplate(heroLightData)} label="Hero light" />
  </CollectionWrapper>
);
