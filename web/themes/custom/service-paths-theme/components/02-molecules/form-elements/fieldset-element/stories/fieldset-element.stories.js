import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../fieldset-element.twig';

import fieldsetElementData from './fieldset-element.yml';

import fieldsetElementDisabledData from './fieldset-element-disabled.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const fieldsetElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(fieldsetElementData)} label="Fieldset" />
    <ComponentWrapper
      markup={template(fieldsetElementDisabledData)}
      label="Disabled fieldset"
    />
  </CollectionWrapper>
);
