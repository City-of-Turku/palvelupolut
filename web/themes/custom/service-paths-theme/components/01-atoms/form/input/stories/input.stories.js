import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../input.twig';

import inputTextData from './input-text.yml';

import inputSubmitData from './input-submit.yml';

import inputMinimalData from './input-minimal.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const input = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(inputTextData)} label="Text field" />
    <ComponentWrapper markup={template(inputSubmitData)} label="Submit field" />
    <ComponentWrapper
      markup={template(inputMinimalData)}
      label="Minimal field"
    />
  </CollectionWrapper>
);
