import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../textarea.twig';

import textareaData from './textarea.yml';

import textareaErrorData from './textarea-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const textarea = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(textareaData)} label="Textarea field" />
    <ComponentWrapper
      markup={template(textareaErrorData)}
      label="Textarea field with error"
    />
  </CollectionWrapper>
);
