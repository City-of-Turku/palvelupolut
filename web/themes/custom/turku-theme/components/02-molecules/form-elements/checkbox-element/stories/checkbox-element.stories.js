import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../checkbox-element.twig';

import checkboxElementData from './checkbox-element.yml';

import checkboxElementErrorData from './checkbox-element-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const checkboxElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper
      markup={template(checkboxElementData)}
      label="Checkbox element"
    />
    <ComponentWrapper
      markup={template(checkboxElementErrorData)}
      label="Checkbox element with error"
    />
  </CollectionWrapper>
);
