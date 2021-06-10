import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionContactCardsTemplate from '../section-contact-cards.twig';

import sectionContactCardsData from './section-contact-cards.yml';

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
  </CollectionWrapper>
);
