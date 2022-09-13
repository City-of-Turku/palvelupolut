import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionAccordionTemplate from '../section-accordion.twig';

import sectionAccordionData from './section-accordion.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionAccordion = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionAccordionTemplate(sectionAccordionData)}
      label="Section Accordion"
    />
  </CollectionWrapper>
);
