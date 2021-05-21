import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionCardsTemplate from '../section-cards.twig';

import sectionCardsData from './section-cards.yml';
import sectionCardsLargeData from './section-cards-large.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionCards = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionCardsTemplate(sectionCardsData)}
      label="Section cards"
    />
    <ComponentWrapper
      markup={sectionCardsTemplate(sectionCardsLargeData)}
      label="Section cards large"
    />
  </CollectionWrapper>
);
