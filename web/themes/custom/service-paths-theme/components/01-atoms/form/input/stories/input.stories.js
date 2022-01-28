import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../input.twig';

import inputTextData from './input-text.yml';

import inputSubmitData from './input-submit.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const input = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(inputTextData)} label="Text field" />
    <ComponentWrapper markup={template(inputSubmitData)} label="Submit field" />
  </CollectionWrapper>
);
