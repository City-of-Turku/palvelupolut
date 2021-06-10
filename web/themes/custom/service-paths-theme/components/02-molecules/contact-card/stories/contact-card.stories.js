import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import contactTemplate from '../contact-card.twig';
import contactData from './contact-card.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Contact' };

export const Contact = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={contactTemplate(contactData)} label="Contact" />
  </CollectionWrapper>
);
