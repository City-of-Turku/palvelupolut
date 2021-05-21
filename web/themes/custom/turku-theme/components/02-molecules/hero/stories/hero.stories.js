import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import heroTemplate from '../hero.twig';

import heroData from './hero-default.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Hero' };

export const hero = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={heroTemplate(heroData)} />
  </CollectionWrapper>
);
