import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../label.twig';

import labelData from './label.yml';

import labelErrorData from './label-error.yml';

import labelRequiredData from './label-required.yml';

import labelCheckboxData from './label-checkbox.yml';

import labelCheckboxErrorData from './label-checkbox-error.yml';

import labelRadioData from './label-radio.yml';

import labelRadioErrorData from './label-radio-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const label = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(labelData)} label="Label" />
    <ComponentWrapper
      markup={template(labelErrorData)}
      label="Label with error"
    />
    <ComponentWrapper
      markup={template(labelRequiredData)}
      label="Label required"
    />
    <ComponentWrapper
      markup={template(labelCheckboxData)}
      label="Label checkbox"
    />
    <ComponentWrapper
      markup={template(labelCheckboxErrorData)}
      label="Label checkbox with error"
    />
    <ComponentWrapper markup={template(labelRadioData)} label="Label radio" />
    <ComponentWrapper
      markup={template(labelRadioErrorData)}
      label="Label radio with error"
    />
  </CollectionWrapper>
);
