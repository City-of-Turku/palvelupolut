import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import accordionTemplate from '../accordion.twig';

import accordionData from './accordion.yml';

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
  </CollectionWrapper>
);
