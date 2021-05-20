import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../form-element.twig';
import formElementData from './form-element.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const formElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(formElementData)} label="Form element" />
  </CollectionWrapper>
);
