import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionContactCardsTemplate from '../section-contact-cards.twig';

import sectionContactCardsData from './section-contact-cards.yml';
import sectionContactCardsVerticalData from './section-contact-cards-vertical.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionContactCards = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionContactCardsTemplate(sectionContactCardsData)}
      label="Section contact cards"
    />
    <ComponentWrapper
      markup={sectionContactCardsTemplate(sectionContactCardsVerticalData)}
      label="Section contact cards vertical"
    />
  </CollectionWrapper>
);
