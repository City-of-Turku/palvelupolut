import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import cardTemplate from '../card.twig';

import cardData from './card-default.yml';
import cardSmallData from './card-small.yml';
import cardLargeData from './card-large.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Cards' };

export const card = () => (
  <CollectionWrapper layout="medium" negative>
    <ComponentWrapper markup={cardTemplate(cardData)} label="Card default" />
    <ComponentWrapper markup={cardTemplate(cardSmallData)} label="Card small" />
    <ComponentWrapper markup={cardTemplate(cardLargeData)} label="Card large" />
  </CollectionWrapper>
);
