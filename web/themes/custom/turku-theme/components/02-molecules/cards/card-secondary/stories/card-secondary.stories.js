import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import cardSecondaryTemplate from '../card-secondary.twig';

import cardSecondaryData from './card-secondary.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Cards' };
export const cardSecondary = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={cardSecondaryTemplate(cardSecondaryData)}
      label="Card secondary"
    />
  </CollectionWrapper>
);
