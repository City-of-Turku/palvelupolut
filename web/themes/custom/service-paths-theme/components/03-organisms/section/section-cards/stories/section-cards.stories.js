import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionCardsTemplate from '../section-cards.twig';

import sectionCardsData from './section-cards.yml';

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
  </CollectionWrapper>
);
