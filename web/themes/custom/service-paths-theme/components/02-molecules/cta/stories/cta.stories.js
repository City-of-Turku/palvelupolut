import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import ctaTemplate from '../cta.twig';
import ctaData from './cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/CTA' };

export const CTA = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={ctaTemplate(ctaData)} label="CTA" />
  </CollectionWrapper>
);
