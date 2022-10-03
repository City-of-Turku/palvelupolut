import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import accordionTemplate from '../accordion.twig';

import accordionData from './accordion.yml';
import accordionWithHeadingData from './accordion-with-heading.yml';
import warningAccordionData from './warning-accordion.yml';
import accordionWhiteData from './accordion-white.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Accordion' };

export const accordion = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={accordionTemplate(accordionData)}
      label="Accordion"
    />
    <ComponentWrapper
      markup={accordionTemplate(accordionWithHeadingData)}
      label="Accordion, with heading"
    />
    <ComponentWrapper
      markup={accordionTemplate(warningAccordionData)}
      label="Warning accordion"
    />
    <ComponentWrapper
      markup={accordionTemplate(accordionWhiteData)}
      label="White accordion"
    />
  </CollectionWrapper>
);
