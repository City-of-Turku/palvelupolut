import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../fieldset.twig';

import fieldsetData from './fieldset.yml';

import fieldsetDisabledData from './fieldset-disabled.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const fieldset = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(fieldsetData)} label="Fieldset" />
    <ComponentWrapper
      markup={template(fieldsetDisabledData)}
      label="Disabled fieldset"
    />
  </CollectionWrapper>
);
