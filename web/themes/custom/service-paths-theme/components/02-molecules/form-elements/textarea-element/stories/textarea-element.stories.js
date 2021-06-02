import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../textarea-element.twig';

import textareaElementData from './textarea-element.yml';
import textareaElementErrorData from './textarea-element-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const textareaElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper
      markup={template(textareaElementData)}
      label="Textarea element"
    />
    <ComponentWrapper
      markup={template(textareaElementErrorData)}
      label="Textarea element"
    />
  </CollectionWrapper>
);
