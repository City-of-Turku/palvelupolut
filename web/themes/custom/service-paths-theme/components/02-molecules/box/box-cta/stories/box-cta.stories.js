import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import boxCtaTemplate from '../box-cta.twig';

import boxCtaData from './box-cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Box' };

export const boxCTA = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={boxCtaTemplate(boxCtaData)} label="Box CTA" />
  </CollectionWrapper>
);
