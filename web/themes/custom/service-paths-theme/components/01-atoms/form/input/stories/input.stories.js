import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../input.twig';

import inputTextData from './input-text.yml';

import inputTextErrorData from './input-text-error.yml';

import inputRadioData from './input-radio.yml';

import inputCheckboxData from './input-checkbox.yml';

import inputPasswordData from './input-password.yml';

import inputSubmitData from './input-submit.yml';

import inputMinimalData from './input-minimal.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const input = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(inputTextData)} label="Text field" />
    <ComponentWrapper
      markup={template(inputTextErrorData)}
      label="Text field with error"
    />
    <ComponentWrapper markup={template(inputRadioData)} label="Radio field" />
    <ComponentWrapper
      markup={template(inputCheckboxData)}
      label="Checkbox field"
    />
    <ComponentWrapper
      markup={template(inputPasswordData)}
      label="Password field"
    />
    <ComponentWrapper markup={template(inputSubmitData)} label="Submit field" />
    <ComponentWrapper
      markup={template(inputMinimalData)}
      label="Minimal field"
    />
  </CollectionWrapper>
);
