import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../radio-element.twig';

import radioElementData from './radio-element.yml';

import radioElementErrorData from './radio-element-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const radioElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper
      markup={template(radioElementData)}
      label="Radio element"
    />
    <ComponentWrapper
      markup={template(radioElementErrorData)}
      label="Radio element with error"
    />
  </CollectionWrapper>
);
