import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import visuallyHiddenTemplate from '../visually-hidden.twig';

import visuallyHiddenData from './visually-hidden.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Visually hidden' };

export const visuallyHidden = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={visuallyHiddenTemplate(visuallyHiddenData)}
      label="Visually hidden"
    />
  </CollectionWrapper>
);
