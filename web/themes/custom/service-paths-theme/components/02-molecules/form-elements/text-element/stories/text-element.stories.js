import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../text-element.twig';

import textElementData from './text-element.yml';

import textElementErrorData from './text-element-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Form elements' };

export const textElement = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(textElementData)} label="Text element" />
    <ComponentWrapper
      markup={template(textElementErrorData)}
      label="Text element with error"
    />
  </CollectionWrapper>
);
