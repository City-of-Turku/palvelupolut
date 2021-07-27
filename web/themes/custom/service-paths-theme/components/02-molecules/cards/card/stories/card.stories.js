import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import cardTemplate from '../card.twig';

import cardData from './card.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Cards' };

export const card = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={cardTemplate(cardData)} label="Card" />
  </CollectionWrapper>
);
