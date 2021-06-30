import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../select-element.twig';

import selectElementData from './select-element.yml';

import selectElementErrorData from './select-element-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const selectElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper
      markup={template(selectElementData)}
      label="Select element"
    />
    <ComponentWrapper
      markup={template(selectElementErrorData)}
      label="Select element with error"
    />
  </CollectionWrapper>
);
